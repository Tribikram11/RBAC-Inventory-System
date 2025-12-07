import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function Dashboard() {
  return <h2>Dashboard — Welcome!</h2>;
}

function ItemsPage() {
  return <h2>Items Page — View & Manage Inventory</h2>;
}

function AdminDashboard() {
  return <h2>Admin Panel — Manage Users</h2>;
}

function NotFound() {
  return <h2>404 — Page Not Found</h2>;
}

function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={Login} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/items" element={<ItemsPage />} />

        {/* Admin-only placeholder */}
        <Route path="/admin" element={<AdminDashboard />} />

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>


}

export default App
