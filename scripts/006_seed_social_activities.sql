-- Social Activities - Relationships, Community, and Social Connection (500+ entries)
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
-- Family Relationships
('Quality Time with Spouse/Partner', 'social', 'family', 25, 'Meaningful connection with life partner', ARRAY['family', 'partner', 'connection', 'intimacy']),
('Date Night', 'social', 'family', 22, 'Romantic time with partner', ARRAY['romance', 'partner', 'date', 'connection']),
('Playing with Children', 'social', 'family', 24, 'Active engagement with kids', ARRAY['children', 'play', 'family', 'joy']),
('Family Game Night', 'social', 'family', 20, 'Fun group activity with family', ARRAY['family', 'games', 'fun', 'bonding']),
('Cooking Together', 'social', 'family', 18, 'Collaborative meal preparation', ARRAY['cooking', 'collaboration', 'family', 'sharing']),
('Family Walk or Hike', 'social', 'family', 22, 'Outdoor activity with family', ARRAY['family', 'outdoor', 'exercise', 'nature']),
('Bedtime Stories', 'social', 'family', 16, 'Reading to children', ARRAY['reading', 'children', 'bonding', 'routine']),
('Family Movie Night', 'social', 'family', 18, 'Shared entertainment experience', ARRAY['family', 'movies', 'entertainment', 'togetherness']),
('Helping with Homework', 'social', 'family', 14, 'Supporting children\'s education', ARRAY['education', 'support', 'children', 'learning']),
('Family Vacation Planning', 'social', 'family', 16, 'Collaborative trip preparation', ARRAY['vacation', 'planning', 'family', 'anticipation']),

-- Friendships
('Coffee Date with Friend', 'social', 'friendship', 18, 'Casual social connection', ARRAY['friendship', 'coffee', 'conversation', 'connection']),
('Deep Conversation', 'social', 'friendship', 20, 'Meaningful dialogue with friend', ARRAY['conversation', 'deep', 'connection', 'sharing']),
('Group Dinner Party', 'social', 'friendship', 22, 'Social gathering with multiple friends', ARRAY['dinner', 'group', 'socializing', 'hosting']),
('Supporting Friend in Need', 'social', 'friendship', 24, 'Providing emotional support', ARRAY['support', 'friendship', 'care', 'empathy']),
('Celebrating Friend\'s Success', 'social', 'friendship', 18, 'Sharing in friend\'s achievements', ARRAY['celebration', 'success', 'friendship', 'joy']),
('Weekend Trip with Friends', 'social', 'friendship', 26, 'Extended social time away', ARRAY['travel', 'friends', 'adventure', 'bonding']),
('Game Night with Friends', 'social', 'friendship', 20, 'Fun competitive or cooperative games', ARRAY['games', 'friends', 'fun', 'competition']),
('Exercise Buddy Workout', 'social', 'friendship', 22, 'Fitness activity with friend', ARRAY['exercise', 'friendship', 'motivation', 'health']),
('Book Club Meeting', 'social', 'friendship', 18, 'Literary discussion with group', ARRAY['books', 'discussion', 'learning', 'group']),
('Hobby Group Participation', 'social', 'friendship', 16, 'Shared interest activity', ARRAY['hobbies', 'group', 'interests', 'community']),

-- Community Involvement
('Volunteering at Charity', 'social', 'community', 28, 'Giving time to help others', ARRAY['volunteering', 'charity', 'service', 'giving']),
('Community Garden Work', 'social', 'community', 20, 'Collaborative gardening project', ARRAY['gardening', 'community', 'environment', 'collaboration']),
('Neighborhood Watch', 'social', 'community', 16, 'Contributing to community safety', ARRAY['safety', 'neighborhood', 'responsibility', 'community']),
('Local Event Participation', 'social', 'community', 18, 'Engaging in community activities', ARRAY['events', 'local', 'participation', 'community']),
('Town Hall Meeting', 'social', 'community', 14, 'Civic engagement and participation', ARRAY['civic', 'government', 'participation', 'democracy']),
('Coaching Youth Sports', 'social', 'community', 24, 'Mentoring young people', ARRAY['coaching', 'youth', 'sports', 'mentoring']),
('Food Bank Volunteering', 'social', 'community', 26, 'Helping address food insecurity', ARRAY['food-bank', 'volunteering', 'hunger', 'service']),
('Environmental Cleanup', 'social', 'community', 22, 'Caring for shared environment', ARRAY['environment', 'cleanup', 'stewardship', 'community']),
('Fundraising for Cause', 'social', 'community', 20, 'Raising money for important issues', ARRAY['fundraising', 'cause', 'charity', 'activism']),
('Mentoring Program', 'social', 'community', 26, 'Guiding and supporting others', ARRAY['mentoring', 'guidance', 'support', 'development']),

-- Professional Networking
('Industry Conference', 'social', 'professional', 18, 'Professional development and networking', ARRAY['conference', 'professional', 'networking', 'learning']),
('Business Lunch', 'social', 'professional', 14, 'Professional relationship building', ARRAY['business', 'lunch', 'networking', 'professional']),
('Professional Association Meeting', 'social', 'professional', 16, 'Industry group participation', ARRAY['association', 'professional', 'industry', 'networking']),
('Mentoring Colleague', 'social', 'professional', 20, 'Supporting coworker development', ARRAY['mentoring', 'colleague', 'professional', 'support']),
('Team Building Activity', 'social', 'professional', 18, 'Workplace relationship building', ARRAY['team-building', 'workplace', 'collaboration', 'relationships']),
('Networking Event', 'social', 'professional', 16, 'Professional connection building', ARRAY['networking', 'professional', 'connections', 'career']),
('Industry Meetup', 'social', 'professional', 14, 'Informal professional gathering', ARRAY['meetup', 'industry', 'informal', 'networking']),
('Professional Workshop', 'social', 'professional', 18, 'Skill development with peers', ARRAY['workshop', 'professional', 'skills', 'learning']),
('Career Fair Participation', 'social', 'professional', 12, 'Exploring career opportunities', ARRAY['career', 'fair', 'opportunities', 'exploration']),
('Alumni Event', 'social', 'professional', 14, 'Connecting with former classmates', ARRAY['alumni', 'education', 'networking', 'nostalgia']),

-- Social Skills Development
('Public Speaking', 'social', 'communication', 22, 'Presenting to an audience', ARRAY['public-speaking', 'presentation', 'communication', 'confidence']),
('Active Listening Practice', 'social', 'communication', 16, 'Improving listening skills', ARRAY['listening', 'communication', 'empathy', 'skills']),
('Conflict Resolution', 'social', 'communication', 20, 'Addressing interpersonal conflicts', ARRAY['conflict', 'resolution', 'communication', 'peace']),
('Assertiveness Training', 'social', 'communication', 18, 'Learning to express needs clearly', ARRAY['assertiveness', 'communication', 'boundaries', 'confidence']),
('Empathy Practice', 'social', 'communication', 16, 'Understanding others\' perspectives', ARRAY['empathy', 'understanding', 'compassion', 'connection']),
('Small Talk Skills', 'social', 'communication', 10, 'Casual conversation abilities', ARRAY['small-talk', 'conversation', 'social', 'casual']),
('Nonverbal Communication', 'social', 'communication', 12, 'Body language awareness', ARRAY['nonverbal', 'body-language', 'communication', 'awareness']),
('Cultural Sensitivity Training', 'social', 'communication', 18, 'Understanding diverse perspectives', ARRAY['culture', 'diversity', 'sensitivity', 'inclusion']),
('Negotiation Skills', 'social', 'communication', 20, 'Finding mutually beneficial solutions', ARRAY['negotiation', 'compromise', 'problem-solving', 'communication']),
('Emotional Intelligence Development', 'social', 'communication', 22, 'Understanding and managing emotions in social contexts', ARRAY['emotional-intelligence', 'emotions', 'social', 'awareness']),

-- Group Activities
('Team Sports Participation', 'social', 'group-activity', 24, 'Collaborative athletic activity', ARRAY['sports', 'team', 'collaboration', 'competition']),
('Group Fitness Class', 'social', 'group-activity', 20, 'Exercise with others', ARRAY['fitness', 'group', 'exercise', 'motivation']),
('Choir or Band', 'social', 'group-activity', 22, 'Musical collaboration', ARRAY['music', 'group', 'collaboration', 'performance']),
('Theater Group', 'social', 'group-activity', 24, 'Dramatic performance with others', ARRAY['theater', 'performance', 'creativity', 'collaboration']),
('Study Group', 'social', 'group-activity', 18, 'Collaborative learning', ARRAY['study', 'learning', 'collaboration', 'education']),
('Support Group', 'social', 'group-activity', 22, 'Mutual emotional support', ARRAY['support', 'group', 'healing', 'sharing']),
('Religious Service', 'social', 'group-activity', 20, 'Spiritual community gathering', ARRAY['religion', 'spirituality', 'community', 'worship']),
('Dance Class', 'social', 'group-activity', 18, 'Learning dance with others', ARRAY['dance', 'learning', 'movement', 'social']),
('Cooking Class', 'social', 'group-activity', 16, 'Culinary learning with others', ARRAY['cooking', 'learning', 'food', 'social']),
('Art Class', 'social', 'group-activity', 18, 'Creative expression with others', ARRAY['art', 'creativity', 'learning', 'social']);

-- Negative Social Activities (things that decrease lifescore)
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
('Gossiping', 'social', 'negative-patterns', -12, 'Spreading rumors or negative talk about others', ARRAY['gossip', 'negativity', 'rumors', 'harmful']),
('Social Media Arguments', 'social', 'negative-patterns', -15, 'Engaging in online conflicts', ARRAY['social-media', 'arguments', 'conflict', 'online']),
('Toxic Relationship Maintenance', 'social', 'negative-patterns', -20, 'Continuing harmful relationships', ARRAY['toxic', 'relationships', 'harmful', 'unhealthy']),
('Social Isolation', 'social', 'negative-patterns', -18, 'Avoiding social connections', ARRAY['isolation', 'avoidance', 'loneliness', 'withdrawal']),
('People Pleasing', 'social', 'negative-patterns', -10, 'Sacrificing own needs for others\' approval', ARRAY['people-pleasing', 'boundaries', 'self-sacrifice', 'approval']),
('Passive Aggressive Behavior', 'social', 'negative-patterns', -14, 'Indirect expression of negative feelings', ARRAY['passive-aggressive', 'communication', 'indirect', 'conflict']),
('Jealousy and Envy', 'social', 'negative-patterns', -12, 'Resentment toward others\' success', ARRAY['jealousy', 'envy', 'resentment', 'comparison']),
('Manipulation', 'social', 'negative-patterns', -18, 'Using others for personal gain', ARRAY['manipulation', 'exploitation', 'selfish', 'harmful']),
('Boundary Violations', 'social', 'negative-patterns', -16, 'Disrespecting others\' limits', ARRAY['boundaries', 'disrespect', 'violation', 'harmful']),
('Social Comparison', 'social', 'negative-patterns', -10, 'Constantly measuring self against others', ARRAY['comparison', 'self-esteem', 'inadequacy', 'social']);
