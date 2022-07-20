import tsalonmessageModel from "../models/tsalonmessage.model.js";

const reviewMessage = "Congratulations! Your draft has successfully been submitted for review. When enough peer Salonites have voted for your work, your writing will be published publically as a TBook."

const sendMessage = (req, res, next) => {
    let toName = req.toName;
    let fromName = req.fromName;
    let title = req.title;
    let body = req.body;
    let date = req.date || new Date();
    logMessage(toName, fromName, title, body, date).then((result) => {
        if (result) {
            res.status(200).json({ "success": true, "message": result })
        } else {
            res.status(400).json({ "success": false });
        }
    })

}

const logMessage = async (toName, fromName, title, body, date) => {
    try {
        let newMessage = await tsalonmessageModel.create({ toName: toName, fromName: fromName, title: title, body: body, date: date });
        return newMessage;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getMessages = (req, res, next) => {
    let user = req.username;
    tsalonmessageModel.find({ toName: user }).sort({ date: -1 }).exec().then((acc) => {
        res.status(200).json({ "success": true, "messages": acc })
    }, (rej) => {
        res.status(400).json({ "success": false, "error": rej })
    })
}

export default { sendMessage, logMessage, getMessages, reviewMessage }