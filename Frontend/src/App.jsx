import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ViewerDashboard from "./pages/ViewerDashboard";
import ItemsPage from "./pages/ItemsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddItem from "./pages/AddItem";
import Login from "./pages/Login";


function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={Login} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/items" element={<ItemsPage />} />

        {/* Admin-only placeholder */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/viewer" element={<ViewerDashboard />} />
        <Route path="/items/add" element={<AddItem />} />

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>


}

export default App
