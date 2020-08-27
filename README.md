# Image Switcher

Simple tool to merge multiple images into a tabbed view of them

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage

To create a new switcher navigate to https://dj1.app.rbb-cloud.de/toggle-component

**Example:**

https://dj1.app.rbb-cloud.de/toggle-component/#?images%5B0%5D%5Bsrc%5D=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598461336473-b0cc035d4e35%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1648%26q%3D80&images%5B0%5D%5Blabel%5D=A&images%5B1%5D%5Bsrc%5D=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1517138863771-bc5015b9e0c1%3Fixlib%3Drb-1.2.1%26auto%3Dformat%26fit%3Dcrop%26w%3D1522%26q%3D80&images%5B1%5D%5Blabel%5D=B

## Folder structure

Your app lives in `/src`.  
Reusable modules should eventually be moved to `src/shared` and be pushed back to Github. :)

(create react app forces all code to live under `src`)

## Environment Variables

### Homepage

By default, Create React App produces a build assuming your app is hosted at the server root.
To override this, specify the homepage in your `package.json`, for example:

    "homepage": "https://dj1.app.rbb-cloud.de/toggle-component/",

### Analytics

This App can track "pageviews" and e.g. map interactions.
To enable this you need to replace everything in `{}` in the ANALYTICS variables in the `.env` file
and set `REACT_APP_ANALYTICS_ENABLED` to true.

## Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run analyze`

Analyze the bundle size you can also run `npm run analyze-without-build` if you already have run
`npm run build` before.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

https://create-react-app.dev/docs/available-scripts/#npm-run-eject
