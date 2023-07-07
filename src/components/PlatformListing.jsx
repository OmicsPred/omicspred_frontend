import React, { useEffect, useState } from "react"
//import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const PlatformListing = (props) => {
    const renderlist = ({datalist}) => {
        if (datalist) {
            const categorizedPlatform = [];
            datalist.map(data => {
                //const { name, type, version } = curr;
                //console.log("NAME: "+name);
                let type = data.type;
                if (!categorizedPlatform[type]) {
                    categorizedPlatform[type] = [];
                }
                let obj = {};
                obj['name'] = data.name;
                obj['version'] = data.version;
                categorizedPlatform[type].push(obj);
            });
            // console.log('# categorizedPlatform:');
            // console.log(categorizedPlatform);

            return (
                <>
                {
                    Object.keys(categorizedPlatform).map((key, index) => {
                        return(
                            <DropdownButton key={key} title={key} id={key} size="sm">
                                {categorizedPlatform[key].map((item, index) => 
                                    <Dropdown.Item key={item.name}>{item.name}</Dropdown.Item>
                                )}
                            </DropdownButton>
                        )
                    })
                }
                </>
            )

            // return (
            //     <ul>
            //         {
            //             Object.keys(categorizedPlatform).map((key, index) => {
            //                 return(
            //                     <li key={key}>{key}
            //                         <ul>
            //                             {categorizedPlatform[key].map((item, index) =>
            //                                 <li key={item.name}>{item.name}</li>
            //                             )}
            //                         </ul>
            //                     </li>
            //                 )
            //             })
            //         }
            //     </ul>
            // )
            
            // return (
            //     <ul>
            //         {datalist.map(item => 
            //             <li key={item.name}>{item.name}</li>
            //         )}
            //     </ul>
            // )
        }
        else {
            return (
                <div>No data!</div>
            )
        }
    }

    return(
        <div>
            {renderlist(props)}
        </div>
    )
}

export default PlatformListing