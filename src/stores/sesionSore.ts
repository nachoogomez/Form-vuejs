import { defineStore } from 'pinia'
import type { SesionState } from '@/models/sesionState'
import {useUserStore} from '@/stores/userStore'



export const useSesionStore = defineStore('sesion', {
  
    state: (): SesionState => ({
        loading: false, 
        data: {
          tokenPayload: useUserStore().user?.jwtToken?.replace("fake-jwt-token.", "") || "",
          createdAt: new Date(), 
          refreshedAt: new Date(), 
          expiresAt: new Date(), 
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


/*
user?.jwtToken?.replace("fake-jwt-token.", "") || ""
if (this.data) {
            this.data.tokenPayload = payload;
            this.data.createdAt = createdAt; 
            this.data.refreshedAt = refreshedAt; 
            this.data.expiresAt = expiresAt; 
          }
*/
