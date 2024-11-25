const {body,validationResult} = require('express-validator');

const addressValidation = [
    body('city').not().isEmpty().withMessage('city required !'),
    body('street').not().isEmpty().withMessage('street required !'),
    body('state').not().isEmpty().withMessage('state required !'),
    body('country').not().isEmpty().withMessage('country required !'),
    body('pincode').isLength({min:6}).withMessage('Enter a valid pincode !'),
    body('phone').isLength({max:10,min:10}).withMessage('Enter a valid phone number !'),
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
]

module.exports = addressValidation;