summary: just getting up to speed with all the new stuff, java 8 is doing and what all has been implemented.



# Java 8
- BiConsumer, only accepts, two types of values, and doesn't return anything.
- as a consumer, we just consume    
- in interfaces, the difference between default and static is:
    - default: the implemented classes are not forced to override it, however, they have an option to override
    - static: the implemented classese can't override it, they can just use it.
    - @FunctionalInterface: exactly one abstract method inside this interface.
    - marker interface- interface without any method