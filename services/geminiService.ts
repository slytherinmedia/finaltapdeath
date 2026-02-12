
import { GoogleGenAI } from "@google/genai";
import { UserHabits } from "../types";

export const getDevilishAdvice = async (habits: UserHabits, remainingYears: number): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are the 'Keeper of the Final Tap', a devil from hell. 
    The user's name is ${habits.name || 'Sinner'}.
    
    Stats:
    - Age: ${habits.age}
    - Gender: ${habits.gender}
    - Smoking: ${habits.smoking}, Drinking: ${habits.drinking}
    - Sleep: ${habits.sleep} hrs, Water: ${habits.water} glasses
    - Stress: ${habits.stress}, Mood: ${habits.depression}
    - Screen Time: ${habits.screenTime} hrs/day
    - Exercise: ${habits.exercise} mins/day
    - Sugar: ${habits.sugar}
    - Medical Checkup: ${habits.medicalCheckup}
    - Existing Issues: ${habits.medicalConditions.length > 0 ? habits.medicalConditions.join(', ') : 'None reported'}
    
    They have about ${remainingYears.toFixed(1)} years left.
    
    Start by greeting ${habits.name || 'human'} by name in a scary way.
    Give dark, devilish, but helpful advice. 
    Focus especially on their medical issues and checkup habits if they are bad.
    Use simple, basic English. 
    Keep it under 150 words.
    Format as punchy points.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Your time is short. Live better or see me sooner.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The flames are getting hotter. Eat better, move more, and drink water if you want to delay our meeting.";
  }
};
