export const getOtpEmailTemplate = ({
    username,
    otp
}: {
    username: string;
    otp: string;
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #1a73e8;
            color: white;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 30px;
            color: #333333;
        }
        .otp-box {
            background-color: #f8f9fa;
            border: 2px dashed #1a73e8;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
            font-size: 32px;
            letter-spacing: 5px;
            font-weight: bold;
            color: #1a73e8;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MyTechHomeVerse</h1>
        </div>
        <div class="content">
            <h2>Hello ${username},</h2>
            <p>You have requested to reset your password. Please use the following OTP to complete your password reset:</p>
            
            <div class="otp-box"> 
                ${otp}
            </div>
            
            <p>This OTP will expire in 10 minutes for security reasons. Please do not share this OTP with anyone.</p>
            
            <p>If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.</p>
            
            <p>Best regards,<br>MyTechHomeVerse Team</p>
        </div>
        <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} MyTechHomeVerse. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`