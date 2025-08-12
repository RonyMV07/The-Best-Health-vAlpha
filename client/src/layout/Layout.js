import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
return (
    <div style={{ display: 'flex' }}>
    <Sidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ padding: '20px' }}>
        {children}
        </div>
    </div>
    </div>
);
};

export default Layout;