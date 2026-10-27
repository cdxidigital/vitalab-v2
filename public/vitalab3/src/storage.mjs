export const STORE_KEY='vitalab.v3.local';
export const emptyState = () => ({ version:3, profile:{name:'',goals:[],onboarded:false,theme:'dark'}, logs:[],checkins:[],goals:[],journal:[],demo:false });
const safe = (v,n=300) => String(v??'').slice(0,n);
export function normalizeState(raw) {
 const d=emptyState();
 if(!raw || typeof raw!=='object')return d;
 return {
  version:3, demo:Boolean(raw.demo),
  profile:{name:safe(raw.profile?.name,70),goals:Array.isArray(raw.profile?.goals)?raw.profile.goals.map(x=>safe(x,80)).slice(0,12):[],onboarded:Boolean(raw.profile?.onboarded),theme:raw.profile?.theme==='light'?'light':'dark'},
  logs:Array.isArray(raw.logs)?raw.logs.slice(-20000).filter(x=>x&&x.id&&x.loggedAt&&x.title&&Number.isFinite(Number(x.impact))).map(x=>({...x,notes:safe(x.notes,1500)})):[],
  checkins:Array.isArray(raw.checkins)?raw.checkins.slice(-1000).filter(x=>x&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)):[],
  goals:Array.isArray(raw.goals)?raw.goals.slice(-200).filter(x=>x&&x.id&&x.title):[],
  journal:Array.isArray(raw.journal)?raw.journal.slice(-1500).filter(x=>x&&x.id&&x.text).map(x=>({...x,text:safe(x.text,4000)})):[],
 };
}
export function loadState(storage=globalThis.localStorage) {
 try{return normalizeState(JSON.parse(storage.getItem(STORE_KEY)||'null'));}catch{return emptyState();}
}
export function saveState(state,storage=globalThis.localStorage) {
 storage.setItem(STORE_KEY,JSON.stringify(normalizeState(state)));
}
export function exportData(state) {return JSON.stringify({...normalizeState(state),exportedAt:new Date().toISOString(),source:'VitaLab 3.0 local export'},null,2);}
export function importData(text) {const data=JSON.parse(text);if(!data || data.version!==3 || !data.profile || !Array.isArray(data.logs))throw Error('Not a VitaLab V3 export');return normalizeState(data);}
export function toCSV(logs=[]) { const headers=['date','activity','domain','duration_minutes','intensity','impact','notes'];const cell=x=>`"${String(x??'').replace(/"/g,'""')}"`;return [headers.map(cell).join(','),...logs.map(l=>[l.loggedAt,l.title,l.domain,l.duration,l.intensity,l.impact,l.notes].map(cell).join(','))].join('\r\n'); }