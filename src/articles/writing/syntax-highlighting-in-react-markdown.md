---
title: Syntax Highlighting in React Markdown
description: A simple guide to display great looking markdown code blocks in react
publishedDate: December 02, 2019
tags:
  - React
  - Node
snippet: Building on the previous blog (see Displaying Strapi Rich Text in Gatsby), we can now consume markdown and render it as HTML. A problem with our markdown rendering that you may have noticed that code blocks are totally uninspiring - light grey background with a black "formatted" type face.
---

Building on the previous blog (see Displaying Strapi Rich Text in Gatsby), we can now consume markdown and render it as HTML.

A problem with our markdown rendering that you may have noticed that code blocks are totally uninspiring - light grey background with a black "formatted" type face. It would be far more useful to be able to display markdown code blocks with syntax highlighting which can adapt to the language you're displaying, like this:

```js
// javascript
const syntaxHighlight = () => 'look at all the pretty colors';
```

```python
# python
def syntaxHighlight():
  return "it works in python too!"
```

😲 looks good right!? This syntax theme along with others can be achieved by using the npm package react-syntax-highlighter.

```bash
$ npm install react-syntax-highlighter
```

Then we can create a component that will render code blocks with beautiful syntax highlighting dependent on the language. I've used the style "tomorrow" because I think it looks a lot like the default VS Code theme which many developers are already familiar and comfortable with.

```js
// ./CodeBlock.js
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, value }) => {
	return (
		<SyntaxHighlighter language={language} style={tomorrow}>
			{value}
		</SyntaxHighlighter>
	);
};

export default CodeBlock;
```

The next challenge is ensuring that only the code section of our markdown files has the SyntaxHighlighter styles applied. This is surprisingly simple yet underdocumented (in my opinion) feature of react-markdown which we used in the previous blog post.

The prop 'renderers' accepts a map of text types as keys and react components as values. We can pass our newly created `Code Block` as that component for `code`.

We then need to be sure that only the code section

```js
// ./RenderedMarkdown.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

const RenderedMarkdown = ({ content }) => (
	<ReactMarkdown source={content} renderers={{ code: CodeBlock }} />
);

export default CodeBlock;
```

Now our markdown code blocks are looking dazzling and sure to stand out in any blog or documentation you're working on 🙂
