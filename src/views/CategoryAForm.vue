<template>
  <div class="category-a-form">
    <div class="top-bar">
      <label class="toggle-switch">
        <input type="checkbox" v-model="isBangla" @change="syncLanguage" />
        <span class="slider"></span>
      </label>
      <span>{{ isBangla ? "বাংলা" : "English" }}</span>
    </div>

    <h2>{{ t("title") }}</h2>

    <div class="instruction-block">
      <p>1. {{ t("step1") }}</p>
      <p>2. {{ t("step2") }}</p>
      <p>- {{ t("step2sub") }}</p>
    </div>

    <div class="follow-up">
      <p>3. {{ t("step3") }}</p>

      <p>{{ t("q1") }}</p>
      <textarea v-model="form.q1" required></textarea>

      <p>{{ t("q2") }}</p>
      <textarea v-model="form.q2" required></textarea>

      <p>{{ t("q3") }}</p>
      <textarea v-model="form.q3" required></textarea>

      <p>{{ t("q4") }}</p>
      <textarea v-model="form.q4" required></textarea>
    </div>

    <div class="instruction-block">
      <p>4. {{ t("step4") }}</p>
    </div>

    <button @click="handleNext">{{ t("next") }}</button>
  </div>
</template>

<script>
export default {
  name: "CategoryAForm",
  data() {
    return {
      isBangla: localStorage.getItem("language") === "bn",
      form: {
        q1: "",
        q2: "",
        q3: "",
        q4: "",
      },
      translations: {
        en: {
          title: "Category A - Emotional Distress Follow-up",
          step1: "Pause the assessment/intervention immediately.",
          step2:
            "Offer appropriate support and allow the participant time to regroup. Then ask, if they are ok to continue now, or would they like to discuss with you what they are experiencing?",
          step2sub:
            "If they indicate that they would like to discuss the issues further, then move to step 3.",
          step3: "Follow-up Questions",
          q1: "A. Can you tell me what you are feeling right now?",
          q2: "B. Can you tell me what thoughts you are having?",
          q3: "C. Do you feel you will be able to go on about your day after our meeting today?",
          q4: "D. Are you concerned about your personal safety?",
          step4:
            "Determine if the person is experiencing acute emotional distress beyond what would be normally expected in an interview about a sensitive topic.",
          next: "Next",
        },
        bn: {
          title: "ক্যাটাগরি A - মানসিক চাপের ফলোআপ",
          step1: "মূল্যায়ন/হস্তক্ষেপ সঙ্গে সঙ্গে থামান।",
          step2:
            "সাপোর্ট দিন এবং অংশগ্রহণকারীকে পুনরায় সংগঠিত হওয়ার সময় দিন। তারপর জিজ্ঞাসা করুন, তিনি এখন চালিয়ে যেতে চান কিনা, নাকি নিজের অভিজ্ঞতা নিয়ে কথা বলতে চান?",
          step2sub: "যদি অংশগ্রহণকারী কথা বলতে চান, তবে ধাপ ৩-এ যান।",
          step3: "ফলোআপ প্রশ্নাবলী",
          q1: "A. আপনি এখন কী অনুভব করছেন তা কি বলবেন?",
          q2: "B. আপনার কী ধরণের চিন্তা হচ্ছে তা কি বলবেন?",
          q3: "C. আমাদের মিটিংয়ের পর আপনি কি স্বাভাবিকভাবে দিন চালিয়ে যেতে পারবেন বলে মনে করেন?",
          q4: "D. আপনি কি আপনার ব্যক্তিগত নিরাপত্তা নিয়ে উদ্বিগ্ন?",
          step4:
            "একটি সংবেদনশীল বিষয়ে সাক্ষাৎকারের তুলনায় অতিরিক্ত মানসিক চাপ হচ্ছে কিনা তা নির্ধারণ করুন।",
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
    syncLanguage() {
      localStorage.setItem("language", this.isBangla ? "bn" : "en");
    },
    handleNext() {
      localStorage.setItem("categoryA", JSON.stringify(this.form));
      this.$router.push({ name: "ActionsForFacilitators" });
    },
  },
};
</script>

<style scoped>
.category-a-form {
  padding: 20px;
  font-family: sans-serif;
  max-width: 700px;
  margin: auto;
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.toggle-switch {
  position: relative;
  display: inline-block;
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

.instruction-block {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
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
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}
</style>
