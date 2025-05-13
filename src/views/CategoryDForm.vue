<template>
  <div class="category-d-form">
    <div class="top-bar">
      <label class="toggle-switch">
        <input type="checkbox" v-model="isBangla" />
        <span class="slider"></span>
      </label>
      <span>{{ isBangla ? "বাংলা" : "English" }}</span>
    </div>

    <h2>{{ t("title") }}</h2>
    <p>{{ t("step1") }}</p>
    <p>{{ t("step2") }}</p>

    <label>{{ t("q1") }}</label>
    <textarea v-model="form.q1"></textarea>

    <label>{{ t("q2") }}</label>
    <div class="radio-group">
      <label
        ><input type="radio" value="yes" v-model="step2Answer" /> Yes</label
      >
      <label><input type="radio" value="no" v-model="step2Answer" /> No</label>
    </div>

    <div v-if="step2Answer === 'yes'">
      <label>{{ t("q3") }}</label>
      <textarea v-model="form.q3"></textarea>

      <label>{{ t("q4") }}</label>
      <textarea v-model="form.q4"></textarea>

      <label>{{ t("q5") }}</label>
      <textarea v-model="form.q5"></textarea>

      <label>{{ t("q6") }}</label>
      <textarea v-model="form.q6"></textarea>
    </div>

    <p>{{ t("step3") }}</p>

    <button @click="handleSubmit">{{ t("next") }}</button>
  </div>
</template>

<script>
export default {
  name: "CategoryDForm",
  data() {
    return {
      isBangla: localStorage.getItem("language") === "bn",
      step2Answer: "",
      form: {
        q1: "",
        q3: "",
        q4: "",
        q5: "",
        q6: "",
      },
      translations: {
        en: {
          title: "Category D - Thoughts of Hurting Others",
          step1: "Pause the assessment/intervention.",
          step2: "Express concern and assess safety:",
          q1: "a) Can you tell me about the thoughts you are having?",
          q2: "b) Do you intend to act on these thoughts to harm someone else? Who?",
          q3: "c) How do you intend to harm him/her/them?",
          q4: "d) When do you intend to harm him/her/them?",
          q5: "e) Do you have the means to harm him/her/them?",
          q6: "f) Are there reasons why you would not harm him/her/them?",
          step3:
            "3. Determine if the person is an imminent danger to others. (Then see 'Actions for Facilitators')",
          next: "Next",
        },
        bn: {
          title: "ক্যাটাগরি D - অন্যদের ক্ষতি করার চিন্তা",
          step1: "মূল্যায়ন/হস্তক্ষেপ স্থগিত করুন।",
          step2: "উদ্বেগ প্রকাশ করুন এবং সুরক্ষা মূল্যায়ন করুন:",
          q1: "ক) আপনি কী চিন্তা করছেন তা কি বলতে পারেন?",
          q2: "খ) আপনি কি এই চিন্তাগুলির উপর কাজ করার ইচ্ছা রাখেন? কাকে?",
          q3: "গ) আপনি কিভাবে তাকে/তাদের ক্ষতি করার পরিকল্পনা করছেন?",
          q4: "ঘ) আপনি কবে তাদের ক্ষতি করার পরিকল্পনা করছেন?",
          q5: "ঙ) আপনার কাছে কি সেই উপায় আছে?",
          q6: "চ) আপনি কেন তাদের ক্ষতি করবেন না, এমন কোনও কারণ আছে কি?",
          step3:
            "৩. নির্ধারণ করুন ব্যক্তি অন্যদের জন্য আসন্ন ঝুঁকিতে আছেন কি না। (তারপর দেখুন 'Actions for Facilitators')",
          next: "পরবর্তী",
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
    handleNext() {
      if (this.step2Answer === "yes") {
        localStorage.setItem("categoryD", JSON.stringify(this.section));
      }
      this.$router.push({ name: "ActionsForFacilitators" });
    },
  },
};
</script>

<style scoped>
.category-D-form {
  padding: 20px;
  font-family: sans-serif;
  max-width: 700px;
  margin: auto;
}
.top-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 12px 30px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
