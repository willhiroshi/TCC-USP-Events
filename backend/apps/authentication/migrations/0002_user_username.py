# Generated by Django 4.2 on 2023-10-09 01:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='username', max_length=100, unique=True),
        ),
    ]
