import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, NavLink, Outlet, Route, Routes } from 'react-router'
import './index.css'

import Slider from './component/Slider'

function App() {

  return (
    <div className='h-lvh overflow-hidden flex flex-col justify-between'>
      <header className='fixed top-0 w-full text-center py-4'>
        <h1 className='text-3xl font-bold'>Plot-Twist</h1>
      </header>

      <Outlet />

      {/* <footer className='fixed bottom-0 w-full'>
        <nav className='flex justify-between items-center'>
          <NavLink className='p-8' to='.'>
            <i className='fa text-xl fa-home'></i>
          </NavLink>
          <NavLink className='p-8' to='.'>
            <i className='fa text-xl fa-search'></i>
          </NavLink>
          <NavLink className='p-8' to='.'>
            <i className='fa text-xl fa-plus'></i>
          </NavLink>
          <NavLink className='p-8' to='.'>
            <i className='fa text-xl fa-commenting'></i>
          </NavLink>
          <NavLink className='p-8' to='.'>
            <i className='fa text-xl fa-user'></i>
          </NavLink>
        </nav>
      </footer> */}
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/plot-twist/' element={<App />}>
          <Route path='' element={<Slider />} />
        </Route>
        {/* <Route path="credits" element={<Credits />} /> */}

        <Route path='*' element={<Navigate to='/plot-twist/' replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
