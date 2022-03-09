#!/bin/bash/
cd /home/apherfox/Coding/OpenAI-Discord-Bot/.git/lost-found/other/
FILES=*
COUNTER = 0
for f in $FILES do echo "Processing $f file..." git show $f > "/home/apherfox/Coding/OpenAI-Discord-Bot/$COUNTER.m" let COUNTER=COUNTER+1 done