import { v4 as uuidv4 } from 'uuid';
import Contact from '../models/contactModel.js';

class ContactController {
    getAllContacts = async (req, res) => {
        try {
            const contacts = await Contact.find();
            res.status(200).json({ success: true, data: contacts });
        } catch (error) {
            console.error("Error fetching contacts:", error);
            res.status(500).json({ success: false, message: "Failed to fetch contacts." });
        }
    }

    createNewContact = async (req, res, next) => {
        try {
            const contact = new Contact({ id: uuidv4(), ...req.body });
            await contact.save();
            res.status(201).json({ success: true, data: contact });
        } catch (error) {
            console.error("Error creating contact:", error);
            res.status(500).json({ success: false, message: "Failed to create contact." });
        }
    }

    editContact = async (req, res, next) => {
        try {
            const { params: { id } } = req;
            const contact = await Contact.find({ id });
            if (!contact) {
                return next(new Error("Contact not found", 404))
            }
            const updatedContact = await Contact.findByIdAndUpdate(
                contact[0]._id,
                req.body,
                { new: true, useFindAndModify: false }
            );
            if (!updatedContact) {
                return res.status(500).json({ success: false, message: "Failed to update contact." });
            }
            res.status(201).json({ success: true, data: updatedContact });
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to update contact.Catch" });
        }
    }

    deleteContact = async (req, res, next) => {
        try {
            const { params: { id = '' } } = req;
            const contact = await Contact.findOne({ id });
            if (!contact) {
                return next(new Error("Contact not found", 404))
            }
            await Contact.findByIdAndDelete(contact._id);
            res.status(200).json({ success: true, message: "Contact deleted successfully" });
        } catch (error) {
            res.status(501).json({ success: true, message: "Failed to delete contact." });
        }
    }
}

export default new ContactController();