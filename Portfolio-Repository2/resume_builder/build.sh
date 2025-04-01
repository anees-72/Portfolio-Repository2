#!/bin/bash

# Install dependencies
pip3 install -r requirements.txt
apt-get update && apt-get install -y wkhtmltopdf

# Collect static files
python3 manage.py collectstatic --noinput

# Copy files to Vercel's output directory
cp -r public/ /vercel/output/
cp -r resume_builder/ /vercel/output/