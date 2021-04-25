const axios = require('axios');
const UNTAPPD_URI_SEARCH_STUB = process.env.UT_URI_SEARCH_STUB;
const CLIENT_ID = process.env.UT_ID;
const CLIENT_SECRET = process.env.UT_SECRET;
const { ExpressError } = require('../expressError');

async function searchUntappd(query) {
    try {
        const res = await axios.get(`${UNTAPPD_URI_SEARCH_STUB}${query}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
        return destructureUntappdResponse(res.data.response.beers.items);
    } catch {
        throw new ExpressError("Could not connect to Untappd", 500);
    }
    
}

function destructureUntappdResponse(items) {
    const returnArray = [];
    if (!items.length) return returnArray;
    items.forEach(i => {
        const { bid: untappd_id, beer_name: name, beer_abv: abv, beer_description: description } = i.beer;
        const { brewery_name: maker } = i.brewery;
        returnArray.push({name, maker, abv, description, untappd_id})
    });
    return returnArray;

}

module.exports = {
    searchUntappd
}