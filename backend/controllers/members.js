class MemberController {
    constructor() {
        this.members = [];
    }

    //Metodo para obtener todos los socios
    async getAllMembers(req, res) {
        try {
            const members = await MemberController.find();
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //Metodo para obtener un socio por id
    async getMemberById(req, res) {
        try {
            const {id} =req.params;
            const member = await MemberController.findById(id);
            if (!member) {
                return res.status(404).json({ message: "Socio no encontrado"});
            }
            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}