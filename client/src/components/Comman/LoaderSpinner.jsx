import React from "react";
import Loader from "react-loader-spinner";

const LoaderSpinner = () => {
  return (
    <div style={{ padding: 200 }}>
      {" "}
      <Loader
        type="Rings"
        color="red"
        height={100}
        width={100}
        //3 secs
      />
    </div>
  );
};

export default LoaderSpinner;
