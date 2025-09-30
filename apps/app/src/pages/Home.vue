<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const version = ref<string>("");
onMounted(async () => {
  const { data } = await axios.get("/api/health");
  version.value = data.version;
});
</script>

<template>
  <main style="font-family: system-ui; padding: 2rem;">
    <h1>Skills Simulator</h1>
    <p>API version: {{ version }}</p>
  </main>
</template>
