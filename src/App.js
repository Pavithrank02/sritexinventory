import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChannelPattaForm from "./components/forms/ChannelPattaForm";
import DeliveryChallanForm from "./components/document/DeliveryChallanForm";
import NutBoltsForm from "./components/forms/NutBoltsForm";
import SheetForm from "./components/forms/SheetForm";
import Dashboard from "./components/dashboards/DashBoard";
import SheetsDashboard from "./components/dashboards/SheetsDashboard";
import BoltNutMachine from "./components/dashboards/BoltNutMachine";
import QuotationGenerator from "./components/document/QuotationGenerator";
import SprocketForm from "./components/forms/SprocketForm";
import ShaftPintGearForm from "./components/forms/ShaftPintGearForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={< Dashboard/>} />
        <Route path="/sheetdashboard" element={< SheetsDashboard/>} />
        <Route path="sheets" element={<SheetForm />} />
        <Route path="machine" element={<BoltNutMachine />} />
        <Route path="channel" element={<ChannelPattaForm />} />
        <Route path="dc" element={<DeliveryChallanForm />} />
        <Route path="nuts" element={<NutBoltsForm />} />
        <Route path="/quote" element={<QuotationGenerator />} />
        <Route path="/sprocket" element={<SprocketForm />} />
        <Route path="/shaft" element={<ShaftPintGearForm />} />
      </Routes>
    </div>
  );
}

export default App;
