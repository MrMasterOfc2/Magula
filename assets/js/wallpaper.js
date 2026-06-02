// Cinematic homepage wallpaper: cross-fade, preload and subtle pointer parallax.
(function () {
  const wallpaper = document.getElementById("live-wallpaper");
  if (!wallpaper) return;

  const currentLayer = wallpaper.querySelector(".wallpaper-current");
  const nextLayer = wallpaper.querySelector(".wallpaper-next");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const imageMap = {
    1: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85",
    2: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=85",
    3: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2400&q=85",
    4: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=2400&q=85",
    5: "https://images.unsplash.com/photo-1581092160607-ee6e2c4e8d4a?auto=format&fit=crop&w=2400&q=85"
  };
  const images = Object.keys(imageMap);
  let currentIndex = 0;

  Object.values(imageMap).forEach((src) => {
    const image = new Image();
    image.src = src;
  });

  if (currentLayer) currentLayer.style.backgroundImage = `url("${imageMap[images[currentIndex]]}")`;

  function rotateWallpaper() {
    currentIndex = (currentIndex + 1) % images.length;
    const imageId = images[currentIndex];
    const imageUrl = imageMap[imageId];
    wallpaper.setAttribute("data-image", imageId);

    if (!currentLayer || !nextLayer) return;
    nextLayer.style.backgroundImage = `url("${imageUrl}")`;
    nextLayer.classList.add("is-visible");

    window.setTimeout(() => {
      currentLayer.style.backgroundImage = `url("${imageUrl}")`;
      nextLayer.classList.remove("is-visible");
    }, 1900);
  }

  if (!reduceMotion) {
    window.setInterval(rotateWallpaper, 9500);
    window.addEventListener("pointermove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      wallpaper.style.setProperty("--mx", `${x}px`);
      wallpaper.style.setProperty("--my", `${y}px`);
    }, { passive: true });
  }
})();
