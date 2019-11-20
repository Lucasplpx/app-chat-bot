const { create } = require('axios');

const { REACT_APP_API } = process.env;


const api = create({
    baseURL: REACT_APP_API
});

module.exports = api;