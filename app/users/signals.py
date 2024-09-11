from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Athlete, CustomUser


@receiver(post_save, sender=CustomUser)
def create_athlete(sender, instance, created, **kwargs):
    if created:
        Athlete.objects.create(user=instance)
