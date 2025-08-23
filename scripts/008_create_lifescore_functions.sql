-- Create SQL functions for LifeScore calculations and updates
-- Function to update user's LifeScore
CREATE OR REPLACE FUNCTION update_user_lifescore(user_id UUID, impact_value INTEGER)
RETURNS VOID AS $$
DECLARE
    current_score INTEGER;
    new_score INTEGER;
BEGIN
    -- Get current LifeScore
    SELECT lifescore INTO current_score 
    FROM user_profiles 
    WHERE id = user_id;
    
    -- If no current score, start at 500 (middle of 0-1000 range)
    IF current_score IS NULL THEN
        current_score := 500;
    END IF;
    
    -- Calculate new score
    new_score := current_score + impact_value;
    
    -- Ensure score stays within 0-1000 range
    new_score := GREATEST(0, LEAST(1000, new_score));
    
    -- Update user profile
    UPDATE user_profiles 
    SET lifescore = new_score,
        updated_at = NOW()
    WHERE id = user_id;
    
    -- Insert into LifeScore history
    INSERT INTO lifescore_history (user_id, score, change_amount, recorded_at)
    VALUES (user_id, new_score, impact_value, NOW());
END;
$$ LANGUAGE plpgsql;

-- Function to calculate weekly LifeScore average
CREATE OR REPLACE FUNCTION get_weekly_lifescore_average(user_id UUID)
RETURNS DECIMAL AS $$
DECLARE
    avg_score DECIMAL;
BEGIN
    SELECT AVG(score) INTO avg_score
    FROM lifescore_history
    WHERE user_id = get_weekly_lifescore_average.user_id
    AND recorded_at >= NOW() - INTERVAL '7 days';
    
    RETURN COALESCE(avg_score, 500);
END;
$$ LANGUAGE plpgsql;

-- Function to get LifeScore trend (positive/negative/stable)
CREATE OR REPLACE FUNCTION get_lifescore_trend(user_id UUID)
RETURNS TEXT AS $$
DECLARE
    recent_avg DECIMAL;
    previous_avg DECIMAL;
    trend TEXT;
BEGIN
    -- Get average for last 3 days
    SELECT AVG(score) INTO recent_avg
    FROM lifescore_history
    WHERE user_id = get_lifescore_trend.user_id
    AND recorded_at >= NOW() - INTERVAL '3 days';
    
    -- Get average for previous 3 days (4-7 days ago)
    SELECT AVG(score) INTO previous_avg
    FROM lifescore_history
    WHERE user_id = get_lifescore_trend.user_id
    AND recorded_at >= NOW() - INTERVAL '7 days'
    AND recorded_at < NOW() - INTERVAL '3 days';
    
    -- Determine trend
    IF recent_avg IS NULL OR previous_avg IS NULL THEN
        trend := 'stable';
    ELSIF recent_avg > previous_avg + 10 THEN
        trend := 'improving';
    ELSIF recent_avg < previous_avg - 10 THEN
        trend := 'declining';
    ELSE
        trend := 'stable';
    END IF;
    
    RETURN trend;
END;
$$ LANGUAGE plpgsql;
