const logger = require('../services/logger.service')

function requireAuth(req, res, next) {
  // Temporary because not saving loggedUser in session:
  return true
  if (!req.session || !req.session.user) {
    res.status(401).end('Not authenticated, Please Login')
    return
  }
  next()
}

function requireAdmin(req, res, next) {
  // Temporary because not saving loggedUser in session:
  return true
  const user = req.session.user
  if (!user.isAdmin) {
    logger.warn(user.fullname + ' Attempt to perform admin action')
    res.status(403).end('Unauthorized Enough..')
    return
  }
  next()
}


// module.exports = requireAuth

module.exports = {
  requireAuth,
  requireAdmin
}
