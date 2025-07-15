import { useState, useEffect } from 'react';
// import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Box from '@mui/material/Box';
import { Tooltip } from "@mui/material";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { ExpandCollapse } from './Generic';


const DataTree = (props) => {

    // It is not possible to add React Components (not HTML code) in labels with '@mui/x-tree-view/RichTreeView'.
    // Therefore we use '@mui/x-tree-view/SimpleTreeView' instead

    const [itemsIDsList, setItemsIDsList] = useState([]);
    const [expandedItemsIDs, setExpandedItemsIDs] = useState(null);
    const [graphicTree, setgGraphicTree] = useState(null);

    const items = props.tree_items;


    const get_tree = (items) => {
        const tree = build_tree(items);
        if (props.expanded && props.expanded == '0' ) {
            setExpandedItemsIDs([]);
        }
        else {
            setExpandedItemsIDs(itemsIDsList);
        }
        setgGraphicTree(tree); 
    }


    // Recursive method to build the TreeView
    const build_tree = (items) => {
        let tree = <></>;
        for (let i=0; i<items.length; i++) {
            const item = items[i];
            if (item.children) {
                tree = <>{tree}<TreeItem itemId={item.id} label={item.label}>{build_tree(item.children)}</TreeItem></>
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
        if (props.type && props.type=='simple_tree') {
            title = 'Current pathway';
        }
        return (
            <Tooltip title={title}><ArrowRightCircle className='color_pathway' size="14px"/></Tooltip>
        );
    }


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
                    <tr><td colSpan="2" className='op_sub_tree pb-4'></td></tr>
                    <tr>
                        <td colSpan="2" className='op_sub_tree card-sub-header'>
                            <div className='d-flex justify-content-between' style={{color:"FFF"}}>
                                {props.title}
                                <ExpandCollapse data_list={expandedItemsIDs} handleExpandClick={handleExpandClick}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" className='op_sub_tree pt-3'><div className='d-flex'>{simple_tree()}</div></td>
                    </tr>
                </> : <Box>{simple_tree()}</Box>
            : ''
        }
        </>
    )
}
export default DataTree