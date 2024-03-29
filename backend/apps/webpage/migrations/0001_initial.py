# Generated by Django 4.2 on 2023-10-15 21:46

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='WebPage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.URLField()),
                ('source', models.CharField(choices=[('facebook', 'Facebook'), ('instagram', 'Instagram')], max_length=50)),
                ('users', models.ManyToManyField(related_name='webpages', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
