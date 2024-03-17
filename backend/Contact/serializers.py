from rest_framework import serializers
from .models import Contact
import re

class ContactSerializer(serializers.ModelSerializer):
    def validate_phone_number(self, value):
        if not value.startswith('+88'):
            raise serializers.ValidationError("Phone number must start with '+88'.")
        if len(value) != 14:
            raise serializers.ValidationError("Phone number must be 14 digits long including '+88'.")
        if not re.match(r'^\+?[0-9]+$', value):
            raise serializers.ValidationError("Phone number can only contain numbers and the '+' symbol.")
        return value

    class Meta:
        model = Contact
        fields = ['id', 'name', 'phone_number']
