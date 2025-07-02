class MemberController {
    constructor() {
        this.members = [];
    }

    async getAllMembers(req, res) {
        try {
            const members = await MemberController.find();
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}