from django.contrib import admin

from .models import Team


class TeamAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active")
    search_fields = ("name",)


admin.site.register(Team, TeamAdmin)
