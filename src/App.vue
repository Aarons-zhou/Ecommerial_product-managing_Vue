<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getUser } from "./utils/localStorage";
export default {
  name: "App",
};
</script>

<style>
</style>
