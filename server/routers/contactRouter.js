const express = require("express");
const { auth } = require("../middleware/auth");
const { Contact } = require("../models/Contact");

const contactRouter = express.Router();

contactRouter.get("/", auth, async (req, res) => {
    const userId = req.user._id;
    const contacts = await Contact.find({ userId });
    if (!contacts) {
        return res.status(404).json({
            success: false,
        });
    }
    return res.status(200).json({
        success: true,
        contacts: contacts,
    });
});

contactRouter.post("/", auth, async (req, res) => {
    const { _id } = req.user;
    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            userId: req.user._id,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "업로드에 실패하였습니다.",
        });
    }
    return res.status(200).json({
        success: true,
    });
});

contactRouter.patch("/:id([0-9a-f]{24})", auth, async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findByIdAndUpdate(id, {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
    });
    if (!name && !phoneNumber) {
        return res.status(400).json({
            success: false,
        });
    }
    return res.status(200).json({
        success: true,
        contact: contact,
    });
});

contactRouter.delete("/:id([0-9a-f]{24})", auth, async (req, res) => {
    let contact;
    const id = req.params.id;

    contact = await Contact.findByIdAndDelete(id);

    if (!contact)
        return res.status(400).json({
            success: false,
        });
    return res.status(200).json({
        success: true,
        contact: contact,
    });
});

module.exports = contactRouter;
