import { Route, Routes } from "react-router-dom"
import Index from "./components/Index"
import Options from "./components/Options"

export default function App() {
    return (
        <Routes>
            <Route path="/index.html" element={<Index />} />
            <Route path="/options.html" element={<Options />} />
        </Routes >
    )
}