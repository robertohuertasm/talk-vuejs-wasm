# VUE + WASM (with a little help from Rust)

This project is just a playground to show how to leverage `WASM` in `Vue.js` applications.

It was generated using the `Vue CLI 3.0` by using `vue ui` and selecting a default `TypeScript` project.

## Start the project

`$ npm i`

`$ npm run serve`

Open `http://localhost:8080`.

## Things to take into account

In order for `Webpack` to be able to load `.wasm` modules without having to specify the extension, the `vue.config.js` had to be configured to allow such extension.

`typings.d.ts` file was added to provide support for `BigInt` and `vue-slider-component`.

## Branches

In the `master` branch you'll find the project ready to start the implementation of the WASM modules.

If you want to see the whole project built just checkout the `completed` branch.
