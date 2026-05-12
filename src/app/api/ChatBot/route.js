import { NextResponse } from 'next/server';
const { getAIResponse } = require('../../../services/aiService'); 

export async function POST(req) {
    try {
        const { message, history } = await req.json();
        
        const reply = await getAIResponse(message, history);
        
        return NextResponse.json({ reply });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}