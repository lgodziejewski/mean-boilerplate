# MEAN Starter
MEAN stack starter using Angular 2.

It is a bare-bones template with a simple development environment - no tests or other production tools.

### Description
The backend is based on a Node+Express+MongoDB stack. There is a Hero Mongoose Model defined, with
CRUD REST apis provided. Model CRUD routes are defined in a dedicated file(`hero.model.js`), which is then used by the
`Router` in `routes.js` file. Finally, the `Router` is applied in `server.js` file and set to `/api/v1/` path.

Frontend is the official Tour of Heroes example modified to use the rest apis.

The package uses Gulp for linting, moving static frontend files, building frontend TS with Webpack and running backend.
Webpack is configured to emit proper sourcemaps for .ts files, so debugging should be possible.

### Requirements

- NodeJS with npm
- MongoDB

### Installation
- `npm install`
- `gulp` or `npm run gulp`
- enjoy

### Tech

- NodeJS with Express
- MongoDB with Mongoose
- Angular 2 (TypeScript)
- Gulp
- Webpack
- ESLint, TSLint

----

The Angular2 application is a slightly modified version
of official [Tour of Heroes](https://angular.io/docs/ts/latest/tutorial/) tutorial.

The NodeJS+Express server is based
on Scotch.io's [MEAN Stack Single Page Application Starter](https://github.com/scotch-io/starter-node-angular/).
