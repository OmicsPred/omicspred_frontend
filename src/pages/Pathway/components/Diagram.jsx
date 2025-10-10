/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Diagram3 } from 'react-bootstrap-icons';
import { useExternalScript, loading_data } from '../../../components/Generic';

const ReactomeDiagram = (props) => {
    const reactome_id = props.reactome_id;
    const [showDiagram, setShowDiagram] = useState(false);

    // Reactome DiagramJs
    const diagram_library_url = 'https://reactome.org/DiagramJs/diagram/diagram.nocache.js'

    // setState(useExternalScript(diagram_library_url));
    
    // Creating the Reactome Diagram widget
    // Take into account a proxy needs to be set up in your server side pointing to www.reactome.org
    function loadReactomeDiagram(){  // This function is automatically called when the widget code is ready to be used
        var diagram = Reactome.Diagram.create({
            "placeHolder" : "diagramHolder",
            "width" : 1050, // minimum recommended width: 950
            "height" : 550
        });

        // Initialising with a pathway ID
        diagram.loadDiagram(reactome_id);

        // Adding different listeners
        diagram.onDiagramLoaded(function (loaded) {
            console.info("Loaded ", loaded);
            diagram.flagItems("FYN");
            if (loaded == reactome_id) diagram.selectItem(reactome_id);
        }); 

        diagram.onObjectHovered(function (hovered){ 
            console.info("Hovered ", hovered); 
        }); 

        diagram.onObjectSelected(function (selected){
            console.info("Selected ", selected); 
        });
    }

    // let state = undefined;
    const state = useExternalScript(diagram_library_url);

    function onReactomeDiagramReady(callback) {
        var interval = 100; // ms
        setTimeout(function() {
            if (typeof Reactome != 'undefined') {
                loadReactomeDiagram();
            } else {
                onReactomeDiagramReady(callback);
            }
        }, interval);
    }

    
    const hideShowDiagram = (e) => {
        if (showDiagram) {
            setShowDiagram(false);
        }
        else {
            setShowDiagram(true);
        }
    }


    useEffect(() => {
        if (state === "ready" && showDiagram) {
            onReactomeDiagramReady();
        }
    },[state,showDiagram])

    return (
        <>
            <div className="btn btn-op shadow mt-2" onClick={(e) => {hideShowDiagram(e)}}><Diagram3 className='me-2' size="16"/>{showDiagram ? 'Hide' : 'Show'} Reactome Diagram</div>
            {showDiagram ? 
                <div>
                    {state === "loading" && loading_data()}
                    {state === "ready" && <div><div key="diagram" className='d-inline-flex mt-2' style={{border:'1px solid #DDD'}}><div id="diagramHolder"></div></div></div>}
                    {state === "error" && <p>Error while loading the Reactome Diagram!</p>}
                </div>: ''
            }
        </>
    );
}

export default ReactomeDiagram