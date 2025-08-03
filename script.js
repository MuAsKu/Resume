document.addEventListener('DOMContentLoaded', () => {
  const cube = document.getElementById('cube');
  const buttons = document.querySelectorAll('.controls button');
  let isDragging = false;
  let startX, startY;
  let currentX = -15, currentY = 15;
  let autoRotateTimeout;
  let isAutoRotateActive = true;

  function initCube() {
    updateCubeRotation();
    startAutoRotation();
    addEventListeners();
  }

  function rotateToFace(face) {
    stopAutoRotation();
    
    const rotations = {
      'front': { x: 0, y: 0 },
      'back': { x: 0, y: 180 },
      'right': { x: 0, y: 90 },
      'left': { x: 0, y: -90 },
      'top': { x: 90, y: 0 },
      'bottom': { x: -90, y: 0 }
    };

    currentX = rotations[face].x;
    currentY = rotations[face].y;
    
    animateRotation();
    highlightActiveFace(face);
    resetAutoRotation();
  }

  function animateRotation() {
    cube.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
    updateCubeRotation();
    
    setTimeout(() => {
      cube.style.transition = '';
    }, 800);
  }

  function updateCubeRotation() {
    cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
  }

  function highlightActiveFace(face) {
    document.querySelectorAll('.face').forEach(faceEl => {
      faceEl.classList.remove('active');
    });
    document.querySelector(`.face.${face}`).classList.add('active');
  }

  function startAutoRotation() {
    if (!isAutoRotateActive) return;
    
    currentY += 0.2;
    updateCubeRotation();
    requestAnimationFrame(startAutoRotation);
  }

  function stopAutoRotation() {
    isAutoRotateActive = false;
    cancelAnimationFrame(startAutoRotation);
  }

  function resetAutoRotation() {
    clearTimeout(autoRotateTimeout);
    autoRotateTimeout = setTimeout(() => {
      isAutoRotateActive = true;
      startAutoRotation();
    }, 5000);
  }

  function handleDragStart(e) {
    isDragging = true;
    stopAutoRotation();
    
    if (e.type === 'touchstart') {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    } else {
      startX = e.clientX;
      startY = e.clientY;
    }
  }

  function handleDragMove(e) {
    if (!isDragging) return;
    
    let clientX, clientY;
    
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    
    currentY += deltaX * 0.5;
    currentX -= deltaY * 0.5;
    
    updateCubeRotation();
    
    startX = clientX;
    startY = clientY;
  }

  function handleDragEnd() {
    isDragging = false;
    resetAutoRotation();
  }

  function addEventListeners() {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => rotateToFace(btn.dataset.face));
    });

    document.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    document.addEventListener('touchstart', handleDragStart, { passive: false });
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);
  }

  initCube();
});
