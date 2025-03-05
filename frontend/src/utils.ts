export const fetchRequest = (url: string, method: string, data: any, successMessage: string) => {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(async response => {
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error((await response.json()).message);
                }
                return response.json();
            }
        })
        .then(data => {
            alert(successMessage);
            console.log(data);
        })
        .catch(error => {
            alert(error);
        });
}
export const fetchRequestWithCallback = (url: string, method: string, data: any, successCallback: any, useAuthorization: boolean = false) => {
    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (method !== 'GET') {
        options.body = JSON.stringify(data);
    }
    if (useAuthorization) {
        const token = getToken();
        if (token) {
            options.headers = {
                ...options.headers,
                authorization: `Bearer ${token}`
            };
        }
    }
    fetch(url, options)
        .then(async response => {
            if (!response.ok) {
                throw new Error((await response.json()).message);
            }
            return response.json();
        })
        .then(successCallback)
        .catch(error => {
            alert(error);
            if(error.message === 'Unauthorized' && !window.location.pathname.includes('/signin')) {
                window.location.href = '/signin';
            }
        });
}

// Save access token in local storage
export const saveToken = (token: string) => {
    localStorage.setItem('token', token);
}
// Get access token from local storage
export const getToken = () => {
    return localStorage.getItem('token');
}