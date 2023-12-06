# -*- coding: utf-8 -*-
{
    'name': "u3a3",
    'summary': """""",
    'description': """
        U3A3
    """,
    'author': "Diego Rodriguez",
    'website': "http://www.salesianoszaragoza.edu",

    # Categorian be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/openerp/addons/base/module/module_data.xml
    # for the full list
    'category': 'Examen',
    'version': '0.2',

    # any module necessary for this one to work correctly
    'depends': ['base', 'Futbol', 'basemodulo'],

    # always loaded
    'data': [
        'views.xml',
    ],

    # Specify the icon for the module
    'images': ['static/description/icon.png'],
}