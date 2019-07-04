import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContainer from './MainContainer';
 
const DashboardPage = (props) => {
    return (
        <div className='wrapper'>
            <Header />
            <Sidebar />
            <MainContainer />
        </div>
    )
}

export default DashboardPage;