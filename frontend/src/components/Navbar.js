import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div>
      <header className='main-header'>
        <img
          className='image'
          src='https://flowbite.com/docs/images/logo.svg'
          alt='MoneyFlow'
        />
        <h2 className='title'>Moneyflow</h2>
      </header>
    </div>
  );
};

export default Navbar;
