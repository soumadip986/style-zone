import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { DepartmentPage } from './pages/DepartmentPage';
import { ProductDetails } from './pages/ProductDetails';
import { SearchPage } from './pages/SearchPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Products } from './pages/admin/Products';
import { ProductForm } from './pages/admin/ProductForm';
import { Categories } from './pages/admin/Categories';
import { Collections } from './pages/admin/Collections';
import { Enquiries } from './pages/admin/Enquiries';
import { HomepageSettings } from './pages/admin/HomepageSettings';
import { MediaLibrary } from './pages/admin/MediaLibrary';
import { StoreSettings } from './pages/admin/StoreSettings';
import { WhatsAppSettings } from './pages/admin/WhatsAppSettings';
import { AdminProfile } from './pages/admin/AdminProfile';
import { useAuth } from './context/AuthContext';

function ProtectedAdminRoute({ children }) {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1117', color: '#fff' }}>
        <p>Verifying secure admin authorization...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export function App() {
  return (
    <Routes>
      {/* Customer Facing Routes */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/department/:dept"
        element={
          <Layout>
            <DepartmentPage />
          </Layout>
        }
      />
      <Route
        path="/product/:slug"
        element={
          <Layout>
            <ProductDetails />
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/collections"
        element={
          <Layout>
            <CollectionsPage />
          </Layout>
        }
      />
      <Route
        path="/collections/:category"
        element={
          <Layout>
            <CollectionsPage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <ContactPage />
          </Layout>
        }
      />

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Console Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id/edit" element={<ProductForm />} />
        <Route path="categories" element={<Categories />} />
        <Route path="collections" element={<Collections />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="homepage" element={<HomepageSettings />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="settings" element={<StoreSettings />} />
        <Route path="whatsapp" element={<WhatsAppSettings />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
