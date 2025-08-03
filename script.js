document.addEventListener('DOMContentLoaded', () => {
  const cube = document.getElementById('cube');
  const buttons = document.querySelectorAll('.controls button');
  let rotateX = -15, rotateY = 15;
  
  const updateCube = () => {
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
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
      rotateX = faceAngles[face].x;
      rotateY = faceAngles[face].y;
      updateCube();
    });
  });
  
  updateCube();
});
