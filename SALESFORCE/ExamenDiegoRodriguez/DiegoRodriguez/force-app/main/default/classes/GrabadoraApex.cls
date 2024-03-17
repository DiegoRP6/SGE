public with sharing class GrabadoraApex {

    @AuraEnabled
    public static void guardarSecuenciasEnBaseDeDatos(List<String> secuencias) {
        try {
            List<Account> cuentasParaActualizar = new List<Account>();

            for (String secuencia : secuencias) {
                Account cuenta = new Account();
                cuenta.Name = 'Admin';
                cuenta.BillingCountry = secuencia; 
                cuentasParaActualizar.add(cuenta);
            }

            if (!cuentasParaActualizar.isEmpty()) {
                insert cuentasParaActualizar;
            }
        } catch (Exception e) {
            throw new AuraHandledException('Error al guardar las secuencias en la base de datos Apex: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static List<String> obtenerSecuenciasGuardadasDeBaseDeDatos() {
        List<String> secuencias = new List<String>();

        try {
            List<Account> cuentas = [SELECT BillingCountry FROM Account];
            for(Account cuenta : cuentas) {
                if (cuenta.BillingCountry != null) {
                    secuencias.add(cuenta.BillingCountry);
                }
            }
        } catch(Exception e) {
            throw new AuraHandledException('Error al obtener las secuencias guardadas ');
        } 

        return secuencias;
    }

        @AuraEnabled
        public static void limpiarBillingCountryEnBaseDeDatos() {
            try {
                List<Account> cuentasParaActualizar = [SELECT Id FROM Account];
                for (Account cuenta : cuentasParaActualizar) {
                    cuenta.BillingCountry = null;
                }
    
                if (!cuentasParaActualizar.isEmpty()) {
                    update cuentasParaActualizar;
                }
            } catch (Exception e) {
                throw new AuraHandledException('Error al limpiar BillingCountry ');
            }
        }

}