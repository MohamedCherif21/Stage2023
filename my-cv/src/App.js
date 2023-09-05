import logo from './logo.svg';
import './App.css';
import { Button, Space } from 'antd';
import { BrowserRouter, Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Templates from './Pages/templates';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Admin from './Pages/Admin';



function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
        <Route path='/admin' element={<ProtectedAdminRoute><Admin/></ProtectedAdminRoute>}/>



          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/templates/:id' element={<ProtectedRoute><Templates /></ProtectedRoute>} />
          <Route path='/reset-password/:id' element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>




      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedAdminRoute(props) {
  const user = JSON.parse(localStorage.getItem("my-cv-users"));
  if (user.data.firsName === "admin") {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}



export function ProtectedRoute(props) {
  if (localStorage.getItem("my-cv-users")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}