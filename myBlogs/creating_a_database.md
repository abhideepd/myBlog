I always have been fascinated with database. I also like, writing database queries (love solving the leetcode type problems for databases!!). This is a documentation for deep diving into the rabbit hole of database.


# Database from scratch
The below course is a popular one int MIT, where its a part of their curriculum to make a database from scratch. They really have put some work into this!! There are very few "thing" that comes close to this course. The chinese have created a c# version of this course as well (this one is in java)
https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/resources/mit6_830f10_lab1/


so, simpleDb is the main file, I am trying to understand by traversing the files, in this way. <br> 
- simpleDb <br>
    - HeapFileEncoder
        - HeapPage
            - Database
                - creates a new database instance, as well as catalog and buffer pool and logFiles
                - also, the from what it seems, the rest of the codebase will be asking for the instance of the above mention object from the Database class itself.
            - Catalog : it basically, contains all the tables present in the database and their respective schemas.
            - BufferPool
        - HeapFile
        - tuples
        - outFile