const fs=require('fs');  
const p='src/components/Booking_Counter/KioskBooking.js';  
let t=fs.readFileSync(p,'utf8');  
console.log('before-clear', t.split('className: \" "clear\').length-1,'before-confirm', t.split('className: \confirm\').length-1);  ; echo t=t.replace(/className: \clear\/g, 'className: \btn-clear\').replace(/className: \confirm\/g,'className: \btn-confirm\');  ; echo console.log('after-clear', t.split('className: \btn-clear\').length-1, 'after-confirm', t.split('className: \btn-confirm\').length-1);  ; echo fs.writeFileSync(p,t,'utf8');  ; node tmp_replace.js ; del tmp_replace.js
