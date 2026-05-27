import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../components/layout/MainLayout'; // Or your layout's exact folder path

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Login sits standalone - no sidebars, no topbars, no lock icons! */}
      <Route path="/login" element={<Login />} />
      
      {/* 2. Dashboard is cleanly wrapped inside the MainLayout structure */}
      <Route 
        path="/dashboard" 
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } 
      />
      
      {/* Automatic Fallback Hooks */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;