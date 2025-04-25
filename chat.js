export default async function handler(req, res) {
  const { message } = req.body;
  const reply = `Mmm... you said: "${message}"? I like that. 😘`;
  return res.status(200).json({ reply });
}
