# Generated by Django 4.2 on 2023-10-07 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0008_event_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='source',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
