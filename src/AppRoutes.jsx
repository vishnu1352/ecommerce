import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Items from './components/Items';
import ReconfirmPage from './components/ReconfirmPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Items />} />
      <Route path="/reconfirm" element={<ReconfirmPage />} />
    </Routes>
  )
}

export default AppRoutes