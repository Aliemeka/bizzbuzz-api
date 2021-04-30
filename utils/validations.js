const validate = require('mongoose-validator')

exports.urlValidator = validate({
    validator: value => validator.isURL(value, { protocols: ['http','https'], require_tld: true, require_protocol: true }),
    message: "Has to be a valid url"
})

// exports.titleValidator = validate({
//     validator: 'isLength',
//     arguments: [3, 50],
//     message: 'Post title should be between {ARGS[0]} and {ARGS[1]} characters'
// })

// exports.subtitleValidator = validate({
//     validator: 'isLength',
//     arguments: [10, 100],
//     passIfEmpty: true,
//     message: 'Subtitle should be between {ARGS[0]} and {ARGS[1]} characters long'
// })

exports.postValidator = validate({
    validator: 'isLength',
    arguments: [2, 600],
    passIfEmpty: true,
    message: 'Post should be between {ARGS[0]} and {ARGS[1]} characters long'
})

exports.replyValidator = validate({
    validator: 'isLength',
    arguments: [2, 100],
    message: 'Post should be between {ARGS[0]} and {ARGS[1]} characters long'
})

exports.usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'username should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'username should contain alpha-numeric characters only',
      }),
]


exports.emailValidator = validate({
    validator: 'isEmail',
    message: "Email should be valid"
})

