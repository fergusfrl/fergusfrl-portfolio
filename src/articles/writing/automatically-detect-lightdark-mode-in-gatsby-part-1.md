---
title: Automatically Detect Light/Dark Mode in Gatsby (Part 1)
description: Detect system color schemes and apply them to a react app
publishedDate: October 15, 2019
tags:
  - React
  - Gatsby
snippet: With the release of iOS 13 in September, MacOS Mojave in 2018 and the roadmap for all major browsers (Chrome, Firefox, Safari), - not to mention the big name apps - we are entering the age of Dark Mode. I'm not here to discuss the benefits/drawbacks of dark mode, you can find many articles discussing this topic online.
---

### Dark Mode

With the release of iOS 13 in September, MacOS Mojave in 2018 and the roadmap for all major browsers (Chrome, Firefox, Safari), - not to mention the big name apps - we are entering the age of Dark Mode. I'm not here to discuss the benefits/drawbacks of dark mode, you can find many articles discussing this topic online. I particularly enjoyed Moving towards a future of Dark UI and Dark mode is everywhere. Is it really better for you?.

### So What Is It?

I imagine you've seen dark mode websites and apps before. Effectively, dark mode is the inverse to the typical "dark-text-on-white-paper". Some apps provide you with a toggle button to switch between light and dark modes. In modern browsers and OS's, a system light/dark mode setting may be available. It would be great if we could detect whether that system dark mode is enabled and render our site accordingly. Today we will learn to do that in Gatsby.

### Detecting Dark Mode

Our bread and butter for this feature will be the CSS media query prefers-color-scheme. This media query does exactly what we require, it detects the systems prefered color scheme.

```css
/* styles.css */

@media (prefers-color-scheme: light) {
	.app {
		background-color: white;
		color: black;
	}
}

@media (prefers-color-scheme: dark) {
	.app {
		background-color: black;
		color: white;
	}
}
```

Perfect! Now if a system dark mode was switched on, the .app would render a black background with white text. If not, we would see the normal white background with black text.

### So We're Done. Right?

Well yes, if all you want is to enforce the system settings. However wouldn't it be great to initially render the app based on the system color scheme mode, then allow the user to toggle it between light/dark mode. This way, users on OS's and browsers without dark mode system settings or which are non-compatible with `prefers-color-scheme` can still take advantage of whichever color scheme works best for them.

Adding a toggle to switch between light and dark mode is rathar straight forward. It is a simple boolean value ehich is used to determine class names. I'm sure we're all familiar with something like this:

```js
// App.jsx

import React from 'react';

const App = ({ children }) => {
	const [darkMode, setDarkMode] = React.useState(false);

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
	};

	return (
		<div className={darkMode ? 'app dark' : 'app'}>
			{children}
			<button onClick={toggleDarkMode}>toggle dark mode</button>
		</div>
	);
};

export default App;
```

We can then write our CSS to target the `.app` and the `.app.dark` classes. You can change the classes style values directly, however I have found that using CSS variables for this approach works really well because those variables can then be reused with any other class in the file.

```css
/* styles.css */

.app {
	--primary-background-color: white;
	--primary-text-color: black;

	background-color: var(--primary-background-color);
	color: var(--primary-text-color);
}

.app.dark {
	--primary-background-color: black;
	--primary-text-color: white;
}

.any-other-class {
	/* has access to the CSS variables */
	color: var(--primary-text-color);
}
```

Great! Now we can toggle between light and dark mode. But hold on - looking back at our `App.js`, we see this line `const [darkMode, setDarkMode] = React.useState(false)`. We are initiating our dark mode to false and in the process we have lost our ability to detect the system darkmode! Oh no!

### Detecting Dark Mode 2.0 - Javascript Edition

Not to worry, we have access to detect-color-scheme in our `App.js` file using the `window` object. `window.matchMedia("(prefers-color-scheme: dark)").matches` will return a boolean value with `true` if a system dark mode is enabled, otherwise `false`. We can use that logic directly in the `useState()` react hook but I prefer to use the `useEffect` react hook. The reasoning behind this will be clear soon.

```js
// App.jsx

import React from 'react';

const App = ({ children }) => {
	const [darkMode, setDarkMode] = React.useState(false);

	// detect system dark mode
	const systemDarkMode =
		window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

	// apply system dark mode
	React.useEffect(() => {
		setDarkMode(systemDarkMode);
	}, [systemDarkMode]);

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
	};

	return (
		<div className={darkMode ? 'app dark' : 'app'}>
			{children}
			<button onClick={toggleDarkMode}>toggle dark mode</button>
		</div>
	);
};

export default App;
```

### It's Working!

Awesome stuff! We now have an app which can automatically detect a system color scheme and apply it to our styling. Furthermore we've enabled users to interact with our apps color scheme themselves.

In part 2 of this blog series, we will take this feature and apply it to a Gatsby app.
