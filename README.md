# Github Stars

A simple example of using the GitHub GraphQL API to fetch repository information

## Installation

`yarn` or `npm i` to install dependencies. Then `yarn dev` to start the dev server.

You will need a valid GitHub token exported as `VITE_GITHUB_TOKEN` to authenticate with the API.

## Further Plans

- Allow searching by topic. This is currently hardcoded to `react`, but the addition of an debounced input would allow more flexibility
- More flexible pagination. At the moment the call to the API is hardcoded to 20 results, but the API is flexible enough to allow the user to select a page size.
- Further testing using Cypress to give a higher level of confidence.
- Better error handling, at the moment this is very basic

## Comments against Evaluation Points

- I've not used any css-in-js as I was able to achieve the design I wanted purely with Mantine components
- Not had the opportunity to dockerise
