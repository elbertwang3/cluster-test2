var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  console.log(response);
  console.log(response.index, "-------- enter", response.direction);
  // response = { element, direction, index }
  response.element.classList.add("is-active");
  document
    .getElementsByClassName(`img-step-${response.index}`)[0]
    .classList.add("is-active");
}

function handleStepExit(response) {
  // response = { element, direction, index }
  console.log(response.index, "-------- exit", response.direction);
  // remove color from current step
  response.element.classList.remove("is-active");
  document
    .getElementsByClassName(`img-step-${response.index}`)[0]
    .classList.remove("is-active");
}

function handleStepProgress(response) {
  // response = { element, progress, index }
  console.log(response.index, "-------- progress -", response.progress);
}

function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)

  scroller
    .setup({
      step: "#scrolly .scroll-scenes .step",
      offset: 1,
      debug: true,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onStepProgress(handleStepProgress);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();
