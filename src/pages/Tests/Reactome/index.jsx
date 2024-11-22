import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { ChevronRight } from 'react-bootstrap-icons';
import { useExternalScript } from '../../../components/Generic';

function ReactomeDiagram() {
    let { reactome_id } = useParams();
    // const [diagramLibraryState, setDiagramLibraryState] = useState(['loading'])

    const diagram_library_url = 'https://reactome.org/DiagramJs/diagram/diagram.nocache.js'

    // const handleScript = (e) => {
    //     setState(e.type === "load" ? "ready" : "error");
    // };

    // function AddReactomeDiagramLibrary(url) {
    //     const script = document.createElement("script");
    //     script.src = url;
    //     script.async = false;
    //     script.addEventListener("load", handleScript);
    //     script.addEventListener("error", handleScript);
    //     document.body.appendChild(script);
    // }
    // function AddReactomeDiagramLibrary(url) {
    //     const state = useExternalScript(diagram_library_url);
    //     setDiagramLibraryState(state);
    // }

    // Creating the Reactome Diagram widget
    // Take into account a proxy needs to be set up in your server side pointing to www.reactome.org
    function loadReactomeDiagram(){  // This function is automatically called when the widget code is ready to be used
        var diagram = Reactome.Diagram.create({
            "placeHolder" : "diagramHolder",
            "width" : 950, // minimum recommended width
            "height" : 500
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

    useEffect(() => {
        if (state === "ready") {
            onReactomeDiagramReady();
        }
    },[state])

    return (
        <>
            <h2 className='page_title'>Reactome Diagram<ChevronRight className={'op_title_separator color_hl'}/><span>{reactome_id}</span></h2>
            <div>
                {state === "loading" && <p>Loading...</p>}
                {state === "ready" && <div><div className='d-inline-flex' style={{border:'1px solid #DDD'}}><div id="diagramHolder"></div></div></div>}
                {state === "error" && <p>Error while loading the Reactome Diagram!</p>}
            </div>
        </>
    );
}

export default ReactomeDiagram