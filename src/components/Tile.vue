<template>
  <div 
    class="tile" 
    v-bind:style="styleObject"
    v-on:click="handleClick"
    v-bind:class="classObject">
  </div>
</template>

<script>
  import { COLORS } from '../config';

  export default {
    props: [
      'name',
      'coords',
      'color',
      'selectTile',
      'currentCoords',
    ],
    computed: {
      styleObject() {
        return {
          bottom: `${this.coords.y * 50}px`,
          left: `${this.coords.x * 50}px`,
        };
      },
      classObject() {
        if (this.currentCoords !== null) {
          return {
            selected: this.currentCoords.equal(this.coords),
            [`type-${this.color}`]: true,
          };
        }
        return { [`type-${this.color}`]: true };
      },
    },
    methods: {
      handleClick() {
        this.selectTile(this.coords);
      },
    },
  };
</script>

<style lang="scss">
  .tile {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 50px;
    height: 50px;
    transition: left .2s ease-in-out, bottom .2s ease-in-out;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    
    &.type-0 {
      background-image: url('../images/png/separate/Jellies/NoShadow/Jelly (1).png');
    }
    &.type-1 {
      background-image: url('../images/png/separate/Jellies/NoShadow/Jelly (2).png');
    }
    &.type-2 {
      background-image: url('../images/png/separate/Jellies/NoShadow/Jelly (3).png');
    }
    &.type-3 {
      background-image: url('../images/png/separate/Jellies/NoShadow/Jelly (4).png');
    }
    &.type-4 {
      background-image: url('../images/png/separate/Jellies/NoShadow/Jelly (5).png');
    }
    &.type-5 {
      background-image: url('../images/png/separate/Jellies/NoShadow/Jelly (6).png');
    }
  }
  .selected {
    border: 1px solid red;
  }
</style>
