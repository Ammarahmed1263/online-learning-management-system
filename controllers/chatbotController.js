import OpenAI from "openai";
import asyncWrapper from "../utils/asyncWrapper.js";
import jsend from "../utils/jsend.js";
import AppError from "../utils/appError.js";

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

/**
 * Handle chatbot chat requests using Groq (OpenAI compatible API)
 */
export const chat = asyncWrapper(async (req, res, next) => {
    const { message, history = [] } = req.body;

    if (!message) {
        return next(new AppError("Please provide a message", 400));
    }

    const messages = [
        {
            role: "system",
            content:
                "You are a helpful assistant for an online learning management system. Answer user questions about courses, lessons, and learning.",
        },
        ...history,
        { role: "user", content: message },
    ];

    try {
        const completion = await openai.chat.completions.create({
            messages,
            model: "llama3-8b-8192", // Default Groq model
        });

        const responseMessage = completion.choices[0].message.content;

        res.status(200).json(
            jsend.success({
                reply: responseMessage,
                history: [
                    ...messages,
                    { role: "assistant", content: responseMessage },
                ],
            }),
        );
    } catch (error) {
        return next(new AppError(`Chatbot error: ${error.message}`, 500));
    }
});
