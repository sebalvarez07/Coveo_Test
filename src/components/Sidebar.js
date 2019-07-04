import React, { useState, useEffect } from 'react';
import FilterList from './FilterList';
 
const Sidebar = (props) => {
    return (
        <div className='sidebar'>
            <FilterList />
        </div>
    )
}

export default Sidebar;