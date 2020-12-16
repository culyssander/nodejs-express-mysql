const conn = require('./db');
const mysql = require('./db');

const Customer = (customer) => {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
}

Customer.create = (newCustomer, result) => {
    const sql = 'INSERT INTO customers SET ?';

    mysql.query(sql, newCustomer, (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }

        console.log('Created customer: ', {id: res.insertId, ...newCustomer});
        return (null, {id: res.insertId, ...newCustomer});
    });
}

Customer.findById = (customerId, result) => {
    const sql = `SELECT * FROM customers WHERE id = ${customerId}`;

    mysql.query(sql, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if(res.length) {
            console.log('found customer: ', res[0]);
            result(null, res[0]);
            return;
        }

        return({kind: 'not_found'}, null);
    });
}

Customer.getAll = result => {
    const sql = 'SELECT * FROM customers';
    conn.query(sql, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        console.log('customers: ', res);
        result(null, res);
    });
}

Customer.updateById = (id, customer, result) => {
    const sql = 'UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?';
}