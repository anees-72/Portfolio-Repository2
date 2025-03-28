from django.urls import path
from . import views

urlpatterns=[
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create", views.create, name="create"),
    path("templates", views.templates, name="templates"),
    path("preview/<int:template_id>", views.preview, name="preview"),
    #api routes
    path("suggest", views.suggest, name="suggest"),
]
