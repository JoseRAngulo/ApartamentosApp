from django.db import models

class Cliente(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre
class Apartamento(models.Model):
    nombre = models.CharField(max_length=4)
    ocupado = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

class Contrato(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=100, decimal_places=2)
    fecha = models.DateField(auto_now_add=True)
    apartamento = models.ForeignKey(Apartamento, on_delete=models.CASCADE)
    estado = models.BooleanField(default=True)
    
    def __str__(self):
        return 'Contrato: %s - %s' % (self.cliente, self.fecha)
    
    def save(self, *args, **kwargs):
        #calcula el monto
        if self._state.adding is True:
            a = self.apartamento
            a.ocupado = True
            a.save()
        if self._state.adding is False and self.estado == False:
            a = self.apartamento
            a.ocupado = False
            a.save()
            
        super().save(*args, **kwargs)


class Factura(models.Model):
    fecha = models.DateField()
    contrato = models.ForeignKey(Contrato, on_delete=models.CASCADE)
    pagado = models.BooleanField(default=False)

    def __str__(self):
        return 'Factura: %s - %s' % (self.fecha, self.contrato)
    
class FacturaE(models.Model):
    factura = models.OneToOneField(
        Factura,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    kwh = models.DecimalField(max_digits=100, decimal_places=2)
    monto = models.DecimalField(max_digits=100, decimal_places=2, null=True, blank=True)

    def save(self, *args, **kwargs):
        #calcula el monto
        if self._state.adding is True:
            self.monto = float(self.kwh) * 4.0588
            super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = 'Factura Electrica'
        verbose_name_plural = 'Facturas Electricas'
    
    def __str__(self):
        return 'Mensualidad: %s - %s' % (self.factura, self.monto)

class FacturaA(models.Model):
    factura = models.OneToOneField(
        Factura,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    monto = models.DecimalField(null=True, blank=True, max_digits=100, decimal_places=2)

    def save(self, *args, **kwargs):
        #jala el monto del contrato automaticamente
        if self._state.adding is True:
            self.monto = self.factura.contrato.monto
            super().save(*args, **kwargs)

    def __str__(self):
        return 'Mensualidad: %s - %s' % (self.factura, self.monto)

    class Meta:
        verbose_name= 'Factura Contrato'
        verbose_name_plural = 'Facturas Contratos'

class Pago(models.Model):
    monto = models.DecimalField(max_digits=100, decimal_places=2)
    factura = models.ForeignKey(Factura, on_delete=models.CASCADE)
    
    def save(self, *args, **kwargs):
        if self._state.adding is True:
            f = Factura.objects.get(pk = self.factura.id)
            if Pago.objects.filter(factura = f).exists():
                total_pagos = Pago.objects.filter(factura = f).aggregate(models.Sum('monto'))
                total_pagos_anteriores = total_pagos["monto__sum"]
                total_pagos = total_pagos_anteriores + self.monto
            else:
                total_pagos = self.monto
            
            if FacturaA.objects.filter(factura = f).exists():
                fact = FacturaA.objects.get(factura = f)
                monto = fact.monto
            else:
                fact = FacturaE.objects.get(factura = f)
                monto = fact.monto
            if total_pagos >= monto:
                f.pagado = True
                f.save()
            super().save(*args, **kwargs)   


    

