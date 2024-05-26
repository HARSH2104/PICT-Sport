import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { Link } from "react-router-dom";
// import { Json } from "sequelize/types/utils";
export default function ItemInfo(props) {
  const a = useContext(noteContext);

  const checkForID = () => {
    a.setId(props.id);
    a.setproductImgUrl(props.image_url);
  };

  return (
    <>
      <div className="my-3">
        <div className="card border border-5 border-white ">
          <img
            src={`/Images/${props.image_url}`}
            height={"200px"}
            // width={"100px"}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Name: {props.title}</h5>
            <h5 className="card-text">Quantity: {props.quantity - 1}</h5>
          </div>
          <div className="d-flex justify-content-between my-2">
            <Link
              className="btn btn-info mx-3"
              to="/infoofitem"
              onClick={checkForID}
            >
              read more
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
