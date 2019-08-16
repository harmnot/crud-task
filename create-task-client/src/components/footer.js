import React from "react";

const Footer = () => {
  const styleId = {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    backgroundColor: "grey",
    color: "white",
    marginTop: "11px",
    padding: "4px",
    textAlign: "center"
  };
  return (
    <>
      <footer style={styleId}>
        <small>Copyright &copy; testTASK</small>
      </footer>
    </>
  );
};

export default Footer;
