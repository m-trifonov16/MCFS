import { forwardRef, useEffect, useImperativeHandle, useState, useCallback } from 'react';
import { Steps } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;

const Navigation = forwardRef((_props, ref) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const incrementStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const decrementStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  useImperativeHandle(ref, () => ({
    incrementStep,
    decrementStep,
  }));

  const navigateToStep = useCallback(
    (step: number) => {
      switch (step) {
        case 0:
          navigate('/personal-data');
          break;
        case 1:
          navigate('/contact-data');
          break;
        case 2:
          navigate('/household-data');
          break;
        case 3:
          navigate('/employment-income');
          break;
        case 4:
          navigate('/assets');
          break;
        case 5:
          navigate('/liabilities');
          break;
        case 6:
          navigate('/source-of-wealth');
          break;
        case 7:
          navigate('/notes');
          break;
        case 8:
          navigate('/documents');
          break;
        case 9:
          navigate('/consents');
          break;
        default:
          navigate('/step1');
      }
    },
    [navigate] // Важно добавить navigate как зависимость
  );

  useEffect(() => {
    navigateToStep(currentStep);
  }, [currentStep, navigateToStep]);

  const handleStepChange = (step: number) => {
    if (step > currentStep) {
      return;
    }

    setCurrentStep(step);
  };

  return (
    <Steps direction="vertical" current={currentStep} onChange={handleStepChange}>
      <Step title="Personal data" />
      <Step title="Contact data" />
      <Step title="Household data" />
      <Step title="Employment/income" />
      <Step title="Assets and investments" />
      <Step title="Liabilities" />
      <Step title="Source of wealth" />
      <Step title="Notes" />
      <Step title="Documents" />
      <Step title="Consents" />
    </Steps>
  );
});

export default Navigation;
