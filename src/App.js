import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChannelPattaForm from "./components/ChannelPattaForm";
import DeliveryChallanForm from "./components/DeliveryChallanForm";
import NutBoltsForm from "./components/NutBoltsForm";
import SheetForm from "./components/SheetForm";
import Dashboard from "./components/DashBoard";
import SheetsDashboard from "./components/SheetsDashboard";
import MachineDashboard from "./components/MachineData";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={< Dashboard/>} />
        <Route path="sheets" element={<SheetForm />} />
        <Route path="machine" element={<MachineDashboard />} />
        <Route path="channel" element={<ChannelPattaForm />} />
        <Route path="dc" element={<DeliveryChallanForm />} />
        <Route path="nuts" element={<NutBoltsForm />} />
      </Routes>
    </div>
  );
}

export default App;
