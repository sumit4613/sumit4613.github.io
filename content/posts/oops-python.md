---
title: "Oops! Python"
tags: ["python", "oops"]
date: 2022-10-12
toc: false
draft: true
---

I was refreshing my concepts of Object-Oriented Programming. So just to remember all of my learnings, I thought why not
write a blog post about it. So here it is.

## What is Object-Oriented Programming?

- Object-Oriented Programming (OOP) is a programming paradigm that uses objects and their interactions to design and
  program applications.
- OOP is a way of programming that is based on the concept of "objects", which can contain data, in the form of fields,
  often known as attributes; and code, in the form of procedures, often known as methods.
- A feature of object is that an object's procedures can access and often modify the data fields of the object with
  which they are associated (objects have a notion of "this" or "self").

## What is an Object?

- An object is a software bundle of related state and behavior.
- Objects are the things you think about first in designing a program, and they are also the units of code that are
  eventually derived from the process.
- An object is an instance of a class.

## What is a Class?

- A class is a blueprint or prototype that defines a set of attributes that will characterize any object that is
  instantiated from the class.
- A class can be defined as a collection of objects. It is a logical entity that has some specific attributes and
  methods (functions) defined within it.
- A class is like an object constructor, or a "blueprint" for creating objects.

Example:

```python
class Person:
    def __init__(self, name, age):
        # constructor of the class Person
        # self is the reference to the current instance of the class, 
        # and is used to access variables that belongs to the class.
        # It does not have to be named self, we can name it whatever we like,
        # but usually it is named self.
        self.name = name
        self.age = age

    def print_name_and_age(self):
        # self.name is the name of the person
        print(f"My name is {self.name} and I am {self.age} years old.")

p1 = Person("John Doe", 22)
p1.print_name_and_age()  # prints "My name is John Doe and I am 22 years old."
```

## What is Inheritance?

- Inheritance is a way to form new classes using classes that have already been defined.
- The newly formed classes are called derived classes, the classes that we derive from are called base classes.
- Important benefits of inheritance are code reuse and reduction of complexity of a program.
- The derived classes (descendants) override or extend the functionality of base classes (ancestors).

Example:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def print_name_and_age(self):
        print(f"My name is {self.name} and I am {self.age} years old.")

class Student(Person):
    def __init__(self, name, age, student_id):
        # call the __init__ method of the parent class
        super().__init__(name, age)
        self.student_id = student_id

    def print_student_id(self):
        print(f"My student id is {self.student_id}.")

# Here we first Create a Person object, and then we create a Student object that inherits the Person class.
# We then use the Student object to call the print_name_and_age() method, which is inherited from the Person class.
s1 = Student("John Doe", 22, 12345)
s1.print_name_and_age()  # prints "My name is John Doe and I am 22 years old."
s1.print_student_id()  # prints "My student id is 12345."
```

## What is Encapsulation?

- Encapsulation is the process of wrapping code and data together into a single unit.
- It is used to hide the values or state of a structured data object inside a class, preventing unauthorized parties' direct access to them.
- It is one of the four fundamental OOP concepts.
- The idea of encapsulation is to make sure that "sensitive" data is hidden from users.
- To achieve this, you must:
  - declare class variables/attributes as private
  - provide public get and set methods to access and update the value of a private variable

Example:
  
```python
class Person:
    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    def get_name(self):
        return self.__name

    def get_age(self):
        return self.__age

    def set_name(self, name):
        self.__name = name

    def set_age(self, age):
        self.__age = age

p1 = Person("John Doe", 22)
print(p1.get_name())  # prints "John Doe"
print(p1.get_age())  # prints "22"
p1.set_name("Peter Parker")
p1.set_age(23)
print(p1.get_name())  # prints "Peter Parker"
print(p1.get_age())  # prints "23"

# We can also access the private variables directly, but it is not recommended.
print(p1._Person__name)  # prints "Peter Parker"
print(p1._Person__age)  # prints "23"

# When we access the private variables directly, we get an error.
# This is because Python mangles the name of private variables to avoid name clashes.
# The mangled name is of the form _<class-name>__<variable-name>.
# So, the mangled name of __name is _Person__name.
print(p1.__name)  # AttributeError: 'Person' object has no attribute '__name'
```
