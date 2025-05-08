import React, { useEffect } from 'react';

function BubbleBackground() {
  useEffect(() => {
    // Crear burbujas aleatoriamente
    const createBubble = () => {
      const bubbleContainer = document.getElementById('bubble-container');
      if (!bubbleContainer) return;
      
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      
      // Tamaño aleatorio entre 8px y 30px (más pequeñas para no distraer tanto)
      const size = Math.random() * 22 + 8;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      
      // Posición aleatoria en toda la pantalla
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      bubble.style.left = `${posX}%`;
      bubble.style.top = `${posY}%`;
      
      // Opacidad aleatoria (más sutil)
      const opacity = Math.random() * 0.4 + 0.1;
      bubble.style.opacity = opacity;
      
      // Animación aleatoria
      const duration = Math.random() * 25 + 15;
      bubble.style.animationDuration = `${duration}s`;
      
      // Retraso aleatorio
      const delay = Math.random() * 5;
      bubble.style.animationDelay = `${delay}s`;
      
      bubbleContainer.appendChild(bubble);
      
      // Eliminar la burbuja después de cierto tiempo
      setTimeout(() => {
        if (bubble.parentNode === bubbleContainer) {
          bubbleContainer.removeChild(bubble);
        }
      }, duration * 1000 + delay * 1000);
    };
    
    // Crear más burbujas iniciales (25 en lugar de 15)
    for (let i = 0; i < 25; i++) {
      createBubble();
    }
    
    // Añadir nuevas burbujas más frecuentemente
    const intervalId = setInterval(createBubble, 1500);
    
    // Limpiar intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div id="bubble-container" className="bubble-container">
      {/* Las burbujas se crearán dinámicamente aquí */}
    </div>
  );
}

export default BubbleBackground;