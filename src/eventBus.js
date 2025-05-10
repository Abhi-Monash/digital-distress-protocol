// src/eventBus.js
import { reactive } from "vue";

const eventBus = reactive({
  formData: {},

  updateForm(section, data) {
    this.formData = { ...this.formData, [section]: data };
  },

  getFormData() {
    return this.formData;
  },

  resetForm() {
    this.formData = {};
  },
});

export default eventBus;
