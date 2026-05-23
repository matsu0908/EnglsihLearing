import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <h1>English Learning App</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/notebook">Notebook</Link>
        <Link to="/quiz">Quiz</Link>
      </nav>
    </header>
  );
}

export default Header;
