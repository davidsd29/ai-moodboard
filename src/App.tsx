import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { LandingPage, GeneratePage, LoadingPage, ResultPage, ErrorPage } from "./pages";

const App = () => {

  return (
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="//api/generate-palette" element={<GeneratePage />} />
          <Route path="/loading" element={<LoadingPage />} />
          {/* maak het later protected */}
          <Route path="/results" element={<ResultPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
  );
}

export default App;