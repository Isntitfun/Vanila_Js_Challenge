const img = [
  `img/eberhard-grossgasteiger-IkXtNWhJMrs-unsplash.jpg`,
  `img/kabiur-rahman-riyad-DJarvD4Ru08-unsplash.jpg`,
  `img/maciek-sulkowski-7GN9FhKs77c-unsplash.jpg`,
  `img/mauro-lima-Q5wXCiQZS14-unsplash.jpg`,
  `img/valentin-salmon-izyo7kzltis-unsplash.jpg`,
];
const main = document.querySelector("main");

const randomImg = () => {
  return img[Math.floor(Math.random() * img.length)];
};

main.style.background = `url(${randomImg()})`;
main.style.backgroundPosition = `center`;
main.style.backgroundSize = `cover`;
