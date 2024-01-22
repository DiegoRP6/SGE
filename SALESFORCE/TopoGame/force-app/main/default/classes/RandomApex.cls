public with sharing class RandomApex {
    public RandomApex() {

    }

    //Returns a random number between 0 and 1
    @AuraEnabled   //IMPORTANTE PONERLO EN EL EXAMEN
    public static Double random() {
        return Math.random();
    }
}