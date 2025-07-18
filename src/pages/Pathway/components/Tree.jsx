import { useState, useEffect } from 'react';
import restApiCall from '../../../components/RestAPI';
import DataTree from '../../../components/DataTree';
import { display_pathway_link } from '../../MolecularTrait/components/links';
import { consoleDev, build_tree } from '../../../components/Generic';


const ReactomeTree = (props) => {

    const [pathwayTree, setPathwayTree] = useState([])

    const current_pathway = props.pathway;
    const top_level_pathway = current_pathway.superpathways.length > 0 ? current_pathway.superpathways[0] : null;


    // Function to fetch all the data needed to build a Tree.
    // It will be used to generate the TreeItem components.
    const fetchPathwayItems = async (pathway, superpathway) => {
        let items_list = {};
        let item_ids_list = new Set();
        let item_external_ids_list = new Set();
        const items = await build_tree_data(pathway, superpathway, items_list, item_ids_list, item_external_ids_list)
        let item_ids = [];
	    const tree = build_tree(Object.values(items), item_ids);
        consoleDev(tree);
        setPathwayTree(tree);
    }


    /**
     *  Create recursively the list of pathway tree items (with a parent ID)
     *   @param {object} pathway - Output of the Pathway REST API endpoint
     *   @param {object} superpathway - Super pathway (REST API structure) of the current pathway
     *   @param {Array} items - list of tree items generated (recursively)
     *   @param {Set} item_ids_list - list of tree item ids already generated (to avoid duplicates)
     *   @param {Set} item_external_ids_list - list of pathway IDs whom the data has already been collected (avoid duplicated REST API calls)
     *   @return {Array} List of pathway tree items
     */
    const build_tree_data = async (pathway, superpathway, items, item_ids_list=Set(), item_external_ids_list=Set()) => {
        const pathway_id = pathway.external_id;
        const parent_ids = pathway.parent_external_ids;

        // Lower level(s)
        if (parent_ids.length > 0) {
			for (let i=0;i<parent_ids.length;i++) {
                const id = pathway_id+"_"+parent_ids[i];
                if (!item_ids_list.has(id)) {
                    item_ids_list.add(id)
                    items[id] = generate_item(pathway_id+"_"+parent_ids[i],pathway,parent_ids[i]);
                }
			}
        }
        // Is top level
		else {
            if (!items[pathway_id]) {
                item_ids_list.add(pathway_id)
                pathway.top_level = true
                items[pathway_id] = generate_item(pathway_id,pathway);
            }
		}

        // Add loaded pathway ID to the list of pathway external IDs
        item_external_ids_list.add(pathway_id)

        // Other Upper level(s) - if the loaded pathay has parent ID(s)
        if (parent_ids.length > 0) {
			for (let i=0;i<parent_ids.length;i++) {
                const parent_id = parent_ids[i]
                // Avoid sending an extra REST API call to get the top level information
                if (parent_id == superpathway.external_id) {
                    superpathway.top_level = true
                    items[parent_id] = generate_item(parent_id,superpathway);
                    item_ids_list.add(parent_id)

                    // Add to the list of pathway external IDs
                    item_external_ids_list.add(parent_id)
                }
                // Go up recursively
                else if (parent_id != null && !items[parent_id] && !item_ids_list.has(parent_id) && !item_external_ids_list.has(parent_id)) {
                    const parent_pathway_data = await fetchData(parent_id);
                    if (parent_pathway_data) {
                        items = await build_tree_data(parent_pathway_data, superpathway, items, item_ids_list, item_external_ids_list)
                    }
                }
            }
        }
        return items;
    }


    // Generic function to build the data requested to generate a TreeItem (minus the children)
    const generate_item = (pathway_id, pathway, parent_id=null) => {
        const pathway_link = display_pathway_link(pathway,1);
        return ({
            'id': pathway_id,
            'external_id': pathway.external_id,
            'label': <small>{pathway_link}</small>,
            'parentId': parent_id
        })
    }


    // Fetch pathway data
    const fetchData = async (pathway_id) => {
        const data = await restApiCall('pathway/'+pathway_id+'?include_molecular_traits=0');
        return data;
    }


    useEffect(() => {
        fetchPathwayItems(current_pathway, top_level_pathway);
    },[])


    return (
        <>
            { pathwayTree && pathwayTree.length > 0 ?
                <DataTree tree_items={pathwayTree} expanded="0" title="Pathway tree" type="card"/> : ''
            }
        </>
    )
}
export default ReactomeTree