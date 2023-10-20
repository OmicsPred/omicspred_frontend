
export default async function restApiCallWithData(rest_url,data) {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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