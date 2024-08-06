import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import IndexPage from './pages/dairy/index'

import './index.css'
import { ChartIndexPage } from './pages/chart'
import { DetailPage } from './pages/dairy/detail'
import { CreatePage } from './pages/dairy/create'
import { EditPage } from './pages/dairy/edit'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
    path: '/diary/new/:type',
    element: <CreatePage />,
  },
  {
    path: '/diary/:diaryId/edit',
    element: <EditPage />,
  },
  {
    path: '/chart',
    element: <ChartIndexPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </React.StrictMode>
)
