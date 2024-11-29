import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import SignInPage from "./pages/auth/signin/SignInPage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import Sidebar from "./component/svgs/common/SideBar"
import RightPanel from "./component/svgs/common/RightPanel"
import NotificationPage from "./pages/notifications/NotificationPage"
import ProfilePage from "./pages/profile/ProfilePage"
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "./component/svgs/common/LoadingSpinner"


function App() {
  const {data:authUser, isLoading, error, isError} = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if(data.error) return null;
        if(!res.ok) {
          throw new Error(data.error || "something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error)
      }
    },
    retry: false,
  })

  // if(!isLoading) {
  //   return (
  //     <div className="h-screen flex justify-center items-center">
  //       <LoadingSpinner size="lg"/>
  //     </div>
  //   )
  // }

  
  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Sidebar/>}
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <SignInPage/> : <Navigate to="/"/>}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/notifications" element={authUser ? <NotificationPage/> : <Navigate to="/login"/>}/>
        <Route path="/profile/:username" element={authUser ? <ProfilePage/> : <Navigate to="/login" />}/>
      </Routes>
      {authUser && <RightPanel/>}
      <Toaster/>
    </div>
  )
}

export default App


// return (
//   <div className="flex max-w-6xl mx-auto">
//     <Sidebar/>
//     <Routes>
//       <Route path="/" element={<HomePage/>} />
//       <Route path="/login" element={<SignInPage/>}/>
//       <Route path="/signup" element={<SignUpPage/>}/>
//       <Route path="/notifications" element={<NotificationPage/>}/>
//       <Route path="/profile/:username" element={<ProfilePage/>}/>
//     </Routes>
//     <RightPanel/>
//     <Toaster/>
//   </div>
// )
// }

// export default App;

































// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App




