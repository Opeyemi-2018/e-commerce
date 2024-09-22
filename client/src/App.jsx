// App.jsx
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Dashboard from "./pages/Admin-Dashboard";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import ProductInfo from "./pages/ProductInfo";
import CreateProduct from "./pages/CreateProduct";
import Unauthorized from "./pages/Unauthorized";
import UpdateProduct from "./pages/UpdateProduct";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Main App Component that sets up the Router
const App = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <BrowserRouter>
      {/* MainApp component is used here and it is defined in the same file */}
      <MainApp showNav={showNav} setShowNav={setShowNav} />
    </BrowserRouter>
  );
};

// MainApp Component handles the rendering logic and routes
const MainApp = () => {
  const location = useLocation(); // Hook is now inside BrowserRouter context

  // Determine if the current path is '/dashboard'
  const isDashboard = location.pathname === "/admin-dashboard";

  return (
    <>
      <ScrollToTop />
      {/* Conditionally render Header based on the current route */}
      {!isDashboard && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route
            path="/update-product/:productId"
            element={<UpdateProduct />}
          />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductInfo />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* Conditionally render Footer based on the current route */}
      {!isDashboard && <Footer />}
    </>
  );
};

export default App;
