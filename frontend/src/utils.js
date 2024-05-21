export function wrappedFetch(url, method, body) {
    return fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json'
        },
        referrerPolicy: "no-referrer",
        body
    })
};
