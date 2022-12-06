import { useState } from 'react';

// packages
import { Route, Routes } from 'react-router-dom';

// layout
import Layout from './layout';

// Screens
import Home from './screens/Home';
import Product from './screens/Product';

// styles
import './styles/globals.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
