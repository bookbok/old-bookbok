export const DOMAIN =
    process.env.NODE_ENV === 'production' // eslint-disable-line
        ? 'https://bookbok.herokuapp.com'
        : 'http://localhost:8000';
