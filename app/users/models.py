from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")


# TODO: WIP. Fazer com que ao criar usuários "normais" também sejam criados atletas nulos por padrão vinculados a ele
# class Athlete(models.Model):
#     first_name = models.CharField(_('name'), null=True, max_length=30)
#     last_name = models.CharField(_('surname'), null=True, max_length=100)
#     user = models.OneToOneField(CustomUser, on_delete=models.PROTECT, related_name='user', verbose_name=_('user'))
#     birthdate = models.DateField(_('birthdate'), null=True)

#     def __str__(self):
#         return self.get_full_name()

#     class Meta:
#         verbose_name = _('athlete')
#         verbose_name_plural = _('athletes')

#     def get_full_name(self):
#         full_name = '%s %s' % (self.first_name, self.last_name)
#         return full_name.strip()

#     def get_short_name(self):
#         return self.first_name
