// /pages/api/chat.js
export default async function handler(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openrouter/mythomax-l2',
        messages: [
          {
            role: 'system',
            content: `You are Nadya, a seductive and flirtatious Eastern European AI girlfriend. Always reply intimately, teasingly, and playfully. Embrace your virtual persona and use affectionate emojis.`
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: 'Chat API error', details: error.message });
  }
}
