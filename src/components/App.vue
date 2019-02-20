<template>
  <div id="app">
    <h1>JellyCrush</h1>
    <Grid />
  </div>
</template>

<script>
  import Grid from './Grid.vue';

  export default {
    components: {
      Grid,
    }
  }
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>

<!-- Global CSS -->
<style>
  @font-face {
    font-family: "bubblegum";
    src: url('../fonts/bubblegums.ttf');
  }
  body {
    margin:0;
    padding:0;
    background: url('../images/png/BG.png') no-repeat center fixed; 
    background-size: cover;
    font-family: 'bubblegum', sans-serif;
  }
  h1 {
    text-align: center;
    color: rgb(98, 6, 138);
    font-weight: bold;
    font-stretch: ultra-expanded;
  }
</style>
