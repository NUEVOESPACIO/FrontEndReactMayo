import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import MainLayout from "./layouts/MainLayout";
import LoginLayoutPage from "./pages/LoginLayoutPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<LoginLayoutPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
