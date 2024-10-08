# Generated by Django 5.0.7 on 2024-09-13 19:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Facility',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='name')),
                ('address', models.CharField(max_length=255, verbose_name='address')),
                ('capacity', models.IntegerField(verbose_name='capacity')),
            ],
            options={
                'verbose_name': 'facility',
                'verbose_name_plural': 'facilities',
            },
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_name', models.CharField(max_length=10, verbose_name='table name')),
                ('availability', models.BooleanField(default=True, verbose_name='is it available?')),
                ('facility', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tables', to='facilities.facility', verbose_name='facility')),
            ],
            options={
                'verbose_name': 'table',
                'verbose_name_plural': 'tables',
                'ordering': ['table_name'],
            },
        ),
    ]
