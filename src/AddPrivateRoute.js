import { Navigate } from "react-router-dom";
import { AuthContext, useContext } from "./context";

const AddPrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/signin" />;
};

export default AddPrivateRoute;
