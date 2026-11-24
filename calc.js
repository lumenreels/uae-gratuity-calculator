// UAE private-sector end-of-service gratuity (Federal Decree-Law 33/2021, as described on u.ae)
function addYears(d,n){var r=new Date(Date.UTC(d.getUTCFullYear()+n,d.getUTCMonth(),d.getUTCDate()));return r}
function gratuity(basic,startStr,endStr,unpaidDays){
  var DAY=864e5, s=new Date(startStr+'T00:00:00Z'), e=new Date(endStr+'T00:00:00Z');
  unpaidDays=unpaidDays||0;
  if(!(basic>0)||isNaN(s)||isNaN(e)||e<s) return {error:true};
  // inclusive end date, minus unpaid absence days
  var eff=new Date(e.getTime()+DAY-unpaidDays*DAY);
  if(eff<=s) return {years:0,days:0,amount:0,capped:false,eligible:false};
  var y=0; while(addYears(s,y+1)<=eff) y++;
  var a=addYears(s,y), b=addYears(s,y+1);
  var years=y+(eff-a)/(b-a);
  if(y<1) return {years:years,days:0,amount:0,capped:false,eligible:false};
  var days=Math.min(years,5)*21+Math.max(years-5,0)*30;
  var amount=days*basic/30, cap=basic*24, capped=amount>cap;
  return {years:years,days:days,amount:capped?cap:amount,capped:capped,eligible:true};
}
if(typeof module!=='undefined') module.exports={gratuity:gratuity};
