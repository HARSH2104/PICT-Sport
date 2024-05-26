import React, { useEffect, useState, useContext } from "react";
import ItemInfo from "./ItemInfo";
import noteContext from "../context/notes/noteContext";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const a = useContext(noteContext);
  let [InformationOfCard, setData] = useState([]);

  useEffect(() => {

    fetch(
      `http://127.0.0.1:3000/api/items/getAllItems`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });

  }, [a]);

  // console.log(InformationOfCard);
  // const InformationOfCard = [
  // {
  //     "id": 1,
  //     "name": "jiophone",
  //     "description": "India ka smartphone",
  //     "price": 1500,
  //     "image_url": null,
  //     "location": "nagar",
  //     "isavailable": true,
  //     "categId": 1,
  //     "userId": 2
  // },
  //     {
  //         "id": 2,
  //         "name": "cosmos",
  //         "description": "by carl sagan",
  //         "price": 500,
  //         "image_url": null,
  //         "location": "nagar",
  //         "isavailable": true,
  //         "categId": 2,
  //         "userId": 2
  //     },
  // {
  //     "id": 3,
  //     "name": "cosmos",
  //     "description": "by carl sagan",
  //     "price": 500,
  //     "image_url": null,
  //     "location": "nagar",
  //     "isavailable": true,
  //     "categId": 2,
  //     "userId": 1
  // },

  // ]


  return (
    <>
      <div className="container">
        
        <div className="row my-5">
          {InformationOfCard.map((element) => {
            return (
              <div className="col-md-3" key={element.id}>
                <ItemInfo
                  title={element.name}
                  image_url={element.image_url}
                  quantity={element.quantity}
                  id={element.id}
                />
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}

// name
// image url
// price
// description
