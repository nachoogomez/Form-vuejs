import { defineStore } from 'pinia'
import type { User } from '@/models/userModel'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
      user: null as User | null
  }),
  actions: {
      setUser(user: User | null) {
          this.user = user;
      }
  }
});