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
    };

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
    };

    //Metodo para crear un socio nuevo
    async createMember(req, res) {
        try {
            const member ={firstName, lastName, email, birthDate, DNI, phone, address, city, zipCode} = req.body;
            const members = await MemberController.getAllMembers();
            if (members.some(member => member.DNI === DNI)) {
                return res.status(400).json({ message: "Ya existe un socio con ese DNI"});
            }
            else {
                const newMember = await MemberController.create(member);
                res.status(201).json(newMember);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

}