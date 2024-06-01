const authBaseURL = "http://127.0.0.1:9000"
const resourceBaseURL = "http://localhost:9090"
const authorLink = `${authBaseURL}/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=http://localhost:5173/authorized`
const clientId = 'client';
const clientSecret = 'secret';
const redirectUri = 'http://localhost:5173/authorized';
const tokenEndpoint = 'http://localhost:9000/oauth2/token';

export {resourceBaseURL, authBaseURL, authorLink, clientId, clientSecret, tokenEndpoint, redirectUri};
export function getAccessToken() {
    return window.localStorage.getItem('access_token')
}
export function getRefreshToken() {
    return window.localStorage.getItem('refresh_token')
}