import uuid

from rest_framework import serializers
from .models import RushingPlayer



class RushingPlayerSerializer(serializers.ModelSerializer):

    id = serializers.UUIDField(default=uuid.uuid4)
    Player = serializers.CharField(source='name')
    Team = serializers.CharField(source='team')
    Pos = serializers.CharField(source='position')
    Att = serializers.DecimalField(source='att', max_digits=5, decimal_places=2)
    # att_g = serializers.DecimalField(source='Att/G', max_digits=3,
    #                                 decimal_places=2)
    Yds = serializers.CharField(source='yds', max_length=10, required=False)
    Avg = serializers.DecimalField(source='avg', max_digits=4, decimal_places=2)
    #yds_g = serializers.DecimalField(source='Yds/G', max_digits=4,
    #                                 decimal_places=2)
    TD = serializers.DecimalField(source='td', max_digits=4, decimal_places=2)
    Lng = serializers.CharField(source='lng', max_length=10)
    #first = serializers.DecimalField(source='1st', max_digits=2,
    # decimal_places=2)
    #first_percent = serializers.DecimalField(source='1st%', max_digits=3,
    #                                         decimal_places=2)
    #twenty_plus = serializers.DecimalField(source='20+', max_digits=2,
    # decimal_places=2)
    #forty_plus = serializers.DecimalField(source='40+', max_digits=2,
    # decimal_places=2)
    FUM = serializers.DecimalField(source='fum', max_digits=4, decimal_places=2)


    class Meta:
        model = RushingPlayer
        fields = ('id', 'Player', 'Team', 'Pos', 'Att', 'Att/G', 'Yds',
                   'Avg', 'Yds/G', 'TD', 'Lng', '1st', '1st%',
                   '20+', '40+', 'FUM')
        extra_kwargs = {
            'Att/G': {'source': 'att_g'},
            'Yds/G': {'source': 'yds_g'},
            '1st' : {'source': 'first'},
            '1st%': {'source': 'first_percent'},
            '20+': {'source': 'twenty_plus'},
            '40+': {'source': 'forty_plus'}
        }


