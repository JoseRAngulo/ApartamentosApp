from CasadelaAPI.models import Factura, FacturaA, FacturaE, Apartamento, Cliente, Contrato, Pago
from CasadelaAPI.serializers import FacturaSerializer, FacturaASerializer, FacturaESerializer, ApartamentoSerializer, ClienteSerializer, ContratoSerializer, PagoSerializer
from rest_framework import generics

class FacturaList(generics.ListCreateAPIView):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer


class FacturaXContratoList(generics.ListCreateAPIView):
    serializer_class = FacturaSerializer
    def get_queryset(self):
        contrato = Contrato.objects.get(pk = self.kwargs['pk'])
        return Factura.objects.filter(contrato = contrato)

class ApartamentoList(generics.ListCreateAPIView):
    queryset = Apartamento.objects.all()
    serializer_class = ApartamentoSerializer

class ApartamentoGet(generics.RetrieveAPIView):
    queryset = Apartamento.objects.all()
    serializer_class = ApartamentoSerializer

class ContratoActivoGet(generics.RetrieveAPIView):
    serializer_class = ContratoSerializer
    def get_queryset(self):
        apartamento = Apartamento.objects.get(pk = self.kwargs['pk'])
        return Contrato.objects.filter(apartamento = apartamento, estado = True)

class PagoAdd(generics.CreateAPIView):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer