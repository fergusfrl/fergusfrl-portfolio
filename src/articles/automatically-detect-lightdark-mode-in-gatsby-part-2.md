---
title: Automatically Detect Light/Dark Mode In Gatsby (Part 2)
description: Using Gatsby to statically bundle our automatic dark mode app
publishedDate: October 17, 2019
tags:
  - React
  - Gatsby
---

### Recap

In part one of this blog series, we successfully detected and applied the system color scheme to out react app, but we didn't stop there. We also gave the user the ability to toggle between the light and dark modes of our app despite their system color scheme preferences.

### So Let's Bundle it Using Gatsby

Sounds good. I used the Gatsby default starter and and updated the `./src/components/Layout.js` and `./src/components.Layout.css` to contain the code we worked on in part 1. Like This:

```js
// ./src/components/Layout.js

import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
	const [darkMode, setDarkMode] = React.useState(false);

	const checkDarkMode =
		window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

	React.useEffect(() => {
		setDarkMode(checkDarkMode);
	}, [checkDarkMode]);

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

export default Layout;
```

```css
/* ./src/components/Layout.css */

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
```

Then we can run `gatsby develop` and then navigate to the uri in our consoles output (usually localhost:8000) to view our app.

### It Works!

Well at first glance yes. The system color scheme will have been detected and applied and we can toggle between color schemes. But there is a problem.

Everytime we link to a new page, the default color scheme will be applied again. This means that if we have switched to dark mode manually when out system color scheme is light, each page navigation will reapply the light theme. Gatsby is designed to move between pages "blazingly" fast so we need to find a way to fix this problem.

The problem is that our Layout component is being rerendered on each page change which is resulting in our logic reassesing the system color scheme and applying it. To avoid this behaviour, we can make use of the Gatsby's browser API, specifically the wrapPageElement function. I encounrage you to read the docs for yourself but effectively, the wrapPageElement is a component which will wrap the entire application, and importantly, does not re-render on page navigation. We can make use of that by adding to the `./gatsby-browser.js` file:

```js
// ./gatsby-browser.js

import React from 'react';
import Layout from './src/components/layout';

import './src/components/layout.css';

export const wrapPageElement = ({ element, props }) => {
	return <Layout {...props}>{element}</Layout>;
};
```

The code above wraps our entire Gatsby application in the Layout components. Neat! If you view the app now, you will be seeing double. Now that the entire app is wrapped with the Layout component, the individual pages (found in the .src/pages/ directory) no longer require that component so go ahead and remove it.

### Now It Really Works!

Well nearly. The app will works well in the gatsby develop mode but while that mode is great for editing files on the fly, it does not perfectly mimic how files are served in production. To test our app in production, we can run:

```bash
$ gatsby build
```

Followed by:

```bash
$ gatsby serve
```

Now we can navigate to the url output in our terminal (usually localhost:9000). Notice anything wrong? Our styles haven't been applied! What's going on? Well a clue can be found when we navigate away from the app's entry point. If we go to another page, `localhost:9000/page-2` or even the 404 page `localhost:9000/not-a-page`, and now reload - we CAN see our styles! What's happening?

### Server Side Rendering

Part of the brilliance of Gatsby is that the entry point page or index.js is rendered on the server and served to the client as pure html. This allows for crazy fast load times which is exactly what we want when someone first enters our app. Unfortunately, when rendering on an external server, we cannot get the system color scheme. This missing peice is causing our styles to fly completely out of whack.

To fix this problem, we can make use of Gatsby SSR (Server Side Rendering) API. Like with the browser API, we want to use the wrapPageElement function. Now that we're familiar with the Browser API, we can probably predict how this wrapPageElement function of the SSR API will work. It will wrap the SSRed page! So based on that, we can apply the exact same changes to the ./gatsby-ssr.js files as we did in gatsby-browser.js.

```js
// ./gatsby-browser.js

import React from 'react';
import Layout from './src/components/layout';

import './src/components/layout.css';

export const wrapPageElement = ({ element, props }) => {
	return <Layout {...props}>{element}</Layout>;
};
```

Ok nearly there. There is one last hiccough - we access the `window` object in our Layout component but when rendering on an external server, we don't have access the the `window` object as that is generated on the client with the DOM. We can still use it but we will need to add an `undefined` check to make sure it's safe to use.

```js
// ./src/components/Layout.js

import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
	const [darkMode, setDarkMode] = React.useState(false);

	/*
	 * window will be undefined during SSR
	 * we must wait until it is available on the client before
	 * checking for system color scheme.
	 */
	const checkDarkMode =
		typeof window !== 'undefined' &&
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches;

	React.useEffect(() => {
		setDarkMode(checkDarkMode);
	}, [checkDarkMode]);

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

export default Layout;
```

### Now it Actually Does Work... Right?

_YES!_ Congratulations - our Gatsby app is ready to go out into the world to automatically detect users system color scheme and apply it's theme according. It works with server side rendering and across different routes.

### Further Improvements

Another improvement which I would like to see done, but which I haven't implemented myself yet, is to keep a record of the manually applied color scheme in local storage. Remember, not all users have OS's or browsers that allow them to set system color schemes so it would be great if we could automatically apply them for those users for when they leave then come back to the site. I'll leave this challenge up to you to implement.

Thanks for reading - I hope this has helped you implement dark mode on your Gatsby Apps.
