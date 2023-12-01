import React from 'react';

interface WizardContextType {
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
  activeStep: number;
  stepCount: number;
}

export const WizardContext = React.createContext<WizardContextType>({
  nextStep: () => {},
  prevStep: () => {},
  resetSteps: () => {},
  activeStep: 0,
  stepCount: 0,
});

interface WizardContainerProps {
  children: React.ReactNode;
  stepCount: number;
}

export const WizardContainer = (props: WizardContainerProps) => {
  const { children, stepCount } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  const nextStep = () => setActiveStep(Math.min(activeStep + 1, stepCount));

  const prevStep = () => setActiveStep(Math.max(activeStep - 1, 0));

  const resetSteps = () => setActiveStep(0);
  // const nextStep = React.useCallback(
  //   () => setActiveStep(Math.min(activeStep + 1, stepCount)),
  //   [activeStep, stepCount]
  // );
  //
  // const prevStep = () =>
  //   React.useCallback(
  //     () => setActiveStep(Math.max(activeStep - 1, 0)),
  //     [activeStep, stepCount]
  //   );
  //
  // const resetSteps = React.useCallback(() => setActiveStep(0), []);

  return (
    <WizardContext.Provider
      value={{
        activeStep,
        stepCount,
        nextStep,
        prevStep,
        resetSteps,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
