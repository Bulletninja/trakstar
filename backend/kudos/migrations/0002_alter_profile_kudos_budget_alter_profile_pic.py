# Generated by Django 4.0.4 on 2022-05-26 22:00

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kudos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='kudos_budget',
            field=models.PositiveSmallIntegerField(default=3, validators=[django.core.validators.MaxValueValidator(3)]),
        ),
        migrations.AlterField(
            model_name='profile',
            name='pic',
            field=models.URLField(max_length=250, null=True),
        ),
    ]
