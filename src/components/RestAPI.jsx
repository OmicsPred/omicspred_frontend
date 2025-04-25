import { consoleDev } from "./Generic";


export default async function restApiCall(url) {
    // Determine if the URL provided is a suffix or the whole URL
    const rest_url = (url.startsWith('http')) ? url : process.env.REST_API_URL+url;

    try {
        consoleDev('REST API CALL: '+rest_url);
        const res = await fetch(rest_url)
            .then(resp=>{
                return resp.json();
            });
        return res
    } catch(err){
      console.log(err)
      return(err)
    }
}