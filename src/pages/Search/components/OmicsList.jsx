import { omicspred_omics_type } from '../../../components/Common';

const OmicsList = (props) =>{

    const omics = props.omics;
    
    const key = props.key_prefix.replace(' ','_');

    return (
        <>
        {
            omics.map((data, index) => {
                let separator = ''
                if (index < omics.length-1) {
                    separator = <span className='search_separator_2'>/</span>
                }
                return (<span key={key+'_'+data}>{omicspred_omics_type(data)}{separator}</span>)
            })
        }
        </>
    );
};
export default OmicsList;