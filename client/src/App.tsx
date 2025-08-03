import { Route, Routes } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import NoteFound from "./pages/NoteFound";
import Login from "./pages/Login";
import Register from "./pages/RegisterForm";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="contact" element={<h1>Contact</h1>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<NoteFound />} />
    </Routes>
  );
};

export default App;
