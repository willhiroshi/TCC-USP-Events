# Generated by Django 4.2 on 2023-06-04 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_alter_event_post_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='lat',
            field=models.CharField(max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='lng',
            field=models.CharField(max_length=15, null=True),
        ),
    ]
