import React, { useEffect, useState } from 'react';
import styles from './InventoryScreen.module.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import moment from 'moment/moment';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 220
  },
  {
    field: 'bookName',
    headerName: 'Book Name',
    width: 150,
  },
  {
    field: 'bookAuthor',
    headerName: 'Book Author(s)',
    width: 250,
  },
  {
    field: 'edition',
    headerName: 'Edition',
    width: 110,
  },
  {
    field: 'publicationYear',
    headerName: 'Year of publication',
    width: 150,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 110,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 110,
  }
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>Nothing added right now!</Box>
    </StyledGridOverlay>
  );
}

const InventoryScreen = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("@jwt-token");

  const [pageSize, setPageSize] = useState(10);
  const [selectionModel, setSelectionModel] = useState([]);
  const [cellValue, setCellValue] = useState('');
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(cellValue);
  }, [cellValue])


  const getBooks = () => {
    setLoading(true);
    axios.get(import.meta.env.VITE_PROD_URL + 'getBooks', {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(response => {
        const resp = JSON.stringify(response.data.allBooks_data);
        setApiData(response.data.allBooks_data)
        setLoading(false);
        console.log("getBooks response: " + resp);
      }).catch(err => {
        setLoading(false);
        console.error("Error gettingBooks response: ", err);
      })
  }

  const deleteBooks = (bookId) => {
    setLoading(true);
    axios.delete(import.meta.env.VITE_PROD_URL + `deleteBook/${bookId}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(response => {
        setLoading(false);
        console.log("deleteBook api response: " + JSON.stringify(response.data));
      })
      .catch(err => {
        setLoading(false);
        console.error("deleteBook api error: " + err)
      })
  }

  const deletefn = () => {
    selectionModel.forEach(id => {
      setTimeout(() => {
        deleteBooks(id)
      }, 500)
    });
  }

  const rows = apiData.map(data => ({
    id: data._id,
    bookName: data.name,
    bookAuthor: data.author,
    edition: data.edition,
    publicationYear: moment(data.publication_year).format('YYYY'),
    quantity: data.quantity,
    price: data.price
  }))

  useEffect(() => {
    getBooks()
  }, [])

  return (
    <div className={styles.inventory}>
      <Box sx={{ height: '84.1%', width: '85%' }}>
        <DataGrid
          sx={{ border: '1px solid black', borderRadius: '24px', mt: 3, mr: 3 }}
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 30]}
          pagination
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          onSelectionModelChange={(newSelectionModel) => {
            console.log(`SelectionModelChange: ${newSelectionModel}`)
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          onCellClick={(res) => {
            setCellValue(res.formattedValue)
          }}
        />
      </Box>
      <div className={styles.right}>
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
        <h3 className={styles.underline_effect}>Inventory Management</h3>
        <div className={styles.btnRow}>
          <LoadingButton
            variant="contained"
            size='large'
            endIcon={<RefreshIcon />}
            loading={loading}
            onClick={() => {
              getBooks();
            }}
          >Refresh</LoadingButton>
          <Button
            variant="contained"
            size='large'
            endIcon={<EditIcon />}
            onClick={() => {
              navigate('/editBook', { state: { bookId: selectionModel } })
            }}
          >Edit Book Details</Button>
          <LoadingButton
            variant="contained"
            size='large'
            endIcon={<DeleteIcon />}
            loading={loading}
            onClick={() => {
              deletefn();
              getBooks();
            }}
          >Delete Book(s)</LoadingButton>
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
  );
}

export default InventoryScreen;