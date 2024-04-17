
export default async function restApiCall(url) {

    // Determine if the URL provided is a suffix or the whole URL
    const rest_url = (url.startsWith('http')) ? url : process.env.OMICSPRED_REST_API_URL+url;

    try{
        console.log('REST CALL: '+rest_url);
        const res = await fetch(rest_url)
            .then(resp=>{
                return resp.json();
            });
        // console.log(res);
        return res
    } catch(err){
      console.log(err)
      return(err)
    }
}