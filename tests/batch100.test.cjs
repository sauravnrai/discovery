const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),ctx={window:{}};vm.runInNewContext(html.match(/<script id="discovery-engine">([\s\S]*?)<\/script>/)[1],ctx);const D=ctx.window.Discovery;let count=0;function test(n,f){f();count++;console.log('PASS',n);}
for(const [name,score]of [['explore',49],['quality',74],['visualize',93]])test(name+' worked example',()=>assert.equal(D.assess(D.examples[name]).score,score));
test('weights unchanged and sum to 100',()=>assert.equal(D.assess(D.examples.quality).answers.reduce((s,a)=>s+a.weight,0),100));
test('context changes plan not score',()=>{const a=D.assess(D.examples.quality),b=D.assess({...D.examples.quality,audience:'stakeholders',timing:'today'});assert.equal(a.score,b.score);assert.notEqual(a.plan.join(),b.plan.join());});
test('permission gate overrides high score',()=>{const r=D.assess({...D.examples.visualize,safety:'unapproved'});assert.equal(r.score,93);assert.match(r.safetyNote,/synthetic data only/);});
test('low access gate',()=>assert.match(D.assess({...D.examples.quality,access:'1'}).safetyNote,/synthetic data only/));
test('context validation',()=>{for(const k of ['format','audience','timing','safety'])assert.throws(()=>D.assess({...D.examples.quality,[k]:'__proto__'}));});
test('weighted gap matches contribution',()=>D.assess(D.examples.explore).answers.forEach(a=>assert.equal(a.gap+a.points,a.weight)));
test('largest gap insight is explainable',()=>assert.match(D.assess(D.examples.explore).insight,/Data quality.*18.75/));
test('complete report includes context and plan',()=>{const r=D.assess(D.examples.visualize);for(const text of [...r.plan,r.insight,r.safetyNote,...Object.values(r.context)])assert.ok(r.report.includes(text));});
test('unicode and punctuation preserved in both drafts',()=>{const r=D.assess({...D.examples.quality,project:'A&B + # Unicode café'}),d=D.drafts(r);for(const url of Object.values(d))assert.equal(new URL(url).searchParams.get('body'),r.report);assert.equal(new URL(d.mail).pathname,'commercial@ziontechgroup.com');});
test('project bounded and treated as text',()=>assert.equal(D.assess({...D.examples.quality,project:'x'.repeat(100)}).project.length,60));
test('ten required choices and no email gate',()=>{assert.equal((html.match(/<select[^>]* required/g)||[]).length,10);assert.ok(!html.includes('type="email"'));});
test('draft controls explicitly require Send',()=>{assert.ok(html.includes('Send via Gmail — opens draft; click Send'));assert.ok(html.includes('Open in Mail App — draft; click Send'));});
console.log(count+' Batch 100 Discovery checks passed');
