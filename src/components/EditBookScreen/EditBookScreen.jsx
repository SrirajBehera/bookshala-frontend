import React, { useEffect, useState } from 'react'
import styles from './EditBookScreen.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PublishIcon from '@mui/icons-material/Publish';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import moment from 'moment';

const EditBookScreen = () => {

  const location = useLocation();
  const bookId = location.state.bookId;
  console.log("Bookid: ", bookId);

  const navigate = useNavigate()

  const token = localStorage.getItem("@jwt-token");

  const [bookName, setBookName] = useState("")
  const [bookAuthors, setBookAuthors] = useState([])
  const [bookEdition, setBookEdition] = useState('')
  const [bookYear, setBookYear] = useState('')
  const [bookQuantity, setBookQuantity] = useState('')
  const [bookPrice, setBookPrice] = useState('')

  const [loading, setLoading] = useState(false);

  const [formValid, setFormValid] = useState(false)

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

  const getBook = () => {
    axios.get(import.meta.env.VITE_PROD_URL + `getBooks/${bookId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        console.log("getBook data: ", response.data.allBooks_data);
        setBookName(response.data.allBooks_data.name)
        setBookAuthors(response.data.allBooks_data.author)
        setBookEdition(response.data.allBooks_data.edition)
        setBookYear(response.data.allBooks_data.publication_year)
        setBookQuantity(response.data.allBooks_data.quantity)
        setBookPrice(response.data.allBooks_data.price)
      })
      .catch(err => {
        console.error("createBook error: ", err);
      })
  }

  const ModifyBook = () => {
    setLoading(true);
    axios.put(import.meta.env.VITE_PROD_URL + `editBook/${bookId}`, bookData, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        setLoading(false);
        console.log("ModifyBook data: ", response.data);
      })
      .catch(err => {
        setLoading(false);
        console.error("createBook error: ", err);
      })
  }

  useEffect(() => {
    if (bookId[0] !== undefined) {
      getBook();
    }
  }, [])

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
        <h3 className={styles.underline_effect}>Edit Book Portal</h3>
        <h3 className={styles.underline_effect}>Book ID - {bookId[0] === undefined ? "Select a book from Inventory to proceed!" : bookId}</h3>
        <div className={styles.btnRow}>
          <LoadingButton
            variant="contained"
            size='large'
            endIcon={<PublishIcon />}
            loading={loading}
            onClick={() => {
              if (isFormValid()) {
                ModifyBook()
              }
              else {
                setFormValid(false);
              }
            }}
          >Modify</LoadingButton>
          <Button
            variant="contained"
            size='large'
            endIcon={<ExitToAppIcon />}
            onClick={() => {
              navigate('/inventory', { replace: true })
            }}
          >Inventory</Button>
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

export default EditBookScreen