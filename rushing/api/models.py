import uuid
from django.db import models
from .constants import *
# Create your models here.


class RushingBaseModel(models.Model):
    class Meta:
        managed = True
        abstract = True
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateField(auto_now_add=True, blank=True)
    updated_at = models.DateField(auto_now_add=True, blank=True)


class RushingPlayer(RushingBaseModel):
    name = models.CharField('name', max_length=240)
    team = models.CharField('team', max_length=3)
    position = models.CharField('pos', max_length=2)
    att = models.DecimalField('att', max_digits=5, decimal_places=2)
    att_g = models.DecimalField('att_g', max_digits=4, decimal_places=2)
    yds = models.CharField('yds', max_length=10, default=None)
    avg = models.DecimalField('avg', max_digits=4, decimal_places=2)
    yds_g = models.DecimalField('yds_g', max_digits=5, decimal_places=2)
    td = models.DecimalField('td', max_digits=4, decimal_places=2)
    lng = models.CharField('lng', max_length=10)
    first = models.DecimalField('first', max_digits=4, decimal_places=2)
    first_percent = models.DecimalField('first_percent', max_digits=5,
                                        decimal_places=2)
    twenty_plus = models.DecimalField('twenty_plus', max_digits=4,
                                      decimal_places=2)
    forty_plus = models.DecimalField('forty_plus', max_digits=4,
                                     decimal_places=2)
    fum = models.DecimalField('fum', max_digits=4, decimal_places=2)

    def __str__(self):
        return self.name
