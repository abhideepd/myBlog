# Problem Statement

In order to transfer, csv files to database, simply loop through a csv reader, convert it into a dto and add to repository.
<br>
However, what if the csv file is huge, then, we can upload in batches into the db
<be>
However, what if, the file is so huge, the list containing the dtos is exceeding memory heap.