# Generated by Django 2.1.7 on 2019-05-26 00:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0005_auto_20190525_1344'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favorite',
            name='favorited_on',
        ),
    ]
