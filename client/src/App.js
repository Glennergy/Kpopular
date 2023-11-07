import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthFailPage from "./pages/AuthFail";
import HomePage from "./pages/HomePage";
import Header from "./components/Header/Header";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth-fail" element={<AuthFailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
