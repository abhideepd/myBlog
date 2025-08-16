Ever wrote something, in markdown, for the purpose of learning while doing, documenting while learning, writing a tutorial, logs, etc, however, wanted to host it automatically in a centralized way, just by uploading the file ? This is the way.

# My Blogs Engine
Well, writing is a good tool, I personally find usefull to think out loud. These later become blogs, that I can revisit at a later date to "travel back in time" to see, how I was thinking at that time. This is also a good way to show people your thought process. 

## Problem ?
well, I have written a lot of text files, markdown files etc. and couldn't keep it in a somewhere "central". I want to just write my blog, upload it somewhere, and it should magically appear on my static site, which I can view. Because, as the nos. increase, no one tends to remember them. Only if there was something, where, I can just focus on writing my blog and upload it and magically it will be displayed in a static site, hosted on github. No backend, nothing.

## Solution:
Well, now, with this tool, "My Blogs Engine", I just focus on writing down a markdown document, (I highly prefer markdown, because, it contains the right amount of formatting required, to write down your thoughts fast.). I write a blog, simply upload it in repository, and in the main index file, I update with the file name, and voila! It shows on my static site(hosted through github pages) magically. I plan to introduce latex and html files as well, to this engine and customize it further, however, 80% of my requirement is currently fulfilled !!

## How ?
well, just some plain old javascript, reading file from the folder. In the javascript module, only the files I have named are to be displayed, so, I have the freedom to upload incomplete blogs and not show up on the site. The script pulls up the file, through regex, pulls out the summary wrote in the topmost text, pullsout the title by analysing the first heading. Had also incorporated a date of upload functionality, however, bad idea, since its a static site, it will always display the current date. 