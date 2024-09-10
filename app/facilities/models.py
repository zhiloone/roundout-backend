from django.db import models
from django.utils.translation import gettext_lazy as _


class Facility(models.Model):
    name = models.CharField(_("name"), max_length=255)
    address = models.CharField(_("address"), max_length=255)
    capacity = models.IntegerField(_("capacity"))

    class Meta:
        verbose_name = _("facility")
        verbose_name_plural = _("facilities")

    def __str__(self):
        return self.name


class Table(models.Model):
    facility = models.ForeignKey(
        Facility,
        on_delete=models.CASCADE,
        related_name="tables",
        verbose_name=_("facility"),
    )
    table_name = models.CharField(_("table name"), max_length=10)
    availability = models.BooleanField(_("is it available?"), default=True)

    class Meta:
        verbose_name = _("table")
        verbose_name_plural = _("tables")
        ordering = ["table_name"]

    def __str__(self):
        return f"{self.facility.name} - #{self.table_name}"
