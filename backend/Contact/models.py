from django.core.exceptions import ValidationError
from django.db import models
import re

class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=16)  # To accommodate the "+88" prefix and 14 digits

    def clean(self):
        # Validate phone number format
        if not self.phone_number.startswith('+88'):
            raise ValidationError("Phone number must start with '+88'.")
        if len(self.phone_number) != 14:
            raise ValidationError("Phone number must be 14 digits long including '+88'.")
        if not re.match(r'^\+?[0-9]+$', self.phone_number):
            raise ValidationError("Phone number can only contain numbers and the '+' symbol.")
            
    def __str__(self):
        return self.name