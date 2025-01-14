import "../App.css";

import { Link } from "react-router-dom";

// import github from "../../../assets/GitHub.svg";
// import linkedin from "../../../assets/LinkedIn.svg";

export default function Footer() {
  return (
    <footer>

      <div id="contributors">
        <h3>Site Contributors</h3>
        <div className="contributors-row">
          <div className="name-row">
            <h5>Shane Browning</h5>
          </div>
          <div className="name-row">
            <h5>Kevin Lewis</h5>
          </div>
        </div>
        <div className="contributors-row">
          <div className="name-row">
            <h5>Newman Porter</h5>
          </div>
          <div className="name-row">
            <h5>Oswaldo O. Felix Thompson</h5>
          </div>
        </div>

      </div>

      {/* If we decide to link to a contact form in footer... */}
      <div id="contact-us">
        <h5>For any questions please click the link below</h5>
        <Link
          to="Contact"
          className="footer-link"
          alt="Links to the 'Contact' page."
        >
          <h5><span>Click here to contact us.</span></h5>
        </Link>
      </div>
    </footer>
  );
}
