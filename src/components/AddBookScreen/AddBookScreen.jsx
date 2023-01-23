import React, { useEffect, useState } from 'react'
import styles from './AddBookScreen.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PublishIcon from '@mui/icons-material/Publish';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

const AddBookScreen = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem("@jwt-token");

  const [bookName, setBookName] = useState("")
  const [bookAuthors, setBookAuthors] = useState([])
  const [authors, setAuthors] = useState("")
  const [bookEdition, setBookEdition] = useState('')
  const [bookYear, setBookYear] = useState('')
  const [bookQuantity, setBookQuantity] = useState('')
  const [bookPrice, setBookPrice] = useState('')

  const [loading, setLoading] = useState(false);

  const [formValid, setFormValid] = useState(false)

  // useEffect(() => {
  //   setBookAuthors(authors.split(/[ ,]+/))
  // }, [formValid])

  const bookData = {
    name: bookName,
    author: bookAuthors,
    edition: bookEdition,
    publication_year: bookYear,
    quantity: bookQuantity,
    price: bookPrice
  }

  const isFormValid = () => {
    if (bookName !== "" &&
      bookYear !== "" &&
      bookEdition !== "" &&
      bookQuantity !== "" &&
      bookPrice !== "") {
      setFormValid(true);
      return true;
    }
    setFormValid(false);
    return false;
  }

  const createBook = () => {
    setLoading(true);
    axios.post(import.meta.env.VITE_PROD_URL + 'addBook', bookData, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        console.log("createBook data: ", response.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        alert(err.message)
        console.error("createBook error: ", err);
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.sub_container}>
        <TextField
          required
          id="outlined-required"
          label="Name"
          placeholder='Name of the book'
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Author(s)"
          multiline
          helperText="Separate authors with comma (,)"
          value={bookAuthors}
          onChange={(e) => setBookAuthors(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Edition"
          value={bookEdition}
          onChange={(e) => setBookEdition(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Publication Year"
          value={bookYear}
          onChange={(e) => setBookYear(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Quantity"
          value={bookQuantity}
          onChange={(e) => setBookQuantity(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Price"
          value={bookPrice}
          onChange={(e) => setBookPrice(e.target.value)}
        />
      </div>
      <div className={styles.interface}>
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
        <h3 className={styles.underline_effect}>Add Book Portal</h3>
        <div className={styles.btnRow}>
          <LoadingButton
            variant="contained"
            size='large'
            endIcon={<PublishIcon />}
            loading={loading}
            onClick={() => {
              if (isFormValid()) {
                createBook()
              }
              else {
                setFormValid(false);
              }
            }}
          >Submit</LoadingButton>
          <Button
            variant="contained"
            size='large'
            endIcon={<ExitToAppIcon />}
            onClick={() => {
              navigate('/dashboard', { replace: true })
            }}
          >Dashboard</Button>
        </div>
      </div>
      <div className={styles.footer}>
        <h3>Copyright &copy; bookshala 2023. All rights reserved.</h3>
      </div>
    </div>
  )
}

export default AddBookScreen