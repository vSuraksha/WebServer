# Generated by Django 4.1.2 on 2022-10-23 05:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Device',
            fields=[
                ('device_uid', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('device_name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='owns',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='device_auth.device')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
