import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/authContext";

import LoginPage from "./pages/loginPage"

function App() {

  return (
    <BrowserRouter>

      <AuthProvider>

        <LoginPage />

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;