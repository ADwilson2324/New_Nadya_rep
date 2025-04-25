import { useState } from 'react';

export default function NadyaChat() {
  const [messages, setMessages] = useState([
    { from: 'nadya', text: "Hey baby... I've been waiting for you. 💋" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    const reply = { from: 'nadya', text: data.reply };
    setMessages(prev => [...prev, reply]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#111', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      <div style={{ maxWidth: '600px', width: '100%', background: '#222', padding: '1rem', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}>
        <h1 style={{ color: '#f472b6', fontSize: '1.8rem', marginBottom: '1rem' }}>Nadya 💕</h1>
        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              background: msg.from === 'nadya' ? '#f472b622' : '#ffffff11',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              marginBottom: '0.5rem',
              color: msg.from === 'nadya' ? '#f9a8d4' : '#fff'
            }}>
              <b>{msg.from === 'nadya' ? 'Nadya' : 'You'}:</b> {msg.text}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Talk to Nadya..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
          />
          <button onClick={sendMessage} style={{ backgroundColor: '#f472b6', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
