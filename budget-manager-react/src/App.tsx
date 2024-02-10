import { Route, Routes } from "react-router-dom"
import Popup from "./components/Popup"
import Options from "./components/Options"

export default function App() {
    return (
        <Routes>
            <Route path="/popup.html" element={<Popup />} />
            <Route path="/options.html" element={<Options />} />
        </Routes >
    )
}