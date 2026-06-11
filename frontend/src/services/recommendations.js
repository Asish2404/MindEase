export function getRecommendations(level) {
  const RECS = {
    low: [
      { title: 'Maintain routine', desc: 'Small consistent actions protect your mental state.' },
      { title: 'Stay active', desc: 'Light movement can reduce stress and lift mood.' },
    ],
    moderate: [
      { title: 'Meditation', desc: 'Practice guided breathing or mindful attention (5–10 min).' },
      { title: 'Exercise', desc: 'Move your body and schedule short recovery breaks.' },
      { title: 'Take breaks', desc: 'Use micro-breaks to reset attention and reduce overwhelm.' },
    ],
    high: [
      { title: 'Counselor support', desc: 'Consider talking to a qualified professional for faster recovery.' },
      { title: 'Stress management plan', desc: 'Use breathing and break tasks into small, manageable steps.' },
      { title: 'Breathing exercises', desc: 'Try box breathing or 4-7-8 breathing to calm your nervous system.' },
    ],
  }
  return RECS[level] ?? RECS.low
}

