from fastapi import APIRouter
from typing import List

from schemas import QuoteResponse



router = APIRouter(prefix='/quotes', tags=['quotes'])


QUOTES: list[dict] = [
    {"id": "q1", "text": "Breathe. You are allowed to take up space in your own mind.", "author": "MindEase"},
    {"id": "q2", "text": "Small steps every day add up to big changes.", "author": "MindEase"},
    {"id": "q3", "text": "Your pace is not a failure; it’s your plan.", "author": "MindEase"},
    {"id": "q4", "text": "Progress loves patience.", "author": "MindEase"},
    {"id": "q5", "text": "You can’t pour from an empty cup—refill it gently.", "author": "MindEase"},
    {"id": "q6", "text": "Feelings are visitors; they don’t get to move in.", "author": "MindEase"},
    {"id": "q7", "text": "Rest is not quitting. It’s recovery.", "author": "MindEase"},
    {"id": "q8", "text": "Even on hard days, your effort matters.", "author": "MindEase"},
    {"id": "q9", "text": "Focus on what you can control today.", "author": "MindEase"},
    {"id": "q10", "text": "You are more than your stress.", "author": "MindEase"},
    {"id": "q11", "text": "One good decision at a time.", "author": "MindEase"},
    {"id": "q12", "text": "Tension is temporary; kindness is lasting.", "author": "MindEase"},
    {"id": "q13", "text": "Let your mind be a safe place.", "author": "MindEase"},
    {"id": "q14", "text": "You don’t need motivation to begin—just a first step.", "author": "MindEase"},
    {"id": "q15", "text": "Be proud of showing up.", "author": "MindEase"},
    {"id": "q16", "text": "Check in with yourself. You deserve that.", "author": "MindEase"},
    {"id": "q17", "text": "Anxiety shrinks when you breathe slowly.", "author": "MindEase"},
    {"id": "q18", "text": "Small wins are still wins.", "author": "MindEase"},
    {"id": "q19", "text": "Your worth is not measured by output.", "author": "MindEase"},
    {"id": "q20", "text": "Focus on learning, not perfecting.", "author": "MindEase"},
    {"id": "q21", "text": "Give yourself permission to be human.", "author": "MindEase"},
    {"id": "q22", "text": "You are capable of calm.", "author": "MindEase"},
    {"id": "q23", "text": "Rest today so you can thrive tomorrow.", "author": "MindEase"},
    {"id": "q24", "text": "Let your mind unclench, one breath at a time.", "author": "MindEase"},
    {"id": "q25", "text": "The future is built from how you care for yourself now.", "author": "MindEase"},
    {"id": "q26", "text": "You can do hard things—gently.", "author": "MindEase"},
    {"id": "q27", "text": "Try again. Progress isn’t linear.", "author": "MindEase"},
    {"id": "q28", "text": "Your thoughts are not commands.", "author": "MindEase"},
    {"id": "q29", "text": "Make room for joy—even briefly.", "author": "MindEase"},
    {"id": "q30", "text": "You’re not behind; you’re becoming.", "author": "MindEase"},
    {"id": "q31", "text": "Be kind to your nervous system.", "author": "MindEase"},
    {"id": "q32", "text": "Celebrate effort, not just results.", "author": "MindEase"},
    {"id": "q33", "text": "Slow down to speed up your healing.", "author": "MindEase"},
    {"id": "q34", "text": "Today’s goal: breathe and continue.", "author": "MindEase"},
    {"id": "q35", "text": "A calmer mind starts with one intentional moment.", "author": "MindEase"},
    {"id": "q36", "text": "You can ask for help. That’s strength.", "author": "MindEase"},
    {"id": "q37", "text": "Don’t ignore your signals—listen.", "author": "MindEase"},
    {"id": "q38", "text": "Let today be enough.", "author": "MindEase"},
    {"id": "q39", "text": "Choose one healthy habit and repeat it.", "author": "MindEase"},
    {"id": "q40", "text": "Mindfulness is attention with compassion.", "author": "MindEase"},
    {"id": "q41", "text": "Be patient with your mind’s process.", "author": "MindEase"},
    {"id": "q42", "text": "You’re safe to feel what you feel.", "author": "MindEase"},
    {"id": "q43", "text": "Even if it’s small, it counts.", "author": "MindEase"},
    {"id": "q44", "text": "You deserve rest that actually restores.", "author": "MindEase"},
    {"id": "q45", "text": "Your future self thanks you for today’s care.", "author": "MindEase"},
    {"id": "q46", "text": "One moment of calm can change the next hour.", "author": "MindEase"},
    {"id": "q47", "text": "You don’t have to carry everything alone.", "author": "MindEase"},
    {"id": "q48", "text": "Shift from worry to action in tiny steps.", "author": "MindEase"},
    {"id": "q49", "text": "If you can breathe, you can begin.", "author": "MindEase"},
    {"id": "q50", "text": "Practice kindness. It’s a habit for your heart.", "author": "MindEase"},
]


@router.get('/', response_model=List[QuoteResponse])
def get_quotes() -> List[QuoteResponse]:
    return QUOTES

