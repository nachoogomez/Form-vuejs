import { Sesion } from "./sesionModel";

export interface SesionState {
    loading: boolean;
    data: Sesion | null;
  }
  