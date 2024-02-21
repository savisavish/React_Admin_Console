import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from "react-router-dom";
import Tab from "./Tab";
import '../../css/commonStyle.css';
import Profile from './usertabs/Profile';
import RelatedSbu from './usertabs/RelatedSbu';
import Spares from './usertabs/Spares';
import Repair from './usertabs/Repair';
import Download from '../../shared/buttons/Download';

const Userinfo = ({ tabs }, props) => {
    const location = useLocation();
    const { state } = location;

    const [activeTab, setActiveTab] = useState(() => {
        return parseInt(localStorage.getItem('activeTab')) || 0;
    });

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab.toString());
    }, [activeTab]);

    const tabData = [
        { label: "PROFILE INFORMATION", component: <Profile uid={state?.uid} /> },
        { label: "Related SBU's", component: <RelatedSbu uid={state?.uid} /> },
        { label: "SPARES SAP ACCOUNTS", component: <Spares uid={state?.uid} /> },
        { label: "REPAIRS SAP ACCOUNTS", component: <Repair uid={state?.uid} /> },
    ];
    const handleTabClick = (index) => {
        setActiveTab(index);
    };
    /* const handleUserDownload = () => {
        alert(1);
    }; */
    return (
        <>
            {/* <Download onClick={handleUserDownload} /> */}
            <div className="userdetailscontent">
                <div className="backtoprevpage">
                    <span><img className="backicon"/></span>
                    <span><NavLink activeclassname="active" to='/' onClick={() => localStorage.removeItem('activeTab')}>Back to all Company</NavLink></span>
                </div>
                <div className="tabcontainer">
                    {/* <div>User Info - {state?.uid}</div> */}
                    <div className="tabs-container">
                        <div className="tabs">
                            {tabData.map((tab, index) => (
                                <Tab
                                    key={index}
                                    label={tab.label}
                                    onClick={() => handleTabClick(index)}
                                    isActive={index === activeTab}
                                />
                            ))}
                        </div>
                        <div className="tab-content">
                            {tabData[activeTab]?.component}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Userinfo;