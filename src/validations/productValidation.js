const {body,validationResult} = require('express-validator');

const productValidation = [
    body('name').not().isEmpty().withMessage('name required !'),
    body('price').not().isEmpty().withMessage('price required !'),
    body('description').not().isEmpty().withMessage('description required !'),
    body('category').not().isEmpty().withMessage('category required !'),
    body('image').not().isEmpty().withMessage('image required !'),
    body('oldprice').not().isEmpty().withMessage('old price required !'),
    body('stock').not().isEmpty().withMessage('street required !'),
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
]

module.exports = productValidation;