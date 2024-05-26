import React, { useState, useEffect } from "react";
import NoteContext from "./noteContext";

// const NoteState = (props) => {
//   const [id, setId] = useState(0);

//   console.log("selected product id", id);

//   return (
//     <NoteContext.Provider value={{ id, setId }}>
//       {props.children}
//     </NoteContext.Provider>
//   );
// };

const NoteState = (props) => {
  const [id, setId] = useState(localStorage.getItem("selectedProductId") || 0);
  const [userId, setUserId] = useState(localStorage.getItem("UserId") || 0);

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    localStorage.getItem("selectedCategoryId") || "null"
  );
  const [productImgUrl, setproductImgUrl] = useState(
    localStorage.getItem("productImgUrl") || "null"
  );

  // console.log(localStorage.getItem("selectedCategoryId"));

  useEffect(() => {
    localStorage.setItem("selectedProductId", id);
  }, [id]);
  useEffect(() => {
    localStorage.setItem("UserId", userId);
  }, [userId]);
  useEffect(() => {
    localStorage.setItem("selectedCategoryId", selectedCategoryId);
  }, [selectedCategoryId]);
  useEffect(() => {
    localStorage.setItem("productImgUrl", productImgUrl);
  }, [productImgUrl]);

  //   console.log("selected product id", id);

  return (
    <NoteContext.Provider
      value={{
        id,
        setId,
        selectedCategoryId,
        setSelectedCategoryId,
        userId,
        setUserId,
        productImgUrl,
        setproductImgUrl,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
