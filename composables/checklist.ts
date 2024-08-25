import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useChecklistStore = defineStore('checklist', {
  state: () => ({
    rows: ref([])
  }),
  getters: {
  },
  actions: {
    async load() {
      const data = await $fetch('/api/checklist/list')
      this.rows.value = data
    }
  }
})