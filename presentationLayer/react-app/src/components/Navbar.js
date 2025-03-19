import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/Homepage">Homepage</Link></li>
        <li><Link to="/Cover_Letter">CoverLetter</Link></li>
        <li><Link to="/Resume">Resume</Link></li>
        <li><Link to="/Login">LoginPage</Link></li>
        <li><Link to="/Signup">SignupPage</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;