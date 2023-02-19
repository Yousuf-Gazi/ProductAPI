const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, './customers.json');

const getCustomers = () => {
    const rawData = fs.readFileSync(DATA_FILE);
    const customers = JSON.parse(rawData);
    return Array.isArray(customers) ? customers : [];
};

const getCustomerById = (customerId) => {
    const customers = getCustomers();
    return customers.find(customer => customer.id === customerId);
};

const addCustomer = (customer) => {
    const customers = getCustomers();
    customer.id = `CUS-${Math.random().toString(36).substr(2, 10)}`;
    customers.push(customer);
    fs.writeFileSync(DATA_FILE, JSON.stringify(customers, null, 2));
    return customer;
};

const updateCustomer = (customerId, customerData) => {
    const customers = getCustomers();
    const customerIndex = customers.findIndex(customer => customer.id === customerId);
    if (customerIndex === -1) {
        return null;
    }
    customers[customerIndex] = {
        ...customers[customerIndex],
        ...customerData
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(customers, null, 2));
    return customers[customerIndex];
};

const deleteCustomer = (customerId) => {
    const customers = getCustomers();
    const newCustomers = customers.filter(customer => customer.id !== customerId);
    if (newCustomers.length === customers.length) {
        return null;
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(newCustomers, null, 2));
    return customerId;
};

module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer,
};