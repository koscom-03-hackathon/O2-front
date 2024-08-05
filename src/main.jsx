import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import IndexPage from './pages/dairy/index'

import './index.css'
import { ChartIndexPage } from './pages/chart'
import { DetailPage } from './pages/dairy/detail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/diary/:diaryId',
    element: <DetailPage />,
  },
  {
    path: '/chart',
    element: <ChartIndexPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
