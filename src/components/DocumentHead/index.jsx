import { useEffect, useState } from 'react'
import MetaTags from './components/MetaTags';
import { PageDescription } from './components/PageDescription';

const DocumentHead = (props) => {
    const [pageTitle, setPageTitle] = useState('')
    const [pageDesc, setPageDesc] = useState('')

    const get_title = () => {
        // Page title
        const regex = /(<([^>]+)>)/gi;
        let cleaned_title = undefined;
        if (props.title) {
            cleaned_title = process.env.PROJECT_NAME+' - '+props.title.replace(regex, "");
        }
        setPageTitle(cleaned_title)
    }

    const get_page_desc = () => {
        // Page description
        let page_desc = undefined;
        if (props.description) {
            page_desc = props.description;
        }
        else {
            // Build standard description
            if (props.standard_desc) {
                page_desc = 'Display data for '+pageTitle;
            }
            // Fetch specific description
            else {
                page_desc = PageDescription(props.title);
            }
        }
        setPageDesc(page_desc);
    }

    useEffect(() => {
        get_title();
        get_page_desc();
    },[pageTitle]);

    return (
        <>
            { pageTitle && pageTitle != '' && pageDesc && pageDesc != '' ? <MetaTags title={pageTitle} description={pageDesc}/> : '' }
        </>
    )
}
export default DocumentHead;