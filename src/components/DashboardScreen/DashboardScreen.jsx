import React from 'react'
import styles from './DashboardScreen.module.css'
import Button from '@mui/material/Button';
import InventoryIcon from '@mui/icons-material/Inventory';
import BookIcon from '@mui/icons-material/Book';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';

const DashboardScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={styles.dashboard}>
      <span className={styles.back}>
        <span>b</span>
        <span>o</span>
        <span>o</span>
        <span>k</span>
        <span>s</span>
        <span>h</span>
        <span>a</span>
        <span>l</span>
        <span>a</span>
      </span>
      <h2 className={styles.underline_effect}>Seller Dashboard</h2>
      <div className={styles.btnRow}>
        <Button
          variant="contained"
          size='large'
          endIcon={<InventoryIcon />}
          onClick={() => {
            navigate('/inventory')
          }}
        >Inventory</Button>
        <Button
          variant="contained"
          size='large'
          endIcon={<BookIcon />}
          onClick={() => {
            navigate('/addBook')
          }}
        >Add Book</Button>
        <Button
          variant="contained"
          size='large'
          endIcon={<LogoutIcon />}
          onClick={() => {
            // dispatch(setSellerDetails(null))
            dispatch(logOut())
            localStorage.removeItem("@jwt-token");
            localStorage.removeItem("@seller-details");
            navigate('/login', { replace: true });
          }}
        >Logout</Button>
      </div>
      <div className={styles.footer}>
        <h3>Copyright &copy; bookshala 2023. All rights reserved.</h3>
      </div>
    </div>
  )
}

export default DashboardScreen