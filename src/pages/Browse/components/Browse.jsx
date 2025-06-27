import restApiCall from '../../../components/RestAPI';
import { BrowseTitle } from '../../../components/Common';


export const fetch_count_data = async (type) => {
    const data = await restApiCall('info');
    return data.data_count[type];
}

export const browse_title = (count, type, title, label) => {
    const full_title = 'Browse '+title
    if (label) {
        return count ? <BrowseTitle type={type} label={label} count={count} title={full_title}/> : <BrowseTitle type={type} label={label} title={full_title}/>
    }
    else {
        return count ? <BrowseTitle type={type} count={count} title={full_title}/> : <BrowseTitle type={type}  title={full_title}/>
    }
}