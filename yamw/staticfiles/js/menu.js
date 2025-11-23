document.addEventListener('DOMContentLoaded', () => {
  const mainPhotos = [
    {
      src: '/yamw/media/photo_5199570984762473891_y.jpg',
      related: [
        'media/photo_5199570984762473891_y_1.jpg',
        'media/photo_5199570984762473891_y_2.jpg'
      ],
      desc: 'Описание первой картинки'
    },
    {
      src: 'media/photo_5199570984762473892_y.jpg',
      related: [
        'media/photo_5199570984762473892_y_1.jpg'
      ],
      desc: 'Описание второй картинки'
    },
    {
      src: 'media/photo_5199570984762473893_y.jpg',
      related: [
        'media/photo_5199570984762473893_y_1.jpg'
      ],
      desc: 'Описание третьей картинки'
    },
    {
      src: 'media/photo_5199570984762473894_y.jpg',
      related: [],
      desc: 'Описание четвёртой картинки'
    },
    {
      src: 'media/photo_5199570984762473895_y.jpg',
      related: [],
      desc: 'Описание пятой картинки'
    },
    {
      src: 'media/photo_5199570984762473896_y.jpg',
      related: [],
      desc: 'Описание шестой картинки'
    },
    {
      src: 'media/photo_5199570984762473897_y.jpg',
      related: [],
      desc: 'Описание седьмой картинки'
    }
  ];

  const appRoot = document.getElementById('app-root');
  const smileBtn = document.getElementById('smileBtn');

  smileBtn.addEventListener('click', () => openGallery(0));

  function clearRoot() { appRoot.innerHTML = ''; }

  function openGallery(startIndex = 0) {
    clearRoot();
    const view = createEl('div', 'view');
    const gallery = createEl('div', 'gallery');

    const bigWrap = createEl('div', 'folder-big');
    const bigImg = createEl('img');
    bigImg.src = mainPhotos[startIndex].src;
    bigWrap.appendChild(bigImg);

    const desc = createEl('p');
    desc.textContent = mainPhotos[startIndex].desc;
    desc.style.textAlign = 'center';
    desc.style.fontSize = '18px';
    desc.style.color = '#444';
    desc.style.marginTop = '10px';

    const relatedWrap = createEl('div', 'folder-related');
    renderRelated(startIndex, relatedWrap, bigImg);

    const thumbs = createEl('div', 'folder-thumbs');
    mainPhotos.forEach((ph, i) => {
      const t = createEl('img', 'thumb');
      t.src = ph.src;
      t.addEventListener('click', () => showPhoto(i));
      thumbs.appendChild(t);
    });

    let currentIndex = startIndex;
    function showPhoto(idx) {
      currentIndex = (idx + mainPhotos.length) % mainPhotos.length;
      bigImg.src = mainPhotos[currentIndex].src;
      desc.textContent = mainPhotos[currentIndex].desc;
      renderRelated(currentIndex, relatedWrap, bigImg);
    }

    enableSwipe(bigImg, () => showPhoto(currentIndex + 1), () => showPhoto(currentIndex - 1));

    const back = createEl('button', 'back-btn');
    back.textContent = 'Назад';
    back.addEventListener('click', () => location.reload());

    gallery.appendChild(bigWrap);
    gallery.appendChild(desc);
    gallery.appendChild(relatedWrap);
    gallery.appendChild(thumbs);
    view.appendChild(back);
    view.appendChild(gallery);
    appRoot.appendChild(view);
  }

  function createEl(tag, cls = '') {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function renderRelated(index, container, bigImg) {
    container.innerHTML = '';
    const related = mainPhotos[index].related;
    related.forEach(src => {
      const r = createEl('img', 'thumb');
      r.src = src;
      r.addEventListener('click', () => { bigImg.src = src; });
      container.appendChild(r);
    });
  }

  function enableSwipe(img, onNext, onPrev) {
    let sx = 0;
    img.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
    img.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) dx < 0 ? onNext() : onPrev();
    }, { passive: true });
  }

  mainPhotos.forEach(ph => {
    new Image().src = ph.src;
    ph.related.forEach(r => new Image().src = r);
  });
});
