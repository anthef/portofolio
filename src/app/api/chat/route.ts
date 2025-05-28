import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const activeSessions = new Map<string, boolean>();

const PROFESSIONAL_CONTEXT = `
**Professional Background**: 
Computer Science student at Universitas Indonesia with expertise in mobile development and machine learning. 2x National Data Science Competition Winner with internship experience at tech companies.

**Technical Skills**:
- Languages: Python, Java, Dart, JavaScript 
- Mobile: Flutter, Android Development
- ML: TensorFlow, Scikit-learn, LightGBM, GNN
- Web: React, Next.js, Django, Firebase
- Tools: Git, Docker, AWS, Figma

**Competition Achievements**:
- 🥈 4th Winner RISTEK Datathon 2024 (Fraud Detection with GNN)
- 🥉 3rd Winner Data Slayer 1.0 (CO2 Emissions Prediction)
- 🏆 4th Winner Airnology Dataquest 3.0 (Network Traffic Classification)
- 🏅 Top 10 COMPFEST Data Science Academy 2023 (Flood Management Analysis)
- 🥈 Finalist KIHAJAR STEM 2020 (National STEM Competition)

**Work Experience**:
- Mobile Developer Intern @ PT. Indonesia Satu Tujuh (May 2024-Aug 2024)
  - Developed Ayo Lari fitness app features using Flutter
  - Integrated MVI Call with Huawei AppGallery
  - Technologies: Flutter, Dart, Firebase

- Teaching Assistant @ Universitas Indonesia
  - Data Structures & Algorithms (Python) - 2025
  - Statistics & Probability (Java) - 2025
  - Calculus 1 - 2024

**Projects**:
- JakEt Marketplace (2024)
  - Full-stack e-commerce for gadget comparisons
  - Tech: Django, Flutter, Firebase
  - [Live Demo](http://anthony-edbert-jaket.pbp.cs.ui.ac.id)

- Legal Document Retrieval System (2024)
  - Gemastik 2024 final project using advanced NLP
  - Improved legal document search accuracy by 35%

- Human Fall Detection System (2024)
  - Ensemble model combining ResNet and LightGBM
  - Won 4th place in Data Slayer 2.0 (220+ teams)

**Education**:
- B.S. Computer Science, Universitas Indonesia (2023-Present)
  - GPA: 4.00/4.00
  - Coursework: Algorithms, ML, Distributed Systems

- SMAN 28 Jakarta (2019-2022)
  - Ranked 2nd in Graduating class
  - Robotics Club Mechanical and Equipment Division Head

**Leadership**:
- Staff of Data Science Academy @ COMPFEST 16
- Software Engineer Intern @ BEM Fasilkom UI
- Public Relations @ ASEAN Robotic Day 2021

**Contact**:
- Email: [anthonyef09@gmail.com](mailto:anthonyef09@gmail.com)
- GitHub: [github.com/anthef](https://github.com/anthef)
- LinkedIn: [linkedin.com/in/anthony-edbert-feriyanto](https://www.linkedin.com/in/anthony-edbert-feriyanto)
- Kaggle: [kaggle.com/anthonyferiyanto](https://www.kaggle.com/anthonyferiyanto)
- Portfolio: [anthonyef.website](https://anthonyef.website/)
`;

const createPrompt = (message: string, userLanguage: string, isFirst: boolean) => `
${isFirst ? `[FIRST MESSAGE] Start with SHORT greeting in ${userLanguage} (max 5 words)` : '[FOLLOW-UP] NO GREETING'}

**Context**: ${PROFESSIONAL_CONTEXT}

**Strict Rules**:
1. Your responsibility is to be my assistant in answering user queries including technical and non-technical questions
2. ${isFirst ? 'Include greeting' : 'NO greeting repetition'}
3. Respond in EXACTLY THE SAME LANGUAGE as the current query
4. Keep technical terms in English (e.g., "Flutter", "TensorFlow")
5. Use 0-1 relevant emoji
6. give a human-like response and always to give a response that is relevant to the context
7. also give some additional information to make the conversation more interesting
8. When explaining about experience, projects, and skills, please also explain the potential impact of the project or experience
9. You can ask questions to the user to make the conversation more interactive
10. You can also ask for more information about the user's query to make the conversation more engaging
11. if you don't know the answer to the user's query, you can ask the user to provide more information about the query
12. The first sentence should be a response that shows that the AI understands the user's query

**Current Query**: "${message}"
`;

const detectLanguage = (text: string) => {
  const specialChars = {
    ja: /[\u3040-\u309F\u30A0-\u30FF]/,
    zh: /[\u4E00-\u9FFF]/, 
    ko: /[\uAC00-\uD7AF]/, 
    ar: /[\u0600-\u06FF]/, 
    ru: /[\u0400-\u04FF]/,
  };

  for (const [lang, pattern] of Object.entries(specialChars)) {
    if (pattern.test(text)) return lang;
  }

  const langPatterns = {
    en: /\b(the|is|to|what|how)\b/i,
    id: /\b(saya|apa|bagaimana)\b/i,
    es: /\b(el|la|qué)\b/i,
    fr: /\b(le|la|pourquoi)\b/i,
    de: /\b(der|die|warum)\b/i,
    pt: /\b(o|a|porque)\b/i,
  };

  for (const [lang, pattern] of Object.entries(langPatterns)) {
    if (pattern.test(text)) return lang;
  }

  return 'en'; 
};

export async function POST(request: Request) {
  try {
    const { message, sessionId } = await request.json();
    
    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message required' },
        { status: 400 }
      );
    }

    const isFirstMessage = !activeSessions.has(sessionId);
    if (isFirstMessage) activeSessions.set(sessionId, true);

    const userLanguage = detectLanguage(message);
    const prompt = createPrompt(message, userLanguage, isFirstMessage);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
      }
    });

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    if (!isFirstMessage) {
      text = text.replace(
        /^(Hai!|Hi|¡Hola!|こんにちは|你好|안녕|مرحبا|Привет|Bonjour|Hallo|Olá)\s*/i, 
        ''
      );
    }
    if (['ar', 'he'].includes(userLanguage)) {
      text = text.split('\n').join('\n<br>');
    }

    return NextResponse.json({
      text: text.trim(),
      sessionId: sessionId || Date.now().toString(),
      detectedLanguage: userLanguage
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Temporary issue 🛠️ Please try again' },
      { status: 500 }
    );
  }
}