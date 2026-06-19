import nodemailer from 'nodemailer';
import { GMAIL_USER, GMAIL_PASS } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: GMAIL_USER,
		pass: GMAIL_PASS
	}
});

function generateTableNumber(): string {
	return `T-${Math.floor(100 + Math.random() * 900)}`;
}

function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

function formatTime(timeStr: string): string {
	const [h, m] = timeStr.split(':').map(Number);
	const ampm = h >= 12 ? 'PM' : 'AM';
	const hour = h % 12 || 12;
	return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function buildEmail(data: {
	name: string;
	email: string;
	phone: string;
	date: string;
	time: string;
	guests: number;
	tableNumber: string;
}): string {
	const { name, phone, date, time, guests, tableNumber } = data;
	const firstName = name.split(' ')[0];

	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reservation Confirmed – Carro Edeg</title>
</head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Georgia',serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0f0d0a;padding:40px 40px 32px;text-align:center;">
             <img
                src="https://i.imgur.com/tWTyTIJ.png"
                alt="Carro Edeg"
                width="120"
                style="display:block;margin:0 auto 24px;max-width:120px;width:100%;height:auto;"
                />
              <div style="width:40px;height:1px;background:#C9A84C;margin:0 auto 20px;"></div>
              <h1 style="margin:0;color:#C9A84C;font-size:13px;letter-spacing:4px;text-transform:uppercase;font-family:'Georgia',serif;font-weight:400;">
                Reservation Confirmed
              </h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:40px 40px 0;">
              <p style="margin:0 0 8px;color:#0f0d0a;font-size:26px;font-family:'Georgia',serif;line-height:1.3;">
                Welcome, ${firstName}.
              </p>
              <p style="margin:0;color:#6b6457;font-size:15px;line-height:1.7;font-family:Arial,sans-serif;">
                Your table is reserved. We look forward to welcoming you and your guests to Carro Edeg — where every evening is crafted with intention.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:32px 40px;">
              <div style="height:1px;background:#e8e2d8;"></div>
            </td>
          </tr>

          <!-- Booking Details Card -->
          <tr>
            <td style="padding:0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;border-radius:12px;border:1px solid #e8e2d8;overflow:hidden;">

                <!-- Card header -->
                <tr>
                  <td colspan="2" style="background:#C9A84C;padding:14px 24px;">
                    <p style="margin:0;color:#0f0d0a;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;">
                      Booking Details
                    </p>
                  </td>
                </tr>

                <!-- Table number -->
                <tr>
                  <td style="padding:18px 24px 10px;color:#6b6457;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;width:40%;">Table</td>
                  <td style="padding:18px 24px 10px;color:#0f0d0a;font-size:15px;font-family:'Georgia',serif;font-weight:bold;">${tableNumber}</td>
                </tr>
                <tr><td colspan="2" style="padding:0 24px;"><div style="height:1px;background:#e8e2d8;"></div></td></tr>

                <!-- Name -->
                <tr>
                  <td style="padding:14px 24px 10px;color:#6b6457;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Guest</td>
                  <td style="padding:14px 24px 10px;color:#0f0d0a;font-size:15px;font-family:'Georgia',serif;">${name}</td>
                </tr>
                <tr><td colspan="2" style="padding:0 24px;"><div style="height:1px;background:#e8e2d8;"></div></td></tr>

                <!-- Date -->
                <tr>
                  <td style="padding:14px 24px 10px;color:#6b6457;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Date</td>
                  <td style="padding:14px 24px 10px;color:#0f0d0a;font-size:15px;font-family:'Georgia',serif;">${formatDate(date)}</td>
                </tr>
                <tr><td colspan="2" style="padding:0 24px;"><div style="height:1px;background:#e8e2d8;"></div></td></tr>

                <!-- Time -->
                <tr>
                  <td style="padding:14px 24px 10px;color:#6b6457;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Time</td>
                  <td style="padding:14px 24px 10px;color:#0f0d0a;font-size:15px;font-family:'Georgia',serif;">${formatTime(time)}</td>
                </tr>
                <tr><td colspan="2" style="padding:0 24px;"><div style="height:1px;background:#e8e2d8;"></div></td></tr>

                <!-- Guests -->
                <tr>
                  <td style="padding:14px 24px 10px;color:#6b6457;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Guests</td>
                  <td style="padding:14px 24px 10px;color:#0f0d0a;font-size:15px;font-family:'Georgia',serif;">${guests} ${guests === 1 ? 'guest' : 'guests'}</td>
                </tr>
                <tr><td colspan="2" style="padding:0 24px;"><div style="height:1px;background:#e8e2d8;"></div></td></tr>

                <!-- Phone -->
                <tr>
                  <td style="padding:14px 24px 18px;color:#6b6457;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Phone</td>
                  <td style="padding:14px 24px 18px;color:#0f0d0a;font-size:15px;font-family:'Georgia',serif;">${phone}</td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Note -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid #C9A84C;padding-left:0;">
                <tr>
                  <td style="padding:0 0 0 16px;color:#6b6457;font-size:14px;line-height:1.7;font-family:Arial,sans-serif;font-style:italic;">
                    Please arrive a few minutes before your reservation. If your plans change, we kindly ask for at least 2 hours notice. You can reach us directly by replying to this email.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:32px 40px;">
              <div style="height:1px;background:#e8e2d8;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f0d0a;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 6px;color:#C9A84C;font-size:16px;letter-spacing:3px;text-transform:uppercase;font-family:'Georgia',serif;">
                Carro Edeg
              </p>
              <p style="margin:0 0 16px;color:#6b6457;font-size:12px;font-family:Arial,sans-serif;">
                Fine dining, crafted with intention.
              </p>
              <div style="width:24px;height:1px;background:#C9A84C;margin:0 auto 16px;"></div>
              <p style="margin:0;color:#6b6457;font-size:11px;font-family:Arial,sans-serif;">
                © ${new Date().getFullYear()} Carro Edeg. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = (await request.json()) as {
			name: string;
			email: string;
			phone: string;
			date: string;
			time: string;
			guests: number;
		};

		const { name, email, phone, date, time, guests } = body;

		if (!name || !email || !phone || !date || !time || !guests) {
			return json({ message: 'Missing required fields.' }, { status: 400 });
		}

		const tableNumber = generateTableNumber();

		await transporter.sendMail({
			from: `Carro Edeg <${GMAIL_USER}>`,
			to: email,
			subject: `Your table is reserved — ${tableNumber} · Carro Edeg`,
			html: buildEmail({ name, email, phone, date, time, guests, tableNumber })
		});

		return json({ success: true, tableNumber });
	} catch (err) {
		console.error('Reservation error:', err);
		return json({ message: 'Failed to send confirmation. Please try again.' }, { status: 500 });
	}
};
