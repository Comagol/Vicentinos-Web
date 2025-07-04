

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

    
}