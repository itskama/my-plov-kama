import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import DishDetail from "./pages/dishDetail/dishDetail";
import EditDish from "./pages/editDish/editDish";
import DishPage from "./pages/dishPage/dishPage";
import Header from "./components/header/header";
import CheckoutPage from "./pages/checkoutPage/checkoutPage";
import OrdersPage from "./pages/orderPage/orderPage";
import BasketPage from "./pages/basket/basket";

console.log("App загружен");

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dishes/:id" element={<DishDetail />} />
                    <Route path="/dishes/:id/edit" element={<EditDish />} />
                    <Route path="/add-dish" element={<DishPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/basket" element={<BasketPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;