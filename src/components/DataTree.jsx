import { useState, useEffect } from 'react';
// import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Tooltip } from "@mui/material";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { ExpandCollapse, loading_data } from './Generic';
import { display_pathway_link } from '../pages/MolecularTrait/components/links'


export const DataTree = (props) => {

    // It is not possible to add React Components (not HTML code) in labels with '@mui/x-tree-view/RichTreeView'.
    // Therefore we use '@mui/x-tree-view/SimpleTreeView' instead

    const [itemsIDsList, setItemsIDsList] = useState([]);
    const [expandedItemsIDs, setExpandedItemsIDs] = useState(null);
    const [graphicTree, setgGraphicTree] = useState(null);

    const items = props.tree_items;

    // Build tree and setup list of expanded items
    const get_tree = (items) => {
        const graphic_tree = generate_graphic_tree(items);
        if (props.expanded && props.expanded == '0' ) {
            setExpandedItemsIDs([]);
        }
        else {
            setExpandedItemsIDs(itemsIDsList);
        }
        setgGraphicTree(graphic_tree);
    }


    // Recursive method to generate the TreeView using TreeItem for the SimpleTreeView
    const generate_graphic_tree = (items) => {
        let tree = <></>;
        for (let i=0; i<items.length; i++) {
            const item = items[i];
            if (item.children) {
                tree = <>{tree}<TreeItem itemId={item.id} label={item.label}>{generate_graphic_tree(item.children)}</TreeItem></>
            }
            else {
                tree = <>{tree}<TreeItem className="lower_tree_item" itemId={item.id} label={item.label}/></>
            }
            let items_ids_list = itemsIDsList
            items_ids_list.push(item.id)
            setItemsIDsList(items_ids_list)
        }
        return tree
    }


    const handleExpandedItemsChange = (event, itemIds) => {
        setExpandedItemsIDs(itemIds);
    };

    const handleExpandClick = () => {
        setExpandedItemsIDs((currentExpanded) =>
            currentExpanded.length === 0 ? itemsIDsList : [],
        );
    };

    function LowestItem() {
        let title = 'Lowest level pathway in Reactome';
        if (props.type && props.type=='card') {
            title = 'Current pathway';
        }
        return (
            <Tooltip title={title}><ArrowRightCircle className='color_pathway' size="14px"/></Tooltip>
        );
    }


    // Method to "draw" the SimpleTreeView
    const simple_tree = () => {
        return (
            <SimpleTreeView 
                    expandedItems={expandedItemsIDs} 
                    onExpandedItemsChange={handleExpandedItemsChange}
                    slots={{
                        // expandIcon: AddBoxIcon,
                        // collapseIcon: IndeterminateCheckBoxIcon,
                        endIcon: LowestItem
                    }}
            >
                 {graphicTree}
            </SimpleTreeView>
        )
    }


    useEffect(() => {
        get_tree(items);
    },[])


    return (
        <>
        { graphicTree && expandedItemsIDs ?
            props.type == 'card' ?
                <>
                    {/* Within a card and with an "expand/collapse all" button */}
                    <tr><td colSpan="2" className='op_sub_tree pb-4'></td></tr>
                    <tr>
                        <td colSpan="2" className='op_sub_tree card-sub-header'>
                            <div className='d-flex justify-content-between'>
                                {props.title}
                                <ExpandCollapse data_list={expandedItemsIDs} handleExpandClick={handleExpandClick}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" className='op_sub_tree pt-3'><div className='d-flex'>{simple_tree()}</div></td>
                    </tr>
                </>
                :
                <>
                    <div className='d-flex justify-content-end mb-2'><ExpandCollapse data_list={expandedItemsIDs} handleExpandClick={handleExpandClick}/></div>
                    {simple_tree()}
                </>
            : props.type == 'card' ?
                <tr><td>{loading_data()}</td></tr> : loading_data()
        }
        </>
    )
}


// Recursive function to build a tree,
// by creating a data structure that can be used to build a SimpleTreeView with TreeItem components
export const build_tree = (data, item_ids, parentId=null) => {
	let tree = [];
    data.forEach(item => {
        // Check if the item belongs to the current parent
		if (item.parentId === parentId) {
			let new_item = {...item};
            // Recursively build the children of the current item
			let children = build_tree(data, item_ids, item.external_id);
			// If children exist, assign them to the current item
			if (children.length) {
				new_item.children = children;
			}
			if (item_ids.includes(new_item.id)) {
				let suffix = 0
				let tmp_id = new_item.id+'_'+suffix;
				while (item_ids.includes(tmp_id)) {
					suffix += 1;
					tmp_id = new_item.id+'_'+suffix;
				}
				new_item.id = tmp_id
			}
			item_ids.push(new_item.id)

            // Add the current item to the tree
			tree.push(new_item);
        }
    });
    return tree;
}


// Function to build the data structure requested to generate a TreeItem (minus the children)
export const generate_item = (pathway_id, pathway, parent_id=null) => {
	const pathway_link = display_pathway_link(pathway,1);
	return ({
		'id': pathway_id,
		'external_id': pathway.external_id,
		'label': <small>{pathway_link}</small>,
		'parentId': parent_id
	})
}