document.addEventListener('DOMContentLoaded', () => {
  const draggables = document.querySelectorAll('.draggable');
  const dropZones = document.querySelectorAll('.drop-zone');
  let currentStep = 1;

  // Enable dragging for elements
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', draggable.id);
    });
  });

  // Enable dropping for drop zones
  dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      const droppedId = e.dataTransfer.getData('text');
      const droppedElement = document.getElementById(droppedId);

      // Only allow elements for the current step
      if (dropZone.dataset.step.includes(currentStep)) {
        dropZone.appendChild(droppedElement);
        showNextStep();
      } else {
        alert("Incorrect step. Complete the current instruction first.");
      }
    });
  });

  function showNextStep() {
    currentStep++;
    document.getElementById('step-instruction').textContent = `Step ${currentStep}: ${getStepInstruction(currentStep)}`;
    if (currentStep === 6) {
      enableCalculationButton();
    }
  }

  function getStepInstruction(step) {
    const instructions = [
      "Drag the 100-mL Volumetric Flask to the drying oven.",
      "Place the empty flask on the balance to weigh it.",
      "Fill the flask with water up to the 100 mL mark using the water pipe.",
      "Place the flask with water on the balance to weigh it.",
      "Measure the water temperature using the thermometer.",
      "Calculate the mass density of the liquid."
    ];
    return instructions[step - 1] || "Experiment complete.";
  }

  function enableCalculationButton() {
    document.getElementById('calculate-results').disabled = false;
  }

  // Show the density calculator section
  function showDensityCalculator() {
    document.getElementById("calculation-section").style.display = "block";
  }

  // Calculate density function
  function calculateDensity() {
    const m1 = parseFloat(document.getElementById('mass-empty').value);
    const m2 = parseFloat(document.getElementById('mass-with-liquid').value);
    const volume = parseFloat(document.getElementById('volume').value) / 1000;

    if (isNaN(m1) || isNaN(m2) || isNaN(volume) || volume <= 0) {
      alert("Please enter valid values for mass and volume.");
      return;
    }

    const density = (m2 - m1) / volume;
    document.getElementById('density-result').textContent = density.toFixed(3) + " g/mL";
    document.getElementById('value-m1').textContent = m1.toFixed(2);
    document.getElementById('value-m2').textContent = m2.toFixed(2);
    document.getElementById('value-v').textContent = (volume * 1000).toFixed(1);
  }

  window.showDensityCalculator = showDensityCalculator;
  window.calculateDensity = calculateDensity;
});
