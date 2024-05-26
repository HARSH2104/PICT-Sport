import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

export default function InfoOfItem(props) {
  const a = useContext(noteContext);
  const [intakeNumber, setInTakeNumber] = useState(0);
  const [outtakeNumber, setOutTakeNumber] = useState(0);
  const [infoOfProd, setInfoOfProd] = useState({});
  const [infoOfSeller, setInfoOfSeller] = useState({});
  const [bookedItemsByUser, setbookedItemsByUser] = useState(0);
  //   const [prodId, setprodId] = useState({});

  //   setprodId(a.id);

  useEffect(() => {
    async function fetchData() {
      try {
        const prodResponse = await fetch(
          `http://127.0.0.1:3000/api/items/findItembyid/${a.id}`
        );
        const prodData = await prodResponse.json();
        setInfoOfProd(prodData);

        // const sellerResponse = await fetch(
        //   `http://127.0.0.1:3000/api/user/finduserbyid/${prodData.userId}`
        // );
        // const sellerData = await sellerResponse.json();
        // setInfoOfSeller(sellerData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

    // console.log("bookeditems", bookedItemsByUser);
  }, []);

  const handleChangein = () => {
    let intake = document.getElementById("intakeNumber").value;
    console.log(intake);
    setInTakeNumber(intake);
  };
  const handleChangeout = () => {
    let outtake = document.getElementById("outtakeNumber").value;
    console.log(outtake);
    setOutTakeNumber(outtake);
  };

  const ReturnItem = async () => {
    if (outtakeNumber > 0) {
      let quantity = outtakeNumber;
      let itemName = infoOfProd.name;
      let itemId = localStorage.getItem("selectedProductId");
      let userId = localStorage.getItem("uid");

      let uu = await fetch(
        `http://127.0.0.1:3000/api/user/finduserbyid/${userId}`
      );
      let parsedUu = await uu.json();
      // console.log(parsedUu);
      let registration_id = parsedUu.registration_id;

      let obj = {
        quantity,
        itemName,
        itemId,
        userId,
        registration_id,
      };

      const temp = await fetch(
        "http://127.0.0.1:3000/api/transac/returnTrans",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        }
      );

      // console.log(temp);
      if (temp.status === 200) {
        // alert("Items returned successfully");
        props.showAlert("Items returned successfully", "success");
      }
    }
    // console.log(outtakeNumber);
  };

  const BookedItem = async () => {
    if (intakeNumber > 0) {
      let quantity = intakeNumber;
      let itemName = infoOfProd.name;
      let itemId = localStorage.getItem("selectedProductId");
      let userId = localStorage.getItem("uid");

      let uu = await fetch(
        `http://127.0.0.1:3000/api/user/finduserbyid/${userId}`
      );
      let parsedUu = await uu.json();
      // console.log(parsedUu);
      let registration_id = parsedUu.registration_id;

      let obj = {
        quantity,
        itemName,
        itemId,
        userId,
        registration_id,
      };

      const temp = await fetch("http://127.0.0.1:3000/api/transac/addTransac", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });

      // console.log(temp);
      if (temp.status === 201) {
        // alert("Item booked successfully");
        props.showAlert("Item booked successfully", "success");
      }
    }
    // console.log(infoOfProd);
    // console.log(intakeNumber);
  };

  //   useEffect(() => {
  //     fetch("http://127.0.0.1:3000/api/user/finduserbyid/" + infoOfProd.userId)
  //       .then((data) => data.json())
  //       .then((data) => setInfoOfSeller(data));
  //   }, []);

  //   useEffect(() => {
  //     fetch("http://127.0.0.1:3000/api/user/finduserbyid/" + infoOfProd.userId)
  //       .then((data) => data.json())
  //       .then((data) => setInfoOfSeller(data));
  //   }, []);

  // console.log(infoOfProd);
  // console.log(infoOfSeller);

  async function getBookedItems() {
    const userId = localStorage.getItem("uid");
    const itemid = localStorage.getItem("selectedProductId");
    // console.log("item", itemid);
    const result = await fetch(
      `http://127.0.0.1:3000/api/bookings/getBookingsByUidItem?userId=${userId}&itemId=${itemid}`
    );
    const parsedRes = await result.json();
    // console.log(parsedRes[0]);
    // console.log("bookeditem in func ", parsedRes[0].quantity);
    if (parsedRes[0]) {
      setbookedItemsByUser(parsedRes[0].quantity);
    } else {
      setbookedItemsByUser(0);
    }
  }

  getBookedItems();

  return (
    <div>
      <>
        <div className="container">
          <h1 className="text-center"> {infoOfProd.name} </h1>
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 mt-2 pt-2">
              <div className="row z-depth-3 my-4">
                <div className="col-sm-8  rounded-left">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="3"
                        aria-label="Slide 4"
                      ></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          src={`/Images/${a.productImgUrl}`}
                          height={"500px"}
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      {/* <div className="carousel-item">
                        <img
                          src="https://images.livemint.com/img/2021/12/28/600x338/ee533a00-38df-11ec-9de8-7f7cc13130d0_1640310465772_1640654102799.jpg"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src="https://images.livemint.com/img/2021/12/28/600x338/ee533a00-38df-11ec-9de8-7f7cc13130d0_1640310465772_1640654102799.jpg"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div> */}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className="col-sm-4 text-dark   rounded-left CustomItemBody">
                  <div className="container">
                    <h1>Name: {infoOfProd.name} </h1>
                    <div className="row">
                      <div className="col-sm-3 m-2">
                        <h4>Quantity</h4>
                      </div>
                      <div className="col-sm-2 m-2">
                        <select onChange={handleChangein} id="intakeNumber">
                          {[...Array(infoOfProd.quantity)]
                            .map((_, i) => i)
                            .map((i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm col-sm-3"
                        onClick={BookedItem}
                        disabled={localStorage.getItem("uid") ? 0 : 1}
                      >
                        Book item
                      </button>
                    </div>

                    <div className="row mt-3">
                      <div className="col-sm-3 m-2">
                        <h4>Return</h4>
                      </div>
                      <div className="col-sm-2 m-2">
                        <select onChange={handleChangeout} id="outtakeNumber">
                          {[...Array(bookedItemsByUser + 1)]
                            .map((_, i) => i)
                            .map((i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary btn-sm col-sm-3"
                        onClick={ReturnItem}
                        disabled={localStorage.getItem("uid") ? 0 : 1}
                      >
                        Return
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
