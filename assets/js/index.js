// Define allowed origins
const allowedOrigins = [
  'http://localhost:8888', // Local development
  'https://paintguard.uk',
];

// Helper function to create CORS headers
function getCorsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: getCorsHeaders(request.headers.get('origin')),
      });
    }

    // Set CORS headers for all responses
    const corsHeaders = getCorsHeaders(request.headers.get('origin'));

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ message: 'Method Not Allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    try {
      // Parse the request body
      const { name, email, message, botField } = await request.json();

      // Check honeypot field
      if (botField) {
        return new Response(
          JSON.stringify({ message: 'Bot detected. Submission rejected.' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Validate required fields
      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({ message: 'Name, email, and message are required' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Send email using Resend API
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Contact Form <onboarding@resend.dev>',
          to: [env.SEND_EMAIL_TO],
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h3>New Message from ${name}</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
          `,
        }),
      });

      const resendData = await resendResponse.json();

      if (!resendResponse.ok) {
        console.error('Resend error:', resendData);
        return new Response(
          JSON.stringify({ message: 'Failed to send email', error: resendData }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ message: 'Email sent successfully', data: resendData }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Server error:', error);
      return new Response(
        JSON.stringify({ message: 'Internal server error', error: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};