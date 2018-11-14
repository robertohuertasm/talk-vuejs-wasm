extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

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

#[wasm_bindgen]
pub fn calculate_iter(iterations: f64) -> f64 {
    let title = "from wasm [iter]";
    time(title);
    let iterations = iterations.round() as u64;
    let result = (0..iterations).fold(0, |curr, acc| acc + curr) as f64;
    timeEnd(title);
    result
}

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
