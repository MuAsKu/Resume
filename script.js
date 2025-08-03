const cube = document.getElementById('cube');
const buttons = document.querySelectorAll('.controls button');
let startX, startY;
let rotateX = -15, rotateY = 15;
let isDragging = false;
let autoRotate = true;
let animationId;

const updateCube = () => {
  cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const enableTransition = () => {
  cube.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
};

const disableTransition = () => {
  cube.style.transition = 'none';
};

const startAutoRotation = () => {
  if (!autoRotate) return;
  
  rotateY += 0.3;
  updateCube();
  animationId = requestAnimationFrame(startAutoRotation);
};

const stopAutoRotation = () => {
  autoRotate = false;
  cancelAnimationFrame(animationId);
};

const setActiveButton = (face) => {
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.face === face);
  });
};

document.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  disableTransition();
  stopAutoRotation();
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
  autoRotate = false;
});

document.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  disableTransition();
  stopAutoRotation();
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - startX;
  const deltaY = e.touches[0].clientY - startY;
  rotateY += deltaX * 0.5;
  rotateX -= deltaY * 0.5;
  updateCube();
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', () => {
  isDragging = false;
  enableTransition();
  autoRotate = false;
});

const faceAngles = {
  front:  { x: 0,   y: 0   },
  back:   { x: 0,   y: 180 },
  right:  { x: 0,   y: 90  },
  left:   { x: 0,   y: -90 },
  top:    { x: 90,  y: 0   },
  bottom: { x: -90, y: 0   }
};

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const face = button.dataset.face;
    const angles = faceAngles[face];
    rotateX = angles.x;
    rotateY = angles.y;
    enableTransition();
    updateCube();
    setActiveButton(face);
    stopAutoRotation();
  });
});

let idleTimer;
const resetIdleTimer = () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    autoRotate = true;
    startAutoRotation();
  }, 5000);
};

document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('touchmove', resetIdleTimer);

updateCube();
setActiveButton('front');
startAutoRotation();
