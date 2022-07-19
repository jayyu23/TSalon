import mongoose from "mongoose";

const TSalonMessageSchema = mongoose.Schema({
    toName: {
        type: String,
        required: "To Username is required",
    },
    fromName: {
        type: String,
        required: "From Username is required"
    },
    title: {
        type: String,
        default: "Untitled Message"
    },
    body: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        required: "Message date required"
    },
    unread: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model("TSalonMessage", TSalonMessageSchema);