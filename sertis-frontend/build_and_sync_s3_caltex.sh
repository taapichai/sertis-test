#!/usr/bin/env bash
cd /home/kavin/git/mkt-ui
echo "Removed /home/kavin/git/mkt-ui/build"
rm -rf /home/kavin/git/mkt-ui/build
echo "Build UI and sync to AWS S3(s3://cgo-t1-caltex)"
npm run build && aws s3 sync build/ s3://cgo-t1-caltex --profile cgo-caltex-s3-deploy