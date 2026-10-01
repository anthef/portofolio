import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const activeSessions = new Map<string, boolean>();

const PROFESSIONAL_CONTEXT = `
**Professional Background**:
Self-driven Computer Science student at Universitas Indonesia (cGPA 4.00/4.00) and full-time software engineer with hands-on experience in LLM systems, machine learning, and large-scale software development. Currently building multi-tenant AI infrastructure in production — a per-tenant ontology engine, a multi-provider LLM agent runtime, and multi-modal computer vision systems — alongside a track record in data science competitions and teaching. Interested in Software Engineering, AI/LLM Engineering, Data Science, and Business Intelligence.

**Technical Skills**:
- Areas: Machine Learning, Deep Learning, Data Mining, Software Engineering, LLM Engineering, Computer Vision, Accounting, Project Management
- Programming: Python, Java, JavaScript, TypeScript, Dart, SQL, Golang, C++
- Frameworks: TensorFlow, PyTorch, Django, Node.js, Next.js, React, React Native, Effect-TS, Spring Boot, Flutter, Bootstrap 5, NestJS, Streamlit
- Data & Infra: PostgreSQL, ClickHouse, GCP (Cloud Run, Pub/Sub, Cloud Tasks), Terraform, MCP, Langfuse
- Languages: Indonesian (native), English (EPT 640/677, proficient)

**Work Experience**:
- Software Engineer (AI / LLM Engineer) @ Latent Space (Halo AI) — Apr 2026–Present, on-site
  - Multi-tenant slotted-column EAV ontology engine (PostgreSQL append-only value log + JSONB snapshots, mirrored to ClickHouse via CDC) with zero per-tenant DDL
  - Multi-provider LLM agent runtime (Anthropic API, OpenAI Responses, self-hosted open-weight models) serving WhatsApp, Instagram, and marketplace channels; hardened failover and telemetry
  - Led a multi-modal vehicle appraisal system across 5 vehicle classes (damage perception, engine-sound fault classification, VIN/plate/document OCR) with an anti-hallucination layer
  - Cut inference cost via a self-hosted GPU fleet (Qwen), a self-hosted browser fleet, and model tiering
  - Defined the model-visible tool contract and built MCP tool servers with fail-closed entitlement
- Data Scientist Intern @ PT Gojek Tokopedia (GoTo) — Mar 2026–Present, remote
  - Driver assistant AI evaluation (policy compliance, bias), OCR post-processing for low-resource scripts (incl. Batak), error analysis of embedding models for Karto (maps) and Mart
- AI Engineer Intern @ GDP Labs — Oct 2025–Present, remote
  - LLM evaluation system with a Composite Experiment Tracker (Langfuse + Google Sheets); SDK-based benchmark migration; evaluation pipeline refactoring and testing
- Full Stack Developer Intern @ PT Fungsitama Cipta Teknologi — Jun 2025–Oct 2025, remote
  - Modular ERP systems on a Next.js + Node.js fullstack boilerplate
- Teaching Assistant @ University of Indonesia — Jan 2024–Present
  - Data Structures & Algorithms, Statistics & Probability, Calculus 1, Database, Data Science & AI; problem setter and lab instructor (NumPy, SciPy, Matplotlib)
- Data Scientist Intern @ Bukit Vista — Jan 2025–Mar 2025, remote
  - Predictive pricing model for property rental rates (location, seasonality, booking history)
- Mobile Developer Intern @ PT Indonesia Satu Tujuh — Jun 2023–Aug 2023
  - Flutter + BLoC apps, MVI Call demo apps, "Ayo Lari" fitness app, Judgeme companion app

**Awards**:
- 2nd Place, ASEAN AI Hackathon 2026 — Wicara, a prerequisite-first adaptive AI tutor (curriculum graph of 391 concepts / 521 prerequisites)
- 1st Winner & People's Choice Award, Samsung Solve for Tomorrow 2025 — AI vision glasses for visually impaired runners (YOLO, U-Net, SC Depth)
- Global Ambassador, Samsung Solve for Tomorrow Global 2025
- 2nd Runner Up, Google Developer Fest Jakarta 2025 — digital bookkeeping with automated credit scoring
- Honorable Mention, GEMASTIK Data Mining 2025 — Graph-of-Graphs classification + Javanese script OCR
- CIMB Niaga Scholarship Awardee 2025 — one of 50 from 20,000+ applicants
- 1st Winner, International Data Science FIT Competition 2025 (U-Net weather segmentation, knowledge distillation)
- 2nd Winner, Open the Gate Hackathon by BSS Parking 2025 (YOLO license-plate gate system)
- 6th Winner, Datavidia Arkavidia 9.0 2025 (Mixture-of-Experts, 300+ teams)
- 4th Winner, Data Slayer 2.0 2025 (fall detection, LightGBM + ResNet, 220+ teams)
- Best Web Project, PBP course 2024 & copyright holder of a Django application
- 4th Winner & Best Presentation, Dataquest 3.0 Airnology 3.0 2024 (CatBoost, 80+ teams)
- 4th Winner, RISTEK Datathon 2024 Final (ColBERT retrieval, MRR 0.97)
- 3rd Winner, Data Slayer 1.0 2023 (CO₂ emissions, 120+ teams)
- 3rd Winner, Pekan RISTEK Data Competition 2023 (car price prediction)

**Projects**:
- BaKu Website (2025) — secure platform for centralized library borrowing and online reading
- SIZOPI Website (2025) — zoo management system in PostgreSQL (triggers, stored procedures)
- Anthony's Portfolio Website (2025) — this site, an interactive data-science notebook
- JakEt — Jakarta Gadget web & mobile (2024) — gadget recommendations for South Jakarta residents (Django, Flutter)
- OCR System to Predict the Percentage of Valid Votes (2024) — Tesseract OCR
- Electric Vehicle users prediction in Washington State (2023)
- K-Means clustering of Jakarta flood management effectiveness, 2015–2017 vs 2018–2020 (2023)

**Education**:
- Bachelor of Computer Science, Universitas Indonesia — Aug 2023–Feb 2027 (expected), cGPA 4.00/4.00
  - Courses: Intro to AI & Data Science, Image Processing, Semantic Web, Data Mining, Database, Software Engineering, Spoken Language Processing
- SMAN 28 Jakarta (2020–2023) — ranked 2nd in graduating class (MIPA); Robotics Club Head of Equipment and Mechanical

**Leadership & Organizations**:
- Lead of Data Science & AI SIG @ RISTEK Fasilkom UI (Jan 2025–Present) — Datathon 2025 problem setter, Best Member
- Data Scientist Member @ Google Developer Student Club UI (Jan 2023–Present)
- Staff of Data Science Academy @ COMPFEST 16 (2024)
- Software Engineer Intern @ BEM Fasilkom UI (2023)
- Human Resources & Event's Expert Staff @ Open House Fasilkom UI (2023)
- Staff of Business Competition @ UI Talks (2023)

**Certificates**: Kaggle (Data Cleaning, Intro to ML, Intro to Programming, Pandas), RevoU Software Engineering Fundamentals, Udemy Creative Writing, EPT 640/677

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