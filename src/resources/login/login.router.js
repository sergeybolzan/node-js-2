const router = require('express').Router();
const loginService = require('./login.service');
const { OK } = require('http-status-codes');
const ForbiddenError = require('../../errors/forbiddenError');

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  try {
    const token = await loginService.signToken(login, password);
    res.status(OK).json({ token });
  } catch (e) {
    throw new ForbiddenError();
  }
});

module.exports = router;
