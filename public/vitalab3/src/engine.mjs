/** VitaLab LifeScore v3.1: deterministic reflection index, not a medical measure. */
export const ENGINE_VERSION = '3.1.0';
export const BASELINE = 500;
export const MIN_SCORE = 0;
export const MAX_SCORE = 1000;
export const HALF_LIFE_DAYS = 10;
export const DOMAINS = [
  { id: 'body', name: 'Physical', color: '#9ee1be' },
  { id: 'rest', name: 'Rest & sleep', color: '#aeaeff' },
  { id: 'mind', name: 'Mental', color: '#e8ba85' },
  { id: 'connection', name: 'Social', color: '#ffa9b2' },
  { id: 'purpose', name: 'Purpose', color: '#e8e49e' },
  { id: 'environment', name: 'Environment', color: '#8ddddd' },
];
export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
export const localDate = (input = new Date()) => {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
export const addDays = (date, n) => { const d = new Date(date); d.setDate(d.getDate()+n); return d; };
export function assessImpact(activity, values = {}) {
  if (!activity || !Number.isFinite(Number(activity.baseImpact))) throw new Error('A known activity is required');
  const duration = clamp(Number(values.duration ?? activity.duration ?? 30), 1, 1440);
  const intensity = clamp(Number(values.intensity ?? activity.intensity ?? 5), 1, 10);
  const base = clamp(Number(activity.baseImpact), -12, 12);
  const reference = Math.max(5, Number(activity.referenceMinutes || 30));
  // Duration saturates, rather than creating unbounded rewards from long entries.
  const durationFactor = clamp(Math.sqrt(duration / reference), 0.55, 1.6);
  const intensityFactor = clamp(0.78 + intensity * 0.048, 0.8, 1.25);
  const raw = base * durationFactor * intensityFactor;
  const impact = Math.sign(raw) * Math.max(Math.abs(base) > 0 ? 1 : 0, Math.round(Math.abs(raw)));
  return { impact, base, durationFactor, intensityFactor, duration, intensity, algorithm: ENGINE_VERSION };
}
export function scoreTimeline(logs = [], now = new Date()) {
  const when = new Date(now);
  const events = [...logs].filter(x => x && x.loggedAt && Number.isFinite(new Date(x.loggedAt).getTime()))
    .filter(x => new Date(x.loggedAt) <= when)
    .sort((a,b) => new Date(a.loggedAt) - new Date(b.loggedAt) || String(a.id).localeCompare(String(b.id)));
  const duplicate = new Map();
  const daily = new Map();
  const items = [];
  for (const log of events) {
    const age = Math.max(0, (when.getTime() - new Date(log.loggedAt).getTime()) / 86400000);
    if (age >= 35) continue;
    const day = localDate(log.loggedAt);
    const key = `${day}:${String(log.baseId || log.activityId || log.title)}`;
    const count = duplicate.get(key) || 0;
    duplicate.set(key, count + 1);
    const raw = clamp(Number(log.impact) || 0, -24, 24);
    const repeated = raw / Math.sqrt(count + 1);
    const prev = daily.get(day) || {positive:0,negative:0};
    // Per-day guards prevent repetitively logging a task to inflate a score.
    const side = repeated >= 0 ? 'positive' : 'negative';
    const available = Math.max(0, 65 - Math.abs(prev[side]));
    const applied = Math.sign(repeated) * Math.min(Math.abs(repeated), available);
    prev[side] += applied;
    daily.set(day, prev);
    const decay = Math.pow(0.5, age / HALF_LIFE_DAYS);
    items.push({ ...log, ageDays:age, repeatFactor:1 / Math.sqrt(count+1), applied, contribution:applied * decay });
  }
  const total = items.reduce((n,e) => n + e.contribution, 0);
  return {
    score:clamp(BASELINE + Math.round(total), MIN_SCORE, MAX_SCORE),
    delta:Math.round(total), baseline:BASELINE, items,
    previous7Days:items.filter(e=>e.ageDays < 7),
  };
}
export function trendSeries(logs=[], days=14, now=new Date()) {
  const end=new Date(now); end.setHours(23,59,59,999);
  return Array.from({length:days}, (_,i)=>{
    const at = addDays(end, i-days+1);
    return {date:localDate(at), score:scoreTimeline(logs,at).score};
  });
}
export function domainSignals(logs=[], days=14, now=new Date()) {
  const oldest=new Date(now).getTime()-days*86400000;
  return DOMAINS.map(domain=>{
    const rows=logs.filter(l=>l.domain===domain.id && new Date(l.loggedAt).getTime()>=oldest);
    const positive=rows.filter(r=>r.impact>0).length;
    const negative=rows.filter(r=>r.impact<0).length;
    return {...domain, count:rows.length, positive, negative, total:rows.reduce((n,l)=>n+Number(l.impact||0),0)};
  });
}
export function streak(logs=[], now=new Date()) {
  const dates=new Set(logs.map(l=>localDate(l.loggedAt)).filter(Boolean));
  let current=0; let day=new Date(now);
  if(!dates.has(localDate(day))) day=addDays(day,-1);
  while(dates.has(localDate(day))){current++;day=addDays(day,-1);if(current>3650)break;}
  return current;
}
export function insights(logs=[],checkins=[],now=new Date()) {
  const result=[];
  const today=localDate(now), latest=logs.filter(l=>new Date(l.loggedAt).getTime()>=new Date(now).getTime()-7*86400000);
  const recentCheckins=[...checkins].sort((a,b)=>b.date.localeCompare(a.date)).filter(c=>c.date>=localDate(addDays(now,-7)));
  const positive=latest.filter(l=>l.impact>0).length, negative=latest.filter(l=>l.impact<0).length;
  if(!logs.length && !checkins.length){
    return [{kind:'welcome',title:'Your story starts here',body:'Record a check-in or activity to begin seeing your own patterns. No score movement is inferred from an empty day.',confidence:'Getting started'}];
  }
  if(!recentCheckins.some(c=>c.date===today)) result.push({kind:'checkin',title:'How are you feeling today?',body:'A short check-in can give your activity data more context. Mood never changes your LifeScore automatically.',confidence:'Suggested next step'});
  if(positive>=3) result.push({kind:'pattern',title:'Positive choices are showing up',body:`You logged ${positive} positive activity signals in the past week. Consistency matters more here than chasing points.`,confidence:'Based on activity logs'});
  if(negative>=3) result.push({kind:'balance',title:'A few habits worth exploring',body:`You logged ${negative} activities with negative weights this week. Explore what preceded them without judging yourself.`,confidence:'Based on activity logs'});
  const sleep = recentCheckins.filter(c=>Number(c.sleepHours)>0);
  if(sleep.length>=3){const avg=sleep.reduce((n,c)=>n+Number(c.sleepHours),0)/sleep.length;result.push({kind:'sleep',title:'Your recent sleep pattern',body:`Your reported sleep averaged ${avg.toFixed(1)} hours across ${sleep.length} check-ins. This is descriptive, not a clinical assessment.`,confidence:'Based on your check-ins'});}
  const both = recentCheckins.filter(c=>Number.isFinite(Number(c.mood)) && Number.isFinite(Number(c.energy)));
  if(both.length>=3){const mood=both.reduce((n,c)=>n+Number(c.mood),0)/both.length;result.push({kind:'mood',title:'Emotional check-in trend',body:`Your average recorded mood was ${mood.toFixed(1)}/5 across ${both.length} check-ins. Feelings are information, never a failing.`,confidence:'Self-reported'});}
  const groups=domainSignals(latest,7,now).sort((a,b)=>b.count-a.count);
  if(groups[0]?.count>=2) result.push({kind:'domain',title:`${groups[0].name} has your attention`,body:`Your most frequently logged area this week is ${groups[0].name.toLowerCase()} (${groups[0].count} entries). Other areas may simply be untracked.`,confidence:'Based on logs'});
  if(!result.length) result.push({kind:'steady',title:'A useful starting picture',body:'Keep tracking what matters to you. As more entries accumulate, VitaLab will surface clearer trends.',confidence:'Early pattern'});
  return result.slice(0,5);
}
export function goalProgress(goal,logs=[],now=new Date()) {
  const start=addDays(now,-7);
  const matches=logs.filter(l=>new Date(l.loggedAt)>=start && l.domain===goal.domain && (goal.baseId ? l.baseId===goal.baseId:true)).length;
  return {completed:matches,target:goal.target||3,percent:clamp(Math.round(matches/(goal.target||3)*100),0,100)};
}