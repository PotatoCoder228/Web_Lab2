package ru.itmo.potatocoder228.lab2.servlets;

import ru.itmo.potatocoder228.lab2.beans.Raw;
import ru.itmo.potatocoder228.lab2.beans.RawBean;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static java.lang.System.out;

/**
 * ControllerServlet - checking type of request and send it next component's
 */
@WebServlet(name = "ControllerServlet", value = "/control")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/main.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getParameter("x") != null && req.getParameter("y") != null
                && req.getParameter("r") != null) {
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(req, resp);
        } else if (req.getParameter("clear") != null) {
            out.println("Очищаем таблицу:");
            //Получение Beans для очистки
            RawBean beans = (RawBean) req.getSession().getAttribute("table");
            if (beans == null) beans = new RawBean();
            beans.getRaws().clear();
            for (Raw check : beans.getRaws()) {
                out.println(check.getCurrentTime());
            }
            req.getSession().setAttribute("table", beans);
            getServletContext().getRequestDispatcher("/main.jsp").forward(req, resp);
        } else {
            getServletContext().getRequestDispatcher("/main.jsp").forward(req, resp);
        }
    }
}
