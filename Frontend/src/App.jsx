import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import MySubmissions from './pages/MySubmissions'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

import { checkAuthStatus } from './store/authSlice'

function App() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route
            path="/my-submissions"
            element={
              <ProtectedRoute>
                <MySubmissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App








// import { Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import Projects from './pages/Projects'
// import ProjectDetail from './pages/ProjectDetail'
// import MySubmissions from './pages/MySubmissions'
// import AdminDashboard from './pages/AdminDashboard'
// import ProtectedRoute from './components/ProtectedRoute'
// import AdminRoute from './components/AdminRoute'

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/projects/:id" element={<ProjectDetail />} />
//           <Route 
//             path="/my-submissions" 
//             element={
//               <ProtectedRoute>
//                 <MySubmissions />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/admin" 
//             element={
//               <AdminRoute>
//                 <AdminDashboard />
//               </AdminRoute>
//             } 
//           />
//         </Routes>
//       </main>
//     </div>
//   )
// }

// export default App
