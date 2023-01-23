import React, { useState } from 'react'
import styles from './RegisterScreen.module.css'
import login_illustration from '../../assets/login_illustration.jpeg'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const RegisterScreen = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const sellerData = {
    name: name,
    email: email,
    password: password
  }

  const isFormValid = () => {
    if (ValidateEmail(email) && (name !== '' && email !== '' && password !== '')) {
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

  const createSeller = () => {
    setLoading(true);
    axios.post(import.meta.env.VITE_PROD_URL + 'register', sellerData)
      .then(response => {
        console.log("createSeller data: ", response.data);
        setLoading(false);
        navigate("/login", { replace: true });
      })
      .catch(err => {
        setLoading(false);
        alert(err.message)
        console.error("createSeller error: ", err);
      })
  }

  return (
    <div className={styles.container}>
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
        <h2>Seller Registration</h2>
        <div className={styles.form}>
          <TextField fullWidth required id="outlined-basic" label="Full Name" variant="outlined" value={name} onChange={res => setName(res.target.value)} />
          <TextField fullWidth required id="outlined-basic" label="Email Address" variant="outlined" value={email} onChange={res => setEmail(res.target.value)} error={isValidEmail} />
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={res => setPassword(res.target.value)}
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
                createSeller()
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
            <span>Register</span>
          </LoadingButton>
        </div>
        <div className={styles.no_account}>
          <h4><Link to='/login'>Already a seller? Start selling!</Link></h4>
        </div>
        <div className={styles.footer}>
          <h3>Copyright &copy; bookshala 2023. All rights reserved.</h3>
        </div>
      </div>
      <div className={styles.left_section}>
        <img src={login_illustration} alt="" className={styles.left_img} />
        <img src={login_illustration} alt="" className={styles.left_img} />
      </div>
    </div>
  )
}

export default RegisterScreen