import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DatePicker from "@material-ui/pickers";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

export default function EditVacation({
  vacation,
  setVacationsArr,
}) {
  const [vac, setVac] = useState(vacation);
  const [open, setOpen] = React.useState(false);
  const [destination, setDestination] = useState(vacation.destination);
  const [imgUrl, setImgUrl] = useState(vacation.imgUrl);
  const [description, setDescription] = useState(vacation.description);
  const [fromDate, setFromDate] = useState(vacation.fromDate);
  const [toDate, setToDate] = useState(vacation.toDate);
  const [price, setPrice] = useState(vacation.price);

  const history = useHistory();
  useEffect(() => {
    console.log("hello");
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editVac = async () => {
    const res = await fetch(`http://localhost:1000/admin/edit/${vacation.id}`, {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        destination,
        imgUrl,
        description,
        fromDate,
        toDate,
        price,
      }),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);

    fetch("http://localhost:1000/vacations",{
        credentials:"include"
    })
      .then((res1) => res1.json())
      .then((data1) => setVacationsArr(data1));

    handleClose();


  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} aria-label="delete" color="primary">
        <EditIcon></EditIcon>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Vacation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            margin="dense"
            id="destination"
            label="Destination"
            type="text"
            fullWidth
            variant="outlined"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <TextField
            margin="dense"
            id="imgUrl"
            label="Image Url "
            type="text"
            fullWidth
            variant="outlined"
            value={imgUrl}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            id="from"
            label="From"
            type="date"
            fullWidth
            variant="outlined"
            value={new Date(fromDate)
              .toLocaleDateString("en-IL")
              .split("/")
              .reverse()
              .join("-")}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <TextField
            margin="dense"
            id="to"
            label="To "
            type="date"
            fullWidth
            variant="outlined"
            value={new Date(toDate)
              .toLocaleDateString("en-IL")
              .split("/")
              .reverse()
              .join("-")}
            onChange={(e) => setToDate(e.target.value)}
          />
          <TextField
            margin="dense"
            id="price "
            label="Price  "
            type="number"
            fullWidth
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(handleClose, editVac)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
