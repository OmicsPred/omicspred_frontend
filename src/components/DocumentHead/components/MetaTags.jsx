import { Helmet } from 'react-helmet';

const MetaTags = (props) => {

  const title = props.title ? props.title : process.env.PROJECT_NAME;
  const description = props.description ? props.description : '';

  return (
        <Helmet>
            { /* Standard metadata tags */ }
            <title>{title}</title>
            <link rel='canonical' href={ window.location.href } />
            <meta charset="UTF-8" />
            <meta name="keywords" content="genetic score, omics, multi-omics, proteomics, metabololomics, transcriptomics, prediction, genomic, phenotype" />
            <meta name='description' content={description} />
            <meta name="author" content={process.env.PROJECT_NAME} />
            <meta name="HandheldFriendly" content="true" />
            <meta name="MobileOptimized" content="width" />
            <meta name="viewport" content="initial-scale=1"/>
            <meta name="theme-color" content="#1D65A6" />
            { /* Open Graph tags (OG) */ }
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
        </Helmet>
  );
}
export default MetaTags;
