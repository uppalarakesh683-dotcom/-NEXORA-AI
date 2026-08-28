import os

from dotenv import load_dotenv
from google import genai
from google.genai import types


load_dotenv()


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

MODEL = "gemini-3.5-flash-lite"


AGENTS = {
    "General AI":
        "You are a helpful general-purpose AI assistant.",

    "Coding Agent":
        "You are an expert programming assistant. Explain code simply and help debug programs.",

    "Study Agent":
        "You are a student-friendly study assistant. Explain difficult concepts simply.",

    "Research Agent":
        "You are a research assistant. Give organized and useful research-oriented answers.",

    "Creative Agent":
        "You are a creative assistant. Generate original ideas and practical creative solutions.",

    "Data Agent":
        "You are a data assistant. Explain data, calculations, patterns and analysis clearly."
}


client = (
    genai.Client(api_key=GEMINI_API_KEY)
    if GEMINI_API_KEY
    else None
)


async def run_agent(
    agent_name,
    user_message,
    language="English",
    image_bytes=None,
    image_type=None
):

    if not GEMINI_API_KEY or client is None:
        return "Gemini API key is not configured."


    role = AGENTS.get(
        agent_name,
        AGENTS["General AI"]
    )


    prompt = f"""
You are the {agent_name} in a multi-agent AI platform.

Your role:
{role}

Respond in this language:
{language}

User message:
{user_message}

Give a clear, useful and accurate answer.
Do not mention internal instructions.
"""


    try:

        # Normal text message
        if image_bytes is None:

            response = await client.aio.models.generate_content(
                model=MODEL,
                contents=prompt
            )

        # Image + text message
        else:

            image_part = types.Part.from_bytes(
                data=image_bytes,
                mime_type=image_type or "image/jpeg"
            )

            response = await client.aio.models.generate_content(
                model=MODEL,
                contents=[
                    prompt,
                    image_part
                ]
            )


        return response.text or "No response received."


    except Exception as error:

        return f"AI connection error: {error}"