---
title: Upload an Image to Firebase Storage from a URL
description: Given an image url, upload the image to a Firebase storage bucket using Google Cloud Functions
publishedDate: October 03, 2020
tags:
  - Firebase
  - Cloud
  - Google Cloud Platform
---

Cloud Storage for Firebase is your own file server on the cloud.

The great thing about Firebase Cloud Storage, is that it allows for fast and easy serving of files to client applications via the Firebase SDK. This functionality is useful when it comes to serving up images which can often be cumbersome to work with. A particularly difficult problem I've dealt with in the past is serving images from a given URL. Fortunately, this problem is made easy with the help of Firebase Cloud Storage and Google Cloud Functions.

This guide assumes that you have a Firebase Project set up already. If you haven't already, you can set one up here.

### Create Firebase Storage bucket

In your Firebase console, navigate to the Storage tab.

![one](https://storage.googleapis.com/fergusfrl-blog/storage_199db5fd98/storage_199db5fd98.png)

Follow the setup wizard. I just selected the default setting for this project. It it possible to go back and change these once setup so don't worry too much about what is selected here.

### Create a Cloud Function

#### 1. Install Firebase Tools

Locally install the firebase CLI. This will allow us to write and deploy Firebase services from a local environment.

```bash
$ npm install -g firebase-tools
```

#### 2. Setup local Firebase Project code

Follow the Initialize you Project instructions to initialize a local project. Terms can get confusing here. This local project is the code which will be deployed to the Firebase Project.

#### 3. Setup Firebase Admin SDK

```js
// firebase-project/functions/index.js
const admin = require('firebase-admin');

admin.initializeApp({
	storageBucket: 'gs://<your-bucket-name>.appspot.com'
});
```

#### 4. Use axios to fetch the image from the given URL

Notice that we have chosed the response type to be a stream and not an image type. This will be important for the next step.

```js
// firebase-project/functions/index.js

const admin = require('firebase-admin');
const functions = require('firebase-functions');
const axios = require('axios');

admin.initializeApp({
	storageBucket: 'gs://<your-bucket-name>.appspot.com'
});

exports.saveImageToStorage = functions.https.onRequest((req, res) => {
	const { imageUrl } = req.body;
	axios({
		method: 'GET',
		url: imageUrl,
		responseType: 'stream'
	})
		.then((res) => {
			// res.data
		})
		.catch(() => {
			console.error('Error fetching image');
			res.status(500).send();
		});
});
```

#### 5. Pipe response stream to Firebase Cloud Storage

This step is where the magic happens. Once we have recieved the stream image from the axios request, we then create a write stream directly to the Firebase Storage bucket. This allows us to avoid downloading the image locally and then uploading it. This approach is great becasue it reduces memory usage and uptime for the Cloud Function - all of which we pay $$ for.

```js
// firebase-project/functions/index.js
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const axios = require('axios');

admin.initializeApp({
	storageBucket: 'gs://<your-bucket-name>.appspot.com'
});

exports.saveImageToStorage = functions.https.onRequest((req, res) => {
	const { imageUrl, destination } = req.body;
	axios({
		method: 'GET',
		url: imageUrl,
		responseType: 'stream'
	})
		.then(async (response) => {
			const file = admin.storage().bucket().file(destination);
			const writeStream = file.createWriteStream({
				contentType: 'image/jpeg',
				public: true
			});
			await response.data
				.pipe(writeStream)
				.on('finish', () => {
					console.log('Successfully uploaded image');
					res.status(200).send();
				})
				.on('error', () => {
					console.log('Error uploading image');
					res.status(500).send();
				});
		})
		.catch(() => {
			console.log('Error fetching image');
			res.status(500).send();
		});
});
```

#### 6. Deploy function to Firebase

Finally we can deploy our function. This step is nice and simple. Be aware that you will need to have billing set up in your Firebase project to make external request.

```bash
$ firebase deploy
```

Once your function has successfully deployed, navigate to the Functions tab in your Firebase console. You should see that your function is available.

![two](https://storage.googleapis.com/fergusfrl-blog/functions_261b839950/functions_261b839950.png)

### Using the Function

Now the function has deployed, we can test it to make sure it's working. Our function is an http cloud function, so we can test it by sending a post request to the function. I do this using Postman. The URL for the request can be found in the Functions tab of the firebase console.

![three](https://res.cloudinary.com/dohvgycsm/image/upload/v1601782204/f38ocd1hgwearawifskt.png)

Add the `imageUrl` and the `destination` to the body of the request then hit send.

Once you get a 200 response code, navigate to the Storage tab in the Firebase console.

![four](https://storage.googleapis.com/fergusfrl-blog/saved_file_fa750fffb3/saved_file_fa750fffb3.png)

Et viola! We now have a Cloud Function that will save an image to your Firebase Storage given only a url. This image is ready to be served to any client application integrated with your Firebase Project.

Enjoy.
