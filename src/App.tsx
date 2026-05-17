import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} />        
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
