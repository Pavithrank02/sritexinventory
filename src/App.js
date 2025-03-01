import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChannelPattaForm from "./components/ChannelPattaForm";
import DeliveryChallanForm from "./components/DeliveryChallanForm";
import NutBoltsForm from "./components/NutBoltsForm";
import Home from "./view/Home";
import SheetForm from "./components/SheetForm";
import { SidebarDemo } from "./components/SideComponent";
import Dashboard from "./components/DashBoard";

function App() {
  return (
    <div>
      <Routes>
        
        <Route index element={< Home/>} />
        <Route path="sheets" element={<SheetForm />} />
        <Route path="channel" element={<ChannelPattaForm />} />
        <Route path="dc" element={<DeliveryChallanForm />} />
        <Route path="nuts" element={<NutBoltsForm />} />
      </Routes>
    </div>
  );
}

export default App;
