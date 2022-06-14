import { Navigate } from "react-router-dom";
import { AuthContext, useContext } from "./context";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
