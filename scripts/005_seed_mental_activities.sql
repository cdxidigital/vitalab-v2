-- Mental Activities - Cognitive, Learning, and Intellectual Growth (500+ entries)
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
-- Learning & Education
('Reading Non-Fiction Book', 'mental', 'learning', 16, 'Educational reading for knowledge', ARRAY['reading', 'education', 'knowledge', 'non-fiction']),
('Reading Fiction Book', 'mental', 'learning', 12, 'Imaginative reading for mental stimulation', ARRAY['reading', 'fiction', 'imagination', 'creativity']),
('Online Course Completion', 'mental', 'learning', 25, 'Structured learning program', ARRAY['education', 'online-learning', 'skill-development', 'achievement']),
('Watching Educational Videos', 'mental', 'learning', 10, 'Video-based learning content', ARRAY['education', 'video', 'learning', 'visual']),
('Attending Workshop', 'mental', 'learning', 20, 'Interactive learning experience', ARRAY['workshop', 'interactive', 'learning', 'skill-development']),
('Learning New Language', 'mental', 'learning', 22, 'Acquiring foreign language skills', ARRAY['language', 'learning', 'communication', 'culture']),
('Practicing Language Skills', 'mental', 'learning', 14, 'Reinforcing language knowledge', ARRAY['language', 'practice', 'skill-maintenance', 'communication']),
('Studying for Certification', 'mental', 'learning', 18, 'Professional development study', ARRAY['study', 'certification', 'professional', 'career']),
('Research Project', 'mental', 'learning', 20, 'In-depth investigation of topic', ARRAY['research', 'investigation', 'analysis', 'knowledge']),
('Academic Writing', 'mental', 'learning', 16, 'Scholarly writing practice', ARRAY['writing', 'academic', 'communication', 'analysis']),

-- Cognitive Training
('Crossword Puzzles', 'mental', 'cognitive', 12, 'Word-based brain training', ARRAY['puzzles', 'vocabulary', 'brain-training', 'words']),
('Sudoku', 'mental', 'cognitive', 14, 'Number logic puzzle', ARRAY['puzzles', 'logic', 'numbers', 'brain-training']),
('Chess Playing', 'mental', 'cognitive', 18, 'Strategic board game', ARRAY['chess', 'strategy', 'planning', 'competition']),
('Memory Games', 'mental', 'cognitive', 12, 'Exercises to improve memory', ARRAY['memory', 'brain-training', 'cognitive', 'games']),
('Brain Training Apps', 'mental', 'cognitive', 10, 'Digital cognitive exercises', ARRAY['brain-training', 'apps', 'cognitive', 'digital']),
('Jigsaw Puzzles', 'mental', 'cognitive', 14, 'Visual-spatial puzzle solving', ARRAY['puzzles', 'visual-spatial', 'patience', 'completion']),
('Logic Puzzles', 'mental', 'cognitive', 16, 'Reasoning and deduction exercises', ARRAY['logic', 'reasoning', 'deduction', 'problem-solving']),
('Word Games', 'mental', 'cognitive', 10, 'Vocabulary and language games', ARRAY['word-games', 'vocabulary', 'language', 'fun']),
('Math Problems', 'mental', 'cognitive', 14, 'Mathematical calculation practice', ARRAY['math', 'calculation', 'numbers', 'problem-solving']),
('Pattern Recognition', 'mental', 'cognitive', 12, 'Identifying visual or logical patterns', ARRAY['patterns', 'recognition', 'visual', 'logic']),

-- Creative Thinking
('Brainstorming Session', 'mental', 'creativity', 16, 'Generating ideas and solutions', ARRAY['brainstorming', 'creativity', 'ideas', 'innovation']),
('Creative Writing', 'mental', 'creativity', 18, 'Imaginative written expression', ARRAY['writing', 'creativity', 'imagination', 'expression']),
('Drawing or Sketching', 'mental', 'creativity', 14, 'Visual artistic expression', ARRAY['drawing', 'art', 'creativity', 'visual']),
('Photography', 'mental', 'creativity', 16, 'Capturing images creatively', ARRAY['photography', 'creativity', 'visual', 'art']),
('Crafting Projects', 'mental', 'creativity', 12, 'Hands-on creative activities', ARRAY['crafts', 'creativity', 'hands-on', 'making']),
('Cooking New Recipe', 'mental', 'creativity', 14, 'Culinary creativity and experimentation', ARRAY['cooking', 'creativity', 'experimentation', 'food']),
('Interior Decorating', 'mental', 'creativity', 12, 'Spatial and aesthetic creativity', ARRAY['decorating', 'aesthetics', 'space', 'creativity']),
('Improvisation Exercises', 'mental', 'creativity', 16, 'Spontaneous creative expression', ARRAY['improvisation', 'spontaneity', 'creativity', 'expression']),
('Mind Mapping', 'mental', 'creativity', 10, 'Visual organization of ideas', ARRAY['mind-mapping', 'organization', 'visual', 'ideas']),
('Design Thinking', 'mental', 'creativity', 18, 'Systematic creative problem-solving', ARRAY['design-thinking', 'problem-solving', 'creativity', 'systematic']),

-- Problem Solving
('Analytical Thinking', 'mental', 'problem-solving', 16, 'Breaking down complex problems', ARRAY['analysis', 'thinking', 'problem-solving', 'logic']),
('Critical Thinking', 'mental', 'problem-solving', 18, 'Evaluating information objectively', ARRAY['critical-thinking', 'evaluation', 'objectivity', 'analysis']),
('Decision Making', 'mental', 'problem-solving', 14, 'Choosing between alternatives', ARRAY['decision-making', 'choices', 'evaluation', 'judgment']),
('Strategic Planning', 'mental', 'problem-solving', 20, 'Long-term goal and method planning', ARRAY['strategy', 'planning', 'goals', 'long-term']),
('Troubleshooting', 'mental', 'problem-solving', 16, 'Identifying and fixing problems', ARRAY['troubleshooting', 'problem-solving', 'diagnosis', 'solutions']),
('Root Cause Analysis', 'mental', 'problem-solving', 18, 'Finding underlying problem sources', ARRAY['analysis', 'root-cause', 'investigation', 'systematic']),
('Systems Thinking', 'mental', 'problem-solving', 20, 'Understanding interconnected systems', ARRAY['systems', 'thinking', 'interconnection', 'holistic']),
('Scenario Planning', 'mental', 'problem-solving', 16, 'Preparing for multiple outcomes', ARRAY['scenarios', 'planning', 'preparation', 'futures']),
('Risk Assessment', 'mental', 'problem-solving', 14, 'Evaluating potential risks', ARRAY['risk', 'assessment', 'evaluation', 'safety']),
('Innovation Thinking', 'mental', 'problem-solving', 18, 'Creating novel solutions', ARRAY['innovation', 'creativity', 'solutions', 'novel']),

-- Focus & Concentration
('Deep Work Session', 'mental', 'focus', 20, 'Extended focused work period', ARRAY['focus', 'concentration', 'productivity', 'deep-work']),
('Pomodoro Technique', 'mental', 'focus', 16, 'Structured work and break intervals', ARRAY['focus', 'technique', 'productivity', 'time-management']),
('Meditation for Focus', 'mental', 'focus', 18, 'Mindfulness practice for concentration', ARRAY['meditation', 'focus', 'concentration', 'mindfulness']),
('Single-Tasking', 'mental', 'focus', 14, 'Focusing on one task at a time', ARRAY['focus', 'single-tasking', 'concentration', 'productivity']),
('Eliminating Distractions', 'mental', 'focus', 12, 'Creating focused work environment', ARRAY['focus', 'distractions', 'environment', 'productivity']),
('Time Blocking', 'mental', 'focus', 14, 'Scheduling specific time for tasks', ARRAY['time-management', 'scheduling', 'focus', 'organization']),
('Priority Setting', 'mental', 'focus', 16, 'Identifying most important tasks', ARRAY['priorities', 'importance', 'focus', 'productivity']),
('Goal Setting', 'mental', 'focus', 18, 'Defining clear objectives', ARRAY['goals', 'objectives', 'clarity', 'direction']),
('Progress Tracking', 'mental', 'focus', 12, 'Monitoring advancement toward goals', ARRAY['tracking', 'progress', 'monitoring', 'goals']),
('Reflection Practice', 'mental', 'focus', 14, 'Thinking about experiences and learning', ARRAY['reflection', 'thinking', 'learning', 'insight']),

-- Memory & Recall
('Memory Palace Technique', 'mental', 'memory', 16, 'Spatial memory enhancement method', ARRAY['memory', 'technique', 'spatial', 'enhancement']),
('Spaced Repetition', 'mental', 'memory', 14, 'Systematic review for retention', ARRAY['memory', 'repetition', 'retention', 'systematic']),
('Mnemonics Practice', 'mental', 'memory', 12, 'Memory aids and tricks', ARRAY['memory', 'mnemonics', 'aids', 'tricks']),
('Flashcard Study', 'mental', 'memory', 10, 'Active recall practice', ARRAY['memory', 'flashcards', 'recall', 'study']),
('Name-Face Association', 'mental', 'memory', 8, 'Remembering people\'s names', ARRAY['memory', 'names', 'faces', 'social']),
('List Memorization', 'mental', 'memory', 10, 'Memorizing sequences or lists', ARRAY['memory', 'lists', 'sequences', 'recall']),
('Story Method', 'mental', 'memory', 12, 'Using narratives to remember information', ARRAY['memory', 'stories', 'narrative', 'technique']),
('Chunking Information', 'mental', 'memory', 10, 'Breaking information into manageable pieces', ARRAY['memory', 'chunking', 'organization', 'technique']),
('Visual Memory Training', 'mental', 'memory', 12, 'Enhancing visual recall abilities', ARRAY['memory', 'visual', 'recall', 'training']),
('Auditory Memory Practice', 'mental', 'memory', 10, 'Improving sound-based memory', ARRAY['memory', 'auditory', 'sound', 'practice']);

-- Negative Mental Activities (things that decrease lifescore)
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
('Mindless Social Media Scrolling', 'mental', 'negative-patterns', -12, 'Passive consumption of social media', ARRAY['social-media', 'mindless', 'passive', 'distraction']),
('Binge-Watching TV', 'mental', 'negative-patterns', -10, 'Excessive passive entertainment consumption', ARRAY['tv', 'binge-watching', 'passive', 'excessive']),
('Procrastination', 'mental', 'negative-patterns', -14, 'Avoiding important tasks', ARRAY['procrastination', 'avoidance', 'delay', 'productivity']),
('Multitasking', 'mental', 'negative-patterns', -8, 'Attempting multiple tasks simultaneously', ARRAY['multitasking', 'distraction', 'inefficiency', 'focus']),
('Information Overload', 'mental', 'negative-patterns', -10, 'Consuming too much information', ARRAY['information', 'overload', 'overwhelm', 'consumption']),
('Negative News Consumption', 'mental', 'negative-patterns', -12, 'Excessive focus on negative news', ARRAY['news', 'negative', 'media', 'mood']),
('Overthinking', 'mental', 'negative-patterns', -14, 'Excessive analysis without action', ARRAY['overthinking', 'analysis-paralysis', 'rumination', 'anxiety']),
('Mental Clutter', 'mental', 'negative-patterns', -8, 'Disorganized thoughts and priorities', ARRAY['clutter', 'disorganization', 'confusion', 'clarity']),
('Comparison to Others', 'mental', 'negative-patterns', -12, 'Measuring self against others', ARRAY['comparison', 'self-esteem', 'inadequacy', 'social']),
('Fixed Mindset Thinking', 'mental', 'negative-patterns', -10, 'Believing abilities cannot be developed', ARRAY['fixed-mindset', 'limitation', 'growth', 'belief']);
