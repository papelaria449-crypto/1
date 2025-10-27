-import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([
    { from: 'noel', text: 'Ho ho ho! Olá, criança! O que deseja saber?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'child', text: input }]);
    
    // Chama o backend para obter resposta do Papai Noel
    const resp = await fetch('https://seu-backend-url.com/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await resp.json();
    setMessages(msgs => [...msgs, { from: 'noel', text: data.reply }]);
    setInput('');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 16 }}>
      <h2>Chat com o Papai Noel 🎅</h2>
      <div style={{ border: '1px solid #ccc', minHeight: 300, padding: 8 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.from === 'noel' ? 'left' : 'right',
              margin: '8px 0'
            }}
          >
            <b>{msg.from === 'noel' ? 'Papai Noel' : 'Você'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Digite sua mensagem..."
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '80%' }}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default App;