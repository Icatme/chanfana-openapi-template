const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Installation Tutorial & Exclusive Offers</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial;
            margin: 0;
            padding: 0;
            background: #f5f5f5;
            text-align: center;
        }
        .header {
            background: #ff6a00;
            color: #fff;
            padding: 20px 0;
            font-size: 22px;
            font-weight: bold;
        }
        .video {
            padding: 20px;
        }
        .video iframe {
            width: 100%;
            height: 200px;
            border-radius: 10px;
        }
        .gift {
            margin: 0 5%;
            background: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,.1);
        }
        .gift h3 {
            margin: 0 0 10px;
            color: #333;
        }
        .gift p {
            margin: 0 0 15px;
            font-size: 14px;
            color: #666;
        }
        form {
            display: flex;
            flex-direction: column;
        }
        input[type=email] {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 10px;
            font-size: 16px;
        }
        button {
            background: #ff6a00;
            color: #fff;
            border: none;
            padding: 12px;
            border-radius: 4px;
            font-size: 16px;
        }
        button:active {
            opacity: .8;
        }
        .footer {
            font-size: 12px;
            color: #999;
            padding: 10px;
        }
    </style>
</head>
<body>
    <div class="header">30-Second Installation Tutorial</div>
    <div class="video">
        <iframe src="https://www.youtube.com/embed/your-video-id" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="gift">
        <h3>Get 6 Months Extended Warranty for Free</h3>
        <p>Leave your email, and we'll send the activation code within 2 minutes. No ads, ever.</p>
        <form action="/" method="post">
            <input type="email" name="email" placeholder="Enter your email" required>
            <input type="hidden" name="source" value="package_insert">
            <button type="submit">Claim Now</button>
        </form>
    </div>
    <div class="footer">© 2025 YourBrand All Rights Reserved</div>
</body>
</html>
`;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'GET') {
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } else if (request.method === 'POST') {
    const formData = await request.formData();
    const email = formData.get('email');
    const source = formData.get('source');

    if (!email) {
      return new Response('Email is required', { status: 400 });
    }

    try {
      const stmt = await request.env.EMAIL_DB.prepare('INSERT INTO emails (email, source) VALUES (?, ?)');
      await stmt.bind(email, source).run();
      return new Response('Email saved successfully', {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    } catch (error) {
      return new Response('Database error: ' + error.message, {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
  } else {
    return new Response('Method not allowed', {
      status: 405,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}
