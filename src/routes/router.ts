import * as express from 'express';
import {controller} from '../controllers/controllers'
import auth from '../middlewares/user.middleware';

const Router = express.Router();


export default Router

    .post('/token', controller.token)
    .get('/users', auth, controller.getUsers)
    .post('/register', controller.register)
    .post('/login', controller.login)
    .put('/user/:id', auth, controller.updateUser)
    .delete('/user/:id', controller.deleteUser)

    .get('/products', controller.getProducts)
    .post('/products', controller.addProduct)
    .put('/products/:id', controller.changeProduct)
    .delete('/products/:id', controller.deleteProduct)