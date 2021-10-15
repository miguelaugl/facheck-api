export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5040,
  jwtSecretKey: process.env.JWT_SECRET_KEY || '311cd9fb97b28f0bf092f1ba7ccda113',
}
