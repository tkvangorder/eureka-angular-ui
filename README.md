# EurekaAngularUi

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.16.

To get up and running :


1. Install Node (4 or higher) & npm (3 or higher). [Node Install Page](https://nodejs.org/en/download/).
2. Install the angular client : `npm -g angular-cli` (You may need to use "sudo" on a Mac or linux)
3. Install node dependencies : `npm install`


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Notes to self: 

`npm install font-awesome` --> installs font-awesome css...which we can import in our global styles.css: 

`@import '../node_modules/font-awesome/css/font-awesome.css'` <-- Which you can now use anywhere in your application: 

`<i class="fa fa-chrome"></i>`
