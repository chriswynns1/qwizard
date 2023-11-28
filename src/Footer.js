import React, {Component} from "react";
import './Footer.css';

function Footer() {
  return (
    <footer class="footer">
    <div class="copyright">
        <h4>Copyright Qwizard 2023</h4>
    </div>
    <div>
    <a href="mailto:"><button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Email Us!</button></a>
      </div>
      </footer>
  )
}

export default Footer;
