import ky from 'ky';

const BASE_URL = process.env.API_BASE_URL

export const api = ky.create({
    prefixUrl: BASE_URL,
})
