<template>
  <div id="app">
    <h1>Open the console</h1>
    <vue-slider ref="slider" v-model="value" :max="40000000"></vue-slider>
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

@Component({
  components: {
    vueSlider,
  },
})
export default class App extends Vue {
  public value = 0;

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
        // to be implemented
        return 0;
      },
      '784fe0',
    );
  }

  public wsIter() {
    this.iter(
      'wsIter',
      () => {
        // to be implemented
        return 0;
      },
      '8f0808',
    );
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
