// Document created by Daniel Campos at 2025.
// This is a simple task management application using Flask and SQLAlchemy.
// It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
// It also includes a SQLite database for testing purposes.
// Import required libraries

import axios from 'axios';

const API_URL: string | undefined = import.meta.env.VITE_REACT_APP__BASEURL

// GET Service
export async function GetAsync(endpoint: string, params: any | null) {
    try {
        return await axios.get(`${API_URL}${endpoint}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            params: params
        })
            .then((response) => response.data)
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }
}

// POST Service
export async function PostAsync(endpoint: string, params: any | null) {
    try {
        return await axios.post(`${API_URL}${endpoint}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            data: params
        })
            .then((response) => response.data)
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }
}

// PUT Service
export async function PutAsync(endpoint: string, params: any | null) {
    try {
        return await axios.put(`${API_URL}${endpoint}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            data: params
        })
            .then((response) => response.data)
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }
}

// DELETE Service
export async function DeleteAsync(endpoint: string, params: any | null) {
    try {
        return await axios.delete(`${API_URL}${endpoint}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            data: params
        })
            .then((response) => response.data)
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }
}