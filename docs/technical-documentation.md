# Technical Documentation — Assignment 3

**Student Name:** Deemah Alzuabi  
**Student ID:** 202354030  
**Project:** Personal Portfolio Website

## 1. Project Overview

Assignment 3 extends the personal portfolio website developed in Assignments 1 and 2 by introducing advanced JavaScript functionality, external API integration, state management, and performance improvements.

The application is a client-side website built using HTML, CSS, and JavaScript.

## 2. Application Architecture

The website uses three main technologies:

- **HTML5:** Defines the structure and content of the website.
- **CSS3:** Controls styling, layout, responsiveness, and dark mode.
- **JavaScript:** Handles user interactions, API requests, project filtering and sorting, form validation, and state management.

The project does not require a backend server or database.

### Project Structure

```text
202354030-DeemahAlzuabi-assignment3/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── Badelna.png
│   └── Flowly.png
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── README.md
└── .gitignore
```

## 3. Project Filtering and Sorting

The Projects section allows visitors to filter projects by technology and skill level and sort them alphabetically.

Each project card contains custom HTML data attributes, such as:

```html
data-technologies="html css javascript"
data-name="Fayidh"
data-level="advanced"
```

JavaScript reads these attributes to determine which projects should be displayed and how they should be sorted.

### 3.1 Technology Filtering

Visitors can filter projects using the following options:

- All
- JavaScript
- Python
- Figma

The selected technology is compared with each project's `data-technologies` attribute.

When "All" is selected, all projects pass the technology filter.

### 3.2 Skill-Level Filtering

Visitors can filter projects by:

- All Levels
- Beginner
- Intermediate
- Advanced

JavaScript compares the selected level with the project's `data-level` attribute using strict equality (`===`).

All level values are stored in lowercase to match the dropdown options.

A project is displayed only when it matches both the selected technology and skill level.

### 3.3 Project Sorting

The sorting dropdown supports:

- Default Order
- Name A–Z
- Name Z–A

JavaScript uses `Array.sort()` and `localeCompare()` to sort project cards alphabetically.

The original project order is preserved using the `originalProjects` array.

### 3.4 Combined Logic

The `updateProjects()` function handles technology filtering, skill-level filtering, and sorting.

Whenever a visitor changes a filter or sorting option, the function updates the displayed projects and the status message.

## 4. GitHub API Integration

The portfolio integrates the GitHub REST API to fetch public repository information dynamically.

### 4.1 API Endpoint

`https://api.github.com/users/deemahs/repos?sort=updated&per_page=6`

### 4.2 Selected Repositories

The application filters the API response to display only the following repositories:

- `202354030-DeemahAlzuabi-assignment3`
- `202354030-DeemahAlzuabi-assignment2`
- `202354030-DeemahAlzuabi-assignment1`

### 4.3 Request Process

1. JavaScript sends an HTTP GET request using `fetch()`.
2. The application checks the HTTP response status using `response.ok`.
3. The JSON response is converted into JavaScript objects using `response.json()`.
4. The returned repositories are filtered to display only the selected repositories.
5. Repository cards are created dynamically using `document.createElement()`.
6. Each card displays the repository name, description, programming language, and a link to the repository.

### 4.4 Error Handling

The API integration uses `async/await` and `try...catch` to handle requests and errors.

If an API request fails, the website displays a user-friendly error message and a retry button.

If none of the selected public repositories are found, the website displays the message:

"No public repositories available."

### 4.5 API Limitations

The API only provides information about public repositories.

An internet connection is required, and GitHub API rate limits may affect availability.

When the API request uses `per_page=6`, only six repositories are returned. Selected repositories outside those six results will not be displayed.

## 5. State Management

The website uses browser `localStorage` to remember the visitor's preferred theme.

When the visitor switches between dark and light mode, JavaScript updates the `dark-mode` class and saves the preference using the key `portfolioTheme`.

When the website is reopened, the saved preference is retrieved and applied.

Storage operations are wrapped in `try...catch` blocks to handle cases where `localStorage` is unavailable.

## 6. Contact Form Validation

The contact form contains three required fields:

- Name
- Email
- Message

JavaScript checks that all required fields are completed and that the email address has a valid format.

Email validation uses the browser's `validity.valid` property and a regular expression.

JavaScript prevents the default form submission using `event.preventDefault()`.

If validation fails, the invalid field receives the `aria-invalid="true"` attribute, an error message is displayed, and the field receives focus.

If all inputs are valid, the website displays a confirmation message and resets the form.

The contact form is a demonstration and does not send messages to a backend service.

## 7. Back-to-Top Functionality

The back-to-top button responds to the visitor's scroll position.

When the visitor scrolls more than 300 pixels down the page, the button becomes visible.

Clicking the button uses `window.scrollTo()` with smooth scrolling to return to the top of the page.

The button's visibility is controlled using the `hidden` property.

## 8. Performance Optimization

The website includes the following performance-related improvements:

- Lazy loading for project images using `loading="lazy"`.
- Asynchronous image decoding using `decoding="async"`.
- Responsive CSS layouts using Grid and Flexbox.
- Reuse of the `updateProjects()` function for filtering and sorting.
- CSS media queries for tablet and mobile layouts.
- A `prefers-reduced-motion` media query to reduce animations for visitors who prefer reduced motion.

## 9. Accessibility

The portfolio includes the following accessibility-related features:

- Descriptive alternative text for project images.
- Labels for form fields and dropdown menus.
- `aria-label` attributes for interactive elements.
- `aria-pressed` attributes for filter buttons and the theme toggle.
- `aria-live` and `role="status"` for status messages.
- `aria-invalid` for invalid form fields.
- Keyboard-accessible buttons and visible focus indicators.
- Reduced-motion support through CSS.

## 10. Testing and Verification

The following table summarizes the functional tests reported for the project.

| Test | Expected Result | Reported Result |
|---|---|---|
| Technology filtering | Matching projects appear | Passed |
| Alphabetical sorting | Projects appear in the selected order | Passed |
| Skill-level filtering | Projects match the selected level | Passed |
| Combined filtering and sorting | Filters and sorting work together | Passed |
| GitHub API | Selected repositories load successfully | Passed |
| API error handling | An error message and retry button appear | Passed |
| Theme persistence | The selected theme remains after reloading | Passed |
| Contact form validation | Invalid inputs are rejected | Passed |
| Back-to-top button | The page scrolls to the top when clicked | Passed |
| Mobile responsiveness | The layout adjusts to smaller screens | Passed |


## 11. Known Limitations

- The contact form does not send actual messages.
- GitHub API requests require an internet connection.
- Only public GitHub repositories can be displayed.
- GitHub API rate limits may affect availability.
- Repository selection is limited to the results returned by the configured API request.
- The application does not use a backend server or database.
