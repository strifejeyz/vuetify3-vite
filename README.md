# Barebones Template: Vuetify 3 + Vue 3 + Vite + Router + Vuex

This project is a barebones starter template integrating:

- **Vuetify 3** for UI components
- **Vue 3** as the core framework
- **Vite** for fast and modern build tooling
- **Vue Router** for routing
- **Vuex** for state management

## Features

- Pre-configured Vuetify 3 setup
- Ready-to-use routing with Vue Router
- State management with Vuex
- Vite-based development server and build process
- Lightweight and extendable structure

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/strifejeyz/vuetify3-vite
   cd vuetify3-vite
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

## Usage

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```
or 

```bash
vite
```

### Build for Production

Build the project for production:

```bash
npm run build
```
or 

```bash
vite build
```

---

## Project Structure

```plaintext
public/              # Static assets served directly
src/                 # Source code
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable Vue components
├── layouts/         # Application layouts
├── pages/           # Route views/pages
├── router/          # Vue Router configuration
├── store/           # Vuex store modules
├── styles/          # Global styles
├── utils/           # Utility functions
├── App.vue          # Root Vue component
├── main.js          # Application entry point
.browserslistrc      # Browserslist configuration
.editorconfig        # Editor configuration
.gitignore           # Git ignore rules
index.html           # Main HTML file
jsconfig.json        # JavaScript configuration
package-lock.json    # Lockfile for npm dependencies
package.json         # Project metadata and dependencies
settings.json        # VSCode settings
vite.config.js       # Vite configuration
```
