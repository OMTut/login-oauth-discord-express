import { randomBytes, createHash } from 'crypto';

//*******************************************************
// imports randomBytes and createHash from the crypto module
// generates a random 32-byte array, converts it to a base64 string.
//      the repace makes sure it's URL-safe */
//**************************************************** */
export function generateCodeVerifier(): string {
    const array = randomBytes(32);
    return array.toString('base64')
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

//********************************************************
// Creates a SHA-256 hash of the verifier and converts it to a base64 string
// replace makes sure it's URL-safe
//***************************************************** */
export function generateCodeChallenge(verifier: string): string {
    const hash = createHash('sha256').update(verifier).digest('base64');
    return hash
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}