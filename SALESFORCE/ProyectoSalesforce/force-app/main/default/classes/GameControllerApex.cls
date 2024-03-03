public with sharing class GameControllerApex {
    @AuraEnabled
    public static String generateRandomWord() {
        List<String> wordList = new List<String>{'PERRO', 'GATO', 'CASA', 'COCHE', 'ORDENADOR', 'BICICLETA', 'LIBRO', 'ARBOL', 'AVION', 'PAPEL', 'SILLA', 'MESA', 'RELOJ', 'TELEFONO', 'NUBE', 'SOL', 'LUNA', 'ESTRELLA', 'MAR', 'MONTANA', 'CIUDAD', 'PAIS', 'MUSICA', 'ARTE', 'CINE', 'FUTBOL', 'TENIS', 'GUITARRA', 'PIANO', 'NADAR', 'CORRER', 'BAILAR', 'COMER', 'BEBER', 'DORMIR', 'VIAJAR', 'ESTUDIAR', 'TRABAJAR', 'AMAR', 'ODIAR', 'SONREIR', 'LLORAR', 'REIR', 'SONAR', 'VOLAR', 'CAMINO', 'RIO', 'LAGO', 'PARQUE', 'JARDIN', 'FLOR', 'ANIMAL', 'HUMANO', 'FANTASMA', 'DEMONIO', 'ANGEL', 'DRAGON', 'TESORO', 'ESPADA', 'ESCUDO', 'ARMADURA', 'MAGIA', 'HECHIZO', 'ENCANTAMIENTO', 'POCION', 'MISTERIO', 'LEYENDA', 'HISTORIA', 'CUENTO', 'CARCEL', 'PRISION', 'LIBERTAD', 'JUSTICIA', 'PAZ', 'GUERRA', 'BATALLA', 'ESPACIO', 'PLANETA', 'UNIVERSO', 'GALAXIA', 'ASTRONAUTA', 'EXTRATERRESTRE', 'ALIENIGENA', 'ROBOT', 'MAQUINA', 'INVENTO', 'DESCUBRIMIENTO', 'TESORO'};

        Integer randomIndex = Math.mod(Math.abs(Crypto.getRandomInteger()), wordList.size());
        
        return wordList[randomIndex];
    }
}