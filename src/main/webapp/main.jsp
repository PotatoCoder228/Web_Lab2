<%--
  Created by IntelliJ IDEA.
  User: sasha
  Date: 06.10.2022
  Time: 2:16
  To change this template use File | Settings | File Templates.
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="js/client.js"></script>
<script src="js/graph.js"></script>
<script src="js/slider.js"></script>

<div id="graphic">
            <canvas class="areas" id="graph"></canvas>
            <input id="resize_slider" type="range" min="-30" max="25" value="18" class="slider">
        </div>
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.Collection" %>
<%@ page import="ru.itmo.potatocoder228.lab2.beans.*" %>
<html style="overflow: auto;
    height: 100%;
    width: 100%;">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/test.css">

    <title>Web-Lab2</title>
</head>
<body style="overflow: auto; height: 100%; width: 100%; margin: 0; background: rgb(242, 239, 225);">
<div class="header">
    <div class="hat" style="font-family: sans-serif; font-size: large; color: black; text-align: center;" colspan="3">
        Atalyan Alexander Eduardovich<br>
        Group Р32081<br>Variant №738921<br>
    </div>
</div>
<div class="columns">
    <div id="left_column" class="column">
        <div class="column_name" id="name_of_graph">Graph</div>
        <div class="graphic" id="graphic">
            <canvas class="areas" id="graph"></canvas>
        </div>
        <input id="resize_slider" type="range" min="-30" max="25" value="18" class="slider">
    </div>
    <div id="center_column" class="column">
        <div class="column_name" id="name_of_input">
            Coordinates
        </div>
        <div class="input_page" id="coordinates">
            <form method="post" class="request_form" id="form">
                <div class="descr">
                    <b class="descr">Input X:</b>
                </div>
                <div class="x_page">
                    <input autocomplete="on" type="text" name="x" class="x_input" size="19"
                           placeholder="From -3 to 3." required='required'>
                </div>
                <div class="descr">
                    <b>Input Y:</b>
                </div>
                <div class="y_page">
                    <input type="checkbox" name="y" class="y_input" value="-4">
                    -4<br>
                    <input type="checkbox" name="y" class="y_input" value="-3">
                    -3<br>
                    <input type="checkbox" name="y" class="y_input" value="-2">
                    -2<br>
                    <input type="checkbox" name="y" class="y_input" value="-1">
                    -1<br>
                    <input type="checkbox" name="y" class="y_input" value="0">
                    0<br>
                    <input type="checkbox" name="y" class="y_input" value="1">
                    1<br>
                    <input type="checkbox" name="y" class="y_input" value="2">
                    2<br>
                    <input type="checkbox" name="y" class="y_input" value="3">
                    3<br>
                    <input type="checkbox" name="y" class="y_input" value="4">
                    4<br>
                </div>
                <div class="descr">
                    <b>Input R:</b>
                </div>
                <div class="r_page">
                    <select id="r_value" name="r">
                        <option name="r" disabled>Выберите значение</option>
                        <option class="r_input" name="r" value="1" selected>1</option>
                        <option class="r_input" name="r" value="2">2</option>
                        <option class="r_input" name="r" value="3">3</option>
                        <option class="r_input" name="r" value="4">4</option>
                        <option class="r_input" name="r" value="5">5</option>
                    </select>
                </div>
                <input type="submit" id="submit_button" class="send_button" value='Send'>
            </form>
            <input type="submit" id="reset_button" class="reset_button" value='Reset table'>
        </div>
    </div>
    <div id="right_column" class="column">
        <div class="column_name" id="results">Results</div>
        <div class="result_table_container" id="table_container">
            <div class="table_column" id="column_x">X</div>
            <div class="table_column" id="column_y">Y</div>
            <div class="table_column" id="column_R">R</div>
            <div class="table_column" id="column_hit">Hit fact</div>
            <div class="table_column" id="column_time">Current time</div>
            <div class="table_column" id="run_time">Script running time, sec</div>
        </div>
        <div class="content">
            <jsp:include page="all_table.jsp"/>
        </div>
    </div>
</div>
<div class="boots">I T M O , September 2022</div>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="js/graph.js"></script>
<script src="js/slider.js"></script>
<script src="js/client.js"></script>
</body>
</html>