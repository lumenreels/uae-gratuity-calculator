const {gratuity}=require('./calc.js');let f=0;
function eq(n,a,b){const ok=Math.abs(a-b)<0.01;if(!ok)f++;console.log(ok?'PASS':'FAIL',n,a,b)}
// exactly 1 year (anniversary), 21 days
let r=gratuity(3000,'2024-01-01','2024-12-31');eq('1 year = 21 days',r.days,21);eq('1 year amount',r.amount,2100);
// under 1 year
r=gratuity(3000,'2025-01-01','2025-11-30');eq('under 1 year none',r.amount,0);
// exactly 5 years
r=gratuity(6000,'2019-03-10','2024-03-09');eq('5 years = 105 days',r.days,105);eq('5 years amount',r.amount,21000);
// exactly 8 years: 105 + 90 = 195 days
r=gratuity(6000,'2018-01-01','2025-12-31');eq('8 years = 195 days',r.days,195);eq('8 years amount',r.amount,39000);
// leap-year span: 6 years exactly from 2020-01-01 -> 2025-12-31 = 105+30 = 135 days
r=gratuity(6000,'2020-01-01','2025-12-31');eq('6 years leap span',r.days,135);
// cap: 40 years at 1000 -> 105+35*30=1155 days*33.33=38500 > 24000
r=gratuity(1000,'1985-01-01','2024-12-31');eq('cap 2 years wage',r.amount,24000);
// unpaid leave 365 days reduces service from 3 to 2 years
r=gratuity(3000,'2022-01-01','2024-12-31',365);eq('unpaid leave (approx 42, leap day)',Math.round(r.days),42);
console.log(f?f+' FAILED':'ALL PASSED');process.exit(f?1:0)
