React Template
========================

## Getting started

```
> git clone ... my-project
> cd my-project
> npm install
> npm start  # Launch the Webpack dev server.
> open http://localhost:3000 # This is your application
```

## Directory Structure

```
build/                      // Webpack build output
  resources/            
    static/                 // Publicly served static assets
      index.html            // Generated from the index.template.html
      bundle.js             // Bundle built w/ webpack
src/
  components/               // React components
    application/            // The main application component
      __tests__/            
        application-test.js // Contains test cases for the application component
      index.js              

  index.js                  // Configures client-side routing and renders
                            // a React component based on the current route
  index.template.html       // Template html file that includes React bundle
gulpfile.babel.js
webpack.config.js
```

## Commands

### > npm start

Launches the frontend dev server on localhost:3000

### > npm test

Locates all the \_\_tests\_\_ folders in the project and runs the tests

### > npm run autotest

Continuously runs the tests whenever a file is saved

### > npm run start-ie

Same as npm start but with hot loading turned off to facilitate IE testing since
older versions of IE doesn't play well when this is on.

### > npm run repl

Starts an ES2015 enabled node.js repl (read-eval-print-loop)

### > npm run build

Creates a production ready bundle
