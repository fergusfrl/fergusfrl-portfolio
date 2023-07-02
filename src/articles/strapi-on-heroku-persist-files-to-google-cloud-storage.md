---
title: Strapi on Heroku - Persist Files to Google Cloud Storage
description: Strapi images disappearing from media library? Learn how to persist files to Google Cloud Storage.
publishedDate: November 30, 2020
tags:
  - Cloud
  - Google Cloud Platform
  - Strapi
  - Heroku
---

### 😤 The Problem

A few weeks ago, I ran into a problem where images I uploaded to Strapi became unavailable after about an hour. When I viewed the media library, the images I had uploaded looked like this:

![one](https://storage.googleapis.com/fergusfrl-blog/media_library_blank_844b7e7e5f/media_library_blank_844b7e7e5f.png)

The problem is that I had deployed my Strapi project to Heroku.

### ⚛️ Heroku

Heroku is a free hosting platform which suites my budget 😋 Heroku is able to be so cheap because it's dyno file system is ephemeral. This means that files in dynos (like the postgresql dyno I use for Strapi) are only available while the dyno is active. This is great for serving content quickly but means that files are not persisted between dyno deploys.

On the Heroku free tier - dyno's are cleaned up after 1 hour of inactivity and redeployed upon requests.

Ok so we could ping the Heroku deploy once every hour to keep the dyno active however we will quickly chew through the free tier and we will encounter the same problem when we come to redeploy our solution.

### 🎯 The Solution

What we need to do is introduce a persistent file storage system which is external to Heroku. Strapi documentation suggests using AWS S3 or Cloudinary however I opted to use Google Cloud Storage as I'm more familiar with the infrastructure.

### 🗄️ Setup Google Cloud Storage

Before we touch our Strapi project we need to setup the GCP storage bucket.

#### 1. Provision Storage Bucket

If you don't already have a GCP account, set one up for free here. It does require entering credit card details but nothing we provision will exceed the free tier.

Navigate to Storage and select the CREATE BUCKET button.
Name your bucket, choose the region and storage type which best suites you. Ensure that you select fine grain as the access type.

![two](https://storage.googleapis.com/fergusfrl-blog/save_bucket_bde616750d/save_bucket_bde616750d.png)

#### 2. Create Service Account

Navigate to IAM -> Service Accounts and select the CREATE NEW SERVICE ACCOUNT button. Give the service account a name then grant the storage admin role to the account.

Select actions -> Create Key -> JSON, to download a JSON file containing the Service Account credentials. We will need this file later.

#### 📷 Persist media to Google Cloud Storage

Now that we have a GCP storage bucket and a service account which can access it, we need to enable the Strapi project to use the bucket to upload, edit and delete files. I used the strapi-provider-upload-google-cloud-storage npm module in my solution so thanks to Vanessa Lith and contributors for the library 🙂

#### 1. Install Provider

Within your Strapi project, install `strapi-provider-upload-google-cloud-storage`.

```bash
$ npm install strapi-provider-upload-google-cloud-storage
```

#### 2. Create Plugin File

Create a plugins.js file in the `./config/ directory`. Add the following content:

```js
// ./config/plugins.js

const getServiceAccount = (base64EncodedServiceAccount) => {
	const buff = Buffer.from(base64EncodedServiceAccount, 'base64');
	const serviceAccount = JSON.parse(buff.toString('utf-8'));
	return serviceAccount;
};

module.exports = {
	upload: {
		provider: 'google-cloud-storage',
		providerOptions: {
			bucketName: process.env.GCP_BUCKET_NAME,
			baseUrl: process.env.GCP_BASE_URL,
			serviceAccount: getServiceAccount(process.env.GCP_SERVICE_ACCOUNT)
		}
	}
};
```

This file points Strapi to the GCP storage bucket.

#### 3. Add Local Environment Variables

The plugin file uses environment variables like `GCP_BUCKET_NAME`. We need add those to our local environment. Create a .env.development file in the projects root directory. Add the following content:

```
GCP_BUCKET_NAME=<name of GCP storage bucket>
GCP_BASE_URL=<url of GCP storage bucket>
GCP_SERVICE_ACCOUNT=<base64 encoded service account json>
```

I encoded my entire service account JSON file using an online encoder.

#### 4. Add Production Environment Variables

The final step is to add the same environment variables to the Heroku deploy. I use the CLI to do this:

```bash
$ heroku config:set GCP_BUCKET_NAME=<name of GCP storage bucket>
$ heroku config:set GCP_BASE_URL=<url of GCP storage bucket>
$ heroku config:set GCP_SERVICE_ACCOUNT=<base64 encoded service account json>
```

However it's possible to do this via the Heroku console too.

### 🎉 Finished

The final step is to redeploy the Strapi application to Heroku.

Once deployed, try uploading, editing and deleting images, videos and other files to your deployed Strapi application. They will persist between Heroku dyno redeploys and you will be able to view the files within your GCP storage bucket.

Thanks for reading 🙂
