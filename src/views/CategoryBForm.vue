<template>
  <div class="category-b-form">
    <div class="top-bar">
      <label class="toggle-switch">
        <input type="checkbox" v-model="isBangla" />
        <span class="slider"></span>
      </label>
      <span>{{ isBangla ? "বাংলা" : "English" }}</span>
    </div>

    <h2>{{ t("title") }}</h2>

    <div class="step">{{ t("step1") }}</div>

    <div class="step">
      <label>{{ t("step2") }}</label>
      <div>
        <input type="radio" id="yes" value="yes" v-model="step2Answer" />
        <label for="yes">{{ t("yes") }}</label>

        <input type="radio" id="no" value="no" v-model="step2Answer" />
        <label for="no">{{ t("no") }}</label>
      </div>
    </div>

    <div v-if="step2Answer === 'no'" class="step">{{ t("step3") }}</div>
    <div v-if="step2Answer === 'no'" class="step">{{ t("step4") }}</div>

    <!-- Section E for 'Yes' response -->
    <div v-if="step2Answer === 'yes'" class="section-e">
      <h3>{{ t("e_title") }}</h3>
      <p>{{ t("e1") }}</p>
      <p>{{ t("e2") }}</p>

      <label>{{ t("q1") }}</label>
      <textarea v-model="sectionE.q1" />

      <label>{{ t("q2") }}</label>
      <textarea v-model="sectionE.q2" />

      <label>{{ t("q3") }}</label>
      <textarea v-model="sectionE.q3" />

      <p>{{ t("e3") }}</p>
    </div>

    <button @click="handleNext">{{ t("next") }}</button>
  </div>
</template>

<script>
export default {
  name: "CategoryBForm",
  data() {
    return {
      isBangla: localStorage.getItem("language") === "bn",
      step2Answer: "",
      sectionE: {
        q1: "",
        q2: "",
        q3: "",
      },
      translations: {
        en: {
          title: "Category B – Risk from Others (Past Harm)",
          step1: "1. Pause the assessment/intervention.",
          step2:
            "2. Ask the person if they are currently at risk from harm for others (If yes, proceed to Section E. If no, continue below).",
          step3:
            "3. Determine if the person wishes to pursue any actions against the person(s) in relation to previous experiences (see ‘Actions for Facilitators’).",
          step4:
            "4. Offer appropriate support and allow the participant time to regroup. Then ask if they are okay to continue.",
          yes: "Yes",
          no: "No",
          next: "Next",
          e_title:
            "E. Participants indicate that their health and safety is currently being endangered by other people.",
          e1: "1. Pause the assessment/intervention.",
          e2: "2. Assess danger from another person:",
          q1: "a) How might you be in danger?",
          q2: "b) Who is it that is intending to harm you?",
          q3: "c) Does the person intending to do harm have knowledge of your movements and/or where you stay?",
          e3: "3. Determine if the participant is in imminent danger from others (see ‘Actions for Facilitators’).",
        },
        bn: {
          title: "ক্যাটাগরি B – অন্যদের থেকে ঝুঁকি (অতীত ক্ষতি)",
          step1: "১. মূল্যায়ন/হস্তক্ষেপ থামান।",
          step2:
            "২. অংশগ্রহণকারীর কাছে জিজ্ঞাসা করুন তারা কি বর্তমানে অন্যদের থেকে ক্ষতির ঝুঁকিতে আছেন? (হ্যাঁ হলে Section E তে যান, না হলে নিচে যান)।",
          step3:
            "৩. অংশগ্রহণকারী কি আগের অভিজ্ঞতার ভিত্তিতে কারো বিরুদ্ধে ব্যবস্থা নিতে চান? (দেখুন ‘সহযোগীদের নির্দেশনা’)",
          step4:
            "৪. সমর্থন দিন এবং অংশগ্রহণকারীকে পুনরায় সংগঠিত হওয়ার সময় দিন। তারপর জিজ্ঞাসা করুন তারা এখন চালিয়ে যেতে ইচ্ছুক কিনা।",
          yes: "হ্যাঁ",
          no: "না",
          next: "পরবর্তী",
          e_title:
            "E. অংশগ্রহণকারীরা বলেন যে তাদের স্বাস্থ্য ও নিরাপত্তা বর্তমানে অন্যদের দ্বারা বিপন্ন হচ্ছে।",
          e1: "১. মূল্যায়ন/হস্তক্ষেপ থামান।",
          e2: "২. অন্যদের কাছ থেকে বিপদের মূল্যায়ন করুনঃ",
          q1: "ক) আপনি কিভাবে ঝুঁকিতে থাকতে পারেন?",
          q2: "খ) কে আপনাকে ক্ষতি করার চেষ্টা করছে?",
          q3: "গ) যে ব্যক্তি ক্ষতি করতে চায় সে কি আপনার গতিবিধি এবং আপনি কোথায় থাকেন তা জানে?",
          e3: "৩. অংশগ্রহণকারীর স্বাস্থ্য ও নিরাপত্তা কি তাৎক্ষণিক ঝুঁকিতে আছে? (দেখুন ‘সহযোগীদের নির্দেশনা’)",
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
      // If section E is filled, save it to localStorage
      if (this.step2Answer === "yes") {
        localStorage.setItem(
          "categoryB_SectionE",
          JSON.stringify(this.sectionE)
        );
      }
      this.$router.push({ name: "ActionsForFacilitators" });
    },
  },
};
</script>

<style scoped>
.category-b-form {
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
