from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

GENDER_CHOICES = {
    "M": _("Male"),
    "F": _("Female"),
    "NB": _("Non-binary"),
    "X": _("Prefer not to say"),
    "O": _("Other"),
}


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(_("name"), max_length=30)
    surname = models.CharField(_("surname"), max_length=100)
    gender = models.CharField(
        _("gender"), choices=GENDER_CHOICES, blank=True, null=True
    )
    birthdate = models.DateField(_("birthdate"), blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "surname"]

    objects = CustomUserManager()

    def __str__(self):
        return self.get_full_name()

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
    score = models.IntegerField(_("score"), default=1000)

    def __str__(self):
        return self.user.get_full_name()

    class Meta:
        verbose_name = _("athlete")
        verbose_name_plural = _("athletes")
