export const PATH = 'http://192.168.38.119:3000'

export function getRequest(duongdan, hanhdong) {
    return fetch(duongdan)
    .then(response => response.json()).then(res => {
        hanhdong(res)
    })
}

export function postRequest(duongdan, hanhdong, body) {
    return fetch(duongdan, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(response => response.json()).then(res => {
        hanhdong(res)
    });
}