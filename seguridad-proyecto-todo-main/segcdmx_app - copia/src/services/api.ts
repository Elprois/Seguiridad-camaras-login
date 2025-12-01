const API_URL = 'http://10.3.1.59:3000'; // Connect to the Node.js backend

const request = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_URL}/${endpoint}`;
    console.log('Requesting URL:', url);
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Handle responses with no content
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return await response.json();
        }
        return; // Return undefined for non-JSON responses
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const api = {
    get: <T>(endpoint: string): Promise<T> => request(endpoint),
    post: <T>(endpoint: string, body: any): Promise<T> => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(endpoint: string, body: any): Promise<T> => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(endpoint: string): Promise<T> => request(endpoint, { method: 'DELETE' }),
};
