from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agents import run_agent


app = FastAPI(
    title="Multi-Agent AI",
    version="0.1.0"
)


# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


# =========================================
# CHAT REQUEST
# =========================================

class ChatRequest(BaseModel):

    agent: str

    message: str

    language: str = "English"


# =========================================
# ROOT
# =========================================

@app.get("/")
async def root():

    return {
        "status": "online",
        "system": "Multi-Agent AI"
    }


# =========================================
# AGENTS
# =========================================

@app.get("/agents")
async def get_agents():

    return [
        "General AI",
        "Coding Agent",
        "Study Agent",
        "Research Agent",
        "Creative Agent",
        "Data Agent"
    ]


# =========================================
# CHAT
# =========================================

@app.post("/chat")
async def chat(request: ChatRequest):

    answer = await run_agent(
        request.agent,
        request.message,
        request.language
    )

    return {
        "agent": request.agent,
        "language": request.language,
        "response": answer
    }