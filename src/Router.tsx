import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={"/"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
