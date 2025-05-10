<template>
  <div class="care-provider-form">
    <!-- Language toggle -->
    <div class="top-bar">
      <div class="toggle-section">
        <label class="toggle-switch">
          <input type="checkbox" v-model="isBangla" />
          <span class="slider"></span>
        </label>
        <span>{{ isBangla ? "বাংলা" : "English" }}</span>
      </div>
    </div>

    <h2>{{ t("title") }}</h2>

    <!-- Netlify Form -->
    <form
      name="care-provider"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      @submit.prevent="handleSubmit"
    >
      <!-- Netlify-required hidden fields -->
      <input type="hidden" name="form-name" value="care-provider" />
      <input type="hidden" name="bot-field" />

      <div class="form-group">
        <label>{{ t("firstName") }} *</label>
        <input type="text" name="firstName" v-model="form.firstName" required />
      </div>

      <div class="form-group">
        <label>{{ t("lastName") }} *</label>
        <input type="text" name="lastName" v-model="form.lastName" required />
      </div>

      <div class="form-group">
        <label>{{ t("date") }}</label>
        <input type="date" name="date" v-model="form.date" />
      </div>

      <div class="form-group">
        <label>{{ t("time") }}</label>
        <input type="time" name="time" v-model="form.time" />
      </div>

      <div class="form-group">
        <label>{{ t("category") }}</label>
        <select name="category" v-model="form.category">
          <option value="A">{{ t("catA") }}</option>
          <option value="B">{{ t("catB") }}</option>
          <option value="C">{{ t("catC") }}</option>
          <option value="D">{{ t("catD") }}</option>
        </select>
      </div>

      <button class="next-button" type="submit">{{ t("submit") }}</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CareProviderForm",
  data() {
    return {
      isBangla: false,
      form: {
        firstName: "",
        lastName: "",
        date: "",
        time: "",
        category: "A",
      },
      translations: {
        en: {
          title: "Care Provider Details",
          firstName: "First Name",
          lastName: "Last Name",
          date: "Date",
          time: "Time",
          category: "Category",
          catA: "A. High level of stress",
          catB: "B. Distress from past trauma or fear",
          catC: "C. Thinking of self-harm",
          catD: "D. Thinking of harming others",
          submit: "Submit",
        },
        bn: {
          title: "স্বাস্থ্যসেবা প্রদানকারীর বিবরণ",
          firstName: "নামের প্রথম অংশ",
          lastName: "নামের শেষ অংশ",
          date: "তারিখ",
          time: "সময়",
          category: "বিভাগ",
          catA: "A. উচ্চ মাত্রার চাপ",
          catB: "B. অতীত ট্রমা বা ভয় থেকে কষ্ট",
          catC: "C. আত্ম-আঘাতের চিন্তা",
          catD: "D. অন্যদের আঘাত করার চিন্তা",
          submit: "জমা দিন",
        },
      },
    };
  },
  methods: {
    t(key) {
      return this.isBangla
        ? this.translations.bn[key]
        : this.translations.en[key];
    },
    handleSubmit() {
      const form = this.$el.querySelector("form");
      const formData = new FormData(form);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => {
          alert("✅ Submitted successfully!");
          this.form.firstName = "";
          this.form.lastName = "";
          this.form.date = "";
          this.form.time = "";
          this.form.category = "A";
        })
        .catch((err) => {
          console.error("❌ Submission error:", err);
          alert("Something went wrong. Please try again.");
        });
    },
  },
};
</script>

<style scoped>
/* Same styles as you provided */
</style>
