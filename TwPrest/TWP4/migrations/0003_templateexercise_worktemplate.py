# Generated by Django 4.2 on 2023-05-07 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TWP4', '0002_studentgroup'),
    ]

    operations = [
        migrations.CreateModel(
            name='templateExercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('comment', models.TextField(blank=True)),
                ('body', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='workTemplate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('comment', models.TextField(blank=True)),
                ('templateExercises', models.ManyToManyField(to='TWP4.templateexercise')),
            ],
        ),
    ]
