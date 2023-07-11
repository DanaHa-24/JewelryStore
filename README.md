# BU Jewelry

<p>
BU Jewelry is a a progressive eCommerce application for a boutique jewelry business aimed at a modern audience with an inclusive brand. A application is able to search the API for items, allow users to send the vendor inquiries for custom jewelry, connect to a Stripe API to collect card information, and track user's actions through Google Analytics.
</p>



---

## Libraries used

* [lodash.debounce](https://github.com/lodash/lodash) v4.0.8
* [react-cookie-consent](https://github.com/Mastermindzh/react-cookie-consent) v6.2.3
* [react-ga](https://github.com/react-ga/react-ga) v3.3.0
* [semantic-ui](https://github.com/Semantic-Org/Semantic-UI) "^2.0.3"
* [react-stripe-elements](https://github.com/stripe/react-stripe-elements) v6.1.2

---

## Environment Variables
<p>
This build uses a few environment variables that you nee dto make sure you set up. For your development environment, I recommend you create a .env.development file and insert the variables in this file.

The variables are as follows:

| **Variable**   | **Purpose** |
|----------------|-------------|
| REACT_APP_API_URL | This is the URL for the backend API. (ie. `https://example.com/` )     |
| REACT_APP_TITLE        | The name of the eCommerce Business. This will be sprinkled throughout the application including document title, menu, etc.      |
| REACT_APP_STRIPE_KEY          | the public key for your Stripe API account     |
| REACT_APP_GA_TRACKING_ID          | The tracking ID for Google Analytics (ie `UA-XXXXXXXXX-X`)     |

---

**Jewelry Credits**

* All images of grills come from [King Johnny (Johnnys Custom Jewelry)](https://johnnyscustomjewelry.com/grillz/)
* Most images of rings come from [My Trio Rings](https://www.mytriorings.com/)
* Most images of necklaces come from [King Ice](https://www.kingice.com/)
* Most images of earrings come from [Ross-Simmons](https://www.ross-simons.com/)


Every other image else (not jewelry)  comes from Nappy.co

**Inquiry List credits**

* Repair Inquiry Photo by <a href="https://burst.shopify.com/@matthew_henry?utm_campaign=photo_credit&amp;utm_content=Browse+Free+HD+Images+of+Using+a+Rotary+Tool+On+Jewelry&amp;utm_medium=referral&amp;utm_source=credit">Matthew Henry</a> from <a href="https://burst.shopify.com/tools?utm_campaign=photo_credit&amp;utm_content=Browse+Free+HD+Images+of+Using+a+Rotary+Tool+On+Jewelry&amp;utm_medium=referral&amp;utm_source=credit">Burst</a>

Every other image else (not jewelry)  comes from Nappy.co


<img src='./screenshots/jewelry_3.gif' alt="Animated view of the homepage">

---

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

