{
  "name": "career-guidance",
  "private": true,
  "scripts": {
    "install-all": "npm install && npm install --prefix server && npm install --prefix client",
    "dev": "concurrently -n server,client -c blue,green \"npm run dev --prefix server\" \"npm run dev --prefix client\"",
    "seed": "npm run seed --prefix server"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
