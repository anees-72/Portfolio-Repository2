#!/bin/bash

# Install dependencies
pip3 install -r requirements.txt

# Collect static files
python3 manage.py collectstatic --noinput

# Copy files to Vercel's output directory
mkdir -p /vercel/output/static/encyclopedia  
cp -r public/encyclopedia/* /vercel/output/static/encyclopedia/
cp -r wiki/ /vercel/output/