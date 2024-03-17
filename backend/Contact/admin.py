from django.contrib import admin
from .models import Contact

# Register your models here.
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    '''Admin View for Contact'''

    list_display = ('name','phone_number')
