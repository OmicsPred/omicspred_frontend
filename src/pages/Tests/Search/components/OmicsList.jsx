const OmicsList = (props) =>{
    const omics = props.omics;
    
    const key = props.key_prefix.replace(' ','_');

    return (
        <>
        {
            omics.map((data, index) => {
                let margin_class = ''
                if (index < omics.length-1) {
                    margin_class = ' me-2'
                }
                return (<span key={key+'_'+data} className={'badge badge_'+data+margin_class}>{data}</span>)
            })
        }
        </>
    );
};
export default OmicsList;