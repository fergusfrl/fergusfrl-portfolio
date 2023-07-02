---
title: Run Visual Studio Code in the Cloud
description: Access your own Visual Studio Code environment anywhere on any device
publishedDate: March 02, 2021
tags:
  - Cloud
  - Google Cloud Platform
  - IDE
---

### 😤 The Problem

One of VS Codes greatest strengths is it's configurability. My own environment is configured with my favorite theme, keyboard shortcuts, extensions, linters and more. This level of customization is great but it does present a problem when it comes time to switch devices - you must reconfigure your entire environment!

### 💡 Solution

Fortunately it is possible to host your own instance of VS Code on the cloud using Coder. Coder provides docker images which can be deployed to servers which will host a VS Code instance. We can couple this functionality with the global reach of cloud providers (GCP, AWS, Azure) to access our VS Code environment anytime, anywhere.

### ☁️ Deploy a GCP Virtual Machine

Create a new Google Cloud Platform Compute Engine. Ensure that the server is running Ubuntu, I am running Ubuntu version 16.0.4 LTS. Select both "Allow HTTP traffic" and "Allow HTTPS traffic" so that they are enabled. The remaining config can be left as default. Be aware that keeping a running VM instance will incur costs of around $0.04 an hour.

![one](https://storage.googleapis.com/fergusfrl-blog/code_server_config_54fe05f1d2/code_server_config_54fe05f1d2.png)

### 🗄️ SSH into the VM

Once your VM has been provisioned, select the SSH option which will open an in browser terminal as seen below:

![two](https://storage.googleapis.com/fergusfrl-blog/ssh_terminal_7a68ade641/ssh_terminal_7a68ade641.png)

### ⌛ Install the latest version of Code-Server

The following code will download version 3.9.1 of Code Server, you should change the version number to the most recent.

```bash
$ wget https://github.com/cdr/code-server/releases/download/v3.9.1/code-server-3.9.1-linux-amd64.tar.gz
```

We can now unzip the downloaded package.

```bash
$ tar -xvzf code-server-3.9.1-linux-amd64.tar.gz
```

### ✔️ Run Code Server

We can now start code-server. In the terminal, simply cd into the extracted directory then execute the binary:

```bash
$ cd code-server-3.9.1-linux-amd64
$ ./code-server link
```

Now find the external IP address of the VM. Navigate in browser to `https://<externalIp>:8080` and find your online, consistent VS Code deployment. Any settings changes or extensions will be kept between sessions and between devices.

Happy Coding 🎉
