import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavBarElements';


const Navbar = () => {
    return (
      <>
        <Nav>
          <NavLink to='/'>
              <img alt=" " src={require("./logo.png").default}
                height="30" width="30"
              />
              Essay Generator
          </NavLink>
          <Bars />
          <NavMenu>
            <NavLink to='/about' activeStyle>
              About
            </NavLink>
            <NavLink to='/services' activeStyle>
              Services
            </NavLink>
            <NavLink to='/contact-us' activeStyle>
              Contact Us
            </NavLink>
            <NavLink to='/sign-up' activeStyle>
              Sign Up
            </NavLink>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to='/login'>Log In</NavBtnLink>
          </NavBtn>
        </Nav>
      </>
    );
  };
  
  export default Navbar;