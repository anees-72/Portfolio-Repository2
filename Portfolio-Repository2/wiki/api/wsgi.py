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
    headers = event.get("headers", {})
    host = headers.get("Host", "")
    
    
    if not host or not any(
        host.endswith(domain) 
        for domain in ['.vercel.app', 'localhost']
    ):
        host = "wiki-hom18ucgt-anees-72s-projects.vercel.app" 
    
    event = {
        "path": event.get("path", "/"),
        "httpMethod": event.get("httpMethod", "GET"),
        "headers": {**headers, "Host": host},
        "queryStringParameters": event.get("queryStringParameters", {})
    }
    
    response = handle_request(application, event, context)
    response["body"] = response.get("body", b"").encode() if isinstance(response.get("body"), str) else response.get("body", b"")
    return response