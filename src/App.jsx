import { MainLayout } from "./Components/MainLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { EarthPage } from "./pages/earthPage/EarthPage";
import EventPage from "./pages/EventPage";
import SearchPage from "./pages/SearchPage";
import Contribute from "./components/ContributionPage/Contribute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import toast, { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
     <Toaster/>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/globe" element={<EarthPage />} />
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
