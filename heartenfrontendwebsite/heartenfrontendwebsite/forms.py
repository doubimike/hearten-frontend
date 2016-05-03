from django import forms

class Register(forms.Form):
	name = forms.CharField()
	email = forms.EmailField(required=False)
	password = forms.CharField()
