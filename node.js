import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ================= CONFIG =================
const GEMINI_API_KEY = "AIzaSyAZseMBMPMXlEGIGRxD1Kcgl8hZ94_T2wk";
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE"; // fallback to OpenAI
const OPENAI_MODEL = "gpt-3.5-turbo";

// ================== CHAT ENDPOINT ==================
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ reply: "Message is empty." });

  // ================== GOOGLE GEMINI ==================
  try {
    const geminiPayload = {
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      systemInstruction: {
        parts: [{ text: "You are JOM AI Assistant. Use only Jomari's profile data to answer questions." }]
      },
      generationConfig: { temperature: 0.7, maxOutputTokens: 2000 }
    };

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geminiPayload)
      }
    );

    if (!geminiRes.ok) throw new Error("Gemini API failed.");

    const geminiData = await geminiRes.json();
    const reply = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply) return res.json({ reply });
    throw new Error("Gemini returned empty content.");
  } catch (geminiErr) {
    console.warn("Gemini error:", geminiErr.message);

    // ================== FALLBACK TO OPENAI ==================
    try {
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [{ role: "user", content: userMessage }],
          temperature: 0.7
        })
      });

      if (!openaiRes.ok) throw new Error("OpenAI API failed.");

      const openaiData = await openaiRes.json();
      const reply = openaiData?.choices?.[0]?.message?.content;

      return res.json({ reply: reply || "Sorry, no response from AI." });
    } catch (openaiErr) {
      console.error("OpenAI error:", openaiErr.message);
      return res.status(500).json({ reply: "Error connecting to AI." });
    }
  }
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
