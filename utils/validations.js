const validate = require('mongoose-validator')

exports.urlValidator = validate({
    validator: value => validator.isURL(value, { protocols: ['http','https'], require_tld: true, require_protocol: true }),
    message: "Has to be a valid url"
})

exports.titleValidator = validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Post title should be between {ARGS[0]} and {ARGS[1]} characters'
})

exports.subtitleValidator = validate({
    validator: 'isLength',
    arguments: [10, 100],
    passIfEmpty: true,
    message: 'Subtitle should be between {ARGS[0]} and {ARGS[1]} characters long'
})

exports.nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Name should contain alpha-numeric characters only',
      }),
]


exports.emailValidator = validate({
    validator: 'matches',
    arguments: /^[a-zA-Z0-9.-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "Email should be valid"
})

