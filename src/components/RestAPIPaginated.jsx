import { consoleDev } from "./Generic";

const rest_url = process.env.REST_API_URL;

const getData = async (url) => {
    var data = [];
    var next_url = '';
    consoleDev("Retrieving data from API for page : " + url);
    if (url != '') {
    var apiResults = await fetch(url)
        .then(resp=>{
        return resp.json();
    });
    data = apiResults['results'];
    
    if (apiResults['next']) {
        next_url = apiResults['next'];
    }
    }
    return [data, next_url];
}

export default async function restApiCallPaginated(url) {
    const json_format = 'format=json';
    if (!url.startsWith('http')) {
        url = rest_url+url;
    }
    if (!url.includes(json_format)) {
        if (url.includes('?')) {
            url += '&';
        }
        else {
            url += '?';
        }
        url += json_format;
    }
    const [data_results,next_url] = await getData(url);
    consoleDev("Retreiving data from API for page : " + url);
    //console.log(data_results);
    if (next_url) {
        //console.log(">> NEXT: "+next_url);
        return data_results.concat(await restApiCallPaginated(next_url));
    } else {
        return data_results;
    }
};
