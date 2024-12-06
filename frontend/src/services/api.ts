const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiService = {

    async getUserData(): Promise<any> {
        // get access_token from local
        const accessToken = localStorage.getItem('access_token')
        if (!accessToken) {
            throw new Error("No access token found")
        }

        const response = await fetch(`${API_BASE_URL}/auth/user?access_token=${accessToken}`, {
            headers: { Authorization: `Bearer ${accessToken}`},
        })
        if (!response.ok) {
            throw new Error("Failed to fetch user data")
        }

        return await response.json()
    }
}