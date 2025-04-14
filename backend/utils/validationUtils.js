

const joi = require('joi');
const passwordErrorMessage = 
'Password must be 8-20 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';

const validateRegister = (obj) => {
   
    const schema = joi.object({
        fullname: joi.string()
            .min(6)
            .max(50)
            .required()
            .messages({
                "string.min": "Fullname must be at least 6 characters",
                "string.max": "Fullname cannot exceed 50 characters",
                "any.required": "Fullname is required"
            }),

        steg_email: joi.string()
            .email()
            // .pattern(/@steg\.com\.tn$/)//$takmel b hadhaka
            .required()
            .messages({
                "string.email": "Invalid email format",
                // "string.pattern.base": "You must enter your STEG email (e.g., xxx@steg.com.tn)",
                "any.required": "steg_email is required"
            }),

        password: joi.string()
            .min(8)
            .max(20)
            .pattern(/[a-z]/)
            .pattern(/[A-Z]/)
            .pattern(/[0-9]/)
            .pattern(/[^a-zA-Z0-9]/)
            .required()
            .messages({
                "string.min": passwordErrorMessage,
                "string.max": passwordErrorMessage,
                "string.pattern.base": passwordErrorMessage,
                "any.required": "Password is required"
            }),
            unit: joi.string()
            .valid('central', 'groupement' , 'direction')
            .required()
            .messages({
                'any.required': 'You must specify a unit (central or groupement or direction)',
                'any.only': 'You must specify a unit (central or groupement or direction) '
            }),

            unitid: joi.number()
            .required()
           .messages({
            'number.base': `The name of the ${obj.unit} is required`, 
            'any.required': `The name of the ${obj.unit} is required`, //he is going to select the name the unit and we are going to get the id
        })
       
    });

    return schema.validate(obj);
};

const validatelogin  = (obj) =>{
   
    const schema = joi.object({
        steg_email: joi.string()
        .email()
        // .pattern(/@steg\.com\.tn$/)//$takmel b hadhaka
        .required()
        .messages({
            "string.email": "Invalid email format",
            // "string.pattern.base": "invalid steg email",
            "any.required": "steg_email required"
        }),
        password: joi.string()
            .min(8)
            .max(20)
            .pattern(/[a-z]/)
            .pattern(/[A-Z]/)
            .pattern(/[0-9]/)
            .pattern(/[^a-zA-Z0-9]/)
            .required()
            .messages({
                "string.min": "invalid password",
                "string.max": "invalid password",
                "string.pattern.base": "invalid password",
                "any.required": "Password required"
            }),


     });
     return schema.validate(obj);
}


const validateResetpassword = (obj) => {
    const schema = joi.object({
        steg_email: joi.string()
          .email()
          .required()
          .messages({
              "string.email": "Invalid email format",
              "any.required": "steg_email required"
          })
    });
    return schema.validate(obj);
};
const validatePassword =(obj)=>{
   
    const schema = joi.object({
        newPassword: joi.string()
            .min(8)
            .max(20)
            .pattern(/[a-z]/)
            .pattern(/[A-Z]/)
            .pattern(/[0-9]/)
            .pattern(/[^a-zA-Z0-9]/)
            .required()
            .messages({
                "string.min": passwordErrorMessage,
                "string.max": passwordErrorMessage,
                "string.pattern.base": passwordErrorMessage,
                "any.required": passwordErrorMessage
            })

    });
    return schema.validate(obj);
}






module.exports = {validateRegister ,validatelogin ,validateResetpassword,validatePassword};


// the backslashes are for escaping because the dot'.' means match anycaractere
//password must be accepted by all paterns 