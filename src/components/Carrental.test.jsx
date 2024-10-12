import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Carrental from './Carrental';

jest.mock('axios');

describe('CarDetailsCard Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the component structure correctly', () => {
        const carData = {
            carId: '1',
            carModel: 'Ford Mustang',
            carNo: 'XYZ 123',
            status: 'Available'
        };

        axios.get.mockResolvedValueOnce({ data: [carData] });

        render(<Carrental />);
        expect(screen.getByTestId('Carrental-Card')).toBeInTheDocument();
    });

    test('displays car details on successful fetch', async () => {
        const carData = {
            carId: '1',
            carModel: 'Ford Mustang',
            carNo: 'XYZ 123',
            status: 'Available'
        };

        axios.get.mockResolvedValueOnce({ data: [carData] });

        render(<Carrental />);

        await waitFor(() => {
            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('Ford Mustang')).toBeInTheDocument();
            expect(screen.getByText('XYZ 123')).toBeInTheDocument();
            expect(screen.getByText('Available')).toBeInTheDocument();
        });
    });
});
