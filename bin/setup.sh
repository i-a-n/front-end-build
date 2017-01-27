#!/bin/bash

NAME=$(grep name -m1 package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')

for i in dev qa staging
do
    git remote get-url $i
    if [ $? -ne 0 ]
    then
    	echo "Remote $i does not exist."
        echo "Adding $i remote..."
        git remote add $i dokku@$i.burke.io:$NAME
        echo "$i remote added!"
        echo "------------------------------------"
        echo "URL: http://$NAME.$i.burke.io"
        echo
        echo
    else
        echo "Dokku configuration for $i already exists."
        echo "------------------------------------"
        echo "URL: http://$NAME.$i.burke.io"
        echo
        echo
    fi
done
