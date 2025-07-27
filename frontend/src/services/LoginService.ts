import api from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role?: string;
}

export const loginService = {
  login: async (data: LoginData) => {
    const response = await api.post("/login", data, { withCredentials: true});
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/logout", {}, {withCredentials: true});
    return response.data;
  },

  verifyAuth: async () => {
    const response = await api.get("/me", { withCredentials: true });
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post("/register", data, { withCredentials: true });
    return response.data;
  }
};

export default loginService;
