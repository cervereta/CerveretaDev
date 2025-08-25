// server.js - Chatbot inteligente con lectura dinámica y FAQ

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error('Error: La variable de entorno GEMINI_API_KEY no está definida.');
    console.error('Asegúrate de tener tu API key en el archivo .env');
    process.exit(1);
}

console.log('✅ API Key de Gemini cargada correctamente');

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
    }
});

// Cargar base de conocimiento FAQ
let knowledgeBase = {};
try {
    const knowledgePath = path.join(__dirname, 'knowledge-base.json');
    const knowledgeData = fs.readFileSync(knowledgePath, 'utf8');
    knowledgeBase = JSON.parse(knowledgeData);
    console.log('📚 Base de conocimiento FAQ cargada correctamente');
} catch (error) {
    console.error('❌ Error cargando knowledge-base.json:', error.message);
}

// Función para leer contenido web dinámicamente
function getWebContent() {
    try {
        const indexPath = path.join(__dirname, '..', 'index.html');
        const htmlContent = fs.readFileSync(indexPath, 'utf8');
        const $ = cheerio.load(htmlContent);
        
        // Extraer contenido relevante
        const content = {
            title: $('title').text(),
            description: $('meta[name="description"]').attr('content'),
            sections: {
                hero: $('#inicio .hero-description').text().trim(),
                services: [],
                technologies: []
            }
        };
        
        // Extraer servicios
        $('.service-card').each((i, el) => {
            const service = {
                name: $(el).find('h3').text(),
                description: $(el).find('p').text(),
                features: []
            };
            $(el).find('.service-features li').each((j, feature) => {
                service.features.push($(feature).text());
            });
            content.sections.services.push(service);
        });
        
        // Extraer tecnologías de los iconos flotantes
        $('.floating-icon').each((i, el) => {
            const tech = $(el).text().trim();
            if (tech && !content.sections.technologies.includes(tech)) {
                content.sections.technologies.push(tech);
            }
        });
        
        console.log('🔄 Contenido web actualizado dinámicamente');
        return content;
    } catch (error) {
        console.error('❌ Error leyendo contenido web:', error.message);
        return null;
    }
}

// Función para buscar respuestas FAQ
function findFAQResponse(message) {
    const messageLower = message.toLowerCase();
    
    for (const [key, faq] of Object.entries(knowledgeBase.faqs || {})) {
        const keywords = faq.keywords || [];
        const hasKeyword = keywords.some(keyword => 
            messageLower.includes(keyword.toLowerCase())
        );
        
        if (hasKeyword) {
            console.log(`🎯 FAQ encontrada: ${key}`);
            return faq.response;
        }
    }
    return null;
}

// Función para generar contexto dinámico
function generateDynamicContext(webContent) {
    if (!webContent) return '';
    
    return `
CONTENIDO WEB ACTUALIZADO:
- Título: ${webContent.title}
- Descripción: ${webContent.description}
- Hero: ${webContent.sections.hero}
- Servicios disponibles: ${webContent.sections.services.map(s => s.name).join(', ')}
- Tecnologías utilizadas: ${webContent.sections.technologies.join(', ')}

SERVICIOS DETALLADOS:
${webContent.sections.services.map(service => `
  * ${service.name}: ${service.description}
    Características: ${service.features.join(', ')}
`).join('')}`;
}

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const conversationHistory = req.body.history || [];

    if (!userMessage) {
        return res.status(400).json({ error: 'Mensaje de usuario no proporcionado.' });
    }

    console.log('📨 Mensaje recibido:', userMessage);

    try {
        // 1. Buscar primero en FAQ
        const faqResponse = findFAQResponse(userMessage);
        if (faqResponse) {
            console.log('✅ Respuesta FAQ encontrada');
            return res.json({ reply: faqResponse });
        }

        // 2. Si no hay FAQ, usar IA con contenido dinámico
        const webContent = getWebContent();
        const dynamicContext = generateDynamicContext(webContent);

        // Preparar historial para Gemini
        const historyForGemini = conversationHistory.map(entry => ({
            role: entry.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: entry.text }]
        }));

        // Configurar el chat con historial
        const chat = model.startChat({
            history: historyForGemini,
            generationConfig: {
                maxOutputTokens: 1024,
                temperature: 0.7,
            },
        });

        console.log('🤖 Enviando a Gemini con contexto dinámico...');
        
        // Contexto específico con información dinámica
        const contextualMessage = `CONTEXTO: Eres el asistente IA oficial de CerveretaDev, especializado en desarrollo web profesional.

INFORMACIÓN BASE CERVERETADEV:
- Empresa: CerveretaDev - Desarrollo Web Profesional
- Especialización: Sitios web modernos, aplicaciones web y soluciones digitales innovadoras
- Enfoque: Diseño innovador y funcionalidad excepcional

${dynamicContext}

INSTRUCCIONES ESTRICTAS:
1. SOLO responde preguntas relacionadas con:
   - Desarrollo web y tecnologías mencionadas
   - Servicios ofrecidos por CerveretaDev
   - Información sobre la página web
   - Consultas técnicas sobre desarrollo web
   - Preguntas sobre contacto y servicios

2. Para preguntas NO relacionadas con desarrollo web o CerveretaDev:
   - Responde cortésmente que solo puedes ayudar con temas de desarrollo web
   - Redirige hacia los servicios de CerveretaDev
   - Sugiere usar el formulario de contacto para consultas específicas

3. Tono: Profesional, técnico pero accesible, orientado a ayudar con desarrollo web

4. Usa SIEMPRE la información actualizada del contenido web para dar respuestas precisas

PREGUNTA DEL USUARIO: ${userMessage}

RESPUESTA:`;

        const result = await chat.sendMessage(contextualMessage);
        const response = await result.response;
        const text = response.text();

        console.log('✅ Respuesta IA generada');
        
        res.json({ reply: text });
    } catch (error) {
        console.error('❌ Error detallado:', {
            message: error.message,
            status: error.status,
            details: error.details || 'Sin detalles adicionales'
        });
        
        res.status(500).json({ 
            error: 'Error interno del servidor al procesar el mensaje.',
            details: error.message 
        });
    }
});

app.get('/health', (req, res) => {
    const webContent = getWebContent();
    res.json({ 
        status: 'OK', 
        message: 'Servidor funcionando correctamente',
        apiKey: API_KEY ? 'Configurada' : 'No configurada',
        knowledgeBase: Object.keys(knowledgeBase.faqs || {}).length + ' FAQs cargadas',
        webContent: webContent ? 'Contenido web disponible' : 'Error leyendo contenido web'
    });
});

app.get('/faq', (req, res) => {
    res.json({
        availableFAQs: Object.keys(knowledgeBase.faqs || {}),
        totalFAQs: Object.keys(knowledgeBase.faqs || {}).length
    });
});

app.listen(port, () => {
    console.log(`🚀 Servidor backend escuchando en http://localhost:${port}`);
    console.log(`🔍 Endpoint de salud: http://localhost:${port}/health`);
    console.log(`❓ FAQs disponibles: http://localhost:${port}/faq`);
    console.log(`📚 ${Object.keys(knowledgeBase.faqs || {}).length} FAQs cargadas`);
});