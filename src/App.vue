<template>
  <div id="app">
    <h1>Open the console</h1>
    <vue-slider ref="slider" v-model="value" :max="400000000"></vue-slider>
    <div style="margin-top:20px">
      <button @click="jsLoop()" class="js-loop">JS Loop</button>
      <button @click="wsLoop()" class="ws-loop">WS Loop</button>
      <button @click="wsIter()" class="ws-iter">WS Iter</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import vueSlider from 'vue-slider-component';
import WasmWorker from '../wasm/wasm-worker/pkg';

@Component({
  components: {
    vueSlider,
  },
})
export default class App extends Vue {
  public value = 0;
  private wasmWorker!: typeof WasmWorker;

  constructor() {
    super();
    this.loadWasm();
  }

  public jsLoop() {
    this.iter('jsLoop', () => {
      let result = 0;
      for (let i = 0; i < this.value; i++) {
        result += i;
      }
      return result;
    });
  }

  public wsLoop() {
    this.iter(
      'wsLoop',
      () => {
        return this.wasmWorker.calculate_loop(this.value);
      },
      '784fe0',
    );
  }

  public wsIter() {
    this.iter(
      'wsIter',
      () => {
        return this.wasmWorker.calculate_iter(this.value);
      },
      '8f0808',
    );
  }

  private async loadWasm() {
    this.wasmWorker = await import('../wasm/wasm-worker/pkg');
    console.log(`%c WASM Loaded `, `background: #049741; color: #fff`);
  }

  private iter(mark: string, fn: () => number, color: string = '959704'): void {
    setTimeout(() => {
      console.time(mark);
      const start = performance.now();
      const result = fn();
      const elapsed = performance.now() - start;
      console.timeEnd(mark);
      console.log(
        `%c ${mark} = ${result} in ${elapsed} ms`,
        `background: #${color}; color: #fff`,
      );
    }, 100);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  border: 1px solid black;
  border-radius: 5px;
  margin: 0 10px;
  padding: 10px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 40px;
}
.js-loop {
  background: #959704;
}
.ws-loop {
  background: #784fe0;
}
.ws-iter {
  background: #8f0808;
}
</style>
