const { body, validationResult } = require('express-validator')

const validatorMiddlewares = {

    password: body('password').notEmpty().trim().isStrongPassword({
        minLength: 12,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1
    }),
    email: body('email').notEmpty().isEmail(),
    validationResult: (req, res, next) => {
        const result = validationResult(req)
        console.log(req.body)
        if(!result.isEmpty()){
            return res.status(400).json({ result: result.array()})
        }
        next()
    }
}


module.exports = validatorMiddlewares