package ru.itmo.potatocoder228.lab2.web_lab2.beans;

import java.io.Serializable;

public class Raw implements Serializable {
    private static final long serialVersionUID = 1234567L;

    private double x;
    private int y;
    private int R;
    private String currentTime;
    private String executionTime;
    private boolean hitFact;

    public Raw() {

    }

    public Raw(double x, int y, int r, String current, String execution, boolean res) {
        this.x = x;
        this.y = y;
        this.R = r;
        this.currentTime = current;
        this.executionTime = execution;
        hitFact = res;
    }

    public int getR() {
        return R;
    }

    public double getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public boolean getHitFact() {
        return hitFact;
    }

}
