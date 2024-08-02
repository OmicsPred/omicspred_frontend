import { useEffect } from 'react'

function DocumentTitle(title) {

    let cleaned_title = ''
    const regex = /(<([^>]+)>)/gi;
    if (title) {
        cleaned_title = title.replace(regex, "");
    }
    useEffect(() => {
      document.title = process.env.PROJECT_NAME+' - '+cleaned_title;
    }, [title]);
}
export default DocumentTitle;