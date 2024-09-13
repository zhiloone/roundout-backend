from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class TeamsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "teams"
    verbose_name = _("Team")
    verbose_name_plural = _("Teams")
