export interface Sesion {
    tokenPayload: string;
    createdAt: Date;
    refreshedAt: Date;
    expiresAt: Date;
  }
  
