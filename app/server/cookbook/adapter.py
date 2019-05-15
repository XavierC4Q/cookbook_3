from allauth.account.adapter import DefaultAccountAdapter


class CustomAdapter(DefaultAccountAdapter):

    def clean_country(self, country):
        return country

    def save_user(self, request, user, form, commit=True):
        user = super(CustomAdapter, self).save_user(request, user, form, commit=False)
        user.country = form.cleaned_data.get('country')
        user.save()