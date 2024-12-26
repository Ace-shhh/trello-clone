import './App.scss'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login';
import UserWorkspaces from './pages/UserWorkspaces';
import Navbar from './components/Layout/Navbar';
import Board from './pages/Board';
import EditProfile from './components/Account/EditProfile';
import ProtectedRoute from './components/Routing/ProtectedRoute';
import { BoardContextProvider } from './context/BoardContext';
import { ColumnContextProvider } from './context/ColumnContext';
function App() {
  return (
    <div className='App'>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route 
          path='/'
          element={
            <Login/>
          }
          />
            
          <Route
          path='/userWorkspaces/:userId'
          element={
            <ProtectedRoute>
                <Navbar/>
                <UserWorkspaces/>
            </ProtectedRoute>
          }
          />

          <Route
          path='/board/:boardId'
          element={
            <ProtectedRoute>
              <BoardContextProvider>
                <ColumnContextProvider>
                  <Navbar/>
                  <Board/>
                </ColumnContextProvider>
              </BoardContextProvider>
            </ProtectedRoute>
          }
          />

          <Route
          path='/editProfile/:userId'
          element={
            <ProtectedRoute>
              <Navbar/>
              <EditProfile/>
            </ProtectedRoute>
          }
          />

        </Routes>
      </BrowserRouter>
      </AuthProvider> 
    </div>
  )
}

export default App
