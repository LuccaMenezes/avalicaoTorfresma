export interface UsuarioRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface UsuarioResponse {
  id: number;
  email: string;
  role: string;
}

export interface UsuarioLogin {
  email: string;
  password: string;
}






