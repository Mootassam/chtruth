import { Redirect, Route } from "react-router-dom";
import LayoutPage from "src/view/layout/LayoutPage";

function PublicRoute({ component: Component, ...reset }) {
  return (
    <Route
      {...reset}
      render={(props) => {

        return <LayoutPage> <Component {...props} /> </LayoutPage>;
      }}
    />
  );
}

export default PublicRoute;
