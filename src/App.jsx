import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioSite from "./pages/PortfolioSite";
import AdminApp from "./admin/AdminApp";
import { PortfolioDataProvider } from "./context/PortfolioDataContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PortfolioDataProvider>
              <PortfolioSite />
            </PortfolioDataProvider>
          }
        />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
