import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { BASE_ACTIVITIES, CATALOG_VERSION } from '../../public/vitalab3/src/catalog.mjs';
const q=x=>`'${String(x).replace(/'/g,"''")}'`;
const out=['-- Generated from src/catalog.mjs. Run only after 001_vitalab_v3_schema.sql.',`-- ${BASE_ACTIVITIES.length} authoritative base weights; catalog ${CATALOG_VERSION}.`];
for(const b of BASE_ACTIVITIES){out.push(`INSERT INTO public.v3_activity_weights(id,title,category,domain,base_impact,reference_minutes,catalog_version) VALUES(${[b.id,b.name,b.category,b.domain].map(q).join(',')},${b.baseImpact},${b.referenceMinutes},${q(CATALOG_VERSION)}) ON CONFLICT (id) DO UPDATE SET title=excluded.title,category=excluded.category,domain=excluded.domain,base_impact=excluded.base_impact,reference_minutes=excluded.reference_minutes,catalog_version=excluded.catalog_version;`);}
const file=join(dirname(fileURLToPath(import.meta.url)),'002_vitalab_v3_weights.sql');
await writeFile(file,out.join('\n')+'\n');
console.log(`Wrote ${BASE_ACTIVITIES.length} base weights to ${file}`);