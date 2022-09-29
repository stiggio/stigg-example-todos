

# To-do list: Stigg Demo

To-do list app is a sample web application built with Stigg React SDK and Node.js SDK.
This is a complete end-to-end Stigg integration that demonstrate multiple common use cases e.g. per-unit pricing, usage report, entitlment checks, paywall and checkout flow, upgrade/downgrade and trial.

## Overview
<p>
  <img src="https://user-images.githubusercontent.com/17930663/193017919-b0eb364b-a57b-41f4-85a9-91ca50b08448.png" />
</p>

To-do list is a complete, full-stack example of Stigg integration:

|     |Features
:---: | :---
📦|**Per-unit pricing (seat based).** a recurring fee according to the number of seats
🙎🏻‍♂️ |**Customer provision.** Provision customer in stigg when user is signed up, allowing to Stigg admins to control the [user journey](https://docs.stigg.io/docs/products#defining-the-customer-journey) with **no-code**
💲| **Billing integration.** Billing integration with Stripe: Stripe checkout, syncing customers, subscriptions, plans etc.
🧱| **Entitlement check.** Use Stigg SDK in order to gating features.
📈|**Usage reporting.** Reporting usage measurments to Stigg
💸|**Paywall widget.** Using Stigg SDK to render the [pricing paywall](https://docs.stigg.io/docs/react-sdk#rendering-pricing-plans) with a few lines of code
☕️|**Node.js backend.** server-side integration with Stigg Node.js SDK to create subscription, provision customer etc.
🆓|**Plan trial period.** Using trial to allow customers to try for free the enterprise plan
🔖|**Entity metadata.** Using plan metadata for custom functionality like setting seats quantity limit

## Requirements

You'll need a Stigg account in order to get Client/Server API key and run this project.

## Getting started

Install dependencies using yarn:
```
yarn
```

Add .env file in **client** folder with the following key:
```
 NX_STIGG_CLIENT_API_KEY=<YOUR-CLIENT-API-KEY>
```
Add .env file in **server** folder with the following key:
```
 NX_STIGG_SERVER_API_KEY=<YOUR-SERVER-API-KEY>
```

If this is your first time running the app, you'll need to set up the app:
```
yarn setup
```

Run the app (starts both the client and server):
```
yarn run-all
```
Go to [http://localhost:4200](http://localhost:4200) in your browser to start using to-do app.
