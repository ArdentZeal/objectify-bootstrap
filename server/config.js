module.exports = {
  development: {
    db: 'mongodb://localhost/objectify',
    mongoOptions: { /*db: { safe: true }*/ },
    facebook: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    }
  },
    production: {
      db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
    facebook: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "{{production callbackURL}}"
    }
  }
}