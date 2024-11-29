import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({to:userId}).populate({
            "path": "from",
            select: "username profileImg"
        })

        await Notification.updateMany({to:userId}, {read:true})

        res.status(200).json(notifications)
    } catch (error) {
        console.log("error in getNotifications controller:", error);
        res.status(500).json({ error: "internal server error" });
    }
}

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

    await Notification.deleteMany({to: userId})

    res.status(200).json({message: "notifications deleted successfully"})
    } catch (error) {
        console.log("error in deleteNotifications controller:", error);
        res.status(500).json({ error: "internal server error" });
    }   
}

export const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user._id;
        const notification = await Notification.findById(notificationId);

        if(!notification) {
            return res.status(404).json({error: "notification not found"})
        }

        if(notification.to.toString() !== userId.toString()) {
            return res.status(403).json({error: "you are not allowed to delete this notification"})
        }

        await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({message: "notification deleted successfully"})
    } catch (error) {
        console.log("error in deleteNotification controller:", error);
        res.status(500).json({ error: "internal server error" });
    }   
}