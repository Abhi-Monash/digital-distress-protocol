<template>
  <div class="form-wrapper">
    <div class="top-bar">
      <label class="toggle-switch">
        <input type="checkbox" v-model="isBangla" />
        <span class="slider"></span>
      </label>
      <span>{{ isBangla ? "বাংলা" : "English" }}</span>
    </div>

    <h2>{{ t("title") }}</h2>

    <form @submit.prevent="handleSubmit">
      <label>{{ t("firstName") }}</label>
      <input v-model="form.firstName" required />

      <label>{{ t("lastName") }}</label>
      <input v-model="form.lastName" required />

      <label>{{ t("date") }}</label>
      <input type="date" v-model="form.date" />

      <label>{{ t("time") }}</label>
      <input type="time" v-model="form.time" />

      <p class="description">{{ t("description") }}</p>

      <div v-for="option in distressOptions" :key="option.value">
        <input
          type="radio"
          :value="option.value"
          v-model="form.category"
          :id="option.value"
        />
        <label :for="option.value">{{ t(option.label) }}</label>
      </div>

      <button type="submit">{{ t("next") }}</button>
    </form>
  </div>
</template>

<script>
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export default {
  name: "CareProviderForm",
  data() {
    return {
      isBangla: false,
      form: {
        firstName: "",
        lastName: "",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        category: "",
      },
      distressOptions: [
        { value: "A", label: "optionA" },
        { value: "B", label: "optionB" },
        { value: "C", label: "optionC" },
        { value: "D", label: "optionD" },
      ],
      translations: {
        en: {
          title: "Care Provider Details",
          firstName: "First Name",
          lastName: "Last Name",
          date: "Date",
          time: "Time",
          description:
            "This protocol is intended to be used when patients present at the health facility with elevated levels of distress. The assessor should determine which category the participant’s distress corresponds with in the table below (i.e. A/B/C/D), and follow the steps detailed in the appropriate row of the table accordingly.",
          optionA:
            "A. Participants indicate that they are experiencing a high level of stress",
          optionB:
            "B. Participants indicate that their distress is in relation to past episodes of harm",
          optionC:
            "C. Participants indicate they are thinking of hurting themselves",
          optionD:
            "D. Participants indicate they are thinking of hurting others",
          next: "Next",
        },
        bn: {
          title: "সেবাদানকারীর বিবরণ",
          firstName: "প্রথম নাম",
          lastName: "শেষ নাম",
          date: "তারিখ",
          time: "সময়",
          description:
            "এই প্রোটোকলটি ব্যবহৃত হয় যখন রোগীরা উচ্চ মাত্রার মানসিক চাপ নিয়ে স্বাস্থ্য কেন্দ্রে আসে। মূল্যায়নকারীকে নির্ধারণ করতে হবে অংশগ্রহণকারীর মানসিক চাপ কোন শ্রেণীতে (A/B/C/D) পড়ে এবং নিচের সারণীর সেই সারির নির্দেশাবলী অনুসরণ করতে হবে।",
          optionA:
            "A. অংশগ্রহণকারী উচ্চ মাত্রার মানসিক চাপ অনুভব করছেন বলে জানান",
          optionB:
            "B. অংশগ্রহণকারী অতীতের ক্ষতির ঘটনাগুলোর সঙ্গে তাদের কষ্টের সম্পর্ক আছে বলে জানান",
          optionC: "C. অংশগ্রহণকারী নিজেকে আঘাত করার কথা ভাবছেন বলে জানান",
          optionD: "D. অংশগ্রহণকারী অন্যকে আঘাত করার কথা ভাবছেন বলে জানান",
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
    handleSubmit() {
      if (!this.form.firstName || !this.form.lastName) {
        alert(
          this.t("firstName") + " & " + this.t("lastName") + " are required."
        );
        return;
      }

      // Generate or reuse a user_id
      const user_id = localStorage.getItem("user_id") || generateUUID();
      localStorage.setItem("user_id", user_id);

      // Submit the form data to Netlify Function
      fetch("/.netlify/functions/submitCareProvider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          date: this.form.date,
          time: this.form.time,
          category: this.form.category,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Form submitted successfully!");
            this.$router.push({ name: "NextPage" });
          } else {
            console.error("Server error:", data);
            alert("Submission failed: " + (data.error || "Unknown error"));
          }
        })
        .catch((err) => {
          alert("Error submitting form: " + err.message);
        });
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  padding: 20px;
  font-family: sans-serif;
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

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
}

input[type="text"],
input[type="date"],
input[type="time"] {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 24px;
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

.description {
  font-size: 0.95rem;
  margin-bottom: 10px;
}
</style>
