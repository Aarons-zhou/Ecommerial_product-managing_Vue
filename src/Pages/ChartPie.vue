<template>
  <div class='warn-text'>
    请前往
  <a href='http://182.61.132.190/#/chart/pie'>React版本</a>
    体验
    <img :src="warn" alt="warn" class='warn'>
  </div>
</template>

<script>
import warn from '../Images/warn.jpg'
export default {
  data(){
    return {
      warn
    }
  }
}
</script>

<style>
.warn-text{
  font-size: 25px;
}
.warn{
  display: block;
  width: 300px;
}
</style>