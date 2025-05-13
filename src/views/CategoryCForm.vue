<template>
  <div class="category-c-form">
    <!-- Language toggle -->
    <div class="top-bar">
      <label class="toggle-switch">
        <input type="checkbox" v-model="isBangla" @change="saveLanguage" />
        <span class="slider"></span>
      </label>
      <span>{{ isBangla ? "বাংলা" : "English" }}</span>
    </div>

    <h2>{{ t("title") }}</h2>

    <div class="instruction-block">
      <p>1. {{ t("step1") }}</p>
      <p>2. {{ t("step2") }}</p>
      <p>a) {{ t("q1") }}</p>
      <textarea v-model="form.q1" required></textarea>

      <p>b) {{ t("q2") }}</p>
      <label>
        <input type="radio" value="yes" v-model="form.q2" /> {{ t("yes") }}
      </label>
      <label>
        <input type="radio" value="no" v-model="form.q2" /> {{ t("no") }}
      </label>
    </div>

    <div v-if="form.q2 === 'yes'" class="follow-up">
      <p>c) {{ t("q3") }}</p>
      <textarea v-model="form.q3"></textarea>

      <p>d) {{ t("q4") }}</p>
      <textarea v-model="form.q4"></textarea>

      <p>e) {{ t("q5") }}</p>
      <textarea v-model="form.q5"></textarea>

      <p>f) {{ t("q6") }}</p>
      <textarea v-model="form.q6"></textarea>
    </div>

    <div class="instruction-block">
      <p>3. {{ t("step3") }}</p>
    </div>

    <button @click="handleNext">{{ t("next") }}</button>
  </div>
</template>

<script>
export default {
  name: "CategoryCForm",
  data() {
    return {
      isBangla: localStorage.getItem("language") === "bn",
      form: {
        q1: "",
        q2: "", // Yes/No radio
        q3: "",
        q4: "",
        q5: "",
        q6: "",
      },
      translations: {
        en: {
          title: "Category C - Self-Harm Risk",
          step1: "Pause the assessment/intervention.",
          step2: "Express concern and ask the following questions:",
          q1: "Can you tell me what thoughts you are having?",
          q2: "Do you intend to act on these thoughts to harm yourself?",
          q3: "How do you intend to harm yourself?",
          q4: "When do you intend to harm yourself?",
          q5: "Do you have the means to harm yourself?",
          q6: "Are there reasons why you would not harm yourself?",
          step3:
            "Determine if the person is an imminent danger to self. If yes, notify caregivers and consider hospital admission.",
          yes: "Yes",
          no: "No",
          next: "Next",
        },
        bn: {
          title: "ক্যাটাগরি C - আত্ম-আঘাতের ঝুঁকি",
          step1: "মূল্যায়ন/হস্তক্ষেপ সঙ্গে সঙ্গে থামান।",
          step2: "উদ্বেগ প্রকাশ করুন এবং নিম্নোক্ত প্রশ্ন করুন:",
          q1: "আপনি কী ধরনের চিন্তা করছেন তা কি বলতে পারেন?",
          q2: "আপনি কি এই চিন্তাগুলোর উপর ভিত্তি করে নিজেকে আঘাত করতে চান?",
          q3: "আপনি কীভাবে নিজেকে আঘাত করতে চান?",
          q4: "আপনি কখন নিজেকে আঘাত করতে চান?",
          q5: "আপনার কি নিজের ক্ষতি করার উপায় আছে?",
          q6: "আপনার কি এমন কোনো কারণ আছে যা আপনাকে নিজের ক্ষতি করতে দেবে না?",
          step3:
            "ব্যক্তি কি আত্ম-আঘাতের আসন্ন ঝুঁকিতে আছে তা নির্ধারণ করুন। আইনগত বিষয় বিবেচনায় পরিচর্যাকারীকে অবহিত করুন এবং হাসপাতালে ভর্তি বিবেচনা করুন।",
          yes: "হ্যাঁ",
          no: "না",
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
    saveLanguage() {
      localStorage.setItem("language", this.isBangla ? "bn" : "en");
    },
    handleNext() {
      // Save to localStorage
      localStorage.setItem("categoryC", JSON.stringify(this.form));
      this.$router.push({ name: "ActionsForFacilitators" });
    },
  },
};
</script>

<style scoped>
.category-c-form {
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
.toggle-switch {
  position: relative;
  width: 50px;
  height: 24px;
}
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 24px;
  transition: 0.4s;
}
.slider:before {
  content: "";
  position: absolute;
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}
.toggle-switch input:checked + .slider {
  background-color: #2196f3;
}
.toggle-switch input:checked + .slider:before {
  transform: translateX(26px);
}
textarea {
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 20px;
}
button:hover {
  background-color: #0056b3;
}
</style>
