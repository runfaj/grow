/*  since we're just doing the concept of all nodejs server running from
    localhost:3000, we're just hardcoding that here. Normally would have
    a separate interface somewhere
*/

const serverRoot = "http://localhost:3000";

export default class APIHelper {
    /**
        Gets a json response from a url.
        returns: Promise
    **/
    static getJson(url="") {
        if(!url) return;
        if(url[0] !== '/') url = "/" + url;

        let headers = {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        };

        return fetch(serverRoot + url, {
                method: 'GET',
                headers
            })
            .then(response=>response.json());
    }
}
