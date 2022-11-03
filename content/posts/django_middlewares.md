---
title: "Django Middlewares"
tags: ["python", "django"]
date: 2022-11-02
toc: false
draft: false
---

We'll come to know about middlewares in django but first, let's understand what is a middleware.

## What is a middleware?

Middleware is a software that acts as a bridge between an operating system and applications running on it. It provides
common services and capabilities to applications outside what's available from the operating system.

## What is a django middleware?

- A middleware is a component that sits between the Django view and the Django template.
- It is a framework that allows you to hook into Django's request/response processing at various points.
- It's a lightweight, low-level, plug-in system for globally altering Django's input or output.
- It can be used to modify the incoming request before it reaches the view, or the outgoing response before it reaches
  the browser.
- It can also be used to execute some code that doesn't fit neatly into any of your existing views or models.

## How middleware works in django?

- When a request comes to the server, it is first processed by the middleware.
- The middleware then passes the request to the view.
- The view processes the request and returns a response.
- The middleware then processes the response and returns it to the browser.

## Ordering and layering of middlewares

- Django middlewares are executed in the order they are defined in the `MIDDLEWARE` setting.
- The order of middlewares is important because each middleware can modify the request and response.
- The order of middlewares is also important because some middlewares depend on the output of other middlewares. For
  example, the `SessionMiddleware` depends on the `AuthenticationMiddleware` to populate the `request.user` attribute.
- Middlewares are run in **reverse order** when the response is returned to the browser.
- The `SecurityMiddleware` is the first middleware in the list of middlewares. It is the first middleware to process the
  request and the last middleware to process the response.

## How to write a custom middleware in pre-Django 1.10-style?

- In pre-Django 1.10-style, we have to write a middleware class that implements the `process_request()` and
  `process_response()` methods.
- You need to inherit the `MiddlewareMixin` class to make sure that your middleware is compatible with both pre-Django
  1.10-style and post-Django 1.10-style.
- The `process_request()` method is called before the view is called.
- The `process_response()` method is called after the view is called.
- The `process_exception()` method is called if an exception occurs in the view. This method is optional.
- The `process_template_response()` method is called after the view is called and the response is rendered. This method
  is
  optional.
- The `process_view()` method is called just before Django calls the view.. This method is optional.

Example:

```python
from django.utils.deprecation import MiddlewareMixin


class MyMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print("process_request() is called")

    def process_response(self, request, response):
        print("process_response() is called")
        return response

    def process_exception(self, request, exception):
        print("process_exception() is called")

    def process_template_response(self, request, response):
        print("process_template_response() is called")
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        print("process_view() is called")

```

## How to write a custom middleware as a function?

- In Django 1.10+, we can write a middleware as a function.
- The function takes a `get_response` argument and returns a callable.
- The function is called once when the server starts.
- The callable is called for every request.
- The callable must return a `HttpResponse` object.
- The `get_response` argument is a callable that takes a request and returns a response.
- The `get_response` argument is used to call the next middleware in the chain.
- The `get_response` argument is used to call the view if the middleware is the last one in the chain.
- The `get_response` argument is used to return the response if the middleware is the first one in the chain.

Example:

```python
def my_middleware(get_response):
    def middleware(request):
        print("middleware() is called")
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        response = get_response(request)
        print("middleware() is called")
        # Code to be executed for each request/response after
        # the view is called.
        return response

    return middleware
```

## How to write a custom middleware as a class?

- In Django 1.10+, we can write a middleware as a class.
- The `__init__()` method is called once when the server starts, and it takes a `get_response` argument.
- The `__init__()` method must store the `get_response` argument as an instance attribute and not call it.
- The class must implement the `__call__()` method.
- The `__call__()` method is called for every request and must return a `HttpResponse` object.
- The `__call__()` method must call the `get_response` argument and return the response.
- The `__call__()` method can modify the request before calling the `get_response` argument and modify the response
  before returning it.
- The `__call__()` method can raise an exception to stop the request/response chain.

Example:

```python
class MyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        print("init() is called")

    def __call__(self, request):
        print("call() is called")
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        response = self.get_response(request)
        print("call() is called")
        # Code to be executed for each request/response after
        # the view is called.
        return response
```

## A real-world example of a custom middleware

- In this example, we will write a middleware that will log the request and response.
- The middleware will log the request and response only if the `DEBUG` setting is `True`.

```python
from django.conf import settings


class RequestResponseLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if settings.DEBUG:
            print("Request: ", request)
        response = self.get_response(request)
        if settings.DEBUG:
            print("Response: ", response)
        return response
```

So that's how you can write a custom middleware in Django. I hope you found this tutorial useful. Thanks for reading!