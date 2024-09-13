from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import Athlete, CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = (
        "email",
        "is_staff",
        "is_active",
    )
    list_filter = (
        "email",
        "is_staff",
        "is_active",
    )
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            _("Personal information"),
            {"fields": ("first_name", "surname", "gender", "birthdate")},
        ),
        (
            _("Permissions"),
            {"fields": ("is_staff", "is_active", "groups", "user_permissions")},
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "first_name",
                    "surname",
                    "gender",
                    "birthdate",
                    "is_staff",
                    "is_active",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)

    def save_model(self, request, obj, form, change):
        obj.save()

        if not hasattr(obj, "athlete"):
            Athlete.objects.create(user=obj)

        super().save_model(request, obj, form, change)  # Calls the default method


class AthleteAdmin(admin.ModelAdmin):
    list_display = ("user", "score")
    search_fields = ("user__email", "user__first_name", "user__surname", "score")
    fieldsets = ((None, {"fields": ("user", "score")}),)

    def get_readonly_fields(self, request, obj=None):
        if obj:  # When editing an existing object
            return ["user"]  # Make 'user' a readonly field
        return []


# TODO: não permitir a edição do vínculo entre usuário e atleta
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Athlete, AthleteAdmin)
