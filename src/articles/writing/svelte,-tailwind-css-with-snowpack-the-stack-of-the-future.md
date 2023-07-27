---
title: Svelte, Tailwind CSS with Snowpack - the stack of the future
description: Build lightweight, blazingly fast UI's by bundling Svelte and Tailwind CSS with Snowpack
publishedDate: November 21, 2020
tags:
  - Typescript
  - Svelte
  - Snowpack
  - Tailwind CSS
snippet: "The Stack of the Future" That's a bold statement. "What's wrong with my current stack?" - You might ask. In the last 5 years of web UI development, it's been common practice to pick one of React, Angular or Vue, choose a CSS library like Bootstrap then bundle it all using Babel or Webpack.
---

"The Stack of the Future"

That's a bold statement. "What's wrong with my current stack?" - You might ask.

In the last 5 years of web UI development, it's been common practice to pick one of React, Angular or Vue, choose a CSS library like Bootstrap then bundle it all using Babel or Webpack. As is the way with javascript there are alternatives to these technologies but fundamentally they work using similar practices. This stack is functional - however it does result in _large bundle sizes_ and full rebuilds during development, both of which impact performance.

Svelte, Tailwind CSS and Snowpack (STCS) come together to solve these problems - and coming from a developer - I've been blown away with the speed of changes and the developer experience working in the STCS stack.

### Technology

#### Svelte

Svelte is a component based framework like React or Angular - however, Svelte moves complexity from the client to the compiler stage. By moving complexity to the compiler, the client browser is no longer responsible for calculating/diffing the virtual DOM and updating, instead Svelte uses vanilla javascript to interact with the DOM directly. The result is an incredibly performant experience with minimal browser overhead.

#### Tailwind CSS

On it's surface, Tailwind appears to be just another CSS library like Bootstrap or Material UI but Tailwind CSS offers a single game changing feature; it removes all unused CSS upon build. This is great, it results in smaller CSS bundles which in turn increases our sites build speed and in browser performance.

#### Snowpack

Snowpack is a bundler like Babel or Webpack. A bundler takes all your files as an input and splits out a single, minified, optimized set of files which we can use to serve content. Snowpack differs from Babel and Webpack because it does not require a full rebuild every time a local file is saved, instead Snowpack only rebuilds the file which has changed. This approach results in the UI updating instantly. I've found Snowpack's instant feedback to be incredible to develop UI's with.

### Getting Started

Let's build a hello world on the STCS stack.

#### Bootstrap from a Template

I used this template from Snowpack to bootstrap the application and dependencies. I've chosen to use Typescript, use this template instead to setup using regular javascript.

```bash
$ npx create-snowpack-app svelte-tailwind-snowpack --template @snowpack/app-template-svelte-typescript
```

Once complete - run `npm start` just to see how fast the start up for this application is. It's amazing 🙂

#### Install Tailwind CSS

Install the required dependencies.

```bash
$ npm install --save-dev autoprefixer postcss tailwindcss
```

Generate a `tailwind.config.js` file by running the following command:

```bash
$ npx tailwind init
```

Create a new file, `postcss.config.js` in the root directory. Add the following content:

```js
// postcss.config.js

module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {}
	}
};
```

Create a new file, main.css in the `./src` directory. Add the following content:

```css
/* src/main.css */

@import 'tailwindcss/dist/base.css';
@import 'tailwindcss/dist/components.css';
@import 'tailwindcss/dist/utilities.css';
```

Finally, import the main.css file into App.svelte `<script>` block:

```js
// App.svelte

<script lang="typescript">
    import './main.css';
</script>
...
```

#### Start Coding

We can now start adding Tailwind CSS elements and watch them appear instantly on the screen. Try adding the following to App.svelte:

```js
// App.svelte

<div class="App">
	<button class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
		Click me
	</button>
</div>
```

That's it! I hope you're loving the STCS stack as much as I am! As always, you can find the code on my Github. Happy Coding! 🎉
