//*******************************************************
// imports randomBytes and createHash from the crypto module
// generates a random 32-byte array, converts it to a base64 string.
//      the repace makes sure it's URL-safe */
//**************************************************** */
export function generateCodeVerifier(): string {
    const array = new Uint8Array(32)
    window.crypto.getRandomValues(array)
    return btoa(String.fromCharCode(...array))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

//********************************************************
// Creates a SHA-256 hash of the verifier and converts it to a base64 string
// replace makes sure it's URL-safe
//***************************************************** */
export async function generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier)
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashBase64 = btoa(String.fromCharCode(...hashArray))
    return hashBase64
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}