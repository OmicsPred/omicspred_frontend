import { PageTitleSimple, TableOfContent } from '../../components/Common';
import Container from "./components/Container";
import Href from "../../components/Href"

import p1 from "/src/assets/cohorts/INTERVAL.png";
import p2 from "/src/assets/cohorts/FENLAND.png";
import p3 from "/src/assets/cohorts/ORCADES.png";
import p4 from "/src/assets/cohorts/UKB.png";
import p5 from "/src/assets/cohorts/VIKING.png";
import p6 from "/src/assets/cohorts/GTEXV8.png";


const cohorts_list = [
  {
    "src": p6,
    "title": "Adult GTEx V8 Study",
    "labels": ["GTExV8"],
    "href": "https://www.science.org/doi/10.1126/science.aaz1776",
    "desc": <>The Genotype-Tissue Expression (GTEx) project characterizes genetic effects on the transcriptome across human tissues and links these regulatory mechanisms to trait and disease associations. The data of the GTEx version 8 is composed of 15,201 RNA-sequencing samples from 49 tissues of 838 postmortem donors. The characterization of the genetic associations for gene expression and splicing in cis and trans shows that regulatory associations are found for almost all genes. It also describes the underlying molecular mechanisms and their contribution to allelic heterogeneity and pleiotropy of complex traits. The large diversity of tissues provides insights into the tissue specificity of genetic effects and shows that cell type composition is a key factor in understanding gene regulatory mechanisms in human tissues.</>
  },
  {
    "src": p2,
    "title": "Fenland Study",
    "labels": ["FENLAND"],
    "href": "https://www.mrc-epid.cam.ac.uk/research/studies/fenland/",
    "desc": <>A population-based cohort of about 12,000 participants of Caucasian-ancestry born between 1950 and 1975 who underwent detailed phenotyping at the baseline visit from 2005 to 2015. Participants were recruited from general practice surgeries in the Cambridgeshire region in the UK. The study aims to investigate the interaction between environmental and genetic factors in determining obesity, type 2 diabetes, and related metabolic disorders. These conditions are a considerable public health concern, but their causes and factors that predict who will be affected by them are not completely understood.</>
  },
   {
    "src": p1,
    "title": "INTERVAL Study",
    "labels": ["INTERVAL","INTERVAL withheld subset"],
    "href": "https://www.intervalstudy.org.uk/",
    "desc": <>A cohort of healthy blood donors (N~50,000; recruited 2012-2014) which was set up by the Universities of Cambridge and Oxford in collaboration with NHS Blood and Transplant (NHSBT). INTERVAL’s design is a randomised trial to study the safety of varying the time interval between blood donations. INTERVAL participants include approx. 25,000 men and 25,000 women, recruited at aged 18 years and older (median 44 years of age) across 25 NSHBT blood donation centres across England. Methods of collection have been <Href text="described previously" href="http://www.intervalstudy.org.uk/files/2019/11/Moore-et-al.-Trials-2014.pdf" />. As described here, blood samples have been extensively profiled using various omics technologies.</>
  },
  {
    "title": "Jackson Heart Study",
    "labels": ["JHS"],
    "href": "https://www.jacksonheartstudy.org/",
    "desc": <>A community-based longitudinal cohort study begun in 2000 of 5,306 self-identified Black individuals, aged between 21 and 93 years, from the Jackson, Mississippi, metropolitan statistical area. Two follow-up clinical visits were conducted between 2005 and 2008 and between 2009 and 2012. The study aims to examine environmental and genetic factors associated with cardiovascular disease among African Americans. The JHS study was approved by Jackson State University, Tougaloo College, and the University of Mississippi Medical Center Institutional Review Boards, and all participants provided written informed consent.</>
  },
  {
    "title": "Multi-Ethnic Cohort",
    "labels": ["MEC"],
    "href": "https://blog.nus.edu.sg/sphs/",
    "desc": <>
      A prospective cohort of 49,700 community-dwelling Singapore citizens and Permanent Residents, 21 years old and older and of Chinese, Malay or Indian ethnicity. The study aims to discover how lifestyle factors, physiological factors, genetic factors and their interactions impact the development of common health conditions in Singapore. The baseline recruitment was completed between 2004 and 2010. Between 2011 and 2016, the participants were invited for a follow-up. At both baseline and revisit, participants completed an interview-administered questionnaire and clinical examination. The questionnaires collected demographic information, detailed lifestyle behaviors, personal and family medical histories, and medication usage. At the health examination, anthropometric measures, blood pressures, and blood was taken for lipid and glycemic biomarker measurements. Informed consent was obtained from all participants. All human biological samples were collected in accordance with ethical regulations and protocols.
      <br/>
      The different ethnicities in the study are: Chinese (<span className='fw-bold'>CN</span>), Malay (<span className='fw-bold'>MA</span>) and Indian (<span className='fw-bold'>IN</span>).
    </>
  },
  {
    "title": "Multi-Ethnic Study of Atherosclerosis",
    "labels": ["MESA"],
    "href": "https://mesa-nhlbi.org",
    "desc": <>
      This is a study of the characteristics of subclinical cardiovascular disease and the risk factors that predict progression to clinically overt cardiovascular disease or progression of the subclinical disease (<Href href='https://doi.org/10.1093/aje/kwf113' text='Bild et al., 2002'/>).
      <br />
      MESA consists of a diverse, population-based sample of an initial 6,814 men and women aged 45-84 without known cardiovascular disease
      <br />
      The goal of MESA is to identify factors that contribute to cardiovascular disease that occurs with or without obvious symptoms.
    </>
  },
  {
    "title": "Northern Swedish Population Health Study",
    "labels": ["NSPHS"],
    "href": "https://pubmed.ncbi.nlm.nih.gov/20568910/",
    "desc": <>A Swedish community-based cohort with randomly recruited participants from the parishes of Karesuando and Soppero, County of Norrbotten (median age, 50 years; N = 1,037). People in this area either lead a traditional, subsistence-based, lifestyle mainly based on reindeer herding, hunting and fishing, or a lifestyle similar to other western European countries. The study measures a broad spectrum of environmental (e.g. occupation, diet, physical activity and daylight exposure) and genetic (e.g. single-nucleotide polymorphisms) factors of relevance for health risk. A comprehensive set of health indicators, clinical measures (e.g. blood lipids, proteins) and diagnoses of cardiovascular, orthopedic and metabolic diseases has also been collected.</>
  },
  {
    "src": p3,
    "title": "Orkney Complex Disease Study",
    "labels": ["ORCADES"],
    "href": "https://www.ed.ac.uk/viking/about-us/what-we-do/our-studies",
    "desc": <>A family-based study that seeks to identify genetic factors influencing cardiovascular and other disease risk in the isolated archipelago of the Orkney Isles in northern Scotland <Href text="(McQuillan et al., 2008)" href="https://pubmed.ncbi.nlm.nih.gov/18760389/" />. Genetic diversity in this population is decreased compared to Mainland Scotland, consistent with the high levels of endogamy historically. 2,078 participants aged 16-100 years were recruited between 2005 and 2011, most having three or four grandparents from Orkney, the remainder with two Orcadian grandparents. Fasting blood samples were collected and many health-related phenotypes and environmental exposures were measured in each individual. Extensive proteomic, methylomic, metabolomic, glycomic and lipidomic data are also available.</>
  },
  {
    "src": p4,
    "title": "UK Biobank",
    "labels": ["UKB","UKB withheld"],
    "href": "https://www.ukbiobank.ac.uk",
    "desc": <>A prospective cohort study with deep genetic and phenotypic data collected on approximately 500,000 individuals from across the United Kingdom, aged between 40 and 69 at recruitment. A rich variety of phenotypic and health-related information is available on each participant, including biological measurements, lifestyle indicators, biomarkers in blood and urine, and imaging of the body and brain. Follow-up information is provided by linking health and medical records. Genome-wide genotype data have been collected on all participants, providing many opportunities for the discovery of new genetic associations and the genetic bases of complex traits.</>
  },
  {
    "src": p5,
    "title": "VIKING Health Study",
    "labels": ["VIKING"],
    "href": "https://www.ed.ac.uk/viking/about-us/what-we-do/our-studies",
    "desc": <>Aims to discover the genes and variants that influence the risk of common, complex diseases. Many common diseases are known as complex, because they are influenced by many genes and environmental factors. Common, complex diseases include diabetes, osteoporosis, stroke, heart disease, myopia, glaucoma and chronic kidney and lung disease. Finding the genes involved is the first step on the road to developing new ways of diagnosing and treating these diseases. From March 2013 to March 2015, the study recruited 2,105 volunteers, with at least two grandparents from Shetland. Each volunteer completed a postal health survey questionnaire and attended a 2-hour measurement clinic. They also attended a 20-minute venepuncture clinic, to give a blood sample. The dedicated research clinic was based in Lerwick.</>
  }
];

let table_of_content = {};
cohorts_list.forEach(item => {
  table_of_content[item.labels[0]] = item.title;
})

function Cohorts() {
    return (
      <>
        <PageTitleSimple title='Cohorts'/>
        <div className="mb-3">
          Description of the cohorts used in {process.env.PROJECT_NAME}.
        </div>
        <TableOfContent title="List of Cohorts" content_headers={table_of_content}/>
        {
          cohorts_list.map((cohort) => <Container key={cohort.title} data={cohort}/>)
        }
      </>
    );
};

export default Cohorts;
