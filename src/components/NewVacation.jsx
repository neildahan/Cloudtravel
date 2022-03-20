import React, { useState,useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";
import "./vacation.css";

export default function NewVacation({setVacationsArr}) {
  const [open, setOpen] = React.useState(false);
  const [destination, setDestination] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [price, setPrice] = useState("");


  const history = useHistory();
  useEffect(() => {
    if (localStorage.role) {
    }
  }, []);

  const newVac = async () => {
    const res = await fetch("http://localhost:1000/admin/new", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ destination, imgUrl, description, fromDate, toDate, price }),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if(data.msg == "vacation added successfully"){
      handleClose()
    alert(data.msg);
    fetch("http://localhost:1000/vacations",{
      credentials:"include"
  })
    .then((res1) => res1.json())
    .then((data1) => setVacationsArr(data1));
    }
    else{
      alert(data.msg);
    }
 
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="large" color="primary" variant="contained" className="addButton"   onClick={handleClickOpen}>
      Add New Vacation
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Vacation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add a new vacation please fill out the form below and click the ADD button.
          </DialogContentText>
          <TextField 
            margin="dense"
            id="destination"
            label="Destination "
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setDestination(e.target.value)}
          />
          <TextField 
            margin="dense"
            id="imgUrl"
            label="Image Url "
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setImgUrl(e.target.value)}
          />
            <TextField 
              margin="dense"
              id="description "
              label="Description  "
              rows={4}
              fullWidth
              variant="outlined"
              multiline
              onChange={(e) => setDescription(e.target.value)}
            />
          <TextField 
            margin="dense"
            id="from"
            label="From"
            type="date"
            fullWidth
            variant="outlined"
            onChange={(e) => setFromDate(e.target.value)}
          />
          <TextField 
            margin="dense"
            id="to"
            label="To "
            type="date"
            fullWidth
            variant="outlined"
            onChange={(e) => setToDate(e.target.value)}
          />
          <TextField 
            margin="dense"
            id="price "
            label="Price  "
            type="number"
            fullWidth
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose, newVac}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}