<%--
  Created by IntelliJ IDEA.
  User: sasha
  Date: 06.10.2022
  Time: 2:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" session="true" %>
<html>
<head>
    <title>ERROR</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<br>
<br>
<p align="left"> WRONG DATA!!! </p>
<br>
<p align="left"><%= request.getAttribute("error_message") %>
</p>
<br>
<div class="form">
    <form method="post" action="main.jsp">
        <input type="submit" value='Go back'>
    </form>
</div>
</body>
</html>
