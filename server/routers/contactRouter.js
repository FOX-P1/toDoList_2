const express = require("express");
const { auth } = require("../middleware/auth");
const { Contact } = require("../models/Contact");

const contactRouter = express.Router();

contactRouter.get("/", auth, async (req, res) => {
    const userId = req.user._id;
    try {
        const contacts = await Contact.find({ userId });
        if (!contacts) {
            return res.status(404).json({
                success: false,
            });
        }
        return res.status(200).json({
            success: true,
            contacts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "DB Server에 접속할 수 없습니다.",
        });
    }
});

contactRouter.post("/", auth, async (req, res) => {
    const userId = req.user._id;
    const { phoneNumber, name } = req.body;
    try {
        const contact = await Contact.create({
            name,
            phoneNumber,
            userId,
        });
        return res.status(200).json({
            success: true,
            contact,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "업로드에 실패하였습니다.",
        });
    }
});

contactRouter.patch("/:id([0-9a-f]{24})", auth, async (req, res) => {
    try {
        const id = req.params.id;
        const { phoneNumber, name } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            id,
            {
                name,
                phoneNumber,
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            contact,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
        });
    }
});

contactRouter.delete("/:id([0-9a-f]{24})", auth, async (req, res) => {
    const id = req.params.id;
    try {
        const contact = await Contact.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            contact,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
        });
    }
});

module.exports = contactRouter;
