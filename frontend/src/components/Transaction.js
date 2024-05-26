import React, { useEffect, useState } from "react";

export default function Transaction() {
  const [InformationOfCard, setInformationOfCard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await fetch(
        "http://127.0.0.1:3000/api/transac/getAllTransItem"
      );
      let parsedRes = await result.json();
    //   console.log(parsedRes);
      setInformationOfCard(parsedRes);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">User</th>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Borrow Date</th>
              <th scope="col">Return Date</th>
            </tr>
          </thead>
          <tbody>
            {InformationOfCard.map((element) => {
              return (
                <tr key={element.id}>
                  {/* <th scope="row">{element.id}</th> */}
                  <td>{element.registration_id}</td>
                  <td>{element.itemName}</td>
                  <td>{element.quantity}</td>
                  <td>
                    {element.borrow_date
                      ? new Date(element.borrow_date).toUTCString()
                      : "NA"}
                  </td>
                  <td>
                    {element.return_date
                      ? new Date(element.return_date).toUTCString()
                      : "NA"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
