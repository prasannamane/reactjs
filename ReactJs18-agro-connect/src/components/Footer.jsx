import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css'

const Footer = () => {
  return (
   <footer class="mt-3">
    <nav class="container">
      <div class='row'>
        <div class="col-2 text-start mt-auto mb-auto"><a href='/'><img src="/src/assets/img/tree-logo.webp" alt="logo" class="logo"></img></a></div>
        <div class="col-10 text-end mt-auto mb-auto"> 
          <a class="btn btn-light" href='/'>Home</a>
          <a class="ms-3 btn btn-light" href='/user-list'>User List</a>
          <a class="ms-3 btn btn-light" href='/signup-form'>SignUp</a>
        </div>
      </div>
     
    </nav>
   </footer>
  );
};

export default Footer;