import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Manager from "./pages/Manager";
import Edit from "./pages/Edit";
import ViewItem from "./pages/ViewItem";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/item/:id" element={<ViewItem />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/novo" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
