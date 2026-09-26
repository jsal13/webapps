#!/bin/sh
set -e

echo "Uploading to AWS S3..."
aws s3 cp --recursive \
  --exclude ".git/*" \
  --exclude "Makefile" \
  --exclude ".claude/*" \
  --exclude ".tool-versions" \
  . s3://james-salvatore-apps/
echo "Upload complete."