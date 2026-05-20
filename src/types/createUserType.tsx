export interface CreateUserRequest {
    username: string;
  
    nombre: string;
  
    apellido: string;
  
    email: string;
  
    password: string;
  
    perfilAcademico?: string;
  
    foto?: number[];
  
    mimeType?: string;
  
    RoleName: string;
  }