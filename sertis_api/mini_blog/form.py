from django import forms


class CardForm(forms.Form):
    name = forms.CharField(required=True, min_length="2", strip=True)
    status = forms.BooleanField(required=False)
    content = forms.CharField(required=True, min_length="2", strip=True)
    category = forms.CharField(required=True, min_length="2", strip=True)


class CardDestroyUpdateForm(forms.Form):
    id = forms.IntegerField(required=True)
