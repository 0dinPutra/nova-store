import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-number">404</div>

        <h1>Oops! Page not found.</h1>

        <p>
          Looks like this page went on a little shopping trip and
          never came back. Let's get you back to the store.
        </p>

        <Link to="/" className="primary-button">
          <ArrowLeft size={16} />
          Back to NOVA
        </Link>
      </div>
    </main>
  );
}

export default NotFound;