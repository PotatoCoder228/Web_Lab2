<%--
  Created by IntelliJ IDEA.
  User: sasha
  Date: 06.10.2022
  Time: 2:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="ru.itmo.potatocoder228.lab2.beans.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="table" class="ru.itmo.potatocoder228.lab2.beans.RawBean" scope="session"/>

<%
    if (table != null) {
        for (Raw check : table.getRaws()) {
%>
<div class="results">
    <div class="table_column" id="x"><%=check.getX()%>
    </div>
    <div class="table_column" id="y"><%=check.getY()%>
    </div>
    <div class="table_column" id="r"><%=check.getR()%>
    </div>
    <div class="table_column" id="hit" style='color:<%=(check.getHitFact() ? "lime" : "red")%>'>
        <%= check.getHitFact() ? "hit" : "miss" %>
    </div>
    <div class="table_column" id="time"><%=check.getCurrentTime()%>
    </div>
    <div class="table_column" id="running"><%=check.getExecutionTime()%>
    </div>
</div>
<%
        }
    }
%>
