<template>
  <div>
    <div id="grid">
      <Tile 
        v-for="element in grid"
        v-bind:key="element.key"
        v-bind:coords="element.coords"
        v-bind:color="element.color"
        v-bind:selectTile="selectTile"
        v-bind:currentCoords="currentCoords"
      />
    </div>
    <Counter v-bind:nbPoints="nbPoints" />
  </div>
</template>

<script>
  import Tile from './Tile.vue';
  import Counter from './Counter.vue';
  import { COLORS_NB, GRID_SIZE } from '../config';
  import Coordinates from './Coords.js';

  let lastId = 0;
  export default {
    components: {
      Tile,
      Counter,
    },
    data: () => {
      const grid = [];
      for (let x = 0; x < GRID_SIZE; x += 1) {          
        for (let y = 0; y < GRID_SIZE; y += 1) {
          grid.push({
            key: lastId++,
            coords: new Coordinates(x, y),
            color: Math.floor(Math.random() * COLORS_NB),
          });
        }
      }
      return { grid, currentCoords: null, nbPoints: 0 };
    },
    mounted: function() {
      setTimeout(() => this.removeCombo(), 200);
    },
    methods: {
      selectTile(coords) {
        if (!this.currentCoords) {
          this.currentCoords = coords;
        } else if (coords.equal(this.currentCoords)) {
          this.currentCoords = null;
        } else if (coords.near(this.currentCoords)) {
          let startTile = this.getTileAt(this.currentCoords);
          let endTile = this.getTileAt(coords);
          startTile.coords = coords;
          endTile.coords = this.currentCoords;
          this.currentCoords = null;
          setTimeout(() => this.removeCombo(), 200);
        } else {
          this.currentCoords = coords;
        }
      },
      getTileAt(coords) {
        let resultTile = null; 
        this.grid.forEach(element => {
          if (element.coords.equal(coords)) {
            resultTile = element;
          }
        });
        return resultTile;
      },
      removeCombo() {
        let tilesToRemove = [];
        for (let y = 0; y < GRID_SIZE; y +=1) {
          let currentColor = null;
          let inlineTiles = [];
          for (let x = 0; x < GRID_SIZE; x += 1) {
            const currentTile = this.getTileAt(new Coordinates(x, y));
            if (currentColor === currentTile.color) {
              inlineTiles.push(currentTile);
            } 
            if (currentColor !== currentTile.color || x === GRID_SIZE - 1) {
              if (inlineTiles.length >= 3) {
                this.addPoints(inlineTiles.length);
                inlineTiles.forEach((inlineTile) => {
                  if (!tilesToRemove.find((tileToRemove) => {
                    return tileToRemove.coords.equal(inlineTile.coords);
                  })) {
                    tilesToRemove.push(inlineTile);
                  }
                }); 

              }
              
              inlineTiles = [currentTile];
              currentColor = currentTile.color;
            }
          }
        }
        for (let x = 0; x < GRID_SIZE; x +=1) {
          let currentColor = null;
          let inlineTiles = [];
          for (let y = 0; y < GRID_SIZE; y += 1) {
            const currentTile = this.getTileAt(new Coordinates(x, y));
            if (currentColor === currentTile.color) {
              inlineTiles.push(currentTile);
            } 
            if (currentColor !== currentTile.color || y === GRID_SIZE - 1) {
              if (inlineTiles.length >= 3) {
                this.addPoints(inlineTiles.length);
                inlineTiles.forEach((inlineTile) => {
                  if (!tilesToRemove.find((tileToRemove) => {
                    return tileToRemove.coords.equal(inlineTile.coords);
                  })) {
                    tilesToRemove.push(inlineTile);
                  }
                });

              }
              inlineTiles = [currentTile];
              currentColor = currentTile.color;
            }
          }
        }

        if (tilesToRemove.length) {
          tilesToRemove.forEach((tileToRemove) => {
            this.grid.splice(this.grid.indexOf(tileToRemove), 1);
          });
          setTimeout(() => this.resolve(), 200);
        }
      },
      resolve() {
        this.grid.forEach(element => {
          let nbHoles = 0;
          for (let y = 0; y <= element.coords.y; y += 1) {
            if (this.getTileAt(new Coordinates (element.coords.x, y)) === null) {
              nbHoles += 1;
            }
          }
          if (nbHoles) {
            element.coords.set(element.coords.x, element.coords.y - nbHoles);
          }
        });
        setTimeout(() => this.spawn(), 200);
      },
      spawn() {
        for (let x = 0; x < GRID_SIZE; x += 1) {          
          for (let y = 0; y < GRID_SIZE; y += 1) {
            if (!this.getTileAt(new Coordinates (x, y))) {
              this.grid.push({
                key: lastId++,
                coords: new Coordinates(x, y),
                color: Math.floor(Math.random() * COLORS_NB),
              });
            }
          }
        }
        setTimeout(() => this.removeCombo(), 200);
      },
      addPoints(number) {
        this.nbPoints += number;
        if (number === 4) {
          this.nbPoints += 5;
        } else if (number === 5) {
          this.nbPoints += 10;
        }
      },
    },
  };
</script>

<style lang="scss">
  $tileSize: 50px;
  $gridSize: $tileSize * 8;
  #grid {
    position: absolute;
    width: $gridSize;
    height: $gridSize;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 30px;
    border: 2.5mm ridge rgb(170, 50, 220);
    /* DAMIER */
    background-color: rgb(134, 248, 159);
    background-image: linear-gradient(45deg, rgb(76, 250, 114) 25%, transparent 25%, transparent 75%, rgb(76, 250, 114) 75%), linear-gradient(45deg, rgb(76, 250, 114) 25%, transparent 25%, transparent 75%, rgb(76, 250, 114) 75%);
    background-size: 100px 100px;
    background-position: 0 0, 50px 50px;
  }
</style>
