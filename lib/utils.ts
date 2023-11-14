export async function fetchWrapper(url: string, data: any, method: string, dataType = 'JSON') {
    let options: RequestInit = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: method,
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    let res = await fetch(url, options);
    return res;
}

export function objToJSON(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

// export const fetcher = (...args) => fetch(...args).then(res => res.json());
