"""
WSGI config for wiki project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""
import os
from django.core.wsgi import get_wsgi_application
from serverless_wsgi import handle_request

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "wiki.settings")
application = get_wsgi_application()


import os
from django.core.wsgi import get_wsgi_application
from serverless_wsgi import handle_request

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "wiki.settings")
application = get_wsgi_application()

def app(event, context):
    
    headers = event.get("headers", {})
    headers["Host"] = headers.get("Host", "wiki-5b2ct87ed-anees-72s-projects.vercel.app")
    
    event = {
        "path": event.get("path", "/"),
        "httpMethod": event.get("httpMethod", "GET").upper(),
        "headers": headers,
        "queryStringParameters": event.get("queryStringParameters", {})
    }

    response = handle_request(application, event, context)
    

    body = response.get("body", b"")
    if isinstance(body, str):
        response["body"] = body.encode("utf-8")
    else:
        response["body"] = bytes(body)  
    
    return response