# Generated by Django 4.2.5 on 2023-09-15 21:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EmotionTrack',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.CharField(max_length=200)),
                ('emotion', models.CharField(max_length=50)),
                ('time', models.TimeField(default=datetime.datetime(2023, 9, 16, 2, 29, 57, 493747))),
            ],
        ),
    ]
