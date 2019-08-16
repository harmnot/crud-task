import React from "react";

const ListTask = ({ name, title }) => {
  return (
    <>
      <div className="p-2 d-flex flex-wrap">
        <div className="p-2">
          <span> {title} </span>
        </div>
      </div>
    </>
  );
};

export default ListTask;
