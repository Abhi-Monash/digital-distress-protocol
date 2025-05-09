<template>
  <div class="home-container">
    <h1>
      <span class="highlight"> Digital Distress Protocol</span>
    </h1>
    <p>Please select your preferred language to begin:</p>

    <div class="language-options">
      <label>
        <input type="radio" value="English" v-model="language" />
        English
      </label>
      <label>
        <input type="radio" value="Bangla" v-model="language" />
        Bangla
      </label>
    </div>

    <button @click="continueToAssessment">Continue</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      language: "English",
    };
  },
  methods: {
    continueToAssessment() {
      this.$router.push({
        name: "CategoryA",
        query: { lang: this.language },
      });
    },
  },
};
</script>

<style scoped>
.home-container {
  max-width: 600px;
  margin: 60px auto;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.highlight {
  color: #4a90e2;
}

.language-options {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 40px;
}

label {
  font-size: 1.1rem;
  cursor: pointer;
}

button {
  background-color: #4a90e2;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #357ab8;
}
</style>
