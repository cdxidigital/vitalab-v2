-- Spiritual Activities - Meaning, Purpose, and Transcendence (300+ entries)
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
-- Meditation & Mindfulness
('Zen Meditation', 'spiritual', 'meditation', 22, 'Traditional seated meditation practice', ARRAY['meditation', 'zen', 'mindfulness', 'tradition']),
('Vipassana Meditation', 'spiritual', 'meditation', 24, 'Insight meditation for awareness', ARRAY['meditation', 'vipassana', 'insight', 'awareness']),
('Transcendental Meditation', 'spiritual', 'meditation', 20, 'Mantra-based meditation technique', ARRAY['meditation', 'mantra', 'transcendental', 'technique']),
('Chakra Meditation', 'spiritual', 'meditation', 18, 'Energy center focused meditation', ARRAY['meditation', 'chakras', 'energy', 'healing']),
('Sound Bath Meditation', 'spiritual', 'meditation', 20, 'Meditation with healing sounds', ARRAY['meditation', 'sound', 'healing', 'vibration']),
('Crystal Meditation', 'spiritual', 'meditation', 16, 'Meditation with crystal energy', ARRAY['meditation', 'crystals', 'energy', 'healing']),
('Candle Gazing Meditation', 'spiritual', 'meditation', 14, 'Focused attention on flame', ARRAY['meditation', 'candle', 'focus', 'concentration']),
('Moon Meditation', 'spiritual', 'meditation', 18, 'Meditation aligned with lunar cycles', ARRAY['meditation', 'moon', 'cycles', 'nature']),
('Sun Salutation', 'spiritual', 'meditation', 16, 'Moving meditation with sun energy', ARRAY['meditation', 'sun', 'movement', 'energy']),
('Forest Bathing', 'spiritual', 'meditation', 22, 'Immersive nature meditation', ARRAY['meditation', 'nature', 'forest', 'immersion']),

-- Prayer & Worship
('Morning Prayer', 'spiritual', 'prayer', 18, 'Starting day with spiritual connection', ARRAY['prayer', 'morning', 'routine', 'connection']),
('Evening Prayer', 'spiritual', 'prayer', 16, 'Ending day with gratitude and reflection', ARRAY['prayer', 'evening', 'gratitude', 'reflection']),
('Intercessory Prayer', 'spiritual', 'prayer', 20, 'Praying for others\' wellbeing', ARRAY['prayer', 'others', 'compassion', 'service']),
('Contemplative Prayer', 'spiritual', 'prayer', 22, 'Silent communion with divine', ARRAY['prayer', 'contemplation', 'silence', 'communion']),
('Gratitude Prayer', 'spiritual', 'prayer', 18, 'Expressing thankfulness', ARRAY['prayer', 'gratitude', 'thankfulness', 'appreciation']),
('Healing Prayer', 'spiritual', 'prayer', 20, 'Seeking spiritual healing', ARRAY['prayer', 'healing', 'restoration', 'wellness']),
('Community Worship', 'spiritual', 'prayer', 24, 'Group spiritual practice', ARRAY['worship', 'community', 'group', 'fellowship']),
('Sacred Reading', 'spiritual', 'prayer', 16, 'Reading spiritual texts', ARRAY['reading', 'sacred', 'texts', 'wisdom']),
('Chanting', 'spiritual', 'prayer', 18, 'Repetitive sacred sounds', ARRAY['chanting', 'sound', 'repetition', 'sacred']),
('Rosary Prayer', 'spiritual', 'prayer', 16, 'Structured repetitive prayer', ARRAY['rosary', 'repetition', 'structure', 'devotion']),

-- Nature Connection
('Sunrise Watching', 'spiritual', 'nature', 18, 'Witnessing daily renewal', ARRAY['sunrise', 'nature', 'renewal', 'beauty']),
('Sunset Contemplation', 'spiritual', 'nature', 16, 'Reflecting on day\'s end', ARRAY['sunset', 'contemplation', 'reflection', 'beauty']),
('Star Gazing', 'spiritual', 'nature', 20, 'Connecting with cosmic vastness', ARRAY['stars', 'cosmos', 'vastness', 'wonder']),
('Ocean Meditation', 'spiritual', 'nature', 22, 'Finding peace by the sea', ARRAY['ocean', 'meditation', 'peace', 'vastness']),
('Mountain Contemplation', 'spiritual', 'nature', 20, 'Reflecting in high places', ARRAY['mountains', 'contemplation', 'elevation', 'perspective']),
('Tree Hugging', 'spiritual', 'nature', 14, 'Physical connection with trees', ARRAY['trees', 'connection', 'grounding', 'nature']),
('Garden Meditation', 'spiritual', 'nature', 16, 'Finding peace in cultivated nature', ARRAY['garden', 'meditation', 'cultivation', 'growth']),
('Weather Appreciation', 'spiritual', 'nature', 12, 'Finding meaning in natural phenomena', ARRAY['weather', 'appreciation', 'phenomena', 'acceptance']),
('Seasonal Rituals', 'spiritual', 'nature', 18, 'Honoring natural cycles', ARRAY['seasons', 'rituals', 'cycles', 'honoring']),
('Earth Connection', 'spiritual', 'nature', 16, 'Grounding with earth energy', ARRAY['earth', 'grounding', 'connection', 'energy']),

-- Sacred Practices
('Pilgrimage', 'spiritual', 'sacred-practice', 30, 'Sacred journey to holy place', ARRAY['pilgrimage', 'journey', 'sacred', 'devotion']),
('Fasting', 'spiritual', 'sacred-practice', 22, 'Spiritual discipline through abstinence', ARRAY['fasting', 'discipline', 'purification', 'sacrifice']),
('Sacred Dance', 'spiritual', 'sacred-practice', 20, 'Movement as spiritual expression', ARRAY['dance', 'movement', 'expression', 'sacred']),
('Ritual Cleansing', 'spiritual', 'sacred-practice', 16, 'Purification ceremonies', ARRAY['cleansing', 'purification', 'ritual', 'renewal']),
('Blessing Ceremony', 'spiritual', 'sacred-practice', 18, 'Invoking divine favor', ARRAY['blessing', 'ceremony', 'favor', 'protection']),
('Sacred Art Creation', 'spiritual', 'sacred-practice', 20, 'Artistic expression of spirituality', ARRAY['art', 'creation', 'expression', 'sacred']),
('Labyrinth Walking', 'spiritual', 'sacred-practice', 18, 'Meditative walking practice', ARRAY['labyrinth', 'walking', 'meditation', 'journey']),
('Vision Quest', 'spiritual', 'sacred-practice', 28, 'Solo spiritual seeking journey', ARRAY['vision-quest', 'seeking', 'solo', 'transformation']),
('Sweat Lodge', 'spiritual', 'sacred-practice', 24, 'Purification through heat ceremony', ARRAY['sweat-lodge', 'purification', 'ceremony', 'healing']),
('Fire Ceremony', 'spiritual', 'sacred-practice', 22, 'Sacred fire ritual', ARRAY['fire', 'ceremony', 'transformation', 'release']),

-- Study & Wisdom
('Scripture Study', 'spiritual', 'study', 18, 'Deep reading of sacred texts', ARRAY['scripture', 'study', 'wisdom', 'knowledge']),
('Spiritual Book Reading', 'spiritual', 'study', 16, 'Learning from spiritual teachers', ARRAY['reading', 'spiritual', 'learning', 'wisdom']),
('Philosophy Study', 'spiritual', 'study', 14, 'Exploring life\'s big questions', ARRAY['philosophy', 'study', 'questions', 'meaning']),
('Theology Discussion', 'spiritual', 'study', 16, 'Exploring divine nature', ARRAY['theology', 'discussion', 'divine', 'exploration']),
('Wisdom Tradition Study', 'spiritual', 'study', 18, 'Learning ancient wisdom', ARRAY['wisdom', 'tradition', 'ancient', 'learning']),
('Mystical Text Reading', 'spiritual', 'study', 20, 'Studying mystical experiences', ARRAY['mystical', 'texts', 'experiences', 'transcendence']),
('Spiritual Biography', 'spiritual', 'study', 14, 'Learning from spiritual lives', ARRAY['biography', 'spiritual', 'lives', 'inspiration']),
('Sacred Poetry', 'spiritual', 'study', 16, 'Reading spiritually inspired verse', ARRAY['poetry', 'sacred', 'inspiration', 'beauty']),
('Comparative Religion Study', 'spiritual', 'study', 18, 'Understanding diverse traditions', ARRAY['religion', 'comparative', 'diversity', 'understanding']),
('Spiritual Journaling', 'spiritual', 'study', 16, 'Recording spiritual insights', ARRAY['journaling', 'insights', 'reflection', 'growth']),

-- Service & Compassion
('Compassionate Service', 'spiritual', 'service', 26, 'Serving others with love', ARRAY['service', 'compassion', 'love', 'others']),
('Feeding the Hungry', 'spiritual', 'service', 28, 'Addressing basic human needs', ARRAY['feeding', 'hunger', 'basic-needs', 'service']),
('Visiting the Sick', 'spiritual', 'service', 24, 'Bringing comfort to suffering', ARRAY['visiting', 'sick', 'comfort', 'healing']),
('Caring for Elderly', 'spiritual', 'service', 26, 'Honoring and serving elders', ARRAY['elderly', 'care', 'honor', 'service']),
('Environmental Stewardship', 'spiritual', 'service', 22, 'Caring for creation', ARRAY['environment', 'stewardship', 'creation', 'care']),
('Animal Rescue', 'spiritual', 'service', 20, 'Protecting vulnerable creatures', ARRAY['animals', 'rescue', 'protection', 'compassion']),
('Prison Ministry', 'spiritual', 'service', 24, 'Bringing hope to incarcerated', ARRAY['prison', 'ministry', 'hope', 'redemption']),
('Homeless Outreach', 'spiritual', 'service', 26, 'Serving those without shelter', ARRAY['homeless', 'outreach', 'shelter', 'dignity']),
('Disaster Relief', 'spiritual', 'service', 28, 'Helping in times of crisis', ARRAY['disaster', 'relief', 'crisis', 'emergency']),
('Peace Building', 'spiritual', 'service', 24, 'Working for harmony and justice', ARRAY['peace', 'building', 'harmony', 'justice']),

-- Energy & Healing
('Reiki Practice', 'spiritual', 'energy', 18, 'Universal life energy healing', ARRAY['reiki', 'energy', 'healing', 'universal']),
('Chakra Balancing', 'spiritual', 'energy', 16, 'Aligning energy centers', ARRAY['chakras', 'balancing', 'energy', 'alignment']),
('Aura Cleansing', 'spiritual', 'energy', 14, 'Purifying energy field', ARRAY['aura', 'cleansing', 'energy', 'purification']),
('Crystal Healing', 'spiritual', 'energy', 16, 'Using crystals for healing', ARRAY['crystals', 'healing', 'energy', 'stones']),
('Sound Healing', 'spiritual', 'energy', 18, 'Healing through vibration', ARRAY['sound', 'healing', 'vibration', 'frequency']),
('Breathwork', 'spiritual', 'energy', 20, 'Conscious breathing for healing', ARRAY['breathwork', 'breathing', 'healing', 'consciousness']),
('Energy Clearing', 'spiritual', 'energy', 14, 'Removing negative energy', ARRAY['energy', 'clearing', 'negative', 'purification']),
('Pranic Healing', 'spiritual', 'energy', 18, 'Life force energy healing', ARRAY['prana', 'healing', 'life-force', 'energy']),
('Acupuncture', 'spiritual', 'energy', 20, 'Traditional energy meridian healing', ARRAY['acupuncture', 'meridians', 'energy', 'traditional']),
('Therapeutic Touch', 'spiritual', 'energy', 16, 'Healing through intentional touch', ARRAY['touch', 'healing', 'intention', 'therapeutic']);

-- Negative Spiritual Activities (things that decrease lifescore)
INSERT INTO public.activities_master (name, category, subcategory, lifescore_impact, description, tags) VALUES
('Spiritual Bypassing', 'spiritual', 'negative-patterns', -14, 'Using spirituality to avoid problems', ARRAY['bypassing', 'avoidance', 'spiritual', 'problems']),
('Religious Guilt', 'spiritual', 'negative-patterns', -16, 'Shame-based spiritual practice', ARRAY['guilt', 'shame', 'religion', 'negative']),
('Spiritual Materialism', 'spiritual', 'negative-patterns', -12, 'Ego-driven spiritual seeking', ARRAY['materialism', 'ego', 'spiritual', 'seeking']),
('Dogmatic Thinking', 'spiritual', 'negative-patterns', -14, 'Rigid spiritual beliefs', ARRAY['dogma', 'rigid', 'beliefs', 'inflexible']),
('Spiritual Superiority', 'spiritual', 'negative-patterns', -18, 'Judging others\' spiritual paths', ARRAY['superiority', 'judgment', 'spiritual', 'arrogance']),
('Cult-like Behavior', 'spiritual', 'negative-patterns', -22, 'Unhealthy group spiritual dynamics', ARRAY['cult', 'unhealthy', 'group', 'manipulation']),
('Spiritual Addiction', 'spiritual', 'negative-patterns', -16, 'Compulsive spiritual seeking', ARRAY['addiction', 'compulsive', 'seeking', 'spiritual']),
('Religious Extremism', 'spiritual', 'negative-patterns', -20, 'Harmful radical spiritual beliefs', ARRAY['extremism', 'radical', 'harmful', 'beliefs']),
('Spiritual Neglect', 'spiritual', 'negative-patterns', -10, 'Ignoring spiritual needs', ARRAY['neglect', 'spiritual', 'needs', 'emptiness']),
('False Prophets Following', 'spiritual', 'negative-patterns', -18, 'Following misleading spiritual leaders', ARRAY['false-prophets', 'misleading', 'leaders', 'deception']);
