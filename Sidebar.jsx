import React, { useState } from 'react'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Profile from '../../assets/profile.png'
import { PiStudent } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaSchool } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { PiMoneyFill } from "react-icons/pi";
import { IoMdPersonAdd } from "react-icons/io";
import { PiExamBold } from "react-icons/pi";
import { FaList } from "react-icons/fa6";
import '../../App.css'

const Sidebar = () => {

  const [open, setOpen] =useState(false);
  const [openTeacher, setOpenTeacher] =useState(false);
  const [openSchool, setOpenSchool] =useState(false);


  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickTeacher = () => {
    setOpenTeacher(!openTeacher);

  };const handleClickSchool = () => {
    setOpenSchool(!openSchool);


  return (
    <div>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" className='d-flex justify-content-center my-3'>
              <img src={Profile} />
            </ListSubheader>
      }
    >
     
      
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PiStudent width={200} height={300}/>
        </ListItemIcon>
        <ListItemText primary="Students" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <NavLink to={'/studentList'} className="navlink" >
            <ListItemText primary="Student List" />
            </NavLink>
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <NavLink to={'/addStudent'} className="navlink">
            <ListItemText primary="Student Registration" />
            </NavLink>
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClickTeacher}>
        <ListItemIcon>
          <FaChalkboardTeacher width={200} height={300}/>
        </ListItemIcon>
        <ListItemText primary="Teacher" />
        {openTeacher ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openTeacher} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <NavLink to={'/teacherList'} className="navlink">
            <ListItemText primary="Teacher List" />
            </NavLink>
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <NavLink to={'/addTeacher'} className="navlink">
            <ListItemText primary="Teacher Registration" />
            </NavLink>
          </ListItemButton>
        </List>
      </Collapse>
      </List>
    </div>
  )
}
}

export default Sidebar
