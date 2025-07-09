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
    },
    birthDate: {
        type: Date,
        requires: true,
    },
    DNI: {
        type: Number,
        requires: true,
    },
    phone: {
        type: Number,
        requires: true,
    },
    address: {
        type: String,
        requires: true,
    },
    city: {
        type: String,
        requires: true,
    },
    state: {
        type: String,
        requires: false,
    },
    zip: {
        type: Number,
        requires: false,
    },
    country: {
        type: String,
        requires: false,
    },
    memberId: {
        type: String,
        requires: true,
    },
    signUpDate: {
        type: Date,
        requires: true,
    },
    status: {
        type: String,
    }
})

const MemberModel = mongoose.model("members", memberSchema);

export default MemberModel;