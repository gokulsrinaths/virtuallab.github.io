document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  const totalSteps = 8;
  const instructions = [
    "Step 1: Drag the 100-mL Volumetric Flask to the drying oven.",
    "Step 2: Place the empty flask on the balance to weigh it.",
    "Step 3: Fill the flask with water up to the 100 mL mark using the water pipe.",
    "Step 4: Place the flask with water on the balance to weigh it.",
    "Step 5: Measure the water temperature using the thermometer.",
    "Step 6: Calculate the mass density of the liquid.",
    "Step 7: Calculate specific weight and specific gravity.",
    "Step 8: Heat water in Erlenmeyer Flask and repeat measurements."
  ];

  const stepExplanations = [
    "Success: The flask is dried and ready for weighing.",
    "Success: The empty flask weight (m1) is recorded.",
    "Success: Flask is filled with water up to 100 mL mark.",
    "Success: The weight with water (m2) is recorded.",
    "Success: Temperature of the water is recorded.",
    "Density calculation performed using the recorded values.",
    "Specific weight and specific gravity calculations performed.",
    "Experiment repeated with heated water, measurements recorded."
  ];

  const stepInstruction = document.getElementById("step-instruction");
  const stepOutput = document.getElementById("step-output");
  const resultsLog = document.getElementById("results-log");

  function updateInstructions() {
    stepInstruction.textContent = instructions[currentStep - 1];
    stepOutput.textContent = `Step ${currentStep}: ${instructions[currentStep - 1]}`;
  }

  // Drag and Drop Logic
  const draggables = document.querySelectorAll(".draggable");
  const dropZones = document.querySelectorAll(".drop-zone");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      const currentDraggable = document.querySelector(".dragging");
      if (currentDraggable && currentDraggable.dataset.step == currentStep) {
        zone.classList.add("valid-drop");
      }
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("valid-drop");
    });

    zone.addEventListener("drop", () => {
      const currentDraggable = document.querySelector(".dragging");
      if (currentDraggable && currentDraggable.dataset.step == currentStep && zone.dataset.step == currentStep) {
        zone.appendChild(currentDraggable);
        zone.classList.remove("valid-drop");

        // Display success message and move to next step
        stepOutput.textContent = stepExplanations[currentStep - 1];
        resultsLog.innerHTML += `<p>Step ${currentStep} completed: ${stepExplanations[currentStep - 1]}</p>`;

        if (currentStep < totalSteps) {
          currentStep++;
          updateInstructions();
        } else {
          stepOutput.textContent = "Experiment completed successfully!";
        }
      }
    });
  });

  // Initialize the instructions
  updateInstructions();
});
