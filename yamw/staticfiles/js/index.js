document.addEventListener("DOMContentLoaded", () => {
    const photos = [
        "/media/photo_5199570984762473891_y.jpg",
        "/media/photo_5199570984762473892_y.jpg",
        "/media/photo_5199570984762473893_y.jpg",
        "/media/photo_5199570984762473894_y.jpg",
        "/media/photo_5199570984762473895_y.jpg",
        "/media/photo_5199570984762473896_y.jpg",
        "/media/photo_5199570984762473897_y.jpg",
    
    ];

     const container = document.createElement("div");
    container.classList.add("photo-container");
    document.body.appendChild(container);

    const maxPhotos = 7;

    function createFlyingPhoto() {
        const img = document.createElement("img");
        img.src = photos[Math.floor(Math.random() * photos.length)];
        img.classList.add("photo");

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // начальное положение
        // начальное положение с отступом от краёв
        const margin = 300;
        const startX = margin + Math.random() * (viewportWidth - 300 - margin * 2);
        const startY = margin + Math.random() * (viewportHeight - 300 - margin * 2);
        img.style.left = `${startX}px`;
        img.style.top = `${startY}px`;
        img.style.opacity = "1";
        container.appendChild(img);


        // случайное направление
        let dx = (Math.random() - 0.5) * 2.5; 
        let dy = (Math.random() - 0.5) * 2.5; 
        let rotation = Math.random() * 360;

        function move() {
            let x = parseFloat(img.style.left);
            let y = parseFloat(img.style.top);

            x += dx;
            y += dy;
            rotation += 0.3;

            // отражение от краёв экрана
            if (x <= 0 || x >= viewportWidth - 300) dx *= -1;
            if (y <= 0 || y >= viewportHeight - 300) dy *= -1;

            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
            img.style.transform = `rotate(${rotation}deg)`;

            requestAnimationFrame(move);
        }

        move();
    }

    // запуск всех фото
    for (let i = 0; i < maxPhotos; i++) {
        setTimeout(createFlyingPhoto, i * 800);
    }

    // 💖 сердечки
    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (6 + Math.random() * 4) + "s";
        heart.style.opacity = Math.random();
        heart.style.transform = `scale(${0.8 + Math.random() * 0.6}) rotate(45deg)`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }

    setInterval(createHeart, 800);
});

container.appendChild(img);

// ⏳ ждём кадр перед запуском движения
requestAnimationFrame(() => {
    img.style.opacity = "1";
    img.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`;
});
