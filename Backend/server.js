const express = require('express');
const bodyParser = require('body-parser');
const db = require('./Database/db.js');

const app = express();

// Middleware
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// ===== Patient Routes ===== //

// Add a new patient record
app.post('/patients', (req, res) => {
    const { patient_name, mobile_no, gender, disease, total_amount, address } = req.body;

    if (!patient_name || !mobile_no || !gender || !disease || !total_amount || !address) {
        return res.status(400).send('All fields are required.');
    }

    const query = `
        INSERT INTO patient_records 
        (patient_name, mobile_no, gender, disease, total_amount, address) 
        VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
        query,
        [patient_name, mobile_no, gender, disease, total_amount, address],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding patient record.');
            }
            res.status(201).send({ message: 'Patient record added successfully', id: results.insertId });
        }
    );
});

// Get all patient records
app.get('/patients', (req, res) => {
    const query = 'SELECT * FROM patient_records';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving patient records.');
        }
        res.status(200).json(results);
    });
});

// ===== Appointment Routes ===== //

// Add a new appointment
app.post('/appointments', (req, res) => {
    const { patient_name, doctor_name, appointment_date } = req.body;


    console.log('Appointment');
    if (!patient_name || !doctor_name || !appointment_date) {
        return res.status(400).send('All fields are required.');
    }

    const query = `
        INSERT INTO appointments 
        (patient_name, doctor_name, appointment_date) 
        VALUES (?, ?, ?)`;

    db.query(
        query,
        [patient_name, doctor_name, appointment_date],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding appointment.');
            }
            res.status(201).send({ message: 'Appointment added successfully', id: results.insertId });
        }
    );
});

// Get all appointments
app.get('/appointments', (req, res) => {
    const query = 'SELECT * FROM appointments';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving appointments.');
        }
        res.status(200).json(results);
    });
});

// ===== Start the Server ===== //
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
