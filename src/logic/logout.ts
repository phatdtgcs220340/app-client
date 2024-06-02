export function logout() {
    window.localStorage.clear();
    window.location.assign("/login")
}