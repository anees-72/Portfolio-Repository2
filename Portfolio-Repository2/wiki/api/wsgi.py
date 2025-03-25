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
    
    event = {
        "path": event.get("path", "/"),
        "httpMethod": event.get("httpMethod", "GET"),
        "headers": {
            **event.get("headers", {}),
            "Host": event.get("headers", {}).get("Host", "")  
        },
        "queryStringParameters": event.get("queryStringParameters", {})
    }

    
    response = handle_request(application, event, context)
    
    
    if isinstance(response.get("body"), str):
        response["body"] = response["body"].encode('utf-8')
    response["body"] = response.get("body", b"")  
    
    return response