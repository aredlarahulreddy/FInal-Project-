const apiUrl = "https://dolphin-app-y2kky.ondigitalocean.app/";

function getToken() {
    return localStorage.getItem("auth-token") ? true : false;
}

function getAuthToken() {
    return localStorage.getItem("auth-token");
}

function getLoggedInUserName() {
    const username = localStorage.getItem("username");

    if (!username) return "";

    return username
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}


export default {
    getToken,
    getAuthToken,
    getLoggedInUserName,
    apiUrl
}

