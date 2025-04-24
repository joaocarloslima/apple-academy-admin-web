const API_URL = process.env.API_BASE_URL || 'http://localhost:8080'

export const api = {
    path: "",
    setPath: (path: string) => {
        api.path = path
    },
    get: async (path: string) => {
        const response = await fetch(`${API_URL}${api.path}${path}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`)
        }
        return response.json()
    },
    post: async (path: string, data: any) => {
        const response = await fetch(`${API_URL}${api.path}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error(`Error posting data: ${response.statusText}`)
        }
        return response.json()
    }
        
    
}