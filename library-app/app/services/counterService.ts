import { AxiosInstance } from "axios";

const axios = require('axios');
const COUNTER_APP_PORT = process.env.COUNTER_APP_PORT || 3001;

class CounterService {
    httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: `http://localhost:${COUNTER_APP_PORT}`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async increaseBookViewCount(bookId: string) {
        try {
            return await this.httpClient.post(`/counter/${bookId}/incr`);
        } catch (error) {
            console.error(error);
        }
    }

    async getBookViewCount(bookId: string) {
        try {
            const response = await this.httpClient.get(`/counter/${bookId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new CounterService();