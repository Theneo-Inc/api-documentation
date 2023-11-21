#!/bin/bash

# Check if URL and at least one search string are provided
if [ -z "$1" ] || [ "$#" -lt 2 ]; then
  echo "Usage: $0 <URL> <search_string1> [search_string2 ...]"
  exit 1
fi

url=$1
shift
search_strings=("$@")

# Make a curl request and capture the HTTP status code and HTML content
http_status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
html_content=$(curl -s "$url")

# Check if the HTTP status code is 200
if [ "$http_status" -eq 200 ]; then
  echo "Request successful! HTTP Status Code: $http_status"

  # Check if each search string is present in the HTML content
  for search_string in "${search_strings[@]}"; do
    if [[ "$html_content" =~ "$search_string" ]]; then
      echo "String '$search_string' found in the HTML content."
    else
      echo "String '$search_string' not found in the HTML content."
      exit 1
    fi
  done

  exit 0
else
  echo "Request failed! HTTP Status Code: $http_status"
  exit 1
fi
