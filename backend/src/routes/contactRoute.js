import Router from 'express';
import ContactController from '../controller/ContactController.js';

const contactRoute = Router();

contactRoute.get('/contacts', ContactController.getAllContacts)
contactRoute.post('/contacts', ContactController.createNewContact)
contactRoute.put('/contact/:id', ContactController.editContact)
contactRoute.delete('/contact/:id', ContactController.deleteContact)



export default contactRoute;