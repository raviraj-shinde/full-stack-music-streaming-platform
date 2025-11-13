import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AddAlbum from "./pages/AddAlbum";
import AddSong from "./pages/AddSong";
import ListAlbum from "./pages/ListAlbum";
import ListSong from "./pages/ListSong";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

export const API_BASE_URL = "http://localhost:8080";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        {/* Application Routes */}
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* ✅ Protected Admin Routes */}
          <Route
            path="/add-song"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AddSong />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-songs"
            element={
              <ProtectedRoute requireAdmin={true}>
                <ListSong />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-album"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AddAlbum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-albums"
            element={
              <ProtectedRoute requireAdmin={true}>
                <ListAlbum />
              </ProtectedRoute>
            }
          />

          {/* Default & Fallback */}
          <Route path="/" element={<Login />} />
          <Route
            path="*"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AddSong />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
