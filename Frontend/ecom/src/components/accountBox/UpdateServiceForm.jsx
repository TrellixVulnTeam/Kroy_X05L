import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import axios from "axios";
const UpdateServiceForm = ({onclose, serviceID, nowService}) => {
  const [selectedFile, setSelectedFile] = useState()
  
  function changeHandler(event) {
    setSelectedFile(event.target.files[0]);

  };
  const [formData, setFormData] = useState({
    title: nowService.title,
    budget: nowService.budget,
    quantity: nowService.quantity,
    description: nowService.description,
    image: nowService.image
  });

  const history= useHistory()

  async function handleSubmission(event) {

    event.preventDefault();
    const Data = new FormData();

    console.log("submit clicked")

    Data.append("image", selectedFile);
    Data.append("title", formData.title)
    Data.append("description", formData.description)
    Data.append("budget", formData.budget)
    Data.append("quantity", formData.quantity)
    Data.append("customer", localStorage.getItem('user'))
      
    const result= await axios.put(`http://localhost:8000/store/services/${serviceID}/`,
      Data
    )
      .then((result) => {
        console.log("Success:", result);
        let newUrl= `../products/${serviceID}/`
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      console.log(result)
      onclose()
  }
  const updateFormData = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });


  const { title, budget, quantity, description } = formData;

  return (
    <form onSubmit={handleSubmission}>
      <input
      style={{
        "display": "block",
    "min-width": "90%",
    "margin": "1em",
    "padding": "1em",
    "width": "24em",
    "border-radius": "8px",
    "border-style": "none",
    "border": "1px solid #e4e6e8",
    "transition": "0.1s ease"
      }}
        value={title}
        onChange={e => updateFormData(e)}
        type="text"
        name="title"
        required
      />
      <input
      style={{
        "display": "block",
    "min-width": "90%",
    "margin": "1em",
    "padding": "1em",
    "width": "24em",
    "border-radius": "8px",
    "border-style": "none",
    "border": "1px solid #e4e6e8",
    "transition": "0.1s ease"
      }}
        value={budget}
        onChange={e => updateFormData(e)}
        placeholder="budget"
        type="text"
        name="budget"
        required
      />
      <input
      style={{
        "display": "block",
    "min-width": "90%",
    "margin": "1em",
    "padding": "1em",
    "width": "24em",
    "border-radius": "8px",
    "border-style": "none",
    "border": "1px solid #e4e6e8",
    "transition": "0.1s ease"
      }}
        value={quantity}
        onChange={e => updateFormData(e)}
        placeholder="quantity"
        type="text"
        name="quantity"
      />
      <input
      style={{
        "display": "block",
    "min-width": "90%",
    "margin": "1em",
    "padding": "1em",
    "width": "24em",
    "border-radius": "8px",
    "border-style": "none",
    "border": "1px solid #e4e6e8",
    "transition": "0.1s ease"
      }}
        value={description}
        onChange={e => updateFormData(e)}
        placeholder="description"
        type="text"
        name="description"
        required
      />
      {/* <image
        value={image}
        onChange={e => updateFormData(e)}
        placeholder="image"
        type="image"
        name="image"
        required
      /> */}

      {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</DropdownButton> */}
      {/* 
<Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown> */}

      <div className="upload">
        <input
        style={{
          "display": "block",
      "min-width": "90%",
      "margin": "1em",
      "padding": "1em",
      "width": "24em",
      "border-radius": "8px",
      "border-style": "none",
      "border": "1px solid #e4e6e8",
      "transition": "0.1s ease"
        }}
        type="file" name="file" className="upload" onChange={changeHandler} />
      </div>

      <br></br>
        
      <button type="submit">Submit</button>
    </form>
  );
};


export default UpdateServiceForm;