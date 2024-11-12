const {body,validationResult} = require('express-validator');

const userValidation = [
    body('name').not().isEmpty().withMessage('Name required !'),
    body('username').not().isEmpty().withMessage('Username required !'),
    body('email').isEmail().withMessage('Invalid email format !'),
    body('password').isLength({min:6}).withMessage('Must be 6 char !'),
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
]

module.exports = userValidation;