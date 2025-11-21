import 'dotenv/config';
import { Buffer } from 'buffer';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

if (!client_id || !client_secret) {
  console.error('❌ Error: SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in your .env file.');
  console.log('Please create an app at https://developer.spotify.com/dashboard to get these credentials.');
  console.log('Then add them to your .env file and run this script again.');
  process.exit(1);
}

const redirect_uri = 'http://127.0.0.1:4321/callback';
const scopes = 'user-read-currently-playing user-read-recently-played';

const step1 = () => {
  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  console.log('1. 🔗 Go to this URL to authorize the app:');
  console.log('\n' + url + '\n');
  console.log('2. ↩️  After authorizing, you will be redirected to a URL like http://127.0.0.1:4321/callback?code=...');
  console.log('3. 📋 Copy the "code" parameter from that URL (everything after code= and before any &).');
  console.log('4. 🏃 Run this script again with the code as an argument:');
  console.log('   node scripts/get-spotify-token.js <YOUR_CODE>');
};

const step2 = async (code) => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('❌ Error getting token:', data);
      return;
    }

    console.log('\n✅ Success! Here is your Refresh Token:');
    console.log('\n' + data.refresh_token + '\n');
    console.log('📝 Add this to your .env file as SPOTIFY_REFRESH_TOKEN');
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

const args = process.argv.slice(2);
if (args.length > 0) {
  step2(args[0]);
} else {
  step1();
}
