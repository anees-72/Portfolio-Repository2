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
    current_domain = headers.get("Host", "wiki-au69t1ppm-anees-72s-projects.vercel.app")
    
    event = {
        "path": event.get("path", "/"),
        "httpMethod": event.get("httpMethod", "GET").upper(),
        "headers": {
            **headers,
            "Host": current_domain,
            "Content-Type": headers.get("Content-Type", "text/plain")
        },
        "queryStringParameters": event.get("queryStringParameters", {})
    }

    
    response = handle_request(application, event, context)
    

    body = response.get("body", b"")
    response["body"] = body.encode() if isinstance(body, str) else body
    
    return response