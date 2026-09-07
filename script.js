const gallery = document.querySelector('#gallery');
function stars(rating) { return '★'.repeat(rating) + '<span style="opacity:.25">' + '★'.repeat(5 - rating) + '</span>'; }
const sorted = collections.map(function (collection, index) { return { collection: collection, index: index }; }).sort(function (a, b) { return b.collection.rating - a.collection.rating; });
gallery.innerHTML = sorted.map(function (item) {
  const collection = item.collection;
  const cover = collection.cover || collection.photos[0].img;
  return '<a class="piece" href="collection.html?id=' + item.index + '" aria-label="查看分輯：' + collection.title + '"><div class="piece-image"><img src="' + cover + '" alt="' + collection.title + ' 的封面照片" loading="lazy"></div><div class="piece-info"><div><p class="piece-title">' + collection.title + '</p><p class="piece-meta">' + collection.meta + '</p></div><div><p class="collection-rating">本輯評分</p><div class="stars" aria-label="本輯 ' + collection.rating + ' 星">' + stars(collection.rating) + '</div></div></div></a>';
}).join('');
