import NewsModel from "../models/newsModels.js";

class NewsController {
    constructor() {
        this.news = [];
    }

    //MEtodo para obtener todas las noticias
    async getAllNews(req, res) {
        try {
            const news = await NewsModel.find();
            res.status(200).json({ message: "Noticias obtenidas correctamente", news});
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    };

    //Metodo para obtener una noticia por Id
    async getNewById(req, res) {
        try {
            const {id} = req.params;
            const info = await NewsModel.findById(id); 
            if (!info) {
                return res.status(404).json({ message: "Noticia no encontrada"});
            }
            res.status(200).json({ message: "Noticia obtenida correctamente", info});
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    };

    //Metodo para crear una noticia
    async createNews(req, res) {
        try {
            const {title, content, date, image} = req.body;
            const news = await NewsModel.find();
            if (news.some(news => news.title === title)) {
                return res.status(400).json({ message: "Ya existe una noticia con ese titulo"});
            }
            else {
                const newNews = await NewsModel.create({ title, content, date, image });
                res.status(201).json(newNews);
            }
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    };

    //Metodo para actualizar una noticia
    async updateNews(req, res) {
        try {
            const {id} = req.params;
            const {title, content, date, image} = req.body;
            const news = await NewsModel.findById(id);
            if (!news) {
                return res.status(404).json ({ message: "Noticia no encontrada"});
            }
            else {
                const updateNews = await NewsModel.update(id, news);
                res.status(200).json(updateNews);
            }
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    };

    //Metodo para eliminar una noticia
    async deleteNew(req, res) {
        try {
            const {id} = req.params;
            const news = await NewsModel.findById(id);
            if (!news) {
                return res.status(404).json({ message: "Noticia no encontrada"});
            }
            else {
                await NewsModel.delete(id);
                res.status(200).json({ message: "Noticia eliminada correctamente"});
            }
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    };
}

export default new NewsController();