/* tslint:disable */
import * as wasm from './wasm_worker_bg';

const __wbg_time_1dff98d76c5f8e37_target = console.time;

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_time_1dff98d76c5f8e37(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_time_1dff98d76c5f8e37_target(varg0);
}

const __wbg_timeEnd_bfa520f519c394a2_target = console.timeEnd;

export function __wbg_timeEnd_bfa520f519c394a2(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_timeEnd_bfa520f519c394a2_target(varg0);
}
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

