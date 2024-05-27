import React from "react";

export default function Alert(props) {
  return (
    <div style={{ height: "30px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <strong>{props.alert.msg}</strong>
          {/* Uncomment the button below if you want a close button */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={props.onClose}
          ></button>
        </div>
      )}
    </div>
  );
}
