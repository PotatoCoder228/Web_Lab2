const canvas = document.getElementById("graph"),
    ctx = canvas.getContext('2d');

canvas.height = canvas.width;
let w = canvas.width, h = canvas.height;

const hatchWidth = 20 / 2;
const baseHatchGap = 30;
var hatchGap = 20;
var rValue = 1;


function redrawGraph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';

    // y axis
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 - 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 + 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.closePath();

    // x axis
    ctx.beginPath();
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 - 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 + 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(0, h / 2);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap * 2);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap * 2);
    ctx.moveTo(w / 2 - hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 - hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap * 2, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap * 2, h / 2 + hatchWidth);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = 'rgba(80,92,236,0.33)';
    ctx.beginPath();
    ctx.moveTo(w / 2 - hatchGap, h / 2);
    ctx.lineTo(w / 2 - hatchGap, h / 2 - 2 * hatchGap);
    ctx.lineTo(w / 2, h / 2 - 2 * hatchGap);
    ctx.lineTo(w / 2, h / 2 - hatchGap);
    ctx.arc(w / 2, h / 2, hatchGap, 0, 1 / 2 * Math.PI, false);
    ctx.lineTo(w / 2, h / 2 + hatchGap);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(w / 2 - hatchGap, h / 2);

    ctx.fill();
    ctx.strokeStyle = '#0115fd';
    ctx.stroke();
    ctx.closePath();

    const axisFontSize = baseHatchGap / 2;
    var fontSize = hatchGap / 3.5;
    if (fontSize < 10) fontSize = 10;
    ctx.fillStyle = 'black';

    ctx.font = `500 ${axisFontSize * 1.4}px Roboto`;
    ctx.fillText('y', w / 2 - hatchWidth * 2.8, 15)
    ctx.fillText('x', w - 20, h / 2 - hatchWidth * 2.4)

    let label1, label2;
    if (isNaN(rValue)) {
        label1 = rValue + '/2'
        label2 = rValue
    } else {
        label1 = rValue / 2
        label2 = rValue
    }

    ctx.font = `800 ${fontSize}px Roboto`;
    ctx.fillText(label1, w / 2 + hatchGap - 3, h / 2 + hatchWidth * 2.8);
    ctx.fillText(label2, w / 2 + hatchGap * 2 - 3, h / 2 + hatchWidth * 2.8);
    ctx.fillText('-' + label1, w / 2 - hatchGap - 7, h / 2 + hatchWidth * 2.8);
    ctx.fillText('-' + label2, w / 2 - hatchGap * 2 - 7, h / 2 + hatchWidth * 2.8);

    ctx.fillText(label1, w / 2 + hatchWidth * 2, h / 2 - hatchGap + 3);
    ctx.fillText(label2, w / 2 + hatchWidth * 2, h / 2 - hatchGap * 2 + 3);
    ctx.fillText('-' + label1, w / 2 + hatchWidth * 2, h / 2 + hatchGap + 3);
    ctx.fillText('-' + label2, w / 2 + hatchWidth * 2, h / 2 + hatchGap * 2 + 3);

}

// draw graph with standard label

function printDotOnGraph(xCenter, yCenter, isHit) {

    ctx.fillStyle = isHit ? 'green' : 'red'
    let x = w / 2 + xCenter * hatchGap * (2 / rValue) - 3, y = h / 2 - yCenter * hatchGap * (2 / rValue) - 3;
    ctx.fillRect(x, y, hatchGap / 10, hatchGap / 10);
}

/*
window.addEventListener('resize', (e)=>{
        w=canvas.clientWidth;
        h=canvas.clientHeight;
});*/
function getMousePosition(e) {
    var rect = canvas.getBoundingClientRect();

    var mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
    var mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
    return {x: mouseX, y: mouseY};
}

canvas.addEventListener('click', (event) => {
    removeValidation();
    if (!isNaN(rValue)) {
        const x = getMousePosition(event).x;
        const y = getMousePosition(event).y;
        const xCenter = Math.round((x - w / 2) / (hatchGap * (2 / rValue)) * 100) / 100,
            yCenter = Math.round((h / 2 - y) / (hatchGap * (2 / rValue)) * 100) / 100;
        console.log(xCenter, yCenter);

        if (xCenter >= 3 || xCenter <= -3) {
            alert("x coordinate out of range(-3,3)");
            return;
        }
        if (yCenter >= 4 || yCenter <= -4) {
            alert("y coordinate out of range(-4,4)");
            return;
        }
        const params = {
            'x': xCenter,
            'y': yCenter,
            'r': rValue,
            'timezone': new Date().getTimezoneOffset()
        }
        $.ajax({
        url: 'control', method: "POST",
        data: $(this).serialize() + "&timezone=" + new Date().getTimezoneOffset(),
        dataType: "html",

        success: function (data) {
            console.log(data);
            $(".validate_button").attr("disabled", false);
            const params = {
                'x': xCoordinate.value,
                'y': yCoordinate.value,
                'r': rCoordinate.value,
                'timezone': new Date().getTimezoneOffset()
            }

            window.location.replace("control" + formatParams(params));
            //window.localStorage.setItem("table",data["table"]);
            //window.location.replace("result_page.jsp");
            //$("#result_table>tbody").html(data);
        },
        error: function (error) {
            console.log(error);
            $(".validate_button").attr("disabled", false);
        },
    });
    } else {
        alert("Error: R field is incorrect!")
    }
});
$("select").on('click', function(event) {
  console.log(rCoordinate.value);
  rValue = rCoordinate.value;
  redrawDataOnGraph();
});