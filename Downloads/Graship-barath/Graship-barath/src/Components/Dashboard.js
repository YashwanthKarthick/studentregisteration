import React from 'react'
import "./Dashboard.css"
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Logo from "../Images/contact.png"
import CampaignIcon from '@mui/icons-material/Campaign';

const Dashboard=({children})=> {
  const SideBarData=[
    {
      title:"HOME",
      icon: <HomeIcon/>,
      link:"/home"
    },
    {
      title: "USERS",
      icon: <PersonAddAlt1Icon/>,
      link: "/adduser"
    },
    {
      title: "ANNOUNCEMENT",
      icon: <CampaignIcon/>,
      link: "/announcement"
    },
    {
      title:"LOGOUT",
      icon:<LogoutIcon/>,
      link:"/"
    }
  ];

  return (
    <div className="main">
    <div className="sidebar">
    <div className="topbar">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div>
        <h1 className="hh1">ADMIN</h1>
      </div>
        <ul className="sidebarlist">
        {SideBarData.map((val,key)=>{
        return(
            <li key={key} className="row" id={window.location.pathname==val.link ? "active" : " "}onClick={()=>{
            window.location.pathname=val.link}}>
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
            </li>
        );
    })}</ul>
        </div>
        <main>{children}</main>
        </div>
  )
}

export default Dashboard;

