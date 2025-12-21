import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ViewerDashboard from "./pages/ViewerDashboard";
import ItemsPage from "./pages/ItemsPage";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import RegisterUser from "./pages/RegisterUser";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import LayOut from "./components/Layout";

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Authenticated users */}
        <Route element={<ProtectedRoute />}>
          <Route element={<LayOut />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/add" element={<AddItem />} />
            <Route path="/items/edit/:id" element={<EditItem />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/viewer" element={<ViewerDashboard />} />
          </Route>
        </Route>

        {/* Admin-only */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/register-user" element={<RegisterUser />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
