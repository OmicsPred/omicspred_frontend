import Container from "./components/Container";
import Href from "../../components/Href";
import CitationCard from "../../components/CitationCard";




function About() {
  return (
    <>
      <h2 className='page_title'>About</h2>
      <div className="mb-5">The OmicsPred Atlas development was led by <Href text="Yu Xu" href="mailto:yx322@medschl.cam.ac.uk"></Href>, under the supervison of <Href text="Michael Inouye" href="https://www.inouyelab.org/home/people" /> at the Department of Public Health and Primary Care, University of Cambridge.</div>
      
      <Container
        title="Citation"
        text={<div><div className="mb-3">If you use OmicsPred in your research, we ask that you cite our publication:</div><CitationCard/></div>}
      />

      <Container
        title="Our Collaborators"
        text={
        <>
          <ul> 
            <li className="mb-1">
              <Href text="InouyeLab" href={process.env.URL_INOUYE_LAB} />: <Href text="Scott C. Ritchie" href="https://orcid.org/0000-0002-8454-9548" />, <Href text="Samuel Lambert" href="https://www.phpc.cam.ac.uk/people/ceu-group/ceu-research-staff/sam-lambert/" />, Loïc Lannelongue, Artika Nath, Elodie Persyn, Carles Foguet
            </li>
            <li className="mb-1">
              <Href text="Department of Public Health and Primary Care, University of Cambridge:" href={process.env.URL_CAM_DPHPC+"ceu/"} /> Bram Prins, Praveen Surendran, Dirk Paul, Emanuele Di Angelantonio, Adam Butterworth, John Danesh
            </li>
            <li className="mb-1">
              <Href text="MRC Epidemiology Unit, University of Cambridge" href="https://www.mrc-epid.cam.ac.uk/" /> : Maik Pietzner, Jian’an Luan, Claudia Langenberg
            </li>
            <li className="mb-1">
              <Href text="MRC Human Genetics Unit, The University of Edinburgh" href="https://www.ed.ac.uk/mrc-human-genetics-unit/research/wilson-group" /> : Paul Timmers, Sebastian May-Wilson, Nicola Pirastu, Jim Wilson
            </li>
            <li className="mb-1">
              <Href text="Saw Swee Hock School of Public Health, National University of Singapore " href="https://sph.nus.edu.sg/" />: Yujian Liang, E Shyong Tai, Rob M van Dam, Xueling Sim
            </li>
            <li className="mb-1">
              <Href text="Beth Israel Deaconess Medical Center, Harvard Medical School" href="https://www.bidmc.org/" />: Usman A. Tahir, Shuliang Deng, Robert E. Gerszten
            </li>
            <li className="mb-1">
              <Href text="Wellcome Sanger Institute" href="https://www.sanger.ac.uk/" />: Lorenzo Bomba, Emma E Davenport, Nicole Soranzo
            </li>
            <li className="mb-1">
              <Href text="European Molecular Biology Laboratory, European Bioinformatics Institute" href="https://www.ebi.ac.uk/"/>: Helen Parkinson
            </li>
            <li className="mb-1">
              <Href text="Imperial College London" href="https://www.imperial.ac.uk/" />: James E. Peters
            </li>
            <li className="mb-1">
              <Href text="Immunology, Genetics and Pathology, IGP, Uppsala University" href="https://igp.uu.se/" /> : Åsa Johansson
            </li>
            <li className="mb-1">
              <Href text="University of Oxford" href="https://www.ox.ac.uk/" />: Christopher Yau
            </li>
            <li className="mb-1">
              <Href text="Karolinska Institutet" href="https://ki.se/" /> : Anders Mälarstig 
            </li>
          </ul>
        </>
        }
      />

    <Container
        title="Acknowledgements"
        text={ 
          <div>
            <p>Participants in the INTERVAL randomised controlled trial were recruited with the active collaboration of <Href text="NHS Blood and Transplant England" href="http://www.nhsbt.nhs.uk/" />, which has supported field work and other elements of the trial. DNA extraction and genotyping was co-funded by the National Institute for Health Research (NIHR), <Href text="the NIHR BioResource" href="http://bioresource.nihr.ac.uk/" />  and the NIHR [Cambridge Biomedical Research Centre at the Cambridge University Hospitals NHS Foundation Trust]. The academic coordinating centre for INTERVAL was supported by core funding from: NIHR Blood and Transplant Research Unit in Donor Health and Genomics (NIHR BTRU-2014-10024), UK Medical Research Council (MR/L003120/1), British Heart Foundation (SP/09/002; RG/13/13/30194; RG/18/13/33946) and the NIHR [Cambridge Biomedical Research Centre at the Cambridge University Hospitals NHS Foundation Trust]. A complete list of the investigators and contributors to the INTERVAL trial is provided in the <Href  text="reference" href="https://pubmed.ncbi.nlm.nih.gov/28941948" />. The academic coordinating centre would like to thank blood donor centre staff and blood donors for participating in the INTERVAL trial. 
          The academic coordinating centre would like to thank blood donor centre staff and blood donors for participating in the INTERVAL trial. UK Biobank data access was approved under project 7439, and all the participants gave their informed consent for health research. Generation of part of the Metabolon data in INTERVAL was funded by Biomarin Pharmaceuticals.
          The Multi-Ethnic Cohort (MEC) is funded by individual research and clinical scientist award schemes from the Singapore National Medical Research Council (NMRC, including MOH-000271-00) and the Singapore Biomedical Research Council (BMRC), the Singapore Ministry of Health (MOH), the National University of Singapore (NUS) and the Singapore National University Health System (NUHS). This work on omics polygenic score transferability is supported by the NUS-Cambridge Seed Grant July 20201 (NUSMEDIR/Cambridge/2021-07/001). The metabolite biomarkers data were generated in collaboration with Nightingale Health Ltd. The protein biomarker data were generated in collaboration with SomaLogic Inc. The MEC whole genome sequence data made use of data generated as part of the Singapore National Precision Medicine (NPM) program funded by the Industry Alignment Fund (Pre-Positioning) (IAF-PP: H17/01/a0/007). NPM made use of data/samples collected in the following cohorts in Singapore: (1) The Health for Life in Singapore (HELIOS) study at the Lee Kong Chian School of Medicine, Nanyang Technological University, Singapore (supported by grants from a Strategic Initiative at Lee Kong Chian School of Medicine, the Singapore Ministry of Health (MOH) under its Singapore Translational Research Investigator Award (NMRC/STaR/0028/2017) and the IAF-PP: H18/01/a0/016); (2) The Growing up in Singapore Towards Healthy Outcomes (GUSTO) study, which is jointly hosted by the National University Hospital (NUH), KK Women’s and Children’s Hospital (KKH), the National University of Singapore (NUS) and the Singapore Institute for Clinical Sciences (SICS), Agency for Science Technology and Research (A*STAR) (supported by the Singapore National Research Foundation under its Translational and Clinical Research (TCR) Flagship Programme and administered by the Singapore Ministry of Health’s National Medical Research Council (NMRC), Singapore-NMRC/TCR/004-NUS/2008; NMRC/TCR/012-NUHS/2014. Additional funding is provided by SICS and IAF-PP H17/01/a0/005); (3) The Singapore Epidemiology of Eye Diseases (SEED) cohort at Singapore Eye Research Institute (SERI) (supported by NMRC/CIRG/1417/2015; NMRC/CIRG/1488/2018; NMRC/OFLCG/004/2018); (4)  The Multi-Ethnic Cohort (MEC) cohort (supported by NMRC grant 0838/2004; BMRC grant 03/1/27/18/216; 05/1/21/19/425; 11/1/21/19/678, Ministry of Health, Singapore, National University of Singapore and National University Health System, Singapore); (5) The SingHealth Duke-NUS Institute of Precision Medicine (PRISM) cohort (supported by NMRC/CG/M006/2017_NHCS; NMRC/STaR/0011/2012, NMRC/STaR/ 0026/2015, Lee Foundation and Tanoto Foundation); (6)  The TTSH Personalised Medicine Normal Controls (TTSH) cohort funded (supported by NMRC/CG12AUG17 and CGAug16M012). The views expressed are those of the author(s) are not necessarily those of the National Precision Medicine investigators, or institutional partners. 
          We are grateful to all Fenland volunteers and to the General Practitioners and practice staff for assistance with recruitment. We thank the Fenland Study Investigators, Fenland Study Co-ordination team and the Epidemiology Field, Data and Laboratory teams. Proteomic measurements were supported and governed by a collaboration agreement between the University of Cambridge and SomaLogic. The Fenland Study (10.22025/2017.10.101.00001) is funded by the Medical Research Council (MC_UU_12015/1). We further acknowledge support for genomics from the Medical Research Council (MC_PC_13046).
          The Orkney Complex Disease Study (ORCADES) was supported by the Chief Scientist Office of the Scottish Government (CZB/4/276, CZB/4/710), a Royal Society URF to J.F.W., the MRC Human Genetics Unit quinquennial programme “QTL in Health and Disease”, Arthritis Research UK and the European Union framework program 6 EUROSPAN project (contract no. LSHG-CT-2006-018947). DNA extractions were performed at the Edinburgh Clinical Research Facility, University of Edinburgh. We would like to acknowledge the invaluable contributions of the research nurses in Orkney, the administrative team in Edinburgh and the people of Orkney. The Viking Health Study – Shetland (VIKING) was supported by the MRC Human Genetics Unit quinquennial programme grant “QTL in Health and Disease”. DNA extractions and genotyping were performed at the Edinburgh Clinical Research Facility, University of Edinburgh. We would like to acknowledge the invaluable contributions of the research nurses in Shetland, the administrative team in Edinburgh and the people of Shetland. We acknowledge support from the MRC Human Genetics Unit programme grant, “Quantitative traits in health and disease” (U. MC_UU_00007/10). 
          The NSPHS study was approved by the local ethics committee at the University of Uppsala (Regionala Etikprövningsnämnden, Uppsala, Dnr 2005:325) in compliance with the Declaration of Helsinki. All participants gave their written informed consent to the study. 
          Whole genome sequencing (WGS) for the Trans-Omics in Precision Medicine (TOPMed) program was supported by the National Heart, Lung and Blood Institute (NHLBI). WGS for “NHLBI TOPMed: Jackson Heart Study” (phs000964) was performed at the Northwest Genomics Center (HHSN268201100037C). Core support including centralized genomic read mapping and genotype calling, along with variant quality metrics and filtering were provided by the TOPMed Informatics Research Center (3R01HL-117626-02S1; contract HHSN268201800002I). Core support including phenotype harmonization, data management, sample-identity QC, and general program coordination were provided by the TOPMed Data Coordinating Center (R01HL-120393; U01HL-120393; contract HHSN268201800001I). We gratefully acknowledge the studies and participants who provided biological samples and data for TOPMed. The Jackson Heart Study (JHS) is supported and conducted in collaboration with Jackson State University (HHSN268201800013I), Tougaloo College (HHSN268201800014I), the Mississippi State Department of Health (HHSN268201800015I) and the University of Mississippi Medical Center (HHSN268201800010I, HHSN268201800011I and HHSN268201800012I) contracts from the National Heart, Lung, and Blood Institute (NHLBI) and the National Institute on Minority Health and Health Disparities (NIMHD). The authors also wish to thank the staffs and participants of the JHS. JHS disclaimer - The views expressed in this manuscript are those of the authors and do not necessarily represent the views of the National Heart, Lung, and Blood Institute; the National Institutes of Health; or the U.S. Department of Health and Human Services. 
          YX and MI were supported by the UK Economic and Social Research Council (ES/T013192/1). SCR is funded by a BHF Programme Grant (RG/18/13/33946). CL, MP, JL are funded by the Medical Research Council (MC_UU_00006/1 - Aetiology and Mechanisms). JD holds a British Heart Foundation Professorship and a NIHR Senior Investigator Award [*]. MI is supported by the Munz Chair of Cardiovascular Prediction and Prevention and the NIHR Cambridge Biomedical Research Centre (BRC-1215-20014) [*]. This study was supported by the Victorian Government’s Operational Infrastructure Support (OIS) program. We acknowledge Ben Sun and Tao Jiang for previous analyses of INTERVAL SomaScan and genotype quality control, respectively. For the purpose of open access, the author has applied a Creative Commons Attribution (CC BY) licence to any Author Accepted Manuscript version arising from this submission.
            </p>
          </div>
        }
      />
    </>
  );
};

export default About;
