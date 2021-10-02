# sertis-test

# Start API
docker build -t sertis_api .  
docker run --name sertis_api -it sertis_api

# Start Frontend
npm install --legacy-peer-deps.  
npm start

# Test Users
username: author1
pass: abc123456!

username: author2
pass: abc123456!
