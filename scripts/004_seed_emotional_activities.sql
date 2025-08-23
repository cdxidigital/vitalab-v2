-- Emotional Activities - Mood, Feelings, and Emotional Regulation (500+ entries)
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
-- Mindfulness & Meditation
('5-Minute Meditation', 'emotional', 'mindfulness', 12, 'Brief mindfulness practice', ARRAY['meditation', 'mindfulness', 'short', 'calm']),
('20-Minute Meditation', 'emotional', 'mindfulness', 20, 'Extended mindfulness session', ARRAY['meditation', 'mindfulness', 'extended', 'deep']),
('Walking Meditation', 'emotional', 'mindfulness', 15, 'Mindful movement practice', ARRAY['meditation', 'walking', 'mindfulness', 'movement']),
('Body Scan Meditation', 'emotional', 'mindfulness', 18, 'Systematic body awareness practice', ARRAY['meditation', 'body-awareness', 'relaxation']),
('Loving-Kindness Meditation', 'emotional', 'mindfulness', 22, 'Compassion-focused meditation', ARRAY['meditation', 'compassion', 'love', 'kindness']),
('Breath Awareness', 'emotional', 'mindfulness', 14, 'Focused breathing meditation', ARRAY['meditation', 'breathing', 'awareness', 'calm']),
('Mindful Eating', 'emotional', 'mindfulness', 12, 'Present-moment eating practice', ARRAY['mindfulness', 'eating', 'awareness', 'presence']),
('Mindful Listening', 'emotional', 'mindfulness', 10, 'Attentive listening practice', ARRAY['mindfulness', 'listening', 'presence', 'awareness']),
('Mindful Observation', 'emotional', 'mindfulness', 8, 'Conscious observation of surroundings', ARRAY['mindfulness', 'observation', 'awareness', 'presence']),
('Guided Visualization', 'emotional', 'mindfulness', 16, 'Directed mental imagery practice', ARRAY['meditation', 'visualization', 'imagination', 'relaxation']),

-- Emotional Expression
('Journaling Emotions', 'emotional', 'expression', 18, 'Writing about feelings and experiences', ARRAY['journaling', 'emotions', 'expression', 'reflection']),
('Gratitude Journaling', 'emotional', 'expression', 20, 'Recording things to be grateful for', ARRAY['gratitude', 'journaling', 'positivity', 'appreciation']),
('Stream of Consciousness Writing', 'emotional', 'expression', 15, 'Unfiltered emotional writing', ARRAY['writing', 'expression', 'creativity', 'release']),
('Art Therapy', 'emotional', 'expression', 22, 'Creative expression for emotional healing', ARRAY['art', 'creativity', 'therapy', 'expression']),
('Music Therapy', 'emotional', 'expression', 18, 'Using music for emotional processing', ARRAY['music', 'therapy', 'expression', 'healing']),
('Dance Movement', 'emotional', 'expression', 20, 'Physical expression of emotions', ARRAY['dance', 'movement', 'expression', 'physical']),
('Singing', 'emotional', 'expression', 16, 'Vocal expression and release', ARRAY['singing', 'voice', 'expression', 'joy']),
('Playing Musical Instrument', 'emotional', 'expression', 18, 'Musical creativity and expression', ARRAY['music', 'creativity', 'skill', 'expression']),
('Poetry Writing', 'emotional', 'expression', 16, 'Creative written expression', ARRAY['poetry', 'writing', 'creativity', 'expression']),
('Storytelling', 'emotional', 'expression', 14, 'Narrative expression and sharing', ARRAY['storytelling', 'narrative', 'expression', 'sharing']),

-- Stress Management
('Deep Breathing Exercises', 'emotional', 'stress-relief', 15, 'Controlled breathing for calm', ARRAY['breathing', 'stress-relief', 'calm', 'technique']),
('Progressive Muscle Relaxation', 'emotional', 'stress-relief', 18, 'Systematic tension release', ARRAY['relaxation', 'stress-relief', 'technique', 'body']),
('Stress Ball Squeezing', 'emotional', 'stress-relief', 8, 'Physical stress release tool', ARRAY['stress-relief', 'physical', 'tool', 'tension']),
('Aromatherapy', 'emotional', 'stress-relief', 12, 'Using scents for relaxation', ARRAY['aromatherapy', 'relaxation', 'scents', 'calm']),
('Hot Bath with Epsom Salts', 'emotional', 'stress-relief', 16, 'Relaxing bath for stress relief', ARRAY['bath', 'relaxation', 'stress-relief', 'self-care']),
('Massage Therapy', 'emotional', 'stress-relief', 22, 'Professional therapeutic touch', ARRAY['massage', 'therapy', 'relaxation', 'healing']),
('Self-Massage', 'emotional', 'stress-relief', 12, 'Personal tension release', ARRAY['massage', 'self-care', 'tension-relief', 'relaxation']),
('Sauna Session', 'emotional', 'stress-relief', 18, 'Heat therapy for relaxation', ARRAY['sauna', 'heat', 'relaxation', 'detox']),
('Time in Nature', 'emotional', 'stress-relief', 20, 'Natural environment for calm', ARRAY['nature', 'outdoor', 'calm', 'grounding']),
('Digital Detox', 'emotional', 'stress-relief', 16, 'Break from technology and screens', ARRAY['digital-detox', 'technology', 'break', 'mindfulness']),

-- Mood Enhancement
('Listening to Uplifting Music', 'emotional', 'mood-boost', 12, 'Music for positive emotions', ARRAY['music', 'mood', 'positivity', 'uplift']),
('Watching Comedy', 'emotional', 'mood-boost', 14, 'Humor for mood improvement', ARRAY['comedy', 'humor', 'laughter', 'entertainment']),
('Spending Time with Pets', 'emotional', 'mood-boost', 18, 'Animal companionship for joy', ARRAY['pets', 'companionship', 'joy', 'love']),
('Random Acts of Kindness', 'emotional', 'mood-boost', 20, 'Helping others for mutual benefit', ARRAY['kindness', 'helping', 'service', 'compassion']),
('Complimenting Others', 'emotional', 'mood-boost', 10, 'Spreading positivity through words', ARRAY['compliments', 'positivity', 'kindness', 'social']),
('Practicing Self-Compassion', 'emotional', 'mood-boost', 16, 'Being kind to oneself', ARRAY['self-compassion', 'kindness', 'self-care', 'acceptance']),
('Celebrating Small Wins', 'emotional', 'mood-boost', 14, 'Acknowledging personal achievements', ARRAY['celebration', 'achievement', 'recognition', 'positivity']),
('Looking at Photos of Loved Ones', 'emotional', 'mood-boost', 12, 'Connecting with positive memories', ARRAY['photos', 'memories', 'love', 'connection']),
('Sunrise or Sunset Watching', 'emotional', 'mood-boost', 16, 'Natural beauty for inspiration', ARRAY['nature', 'beauty', 'inspiration', 'peace']),
('Flower Arranging', 'emotional', 'mood-boost', 10, 'Creative activity with natural beauty', ARRAY['flowers', 'creativity', 'beauty', 'nature']),

-- Emotional Processing
('Therapy Session', 'emotional', 'processing', 25, 'Professional emotional support', ARRAY['therapy', 'professional', 'support', 'healing']),
('Support Group Meeting', 'emotional', 'processing', 20, 'Peer emotional support', ARRAY['support-group', 'peers', 'sharing', 'community']),
('Emotional Check-in with Friend', 'emotional', 'processing', 16, 'Sharing feelings with trusted person', ARRAY['friendship', 'sharing', 'support', 'connection']),
('Crying (Healthy Release)', 'emotional', 'processing', 12, 'Natural emotional expression', ARRAY['crying', 'release', 'expression', 'natural']),
('Anger Release Exercise', 'emotional', 'processing', 14, 'Healthy anger expression', ARRAY['anger', 'release', 'expression', 'healthy']),
('Forgiveness Practice', 'emotional', 'processing', 18, 'Letting go of resentment', ARRAY['forgiveness', 'letting-go', 'healing', 'peace']),
('Boundary Setting', 'emotional', 'processing', 16, 'Protecting emotional well-being', ARRAY['boundaries', 'protection', 'self-care', 'assertiveness']),
('Conflict Resolution', 'emotional', 'processing', 18, 'Addressing interpersonal issues', ARRAY['conflict', 'resolution', 'communication', 'peace']),
('Emotional Regulation Techniques', 'emotional', 'processing', 20, 'Managing intense emotions', ARRAY['regulation', 'management', 'techniques', 'control']),
('Trauma Processing', 'emotional', 'processing', 22, 'Working through difficult experiences', ARRAY['trauma', 'processing', 'healing', 'recovery']),

-- Self-Care Activities
('Skincare Routine', 'emotional', 'self-care', 10, 'Nurturing physical appearance', ARRAY['skincare', 'self-care', 'routine', 'nurturing']),
('Hair Care Ritual', 'emotional', 'self-care', 8, 'Caring for hair and scalp', ARRAY['hair-care', 'self-care', 'ritual', 'nurturing']),
('Manicure/Pedicure', 'emotional', 'self-care', 12, 'Nail care and beautification', ARRAY['nail-care', 'self-care', 'beauty', 'pampering']),
('Bubble Bath', 'emotional', 'self-care', 14, 'Luxurious bathing experience', ARRAY['bath', 'luxury', 'relaxation', 'pampering']),
('Face Mask Treatment', 'emotional', 'self-care', 10, 'Facial care and relaxation', ARRAY['face-mask', 'skincare', 'relaxation', 'pampering']),
('Buying Yourself Flowers', 'emotional', 'self-care', 12, 'Self-gifting for joy', ARRAY['flowers', 'self-gift', 'beauty', 'joy']),
('Decluttering Personal Space', 'emotional', 'self-care', 14, 'Creating organized environment', ARRAY['decluttering', 'organization', 'space', 'clarity']),
('Organizing Digital Photos', 'emotional', 'self-care', 8, 'Curating digital memories', ARRAY['organization', 'photos', 'memories', 'digital']),
('Creating Vision Board', 'emotional', 'self-care', 16, 'Visualizing goals and dreams', ARRAY['vision-board', 'goals', 'visualization', 'dreams']),
('Personal Retreat Day', 'emotional', 'self-care', 20, 'Dedicated day for self-nurturing', ARRAY['retreat', 'self-care', 'nurturing', 'restoration']);

-- Negative Emotional Activities (things that decrease lifescore)
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
('Dwelling on Negative Thoughts', 'emotional', 'negative-patterns', -15, 'Repetitive negative thinking', ARRAY['negative-thinking', 'rumination', 'mental-health']),
('Social Media Comparison', 'emotional', 'negative-patterns', -18, 'Comparing life to others online', ARRAY['social-media', 'comparison', 'self-esteem']),
('Suppressing Emotions', 'emotional', 'negative-patterns', -12, 'Avoiding or hiding feelings', ARRAY['suppression', 'avoidance', 'emotional-health']),
('Perfectionism', 'emotional', 'negative-patterns', -14, 'Unrealistic standards causing stress', ARRAY['perfectionism', 'stress', 'unrealistic']),
('Catastrophic Thinking', 'emotional', 'negative-patterns', -16, 'Imagining worst-case scenarios', ARRAY['catastrophizing', 'anxiety', 'negative-thinking']),
('Emotional Eating', 'emotional', 'negative-patterns', -10, 'Using food to cope with emotions', ARRAY['emotional-eating', 'coping', 'food']),
('Isolating When Upset', 'emotional', 'negative-patterns', -12, 'Withdrawing from support systems', ARRAY['isolation', 'withdrawal', 'support']),
('Venting Without Solutions', 'emotional', 'negative-patterns', -8, 'Complaining without problem-solving', ARRAY['venting', 'complaining', 'negativity']),
('Holding Grudges', 'emotional', 'negative-patterns', -14, 'Maintaining resentment over time', ARRAY['grudges', 'resentment', 'anger']),
('Self-Criticism', 'emotional', 'negative-patterns', -16, 'Harsh internal dialogue', ARRAY['self-criticism', 'negative-self-talk', 'self-esteem']);
