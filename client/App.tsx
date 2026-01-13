import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import CategoryProducts from "./pages/CategoryProducts";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<CategoryProducts />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
