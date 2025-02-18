#!/bin/bash
WATCH_DIR="/home/femivenus/blogs/blogs"
BUCKET="s3://drylogics-website/blogs"

inotifywait -m -r -e modify,create,delete --format '%w%f' "$WATCH_DIR" | while read FILE
do
    echo "Detected change in $FILE"
    aws s3 sync "$WATCH_DIR" "$BUCKET" --delete --region ap-south-1
done
