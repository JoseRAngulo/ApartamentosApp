from django.urls import path
from CasadelaAPI.views import FacturaList, ApartamentoList, ApartamentoGet, ContratoActivoGet, PagoAdd, FacturaXContratoList
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('addpago/', PagoAdd.as_view(), name='addpago'),
    path('facturas/', FacturaList.as_view(), name='facturalist'),
    path('apartamentos/', ApartamentoList.as_view(), name='apartamentolist'),
    path('apartamentos/<int:pk>/', ApartamentoGet.as_view(), name='apartamentoGet'),
    path('contratoapartamento/<int:pk>/', ContratoActivoGet.as_view(), name='apartamento_contrato'),
    path('facturas_contrato/<int:pk>/', FacturaXContratoList.as_view(), name='facturas_contrato'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
