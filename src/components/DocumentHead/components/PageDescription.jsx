
const project_name = process.env.PROJECT_NAME
const default_page_description = project_name + ' is an atlas of genetic scores for prediction of multi-omics data.'

const pages_desc = {
    'About': 'About '+project_name,
    'Browse Datasets': 'Browse all the datasets in '+project_name,
    'Browse Genetic Scores': 'Browse all the genetic scores in '+project_name,
    'Browse Pathways': 'Browse all the Reactome pathways in '+project_name,
    'Browse Platforms': 'Browse all the platforms in '+project_name,
    'Browse Publications': 'Browse all the publications in '+project_name,
    'Browse Tissues': 'Browse all the tissues in '+project_name,
    'Cohorts': 'List all the cohorts in '+project_name,
    'Data Description': 'Description of the '+project_name+' data structure',
    'Downloads': 'List the data files available by dataset, including link to the REST API documentation',
    'FAQs': 'Frequently asked questions (FAQ) about the '+project_name+' resource',
    'PheWAS - Summary': 'Browse all the PheWAS summary data in '+project_name,
    'PheWAS - All Associations': 'Browse all PheWAS associations in '+project_name,
};
const pages = Object.keys(pages_desc);
console.log("PAGES:")
console.log(pages)


export function PageDescription(page) {
    console.log(">> PAGE: "+page);
    if (pages.includes(page)) {
        console.log("OK: "+pages_desc[page])
        return pages_desc[page];
    }
    else {
        return default_page_description;
    }
}