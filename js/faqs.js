const faqs = document.querySelectorAll('.faqs-lista__preguntas');

let preguntaAbierta = null;

faqs.forEach(faq => {
  const flecha = faq.querySelector('.bi-chevron-down');
  const pregunta = faq.nextElementSibling;
  faq.addEventListener('click', () => {
    if (preguntaAbierta !== null && preguntaAbierta !== pregunta) {
      preguntaAbierta.style.maxHeight = null;
      preguntaAbierta.previousElementSibling.querySelector('.bi-chevron-down').classList.remove('checked');
    }

    if (preguntaAbierta === pregunta) {
      preguntaAbierta.style.maxHeight = null;
      preguntaAbierta = null;
      flecha.classList.remove('checked');
    } else {
      pregunta.style.maxHeight = pregunta.scrollHeight + 'px';
      flecha.classList.add('checked');
      preguntaAbierta = pregunta;
    }
  });
});
