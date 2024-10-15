import { defineStore } from 'pinia'
import type { SesionState } from '@/models/sesionState'
import { useAuthStore } from './authStore'



export const useSesionStore = defineStore('sesion', {
  
    state: (): SesionState => ({
        loading: false, 
        data: {
          tokenPayload: useAuthStore().auth.data?.jwtToken?.replace("fake-jwt-token.", "") || "", 
          createdAt: new Date(), 
          refreshedAt: new Date(Date.now() + 10 * 60 * 1000), 
          expiresAt: new Date(Date.now() + 11 * 60 * 1000), 
        },
      }),
      
      actions: {
        update(payload: string, createdAt: Date, refreshedAt: Date, expiresAt: Date) {
        
          if (this.data) {
            this.data.tokenPayload = payload;
            this.data.createdAt = createdAt; 
            this.data.refreshedAt = refreshedAt; 
            this.data.expiresAt = expiresAt; 
          }
        },
      },
  
})



