import csv
import json

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q


class IndexView(APIView):
    # @TODO Any generic post or get must go here
    # @TODO This should always set the updated at since each time post is called
    # from here an object is most likely getting Modfied
    paginator = None
    model = None    # The value for the models becomes available from the child.
    url_str = None
    serializer = None
    search_choices = []

    def get(self, request):
        data = []
        next_page = 1
        previous_page = 1

        query = request.GET.get('q')
        sorting = request.GET.get('sort')
        page = request.GET.get('page', 1)

        if query:
            if sorting:
                items = self.search(query).order_by(sorting)
            else:
                items = self.search(query).order_by('name')
        else:
            if sorting:
                items = self.model.objects.all().order_by(sorting)
            else:
                items = self.model.objects.all().order_by('name')

        paginator = Paginator(items, 500)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = self.serializer(
            data, context={'request': request}, many=True)
        if data.has_next():
            next_page = data.next_page_number()
        if data.has_previous():
            previous_page = data.previous_page_number()

        return Response({
            'data': serializer.data, 'count': paginator.count,
            'numpages': paginator.num_pages,
            'nextlink': '/api/{url_str}/?page={page_num}'.format(
                url_str=self.url_str, page_num=str(next_page)),
            'prevlink': '/api/{url_str}/?page={page_num}'.format(
                url_str=self.url_str, page_num=str(previous_page))
        })

    def post(self, request):
        filtered_data = json.loads(request.data['data'])

        serializer = self.serializer(data=filtered_data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer validation failed.")  # @TODO Use log instead
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

    def search(self, query):
        q_filter = Q()
        for each in self.search_choices:
            kwargs = {each: query}
            q_filter = q_filter | Q(**kwargs)
        items = self.model.objects.filter(q_filter)
        return items


class ResourceView(APIView):
    # @TODO Any generic post or get must go here
    # @TODO This should always set the updated at since each time post is called
    # from here an object is most likely getting Modified
    model = None    # From the child
    serializer = None   # From the child.

    def get(self, request, id):
        try:
            item = self.model.objects.get(id=id)
        except self.model.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer(item, context={'request': request})
        return Response(serializer.data)

    def put(self, request, id):
        if request.user.is_authenticated:
            try:
                item = self.model.objects.get(id=id)
            except self.model.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer = self.serializer(
                item, data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, id):
        if request.user.is_authenticated:
            try:
                item = self.model.objects.get(id=id)
            except self.model.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status.HTTP_403_FORBIDDEN)