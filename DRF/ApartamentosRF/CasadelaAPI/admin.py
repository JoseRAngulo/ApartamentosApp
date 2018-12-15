from django.contrib import admin
from .models import Factura, FacturaA, FacturaE, Cliente, Apartamento, Contrato, Pago

admin.site.register(Factura)
admin.site.register(FacturaA)
admin.site.register(FacturaE)
admin.site.register(Cliente)
admin.site.register(Apartamento)
admin.site.register(Contrato)
admin.site.register(Pago)

# Register your models here.
