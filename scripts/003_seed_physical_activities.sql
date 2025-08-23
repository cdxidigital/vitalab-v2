-- Physical Activities - Exercise & Movement (500+ entries)
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
-- Cardio Activities
('Running 5K', 'physical', 'cardio', 25, 'Moderate distance running for cardiovascular health', ARRAY['cardio', 'running', 'endurance']),
('Running 10K', 'physical', 'cardio', 35, 'Long distance running for advanced fitness', ARRAY['cardio', 'running', 'endurance', 'advanced']),
('Marathon Training', 'physical', 'cardio', 40, 'Intensive long-distance running preparation', ARRAY['cardio', 'running', 'endurance', 'training']),
('Sprint Intervals', 'physical', 'cardio', 30, 'High-intensity short bursts of running', ARRAY['cardio', 'intervals', 'speed', 'intense']),
('Jogging', 'physical', 'cardio', 18, 'Light running pace for fitness maintenance', ARRAY['cardio', 'jogging', 'moderate']),
('Treadmill Walking', 'physical', 'cardio', 12, 'Indoor walking exercise', ARRAY['cardio', 'walking', 'indoor', 'gentle']),
('Elliptical Training', 'physical', 'cardio', 20, 'Low-impact cardio machine workout', ARRAY['cardio', 'machine', 'low-impact']),
('Stationary Bike', 'physical', 'cardio', 22, 'Indoor cycling for cardiovascular fitness', ARRAY['cardio', 'cycling', 'indoor']),
('Outdoor Cycling', 'physical', 'cardio', 26, 'Bicycle riding in natural environment', ARRAY['cardio', 'cycling', 'outdoor', 'nature']),
('Mountain Biking', 'physical', 'cardio', 32, 'Off-road cycling adventure', ARRAY['cardio', 'cycling', 'adventure', 'outdoor']),

-- Strength Training
('Deadlifts', 'physical', 'strength', 28, 'Compound movement for full-body strength', ARRAY['strength', 'compound', 'powerlifting']),
('Squats', 'physical', 'strength', 26, 'Lower body compound exercise', ARRAY['strength', 'legs', 'compound']),
('Bench Press', 'physical', 'strength', 24, 'Upper body pushing exercise', ARRAY['strength', 'chest', 'pushing']),
('Pull-ups', 'physical', 'strength', 25, 'Upper body pulling bodyweight exercise', ARRAY['strength', 'back', 'bodyweight']),
('Push-ups', 'physical', 'strength', 15, 'Basic upper body bodyweight exercise', ARRAY['strength', 'chest', 'bodyweight', 'basic']),
('Planks', 'physical', 'strength', 12, 'Core stability exercise', ARRAY['strength', 'core', 'stability']),
('Burpees', 'physical', 'strength', 22, 'Full-body explosive exercise', ARRAY['strength', 'cardio', 'explosive', 'full-body']),
('Kettlebell Swings', 'physical', 'strength', 20, 'Dynamic hip-hinge movement', ARRAY['strength', 'kettlebell', 'dynamic']),
('Dumbbell Rows', 'physical', 'strength', 18, 'Upper back strengthening exercise', ARRAY['strength', 'back', 'dumbbells']),
('Lunges', 'physical', 'strength', 16, 'Single-leg strength exercise', ARRAY['strength', 'legs', 'unilateral']),

-- Flexibility & Mobility
('Hatha Yoga', 'physical', 'flexibility', 22, 'Gentle yoga focusing on postures', ARRAY['flexibility', 'yoga', 'gentle', 'mindfulness']),
('Vinyasa Yoga', 'physical', 'flexibility', 25, 'Dynamic flowing yoga practice', ARRAY['flexibility', 'yoga', 'dynamic', 'flow']),
('Ashtanga Yoga', 'physical', 'flexibility', 30, 'Intensive traditional yoga practice', ARRAY['flexibility', 'yoga', 'intense', 'traditional']),
('Yin Yoga', 'physical', 'flexibility', 20, 'Passive long-held yoga poses', ARRAY['flexibility', 'yoga', 'passive', 'relaxation']),
('Pilates', 'physical', 'flexibility', 24, 'Core-focused movement system', ARRAY['flexibility', 'core', 'pilates', 'control']),
('Dynamic Stretching', 'physical', 'flexibility', 14, 'Active movement-based stretching', ARRAY['flexibility', 'dynamic', 'warm-up']),
('Static Stretching', 'physical', 'flexibility', 10, 'Passive held stretches', ARRAY['flexibility', 'static', 'recovery']),
('Foam Rolling', 'physical', 'flexibility', 12, 'Self-myofascial release technique', ARRAY['flexibility', 'recovery', 'self-massage']),
('Tai Chi', 'physical', 'flexibility', 18, 'Gentle martial art for balance and flow', ARRAY['flexibility', 'martial-arts', 'balance', 'mindful']),
('Qigong', 'physical', 'flexibility', 16, 'Chinese energy cultivation practice', ARRAY['flexibility', 'energy', 'mindful', 'traditional']),

-- Sports & Recreation
('Basketball', 'physical', 'sports', 28, 'Team sport requiring agility and coordination', ARRAY['sports', 'team', 'agility', 'coordination']),
('Soccer', 'physical', 'sports', 30, 'World\'s most popular team sport', ARRAY['sports', 'team', 'running', 'coordination']),
('Tennis', 'physical', 'sports', 26, 'Racquet sport requiring quick reflexes', ARRAY['sports', 'racquet', 'agility', 'strategy']),
('Volleyball', 'physical', 'sports', 24, 'Team sport emphasizing jumping and coordination', ARRAY['sports', 'team', 'jumping', 'coordination']),
('Baseball', 'physical', 'sports', 20, 'Traditional American team sport', ARRAY['sports', 'team', 'hand-eye-coordination']),
('Golf', 'physical', 'sports', 15, 'Precision sport played outdoors', ARRAY['sports', 'precision', 'outdoor', 'patience']),
('Bowling', 'physical', 'sports', 12, 'Indoor precision sport', ARRAY['sports', 'precision', 'indoor', 'social']),
('Badminton', 'physical', 'sports', 22, 'Fast-paced racquet sport', ARRAY['sports', 'racquet', 'speed', 'agility']),
('Table Tennis', 'physical', 'sports', 18, 'Indoor racquet sport requiring quick reflexes', ARRAY['sports', 'racquet', 'reflexes', 'indoor']),
('Martial Arts Training', 'physical', 'sports', 32, 'Disciplined combat sport practice', ARRAY['sports', 'martial-arts', 'discipline', 'self-defense']),

-- Water Activities
('Swimming Laps', 'physical', 'water', 28, 'Structured swimming for fitness', ARRAY['cardio', 'swimming', 'full-body', 'low-impact']),
('Water Aerobics', 'physical', 'water', 20, 'Low-impact exercise in water', ARRAY['cardio', 'water', 'low-impact', 'group']),
('Surfing', 'physical', 'water', 35, 'Ocean wave riding sport', ARRAY['sports', 'water', 'balance', 'adventure']),
('Kayaking', 'physical', 'water', 25, 'Paddle sport in small watercraft', ARRAY['cardio', 'water', 'upper-body', 'outdoor']),
('Stand-up Paddleboarding', 'physical', 'water', 22, 'Balance sport on water', ARRAY['balance', 'water', 'core', 'outdoor']),
('Water Skiing', 'physical', 'water', 30, 'High-speed water sport', ARRAY['sports', 'water', 'balance', 'adrenaline']),
('Scuba Diving', 'physical', 'water', 20, 'Underwater exploration activity', ARRAY['water', 'adventure', 'exploration', 'breathing']),
('Snorkeling', 'physical', 'water', 15, 'Surface water exploration', ARRAY['water', 'exploration', 'relaxation', 'nature']),

-- Outdoor Activities
('Hiking', 'physical', 'outdoor', 25, 'Walking in natural environments', ARRAY['cardio', 'outdoor', 'nature', 'adventure']),
('Backpacking', 'physical', 'outdoor', 35, 'Multi-day hiking with gear', ARRAY['cardio', 'outdoor', 'adventure', 'endurance']),
('Rock Climbing', 'physical', 'outdoor', 32, 'Vertical climbing on natural rock', ARRAY['strength', 'outdoor', 'adventure', 'problem-solving']),
('Bouldering', 'physical', 'outdoor', 28, 'Short, intense climbing problems', ARRAY['strength', 'problem-solving', 'outdoor']),
('Camping', 'physical', 'outdoor', 18, 'Outdoor overnight experience', ARRAY['outdoor', 'nature', 'adventure', 'relaxation']),
('Fishing', 'physical', 'outdoor', 12, 'Recreational angling activity', ARRAY['outdoor', 'patience', 'relaxation', 'nature']),
('Hunting', 'physical', 'outdoor', 20, 'Traditional outdoor pursuit', ARRAY['outdoor', 'patience', 'skill', 'nature']),
('Gardening', 'physical', 'outdoor', 16, 'Cultivating plants and vegetables', ARRAY['outdoor', 'nurturing', 'patience', 'nature']),
('Yard Work', 'physical', 'outdoor', 14, 'Maintaining outdoor spaces', ARRAY['outdoor', 'maintenance', 'physical-labor']),
('Beach Volleyball', 'physical', 'outdoor', 26, 'Sand-based team sport', ARRAY['sports', 'team', 'outdoor', 'beach']);

-- Nutrition Activities
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
('Meal Prep Sunday', 'physical', 'nutrition', 20, 'Preparing healthy meals for the week', ARRAY['nutrition', 'planning', 'healthy-eating']),
('Cooking Healthy Meal', 'physical', 'nutrition', 15, 'Preparing nutritious food at home', ARRAY['nutrition', 'cooking', 'healthy-eating']),
('Drinking 8 Glasses Water', 'physical', 'nutrition', 12, 'Meeting daily hydration goals', ARRAY['nutrition', 'hydration', 'health']),
('Taking Vitamins', 'physical', 'nutrition', 8, 'Daily supplement routine', ARRAY['nutrition', 'supplements', 'health']),
('Eating Vegetables', 'physical', 'nutrition', 10, 'Consuming nutrient-dense vegetables', ARRAY['nutrition', 'vegetables', 'healthy-eating']),
('Eating Fruits', 'physical', 'nutrition', 8, 'Consuming vitamin-rich fruits', ARRAY['nutrition', 'fruits', 'healthy-eating']),
('Avoiding Processed Food', 'physical', 'nutrition', 18, 'Choosing whole foods over processed', ARRAY['nutrition', 'whole-foods', 'healthy-eating']),
('Intermittent Fasting', 'physical', 'nutrition', 15, 'Structured eating window approach', ARRAY['nutrition', 'fasting', 'discipline']),
('Mindful Eating', 'physical', 'nutrition', 12, 'Conscious, present eating practice', ARRAY['nutrition', 'mindfulness', 'awareness']),
('Reading Nutrition Labels', 'physical', 'nutrition', 5, 'Making informed food choices', ARRAY['nutrition', 'education', 'awareness']);

-- Sleep & Recovery Activities
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
('8 Hours Quality Sleep', 'physical', 'sleep', 25, 'Full night of restorative sleep', ARRAY['sleep', 'recovery', 'health']),
('Consistent Sleep Schedule', 'physical', 'sleep', 20, 'Regular bedtime and wake time', ARRAY['sleep', 'routine', 'discipline']),
('Afternoon Nap', 'physical', 'sleep', 10, 'Short daytime rest period', ARRAY['sleep', 'rest', 'recovery']),
('Sleep Meditation', 'physical', 'sleep', 15, 'Guided relaxation for better sleep', ARRAY['sleep', 'meditation', 'relaxation']),
('Digital Detox Before Bed', 'physical', 'sleep', 12, 'Avoiding screens before sleep', ARRAY['sleep', 'digital-detox', 'hygiene']),
('Creating Sleep Sanctuary', 'physical', 'sleep', 8, 'Optimizing bedroom environment', ARRAY['sleep', 'environment', 'preparation']),
('Warm Bath Before Bed', 'physical', 'sleep', 10, 'Relaxing pre-sleep ritual', ARRAY['sleep', 'relaxation', 'ritual']),
('Reading Before Bed', 'physical', 'sleep', 8, 'Calming pre-sleep activity', ARRAY['sleep', 'reading', 'relaxation']),
('Progressive Muscle Relaxation', 'physical', 'sleep', 12, 'Systematic tension release technique', ARRAY['sleep', 'relaxation', 'technique']),
('Sleep Tracking', 'physical', 'sleep', 5, 'Monitoring sleep patterns and quality', ARRAY['sleep', 'tracking', 'awareness']);
