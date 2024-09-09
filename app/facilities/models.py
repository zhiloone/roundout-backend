from django.db import models


class Facility(models.Model):
    name = models.CharField("nome", max_length=255)
    address = models.CharField("endereço", max_length=255)
    capacity = models.IntegerField("capacidade")

    class Meta:
        verbose_name = "instalação"
        verbose_name_plural = "instalações"

    def __str__(self):
        return self.name


class Table(models.Model):
    facility = models.ForeignKey(
        Facility,
        on_delete=models.CASCADE,
        related_name="tables",
        verbose_name="instalação",
    )
    table_name = models.CharField("nome da mesa", max_length=10)
    availability = models.BooleanField("está disponível?", default=True)

    class Meta:
        verbose_name = "mesa"
        verbose_name_plural = "mesas"
        ordering = ["table_name"]

    def __str__(self):
        return f"{self.facility.name} - Mesa {self.table_name}"
