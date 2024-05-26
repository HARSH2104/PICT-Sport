import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function SellItem() {
  const [ProName, setProName] = useState("");
  const [QuantityofItem, setQuantityofItem] = useState("");
  const [numberOfImage, setnumberOfImage] = useState(0);
  const [validQuantityofItem, setValidQuantityofItem] = useState(0);

  const navigate = useNavigate();
  const initialingProductName = () => {
    let newProductName = document.getElementById("ProductNameID").value;
    setProName(newProductName);
  };
  

  const initialQuantityofItem = () => {
    let newQuantityofItem = document.getElementById("ProductQuantity").value;
    setQuantityofItem(newQuantityofItem);
    checkValidQuantityOfItem();
  };
  

  

  const checkValidQuantityOfItem = () => {
    let curQuantity = document.getElementById("ProductQuantity").value;

    if (curQuantity.length === 0) {
      setValidQuantityofItem(0);
      return;
    }
    for (let i = 0; i < curQuantity.length; i++) {
      if (curQuantity[i] < "0" || curQuantity[i] > "9") {
        setValidQuantityofItem(0);
        return;
      }
    }
    setValidQuantityofItem(1);
  };

 

 

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to the server...
    navigate("/");
  };

  


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      addProduct(file);
    }
  };

  const addProduct = async (file) => {

    const formData = new FormData();
    formData.append("image_url", file);
    formData.append("name", ProName);
    formData.append("quantity", QuantityofItem);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3000/api/items/addItem", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
        method="POST"
        action=""
      >
        <div className="container-xxl " style={{}}>
          <h1 className="my-3">Item Information</h1>

          <div className="input-group mb-3 ">
            <span className="input-group-text mx-3 col-md-3">
              {" "}
              Product Name <span style={{ color: "red" }}>*</span>
            </span>
            <input
              type="text"
              value={ProName}
              id="ProductNameID"
              className="form-control "
              placeholder="Product Name"
              aria-label="ProductName"
              aria-describedby="ProductName"
              onChange={initialingProductName}
            />
          </div>

          

          

          <div className="input-group mb-3">
            <label
              htmlFor="ProductQuantity"
              className="form-label input-group-text mx-3 col-md-3"
            >
              {" "}
              Quantity of the Product
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={QuantityofItem}
              className="form-control"
              placeholder="Quantity of the Product"
              id="ProductQuantity"
              aria-label="ProductQuantity"
              aria-describedby="ProductQuantity"
              onChange={initialQuantityofItem}
            />
          </div>
          {validQuantityofItem === 0 && QuantityofItem !== "" && (
            <p style={{ color: "red", textAlign: "center" }}>
              Quantity of the Item should contains only integer value
            </p>
          )}

          <div className="input-group mb-3">
            <label
              htmlFor="formFileMultiple"
              className="form-label input-group-text mx-3 col-md-3 "
            >
              Select Images <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="form-control "
              type="file"
              name="image_url"
              accept="image/*"
              id="formFileMultiple"
              encType="multipart/form-data"
              onChange={handleFileChange}
            />
          </div>
          {numberOfImage === 0 && (
            <p style={{ color: "red", textAlign: "center" }}>
              Upload atleast one image
            </p>
          )}

          <button
            className="btn btn-secondary my-3"
           
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
