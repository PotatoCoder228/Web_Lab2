<%--
  Created by IntelliJ IDEA.
  User: sasha
  Date: 06.10.2022
  Time: 2:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="ru.itmo.potatocoder228.lab2.beans.Raw" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>result</title>
    <link rel="stylesheet" href="css/style.css">
    <!--<link rel="icon" href="images/icon.ico">-->
</head>
<body>

<br>
<p align="left"> Check results: </p>
<br>
<div id="result">
    <jsp:include page="table.jsp"/>
</div>
<br>
<div class="form">
    <form method="post" action="main.jsp">
        <input type="submit" value='Go back'>
    </form>
</div>
</body>
</html>