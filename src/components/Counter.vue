<template>
  <div>
    <p>Score : {{ nbPoints }}</p>
  </div>
</template>

<script>
  export default {
    props: [
      'nbPoints',
    ],
  }
</script>

<style>
  p {
    transform: rotate(-15deg);
    color: rgb(170, 50, 220);
    font-size: 0.8em;
    font-stretch: condensed;
  }
</style>

