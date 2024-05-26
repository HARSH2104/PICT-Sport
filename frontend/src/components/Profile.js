import React, { useContext, useState, useEffect } from "react";
import ItemInfo from "./ItemInfo";
import noteContext from "../context/notes/noteContext";

export default function Profile() {
  const a = useContext(noteContext);

  // console.log("User id", a.userId);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  // const [userFavProduct, setUserFavProduct] = useState([]);

  useEffect(() => {
    async function fetchCurUser() {
      let fetchres = await fetch(
        `http://127.0.0.1:3000/api/user/finduserbyid/${a.userId}`
      );

      let res = await fetchres.json();
      // console.log(res);
      setUserName(res.name);
      setUserContact(res.phone);
      setUserEmail(res.email);
    }

    async function fetchMyBookings() {
      let fetchres = await fetch(
        `http://127.0.0.1:3000/api/bookings/getUserBooking/${a.userId}`
      );
      let res = await fetchres.json();
      console.log(res);
      setUserBookings(res);
    }

    a.userId && fetchCurUser();
    fetchMyBookings();
  }, [a]);

  return (
    <>
      <div className="container rounded bg-light mt-1 mb-3">
        <div className="row">
          <div className="col-md-6  ">
            <div className="p-3 py-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2 ">
                <div className="col-sm-8">
                  <h6 className="mb-0">Full Name : {userName}</h6>
                </div>
              </div>
              <hr />
              <div className="row mt-2">
                <div className="col-sm-8">
                  <h6 className="mb-0">Contact Number : {userContact}</h6>
                </div>
              </div>
              <hr />

              <div className="row mt-2">
                <div className="col-sm-8">
                  <h6 className="mb-0">Email ID : {userEmail}</h6>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <hr />
        <div className="container my-3">
          <h2 className="text-right"> My Bookings</h2>
          <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Borrow Date</th>
                  <th scope="col">Updated Date</th>
                </tr>
              </thead>
              <tbody>
                {userBookings.map((element) => {
                  return (
                    <tr key={element.id}>
                      {/* <th scope="row">{element.id}</th> */}
                      <td>{element.item.name}</td>
                      <td>{element.quantity}</td>
                      <td>
                        {element.createdAt
                          ? new Date(element.createdAt).toUTCString()
                          : "NA"}
                      </td>
                      <td>
                        {element.updatedAt
                          ? new Date(element.updatedAt).toUTCString()
                          : "NA"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        {/* <div className="container my-3">
          <h2 className="text-right">My Products</h2>
          <div className="row my-3">
            {console.log("The size is ", userMyProduct.length)}
            {userMyProduct.map((element) => {
              return (
                <div className="col-md-3" key={element.id}>
                  <ItemInfo
                    title={element.name}
                    description={element.description}
                    Imageurl={element.image_url}
                    price={element.price}
                    id={element.id}
                  />
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
    </>
  );
}
