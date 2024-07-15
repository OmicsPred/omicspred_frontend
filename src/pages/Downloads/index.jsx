// import { useState, useEffect } from 'react';
import { CodeSlash, FileEarmarkArrowDown } from 'react-bootstrap-icons';
import DataTableFromRestApi from "../../components/table/DataTableFromRestApi";
import {datasets_columns} from "../../components/table/columns/datasets";
import Href from '../../components/Href';


function Downloads() {

    const url_suffix = 'dataset/all';
    
    return(
        <div>
            <h2 className='page_title'>Downloads</h2>

            <h5 className='op_subtitle mb-3'><CodeSlash className='op_color_2' size="0.9em"/> REST API</h5>
            <div>
                Programmatic access to the {process.env.PROJECT_NAME} metadata via a REST API.
                <div className='mt-2'>
                    <a href={process.env.REST_API_URL} className="btn btn-op shadow"><CodeSlash size='0.9em' className='me-2'/>REST API documentation</a>
                </div>
            </div>


            <h5 className='op_subtitle mt-5 mb-3'><FileEarmarkArrowDown className='op_color_2' size="0.9em"/> File downloads</h5>
            <div>
                Metadata and data files available for each dataset:
                <div className='mt-2'>
                    <DataTableFromRestApi table_key="datasets" url_suffix={url_suffix} columns={datasets_columns}/>
                </div>
            </div>
            <div>
                <h6 className='mt-4 mb-3'><b>Description of the data files:</b></h6>
                <ul className='key_val_line'>
                    <li><span className='line_key'>Scoring files</span>Collection of tab-delimited text files containing the list of variant information and effect alleles/weights of each genetic score. See more information about the file format in the <Href text='PGS Catalog' href='https://www.pgscatalog.org/downloads/#dl_ftp_scoring'/> documentation.</li>
                    <li><span className='line_key'>Validation results</span>CSV file containing the metadata information associated with each genetic score.</li>
                    <li><span className='line_key'>Score variant information</span>CSV file containing information (rsID, location, alleles) about each variant retained in the dataset.</li>
                    <li><span className='line_key'>GWAS summary stats</span>List of GWAS summary stats files used to build the genetic score models.</li>
                </ul>
            </div>
            

        </div>
    )

}

export default Downloads;