from odoo import fields, models, api

class equipo(models.Model):
    _name = 'futbol.equipos'
    _description = 'Modelo para gestionar los equipos'

    CATEGORIAS_FUTBOL = [
        ('infantil', 'Infantil'),
        ('juvenil', 'Juvenil'),
        ('adulto', 'Adulto'),
        # Agrega más categorías según sea necesario
    ]

    name = fields.Char(required=True)
    entrenador = fields.Char(required=True)
    jugadores = fields.One2many('futbol.jugadores', 'equipo', required=True)
    categoria = fields.Selection(CATEGORIAS_FUTBOL, string='Categoría', required=True)
    puesto = fields.Integer()



class jugador(models.Model):
    _name = 'futbol.jugadores'
    _description = 'Modelo para gestionar los jugadores'

    name = fields.Char()
    apellido = fields.Char()
    fecha_nacimiento = fields.Date()
    equipo = fields.Many2one('futbol.equipos')  # MUCHOS JUGADORES, UN EQUIPO
    # Un jugador pertenece a un equipo, relación muchos a uno


