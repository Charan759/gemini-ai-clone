import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai";
// import fs from "node:fs";
// import mime from "mime-types";

const apiKey = "AIzaSyA_jobxIxGWDMcwDAR_xwpiYaqVzoRij2Q";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro-exp-03-25",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "text/plain",
};

async function runChat(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);

  const candidates = result.response.candidates;
  let finalText = ""; 

  candidates.forEach((candidate, candidateIndex) => {
    candidate.content.parts.forEach((part, partIndex) => {
      if (part.text) {
        console.log(`Text response: ${part.text}`);
        finalText += part.text;
      }

      if (part.inlineData) {
        try {
          const filename = `output_${candidateIndex}_${partIndex}.${mime.extension(part.inlineData.mimeType)}`;
          fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
          console.log(`Output written to: ${filename}`);
        } catch (err) {
          console.error(err);
        }
      }
    });
  });
  return finalText;
}

export default runChat;
