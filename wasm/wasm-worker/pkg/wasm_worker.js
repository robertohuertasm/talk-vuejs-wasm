/* tslint:disable */
import * as wasm from './wasm_worker_bg';

/**
* @param {number} arg0
* @returns {number}
*/
export function calculate_iter(arg0) {
    return wasm.calculate_iter(arg0);
}

/**
* @param {number} arg0
* @returns {number}
*/
export function calculate_loop(arg0) {
    return wasm.calculate_loop(arg0);
}

