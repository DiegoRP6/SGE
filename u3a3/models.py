from odoo import api, models, fields

#Cree una clase hija que herede funcionalidades y añada otras nuevas.
class federacion(models.Model):
    _inherit = 'Equipo.nombre'
    _name = 'u3a3.federacion'
    _rec_name = 'nombre'
    codigo = fields.Integer()
    nombre = fields.Char(required=True)
    ano_creacion = fields.Date(string='Año de creación')
    descripcion = fields.Char()
    altura_media = fields.Float(string='Altura Media', compute='_compute_altura_media', store=True)


    @api.depends('Jugador.altura')
    def media_altura_jugadores(self):
        for federacion in self:
            jugadores = self.env['u3a3.jugador'].search([('federacion', '=', federacion.id)])

            total = sum(jugador.altura for jugador in jugadores)
            count = len(jugadores)
            altura_media = total / count if count > 0 else 0.0

            # Actualizar
            federacion.altura_media = altura_media

