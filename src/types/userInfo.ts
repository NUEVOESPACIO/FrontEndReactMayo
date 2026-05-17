export interface UserInfo {
    id?: number;
  
    username: string;
  
    nombre: string;
  
    apellido: string;
  
    email: string;
  
    perfilAcademico?: string;
  
    foto?: string | Uint8Array | null;
  
    roleName: string;
  }