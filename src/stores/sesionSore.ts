import { defineStore } from 'pinia'
import type { SesionState } from '@/models/sesionState'
import { useAuthStore } from './authStore'
import type { Sesion } from '@/models/sesionModel';


export const useSesionStore = defineStore('sesion', {
  state: (): SesionState => ({   
    loading: false,
    data: null
  }),

  actions: {   
    update( newSesion: Sesion ) {
        this.data = newSesion;
    },
    
    async refreshSesion() {
      const authStore = useAuthStore();
      const jwtBase64 = authStore.auth.data?.jwtToken?.split('.')[1];

      if(!jwtBase64) return;
             
      const decodedToken = JSON.parse(atob(jwtBase64));
      const createdAt = new Date((decodedToken.exp - 120) * 1000);
      const expiresAt = new Date(decodedToken.exp * 1000);
      const refreshedAt = new Date(decodedToken.exp * 1000 - (60 * 1000));

      const sesionData: Sesion = {
          tokenPayload: jwtBase64,
          createdAt: createdAt,
          expiresAt: expiresAt,
          refreshedAt: refreshedAt
      };

      this.update(sesionData);
  },
  }
})
/*export const useSesionStore = defineStore('sesion', {
  
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
  
})*/



