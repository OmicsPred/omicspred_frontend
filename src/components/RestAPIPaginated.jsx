
const getData = async (url) => {
    var data = [];
    var next_url = '';
    console.log("Retrieving data from API for page : " + url);
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
    if (!url.includes('format=json')) {
        if (url.includes('?')) {
            url += '&';
        }
        else {
            url += '/';
        }
        url += 'format=json';
    }
    const [data_results,next_url] = await getData(url);
    console.log("Retreiving data from API for page : " + url);
    //console.log(data_results);
    if (next_url) {
        //console.log(">> NEXT: "+next_url);
        return data_results.concat(await restApiCallPaginated(next_url));
    } else {
        return data_results;
    }
};
