<template>
  <div class="intro-page">
    <!-- Top right toggle -->
    <div class="top-bar">
      <div class="toggle-section">
        <label class="toggle-switch">
          <input type="checkbox" v-model="isBangla" />
          <span class="slider"></span>
        </label>
        <span>{{ isBangla ? "বাংলা" : "English" }}</span>
      </div>
    </div>

    <!-- Title and description -->
    <h1>{{ t("title") }}</h1>
    <p>
      <strong>{{ t("audience") }}</strong>
    </p>
    <p>{{ t("intro") }}</p>

    <!-- Terms table -->
    <table>
      <thead>
        <tr>
          <th>{{ t("term") }}</th>
          <th>{{ t("definition") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in terms" :key="item.term">
          <td>{{ t(item.term) }}</td>
          <td>{{ t(item.def) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Next button -->
    <div class="next-button-wrapper">
      <button class="next-button" @click="goToNext">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Intropage",
  data() {
    return {
      isBangla: false,
      terms: [
        { term: "sensitive", def: "sensitiveDef" },
        { term: "acute", def: "acuteDef" },
        { term: "danger", def: "dangerDef" },
        { term: "referral", def: "referralDef" },
      ],
      translations: {
        en: {
          title: "Digital Distress Protocol",
          audience:
            "For Primary Health Care Providers / Facilitators / Assessors",
          intro:
            "Welcome to the Distress Protocol Tool, designed for use in low-resource settings. This tool helps guide decision-making when participants show signs of emotional distress during assessments or interventions.",
          term: "Term",
          definition: "Definition",
          sensitive: "Sensitive Topic",
          sensitiveDef:
            "A topic that may cause emotional or psychological discomfort to the participant.",
          acute: "Acute Emotional Distress",
          acuteDef:
            "A strong emotional response due to trauma, fear, or painful memories.",
          danger: "Imminent Danger",
          dangerDef:
            "A serious and immediate threat to the participant’s life or safety, or that of others.",
          referral: "Referral",
          referralDef:
            "Connecting the participant to local mental health or emergency support services.",
        },
        bn: {
          title: "ডিজিটাল ডিস্ট্রেস প্রোটোকল",
          audience:
            "প্রাথমিক স্বাস্থ্যসেবা প্রদানকারী / ফ্যাসিলিটেটর / মূল্যায়নকারীদের জন্য",
          intro:
            "ডিস্ট্রেস প্রোটোকল টুলে স্বাগতম, যা স্বল্প-সম্পদ পরিবেশে ব্যবহারের জন্য ডিজাইন করা হয়েছে। এই টুলটি মূল্যায়ন বা হস্তক্ষেপের সময় অংশগ্রহণকারীদের মানসিক কষ্টের লক্ষণ দেখালে সিদ্ধান্ত গ্রহণে সহায়তা করে।",
          term: "পরিভাষা",
          definition: "সংজ্ঞা",
          sensitive: "সংবেদনশীল বিষয়",
          sensitiveDef:
            "একটি বিষয় যা অংশগ্রহণকারীর মানসিক অস্বস্তি সৃষ্টি করতে পারে।",
          acute: "তীব্র মানসিক কষ্ট",
          acuteDef:
            "ভয়, ট্রমা বা বেদনাদায়ক স্মৃতির কারণে তীব্র মানসিক প্রতিক্রিয়া।",
          danger: "তাৎক্ষণিক বিপদ",
          dangerDef: "অংশগ্রহণকারী বা অন্যদের জীবনের তাৎক্ষণিক ও গুরুতর হুমকি।",
          referral: "রেফারাল",
          referralDef:
            "স্থানীয় মানসিক স্বাস্থ্য বা জরুরি সহায়তা পরিষেবার সাথে অংশগ্রহণকারীর সংযোগ স্থাপন।",
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
    goToNext() {
      localStorage.setItem("language", this.isBangla ? "bn" : "en");
      this.$router.push({ name: "CareProviderForm" }); // Replace with your actual next route name
    },
  },
};
</script>

<style scoped>
.intro-page {
  padding: 20px;
  font-family: sans-serif;
}

/* Top bar styling */
.top-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.toggle-section {
  display: flex;
  align-items: center;
  gap: 10px;
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

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
}

/* Next button styling */
.next-button-wrapper {
  margin-top: 30px;
  text-align: center;
}

.next-button {
  padding: 12px 30px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

.next-button:hover {
  background-color: #0056b3;
}
</style>
