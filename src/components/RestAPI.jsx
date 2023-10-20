
export default async function restApiCall(url_suffix) {
    let rest_url = process.env.OMICSPRED_REST_API_URL+url_suffix;
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