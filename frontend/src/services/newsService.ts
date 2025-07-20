import api from "./api";

//Tipos para las noticias
export interface NewsItem {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    content: string;
}

//Servicio para obtener las noticias
export const newsService = {
    getAllNews: async (): Promise<NewsItem[]> => {
        try {
            const response = await api.get('/news');
            return response.data.news;
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
        }
    },

    //obtener una noticia por su id
    getNewById: async (id: number): Promise<NewsItem> => {
        try {
            const response = await api.get(`/news/${id}`);
            return response.data.news;
        } catch (error) {
            console.error('error fetching news by id:', error);
            throw error;
        }
    },

    //Crear una nueva noticia
    createNews: async (newsData: Omit<NewsItem, 'id'>): Promise<NewsItem> => {
        try {
            const response = await api.post('/news', newsData);
            return response.data.news;
        } catch (error) {
            console.error('Error creating news', error);
            throw error;
        }
    },

    // Actualizar una noticia
    update: async (id: number, newsData: Partial<NewsItem>): Promise<NewsItem> => {
        try {
        const response = await api.put(`/news/${id}`, newsData);
        return response.data.news;
        } catch (error) {
        console.error(`Error updating news with id ${id}:`, error);
        throw error;
        }
    },

    //Eliminar una noticia
    delete: async (id:number): Promise<void> => {
        try {
            await api.delete(`/news/${id}`);
        } catch (error) {
            console.error(`Error deleting news with id ${id}:`, error);
            throw error;
        }
    },
};

export default newsService;