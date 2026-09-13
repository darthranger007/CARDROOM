import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CardProvider } from "./context/CardContext";
import { EditorPage } from "./pages/EditorPage";
import { LandingPage } from "./pages/LandingPage";

export default function App() {
  return (
    <CardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </CardProvider>
  );
}
