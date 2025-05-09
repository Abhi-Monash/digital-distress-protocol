<template>
  <div class="home-hero">
    <div class="overlay">
      <div class="content">
        <h1 class="protocol-name">Distress Protocol</h1>
        <p class="tagline">
          A Digital Distress Protocol for Compassionate Mental Health Support
        </p>
        <button class="get-started" @click="goToNextPage">Get Started</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToNextPage() {
      this.$router.push({ name: "IntroPage" }); // Adjust route name as needed
    },
  },
};
</script>

<style scoped>
.home-hero {
  background: url("https://source.unsplash.com/1600x900/?calm,nature,mental-health")
    center/cover no-repeat;
  height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
  color: white;
  max-width: 700px;
  padding: 0 20px;
}

.protocol-name {
  font-size: 4rem;
  font-weight: bold;
  color: #00bcd4;
  margin-bottom: 10px;
}

.tagline {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.get-started {
  padding: 14px 32px;
  font-size: 1rem;
  background-color: #00bcd4;
  border: none;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.get-started:hover {
  background-color: #0097a7;
}
</style>
