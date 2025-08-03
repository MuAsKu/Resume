const cube = document.getElementById('cube');
let startX, startY;
let rotateX = -20, rotateY = 20;
let isDragging = false;

const updateCube = () => {
  cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const enableTransition = () => {
  cube.style.transition = 'transform 0.3s ease';
};

const disableTransition = () => {
  cube.style.transition = 'none';
};


document.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  disableTransition();
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;
  rotateY += deltaX * 0.5;
  rotateX -= deltaY * 0.5;
  updateCube();
  startX = e.clientX;
  startY = e.clientY;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  enableTransition();
});


document.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  disableTransition();
});

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - startX;
  const deltaY = e.touches[0].clientY - startY;
  rotateY += deltaX * 0.5;
  rotateX -= deltaY * 0.5;
  updateCube();
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener('touchend', () => {
  isDragging = false;
  enableTransition();
});
