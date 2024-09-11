from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(_("name"), max_length=30)
    surname = models.CharField(_("surname"), max_length=100)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "surname"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def get_full_name(self):
        full_name = f"{self.first_name} {self.surname}"
        return full_name.strip()

    def get_short_name(self):
        return self.first_name


class Athlete(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.PROTECT,
        related_name="user",
        verbose_name=_("user"),
    )
    birthdate = models.DateField(_("birthdate"), null=True)

    def __str__(self):
        return self.user.get_full_name()

    class Meta:
        verbose_name = _("athlete")
        verbose_name_plural = _("athletes")
