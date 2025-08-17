export const validateRequest = (schema) => {
    return (req, res, next) => {
        const dataToValidate = req.body;

        const { error } = schema.validate(dataToValidate, { abortEarly: false });

        if (error) {
            const messages = error.details.map((detail) => detail.message);
            return res.status(400).json({
                status: false,
                message: 'Validation Error',
                errors: messages
            });
        }

        next();
    };
};
