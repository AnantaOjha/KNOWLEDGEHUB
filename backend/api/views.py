from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@api_view(["POST"])
def ask_ai(request):
    question = request.data.get("question", "")

    if not question.strip():
        return Response({"error": "Question is required"}, status=400)

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(question)

        # Correct way to extract Gemini output
        if response.candidates and response.candidates[0].content.parts:
            answer = response.candidates[0].content.parts[0].text
        else:
            answer = "No answer generated."

        return Response({"answer": answer})
    except Exception as e:
        # Print in Django console for debugging
        print("🔥 Gemini error:", e)
        return Response({"error": str(e)}, status=500)
@api_view(["GET"])
def health_check(request):
    return Response({"status": "Server is running ✅"})