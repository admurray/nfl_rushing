from rushing.api.serializers import *
from rushing.api.models import RushingPlayer
from rushing.api.views.base_views import IndexView, ResourceView


class RushingPlayerIndexView(IndexView):
    model = RushingPlayer
    url_str = 'rushingplayers'
    serializer = RushingPlayerSerializer
    search_choices = ['name__icontains']


class RushingPlayerResourceView(ResourceView):
    model = RushingPlayer
    url_str = 'rushingplayers'
    serializer = RushingPlayerSerializer

