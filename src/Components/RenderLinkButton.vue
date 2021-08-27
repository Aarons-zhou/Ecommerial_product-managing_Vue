<template>
  <button class="link-button">{{ children }}</button>
</template>

<script>
export default {
  props: ["children"],
};
</script>

<style lang='less'>
.link-button {
  box-sizing: content-box;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  color: rgb(228, 72, 98);
  &:hover {
    color: rgb(255, 160, 176);
  }
}
</style>