import App from "../App";
import LandingPage from "./LandingPage";
import NotFound from "./NotFound";
const God = () => {
    let Component
    switch (window.location.pathname) {
        case '/':
            Component = LandingPage
            break;
        // Case for /app and /app/*
        case '/app':
        case '/app/docstring':
            Component = App
            break;
        default:
            Component = NotFound
            break;
    }
    return (
        <Component/>
      
    );
  };
  
  export default God;
  