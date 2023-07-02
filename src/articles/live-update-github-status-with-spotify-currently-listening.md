---
title: Live Update Github Status with Spotify Currently Listening
description: Use the Spoitfy API and Google Cloud Functions to dynamically set your Github profile status
publishedDate: November 01, 2020
tags:
  - Firebase
  - Google Cloud Platform
  - Cloud
  - Node
---

I love listening to music while programming. I find it's a great way to get into flow. Now I can share what I'm listening to on Spotify in real time on Github 🙂

### Architecture

I've used Google Cloud Scheduler to schedule Google Cloud Functions which perform the following tasks:

1. Authenticate with Spotify
1. Retrieve the currently playing song for the authenticated user from Spotify
1. Update the Github user status with the currently playing song

![one](https://storage.googleapis.com/fergusfrl-blog/Github_Spotify_Live_Status_9064646a9d/Github_Spotify_Live_Status_9064646a9d.png)

### Setting up Spotify Refresh Token Authentication

This is the step which I found most difficult - mostly due the number of options Spotify gives developers to authenticate requests. I highly recommend reading the entire Authorization Guide guide from Spotify prior to starting. The approach which works best for this project is Authorization Code Flow as seen below:

![two](https://storage.googleapis.com/fergusfrl-blog/Auth_G_Authoriztion_Code_9c6b4a81dd/Auth_G_Authoriztion_Code_9c6b4a81dd.png)

There's a lot going on in that diagram! But once I got over the initial setup, things become far easier.
The initial setup includes manually logging in to Spotify to generate an access token. That access token can then be used to generate short lived refresh tokens. In the architectural diagram of this article, it is the refresh tokens we use to authenticate our requests.
I've breezed over a bit of complexity here, so the best way to setup this Spotify Authorization workflow is to closely follow the instructions in the documentation.

### Creating a Github Access Token

All it takes is a Github account 😉 Generating a Github Access Token is remarkable straightforward. I simply followed these instructions from the team at Github .

As with any unique keys, it's best practice to store these as environment details. In Firebase that's as easy as:

```bash
$ firebase functions:set:config github.api_access_key=<ACCESS_KEY_HERE>
```

### Setting Github Status

There's still one small problem - you may have noticed that the Github API doesn't support status update. I was surprised by this omission, it seems like a simple and easy piece to include in the API for users to customize their profiles.

Other developers are clearly surprised too, so much so that a member of the community has resolved the problem; GithubProfileStatus. I've found GithubProfileStatus to be simple and easy - just the way I like my libraries. Thanks https://github.com/wsmd!

### Result

![three](https://storage.googleapis.com/fergusfrl-blog/github_status_3ab41e5e67/github_status_3ab41e5e67.png)

I am seriously impressed with how robust Google Cloud Functions are - I haven't had a single failure in over 1 month since deployment. 1 month means approximately 3000 individual invocations which is well within GCP's free tier. I'm looking forward to recreating the project in both AWS and Azure so that I can compare pricing, ease of use and developer experience.

Checkout the final code here and get keep your mates up to date with the best tracks 👍
