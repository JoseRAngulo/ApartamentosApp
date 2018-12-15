from rest_framework import serializers
from CasadelaAPI.models import Factura, FacturaA, FacturaE, Apartamento, Cliente, Contrato, Pago

class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = '__all__'
class FacturaASerializer(serializers.ModelSerializer):
    class Meta:
        model = FacturaA
        fields = '__all__'
class FacturaESerializer(serializers.ModelSerializer):
    class Meta:
        model = FacturaE
        fields = '__all__'
class ApartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartamento
        fields = '__all__'
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'
        
class ContratoSerializer(serializers.ModelSerializer):
    cliente = serializers.SlugRelatedField(read_only=True, slug_field='nombre')

    class Meta:
        model = Contrato
        fields = ['id','monto', 'fecha', 'cliente', 'apartamento']
    
class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'