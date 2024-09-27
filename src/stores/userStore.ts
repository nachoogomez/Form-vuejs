import { defineStore } from 'pinia'

//Interface

interface User {
  username: string
  password: string
  rememberMe: boolean
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      username: '',
      password: '',
      rememberMe: false
    } as User
  }),
  actions: {
    setUser(newUser: User) {
      this.user = newUser
    }
  }
})
