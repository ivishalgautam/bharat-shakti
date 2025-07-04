export function Step({ index, currentStep, label, isLastStep }) {
  const isCompleted = currentStep > index;
  const isActive = currentStep === index;

  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            isCompleted
              ? "bg-primary text-primary-foreground"
              : isActive
                ? "border-2 border-primary text-primary"
                : "border-2 border-muted-foreground text-muted-foreground"
          }`}
        >
          {isCompleted ? "✓" : index + 1}
        </div>
        <span
          className={`mt-1 text-xs ${
            isActive
              ? "font-medium text-primary"
              : isCompleted
                ? "text-primary"
                : "text-muted-foreground"
          }`}
        >
          {label}
        </span>
      </div>
      {!isLastStep && (
        <div
          className={`h-0.5 w-12 sm:w-24 ${isCompleted ? "bg-primary" : "bg-muted-foreground/30"}`}
        />
      )}
    </div>
  );
}
