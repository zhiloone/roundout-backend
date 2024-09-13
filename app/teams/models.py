from django.db import models
from django.utils.translation import gettext_lazy as _


class Team(models.Model):
    name = models.CharField(_("name"), max_length=50)
    athletes = models.ManyToManyField("users.Athlete", verbose_name=_("athletes"))
    is_active = models.BooleanField(_("is active?"), default=True)

    class Meta:
        verbose_name = _("team")
        verbose_name_plural = _("teams")

    def __str__(self):
        return self.name
