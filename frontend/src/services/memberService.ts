import api from "./api";

export interface MemberData {
  id: string;
  email: string;
  role: string;
  nombre: string;
  apellido: string;
  nombreCompleto: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
  numeroSocio: string;
  categoria: string;
  estado: string;
  fechaRegistro: string;
  foto?: string;
  observaciones?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateMemberData {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
}

export const memberService = {
  getCurrentMember: async (): Promise<{ member: MemberData }> => {
    const response = await api.get("/members/current", { withCredentials: true });
    return response.data;
  },

  updateMember: async (data: UpdateMemberData): Promise<{ message: string; member: MemberData }> => {
    const response = await api.put("/members/current", data, { withCredentials: true });
    return response.data;
  }
};

export default memberService;