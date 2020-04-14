# Image Slider

To get started clone the repository and make sure you are on the correct branch and have all dependencies installed:

```
git clone https://docs.rbb-online.de/bitbucket/scm/rdat/toggle-component.git
cd toggle-component
git checkout feature/image-slider
npm install
```

Noice. To start a development server run:

```
npm start
```

Noice. A tab should open pointing you to `localhost:3000`.

## Change the images

The slider is configured in `src/components/App/App.js`:

``` js
const sliderConfig = {
  urlForValue: val => `./images/effect/${val}.svg`,
  labelForValue: val => `SIR-Kurve mit einem Maßnahmeneffekt von ${val}%`,
  min: 10,
  max: 90,
  step: 10,
  label: 'Effekt der Einschränkungen:'
}
```

`urlForValue` are `labelForValue` are functions that return an image path and an alt-text for screenreaders for the current value of the slider. `min`, `max` and `step` define the allowed range, which is inclusive (i.e. if `max` is 90 you will be able to select `90` and not `89`). The `label` is displayed above the whole widget and will be displayed with the current value.

When adding images, make sure to put them somewhere in the `public` folder. Paths returned by `urlForValue` can be relative to that folder.

## Deployment

Easy as 🥧! You build all the assets with `npm run build`. Depending on which project you want to deploy run one of the following commands directly afterwards.

```
# uploads to https://dj1.app.rbb-cloud.de/corona-distancing-effects/
npm run build-and-deploy:effects

# uploads to  https://dj1.app.rbb-cloud.de/corona-distancing-duration/
npm run build-and-deploy:duration
```

## Embed Code

Either

```
<style>
#rbb-data--image-slider--corona-distancing-effects { width: 1px; min-width: 100%; }
@media screen and (max-width: 630px) {
  #rbb-data--image-slider--corona-distancing-effects { width: 100%; margin-left: 0; }
}
</style>
<iframe allowfullscreen="" id="rbb-data--image-slider--corona-distancing-effects" scrolling="no" src="https://dj1.app.rbb-cloud.de/corona-distancing-effects/" height="600" frameborder="0"></iframe>
<script src="https://dj1.app.rbb-cloud.de/toggle-component/iframeResizer.min.js"></script>
<script>iFrameResize({}, '#rbb-data--image-slider--corona-distancing-effects')</script>
```

or

```
<style>
#rbb-data--image-slider--corona-distancing-duration { width: 1px; min-width: 100%; }
@media screen and (max-width: 630px) {
  #rbb-data--image-slider--corona-distancing-duration { width: 100%; margin-left: 0; }
}
</style>
<iframe allowfullscreen="" id="rbb-data--image-slider--corona-distancing-duration" scrolling="no" src="https://dj1.app.rbb-cloud.de/corona-distancing-curation/" height="600" frameborder="0"></iframe>
<script src="https://dj1.app.rbb-cloud.de/toggle-component/iframeResizer.min.js"></script>
<script>iFrameResize({}, '#rbb-data--image-slider--corona-distancing-duration')</script>
```

## Add an additional slider

To add an additional slider you need to do edit two files:

- `src/components/App/App.js` for the configuration
- `package.json` for deployment

To configure deployment, add an additional `deploy:...` task, where `...` is a short description of your slider. Change the target directory (`/var/www/...` at the end of the line) so that `...` matches the name you just chose. Add an additional `build-and-deploy:...` task by copying one of the existing ones and changing `PUBLIC_URL` so that the folder matches your chosen `...`.

The embed-code will have to be adjusted as well. Choose a unique ID and change it in lines 2, 4, 7 and 9. Make sure to also change the `src` attribute in line 7.

## If all goes wrong

The server is backed up every hour at 00:59, 01:59, 02:59 and so on. If something breaks those backups can be restored.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start a new Project:

To create a new project just run:

````bash
git clone git@github.com:rbb-data/starter.git my-rbb-data-project --depth 1
cd my-rbb-data-project
rm -rf .git
git init
git add --all
git commit -m "Init with clone from rbb-data starter"
````
Replace "my-rbb-data-project" with the name of your project.

Propably you also want to add a remote.
For example:
````
git remote add origin https://docs.rbb-online.de/bitbucket/scm/rdat/my-rbb-data-project.git
git push -u origin master
````

Adjust the project name/path in the following files: `.env` and `package.json` (see below). 

## Folder structure

Your app lives in `/src`.  
Reusable modules should eventually be moved to `src/shared` and be pushed back to Github. :)

(create react app forces all code to live under `src`)

## Environment Variables

### Keys

We don't want our keys in version control so you have to add them as `REACT_APP_BING_KEY`
and `REACT_APP_OPENROUTSERVICE_KEY`
in an `.env.local` file (or `.env.development.local` because bing has a different development key).
You can just copy and rename `.env.local.example` and add the keys. :-)

For more about .env files in cra see https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables

### Homepage

By default, Create React App produces a build assuming your app is hosted at the server root.
To override this, specify the homepage in your `package.json`, for example:

    "homepage": "http://rbb24.de/static/rbb/rbb-data/project-name",

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

### `npm run storybook`

Creates and opens the [storybook](https://storybook.js.org/) that documents the components in `/shared`

### `npm run deploy-storybook`

Deploy storybook to gh-pages

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

https://create-react-app.dev/docs/available-scripts/#npm-run-eject

### `npm run --silent scripts:create-geojson-mask`

Inverts a given geojson file and creates a mask that can be displayed on a map to draw focus on an area (see `src/data/potsdam-mask.geo.json` for an example`. Additional info: `npm run scripts:create-geojson-mask --help`.

**NOTE:** The `--silent` flag is needed, otherwise invalid GeoJSON will be produced.

### `npm run scripts:geocode-data`

**This is an example script that you need to customize for your project**

This script expects a csv at `../src/data/raw_source_file.csv`. runs through all its
entries and tries to find a geocode specified in the column `Ort` and adds the columns lat lng to each row.
Then it saves the result in the file `../src/data/geocoded.csv`

### `npm run scripts:convert-to-csv`

**This is an example script that you need to customize for your project**

This script expects a csv at `../src/data/geocoded.csv` (you could change this to `../src/data/raw_source_file.cs`)
This is just a simple example on how to map an external file to the datastructure used in the project.
The output is a csv file.
Then it saves the result in the file `../public/markers.csv`

### `npm run scripts:convert-to-geojson`

**This is an example script that you need to customize for your project**

This script expects a csv at `../src/data/geocoded.csv` (you could change this to `../src/data/raw_source_file.cs`)
This is just a simple example on how to map an external file to the datastructure used in the project.
The output is a geojson file.
Then it saves the result in the file `../public/markers.geojson`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting


### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
