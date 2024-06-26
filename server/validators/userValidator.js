import { body, validationResult } from "express-validator";

export const validateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("user_type")
    .optional()
    .isIn(["admin", "user"])
    .withMessage('User type must be either "admin" or "user"'),
  body("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/
    )
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
