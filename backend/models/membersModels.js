import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        requires: true,
    },
    lastName: {
        type: String,
        requires: true,
    },
    email: {
        type: String,
        requires: true,
    }
})

const MemberModel = mongoose.model("members", memberSchema);

export default MemberModel;