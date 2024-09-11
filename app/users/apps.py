from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "users"
    verbose_name = _("User")
    verbose_name_plural = _("Users")

    # TODO: ver como salvar um ao mesmo tempo que um usuário é criado.
    # Com o uso dos signals funciona, mas é um work-around (async)
    def ready(self):
        import users.signals  # noqa: F401
