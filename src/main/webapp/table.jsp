<%--
  Created by IntelliJ IDEA.
  User: sasha
  Date: 06.10.2022
  Time: 2:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<table id="result_table" class="results">
    <!-- <tr id="table_header"> -->
    <jsp:useBean id="check" class="ru.itmo.potatocoder228.lab2.beans.Raw" scope="session"/>
    <thead>
    <th>X</th>
    <th>Y</th>
    <th>R</th>
    <th>Hit fact</th>
    <th>Current time</th>
    <th>Script running time, sec</th>
    </thead>
    <tbody>

    <tr>
        <th><%=check.getX()%>
        </th>
        <th><%=check.getY()%>
        </th>
        <th><%=check.getR()%>
        </th>
        <th style='color:<%=(check.getHitFact() ? "lime" : "red")%>'>
            <%= check.getHitFact() ? "hit" : "miss" %>
        </th>
        <th><%=check.getCurrentTime()%>
        </th>
        <th><%=check.getExecutionTime()%>
        </th>
    </tr>
    </tbody>
</table>
