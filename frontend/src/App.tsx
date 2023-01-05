import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { CrudPage } from "./pages/CRUDPage";
import { Home } from "./components/Home";
import { ListPage } from "./pages/ListPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";
import { RandomDog } from "./pages/RandomDogPage";
import { StatusCodePage } from "./pages/StatusCodePage";
import "./style/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/listPage" element={<PrivateRoute><ListPage /></PrivateRoute>} />
        <Route path="/randomDog" element={<RandomDog />} />
        <Route path="/statusCode" element={<StatusCodePage />} />
        <Route path="/crudPage" element={<CrudPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
