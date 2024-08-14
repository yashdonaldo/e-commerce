import React from 'react'
import './Sidebar.scss'
import { Link } from 'react-router-dom'
import Dashboard from '@mui/icons-material/Dashboard'
import People from '@mui/icons-material/People'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Postadd from '@mui/icons-material/PostAdd';
import ListItemIcon  from '@mui/icons-material/List';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to={"/admin/dashboard"}><p><Dashboard /> Dashboard</p></Link>
            <Link>
                <SimpleTreeView >
                    <TreeItem label="Products">
                        <Link to={"/admin/product/list"}><TreeItem itemId="1" label="All"/></Link>
                        <Link to={"/admin/product/create"}><TreeItem itemId="2" label="Create" /></Link>
                    </TreeItem>
                </SimpleTreeView>
            </Link>
            <Link to={"/admin/orders"}><p><ListItemIcon/> Order's</p></Link>
            <Link to={"/admin/users"}><p><People /> User's</p></Link>
        </div>      
    )
}

export default Sidebar
