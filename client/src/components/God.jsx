import App from "../App";
import LandingPage from "./LandingPage";
import NotFound from "./NotFound";
const God = () => {
    let Component
    switch (window.location.pathname) {
        case '/':
            Component = LandingPage
            break;
        case '/app':
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
  