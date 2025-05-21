// src/types/Cliente.ts

export interface Cliente {
  id: string;          
  nome: string;
  email?: string;      
  telefone: string;
  comorbidade?: boolean;
  cpf?: string;         
}
