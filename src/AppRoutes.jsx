import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Items from './components/Items';
import ReconfirmPage from './components/ReconfirmPage';
import AddInventory from './components/admin/AddInventory';
import ViewInventory from './components/admin/viewInventory/ViewInventory';
import EditInventory from './components/admin/editInventory/EditInventory';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Items />} />
      <Route path="/reconfirm" element={<ReconfirmPage />} />
      <Route path="/addinventory" element={<AddInventory />} />
      <Route path="/viewinventory" element={<ViewInventory />} />
      <Route path="/editinventory" element={<EditInventory />} />
    </Routes>
  )
}

export default AppRoutes