## Steps to implement Themes mode and colors

1. **Define custom colors using CSS variables into tailwind.config.js**

The extend.colors object defines custom colors using CSS variables (var(--primary-color), etc.).
This approach is flexible and allows dynamic theming.

```tailwind.config.js

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        base: 'var(--base-color)',
        info: 'var(--info-color)',
        accent: 'var(--accent-color)',
        neutral: 'var(--neutral-color)',
        error: 'var(--error-color)',
        success: 'var(--success-color)',
        active: 'var(--active-color)',
        outline: 'var(--outline-color)'
      }
    }
  }
}
```

2. **Setting colors into app.css file for Dark, Light mode and for specific color**

```app.css

:root {
	--primary-color: #ffffff;
	--secondary-color: #fbfbfb;
	--outline-color: #cacadb;
	--accent-color: #f5f6f8;
	--neutral-color: #eaeaef;
	--base-color: #fff;
	--info-color: #1c252a;
	--error-color: #e02222;
	--success-color: #50c878;
	--active-color: #eaeaef;
}

[data-theme='dark'] {
	--primary-color: #1c252a;
	--secondary-color: #293338;
	--outline-color: #64748b;
	--accent-color: #232c32;
	--neutral-color: #3a4e5c;
	--base-color: #111827;
	--info-color: #d9dee9;
	--error-color: #e02222;
	--success-color: #10b981;
	--active-color: #3a4e5c;
}

[data-theme='light'][data-theme-option='blue'] {
	--primary-color: #ffffff;
	--secondary-color: #fbfbfb;
	--accent-color: #f5f6f8;
	--base-color: #eff6ff;
	--info-color: #1a202c;
	--error-color: #e02222;
	--success-color: #10b981;
	--active-color: rgba(0, 149, 255, 0.244);
}

```

3. **Use theme modes and colors into Navbar.svelte component file**

```Navbar.svlete

<script lang="ts">
	// Default selected mode and theme option
	let selectedMode = 'Light';
	let selectedOption = 'Blue';

	// Available theme modes (Light and Dark)
	const themeModes = ['Light', 'Dark'];

	// Available theme options with colors
	const themeOptions = [
		{ name: 'Blue', color: 'rgba(0, 150, 255, 0.1)', borderColor: 'rgba(0, 150, 255, 1)' },
		{ name: 'Mint', color: 'rgba(78, 197, 90, 0.1)', borderColor: 'rgba(78, 197, 90, 1)' },
	];

	// Change theme mode (Light/Dark)
	const handleModeChange = (theme: string) => {
		selectedMode = theme;
		document.documentElement.setAttribute('data-theme', theme.toLowerCase());
		applyThemeOption(); // Apply selected theme option
	};

	// Change theme option (e.g., Blue, Mint)
	const handleOptionChange = (option: string) => {
		selectedOption = option;
		applyThemeOption(); // Apply selected theme option
	};

	// Apply selected theme option's styles
	const applyThemeOption = () => {
		document.documentElement.setAttribute('data-theme-option', selectedOption.toLowerCase());
		const themeOption = themeOptions.find(opt => opt.name === selectedOption);
		if (themeOption) {
			document.documentElement.style.setProperty('--theme-border-color', themeOption.borderColor);
		}
	};
</script>

<!-- UI for theme and mode selection -->
<div>
	<p>Appearance</p>
	{#each themeModes as theme}
		<!-- Switch between Light and Dark modes -->
		<button on:click={() => handleModeChange(theme)}>{theme}</button>
	{/each}

	<p>Themes</p>
	{#each themeOptions as { name, color }}
		<!-- Select a theme option (e.g., Blue, Mint) -->
		<button on:click={() => handleOptionChange(name)} style="background-color: {color};">
			{name}
		</button>
	{/each}
</div>