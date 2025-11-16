export const writingAssessmentModel = 'anthropic/claude-3.5-haiku';

export interface AssessmentCriteria {
  criteria: string[];
}

export const writingAssessmentStandards: Record<string, AssessmentCriteria> = {
  Foundation: {
    criteria: ["They create short written texts, including retelling stories using words and images where appropriate. They retell, report information and state their thoughts, feelings and key ideas. They use words and phrases from learning and texts. They form letters, spell most consonant–vowel–consonant words and experiment with capital letters and full stops."]
  },
  Year1: {
    criteria: ["They create short written and/or multimodal texts including recounts of stories with events and characters. They report information and experiences, and express opinions. Ideas in their texts may be informative or imaginative and include a small number of details from learnt topics, topics of interest or texts. They write simple sentences with sentence boundary punctuation and capital letters for proper nouns. They use topic-specific vocabulary. They write words using unjoined upper-case and lower-case letters. They spell most one- and two-syllable words with common letter patterns and common grammatical morphemes, and an increasing number of high-frequency words."]
  },
  Year2: {
    criteria: ["They create written and/or multimodal texts including stories to inform, express an opinion, adapt an idea or narrate for audiences. They use text structures to organise and link ideas for a purpose. They punctuate simple and compound sentences. They use topic-specific vocabulary. They write words using consistently legible unjoined letters. They spell words with regular spelling patterns, and use phonic and morphemic knowledge to attempt to spell words with less common patterns."]
  },
  Year3: {
    criteria: ["They create written and/or multimodal texts including stories to inform, narrate, explain or argue for audiences, relating ideas including relevant details from learnt topics, topics of interest or texts. They use text structures including paragraphs, and language features including compound sentences, topic-specific vocabulary and literary devices, and/or visual features. They write texts using letters that are accurately formed and consistent in size. They spell multisyllabic words using phonic and morphemic knowledge, and high-frequency words."]
  },
  Year4: {
    criteria: []
  },
  Year5: {
    criteria: []
  },
  Year6: {
    criteria: []
  }
};

export const writingAssessmentSystemPrompt = `You are analyzing a photograph of student handwriting.

YOU WILL RECEIVE:
1. An image of student handwriting
2. Achievement standard text for a year level (in the same user message as the image)

YOUR TASK:
1. Transcribe all visible text from the handwriting image, line by line
2. Read the achievement standard text provided
3. From that achievement standard, identify ONLY handwriting-observable aspects: letter formation, spelling, capitalization, punctuation (ignore content aspects like storytelling, ideas, vocabulary richness)
4. For each handwriting aspect, count occurrences in the visible handwriting
5. Calculate percentage from actual counts
6. Reference specific visible words and line numbers

RETURN FORMAT:

{
  "transcription": "Line 1: write visible words here\nLine 2: write visible words here\nLine 3: write visible words here",
  "assessments": [
    {
      "criterion": "handwriting aspect from the standard",
      "percentage": number calculated from count,
      "evidence": "Visible word 'example' on line 1 shows X. Word 'another' on line 3 shows Y. Count: 5 out of 8 correct."
    }
  ]
}

Transcription and evidence must be plain text strings. Include actual counts to support percentage. Reference specific visible words with line numbers. Use Australian English.`;