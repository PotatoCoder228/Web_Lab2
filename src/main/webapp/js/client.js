var form = document.querySelector('.request_form');
var validatedButton = document.querySelector('.send_button');
let xCoordinate = document.querySelector(".x_input");
let yCoordinate = document.querySelector(".y_input");
let rCoordinate = document.getElementById("r_value");
var table = [];

function isNumber(s) {
    let n = parseFloat(s.replace(',', '.'));
    return !isNaN(n) && isFinite(n);
}

function formatParams(params) {
    return "?&" + Object
        .keys(params)
        .map(function (key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}

//функция для генерации ошибок
function generateTip(text, color) {
    var tip = document.createElement('div');
    tip.className = 'tip';
    tip.style.color = color;
    tip.innerHTML = text;
    return tip;
}


var $checkbox = false;

//функция для очистки подсказок при повторной валидации
function removeValidation() {
    var tips = document.querySelectorAll('.tip')
    for (var i = 0; i < tips.length; i++) {
        tips[i].remove()
    }
}


// проверка значения в поле на попадание в заданный диапазон
function validateField(coordinate, min, max) {
    if (coordinate.value) {
        coordinate.value = coordinate.value.replace(',', '.');
        if (coordinate.value < min || coordinate.value > max || !isNumber(coordinate.value)) {
            var error = generateTip('Wrong number format', 'red')
            coordinate.parentElement.insertBefore(error, coordinate)
            return false;
        } else {
            let correct = generateTip('Correct data', 'green');
            coordinate.parentElement.insertBefore(correct, coordinate)
            return true;
        }
    }
    var error = generateTip('field is blank', 'red');
    coordinate.parentElement.insertBefore(error, coordinate);
    return false;
}

function validateCheckBox(coordinate, min, max) {
    if (coordinate.value) {
        if (coordinate.value < min || coordinate.value > max || !isNumber(coordinate.value) || !$checkbox) {
            var error = generateTip('Wrong number format', 'red')
            coordinate.parentElement.insertBefore(error, coordinate)
            return false;
        } else {
            let correct = generateTip('Correct data', 'green');
            coordinate.parentElement.insertBefore(correct, coordinate)
            return true;
        }
    }
    var error = generateTip('field is blank', 'red');
    coordinate.parentElement.insertBefore(error, coordinate);
    return false;
}

function validateAll() {
    return validateField(xCoordinate, -3, 3) && validateCheckBox(yCoordinate, -4, 4)
}

function redrawDataOnGraph() {
    redrawGraph();
    if (table.length > 0) {
        for (var i = 0; i < table.length; i++) {
            var point = table[i];
            printDotOnGraph(point.x, point.y, point.hit);
        }
    }
}

$(document).ready(function () {
    resize();
    table = [];
    $(".results").each(function (i, el) {
        var self = $(this);
        var x = self.find("#x").text().trim();
        var y = self.find("#y").text().trim();
        var r = self.find("#r").text().trim();
        var hit = self.find("#hit").text().trim() == "hit" ? true : false;
        var result = `${x}, ${y}, ${r}, ${hit}`;
        console.log(result);
        var raw = {x: x, y: y, r: r, hit: hit};
        table[i] = raw;
    });
    if (table.length > 0) rValue = table[table.length - 1].r;
    rValue = rValue = rCoordinate.value;
    redrawDataOnGraph(rValue);

});


$("#form").on("submit", function (event) {
    event.preventDefault();

    console.log("Got data for check!");
    removeValidation();

    if (!validateAll()) {
        console.log("post canceled")
        return
    }
    console.log("data sending...")
    const params = {
        'x': xCoordinate,
        'y': yCoordinate,
        'r': rCoordinate,
        'timezone': new Date().getTimezoneOffset()
    }
    $.ajax({
        url: 'control', method: "POST",
        data: $(this).serialize() + "&timezone=" + new Date().getTimezoneOffset(),
        dataType: "html",

        success: function (data) {
            console.log(data);
            $(".validate_button").attr("disabled", false);

            window.location.replace("result_page.jsp");
            //window.localStorage.setItem("table",data["table"]);
            //window.location.replace("result_page.jsp");
            //$("#result_table>tbody").html(data);
        },
        error: function (error) {
            console.log(error);
            $(".validate_button").attr("disabled", false);
        },
    });
});

$(".reset_button").on("click", function (e) {
    e.preventDefault();
    const params = {'clear': true}
    $.ajax({
        url: 'control', method: "POST",
        data: formatParams(params),
        dataType: "html",

        success: function (data) {
            console.log(data);
            $(".validate_button").attr("disabled", false);

            window.location.replace("control" + formatParams(params));
            //window.localStorage.setItem("table",data["table"]);
            //window.location.replace("result_page.jsp");
            //$("#result_table>tbody").html(data);
        },
        error: function (error) {
            console.log(error);
            $(".reset_button").attr("disabled", false);
        },
    });

})

$("input:checkbox").on('click', function () {
    $checkbox = true;
    var $box = $(this);
    if ($box.is(":checked")) {
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        $(group).prop("checked", false);
        $box.prop("checked", true);
    } else {
        $box.prop("checked", false);
    }
});

$("select").on('click', function (event) {
    console.log(rCoordinate.value);
    rValue = rCoordinate.value;
    redrawDataOnGraph();
});