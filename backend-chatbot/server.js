// server.js

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// CORS para desarrollo (ajusta en producción)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error('Error: La variable de entorno GEMINI_API_KEY no está definida.');
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const conversationHistory = req.body.history || [];

    if (!userMessage) {
        return res.status(400).json({ error: 'Mensaje de usuario no proporcionado.' });
    }

    try {
        const historyForGemini = conversationHistory.map(entry => ({
            role: entry.role,
            parts: [{ text: entry.text }]
        }));

        const chat = model.startChat({
            history: historyForGemini,
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error('Error al comunicarse con la API de Gemini:', error);
        res.status(500).json({ error: 'Error interno del servidor al procesar el mensaje.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
