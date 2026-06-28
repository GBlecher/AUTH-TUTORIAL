import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
      category: "Email Verification",
    });

    console.log("Verification email sent successfully:", response);
  } catch (error) {
    console.error(`Failed to send verification email: ${error}`);
    throw new Error(`Failed to send verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response =await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "28f9d4fc-ae27-4026-94ae-2f8501c0fb8d",
      template_variables: {
        company_info_name: "Auth Company",
        name: name,
      },
    });

    console.log("Welcome email sent successfully:", response);
  } catch (error) {
    console.error(`Failed to send welcome email: ${error}`);
    throw new Error(`Failed to send welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail   = async (email, resetURL) => {
  const recipient = [{ email }];
  try{
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

    console.log("Reset password email sent successfully:", response);

    
  } catch (error) {
    console.error(`Failed to send reset password email: ${error}`);
    throw new Error(`Failed to send reset password email: ${error}`);
  }
}

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try{
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Success",
    });

    console.log("Reset success email sent successfully:", response);
  }catch (error) {
    console.error(`Failed to send reset success email: ${error}`);
    throw new Error(`Failed to send reset success email: ${error}`);
  }
}