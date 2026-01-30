import nodemailer from 'nodemailer';
import { betterAuth, email } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins: [process.env.APP_URL!],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "STUDENT",
                required: false
            },
            phone: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false
            }
        }
    },
    emailAndPassword: { 
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
            const emailVerificationUrl = `{process.env.APP_URL}/verify-email?token=${token}`
        const info = await transporter.sendMail({
            from: '"Prisma Blog" <prismablog@gmail.com>',
            to: user.email,
            subject: "Please verification your email! ✔",
            text: "Hello world?", // Plain-text version of the message
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
        <td align="center" style="padding:40px 0;">
            
            <!-- Main Container -->
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
                <td style="background:#0d6efd; padding:20px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:24px;">
                    Prisma Blog
                </h1>
                </td>
            </tr>

            <!-- Body -->
            <tr>
                <td style="padding:30px;">
                <h2 style="margin-top:0; color:#333;">
                    Verify your email address
                </h2>

                <p style="color:#555; font-size:15px; line-height:1.6;">
                    Hello ${user.name} <br><br />
                    Thank you for signing up for <strong>Prisma Blog</strong>.
                    Please confirm your email address by clicking the button below.
                </p>

                <!-- Button -->
                <div style="text-align:center; margin:30px 0;">
                    <a href="${emailVerificationUrl}"
                    style="background:#0d6efd; color:#ffffff; padding:12px 24px;
                            text-decoration:none; border-radius:5px;
                            font-size:16px; display:inline-block;">
                    Verify Email
                    </a>
                </div>

                <p style="color:#555; font-size:14px;">
                    If the button doesn’t work, copy and paste this link into your browser:
                </p>

                <p style="word-break:break-all; font-size:13px; color:#0d6efd;">
                    ${url}
                </p>

                <p style="color:#888; font-size:13px; margin-top:30px;">
                    If you didn’t create an account, you can safely ignore this email.
                </p>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#777;">
                © {{YEAR}} Prisma Blog. All rights reserved.
                </td>
            </tr>

            </table>
            <!-- End Container -->

        </td>
        </tr>
    </table>

</body>
</html>
`
        });

        console.log("Message sent:", info.messageId);
            } catch (error) {
                console.error(error);
                throw error
            }
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});