const express = require('express');
const router = express.Router();
const fs = require('fs');

const {
    getCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer,
} = require('./customerService');

router.get('/', (req, res) => {
    const customers = getCustomers();
    res.json(customers);
});

router.get('/:id', (req, res) => {
    const customerId = req.params.id;
    const customer = getCustomerById(customerId);
    if (customer) {
        res.json(customer);
    } else {
        res.status(404).json({ message: `Customer with ID ${customerId} not found` });
    }
});

router.post('/', (req, res) => {
    const customer = req.body;
    const newCustomer = addCustomer(customer);
    res.status(201).json(newCustomer);
});

router.put('/:id', (req, res) => {
    const customerId = req.params.id;
    const customerData = req.body;
    const updatedCustomer = updateCustomer(customerId, customerData);
    if (updatedCustomer) {
        res.json(updatedCustomer);
    } else {
        res.status(404).json({ message: `Customer with ID ${customerId} not found` });
    }
});

router.delete('/:id', (req, res) => {
    const customerId = req.params.id;
    const deletedCustomerId = deleteCustomer(customerId);
    if (deletedCustomerId) {
        res.json({ message: `Customer with ID ${customerId} deleted` });
    } else {
        res.status(404).json({ message: `Customer with ID ${customerId} not found` });
    }
});

module.exports = router;
