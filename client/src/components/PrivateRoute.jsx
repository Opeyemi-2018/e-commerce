import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = () => {
    let {loggedInUser} = useSelector((state) => state.user)
  return (
    loggedInUser && loggedInUser.isAdmin ? <Outlet/> : <Navigate to={'/unauthorized'}/>
  )
}

export default PrivateRoute