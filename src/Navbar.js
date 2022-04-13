import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul id="navbar">
        <li id="navbar">
          <Link to="/programmer">Programiści</Link>
        </li>
        <li id="navbar">
          <Link to="/raport">Raport</Link>
        </li>
        <li id="navbar">
          <Link to="/program">Program</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
