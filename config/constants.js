module.exports = {
  PORT: process.env.PORT,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SUPER_ADMIN_KEY: process.env.SUPER_ADMIN_KEY,
  JWT_KEY: process.env.JWT_KEY,
  MONGODB_URL: process.env.MONGODB_URL,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  INITIALIZATION_VECTOR: process.env.INITIALIZATION_VECTOR,
  QUEUE: {
    TRANSACTION_QUEUE: "transaction_queue",
    TRANSACTION_SUCCESS: "transaction_success",
    SMS_OTP: "sms_otp",
  },
  TRANSACTION: {
    CREDIT: "credit",
    DEBIT: "debit",
  },
  STATUS: {
    SUCCESS: "success",
    PENDING: "pending",
    FAILED: "failed",
  },
  EMIT: {
    PROFILE: {
      CREATED: "profile_created",
    },
    USER: {
      CREATED: "user_created",
    },
  },
  TRANSACTION: {
    CREDIT: "credit",
    DEBIT: "debit",
  },
  STATUS: {
    SUCCESS: "success",
    PENDING: "pending",
    FAILED: "failed",
  },
};
