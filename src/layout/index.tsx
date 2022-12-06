import React from 'react';

// packages
import { Link, Outlet } from 'react-router-dom';

// const
const routes = [
  { name: 'Home', path: '/' },
  { name: 'product', path: '/product' },
];

export default function Layout() {
  return (
    <>
      <nav className='nav-container customContainer'>
        {routes.map(route => (
          <Link className='nav-link' key={route.name} to={route.path}>
            {route.name}
          </Link>
        ))}
      </nav>
      <main className='customContainer'>
        <Outlet />
      </main>
    </>
  );
}
