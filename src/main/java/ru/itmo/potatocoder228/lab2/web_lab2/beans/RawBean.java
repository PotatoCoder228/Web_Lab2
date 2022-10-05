package ru.itmo.potatocoder228.lab2.web_lab2.beans;

import java.util.Deque;
import java.util.LinkedList;

public class RawBean {
    private Deque<Raw> raws;

    public RawBean() {
        raws = new LinkedList<>();
    }

    public Deque<Raw> getRaws() {
        return raws;
    }
}
