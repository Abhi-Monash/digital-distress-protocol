<template>
  <div class="facilitator-actions">
    <div class="top-bar">
      <label class="toggle-switch">
        <input type="checkbox" v-model="isBangla" @change="saveLanguage" />
        <span class="slider"></span>
      </label>
      <span>{{ isBangla ? "বাংলা" : "English" }}</span>
    </div>

    <h1>{{ t("title") }}</h1>

    <div
      v-for="(section, index) in currentSections"
      :key="index"
      class="section"
    >
      <h3>{{ index + 1 }}. {{ section.heading }}</h3>
      <ul>
        <li v-for="(point, pIndex) in section.points" :key="pIndex">
          {{ point }}
        </li>
      </ul>
    </div>

    <button class="complete-btn" @click="submitAllData">
      {{ t("finish") }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ActionsForFacilitators",
  data() {
    return {
      isBangla: localStorage.getItem("language") === "bn",
      translations: {
        en: {
          title: "Actions for Facilitators / Healthcare Providers",
          finish: "Submit and Finish",
          sections: [
            {
              heading:
                "If distress is expected from sensitive topics, offer to stop, pause or continue.",
              points: [
                "Allow participant to stop the interview.",
                "Allow a short break and ask if they want to continue.",
              ],
            },
            {
              heading:
                "If distress is acute but not an imminent danger, take supportive actions.",
              points: [
                "Ask about positive coping strategies.",
                "Encourage contact with mental health workers.",
                "Provide contact details for support services.",
                "Notify local health facility or UHC and follow up if needed.",
              ],
            },
            {
              heading:
                "If participant wants to take action on past experiences (e.g. harm):",
              points: [
                "Advise contacting local police.",
                "Refer to community protection partners.",
              ],
            },
            {
              heading: "If distress reflects imminent danger to self:",
              points: [
                "Collect emergency contact info and family contact.",
                "Book appointment with mental health professional.",
                "Notify local police and UHC immediately.",
                "Refer participant to hospital/rehab if needed.",
              ],
            },
            {
              heading: "If distress reflects imminent danger to others:",
              points: [
                "Contact and inform local police.",
                "Explain actions taken.",
              ],
            },
            {
              heading: "If health and safety are in imminent danger:",
              points: [
                "Contact police for assistance.",
                "Notify UHC or government health facility.",
              ],
            },
          ],
        },
        bn: {
          title: "সহযোগীদের জন্য নির্দেশনা / স্বাস্থ্যসেবা প্রদানকারীদের জন্য",
          finish: "জমা দিন ও শেষ করুন",
          sections: [
            {
              heading:
                "যদি তীব্র আবেগ সংবেদনশীল বিষয়ের কারণে হয়, থামার, বিরতি নেওয়ার বা চালিয়ে যাওয়ার সুযোগ দিন।",
              points: [
                "অংশগ্রহণকারীকে সাক্ষাৎকার থামানোর সুযোগ দিন।",
                "স্বল্প বিরতির সুযোগ দিন এবং চালিয়ে যেতে চান কিনা জিজ্ঞাসা করুন।",
              ],
            },
            {
              heading:
                "যদি এটি তীব্র মানসিক চাপ হয় কিন্তু তাৎক্ষণিক বিপদ না হয়, সহায়তা দিন।",
              points: [
                "ইতিবাচক আচরণ সম্পর্কে জিজ্ঞাসা করুন।",
                "মানসিক স্বাস্থ্য কর্মীদের সাথে যোগাযোগের পরামর্শ দিন।",
                "সহায়তা পরিষেবার যোগাযোগ দিন।",
                "UHC/সরকারি স্বাস্থ্যকেন্দ্রকে অবহিত করুন এবং ফলোআপ করুন।",
              ],
            },
            {
              heading:
                "যদি অংশগ্রহণকারী পূর্ব অভিজ্ঞতা নিয়ে পদক্ষেপ নিতে চায়:",
              points: [
                "স্থানীয় পুলিশের সাথে যোগাযোগ করার পরামর্শ দিন।",
                "কমিউনিটি সুরক্ষা অংশীদারের কাছে যেতে বলুন।",
              ],
            },
            {
              heading: "যদি নিজেকে নিয়ে বিপদের আশঙ্কা থাকে:",
              points: [
                "জরুরি ফোন নম্বর এবং পরিবারের কারো যোগাযোগ সংগ্রহ করুন।",
                "মানসিক স্বাস্থ্য বিশেষজ্ঞের সাথে অ্যাপয়েন্টমেন্ট দিন।",
                "স্থানীয় পুলিশ এবং UHC-কে অবহিত করুন।",
                "প্রয়োজনে হাসপাতালে বা পুনর্বাসন কেন্দ্রে রেফার করুন।",
              ],
            },
            {
              heading: "যদি অন্যদের জন্য বিপদের আশঙ্কা থাকে:",
              points: [
                "স্থানীয় পুলিশের সাথে যোগাযোগ করুন।",
                "তাদের আপনার পদক্ষেপ সম্পর্কে জানান।",
              ],
            },
            {
              heading: "যদি স্বাস্থ্যের তাৎক্ষণিক বিপদ থাকে:",
              points: [
                "পুলিশের সহায়তা চান।",
                "UHC/সরকারি স্বাস্থ্য কেন্দ্রে জানান।",
              ],
            },
          ],
        },
      },
    };
  },
  computed: {
    currentSections() {
      return this.translations[this.isBangla ? "bn" : "en"].sections;
    },
  },
  methods: {
    t(key) {
      return this.translations[this.isBangla ? "bn" : "en"][key];
    },
    saveLanguage() {
      const lang = this.isBangla ? "bn" : "en";
      localStorage.setItem("language", lang);
    },
    async submitAllData() {
      try {
        const category = localStorage.getItem("category");

        const finalData = {
          user_id: localStorage.getItem("user_id"),
          firstName: localStorage.getItem("first_name"),
          lastName: localStorage.getItem("last_name"),
          date: localStorage.getItem("form_date"),
          time: localStorage.getItem("form_time"),
          category,
        };

        // ✅ Only include categoryA data if it exists and relevant
        if (category === "A") {
          const catA = localStorage.getItem("categoryA");
          if (catA) {
            finalData.categoryA = JSON.parse(catA);
          }
        }

        if (category === "B") {
          const sectionE = localStorage.getItem("categoryB_SectionE");
          if (sectionE) {
            finalData.categoryB_SectionE = JSON.parse(sectionE);
          }
        }
        if (category === "C") {
          const catC = localStorage.getItem("categoryC");
          if (catC) {
            finalData.categoryC = JSON.parse(catC);
          }
        }

        const res = await fetch("/.netlify/functions/submitCareProvider", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        });

        const result = await res.json();

        if (res.ok) {
          alert("All data submitted successfully!");
          this.$router.push({ name: "ThankYouPage" });
        } else {
          alert("Submission failed: " + (result.error || "Unknown error"));
        }
      } catch (err) {
        alert("Error submitting final data: " + err.message);
      }
    },
  },
};
</script>

<style scoped>
.facilitator-actions {
  padding: 20px;
  font-family: sans-serif;
  max-width: 800px;
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
.section {
  margin-bottom: 24px;
}
.section h3 {
  margin-bottom: 10px;
}
ul {
  padding-left: 20px;
}
.complete-btn {
  padding: 12px 30px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 20px;
}
.complete-btn:hover {
  background-color: #0056b3;
}
</style>
