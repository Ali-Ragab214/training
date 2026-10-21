import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import Layout from './components/layout/Layout.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import WorkoutPage from './pages/WorkoutPage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="workout/:dayId" element={<WorkoutPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </MotionConfig>
    </BrowserRouter>
  )
}
