import React from "react";
import "./App.css";
// import Home from "./pages/Home";
import Header from "./components/Header";
import AirportsApi from "./components/AirportsApi";
// import Header from "./components/Header";
// import Login from "./pages/Login";
// import bannerImage from "./images/banner-1.png";

function App() {
  return (
    <>
      <Header />
      <AirportsApi />
      {/* <Login /> */}
      {/* <Home /> */}
      {/* <img src={bannerImage} alt="Sample" className="mb-4" /> */}
    </>
  );
}

export default App;
