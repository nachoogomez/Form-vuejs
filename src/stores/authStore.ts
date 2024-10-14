import { fetchWrapper } from "@/helpers/fetchWrapper";
import type { User } from "@/models/userModel";
import { defineStore } from "pinia";

const baseURL = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore ({
    id: 'auth',
    state: () => ({
        auth: {} as {loading: boolean, data?: User | null, refreshTokenTimeOut: number | null}
    }),
    actions: {
        async login(username: string, password: string) {
           this.auth.data = await fetchWrapper.post(`${baseURL}/authenticate`, {username, password}, {credentials: 'include'});
           this.startRefreshTokenTimer();
        },
        async logout(){
            fetchWrapper.post(`${baseURL}/revoke-token`, {}, {credentials: 'include'});
            this.stopRefreshTokenTimer();
            this.auth.data = null;
        },
        async refreshToken() {
            this.auth.data = await fetchWrapper.post(`${baseURL}/refresh-token`, {}, {credentials: 'include'});
            this.startRefreshTokenTimer();
        },
        startRefreshTokenTimer() {
            if(!this.auth.data || !this.auth.data.jwtToken) return;
            
            // Parse JSON 

            const jwtBase64 = this.auth.data.jwtToken.split('.')[1];
            const decodedJwtToken = JSON.parse(atob(jwtBase64));

            // Set the time that the jwt will expire
            const expires = new Date(decodedJwtToken.exp * 1000);
            
            const timeout = expires.getTime() - Date.now() - (60 * 1000); // 10 min before expiry

            this.auth.refreshTokenTimeOut = setTimeout(() => this.refreshToken(), timeout);

        },
        stopRefreshTokenTimer() {
            if(this.auth.refreshTokenTimeOut){
                clearTimeout(this.auth.refreshTokenTimeOut);
                this.auth.refreshTokenTimeOut = null;
            }
        }
    }
})
