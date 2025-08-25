summary: just getting up to speed with all the new stuff, java 8 is doing and what all has been implemented. well, not restricted to java 8 but updated features of java in general.



# Java 8
- BiConsumer, only accepts, two types of values, and doesn't return anything.
- as a consumer, we just consume    
- in interfaces, the difference between default and static is:
    - default: the implemented classes are not forced to override it, however, they have an option to override
    - static: the implemented classese can't override it, they can just use it.
    - @FunctionalInterface: exactly one abstract method inside this interface.
    - marker interface- interface without any method
- @FunctionalInterfaces
    - we can define our custom functional intefaces
    - Similar to Predicate, BiConsumer, yada yada
    - what is the freeking, predicate ? Predicate<T> xyz=... what is it ?
    - Its nothing but a functional interface, with abstract method with return type boolean.
    - here is some delicious code:
        ```java
        Predicate<String> checkLength = s -> s.length()>=5;
        System.out.println(checkLength.test("Hello World"));
        ```
    - So, what's test ? Its the abstract class that implements my lambda expression!
    - Predicate joining ? aggregate predicates, using and, or, negate. is the length greater than 5 and length less than 10
        - And: and operator type behaviour
        - Or: or operator type behaviour
        - Negate: literally removes one of the operations.
    - The Function<T,R> functional interface *(why functional interface ? because, it has one abstract method, called, "apply")*
        - In this, T is for function prototype datatype and R is for function return datatype
            - That's why the abstract method is <code>R apply(T t)</code>
        - We also have functional chaining, as the name suggests, chaining the functions.
            - andThen and Compose then apply
            - andThen, follows the order, linearly, one by one
            - compose, reverses it.
    - Consumer: as the name suggests, it doesn't return anything, meaning, it has a return type of void.
        - the abstract method is, accept
        - No compose in consumer, only, andThem, in order to chain the functions.
        - andThen(Function_Name).accept(value)
        - Consumer<T>
    - Supplier: as the name suggests, will only supply, or return, nothing else, no consumption.   
        - Supply<T>:
            ```java
            T get();
            ```
        - The above is the abstract method, where there is only a return type.
        - No chaining is required.
    - BiPredicate, BiFunction, BiConsumer, but, there is no BiSupplier, because it isn't required.
    - For biPredicate, what if, we want to add two nos. and print the sum ? the Predicate can't do it, because, it can accept only 1 argument, here comes, biPredicate<T,R>, as you can see, it accepts two function arguments, hence two nos.
    - similarly, biFunction, where we multiple two different nos, instead of a single no. or anything, specify the return type, since this function accepts value as well as return. now, we can multiply two different nos. and get ther value as well! or something else. biFunction<T,Q,R>, T and Q is for taking the input, and R is the returntype.
