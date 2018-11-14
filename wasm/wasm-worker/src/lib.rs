extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calculate_iter(iterations: f64) -> f64 {
    let iterations = iterations.round() as u64;
    (0..iterations).fold(0, |curr, acc| acc + curr) as f64
}

#[wasm_bindgen]
pub fn calculate_loop(iterations: f64) -> f64 {
    let iterations = iterations.round() as u64;
    let mut result = 0;
    for i in 0..iterations {
        result += i;
    }
    result as f64
}
