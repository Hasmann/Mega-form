import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { useLocation, Outlet, Navigate } from "react-router-dom";

////
/////
/////
const VerifyAuth = ({ auth }) => {
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

const mapStateToProps = createStructuredSelector({
  auth: selectAuthToken,
});

export default connect(mapStateToProps)(VerifyAuth);
