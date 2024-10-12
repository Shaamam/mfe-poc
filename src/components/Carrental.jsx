import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import axios from 'axios';

const Carrental = () => {

    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/getcars')
            .then(response => {
                console.log(cars)
                setCars(response.data[0]);
            })
            .catch(error => {
                console.error('There was an error fetching the car data!', error);
            })
            .catch(error => {
                console.error('There was an error fetching the car data!', error);
                setError(error);
            });
    }, []);

    return (
        <div className="card flex justify-content-center" data-testid="Carrental-Card">
             {error ? (
                <Card title="Car Rental Details" className="md:w-25rem" data-testid="Carrental-error-Card">
                    <p>Error fetching data: {error.message}</p>
                </Card>
            ) : (
            <Card title="Car Rental Details" className="md:w-25rem">
                <div className="p-card-content">
                    <p><strong>Car ID:</strong> {cars.carId}</p>
                    <p><strong>Car Model:</strong> {cars.carModel}</p>
                    <p><strong>Car Number:</strong> {cars.carNo}</p>
                    <p><strong>Status:</strong> {cars.status}</p>
                </div>
            </Card>)}
        </div>
    );
};

export default Carrental;
