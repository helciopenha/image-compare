// inicia passando a classe do container das imagens
// sempre inicar com timeout para garantir carregamento dos elementos
setTimeout(() => {
  init('img-compare-container');
}, 500);

// funcao que inicia os eventos
function init(classContainer) {
  const imageContainer = document.querySelector(`.${classContainer}`)
  const imageOverlay = imageContainer.getElementsByClassName('img-compare-overlay');

  for(let i = 0; i < imageOverlay.length; i++) {
    _compareImgs(imageOverlay[i], imageContainer)
  }
}

function _compareImgs(img, imageContainer) {
  
  // pega tamanho da imagem
  const imgWidth = img.offsetWidth
  
  let click = 0
  
  // inicializa na metade
  img.style.width = String(imgWidth/2)+'px'
  
  // cria elemento de slide
  const slider = imageContainer.querySelector('.img-compare-slider')
  
  img.parentElement.insertBefore(slider, img)
  slider.style.left = Number(imgWidth/2) - (slider.offsetWidth/2) + 'px'
  
  // quando mouse pressionado
  slider.addEventListener('mousedown', _sliderStart)
  // quando soltar botão do mouse
  window.addEventListener("mouseup", _sliderFinish)
  slider.addEventListener("touchstart", _sliderStart)
  window.addEventListener("touchend", _sliderFinish)


  // inicia o slider
  function _sliderStart(e) {
    e.preventDefault()
    click = 1
    
    window.addEventListener('mousemove', _sliderMove)
    window.addEventListener('touchmove', _sliderMove)
  }

  // move o slider
  function _sliderMove(e) {
    
    if(click === 0) return false
    console.log(click);
  
    let positionX = 0;
    e = (e.changedTouches) ? e.changedTouches[0] : e;
  
    // pega o tamanho e a posicao
    const rect = img.getBoundingClientRect();
    // calcula posicao x do cursor
    positionX = e.pageX - rect.left
    positionX = positionX - window.pageXOffset
    
    let pos = positionX
    if(pos < 0) pos = 0
    if(pos > imgWidth) pos = imgWidth
  
    img.style.width = pos + 'px'
    slider.style.left = Number(img.offsetWidth) - Number(slider.offsetWidth / 2) + "px";
  
  }

  // para de mover slider
  function _sliderFinish() {
    click = 0
  }
}
