# Generated by Django 5.1.2 on 2024-11-08 13:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('newapp', '0002_task'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Task',
        ),
    ]