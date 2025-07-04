

class NewsController {
    constructor() {
        this.news = [];
    }

    //MEtodo para obtener todas las noticias
    async getAllNews(req, res) {
        try {
            const news = await NewsController.find();
            res.status(200).json({ message: "Noticias obtenidas correctamente", news});
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    };

    //Metodo para obtener una noticia por Id
    async getNewById(req, res) {
        try {
            const {id} = req.params;
            const info = await NewsController.findById(id); 
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
            const news = await NewsController.find();
            if (news.some(news => news.title === title)) {
                return res.status(400).json({ message: "Ya existe una noticia con ese titulo"});
            }
            else {
                const newNews = await NewsController.create(news);
                res.status(201).json(newNews);
            }
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    };

}