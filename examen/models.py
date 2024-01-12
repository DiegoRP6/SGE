# -*- coding: utf-8 -*-
from odoo import models,fields, api

class Cerveza(models.Model):
    _name = 'cerveza'
    _description = 'Cerveza'

    tipo = fields.Char(string="Tipo de cerveza")
    _rec_name = 'nombre'
    nombre = fields.Char(string="Nombre de cerveza")
    descripcion = fields.Text(string="Descripción de cerveza")
    contenido_alcohol = fields.Float(string="Contenido de alcohol (%)")
    precio_por_unidad = fields.Float(string="Precio de cerveza")
    volumen_por_unidad = fields.Float(string="Volumen por unidad (cl)")
    disponible = fields.Selection([('si', 'Sí'), ('no', 'No')], string="Disponible")

    distribuidor_id = fields.Many2one('distribuidor', string='Distribuidor')

    # Relación many2many con la clase Ingrediente
    ingredientes_ids = fields.Many2many('ingrediente',
                                        'cerveceria_ingrediente_cerveza_rel',
                                        'cerveza_id', 'ingrediente_id',
                                        string='Ingredientes utilizados en esta cerveza')

    @api.model
    def cervezas_agotadas(self):
        return self.search([('disponible', '=', 'no')])

    @api.model
    def cervezas_disponibles(self):
        return self.search([('disponible', '=', 'si')])
    
class LoteProduccion(models.Model):
    _name = 'lote.produccion'
    _description = 'Modelo para Lote de Producción'

    cerveza_id = fields.Many2one('cerveza', string='Cerveza')
    fecha_inicio_produccion = fields.Date(string='Fecha de inicio de producción')
    fecha_fin_estimada = fields.Date(string='Fecha estimada de finalización')
    cantidad_producida = fields.Integer(string='Cantidad producida')
    estado = fields.Selection([
        ('en_proceso', 'En proceso'),
        ('completo', 'Completo'),
        ('en_espera_empaquetado', 'En espera de empaquetado')],
        string='Estado')
    
    fecha_loteProduccion_calendar = fields.Date(string='Fecha de empaquetado para el calendario', store=True)
    fecha_empaquetado_calendar = fields.Date(string='Empaquetado', store=True)


    
class Ingrediente(models.Model):
    _name = 'ingrediente'
    _description = 'Ingredientes para la producción de cerveza'

    nombre = fields.Char(string='Nombre', required=True)
    tipo = fields.Selection([
        ('malta', 'Malta'),
        ('lupulo', 'Lúpulo'),
        ('levadura', 'Levadura'),
        ('agua', 'Agua'),
        ('otro', 'Otro')],
        string='Tipo', required=True)
    cantidad_disponible = fields.Float(string='Cantidad disponible (kg/l)', required=True)

    # Relación many2many para relacionar ingredientes con cervezas
    cervezas_ids = fields.Many2many('cerveza',
                                    'cerveceria_ingrediente_cerveza_rel',
                                    'ingrediente_id', 'cerveza_id',
                                    string='Cervezas que utilizan este ingrediente')

class Empaquetado(models.Model):
    _name = 'empaquetado'
    _description = 'Empaquetado de lotes de producción'

    lote_produccion_id = fields.Many2one('lote.produccion', string='Lote de Producción')
    fecha_empaquetado = fields.Date(string='Fecha de empaquetado')
    cantidad_empaquetada = fields.Integer(string='Cantidad empaquetada')

    # Vista Calendario
    fecha_empaquetado_calendar = fields.Date(string='Fecha de empaquetado para el calendario', store=True, compute='_compute_fecha_empaquetado_calendar')

    @api.depends('fecha_empaquetado')
    def _compute_fecha_empaquetado_calendar(self):
        for empaquetado in self:
            empaquetado.fecha_empaquetado_calendar = empaquetado.fecha_empaquetado

class Distribuidor(models.Model):
    _name = 'distribuidor'
    _description = 'Distribuidor'

    name = fields.Char(string='Nombre', required=True)
    direccion = fields.Text(string='Dirección')
    telefono_contacto = fields.Char(string='Teléfono de contacto')
    
    cervezas_suministradas = fields.One2many('cerveza', 'distribuidor_id', string='Cervezas suministradas')



