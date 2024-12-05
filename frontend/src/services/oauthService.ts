import { generateCodeVerifier, generateCodeChallenge } from "../utils/pkceHelpers";


const REDIRECT_URI = process.env.REACT_APP_LOGIN_REDIRECT_URI;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const AUTH_URL = process.env.REACT_APP_AUTH_URL;
const TOKEN_URL = process.env.REACT_APP_TOKEN_URL;
if (!REDIRECT_URI || !CLIENT_ID || !AUTH_URL || !TOKEN_URL) {
    throw new Error("Missing required environment variables");
}


export const oauthService = {

    async initiateLogin(): Promise<void> {

        //generates a verifier and stores it in localStorage
        const codeVerifier = generateCodeVerifier();
        localStorage.setItem('pkce_code_verifier', codeVerifier)

        const codeChallenge = await generateCodeChallenge(codeVerifier)

        const authUrl = `${AUTH_URL}?` +
                        `response_type=code&` +
                        `client_id=${CLIENT_ID}&` +
                        `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
                        `scope=identify&` +
                        `code_challenge=${codeChallenge}&` +
                        `code_challenge_method=S256`;
        window.location.href = authUrl;
    },

    //******************************************************************
    // Handles the callback after the user has authorized the app
    // Exctracts the authorization code from the url query params,
    //    compares it to the code_verifier in localStorage
    // Sends the code to the backend to exchange it for a token
    //*****************************************************************/
    async handleCallBack(): Promise<void> {
        console.log("HandleCallback Called.")
        //Extracts code from query params when user is redirect back
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code')
        const codeVerifier = localStorage.getItem('pkce_code_verifier')
        if (!code || !codeVerifier) {
            throw new Error("Authorization code or PKCE Verefier missing")
        }

        console.log("Authorization code:", code)
        console.log("PCKE V:", codeVerifier)

        //send exchange req to the backend
        const response = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, codeVerifier }),
        })

        if (!response.ok) {
            throw new Error("Failed to exchange code for token")
        }

        const data = await response.json()
        console.log("Token exchange response:", data);
        if (data.access_token) {
            console.log("Access Token:", data.access_token);
            localStorage.setItem("access_token", data.access_token);
            console.log("Token in storage:", localStorage.getItem('access_token'));
        } else {
            console.error("Access token not found in response:", data);
        }
    }, 

    // Get the access token from local
    getAccessToken(): string | null {
        return localStorage.getItem('access_token')
    }
}