import React from "react";
import "./Navbar.css";
import Logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <div>
      <header className='main-header'>
        <img className='image' src={Logo} alt='MoneyFlow' />
        <h2 className='title'>Stock Option Chain</h2>
      </header>
    </div>
  );
};

export default Navbar;
