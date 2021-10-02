#!/usr/bin/env bash
echo "Install NPM"
npm install
echo "Audit fix"
npm audit fix
echo "Build UI and sync to AWS S3(s3://cgo-mkt-ui)"
npm run build && aws s3 sync build/ s3://cgo-mkt-ui