const index = Number(new URLSearchParams(window.location.search).get('id'));
const collection = collections[index];
const page = document.querySelector('#collectionPage');
document.title = collection ? `${collection.title}｜Uniform Archive` : 'Uniform Archive｜校服攝影作品集';
const brand = document.querySelector('.brand');
if (brand) { brand.setAttribute('aria-label', 'Uniform Archive 首頁'); brand.innerHTML = '<span class="brand-mark">UA</span><span>UNIFORM<br>ARCHIVE</span>'; }
if (!collection) { page.innerHTML = '<a class="back-link" href="index.html">← 返回作品分輯</a><h1 class="collection-title">找不到此分輯</h1>'; } else {
  const starMarkup = '★'.repeat(collection.rating) + `<span style="opacity:.25">${'★'.repeat(5 - collection.rating)}</span>`;
  page.innerHTML = `<a class="back-link" href="index.html#collections">← 返回所有分輯</a><section class="collection-header"><div><h1 class="collection-title">${collection.title}</h1><p class="collection-meta">${collection.meta}</p></div><div class="collection-score"><p>本輯評分</p><div class="stars" aria-label="本輯 ${collection.rating} 星">${starMarkup}</div></div></section><div class="photo-grid">${collection.photos.map((photo, photoIndex) => `<figure class="collection-photo"><button class="photo-trigger" type="button" data-photo="${photoIndex}"><img src="${photo.img}" alt="${photo.title}"></button><figcaption>${String(photoIndex + 1).padStart(2, '0')} / ${photo.title}</figcaption></figure>`).join('')}</div><dialog class="image-dialog" id="imageDialog"><button class="dialog-close" type="button" aria-label="關閉原圖預覽">×</button><img id="dialogImage" alt=""><div class="dialog-footer"><span id="dialogCaption"></span><a id="originalLink" target="_blank" rel="noopener">開啟原始大小 ↗</a></div></dialog>`;
  const dialog = document.querySelector('#imageDialog');
  document.querySelectorAll('.photo-trigger').forEach(button => button.addEventListener('click', () => { const photo = collection.photos[Number(button.dataset.photo)]; document.querySelector('#dialogImage').src = photo.img; document.querySelector('#dialogImage').alt = photo.title; document.querySelector('#dialogCaption').textContent = photo.title; document.querySelector('#originalLink').href = photo.img; dialog.showModal(); }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
