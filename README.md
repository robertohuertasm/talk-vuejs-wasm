# VUE + WASM (with a little help from Rust)

This project is just a playground to show how to leverage `WASM` in `Vue.js` applications.

It was generated using the `Vue CLI 3.0` by using `vue ui` and selecting a default `TypeScript` project.

You can see the [associated slides here](https://1drv.ms/p/s!AryBZoXBIJ4uldI9mAvYlDu3yZH3RA).

## Start the project

`$ npm i`

`$ npm run serve`

Open `http://localhost:8080`.

## Things to take into account

In order for `Webpack` to be able to load `.wasm` modules without having to specify the extension, the `vue.config.js` had to be configured to allow such extension.

`typings.d.ts` file was added to provide support for `vue-slider-component`.

## Branches

- `master`: Ready to start the implementation of the WASM modules.
- `completed`: WASM module implemented and imported.
- `completed-extern`: If you're curious about how to call `JS` functions from `WASM`, checkout this branch.

## Steps to follow

### Rust

Follow this [link](https://www.rust-lang.org/es-ES/install.html) to learn how to install it.

### wasm-pack

This may take up to 3 minutes.

```sh
cargo install wasm-pack
```

### Create a Rust library

Create a `wasm` folder in the root and `cd` into it:

```sh
mkdir wasm
cd wasm
```

Then we're going to create our library:

```sh
cargo new wasm-worker --lib
```

### Set the dependencies and the library type

The previous instruction should have generated a `wasm-worker` folder. Get to `wasm > wasm-worker > src > Cargo.toml` and add the following:

```toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.27"
```

### Expose some functions

Go find `wasm > wasm-worker > src > lib.rs` and type the following:

```rust
// importing the crate that will help us with the JS interaction.
extern crate wasm_bindgen;
// making it available to the current module
use wasm_bindgen::prelude::*;

// we're going to provide to functions similar to our jsLoop method
// but with two different implementations:
// the first one is a classic loop
// the second one uses 'fold' (reduce in JS)
// this will help us to see Rust Zero Cost Abstractions in action!

// this attribute is mandatory for functions that are going
// to be involved in communication process between JS and WASM.
#[wasm_bindgen]
pub fn calculate_loop(iterations: f64) -> f64 {
    let iterations = iterations.round() as u64;
    let mut result = 0;
    for i in 0..iterations {
        result += i;
    }
    result as f64
}

#[wasm_bindgen]
pub fn calculate_iter(iterations: f64) -> f64 {
    let iterations = iterations.round() as u64;
    (0..iterations).fold(0, |curr, acc| acc + curr) as f64
}
```

### Generate the WASM package from our Rust library

Given that we already have installed `wasm-pack`, all we have to do is the following:

```sh
wasm-pack build
```

This will generate a `pkg` folder inside the `wasm > wasm-worker` folder.

Notice that `wasm-pack` should have created our `.wasm` file along with a `package.json`, a `.js` file containing some glue for the JS + WASM interaction, an a `.d.ts` file.

### Consume the WASM package from our JS code

First of all, open your `src > App.vue` file.

We're going to import the typings from our WASM module:

```ts
import WasmWorker from '../wasm/wasm-worker/pkg';
// note that WASM modules have to be loaded asynchronously
// this is just to consume the typings
```

Insert this below the `value` property declaration:

```ts
private wasmWorker!: typeof WasmWorker;
// note that we're using the previously imported module to get the typing
// later, we will assign the asynchronously loaded module to this variable
```

Let's create a constructor to load our WASM module:

```ts
constructor() {
  super();
  this.loadWasm();
}
```

And now let's implement the `loadWasm` method, that must be asynchronous:

```ts
private async loadWasm() {
  // we do load our WASM module here and assign it to our previously created variable
  this.wasmWorker = await import('../wasm/wasm-worker/pkg');
  // let's notify the user that everything is set up!
  console.log(`%c WASM Loaded `, `background: #049741; color: #fff`);
}
```

### Implement the pending methods

You may have notice that we have two methods, namely `wsLoop` and `wsIter`, that have a comment stating that the method must be implemented. So, let's do that!

```ts
// wsLoop
return this.wasmWorker.calculate_loop(this.value);
```

```ts
// wsIter
return this.wasmWorker.calculate_iter(this.value);
```

### Serve the app

Serve the app with `npm run serve` and test that everything is working.

### Extraball 1: Calling JS functions from WASM

Let's change our `Rust` library to consume some external `JavaScript` functions.

Go find `wasm > wasm-worker > src > lib.rs` and replace the previous content with the following:

```rust
// importing the crate that will help us with the JS interaction.
extern crate wasm_bindgen;
// making it available to the current module
use wasm_bindgen::prelude::*;

// we're making some JS methods available to our Rust functions.
#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    #[wasm_bindgen(js_namespace = performance)]
    fn now() -> f64;
    #[wasm_bindgen(js_namespace = console)]
    fn time(name: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn timeEnd(name: &str);
}

// we're going to provide to functions similar to our jsLoop method
// but with two different implementations:
// the first one is a classic loop
// the second one uses 'fold' (reduce in JS)
// this will help us to see Rust Zero Cost Abstractions in action!

// this attribute is mandatory for functions that are going
// to be involved in communication process between JS and WASM.
#[wasm_bindgen]
pub fn calculate_loop(iterations: f64) -> f64 {
    let title = "from wasm [loop]";
    time(title);
    let iterations = iterations.round() as u64;
    let mut result = 0;
    for i in 0..iterations {
        result += i;
    }
    timeEnd(title);
    result as f64
}

#[wasm_bindgen]
pub fn calculate_iter(iterations: f64) -> f64 {
    let title = "from wasm [iter]";
    time(title);
    let iterations = iterations.round() as u64;
    let result = (0..iterations).fold(0, |curr, acc| acc + curr) as f64;
    timeEnd(title);
    result
}
```

### Extraball 2: Publish the WASM package to NPM

If you're not already logged in to the `npm` registry, please do it. Then, from the `wasm > wasm-worker` folder:

```sh
wasm-pack publish
```

This will publish our `wasm-worker` package to `npm`.

Now, proceed to `src > App.vue` and change the path of the `wasm-worker` imports.
