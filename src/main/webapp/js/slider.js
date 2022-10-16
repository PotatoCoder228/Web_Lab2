const slider = document.getElementById("resize_slider");

function resize() {
    if (slider.value > 0) hatchGap = baseHatchGap * (50 / (50 - slider.value));
    else if (slider.value < 0) hatchGap = baseHatchGap / (50 / (50 - (-1) * slider.value))
    redrawDataOnGraph();
}

slider.addEventListener('change', resize);