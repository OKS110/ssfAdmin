import express from 'express';
import * as controller from '../controller/adminController.js';

const router = express.Router();

router
    .post('/login', controller.checkAdminLogin)
    .post('/customers', controller.getCustomerData)
    .post('/products', controller.getProductData)
    .post('/guests', controller.getGuestsData)
    .post('/orders', controller.getOrdersData)
    .post('/ordersG', controller.getOrdersGData);

export default router;