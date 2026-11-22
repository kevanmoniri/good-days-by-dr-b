const everydayGuides = {
  "care": [
    [
      "Take a caregiving break",
      "caregiver-break.html"
    ]
  ],
  "home": [
    [
      "Arrange a ride",
      "rides.html"
    ],
    [
      "Get help with daily tasks",
      "help-at-home.html"
    ]
  ],
  "food": [
    [
      "Get meals delivered",
      "meal-delivery.html"
    ]
  ],
  "supplements": [
    [
      "Check a supplement",
      "supplement-review.html"
    ]
  ]
};
const topics=[
['Caregiver support','Guidance and support for people caring for a loved one.','#e9eddc','People & care','care',[
['Getting started with caregiving','National Institute on Aging','Work out which tasks need help and how family, friends, and local services can share the work.','https://www.nia.nih.gov/health/caregiving/getting-started-caregiving'],
['Caregiver questions, answered','National Institute on Aging','Find answers about respite care, paying for help, and finding a support group.','https://www.nia.nih.gov/health/caregiving/frequently-asked-questions-about-caregiving']]],
['Help at home','Services and tools for a safer, more comfortable home.','#f2e8db','Home & comfort','home',[
['Find in-home help','Eldercare Locator','Search by city or ZIP code to ask about personal care, transportation, or help with chores.','https://eldercare.acl.gov/home'],
['Planning for care at home','National Institute on Aging','Review options for day-to-day care and where to ask about home safety improvements.','https://www.nia.nih.gov/health/caregiving/frequently-asked-questions-about-caregiving']]],
['Food & nutrition','Meal programs and everyday help with eating well.','#f2edce','Food & meals','food',[
['Find a meal program','Eldercare Locator','Ask your local aging agency about home-delivered meals, group lunches, eligibility, and costs.','https://eldercare.acl.gov/home'],
['A guide to community meals (PDF)','USAging','Learn how meal programs work and what to ask when looking for one near you.','https://www.usaging.org/Files/Nutrition%202026_Consumer%20Fact%20Sheet_English_508_FINAL.pdf']]],
['Supplements','Clear information on vitamins, minerals, and supplements.','#e9e5ef','Vitamins & minerals','supplements',[
['Look up a vitamin or supplement','NIH Office of Dietary Supplements','Choose a consumer fact sheet to read about benefits, side effects, and interactions.','https://ods.od.nih.gov/factsheets/list-all/'],
['Supplements for older adults','National Institute on Aging','Prepare questions for your pharmacist or clinician before adding a supplement to your routine.','https://www.nia.nih.gov/health/dietary-supplements']]]];
const cards=document.querySelector('#cards'),guide=document.querySelector('#guide');
topics.forEach(([title,desc,color,label,id],i)=>{const a=document.createElement('a');a.href='#'+id;a.className='card';a.style.setProperty('--bg',color);a.innerHTML='<canvas class="art" aria-hidden="true"></canvas><h3>'+title+'</h3><p>'+desc+'</p><span class="topiclink">Explore resources</span>';cards.append(a)});
function route(){const t=topics.find(t=>'#'+t[4]===location.hash);if(!t){if(guide.open)guide.close();return}document.querySelector('#title').textContent=t[0];guide.setAttribute('aria-labelledby','title');document.querySelector('#intro').textContent=t[1];document.querySelector('#entries').innerHTML=t[5].map(([title,org,desc,url])=>'<div class="entry"><small>'+org+'</small><br><a href="'+url+'">'+title+'</a><p>'+desc+'</p></div>').join('');const related=document.createElement('div');related.className='entry';related.innerHTML='<strong>Step-by-step guides</strong>'+everydayGuides[t[4]].map(([title,url])=>'<a class="related" href="'+url+'">'+title+'</a>').join('');document.querySelector('#entries').prepend(related);if(!guide.open)guide.showModal()}
addEventListener('hashchange',route);route();document.querySelector('#close').onclick=()=>guide.close();guide.addEventListener('close',()=>{const a=[...cards.children].find(a=>a.hash===location.hash);if(a){history.replaceState(null,'','#topics');a.focus()}});