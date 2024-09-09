from django import forms

from .models import Table


class TableForm(forms.ModelForm):
    class Meta:
        model = Table
        fields = ["facility", "table_number", "availability"]

    def clean(self):
        cleaned_data = super().clean()
        facility = cleaned_data.get("facility")

        # Check if the table amount exceeds the facility's total capacity
        if facility:
            total_tables = Table.objects.filter(facility=facility).count()
            if total_tables >= facility.capacity:
                raise forms.ValidationError(
                    "Número de mesas excede a capacidade do local."
                )
        return cleaned_data
