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

def app(event, context):
    
    event["headers"] = event.get("headers", {})
    event["headers"]["Host"] = event.get("headers", {}).get("Host", "wiki-lovat-tau.vercel.app") 
    event["path"]=event.get("path","/")
    event["httpMethod"]=event.get("httpMethod","GET")
    event["queryStringParameters"]=event.get("queryStringParameters",{})
    response = handle_request(application, event, context)
    if isinstance(response["body"], str):
        response["body"] = response["body"].encode()  
    return response