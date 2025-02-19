import "./App.css";
import FloatingShape from "./components/FloatingShape";
import { Navigate, Route,Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage"
import EmailVerificationPage from "./pages/EmailVerificationPage";
import {Toaster} from 'react-hot-toast'
import { Children, useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner"

//protect routes that require authentication
const ProtectedRoutes=({children})=>{
  const {isAuthenticated,user}=useAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  if(!user.isVerified){
    return <Navigate to="/verify-path" replace/>
  }

  return children;
}

const RedirectAuthenticatedUser=({children})=>{
  const {isAuthenticated,user}=useAuthStore();
  
  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace/>
  }

  return children;
}

function App() {
  const {isCheckingAuth,checkAuth,isAuthenticated,user}=useAuthStore();
 
 useEffect(()=>{
  checkAuth()
 },[checkAuth]);

 console.log("isAuthenticated",isAuthenticated);
 console.log("user",user);

 if(isCheckingAuth) return <LoadingSpinner/>

  return (
    <div className="min-h-screen bg-gradient-to-br 
      from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden
    ">
      <FloatingShape color="bg-green-500" size='w-64 h-64' top='-5%' left='10%' delay={0}/>
      <FloatingShape color="bg-green-500" size='w-48 h-64' top='70%' left='80%' delay={5}/>
      <FloatingShape color="bg-green-500" size='w-32 h-32' top='40%' left='10%' delay={2}/>
    
    <Routes>
      
      <Route path="/" element={
        <ProtectedRoutes>
          <DashboardPage/>
        </ProtectedRoutes>
      }/>
      <Route path="/signup" element={
        <RedirectAuthenticatedUser>
          <SignUpPage/>
        </RedirectAuthenticatedUser>
      }/>
      <Route path="/login" element={      
        <RedirectAuthenticatedUser>
         <LoginPage/>
      </RedirectAuthenticatedUser>
      }/>

      <Route path="/verify-path" element={<EmailVerificationPage/>}/>
    </Routes>
      <Toaster />
    </div>
  );
}

export default App;
