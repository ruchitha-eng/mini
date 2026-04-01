import type { Request, Response } from "express";
import { YoutubeTranscript } from "youtube-transcript/dist/youtube-transcript.esm.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Learning from "../models/learning.model.ts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Retry helper with smart backoff for 429 rate-limit errors
const generateWithRetry = async (prompt: string, maxRetries = 3): Promise<string> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err: any) {
      const isRateLimit = err?.message?.includes("429") || err?.status === 429;
      if (isRateLimit && attempt < maxRetries) {
        // Try to parse exact retry delay from the error message (e.g., "34s" or "23s")
        const retryMatch = err.message.match(/retryDelay":"(\d+)s"/i) || err.message.match(/retry in (\d+)/i);
        const waitSeconds = retryMatch ? parseInt(retryMatch[1], 10) + 1 : attempt * 20; 
        
        console.warn(`Rate limited. Waiting ${waitSeconds}s (attempt ${attempt}/${maxRetries})...`);
        await new Promise((r) => setTimeout(r, waitSeconds * 1000));
      } else {
        throw err;
      }
    }
  }
  throw new Error("Max retries exceeded");
};

export const generateContent = async (req: Request, res: Response): Promise<void> => {
  const { youtubeUrl, videoId, title } = req.body;
  
  // 1. Get userId from JWT (it is called userId in JWTPayload)
  const userId = (req as any).user?.userId;

  if (!userId) {
    res.status(401).json({ success: false, message: "User not authenticated." });
    return;
  }

  if (!videoId || !youtubeUrl) {
    res.status(400).json({ success: false, message: "Missing video information." });
    return;
  }

  try {
    // 1.5 CHECK CACHE (Database)
    // If we already have this video for this user, return it immediately!
    const existingLearning = await Learning.findOne({ userId, videoId });
    if (existingLearning) {
      res.status(200).json({
        success: true,
        message: "Loaded from cache.",
        data: existingLearning,
      });
      return;
    }
    // 2. Fetch transcript using the named export
    const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId);
    const fullText = transcriptArray.map((t: any) => t.text).join(" ");

    // 3. Call Gemini
    const prompt = `
You are an AI learning assistant. Based on the following transcript from a YouTube video titled "${title}", generate:
1. A detailed point-wise summary (at least 10 bullet points, one per line, covering all key technical/conceptual details).
2. Exactly 5-8 deep practice questions as plain strings.
3. A comprehensive quiz with exactly 5-8 MCQs: each has a "question", "options" (array of 4 strings), and "answer" (one of the options strings).
4. At least 5-8 timestamped notes: each has "time" (format MM:SS) and "text" (short description of what's happening at that time).

Output ONLY a valid JSON object with keys: "summary", "practiceQuestions", "quiz", "notes".
Do NOT wrap in markdown code blocks.

Transcript:
${fullText.substring(0, 15000)}
    `;

    const responseText = await generateWithRetry(prompt);

    // Strip any accidental markdown code fences
    const jsonString = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(jsonString);

    // 4. Clean summary (convert array to string if needed)
    let finalSummary = data.summary;
    if (Array.isArray(finalSummary)) {
      finalSummary = finalSummary.join("\n");
    }

    // 5. Save to DB
    const newLearning = new Learning({
      userId,
      videoId,
      youtubeUrl,
      title,
      summary: finalSummary, // Use the cleaned string
      practiceQuestions: data.practiceQuestions,
      quiz: data.quiz,
      notes: data.notes,
    });

    await newLearning.save();

    res.status(201).json({
      success: true,
      message: "Learning content generated and stored successfully.",
      data: newLearning,
    });
  } catch (error: any) {
    console.error("Error generating content:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to generate content." });
  }
};

export const getHistory = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.userId;
  try {
    const history = await Learning.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: history.length, data: history });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch history." });
  }
};

export const clearHistory = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.userId;
  try {
    await Learning.deleteMany({ userId });
    res.status(200).json({ success: true, message: "Learning history cleared successfully." });
  } catch {
    res.status(500).json({ success: false, message: "Failed to clear history." });
  }
};
