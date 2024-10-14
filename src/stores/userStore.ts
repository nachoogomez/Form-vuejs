import { defineStore } from 'pinia'
import type { User } from '@/models/userModel'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      username: '',
      password: '',
      rememberMe: false
    } as User
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    }
  }
})
