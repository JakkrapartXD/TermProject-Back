const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validateInput } = require('../middleware/validate-input');
const { adduser } = require('../controllers/adduser');

router.post('/add',
[
    check('name_title', 'Title is required').notEmpty(),
    check('name_first', 'Firstname is required').notEmpty(),
    check('name_last', 'Lastname is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('login_password', 'Password is required').notEmpty(),
    check('picture_thumbnail', 'Picture is required').notEmpty(),
    validateInput
],
 adduser);

module.exports = router;