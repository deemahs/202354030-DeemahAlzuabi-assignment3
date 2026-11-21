// ========================================
// Select Elements
// ========================================
const themeButton = document.getElementById("themeButton");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const year = document.getElementById("year");

// Select project filtering elements
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const filterState = document.getElementById("filterStatus");

// Project sorting elements
const projectSort = document.getElementById("projectSort");
const projectsGrid = document.getElementById("projectsGrid");
const originalProjects = Array.from(projectCards);

// ========================================
// Dark / Light Mode
// ========================================

// Apply theme and update accessibility

function applyTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  themeButton.textContent = isDark ? "☀️" : "🌙";

  themeButton.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );

  themeButton.setAttribute("aria-pressed", String(isDark));
}

// Restore saved theme from localStorage

try {
  const savedTheme = localStorage.getItem("portfolioTheme");

  applyTheme(savedTheme === "dark");
} catch (error) {
  applyTheme(false);
  console.warn("Could not load theme preference:", error);
}

// Save selected theme

themeButton.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark-mode");
  applyTheme(isDark);

  try {
    localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");
  } catch (error) {
    console.warn("Could not save theme preference:", error);
  }
});

// ========================================
// Dynamic Project Filtering and Sorting
// ========================================

let selectedFilter = "all";
// Update project visibility and order
function updateProjects() {
  const sortType = projectSort.value;

  // Start with the original project order
  const sortedProjects = [...originalProjects];

  // Sort projects alphabetically
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
    projectsGrid.appendChild(card);

    const technologies = card.dataset.technologies.split(" ");
    const matches =
      selectedFilter === "all" || technologies.includes(selectedFilter);

    card.hidden = !matches;

    if (matches) {
      visibleCount++;
    }
  });

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

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedFilter = button.dataset.filter;

    filterButtons.forEach(function (item) {
      const selected = item === button;

      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    updateProjects();
  });
});

projectSort.addEventListener("change", updateProjects);
updateProjects();

// ========================================
// Assignment 3 - GitHub API Integration
// ========================================

const githubUsername = "deemahs";

const githubStatus = document.getElementById("githubStatus");
const githubRepos = document.getElementById("githubRepos");
const retryGithub = document.getElementById("retryGithub");

async function loadGitHubRepos() {
  githubStatus.textContent = "Loading repositories...";
  githubRepos.replaceChildren();
  retryGithub.hidden = true;

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(githubUsername)}/repos?sort=updated&per_page=6`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories");
    }

    const repos = await response.json();
    // Show only selected repositories
    const selectedRepos = [
      "202354030-DeemahAlzuabi-assignment3",
      "202354030-DeemahAlzuabi-assignment2",
      "202354030-DeemahAlzuabi-assignment1",
    ];

    const filteredRepos = repos.filter(function (repo) {
      return selectedRepos.includes(repo.name);
    });

    if (!Array.isArray(repos)) {
      throw new Error("Invalid GitHub API response");
    }

    if (filteredRepos.length === 0) {
      githubStatus.textContent = "No public repositories available.";
      return;
    }

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
    console.error("GitHub API Error:", error);

    githubStatus.textContent = "Unable to load repositories. Please try again.";

    retryGithub.hidden = false;
  }
}

retryGithub.addEventListener("click", loadGitHubRepos);

loadGitHubRepos();

// ========================================
// Contact Form
// ========================================

contactForm.addEventListener("submit", function (event) {
  // Prevent the form from actually submitting
  event.preventDefault();

  const nameFiled = document.getElementById("name");

  const emailFiled = document.getElementById("email");

  const messageFiled = document.getElementById("message");

  // Clear previous validation errors
  const fields = [nameFiled, emailFiled, messageFiled];

  fields.forEach(function (field) {
    field.removeAttribute("aria-invalid");
  });

  const name = nameFiled.value.trim();

  const email = emailFiled.value.trim();

  const message = messageFiled.value.trim();

  // Validate user input
  let error = "";
  let invalidFields = null;

  if (!name) {
    error = "Please enter your name.";
    invalidFields = nameFiled;
  } else if (!email) {
    error = "Please enter your email.";
    invalidFields = emailFiled;
  } else if (
    !emailFiled.validity.valid ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    error = "Please enter a valid email address.";
    invalidFields = emailFiled;
  } else if (!message) {
    error = "Please enter your message.";
    invalidFields = messageFiled;
  }
  // Display error feedback

  if (error) {
    invalidFields.setAttribute("aria-invalid", "true");

    formMessage.className = "form-message error";
    formMessage.textContent = error;

    invalidFields.focus();

    return;
  }

  // Display confirmation after validation

  formMessage.className = "form-message success";

  formMessage.textContent =
    `Thank you, ${name}! Your form is valid. ` +
    "This portfolio demo does not send messages.";

  // Clear form fields
  contactForm.reset();
});

// ========================================
// Current Year
// ========================================

year.textContent = new Date().getFullYear();
