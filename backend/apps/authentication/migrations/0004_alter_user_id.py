# Generated by Django 4.2 on 2023-10-23 23:43

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_alter_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]