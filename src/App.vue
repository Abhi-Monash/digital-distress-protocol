<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    let userId = localStorage.getItem("user_id");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("user_id", userId);
    }
  },
};
</script>
