---
title: "Let's talk about decorators in Python"
tags: ["python"]
date: 2022-11-23
toc: false
draft: false
---

Let's learn a little about decorators in Python. We will learn about what are decorators, how to use them, and how
to create them.

## What are decorators?

Decorators are functions which take another function as an argument and returns another function. They are used to
extend the behavior of the latter function without explicitly modifying it.

## How to use decorators?

Let's see how to use decorators in Python. We will use the `@` symbol to use decorators. Let's see an example:

```python
# let's define a simple function which will be our decorator
def decorator_function(original_function):
    def wrapper_function():
        print(f"wrapper executed this before {original_function.__name__}")
        return original_function()

    return wrapper_function


# let's create a simple function
# and use the decorator on it
@decorator_function
def display():
    print("display function ran")
```

## How to create decorators?

Let's see how to create decorators in Python. Let's see an example:

```python
# Define a decorator function which explicitly checks for TypeError and prints a message
# This will only handle TypeError for the decorated function, not for other exceptions
def decorator_function(original_function):
    def wrapper_function(*args, **kwargs):
        try:
            return original_function(*args, **kwargs)
        except TypeError:
            print(f"TypeError occurred in {original_function.__name__}")
            print("You are passing the wrong arguments")

    return wrapper_function


# Let's create a simple function
@decorator_function
def addition(a, b):
    return a + b


# Let's call the function
print(addition(1, 2))  # prints 3
print(addition(1, "2"))  # prints "You are passing the wrong arguments"
```

But there's one problem with the above decorator. `addition` function lost its identity after being decorated. Let's
see how to fix this problem.

Let's check the identity of the `addition` function before and after being decorated:

```python
# Let's check the identity of the function
def addition(a, b):
    return a + b


print(addition)  # prints <function addition at 0x7f9b1c0b0d40>
print(addition.__name__)  # prints "addition"


# Create a decorator function
def decorator_function(original_function):
    def wrapper_function(*args, **kwargs):
        try:
            return original_function(*args, **kwargs)
        except TypeError:
            print(f"TypeError occurred in {original_function.__name__}")
            print("You are passing the wrong arguments")

    return wrapper_function


# Let's decorate the function
@decorator_function
def addition(a, b):
    return a + b


print(addition)  # prints <function decorator_function.<locals>.wrapper_function at 0x7f9b1c0b0d40>
print(addition.__name__)  # prints "wrapper_function"
# As we can see, the identity, and metadata of the function has changed. Let's see how to fix this problem.

# Let's fix the identity of the function

# Let's import functools
# https://docs.python.org/3/library/functools.html#functools.wraps
import functools


# Let's create a decorator function
def decorator_function(original_function):
    # Notice the use of functools.wraps
    @functools.wraps(original_function)
    def wrapper_function(*args, **kwargs):
        try:
            return original_function(*args, **kwargs)
        except TypeError:
            print(f"TypeError occurred in {original_function.__name__}")
            print("You are passing the wrong arguments")

    return wrapper_function


# Let's decorate the function
@decorator_function
def addition(a, b):
    return a + b


# Let's check the identity of the function
print(addition)  # prints <function addition at 0x7f9b1c0b0d40>
print(addition.__name__)  # prints "addition"
# As we can see, the identity, and metadata of the function has been restored.
```

## Conclusion

That's it. I hope this post helped you. If you have any questions, feel free to reach out. I'll try to answer them as
soon as possible. If you find any mistakes in the post, please create an issue or raise pull request with the fix.