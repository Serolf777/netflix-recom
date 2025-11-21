export function expireTime() {
    const now = new Date();
    now.setDate(now.getDate() +1);

    return now.toString();
}

export function getCookies() {
    const cookies = document.cookie.split("; ");
    const cookieMap: Record<string, string> = {};
    cookies.forEach(cookie => {
        const [name, value] = cookie.split("=");
        cookieMap[name] = value;
    });

    return cookieMap;
}