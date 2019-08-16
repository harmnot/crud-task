import React, { useContext, useEffect } from "react";
import { TaskContext } from "../contexts/taskContext.js";

const Home = () => {
  const { state, dispatch } = useContext(TaskContext);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="mx-auto">
          <img
            className="img-fluid"
            src="https://engineering.taboola.com/wp-content/uploads/2019/01/mtl_robot-796x408.jpg"
          />
        </div>
        <div className="mt-2 mb-5">
          <h2> MAKE YOUR TEAM WORK </h2>
        </div>
        <div className="d-flex flex-nowrap my-4">
          <div className="p-2">
            <p>
              {" "}
              Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
              Praesent sapien massa, convallis a pellentesque nec, egestas non
              nisi. Praesent sapien massa, convallis a pellentesque nec, egestas
              non nisi. Nulla porttitor accumsan tincidunt. Nulla quis lorem ut
              libero malesuada feugiat. Mauris blandit aliquet elit, eget
              tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam
              vehicula elementum sed sit amet dui. Sed porttitor lectus nibh.
              Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta
              dapibus. Pellentesque in ipsum id orci porta dapibus. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
              ullamcorper sit amet ligula. Nulla
            </p>
          </div>
          <div className="p-2">
            <p>
              {" "}
              Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
              Praesent sapien massa, convallis a pellentesque nec, egestas non
              nisi. Praesent sapien massa, convallis a pellentesque nec, egestas
              non nisi. Nulla porttitor accumsan tincidunt. Nulla quis lorem ut
              libero malesuada feugiat. Mauris blandit aliquet elit, eget
              tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam
              vehicula elementum sed sit amet dui. Sed porttitor lectus nibh.
              Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta
              dapibus. Pellentesque in ipsum id orci porta dapibus. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
              ullamcorper sit amet ligula. Nulla
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
