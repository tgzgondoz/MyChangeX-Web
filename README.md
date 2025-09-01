# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Project Structure Analysis: MYCHANGEX-WEB

MYCHANGEX-WEB/
├── node_modules/          # Dependencies (ignored in Git)
├── public/                # Static assets served directly
├── src/                   # Main source code
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable UI components
│   ├── sections/          # Page sections/components
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── DashboardScreen.jsx
│   │   └── LoadingScreen.jsx
│   ├── App.css           # Main application styles
│   ├── App.jsx           # Root React component
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── .gitignore            # Git ignore rules
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package-lock.json     # Dependency lock file
├── package.json          # Project metadata and dependencies
├── README.md             # Project documentation
└── vite.config.js        # Vite configuration