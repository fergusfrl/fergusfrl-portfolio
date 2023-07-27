---
title: Displaying Strapi Rich Text in Gatsby
description: Supplying rich text from the Strapi CMS and displaying it in Gatsby
publishedDate: November 10, 2019
tags:
  - React
  - Gatsby
  - Strapi
  snippet: As of Strapi v3@alpha.12, we were introduced to the rich text content type field, or What You See Is What You Get (WYSIWYG). This is a helpful feature letting us make use of bolding and italics and we could now embed code snippets, images, links and more.
---

As of Strapi v3@alpha.12, we were introduced to the rich text content type field, or What You See Is What You Get (WYSIWYG). This is a helpful feature letting us make use of bolding and italics and we could now embed code snippets, images, links and more.

However, you may run in to a snag when displaying this data in your Gatsby (or any frontend framework) App. If you try to display rich text directly, you may see something similar to this:

One thing you might notice when looking at the block of somewhat nonsensical text above is that it is remarkably similar the Markdown - if fact _it is Markdown!_ So now the problem becomes - "how can we render markdown in javascript"?

If you're at all familiar with frontend javascript, it probably won't surprise you that there is an npm module that does exactly this, react-markdown:

```bash
$ npm install react-markdown
```

Now we can pass in our markdown from Strapi to the ReactMarkdown component for beautiful rendering:

```js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const StyledMarkdown = ({ content }) => {
	return <ReactMarkdown source={content} />;
};

export default StyledMarkdown;
```

Are you interested is seeing the result of the styled markdown? You are looking at it right now! This blog post was written in Strapi rich text editor, passed to Gatsby as markdown then finally rendered using react-markdown.

One thing I have left out is syntax highlighting for code block, that will be in another blog post coming soon.
