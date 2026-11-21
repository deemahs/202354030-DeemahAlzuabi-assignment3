// ========================================
// Select Elements
// ========================================

// Theme toggle button and form-related elements
const themeButton = document.getElementById("themeButton");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const year = document.getElementById("year");

// Project filtering elements
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const filterState = document.getElementById("filterStatus");

// Project sorting and level filtering elements
const projectSort = document.getElementById("projectSort");
const projectsGrid = document.getElementById("projectsGrid");

// Store the original card order so "Default" sort can restore it
const originalProjects = Array.from(projectCards);
const levelSelect = document.getElementById("levelSelect");

// ========================================
// Dark / Light Mode
// ========================================

/**
 * Apply the given theme to the page and update the toggle button.
 * @param {boolean} isDark - Whether dark mode should be active.
 */
function applyTheme(isDark) {
  // Toggle the dark-mode class on the body element
  document.body.classList.toggle("dark-mode", isDark);

  // Switch the button emoji to reflect the current theme
  themeButton.textContent = isDark ? "☀️" : "🌙";

  // Update ARIA attributes so screen readers announce the current state
  themeButton.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );

  themeButton.setAttribute("aria-pressed", String(isDark));
}

// Restore the saved theme from localStorage on page load.
// Wrapped in try/catch in case localStorage is unavailable (e.g., private browsing).
try {
  const savedTheme = localStorage.getItem("portfolioTheme");

  applyTheme(savedTheme === "dark");
} catch (error) {
  applyTheme(false);
  console.warn("Could not load theme preference:", error);
}

// Toggle theme on button click and save the preference
themeButton.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark-mode");
  applyTheme(isDark);

  // Save the new theme to localStorage so it persists across visits
  try {
    localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");
  } catch (error) {
    console.warn("Could not save theme preference:", error);
  }
});

// ========================================
// Dynamic Project Filtering and Sorting
// ========================================

// Track the currently selected technology filter (default: show all)
let selectedFilter = "all";

/**
 * Update project visibility based on the active technology filter,
 * level filter, and sort order. This single function handles all
 * three features together so they always stay in sync.
 */
function updateProjects() {
  const sortType = projectSort.value;

  // Start with the original project order
  const sortedProjects = [...originalProjects];

  // Sort projects alphabetically using localeCompare
  if (sortType === "az") {
    sortedProjects.sort(function (a, b) {
      return a.dataset.name.localeCompare(b.dataset.name);
    });
  } else if (sortType === "za") {
    sortedProjects.sort(function (a, b) {
      return b.dataset.name.localeCompare(a.dataset.name);
    });
  }

  let visibleCount = 0;

  sortedProjects.forEach(function (card) {
    // Re-append each card in the new sorted order
    projectsGrid.appendChild(card);

    // Check if the card matches the selected technology filter
    const technologies = card.dataset.technologies.split(" ");
    const matchesTechnology =
      selectedFilter === "all" || technologies.includes(selectedFilter);

    // Check if the card matches the selected level filter.
    // Uses strict equality (===), so data-level values must be lowercase.
    const selectedLevel = levelSelect.value;
    const matchesLevel =
      selectedLevel === "all" || card.dataset.level === selectedLevel;

    // A card is visible only if it passes both filters
    const matches = matchesTechnology && matchesLevel;
    card.hidden = !matches;
    if (matches) {
      visibleCount++;
    }
  });

  // Update the status message to tell the user how many projects are shown
  if (visibleCount === 0) {
    filterState.textContent =
      "No projects found for this filter. Try another technology.";
  } else {
    const projectWord = visibleCount === 1 ? "project" : "projects";

    if (selectedFilter === "all") {
      filterState.textContent = `Showing ${visibleCount} ${projectWord}.`;
    } else {
      const selectedButton = document.querySelector(
        `.filter-btn[data-filter="${selectedFilter}"]`,
      );

      filterState.textContent =
        `Showing ${visibleCount} ${projectWord} using ` +
        `${selectedButton.textContent.trim()}.`;
    }
  }
}

// Attach click handlers to each technology filter button
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedFilter = button.dataset.filter;

    // Update active state and ARIA attributes on all buttons
    filterButtons.forEach(function (item) {
      const selected = item === button;

      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    updateProjects();
  });
});

// Re-filter when the sort order or level selection changes
projectSort.addEventListener("change", updateProjects);
levelSelect.addEventListener("change", updateProjects);

// Run once on page load to set the initial display
updateProjects();

// ========================================
// Assignment 3 - GitHub API Integration
// ========================================

// GitHub username used for the API request
const githubUsername = "deemahs";

// DOM elements for the GitHub section
const githubStatus = document.getElementById("githubStatus");
const githubRepos = document.getElementById("githubRepos");
const retryGithub = document.getElementById("retryGithub");

/**
 * Fetch and display selected GitHub repositories using the REST API.
 * Shows loading state, handles errors, and provides a retry button.
 */
async function loadGitHubRepos() {
  // Reset the UI before making a new request
  githubStatus.textContent = "Loading repositories...";
  githubRepos.replaceChildren();
  retryGithub.hidden = true;

  try {
    // Send a GET request to the GitHub REST API
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(githubUsername)}/repos?sort=updated&per_page=6`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories");
    }

    const repos = await response.json();

    // Filter the response to show only specific selected repositories
    const selectedRepos = [
      "202354030-DeemahAlzuabi-assignment3",
      "202354030-DeemahAlzuabi-assignment2",
      "202354030-DeemahAlzuabi-assignment1",
    ];

    const filteredRepos = repos.filter(function (repo) {
      return selectedRepos.includes(repo.name);
    });

    // Validate that the API returned an array
    if (!Array.isArray(repos)) {
      throw new Error("Invalid GitHub API response");
    }

    if (filteredRepos.length === 0) {
      githubStatus.textContent = "No public repositories available.";
      return;
    }

    // Create a card for each repository with its details and link
    filteredRepos.forEach(function (repo) {
      const card = document.createElement("article");
      card.className = "github-card";

      const title = document.createElement("h3");
      title.textContent = repo.name;

      const description = document.createElement("p");
      description.textContent = repo.description || "No description available.";

      const language = document.createElement("p");
      language.textContent = `Language: ${repo.language || "Not specified"}`;

      const link = document.createElement("a");
      link.href = repo.html_url;
      link.textContent = "View Repository";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      card.append(title, description, language, link);
      githubRepos.appendChild(card);
    });

    githubStatus.textContent = `Showing ${filteredRepos.length} selected repositories.`;
  } catch (error) {
    // Display a user-friendly error message and show the retry button
    console.error("GitHub API Error:", error);

    githubStatus.textContent = "Unable to load repositories. Please try again.";

    retryGithub.hidden = false;
  }
}

// Allow the user to retry the API request if it fails
retryGithub.addEventListener("click", loadGitHubRepos);

// Fetch repositories on page load
loadGitHubRepos();

// ========================================
// Contact Form Validation
// ========================================

// Handle contact form submission with client-side validation
contactForm.addEventListener("submit", function (event) {
  // Prevent the default browser form submission
  event.preventDefault();

  // Get references to form input fields
  const nameField = document.getElementById("name");

  const emailField = document.getElementById("email");

  const messageField = document.getElementById("message");

  // Clear previous validation states from all fields
  const fields = [nameField, emailField, messageField];

  fields.forEach(function (field) {
    field.removeAttribute("aria-invalid");
  });

  // Read and trim the input values
  const name = nameField.value.trim();

  const email = emailField.value.trim();

  const message = messageField.value.trim();

  // Validate each field in order: name → email → email format → message
  let error = "";
  let invalidFields = null;

  if (!name) {
    error = "Please enter your name.";
    invalidFields = nameField;
  } else if (!email) {
    error = "Please enter your email.";
    invalidFields = emailField;
  } else if (
    !emailField.validity.valid ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    // Check both the browser's built-in validation and a regex pattern
    error = "Please enter a valid email address.";
    invalidFields = emailField;
  } else if (!message) {
    error = "Please enter your message.";
    invalidFields = messageField;
  }

  // If validation fails, mark the field as invalid and focus it
  if (error) {
    invalidFields.setAttribute("aria-invalid", "true");

    formMessage.className = "form-message error";
    formMessage.textContent = error;

    invalidFields.focus();

    return;
  }

  // All fields are valid — show a success confirmation message

  formMessage.className = "form-message success";

  formMessage.textContent =
    `Thank you, ${name}! Your form is valid. ` +
    "This portfolio demo does not send messages.";

  // Reset the form fields after successful validation
  contactForm.reset();
});

// ========================================
// Current Year
// ========================================

// Set the footer copyright year to the current year automatically
year.textContent = new Date().getFullYear();

// ========================================
// Back to Top Button
// ========================================

const backToTop = document.getElementById("backToTop");

// Show the back-to-top button when the user scrolls past 300 pixels
window.addEventListener("scroll", function () {
  backToTop.hidden = window.scrollY < 300;
});

// Scroll smoothly to the top of the page when the button is clicked
backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Set initial visibility based on the current scroll position
backToTop.hidden = window.scrollY < 300;