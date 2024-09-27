import Href from "../../components/Href";

export const faqs_categories = ["General questions", "Genetic score development", "Contribute to OmicsPred"]


export const faqs_list = [
    {
      title: "What can we do with these genetic score models?",
      type: "General questions",
      text: "These genetic score models can be used to predict levels of biomolecular traits in genotyped cohorts. The predicted levels can be associated with complex phenotypes, which offers as a useful tool to investigate the molecular underpinnings of these phenotypes. The predicted levels can also allow integrative analyses with other available biomolecular traits in the cohort.",
    },
    {
      title: "How can I download model files of these genetic scores?",
      type: "General questions",
      text: [
        "You can find a download links on the Score, Platform and Publication pages. You can also find the links on the ",
        <Href href='/downloads' text='Downloads page'/>,
        ". The genetic scores are under the categories ",
        <b>Scoring files</b>,
        ' and ',
        <b>Scoring files<small> (pgsc_calc compatible)</small></b>,
        '. Each of these zipped files contains all the scoring files associated with a dataset/platform.'
      ],
    },
    {
      title: " What method was used for genetic score development and why?",
      type: "Genetic score development",
      text: "The machine learning method Bayesian Ridge(BR), that based on individual - level genotype data, was used to construct genetic scores of biomolecular traits in the Atlas. Because it has been shown to perform well relative to other genetic score development approaches in both the previous study (Xu et al. Cell Genomics, 2022) and the benchmark carried out in this study. Additionally, Bayesian ridge has been shown to scale well to large numbers of traits, thus improving computational efficiency and consistency with green computing (Lannelongue et al. Advanced Science, 2021).",
    },
    {
      title: "How were the genetic variants (i.e. SNPs) selected before feeding to the genetic scoring method?",
      type: "Genetic score development",
      text: "To ensure the generalizability of genetic score models when applied to other cohorts, a variant filtering step was first performed for all the traits considered, which applied a MAF threshold of 0.5% and excluded all multi-allelic variants as well as ambiguous variants (i.e. A/T, G/C). A follow-up LD thinning step was carried out at an r2 threshold of 0.8 on all the variants, which aims to remove a certrain level of LD dependencies among variants and reduce the computational burden of genetic scoring method. The remaining variants were then filtered at the genome-wide significance threshold of 5e-8 (based on their GWAS summary statistics conducted on the INTERVAL training samples) for each trait. ",
    },
    {
      title: "How was the internal validation done?",
      type: "Genetic score development",
      text: "The INTERVAL training samples of a trait were randomly and equally partitioned to five portions, from which any four portions are used to learn a genetic score model of the trait with Bayesian ridge regression, and the model’s performance was then tested on the remaining 20% of INTERVAL training samples, i.e. calculating the r2 score and Spearman correlation coefficient between the predicted genetic scores and the actual levels of the trait for these samples. ",
    },
    {
      title: "How was the external validation done?",
      type: "Genetic score development",
      text: "The genetic score model trained with INTERVAL training samples for a trait was used to calculate genetic scores of the validation samples (external cohorts or withheld INTERVAL samples). Then R2 score and Spearman correlation coefficient were calculated using the predicted scores of these samples against their acutal trait levels.",
    },
    {
      title: "How can I contribute omic genetic scores from our study to OmicsPred?",
      type: "Contribute to OmicsPred",
      text: 'You can submit your omic scores via the "Submit Score" page (www.omicspred.org/SubmitScores) by using the templates we provided. Note that OmicsPred is still under active development, and synergising infrastructure and user interface/experience with other world-leading resources (e.g GWAS catalog and PGS catalog) to allow us to better host omic genetic scores from various types of studies for the community.',
    },
    {
      title: "What are the inclusion criteria for scores in OmicsPred?",
      type: "Contribute to OmicsPred",
      text: "To include omic scores in OmicsPred, we require the following information about the scores: 1) A description of the omic platform/assay/technology used to measure the traits and the related quality controls perfromed; 2) Variant information necessary to apply the genetic scores to new samples (e.g. variant rsID and/or genomic position, effect allele, weights/effect sizes); 3) A description of the method used to develop the omic scores (e.g. variant selection procedure, computation algorithm, relevant parameters); 4) A descriptions of the samples (e.g. numbers, ancestry) used in the different stages of score development (e.g. training, validation or testing); 5) A description of its predictive performance (e.g. proportion of the variance explained (R2), spearman’s rank correlation) on out-of-training samples/cohorts.",
    },
  ];