const correct=

localStorage

.getItem(

'correct'

);

const incorrect=

localStorage

.getItem(

'incorrect'

);

document

.getElementById(

'correct'

)

.innerHTML=

"Correct : "+correct;

document

.getElementById(

'incorrect'

)

.innerHTML=

"Incorrect : "+incorrect;

const total=

parseInt(correct)+

parseInt(

incorrect

);

const score=

(correct/total)

*100;

document

.getElementById(

'score'

)

.innerHTML=

"Score : "

+

score

.toFixed(2)

+

"%";

const times=

JSON.parse(

localStorage

.getItem(

'times'

)

);

times.sort(

(a,b)=>

b.time-a.time

);

document

.getElementById(

'max'

)

.innerHTML=

"Question "

+

times[0].question

+

" ("

+

times[0].time

+

"s)";

times.sort(

(a,b)=>

a.time-b.time

);

document

.getElementById(

'min'

)

.innerHTML=

"Question "

+

times[0].question

+

" ("

+

times[0].time

+

"s)";

document.getElementById("retake").onclick = function () {
  window.location.href = "index.html";
};
