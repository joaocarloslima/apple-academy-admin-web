'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.API_BASE_URL || 'http://localhost:8083';

function mapApiErrors(errorsArray: any[]) {
    return errorsArray.reduce((accumulator, currentError) => {
        accumulator[currentError.field] = currentError.message;
        return accumulator;
    }, {});
}

async function getAuthHeader() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet(path: string, useAuth = true) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (useAuth) {
        const authHeader = await getAuthHeader();
        Object.assign(headers, authHeader);
    }

    const response = await fetch(`${API_URL}${path}`, {
        method: 'GET',
        headers,
    });

    let json = await response.json();

    if (!response.ok) {
        const message = json?.message || 'Unknown error';
        throw new Error(`Error getting data: ${message}`);
    }

    return json;
}

export async function apiPost(path: string, data: any, useAuth = true) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (useAuth) {
        const authHeader = await getAuthHeader();
        Object.assign(headers, authHeader);
    }

    console.log(data)

    const response = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
        if (response.status === 400) {
            const errorData = await response.json();
            return Promise.reject(mapApiErrors(errorData));
        }
        if (response.status === 401) {
            return Promise.reject({ message: 'Unauthorized' });
        }
        if (response.status === 403) {
            return Promise.reject({ message: 'Forbidden' });
        }
        const message = json?.message || 'Unknown error';
        throw new Error(`Error sending data: ${message}`);
    }

    return json;
}

export async function apiPut(path: string, data: any, useAuth = true) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (useAuth) {
        const authHeader = await getAuthHeader();
        Object.assign(headers, authHeader);
    }
    const response = await fetch(`${API_URL}${path}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
        if (response.status === 400) {
            const errorData = await response.json();
            return Promise.reject(mapApiErrors(errorData));
        }
        const message = json?.message || 'Unknown error';
        throw new Error(`Error updating data: ${message}`);
    }

    return json
}

export async function apiDelete(path: string, useAuth = true) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (useAuth) {
        const authHeader = await getAuthHeader();
        Object.assign(headers, authHeader);
    }

    const response = await fetch(`${API_URL}${path}`, {
        method: 'DELETE',
        headers,
    });

    if (!response.ok) {
        const json = await response.json();
        const message = json?.message || 'Unknown error';
        throw new Error(`Error deleting data: ${message}`);
    }
}

export async function apiPatch(path: string, data: any, useAuth = true) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (useAuth) {
        const authHeader = await getAuthHeader();
        Object.assign(headers, authHeader);
    }

    const response = await fetch(`${API_URL}${path}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
    });

    const json = await response.json(); 

    if (!response.ok) {
        const message = json?.message || 'Unknown error';
        throw new Error(`Error updating data: ${message}`);
    }

    return json;
}