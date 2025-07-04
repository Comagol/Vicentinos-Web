

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

    
}