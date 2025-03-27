export const getWelcomeTemplate = ({
    username
}: {
    username: string;
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MyTechHomeVerse</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            -webkit-text-size-adjust: 100%;
            line-height: 1.6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            padding: 0;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            overflow: hidden;
        }
        .header {
            text-align: center;
            padding: 30px 0;
            background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%);
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: clamp(1.8rem, 4vw, 2.2rem);
            font-weight: 700;
            letter-spacing: -0.025em;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .content {
            padding: 32px 24px;
        }
        .welcome-message {
            text-align: center;
            padding: 24px;
            margin: 0 0 32px;
            background-color: #f1f5f9;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        .welcome-message h2 {
            font-size: clamp(1.4rem, 3vw, 1.8rem);
            margin: 0 0 12px;
            color: #1e293b;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin: 32px 0;
        }
        .feature {
            text-align: center;
            padding: 24px;
            background-color: #ffffff;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            transition: transform 0.2s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .feature:hover {
            transform: translateY(-2px);
        }
        .feature h3 {
            font-size: clamp(1.1rem, 2.5vw, 1.3rem);
            margin: 0 0 12px;
            color: #1e293b;
        }
        .feature p {
            font-size: clamp(0.95rem, 2vw, 1.05rem);
            margin: 0;
            color: #64748b;
        }
        .cta-button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
            color: white;
            text-decoration: none;
            border-radius: 30px;
            font-weight: 600;
            margin: 24px 0;
            transition: all 0.3s ease;
            font-size: clamp(1rem, 2.5vw, 1.1rem);
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
        }
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 8px -1px rgba(79, 70, 229, 0.3);
        }
        .footer {
            text-align: center;
            padding: 32px 24px;
            color: #64748b;
            font-size: clamp(0.9rem, 2vw, 1rem);
            border-top: 1px solid #e2e8f0;
            background-color: #f8fafc;
        }
        .footer-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 16px;
            margin: 24px 0;
        }
        .footer-links a {
            color: #4f46e5;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 20px;
            transition: all 0.2s ease;
            background-color: #eef2ff;
        }
        .footer-links a:hover {
            background-color: #e0e7ff;
            color: #4338ca;
        }
        @media screen and (max-width: 480px) {
            .container {
                margin: 10px;
            }
            .content {
                padding: 24px 16px;
            }
            .feature {
                margin: 8px 0;
            }
            .footer-links {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to MyTechHomeVerse! 🚀</h1>
        </div>
        
        <div class="content">
            <div class="welcome-message">
                <h2>Hello ${username}! 👋</h2>
                <p>We're absolutely thrilled to have you join our community of tech enthusiasts! Get ready for an amazing journey.</p>
            </div>

            <div class="features">
                <div class="feature">
                    <h3>🎁 Exclusive Deals</h3>
                    <p>Unlock special offers and premium discounts on the latest tech products</p>
                </div>
                <div class="feature">
                    <h3>⚡ Lightning Fast Delivery</h3>
                    <p>Experience swift and reliable shipping straight to your doorstep</p>
                </div>
                <div class="feature">
                    <h3>🛡️ Secure Shopping</h3>
                    <p>Shop with complete peace of mind using our secure payment system</p>
                </div>
            </div>

            <div style="text-align: center;">
                <p style="font-size: 1.1rem; color: #1e293b;">Ready to embark on your tech journey with us?</p>
                <a href="${process.env.host_domain}" class="cta-button">Start Exploring Now →</a>
            </div>

            <p style="text-align: center; margin-top: 32px; color: #64748b;">
                Have questions? Our dedicated support team is here 24/7 to help you!
            </p>
        </div>

        <div class="footer">
            <p>Best regards,<br><strong>The MyTechHomeVerse Team</strong></p>
            <div class="footer-links">
                <a href="#">🛍️ Browse Products</a>
                <a href="#">💬 Contact Support</a>
                <a href="#">❓ FAQs</a>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
                © ${new Date().getFullYear()} MyTechHomeVerse. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
`