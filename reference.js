'use strict';
// Presentation adapters reuse the original data and actions. No auth or database changes.
const originalStoryRenderer=renderStory;
renderStory=function(){originalStoryRenderer();const target=$('#homeTimeline');if(target)target.innerHTML=$('#timeline').innerHTML;};
const originalNoticeRenderer=renderNotices;
renderNotices=function(){
 originalNoticeRenderer();
 const card=(n,i)=>`<article class="reference-notice-card"><div class="notice-image"><img src="assets/images/${['group-formal.jpg','football-team.jpg','selfie-group.jpg'][i%3]}" alt="" loading="lazy"><span>${t('OFFICIAL NOTICE','অফিসিয়াল নোটিশ')}</span></div><div class="notice-copy"><small>${n.created_at?esc(new Date(n.created_at).toLocaleDateString(lang==='bn'?'bn-BD':'en-GB',{day:'numeric',month:'long',year:'numeric'})):t('Udbhoron ’19','উদ্ভোরণ ’১৯')}</small><h3>${esc(t(n.title,n.title_bn||n.title))}</h3><p>${esc(t(n.body,n.body_bn||n.body))}</p></div></article>`;
 const empty=`<div class="empty"><strong>${t('No notices published yet.','এখনো কোনো নোটিশ প্রকাশিত হয়নি।')}</strong>${t('Official updates will appear here after publication.','প্রকাশের পর অফিসিয়াল আপডেট এখানে দেখা যাবে।')}</div>`;
 $('#notices').innerHTML=notices.length?notices.map(card).join(''):empty;
 $('#homeNotices').innerHTML=notices.length?notices.slice(0,2).map(card).join(''):empty;
};
renderGallery=function(){
 galleryTab='All';$('#galleryTabs').innerHTML='';$('#galleryTabs').hidden=true;
 $('#galleryGrid').innerHTML=gallery.length?gallery.map(g=>`<button class="gallery-item photo-only" data-photo="${esc(g.id)}" aria-label="${esc(g.title||t('Open photo','ছবি বড় করে দেখুন'))}"><img src="${esc(imageURL(g.image_url))}" alt="${esc(g.title||t('Udbhoron ’19 photo','উদ্ভোরণ ’১৯-এর ছবি'))}" loading="lazy"></button>`).join(''):`<div class="empty">${t('No photos yet.','এখনো ছবি নেই।')}</div>`;
};
// Keep existing links and bookmarks working while accepting the reference filenames.
const referenceAliases={'index.html':'home','about.html':'story','activities.html':'activities','memories.html':'gallery','notice.html':'notices','contact.html':'contact'};
for(const [filename,view] of Object.entries(referenceAliases)){if(location.pathname.endsWith('/'+filename)&&!location.hash)location.hash=view;}
renderStory();renderNotices();renderGallery();

// Activities page follows the owner-supplied reference exactly.
const activitiesSocialCards="<article class=\"info-card\"><img src=\"assets/images/relief-packing.jpg\" alt=\"করোনাকালীন সহায়তা\" loading=\"lazy\"><div class=\"body\"><div class=\"eyebrow\">COVID-19 RELIEF</div><h3  data-en=\"COVID-19 relief\" data-bn=\"করোনাকালীন সহায়তা\">করোনাকালীন সহায়তা</h3><p  data-en=\"In 2020, when the coronavirus pandemic struck, Batch 2019 was the first to extend a helping hand to vulnerable people in Mehendiganj through relief collection and distribution.\" data-bn=\"২০২০ সালে দেশে করোনা মহামারী দেখা দিলে ত্রাণ সংগ্রহ ও বিতরণের মাধ্যমে মেহেন্দিগঞ্জে অসহায় মানুষের পাশে সর্বপ্রথম সাহায্যের হাত বাড়িয়ে দেয় ১৯ ব্যাচ\">২০২০ সালে দেশে করোনা মহামারী দেখা দিলে ত্রাণ সংগ্রহ ও বিতরণের মাধ্যমে মেহেন্দিগঞ্জে অসহায় মানুষের পাশে সর্বপ্রথম সাহায্যের হাত বাড়িয়ে দেয় ১৯ ব্যাচ</p></div></article><article class=\"info-card\"><img src=\"assets/images/iftar-orphan-1.jpg\" alt=\"ইফতার মাহফিল\" loading=\"lazy\"><div class=\"body\"><div class=\"eyebrow\">IFTAR MAHFIL</div><h3  data-en=\"Iftar Mahfil\" data-bn=\"ইফতার মাহফিল\">ইফতার মাহফিল</h3><p  data-en=\"Every year, an Iftar gathering is arranged for orphan students at a local madrasa.\" data-bn=\"প্রতি বছর স্থানীয় মাদ্রাসার এতিম শিক্ষার্থীদের জন্য ইফতার মাহফিল আয়োজন করা হয়\">প্রতি বছর স্থানীয় মাদ্রাসার এতিম শিক্ষার্থীদের জন্য ইফতার মাহফিল আয়োজন করা হয়</p></div></article><article class=\"info-card\"><img src=\"assets/images/fest-award.jpg\" alt=\"শিক্ষার্থীদের পাশে ১৯\" loading=\"lazy\"><div class=\"body\"><div class=\"eyebrow\">STUDENT SUPPORT</div><h3  data-en=\"Supporting students — ’19\" data-bn=\"শিক্ষার্থীদের পাশে ১৯\">শিক্ষার্থীদের পাশে ১৯</h3><p  data-en=\"Mehendiganj Student Society (MSS) was founded in 2022 through Udbhoron ’19. Our batch also supports financially disadvantaged students in various ways whenever needed.\" data-bn=\"২০২২ সালে উদ্ভোরণ ’১৯-এর হাত ধরে প্রতিষ্ঠিত হয় মেহেন্দিগঞ্জ স্টুডেন্ট সোসাইটি (MSS)। এছাড়াও বিভিন্ন সময়ে আর্থিকভাবে অসচ্ছল শিক্ষার্থীদের আমাদের ব্যাচের পক্ষ থেকে বিভিন্নভাবে সহযোগিতা করা হয়।\">২০২২ সালে উদ্ভোরণ ’১৯-এর হাত ধরে প্রতিষ্ঠিত হয় মেহেন্দিগঞ্জ স্টুডেন্ট সোসাইটি (MSS)। এছাড়াও বিভিন্ন সময়ে আর্থিকভাবে অসচ্ছল শিক্ষার্থীদের আমাদের ব্যাচের পক্ষ থেকে বিভিন্নভাবে সহযোগিতা করা হয়।</p></div></article>";
renderServices=function(){const target=$("#services");target.innerHTML=activitiesSocialCards;for(const el of target.querySelectorAll("[data-en]"))el.innerHTML=el.dataset[lang];};
renderServices();
for(const el of document.querySelectorAll(".activity-layout [data-en]"))el.innerHTML=el.dataset[lang];

// Extend the site's existing scroll reveals to both presentation pages.
const originalObserveReveal=observeReveal;
const activityRevealSelector='.activity-layout .page-hero-content,.activity-layout .info-card,.activity-layout .mss-highlight,.activity-layout .sports-feature-media,.activity-layout .sports-feature-copy,.activity-layout .give-media,.activity-layout .give-text';
observeReveal=function(){
 originalObserveReveal();
 for(const el of document.querySelectorAll(activityRevealSelector)){
  if(el.closest('[data-page]').hidden)continue;
  el.classList.add('reveal');
  if(reduceMotion.matches||!revealObserver)el.classList.add('in');
  else revealObserver.observe(el);
 }
 for(const [i,el] of [...document.querySelectorAll('.activity-layout .info-card,#galleryGrid .gallery-item')].entries())el.style.transitionDelay=`${(i%3)*75}ms`;
};
window.addEventListener('hashchange',()=>{
 for(const el of document.querySelectorAll('.activity-layout .reveal,[data-page="gallery"] .reveal'))el.classList.remove('in');
 observeReveal();
});
observeReveal();
