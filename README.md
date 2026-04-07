# Melascope DX

Melascope DX is a skin lesion analysis tool powered by AI.

<img width="1913" height="961" alt="image" src="https://github.com/user-attachments/assets/ee519985-f654-4045-a1a6-75b3c49efcc3" />


<img width="1914" height="961" alt="image" src="https://github.com/user-attachments/assets/651a1457-2e66-4b83-97a9-949de4ae3ad0" />


## Setup

### Prerequisites
- Python 3.8+
- Node.js 14+

### Backend
1. `cd backend`
2. `python -m venv venv`
3. `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. `pip install -r requirements.txt`
   *(Ensure `httpx` is installed for the chatbot feature)*: `pip install httpx`
5. Create a `.env` file in `backend/` with:
   ```
   HF_TOKEN=your_huggingface_token
   
   # For Advisory Chatbot (OpenAI-compatible)
   LLM_API_KEY=your_api_key
   LLM_BASE_URL=https://api.openai.com/v1  # or https://api.groq.com/openai/v1 etc
   LLM_MODEL=gpt-4o-mini  # or llama-3.1-70b-versatile etc
   ```
6. Run: `uvicorn main:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Features
- **Dashboard & Patient Records**: Populated mock data tables showing recent screening history.
- **Image Analysis**: Upload skin images to classify lesions using the connected AI model.
- **PDF Reports**: One-click generation of comprehensive PDF assessment reports.
- **Settings & Preferences**: Fully designed settings interface for Profile Details, Notifications, and Security management.
- **Interactive AI Chatbot (MelaBot)**: 
  - **Custom 3D Animated Avatar**: Features a built-in interactive SVG robot head that floats, blinks, and squints organically.
  - **Conversational Guidance**: Ask follow-up questions about predictions while maintaining strict safety constraints (no diagnosis).
  - **Intent Detection**: The bot supports commands like "download my report" and "clear chat".

## Author
**V KARTHIKEYAN**
