document.addEventListener('DOMContentLoaded', () => {
  const cube = document.getElementById('cube');
  const buttons = document.querySelectorAll('.controls button');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const face = button.dataset.face;
      let rotateX, rotateY;
      
      switch(face) {
        case 'front':
          rotateX = 0;
          rotateY = 0;
          break;
        case 'back':
          rotateX = 0;
          rotateY = 180;
          break;
        case 'right':
          rotateX = 0;
          rotateY = 90;
          break;
        case 'left':
          rotateX = 0;
          rotateY = -90;
          break;
        case 'top':
          rotateX = 90;
          rotateY = 0;
          break;
        case 'bottom':
          rotateX = -90;
          rotateY = 0;
          break;
      }
      
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  });

  let isDragging = false;
  let startX, startY;
  let currentX = -15, currentY = 15;

  document.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    currentY += deltaX * 0.5;
    currentX -= deltaY * 0.5;
    
    cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
    
    startX = e.clientX;
    startY = e.clientY;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  document.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    
    currentY += deltaX * 0.5;
    currentX -= deltaY * 0.5;
    
    cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
    
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });
});
