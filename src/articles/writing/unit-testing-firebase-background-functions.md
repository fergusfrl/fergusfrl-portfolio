---
title: Unit Testing Firebase Background Functions
description: Add unit tests to a Firebase project's background functions
image: firebase.png
publishedDate: April 20, 2021
tags:
  - Firebase
  - Testing
  - Jest
snippet: Testing Firebase Cloud Functions can be difficult, particularly background functions like PubSub, Authentication Triggered, Firestore Triggered and others. This guide will show you how to utilize the Jest testing framework to make asserting, mocking and spying against background cloud functions easy and robust.
---

Testing Firebase Cloud Functions can be difficult, particularly background functions like PubSub, Authentication Triggered, Firestore Triggered and others.

This guide will show you how to utilize the Jest testing framework to make asserting, mocking and spying against background cloud functions easy and robust.

### ☁️ The Function

We want to test the `handleUserChange` function. It's a simple function that is triggered when a Firestore user document is changed. Notice that it publishes to a PubSub topic.

```js
// functions/src/index.js

const admin = require('firebase-admin');
admin.initializeApp();

const pubSubClient= new PubSub();
const SEND_EMAIL_TOPIC = 'SEND_EMAIL';

// Triggered when user document changes
const handleUserChange = functions.firestore.document('users/{userId}').onWrite((change) => {
  const { email } = change.after.data();
  await pubSubClient.topic(SEND_EMAIL_TOPIC).publish(Buffer.from(JSON.stringify({ email })));
});

// Triggered when SEND_EMAIL_TOPIC is published to
const sendEmail = functions.pubsub.topic(SEND_EMAIL_TOPIC).onPublish((payload) => {
  // send email via email client...
});

module.exports = {
  handleUserChange,
  sendEmail,
};
```

### 🛠️ Setting up Test Environment

Before we jump into tests, we first need to connect to our firebase project. We need 2 items to create this connection; first the project id. This can be found in the settings of your firebase project. Second, we need the service account key file.

To generate a service account key file, navigate to the Firebase Project settings and select the Service Accounts tab. Select the Generate new private key button. A \*.json file file will be downloaded - this is your service account key file.

We can now add code which will connect our test environment with the Firebase project:

```js
// functions/test/testEnvironment.js

const functions = require('firebase-functions-test');

export const testEnvironment = functions({
  projectId: <project_id>
}, <path_to_service_account_key_file>);

export const config = {
  // add any test environment variables here
};
```

### 📝 The Test

Now we can start on our test file! The below file instantizes the test environment we completed above. We then create a test user document in the `beforeAll` block. Importantly we also delete that same test user document in the `afterAll` block.

In the test itself, we create a `beforeSnap` and an `afterSnap` which are then applied to the change object which is used to call our `handleUserChange` function.

```js
// functions/test/index.test.js

import admin from 'firebase-admin';
import { testEnvironment, config } from './testEnvironment';
testEnvironment.mockConfig(config);

import { handleUserChange } from '../src';

describe('handleUserChange', () => {
  const testUserId = '123456789';
  let wrapped;
  beforeAll(async () => {
    wrapped = testEnvironment.wrap(handleUserChange);

    // create test user
    await admin.firestore().collection('users').doc(testUserId).create({
       email: 'test@test.com',
       name: 'test name',
     });
  });

  afterAll(async () => {
    // delete test user
    await admin.firestore().collection('users).doc(testUserId).delete();
  });

  test('handleUserChange publishes to SEND_EMAIL topic', async () => {
    const beforeSnap = await testEnvironment.firestore.makeDocumentSnapshot({
      name: 'old name',
    }, `users/${testUserId}`);
    const afterSnap = await testEnvironment.firestore.makeDocumentSnapshot({
      name: 'new name',
    }, `users/${testUserId}`);

  const change = testEnvironment.makeChange(beforeSnap, afterSnap);
  await wrapped(change);
});
```

I have deliberately not included an assertion in this test because this test is actually going to fail. Get ahead and run this test using jest and you will see an authentication error.

This authentication error occurs because the service account we are using does not have permission to publish to PubSub topics. We could add permissions to the service request but it is tidier to test this function unit in isolation - we will need to mock PubSub instead.

### 👺 Mocking PubSub

We can use jest to mock the PubSub module. When mocking full modules, I prefer to use Manual Mocks. The following manual mock file will mock the `topic` and the `publish` methods in the PubSub module:

```js
// functions/__mocks__/@google-cloud/pubsub.js

class PubSubMock {
	constructor() {
		return this;
	}

	topic(topic) {
		return this;
	}

	publish(body, obj) {
		return jest.fn();
	}
}

module.exports.PubSub = PubSubMock;
```

We can now run the test successfully but we are still missing an assertion! Let's add a spy to our newly mocked methods are create an assertion based on the spy.

### 🕵️‍♀️ Spying and Asserting

Below is the updated test file which imports our mocked PubSub module and creates a spy on the `topic` method. We can then make assertions based on this spy:

```js
// functions/test/index.test.js

import admin from 'firebase-admin';
import { PubSub } from '@google-cloud/pubsub';
import { testEnvironment, config } from './testEnvironment';
testEnvironment.mockConfig(config);

import { handleUserChange } from '../src';

describe('handleUserChange', () => {
  const testUserId = '123456789';
  let wrapped;
  beforeAll(async () => {
    wrapped = testEnvironment.wrap(handleUserChange);

    // create test user
    await admin.firestore().collection('users').doc(testUserId).create({
       email: 'test@test.com',
       name: 'test name',
     });
  });

  afterAll(async () => {
    // delete test user
    await admin.firestore().collection('users).doc(testUserId).delete();
  });

  test('handleUserChange publishes to SEND_EMAIL topic', async () => {
    const beforeSnap = await testEnvironment.firestore.makeDocumentSnapshot({
      name: 'old name',
    }, `users/${testUserId}`);
    const afterSnap = await testEnvironment.firestore.makeDocumentSnapshot({
      name: 'new name',
    }, `users/${testUserId}`);

  const change = testEnvironment.makeChange(beforeSnap, afterSnap);
  const topicSpy = jest.spyOn(PubSub.prototype, 'topic');

  await wrapped(change);

  expect(topicSpy).toBeCalledWith('SEND_EMAIL');
});
```

Run the test. It should now be passing! Congratulations!

Happy Coding 🎉
