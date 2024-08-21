import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', {
  state: () => ({
    login: false,
    userId: '',
    userName: '',
    type: '0'
  }),
  getters: {
  },
  actions: {
    async load() {
      const tencoCookie = useCookie('tenco_uid', {maxAge: 60 * 60 * 24 * 30}) //(秒) 30日
      if(!tencoCookie.value){
        const res = await $fetch("/api/generate/id", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: {
            data: {
              n: 16
            }
          }
        })
        this.userId = res.id
        tencoCookie.value = res.id
      } else {
        this.userId = tencoCookie.value
      }

      // ユーザー確認
      if(!this.login){
        const res = await $fetch("/api/users/" + this.userId + "/check")
        if(res){
          this.login = true
          this.userName = res.name
          this.type = res.type
        }
      }
    }
  }
})