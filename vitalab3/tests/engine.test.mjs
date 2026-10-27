import test from 'node:test';
import assert from 'node:assert/strict';
import { BASELINE, assessImpact, scoreTimeline, trendSeries, domainSignals, insights, streak, goalProgress } from '../../public/vitalab3/src/engine.mjs';
import { ACTIVITIES, BASE_ACTIVITIES, getBaseById, getActivityById, searchActivities, suggestActivity } from '../../public/vitalab3/src/catalog.mjs';
import { normalizeState, exportData, importData, toCSV, emptyState } from '../../public/vitalab3/src/storage.mjs';
const base=ACTIVITIES.find(a=>a.baseId==='went-for-a-walk');
const now=new Date('2026-10-28T10:00:00+08:00');
const record=(id,impact,at='2026-10-28T09:00:00+08:00',baseId=id,domain='body')=>({id,baseId,domain,loggedAt:at,impact});
test('catalog has over 10,000 unique selectable variants and curated bases',()=>{
 assert.ok(ACTIVITIES.length>10000);
 assert.ok(BASE_ACTIVITIES.length>500);
 assert.equal(new Set(ACTIVITIES.map(a=>a.id)).size, ACTIVITIES.length);
 assert.ok(ACTIVITIES.every(a=>Number.isInteger(a.baseImpact) && a.baseImpact>=-12 && a.baseImpact<=12));
 assert.ok(ACTIVITIES.every(a=>getBaseById(a.baseId)));
});
test('search returns varied base activities and recognises colloquial terms',()=>{
 assert.ok(searchActivities('walking').length>5);
 assert.ok(new Set(searchActivities('walking').map(a=>a.baseId)).size>5);
 assert.ok(suggestActivity('went to the gym today').some(a=>a.title==='Strength training'));
 assert.ok(suggestActivity('smoked a durry').some(a=>a.title==='Smoking a cigarette'));
});
test('impact is deterministic and bounded',()=>{
 const a=assessImpact(base,{duration:30,intensity:5});
 assert.deepEqual(a,assessImpact(base,{duration:30,intensity:5}));
 assert.equal(a.impact,8);
 assert.ok(assessImpact(base,{duration:1440,intensity:10}).impact<=24);
 assert.throws(()=>assessImpact({}),/known activity/);
});
test('unlogged day starts at neutral baseline and cannot be penalised',()=>{
 assert.equal(scoreTimeline([],now).score,BASELINE);
});
test('positive and negative events move score in opposing directions',()=>{
 assert.ok(scoreTimeline([record('x',10)],now).score>BASELINE);
 assert.ok(scoreTimeline([record('x',-10)],now).score<BASELINE);
});
test('duplicate activity logging has diminishing returns',()=>{
 const first=scoreTimeline([record('x',12)],now).delta;
 const twice=scoreTimeline([record('x',12),record('y',12,undefined,'x')],now).delta;
 assert.ok(twice>first);
 assert.ok(twice<first*2);
});
test('caps bound the score regardless of thousands of same-day events',()=>{
 const logs=Array.from({length:2000},(_,i)=>record(String(i),24,undefined,String(i)));
 const score=scoreTimeline(logs,now);
 assert.ok(score.score<=566 && score.score>=500,`unexpected ${score.score}`);
});
test('older activity matters less than recent activity',()=>{
 const old=scoreTimeline([record('a',20,'2026-10-09T09:00:00+08:00')],now).delta;
 const recent=scoreTimeline([record('b',20)],now).delta;
 assert.ok(recent>old);
});
test('future-dated records do not influence current score',()=>{
 assert.equal(scoreTimeline([record('f',24,'2026-11-01T09:00:00+08:00')],now).score,500);
});
test('trend series has requested length and ends with current score',()=>{
 const logs=[record('a',10)];const trend=trendSeries(logs,14,now);
 assert.equal(trend.length,14);
 const end=new Date(now);end.setHours(23,59,59,999);assert.equal(trend.at(-1).score,scoreTimeline(logs,end).score);
});
test('domains, goals and streaks derive from input records',()=>{
 const logs=[record('a',10),record('b',-3,'2026-10-27T09:00:00+08:00','b','mind')];
 assert.equal(domainSignals(logs,14,now).find(d=>d.id==='body').count,1);
 assert.equal(goalProgress({domain:'body',target:3},logs,now).completed,1);
 assert.equal(streak(logs,now),2);
});
test('insights do not invent predictions or medical diagnosis',()=>{
 const data=insights([],[],now);assert.ok(data[0].body.includes('No score movement'));
 const other=insights([record('a',10)],[],now);assert.ok(other.every(x=>!x.body.toLowerCase().includes('diagnosis')));
});
test('export-import round trip and CSV escaping preserve data',()=>{
 const s=emptyState();s.profile.onboarded=true;s.logs.push({id:'x',title:'A "quoted" activity',loggedAt:'2026-10-28T00:00:00Z',impact:4,notes:'one,two'});
 assert.deepEqual(importData(exportData(s)),normalizeState(s));
 assert.ok(toCSV(s.logs).includes('"A ""quoted"" activity"'));
 assert.throws(()=>importData('{"version":1}'),/Not a VitaLab/);
});