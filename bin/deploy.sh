#!/bin/bash
SERVER=$1

git remote get-url $SERVER
if [ $? -ne 0 ]; then
    echo "Unable to deploy!"
    echo "----------------------------------------------"
    echo "Server: $SERVER does not exist!"
    echo "Please add $SERVER remote and try again."
	exit 1
fi

if ! CURRENTBRANCH=$(git symbolic-ref --short -q HEAD); then
	echo "Cannot find current branch."
	exit 1
fi

if ! git diff-index --quiet HEAD --; then
    echo "Unable to deploy to ${SERVER}!"
    echo "----------------------------------------------"
	echo "There are uncommited changes on this repository."
    echo "Please commit your changes and try again."
	exit 1
else
    echo "Starting deployment from branch ${CURRENTBRANCH}"
    echo "----------------------------------------------"
    git push ${SERVER} ${CURRENTBRANCH}:master
fi
