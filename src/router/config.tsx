import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "@/components/feature/Layout";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import About from "../pages/about/page";
import ServicesPage from "../pages/services/page";
import ServiceDetail from "../pages/services/ServicesDetail";
import TrackPage from "../pages/track/page";
import ContactPage from "../pages/contact/page";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminEnquiries from "@/pages/admin/Enquiries";
import AdminEnquiryDetail from "@/pages/admin/EnquiryDetail";
import AdminOrders from "@/pages/admin/Orders";
import AdminOrderDetail from "@/pages/admin/OrderDetail";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about-us", element: <About /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/services/:slug", element: <ServiceDetail /> },
      { path: "/track-order", element: <TrackPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "enquiries", element: <AdminEnquiries /> },
      { path: "enquiries/:id", element: <AdminEnquiryDetail /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "orders/:id", element: <AdminOrderDetail /> },
    ],
  },
];

export default routes;