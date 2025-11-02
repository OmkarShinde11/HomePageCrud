import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const pages = [
  { page: "Banner", redirectLink: "/banners" },
  { page: "Key Differenciators", redirectLink: "/keyDifferenciators" },
  { page: "CoreUsp", redirectLink: "/core-usp" },
  { page: "Awards", redirectLink: "/awards" },
  { page: "Insurance Partners", redirectLink: "/insurance-partner" },
  { page: "Faq", redirectLink: "/faq" },
  { page: "Experties", redirectLink: "/experties" },
  { page: "CreateAdmin", redirectLink: "/createAdmin"}
];
export default function MainNav() {
    const navigate=useNavigate();
  return (
    <List className="">
      {pages.map((text, index) => (
        <ListItem key={text.page} disablePadding>
          {/* <ListItemButton> */}
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            {/* <ListItemText primary={text.page} /> */}
            <NavLink to={text.redirectLink} onClick={(e) => {navigate(text.redirectLink);}} className={({ isActive }) =>
    `px-2 py-2 text-lg w-full block transition-colors duration-200
     ${isActive ? 'bg-amber-500 text-white' : 'hover:bg-amber-500 hover:text-white'}`}>
                {text.page}
            </NavLink>
          {/* </ListItemButton> */}
        </ListItem>
      ))}
    </List>
  );
}
