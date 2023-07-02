---
title: Add a Custom Domain to Cloud Run
description: Add an HTTPS load balancer to a Cloud Run Instance with a Custom SSL Certified Domain Name
publishedDate: May 16, 2021
tags:
  - Cloud
  - Google Cloud Platform
  - Cloud Run
  - Load Balancer
---

I recently deployed a website using Google Cloud Platform (GCP) Cloud Run. Cloud Run is very easy to use, all you need to do is Dockerise your application and the serverless Cloud Run will handle deployment and scaling behind the scenes.

Eventually you will want to make your Cloud Run application production ready and this will involve adding a custom domain name and enabling HTTPS. These additions require some configuration which we will cover in this article.

### 📍 Create Static IP Address

We first need to create a Static IP Address. This address will be used to link the load balancer and the domain DNS.

Navigate to VPC network, External IP addresses. Select the Reserve Static Address button. Enter a name of your choice. Change the Type to Global as seen in the screenshot below:

![one](https://storage.googleapis.com/fergusfrl-blog/static_ip_address_6d4b6b4738/static_ip_address_6d4b6b4738.png)

Select Reserve.

### 🌐 Point Domain DNS at IP Address

First thing's first - you must own the domain name you want to use. I use Google Domains but you can use any provider. We need to point out domain DNS towards the IP address we configure above.

Locate your domain's DNS settings and navigate to a section which will allow you to add resource records. Add an "A" record with the IPv4 protocol. Add the static IP address (not including port) we reserved above to this record. This configuration will point the domain name to our IP address.

I recommend googling your "Add 'A' record" for your individual provider.

### 🔐 Create SSL Certificate

Next we need to add an SSL certificate. This certificate allows us to make use of the HTTPS protocol and is a must for securing modern websites. If you've ever configured an SSL certification before, you'll know that it is needlessly complicated. GCP agrees and offers an easy solution: Google-managed SSL certificates. I'm a fan.

Navigate to the Load Balancer certificates tab. I've included the link here because by default this tab will be hidden in the GCP UI.

Select Create SSL Certificate. Enter a name of your choice and set the Create Mode to Create Google-managed Certificate. Add your domain name to the Domains input. The configuration should like similar to the screenshot below:

![two](https://storage.googleapis.com/fergusfrl-blog/ssl_certificate_e7445e3465/ssl_certificate_e7445e3465.png)

Select Create.

Note that it may take up to 1 hour for this SSL certificate to be successfully provisioned. For me, it's only ever taken a few minutes but be prepared to wait.

### ⚖️ Create Load Balancer

We now have everything in place to create a Load Balancer. This article is primarily focused on adding a custom domain the Cloud Run but it's good to acknowledge that this load balancer is also going to balance traffic across Cloud Run instances under high demand which will result in lower latency and higher perceived performance for users.

Navigate to Network services, Load balancing. Select Create Load Balancer and choose HTTP(S) Load Balancing. We want this load balancer to be exposed to the internet so choose From Internet to my VMs and continue.

First, enter a name of your choice.

For the remaining configuration, I've broken it down into Backend, Host and Path Rules, and Frontend.

#### Backend Configuration

1. Select the Backend services & backend buckets dropdown
1. Select Create New Backend Service
1. Enter a name of your choice
1. Select the Backend Type dropdown and choose Serverless endpoint network group
1. Under the New Backend section, select the Serverless endpoint network group dropdown and choose your Cloud Run instance
1. (optional) Enable Cloud CDN
1. (optional) Enable logging
1. Select Create

![three](https://storage.googleapis.com/fergusfrl-blog/backend_configuration_3683259462/backend_configuration_3683259462.png)

#### Host and Path Rules

No configuration required. I only included this step to avoid any confusion.

#### Frontend Configuration

1. Select Add Frontend IP and Port
1. Enter a name of your choice
1. Set the protocol dropdown to HTTP(S) (includes HTTP/2)
1. Set the IP address dropdown to the static IP address we provisioned earlier
1. Set the Certificates dropdown to the SSL Certificate we provisioned earlier
1. Select Done

![four](https://storage.googleapis.com/fergusfrl-blog/frontend_configuration_734de889f5/frontend_configuration_734de889f5.png)

Finally, select Create. It may take a few minutes but eventually you should see your new load balancer in Network services. Once you the load balancer has finished provisioning, navigate to `https://<your-domain-name>`. SUCCESS 🥳

### 👈 Redirect HTTP Traffic to HTTPS

One final piece of configuration is required. We can navigate to `https://<your-domain-name>` but not `http://<your-domain-name>`. Ideally, we want to redirect http traffic to https. To do this we require a second load balancer! Don't worry, this second one requires far less configuration than the load balancer above.

Navigate to Network services, Load balancing. Select Create Load Balancer and choose HTTP(S) Load Balancing. We want this load balancer to be exposed to the internet so choose From Internet to my VMs and continue.

Just like last time, I've broken the configuration down into Backend, Host and Path Rules, and Frontend.

#### Backend Configuration

No configuration required!

#### Host and Path Rules

1. Under Mode, choose Advanced host and path rule (URL redirect, URL rewrite)
1. Under Action, choose Redirect the client to different host/path
1. Under Path redirect, choose Prefix redirect
1. Ensure the Redirect response code dropdown is set to 301 - Moved Permanently
1. Enable HTTPS redirect
1. Select Save

![five](https://storage.googleapis.com/fergusfrl-blog/host_and_path_rules_098bc9e3fc/host_and_path_rules_098bc9e3fc.png)

#### Frontend Configuration

1. Select Add Frontend IP and Port
1. Enter a name of your choice
1. Ensure the protocol dropdown is set to HTTP
1. Set the IP address dropdown to the static IP address we provisioned earlier
1. Select Done

![six](https://storage.googleapis.com/fergusfrl-blog/http_frontend_configuration_5e2b16e457/http_frontend_configuration_5e2b16e457.png)

Select Create. Now navigate in browser to `http://<my-domain-name>`, you will be redirected to `https://<my-domain-name>` with your Cloud Run application running.

Congratulations! You are now production ready.

Happy Coding 🎉
