# Generated by Django 4.2 on 2023-08-17 00:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_alter_event_post_link'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='id',
        ),
        migrations.AddField(
            model_name='event',
            name='hash_id',
            field=models.TextField(default='dftValue', primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='event',
            name='post_link',
            field=models.TextField(),
        ),
    ]
