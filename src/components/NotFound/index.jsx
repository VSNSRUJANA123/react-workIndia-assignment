import "./index.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Not Found Page</h1>
      <Link to="/">
        <button>Go To Home </button>
      </Link>
    </div>
  );
};
export default NotFound;
