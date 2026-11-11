# Understanding Five Fundamental Beliefs of the Seventh-day Adventist Church

## Team

| Team member | Student number | Current checkpoint contribution |
| --- | --- | --- |
| Phone Pyae Kyaw | 202300359 | React page structure and interactions; README and demo preparation |
| Saw Ke Blute | 202300154 | Responsive Tailwind layout and phone/desktop checks |

**Course:** IT363 - Front-End Web Development

## Project overview

This student project is an interactive introduction to five selected Seventh-day Adventist belief themes for Buddhist readers. It presents the themes as a connected timeline that visitors can explore at their own pace.

The project partner and named knowledge-holder in our project report is Pastor Adolpho Alex Bittencourt, pastor and teacher at Asia-Pacific International University. The belief summaries in the current prototype are short introductory drafts and must be checked with the knowledge-holder before publication.

### Five topics

1. The foundation - Scripture
2. The beginning - Creation
3. The problem - The Great Controversy
4. The solution - Christ
5. The future - Death and Resurrection

### Current prototype features

- Search the five topic titles and summaries.
- Filter the timeline by topic.
- Save topics and view the saved topics during the current visit. Saved topics are held in page state and are not stored after the page is refreshed.
- Use the responsive navigation and Tailwind layout. The team is checking the page at 360 px and desktop size as part of Issue 3.

## Run the project

### Requirements

- Node.js and npm
- Git

### Install and start

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal. To stop the development server, press `Ctrl+C`.

### Available commands

```bash
npm run dev      # Start the Vite development server
npm run build    # Build the production files
npm run lint     # Check the project with ESLint
npm run preview  # Preview a production build locally
```

## Project structure

```text
.
├── index.html          # Browser document and page title
├── src/
│   ├── App.jsx         # Page content, topic data, and interactions
│   ├── index.css       # Tailwind CSS import
│   └── main.jsx        # React application entry point
├── vite.config.js      # Vite, React, and Tailwind configuration
└── package.json        # Dependencies and project commands
```

## Team responsibilities and workflow

- **Phone Pyae Kyaw** leads the semantic React page, topic search/filter/save interactions, README, and class-demo preparation.
- **Saw Ke Blute** leads the responsive Tailwind layout and phone/desktop review.
- Tasks are tracked as GitHub issues with one owner and a due date. Work is done on task branches and submitted through pull requests for teammate review.
- Each teammate commits their own work using their own GitHub account. The team keeps commit, issue, pull-request, review, and weekly-log evidence for the course.

## Content, sources, and consent

The five topics are based on materials supplied for this project. The summaries are not a substitute for the full source material. Before publishing, the team will:

- Check the wording with the named knowledge-holder.
- Record the community and written sources, permissions, and credits in the project documentation.
- Prepare and check the main content in Thai and English. The current prototype text is English; the Thai version is still to be completed.
- Avoid publishing personal, sacred, or sensitive material without permission.
