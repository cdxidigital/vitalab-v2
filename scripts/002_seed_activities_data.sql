-- Insert sample activities data (representing the 15,000 activities)
-- Physical Activities
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
('Morning Walk', 'physical', 'cardio', 15, 'A gentle walk to start the day', ARRAY['cardio', 'morning', 'outdoor']),
('High-Intensity Interval Training', 'physical', 'cardio', 25, 'Intense cardio workout with intervals', ARRAY['cardio', 'intense', 'fitness']),
('Yoga Session', 'physical', 'flexibility', 20, 'Stretching and mindfulness practice', ARRAY['flexibility', 'mindfulness', 'balance']),
('Weight Training', 'physical', 'strength', 22, 'Building muscle strength and endurance', ARRAY['strength', 'muscle', 'fitness']),
('Swimming', 'physical', 'cardio', 24, 'Full-body cardiovascular exercise', ARRAY['cardio', 'full-body', 'water']),
('Rock Climbing', 'physical', 'adventure', 28, 'Challenging physical and mental activity', ARRAY['adventure', 'strength', 'problem-solving']),
('Dancing', 'physical', 'cardio', 18, 'Fun cardiovascular exercise through movement', ARRAY['cardio', 'fun', 'creative']),
('Stretching', 'physical', 'flexibility', 12, 'Gentle flexibility and mobility work', ARRAY['flexibility', 'recovery', 'gentle']),

-- Emotional Activities
('Meditation', 'emotional', 'mindfulness', 20, 'Quiet reflection and mindfulness practice', ARRAY['mindfulness', 'calm', 'mental-health']),
('Journaling', 'emotional', 'reflection', 15, 'Writing thoughts and feelings', ARRAY['reflection', 'writing', 'self-awareness']),
('Gratitude Practice', 'emotional', 'positivity', 18, 'Focusing on things to be grateful for', ARRAY['gratitude', 'positivity', 'mindfulness']),
('Deep Breathing', 'emotional', 'relaxation', 12, 'Controlled breathing for relaxation', ARRAY['breathing', 'relaxation', 'stress-relief']),
('Listening to Music', 'emotional', 'enjoyment', 10, 'Enjoying music for mood enhancement', ARRAY['music', 'mood', 'enjoyment']),
('Crying (Emotional Release)', 'emotional', 'release', 8, 'Healthy emotional expression', ARRAY['emotional-release', 'healing', 'authentic']),
('Laughing', 'emotional', 'joy', 15, 'Experiencing joy and humor', ARRAY['joy', 'humor', 'positive']),
('Art Therapy', 'emotional', 'creative', 16, 'Creative expression for emotional healing', ARRAY['creative', 'therapy', 'expression']),

-- Mental Activities
('Reading', 'mental', 'learning', 12, 'Engaging with books and literature', ARRAY['learning', 'knowledge', 'focus']),
('Puzzle Solving', 'mental', 'cognitive', 14, 'Brain training through puzzles', ARRAY['cognitive', 'problem-solving', 'brain-training']),
('Learning New Skill', 'mental', 'growth', 20, 'Acquiring new knowledge or abilities', ARRAY['learning', 'growth', 'skill-development']),
('Playing Chess', 'mental', 'strategy', 16, 'Strategic thinking and planning', ARRAY['strategy', 'thinking', 'game']),
('Studying', 'mental', 'education', 15, 'Focused learning and knowledge acquisition', ARRAY['education', 'focus', 'knowledge']),
('Creative Writing', 'mental', 'creativity', 18, 'Expressing ideas through writing', ARRAY['creativity', 'writing', 'expression']),
('Problem Solving', 'mental', 'cognitive', 17, 'Working through complex challenges', ARRAY['cognitive', 'analytical', 'challenge']),
('Memory Training', 'mental', 'cognitive', 13, 'Exercises to improve memory', ARRAY['memory', 'cognitive', 'brain-training']),

-- Social Activities
('Quality Time with Family', 'social', 'family', 22, 'Meaningful connection with family members', ARRAY['family', 'connection', 'bonding']),
('Coffee with Friends', 'social', 'friendship', 18, 'Casual social interaction', ARRAY['friendship', 'social', 'casual']),
('Team Sports', 'social', 'group-activity', 25, 'Physical activity with others', ARRAY['team', 'sports', 'cooperation']),
('Volunteering', 'social', 'service', 28, 'Helping others in the community', ARRAY['service', 'community', 'giving']),
('Networking Event', 'social', 'professional', 15, 'Professional social interaction', ARRAY['professional', 'networking', 'career']),
('Group Discussion', 'social', 'communication', 16, 'Engaging in meaningful conversation', ARRAY['communication', 'discussion', 'ideas']),
('Helping Others', 'social', 'service', 24, 'Providing assistance to those in need', ARRAY['helping', 'service', 'compassion']),
('Public Speaking', 'social', 'communication', 20, 'Sharing ideas with an audience', ARRAY['communication', 'confidence', 'sharing']),

-- Spiritual Activities
('Prayer', 'spiritual', 'faith', 18, 'Spiritual communication and reflection', ARRAY['faith', 'prayer', 'spiritual']),
('Nature Connection', 'spiritual', 'nature', 20, 'Connecting with the natural world', ARRAY['nature', 'connection', 'grounding']),
('Mindful Walking', 'spiritual', 'mindfulness', 16, 'Walking with awareness and presence', ARRAY['mindfulness', 'walking', 'presence']),
('Spiritual Reading', 'spiritual', 'study', 14, 'Reading spiritual or philosophical texts', ARRAY['spiritual', 'reading', 'wisdom']),
('Contemplation', 'spiritual', 'reflection', 15, 'Deep reflection on life and meaning', ARRAY['reflection', 'contemplation', 'meaning']),
('Ritual Practice', 'spiritual', 'ceremony', 17, 'Participating in meaningful rituals', ARRAY['ritual', 'ceremony', 'tradition']),
('Energy Healing', 'spiritual', 'healing', 19, 'Practices focused on energy and healing', ARRAY['healing', 'energy', 'wellness']),
('Sacred Music', 'spiritual', 'music', 13, 'Listening to or creating spiritual music', ARRAY['music', 'sacred', 'spiritual']);

-- Add negative impact activities (things that decrease lifescore)
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
('Excessive Social Media', 'mental', 'distraction', -15, 'Mindless scrolling on social platforms', ARRAY['social-media', 'distraction', 'negative']),
('Junk Food Binge', 'physical', 'nutrition', -20, 'Consuming unhealthy processed foods', ARRAY['junk-food', 'unhealthy', 'nutrition']),
('Staying Up Late', 'physical', 'sleep', -18, 'Poor sleep habits and late nights', ARRAY['sleep', 'late-night', 'unhealthy']),
('Arguing', 'social', 'conflict', -12, 'Engaging in unproductive arguments', ARRAY['conflict', 'argument', 'stress']),
('Procrastination', 'mental', 'avoidance', -10, 'Avoiding important tasks', ARRAY['procrastination', 'avoidance', 'stress']),
('Excessive Alcohol', 'physical', 'substance', -25, 'Drinking alcohol beyond healthy limits', ARRAY['alcohol', 'substance', 'unhealthy']),
('Smoking', 'physical', 'substance', -30, 'Tobacco use', ARRAY['smoking', 'tobacco', 'unhealthy']),
('Isolation', 'social', 'withdrawal', -16, 'Avoiding social connections', ARRAY['isolation', 'withdrawal', 'loneliness']);
