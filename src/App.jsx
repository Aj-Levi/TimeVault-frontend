import { MainLayout } from "./Components/MainLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { EarthPage } from "./pages/earthPage/EarthPage";
import EventPage from "./pages/EventPage";
import SearchPage from "./pages/SearchPage";
import Contribute from "./components/ContributionPage/Contribute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/globe" element={<EarthPage />} />
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/contribute" element={<Contribute />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
