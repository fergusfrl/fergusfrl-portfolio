---
title: Send Notification Email When Strapi Blog is Published
description: Send an email to blog subscribers when new blogs are published using Twilio SendGrid
publishedDate: October 29, 2020
tags:
  - Firebase
  - Google Cloud Platform
  - Strapi
  - SendGrid
---

I subscribed to a number of blogs and online content creators. Some of them helpfully notify me when there is a new item published. In this post, we will learn how Strapi life cycle callbacks can be used with Twilio SendGrid to notify subscribers when we publish a new blog. We will finish by deploying our Strapi project to Heroku.

### Prerequisites

- Strapi Project with at least one Collection Type Refer to the Strapi Getting Started to set this up. Strapi have excellent documentation so this should take no longer that 15 minutes.
- Twilio Account with a Single Sender Address Follow the SendGrid API Getting Started guide for details. This took me about 20 minutes.

### Adding the Strapi Life Cycle Callback

First, identify the Collection Type which you want to add a "create" notification to, for me is is Blog. I will use the Collection Type Blog in all examples from now on so substitue your own collection type where required.

#### 1. Install Dependencies

We will use the axios and @sendgrid/mail npm packages. `$ npm install axios @sendgrid/mail`.

#### 2. Cut some Code

I've choosen to notify subscribers when a blog is first successfully published, I need to use `afterCreate` lifeCycle method. Another good one for subscriptions would be `afterUpdate` but I'm just going to work with the create method for now. Update your code to the following:

```js
// strapiProject/api/blog/models/Blog.js

"use strict";
const axios = require("axios");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    afterCreate: async blog => {
        const { title, slug } = blog.attributes; // available attributes will depend on your Collection Type attributes
        const message = {
            to: [<list of subscriber email address strings>],
            from: <SendGrid verified single sender email address>,
            subject: `New Blog Post: ${title}`,
            text: `Hello, I've just published a new blog called '${title}'. Read it here: ${slug}`,
        };

        await sgMail
            .send(message)
            .then(() => {
                console.log('Email sent');
             })
             .catch(err => {
                 console.error('Email not sent');
                 console.error(err);
             });
    }
```

That's it! That's the code - if you're not already a member, welcome to the cloud.

### Deploying to Heroku

I host my Strapi projection Heroku because it's free and easy to use but you can use any hosting platform.

If this is a brand new project and you haven't deployed your Strapi project to Heroku before then once again, I must recommend the Strapi documentation. This can take some time to get right, my first deploy took about 30 minutes so make yourself a cup of tea before starting.

If your Strapi project has already been deployed to Heroku then you will know that a redeploy is as easy as:

```bash
$ git add .
$ git commit -m "Added blog lifecycle callback"
$ git push heroku master
```

There is one final step - we need to add the `SENDGRID_API_KEY` key to Heroku environment variables. Get the API gey from your SendGrid account.

```bash
$ heroku config:set SENDGRID_API_KEY=<copied API key>
```

#### Get Writing

Awesome stuff! Now it's time to test our new functionality. I wrote a brand new blog (this one in fact) and when I saved it, emails were sent to some of my friends who were interested in this project.

There's so much potential with Strapi lifecycle callbacks - I'm excited to play with them some more an automate all the things!!
