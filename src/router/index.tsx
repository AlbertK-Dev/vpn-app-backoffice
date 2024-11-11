
import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import VpnServerManager from "../pages/VpnServerManager";
import { useAuth } from "../hooks/useAuth";

const contentRouter = createBrowserRouter([
  {
    path: "/",
    element: <VpnServerManager/>
  },

]);

const authRouter = createBrowserRouter([
  {
    path:"/",
    element: <LoginPage/>
  }
])


export default function Router(){
  const {isAuthenticated} = useAuth();
 

  return <RouterProvider router={isAuthenticated ? contentRouter : authRouter}/>

}
