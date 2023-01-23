import React, { useState } from 'react'
import styles from './LoginScreen.module.css'
import login_illustration from '../../assets/login_illustration.jpeg'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../../features/auth/authSlice';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';

const LoginScreen = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const sellerData = {
    email: email,
    password: password
  }

  const isFormValid = () => {
    if (ValidateEmail(email) && (email !== '' && password !== '')) {
      setIsValid(false)
      return true;
    }
    else {
      setIsValid(true)
      return false;
    }
  }

  function ValidateEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      setIsValidEmail(false);
      return (true)
    }
    setIsValidEmail(true);
    alert("You have entered an invalid email address!")
    return (false)
  }

  const dispatch = useDispatch();

  const loginSeller = () => {
    setLoading(true);
    axios.post(import.meta.env.VITE_PROD_URL + 'login', sellerData)
      .then(response => {
        console.log("loginSeller data: ", response.data);
        localStorage.setItem("@jwt-token", response.data.token);
        localStorage.setItem("@seller-details", JSON.stringify(response.data.seller));
        dispatch(setToken({ type: 'auth/setToken', payload: response.data.token }))
        setLoading(false);
        navigate("/dashboard", { replace: true });
      })
      .catch(err => {
        setLoading(false);
        alert(err.message)
        console.error("loginSeller error: ", err);
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.left_section}>
        <img src={login_illustration} alt="" className={styles.left_img} />
        <img src={login_illustration} alt="" className={styles.left_img} />
      </div>
      <div className={styles.right_section}>
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
        <h2>Seller Log-in</h2>
        <form className={styles.form}>
          <TextField fullWidth required id="outlined-basic" label="Email Address" variant="outlined" value={email} onChange={res => setEmail(res.target.value)} error={isValidEmail} />
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={password}
              onChange={res => setPassword(res.target.value)}
              type={showPassword ? 'text' : 'password'}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <LoadingButton
            onClick={() => {
              if (isFormValid()) {
                loginSeller()
              }
              else {
                setIsValid(true);
              }
            }}
            endIcon={<LoginIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            size='large'
            type="submit"
          >
            <span>Login</span>
          </LoadingButton>
        </form>
        <div className={styles.no_account}>

          <h4><Link to='/register'>Not a seller? Join us now!</Link></h4>
        </div>
        <div className={styles.footer}>
          <h3>Copyright &copy; bookshala 2023. All rights reserved.</h3>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen