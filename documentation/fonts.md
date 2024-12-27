# Integrating Lato Font in SvelteKit

This guide will walk you through integrating the `Lato-Regular.ttf` font into your SvelteKit project and applying it globally.

## Steps

### 1. Download the Font

- Download the `Lato-Regular.ttf` font file from a trusted source. You can get it from Google Fonts or any other font service.
- Save the file as `Lato-Regular.ttf`.

### 2. Place the Font File in the Static Folder

- In your SvelteKit project, navigate to the `static` folder.
- Create a new folder named `fonts` inside the `static` folder if it doesn’t exist.
- Place the `Lato-Regular.ttf` file inside the `static/fonts/` folder.

### 3. Update the CSS to Use the Font

Next, you need to modify your global `app.css` (or any global stylesheet you are using) to include the `Lato` font.

1. Open `app.css`.
2. Add the following CSS to define the font face and apply it globally.

```css
/* Define the Lato font */
@font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/Lato-Regular.ttf') format('truetype');
}

/* Apply Lato font globally */
* {
    font-family: 'Lato', sans-serif;
}
