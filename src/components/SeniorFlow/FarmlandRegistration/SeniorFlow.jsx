import { useState } from "react";
import Step1_Location from "./Step1_Location.jsx";
import Step2_Crop from "./Step2_Crop.jsx";
import Step3_Condition from "./Step3_Condition.jsx";
import Step4_Complete from "./Step4_Complete.jsx";
import "./SeniorFlow.css";

function SeniorFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: "",
    crop: "",
    condition: "",
  });

  const updateData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="SeniorFlowContainer">
      {step === 1 && (
        <Step1_Location onNext={() => setStep(2)} updateData={updateData} />
      )}
      {step === 2 && (
        <Step2_Crop
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
          updateData={updateData}
        />
      )}
      {step === 3 && (
        <Step3_Condition
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
          updateData={updateData}
        />
      )}
      {step === 4 && <Step4_Complete formData={formData} />}
    </div>
  );
}

export default SeniorFlow;
