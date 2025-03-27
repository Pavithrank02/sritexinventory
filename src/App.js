import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChannelPattaForm from "./components/forms/ChannelPattaForm";
import DeliveryChallanForm from "./components/forms/DeliveryChallanForm";
import NutBoltsForm from "./components/forms/NutBoltsForm";
import SheetForm from "./components/forms/SheetForm";
import Dashboard from "./components/dashboards/DashBoard";
import SheetsDashboard from "./components/dashboards/SheetsDashboard";
import BoltNutMachine from "./components/dashboards/BoltNutMachine";
import DemoBoltNutMachine from "./components/dashboards/DemoBoltNutMachine";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={< Dashboard/>} />
        <Route path="/demonut" element={< DemoBoltNutMachine/>} />
        <Route path="/sheetdashboard" element={< SheetsDashboard/>} />
        <Route path="sheets" element={<SheetForm />} />
        {/* <Route path="machine" element={<BoltNutMachine />} /> */}
        <Route path="channel" element={<ChannelPattaForm />} />
        <Route path="dc" element={<DeliveryChallanForm />} />
        <Route path="nuts" element={<NutBoltsForm />} />
      </Routes>
    </div>
  );
}

export default App;
