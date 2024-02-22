export const HEADERS_CONTENT_TYPE_VALUE = 'application/json';
export const HEADERS_AUTHORIZATION_VALUE = (token) => {
    return `Bearer ${token}`
}