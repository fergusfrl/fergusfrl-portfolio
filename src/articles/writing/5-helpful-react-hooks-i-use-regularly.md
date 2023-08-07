---
title: 5 Helpful React Hooks I use Regularly
description: Useful React Hooks
image: react.png
publishedDate: March 23, 2021
tags:
  - React
  - Hooks
snippet: This is a great hook which behaves similarly to useState but is stored on the browser local storage so state is persisted between sessions. With only minor changes, this hook can be adapted to session storage instead.
---

### 🗃️ useLocalStorage

This is a great hook which behaves similarly to useState but is stored on the browser local storage so state is persisted between sessions. With only minor changes, this hook can be adapted to session storage instead.

```js
// ./hooks.js

import { useState } from 'react';

export const useLocaleStorage = (key, initialValue) => {
	const [localeStorageValue, setLocaleStorageValue] = useState(() => {
		const item = window.localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	});

	const setValue = (value) => {
		setStoredValue(value);
		window.localStorage.setItem(key, JSON.stringify(value));
	};

	return [value, setValue];
};
```

```js
// ./Counter.jsx

import React from 'react';
import { useLocaleStorage } from './hooks.js';

const Counter = () => {
	const [count, setCount] = useLocaleStorage('count', 0);
	return (
		<>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
			<button onClick={() => setCount(count - 1)}>Decrement</button>
		</>
	);
};

export default Counter;
```

### 👈 usePrevious

`usePrevious` has a huge number of applications. One I've used recently is refining the behavior of `useEffect` hooks when large objects are passed in to the argument array. I compare the previous and the current object and then only execute code based on an expected change.

```js
// ./hooks.js

import { useEffect, useRef } from 'react;

export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
```

```js
// ./Counter.jsx

import React, { useState } from 'react';
import { usePrevious } from './hooks.js';

const Counter = () => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <p>Current Count: {count}. Previous Count: {prevCount}</p>
    <button onClick={() => setCount(count + 1)}>Increment</button>
    <button onClick={() => setCount(count - 1)}>Decrement</button>
  );
};

export default Counter;
```

### ⏱️ useAsync

This is a complex hook but incredibly useful for making asynchronous requests. I like that it is easily reused and supplies consistent pending, success and error states. In my opinion, it makes a codebase vastly more readable.

```js
// ./hooks.js

import { useCallback, useState } from 'react';

export const useAsync = (asyncFunction) => {
	const [value, setValue] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const execute = useCallback(() => {
		setIsPending(true);
		setValue(null);
		setError(null);

		return asyncFunction()
			.then((res) => {
				setValue(res);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setIsPending(false);
			});
	}, [asyncFunction]);

	useEffect(() => {
		execute();
	}, [execute]);

	return { execute, isPending, value, error };
};
```

```js
// ./Button.jsx

import React from 'react';
import { useAsync } from './hooks.js';

const getTemperature = () => axios.get('get/temperature/api');

const Button = () => {
  const { execute, isPending, value: temp, error } = useAsync(getTemperature);

  return (
    <>
      <button onClick={execute}>Get Temperature</button>
      { isPending ? (
        <p>Loading...</>
      ) : (
        <p>Temperature: {error ? 'Something went wrong' : temp}</p>
      ) }
    </>
  );
};

export default Button;
```

### 🛸 useHover

Hover state is an easy one for CSS but for react programming it gets messy adding and destroying event listeners. This is a simple hook that makes hover events easy to identify and build micro interactions around.

```js
// ./hooks.js

import { useEffect, useRef, useState } from 'react';

export const useHover = () => {
	const [value, setValue] = useState(false);
	const ref = useRef(null);

	const handleMouseOver = () => setValue(true);
	const handleMouseOut = () => setValue(false);

	useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener('mouseover', handleMouseOver);
			node.addEventListener('mouseout', handleMouseOut);

			return () => {
				node.removeEventListener('mouseover', handleMouseOver);
				node.removeEventListener('mouseout', handleMouseOut);
			};
		}
	}, [ref.current]);

	return [ref, value];
};
```

```js
// Button.jsx

import React from 'react';
import { useHover } from './hooks.js';

const Button = () => {
	const [hoverRef, isHovered] = useHover();

	return <button ref={hoverRef}>{isHovered ? 'Hover Me!' : 'Now Click!'}</button>;
};

export default Button;
```

### 🏕️ useOnClickOutside

I've included `useClickOutside` even though it is very similar to `useHover`, only because this was the first hook I wrote and subsequently marveled at how simple and easy it made react programming. This hook creates and destroys event listeners for a node and is incredibly useful for working with popups and dialogs.

```js
// ./hooks.js

import { useEffect } from 'react';

export const useOnClickOutside = (ref, handler) => {
	useEffect(() => {
		const listener = (event) => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			handler(event);
		};

		document.addEventListener('mousedown', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
		};
	}, []);
};
```

```js
// ./Button.jsx

import React, { useRef } from 'react';
import { useOnClickOutside } from './hooks.js';

const Button = () => {
  const ref = useRef();
  useOnOutsideClick(ref, () => alert('Outside Click!));
  return <button ref={ref} onClick={() => alert('Inside Click!')}>Click somewhere on the page</button>;
};

export default Button;
```

Happy Coding! 🎉
