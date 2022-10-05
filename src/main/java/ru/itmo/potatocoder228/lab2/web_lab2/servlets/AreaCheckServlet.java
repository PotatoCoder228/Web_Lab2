package ru.itmo.potatocoder228.lab2.web_lab2.servlets;

import ru.itmo.potatocoder228.lab2.web_lab2.beans.Raw;
import ru.itmo.potatocoder228.lab2.web_lab2.beans.RawBean;
import ru.itmo.potatocoder228.lab2.web_lab2.exceptions.WrongDataException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

/**
 * AreaCheckServlet - handling hit point and getting html-page
 * with results of handle
 */
@WebServlet(name = "AreaCheckServlet", value = "/check")
public class AreaCheckServlet extends HttpServlet {

    private List<Integer> yRange = Arrays.asList(-4, -3, -2, -1, 0, 1, 2, 3, 4);
    private List<Integer> rRange = Arrays.asList(1, 2, 3, 4, 5);

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long startTime = System.nanoTime();

        String x = req.getParameter("x_coordinate");
        String y = req.getParameter("y_coordinate");
        String r = req.getParameter("r_coordinate");

        double xValue;
        int yValue, rValue;
        try {
            if (x == null || x.equals("")) throw new WrongDataException("x not set");
            if (y == null || y.equals("")) throw new WrongDataException("y not set");
            if (r == null || r.equals("")) throw new WrongDataException("r not set");

            x = x.trim();
            y = y.trim();
            r = r.trim();

            xValue = validateX(x);
            yValue = validateY(y);
            rValue = validateR(r);

             boolean isInside =  insideCircle(xValue, yValue, rValue) ||
                                insideTriangle(xValue, yValue, rValue) ||
                                insideRectangle(xValue, yValue, rValue);

            OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
            String currentTime;
            try {
                currentTimeObject = currentTimeObject.minusMinutes(Long.parseLong(req.getParameter("timezone")));
                currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            } catch (Exception exception) {
                currentTime = "no info";
            }
            String executionTime = String.format("%.9f", (Double) ((System.nanoTime() - startTime) / 1_000_000_000.0));

            RawBean raws = (RawBean) req.getSession().getAttribute("table");
            if (raws == null) raws = new RawBean();
            Raw raw = new Raw(xValue, yValue, rValue, currentTime, executionTime, isInside);
            raws.getRaws().add(raw);
            req.getSession().setAttribute("table", raws);
            req.getSession().setAttribute("check", raw);

            getServletContext().getRequestDispatcher("/result_page.jsp").forward(req, resp);

        } catch (WrongDataException e) {
            req.setAttribute("error_message", e.getMessage());
            getServletContext().getRequestDispatcher("/wrong_data.jsp").forward(req, resp);
        }
    }

    private double validateX(String x) throws WrongDataException {
        double dx;
        try {
            dx = Double.parseDouble(x);
            if (dx > 4 || dx < -4) throw new WrongDataException("x is wrong format: " + dx);
        } catch (NumberFormatException e) {
            throw new WrongDataException("x is wrong format");
        }
        return dx;
    }

    private int validateY(String y) throws WrongDataException {
        int dy;
        try {
            dy = Integer.parseInt(y);
            if (!(-4.0 <= dy && dy <= 4.0)) throw new WrongDataException("y is wrong format: " + dy);
        } catch (NumberFormatException e) {
            throw new WrongDataException("y is wrong format");
        }
        return dy;
    }

    private int validateR(String r) throws WrongDataException {
        int dr;
        try {
            dr = Integer.parseInt(r);
            if ((dr <= 1) || (dr >= 5)) throw new WrongDataException("r is wrong format");
        } catch (NumberFormatException e) {
            throw new WrongDataException("r is wrong format");
        }
        return dr;
    }

    private boolean insideCircle(double x, double y, double r) {
        return x <= 0 && y >= 0 && x * x + y * y <= (r / 2) * (r / 2);
    }

    private boolean insideTriangle(double x, double y, double r) {
        return x >= 0 && y <= 0 && y <= -x + r / 2;
    }

    private boolean insideRectangle(double x, double y, double r) {
        return x >= 0 && y <= 0 && x >= -r && y >= -r / 2;
    }
}


