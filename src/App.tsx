import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
