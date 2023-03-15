const axios = require('axios');

const COUNTER_APP_PORT = process.env.COUNTER_APP_PORT || 3001;

class CounterService {
    constructor() {
        this.httpClient = axios.create({
            baseURL: `http://localhost:${COUNTER_APP_PORT}`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async increaseBookViewCount(bookId) {
        try {
            return await this.httpClient.post(`/counter/${bookId}/incr`);
        } catch (error) {
            console.error(error.message);
        }
    }

    async getBookViewCount(bookId) {
        try {
            const response = await this.httpClient.get(`/counter/${bookId}`);
            return response.data;
        } catch (error) {
            console.error(error.message);
        }
    }
}

exports.CounterService = new CounterService();