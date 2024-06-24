import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Items from './components/Items';
import ReconfirmPage from './components/ReconfirmPage';
import AddItems from './components/admin/AddItems';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Items />} />
      <Route path="/reconfirm" element={<ReconfirmPage />} />
      <Route path="/additems" element={<AddItems />} />
    </Routes>
  )
}

export default AppRoutes