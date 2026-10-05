const { chromium } = require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173';
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try{
const context=await browser.newContext({viewport:{width:390,height:844},timezoneId:'Asia/Tokyo',reducedMotion:'reduce'});
await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
const page=await context.newPage();
page.on('pageerror',e=>console.error(e));
for(const width of [320,390,768,1024,1440]){
await page.setViewportSize({width,height:1000});
await page.goto(base+'/?month=2026-10&view='+ (width<640?'list':'calendar'),{waitUntil:'domcontentloaded'});
await page.screenshot({path:'/private/tmp/otaru-everyday-top-'+width+'.png'});
await page.locator('#calendar').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
await page.screenshot({path:'/private/tmp/otaru-everyday-calendar-'+width+'.png'});
await page.locator('#monthlyPanel').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
await page.screenshot({path:'/private/tmp/otaru-everyday-list-'+width+'.png'});
}
await page.setViewportSize({width:390,height:844});
await page.goto(base+'/events/akindo-lab-20261021/',{waitUntil:'domcontentloaded'});
await page.screenshot({path:'/private/tmp/otaru-everyday-detail.png',fullPage:true});
await page.goto(base+'/privacy/',{waitUntil:'domcontentloaded'});
await page.screenshot({path:'/private/tmp/otaru-everyday-privacy.png',fullPage:true});
console.log('Captured mobile and desktop top/calendar/list, event details, privacy.');
}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
