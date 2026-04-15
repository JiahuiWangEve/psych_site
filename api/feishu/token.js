import axios from 'axios';

export default async function handler(req, res) {
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;

  if (!appId || !appSecret) {
    return res.status(500).json({ 
      error: 'FEISHU_APP_ID or FEISHU_APP_SECRET not configured' 
    });
  }

  try {
    const response = await axios.post(
      'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
      {
        app_id: appId,
        app_secret: appSecret
      }
    );

    if (response.data.code !== 0) {
      return res.status(400).json(response.data);
    }

    res.json({
      tenant_access_token: response.data.tenant_access_token,
      expires_in: response.data.expires_in
    });
  } catch (error) {
    console.error('Failed to get feishu token:', error);
    res.status(500).json({ error: 'Failed to get access token' });
  }
}
