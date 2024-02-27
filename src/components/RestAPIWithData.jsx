
export default async function restApiCallWithData(rest_url,data,credentials) {
    let call_headers = {'Content-Type': 'application/json'};
    if (credentials) {
      call_headers['Authorization'] = credentials;
    }
    const options = {
        method: 'POST',
        headers: call_headers,
        body: JSON.stringify(data)
      };
    try{
        console.log('REST CALL: '+rest_url);
        const res = await fetch(rest_url, options)
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