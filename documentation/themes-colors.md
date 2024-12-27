# Theme Implementation in Patient Portal

This document outlines the implementation of Light and Dark themes for the Patient Portal dashboard. It leverages Tailwind CSS and custom CSS properties defined in the `tailwind.config.js` and `app.css` files.

## 1. Overview

The theme system allows users to switch between multiple themes (Light/Dark) and customize it further using different theme options (Blue, Mint, Grey, Teal, Gold). The primary goal is to update the application's appearance dynamically, based on user preference.

### 1.1 Tailwind CSS Configuration

In the `tailwind.config.js` file, we extend the default theme by adding custom colors. These colors are mapped to CSS variables, which are then modified based on the selected theme.

## 2. CSS Custom Properties

### 2.1 Global CSS Variables (in app.css)

We define the default color scheme and the CSS custom properties (variables) that will be used throughout the app for each theme. The colors are defined under :root for light mode and data-theme='dark' for dark mode. Additionally, each theme option (e.g., Blue, Mint, Grey, Teal, Gold) has its own configuration.

## 3. Svelte Component for Theme Switching

In the Navbar.svelte file, there is a menu for the user to select the theme. The mode (Light or Dark) and options (e.g., Blue, Mint, Grey, Teal, Gold) are displayed as buttons. When a user selects a theme, the corresponding CSS variables are applied dynamically.

### 3.1 Mode and Option Selection

We define the themeModes (Light/Dark) and themeOptions (e.g., Blue, Mint, Grey, etc.) in the script section of the Navbar.svelte component.

### 3.2 HTML Structure for Theme Menu

The HTML structure of the Navbar.svelte file includes a user menu with an option to select the theme. When the user selects a theme or option, the handleModeChange or handleOptionChange functions are triggered.


