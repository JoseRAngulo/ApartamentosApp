# Generated by Django 2.1.4 on 2018-12-15 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CasadelaAPI', '0002_auto_20181215_0940'),
    ]

    operations = [
        migrations.AddField(
            model_name='factura',
            name='pagado',
            field=models.BooleanField(default=False),
        ),
    ]
