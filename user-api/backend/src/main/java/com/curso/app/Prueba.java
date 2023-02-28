package com.curso.app;

public class Prueba {

    public static void main(String[] args) {
        System.out.println(    doblar(    mitad(5>9?5:9)    )    ); //Statement
                                                // 5>9?5:9 = Expresión

    }

    public static double doblar(double numero){
        return numero *2;
    }
    public static double mitad(double numero){
        return numero /2;
    }
}
