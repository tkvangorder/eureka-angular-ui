# EurekaAngularUi

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.16.

To get up and running :


1. Install Node (4 or higher) & npm (3 or higher). [Node Install Page](https://nodejs.org/en/download/).
2. Install the angular client : `npm -g angular-cli` (You may need to use "sudo" on a Mac or linux)
3. Install node dependencies : `npm install`

# Visual Studio Code

This project was developed using [Visual Studio Code](https://code.visualstudio.com/). This is NOT Visual Studio, but rather a light
code editor that was built on top of the Atom text editor. It has excellent support for code insight and debugging.

The fastest way to setup a development environment is to use Visual Studio Code, as there is already configuration in place.

1. Install Visual Studio Code, you can download from this link: [Visual Studio Code](https://code.visualstudio.com/).
2. Open Visual Studio Code from the root folder of the repo. If you have visual studio on your search path, you can just open a terminal and type `code .` from the root repo.
3. You will want to install the "Debugger for Chrome" extension.

## Development server
Run `ng serve -proxy-config proxy-config.json` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Note: The `proxy-config.json` will proxy all calls to /eureka/app/* to an external eureka server. See this file to change which Eureka server you are using during development.

## Debugging support
The project already contains a VS Code launch configuration file with two launch tasks: 
- "Launch Chrome against localhost with source maps" - This launch will start a new instance of chrome and automatically navigate to the application running on port 4200. **Note: On a Mac, I had to kill all instances of Chrome on my machine to have this work correctly**
- "Attach to Chrome with source maps" - This launch will attach to an existing instance of Chrome, if chrome is running with its remote debugging enabled. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. The artifacts that are generated in the dist folder can be directly copied into a spring boot application's "src/main/resources/static"

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

