import "./index.css";
import { Home, Login, Signup, Notification, Profile } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { SideNav } from "./components/SideNav";

function App() {
  return (
    <>
      {/* <Header />
      <SideNav /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
