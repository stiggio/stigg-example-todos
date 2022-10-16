

# To-do list: Stigg Demo

To-do list app is a sample web application built with Stigg React SDK and Node.js SDK.
This is a complete end-to-end Stigg integration that demonstrate multiple common use cases e.g. per-unit pricing, usage report, entitlment checks, paywall and checkout flow, upgrade/downgrade and trial.

> 🚀 Visit the live [To-Do list](https://stigg-example-todos.herokuapp.com/) application to play with it  🚀

## Overview 
<p>
  <img src="https://user-images.githubusercontent.com/17930663/193017919-b0eb364b-a57b-41f4-85a9-91ca50b08448.png" alt="todo-app" />
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

#### Billing integration
In order to test this example project with Stripe integration, you'll need to [connect your Stripe account through the Stigg management UI.](https://docs.stigg.io/docs/stripe#adding-the-stripe-integration-in-stigg)

## Getting started

### Setup
* Install dependencies using yarn:
  ```
  yarn
  ```
* Create `.env` file from template:
  ```
  cp .env.example .env
  ```
* Obtain API keys from https://app.stigg.io/account/settings and update `.env` file:
  * Client API key - `NX_STIGG_CLIENT_API_KEY` - 
  * Server API key - `NX_STIGG_SERVER_API_KEY` - 
* If this is your first time running the app, you'll need to set up the app:
  ```
  yarn setup
  ```

### Run the app 
Run the following to start both the **client** and **server**:
```
yarn run-all
```
Go to [http://localhost:4200](http://localhost:4200) in your browser to start using to-do app.
