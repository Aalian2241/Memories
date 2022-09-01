import React, {useState, use}from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useAuth} from "../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom"

export const Dashboard=()=> {
  const {logout} = useAuth();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [error, setError] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = async(event)=>{
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError("Failed to Log out");
    }

  }

  return (
    <div>
      <Button
        id="basic-button"
        color = "primary"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem dense={true} onClick={handleClose}>Profile</MenuItem>
        <MenuItem divider="true" onClick={handleClose}>My account</MenuItem>
        <MenuItem  variant="contained" onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
