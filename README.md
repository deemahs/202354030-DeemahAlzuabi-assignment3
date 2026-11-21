# Deemah Alzuabi — Personal Portfolio

## Project Overview

This personal portfolio website was developed for Assignment 3 – Advanced Functionality. It builds on Assignments 1 and 2 by introducing external API integration, advanced JavaScript logic, state management, and performance improvements.

The portfolio showcases my academic background, technical skills, and selected projects.

## Featured Projects

- **Badelna:** A course section swapping application designed to help students manage section swap requests.
- **Flowly:** An AI-powered student assistant developed during a summer research experience.
- **Fayidh:** A surplus resource sharing platform developed for SWE 363. It allows organizations to share surplus materials and resources with students and businesses for commercial or non-profit purposes.
- **Student Social Media Analysis:** A beginner-level Python data analysis project exploring students' social media usage patterns.

## Features

- Responsive portfolio design.
- Dark and light mode with persistent theme preferences.
- Project filtering by technology.
- Alphabetical project sorting (A–Z and Z–A).
- Project filtering by skill level.
- GitHub REST API integration.
- Display of selected public GitHub repositories.
- API loading states, error handling, and retry functionality.
- Contact form validation.
- Back-to-top button with smooth scrolling.
- Lazy loading and asynchronous decoding for project images.
- Dynamic copyright year.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Git and GitHub
- GitHub REST API
- Browser localStorage

## Project Structure

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

## Setup Instructions

1. Clone or download the repository from GitHub.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using the Live Server extension.
4. Make sure an internet connection is available for GitHub API requests.
5. Explore the portfolio and its interactive features.

No additional package installation, backend server, database, or API key is required.

## API Integration

The website integrates the GitHub REST API to dynamically fetch public repository information.

**API Endpoint:**

`https://api.github.com/users/deemahs/repos?sort=updated&per_page=6`

JavaScript uses `fetch()` and `async/await` to request repository data.

The application filters the API response to display only selected public repositories.

Each repository card displays its name, description, programming language, and a link to GitHub.

If an API request fails, the website displays a user-friendly error message and provides a retry option.

## Complex Logic

The website uses advanced JavaScript logic to filter and sort projects.

Visitors can filter projects by technology, including JavaScript, Python, and Figma.

Projects can also be filtered by skill level: Beginner, Intermediate, or Advanced.

The sorting dropdown allows visitors to arrange projects alphabetically in ascending or descending order.

These features work together through the `updateProjects()` function, which updates project visibility, order, and status messages.

## State Management

The website uses browser `localStorage` to save the visitor's preferred theme.

When a visitor switches between dark and light mode, JavaScript updates the website's appearance and stores the selected preference.

The saved theme is restored when the website is reopened.

## Contact Form Validation

The contact form checks that the name, email address, and message fields are completed and that the email address has a valid format.

JavaScript displays appropriate validation feedback.

The form is a demonstration and does not send actual messages.

## Performance Optimization

The website includes:

- Lazy loading for project images.
- Asynchronous image decoding.
- Responsive layouts using CSS Grid, Flexbox, and media queries.
- Reusable JavaScript functions to reduce duplicated logic.

Performance and compatibility can be evaluated using Lighthouse and browser testing.

## AI Usage

ChatGPT and Claude were used to support the development and improvement of Assignment 3.

**ChatGPT** was used to understand assignment requirements, implement new features, integrate the GitHub API, review code, and prepare documentation.

**Claude** was used for debugging, checking possible conflicts between features, reviewing functionality, and correcting errors.

AI-generated suggestions were reviewed and adapted to the existing portfolio implementation.

Detailed information about AI assistance, modifications, and verification is available in the AI Usage Report (docs/ai-usage-report.md).

Complete AI conversations and original AI-generated artifacts are submitted separately through Blackboard.

## Technical Documentation

For implementation details, see the Technical Documentation (docs/technical-documentation.md).