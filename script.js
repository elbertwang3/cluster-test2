var scroller = scrollama();
const progress = document.getElementsByClassName("progress-bar")[0];
const scrolly = document.getElementById("scrolly");
let scrollyHeight = scrolly.clientHeight;
let scrollyOffset = window.pageYOffset + scrolly.getBoundingClientRect().top;

// generic window resize listener event
function handleResize() {
  // 3. tell scrollama to update new element dimensions
  scroller.resize();
  scrollyHeight = scrolly.clientHeight;
  scrollyOffset = window.pageYOffset + scrolly.getBoundingClientRect().top;
}

// scrollama event handlers
function handleStepEnter(response) {
  // console.log(response);
  // console.log(response.index, "-------- enter", response.direction);
  // response = { element, direction, index }
  response.element.classList.add("is-active");
  document
    .getElementsByClassName(`img-step-${response.index}`)[0]
    .classList.add("is-active");
}

function handleStepExit(response) {
  // response = { element, direction, index }
  // console.log(response.index, "-------- exit", response.direction);
  // remove color from current step
  response.element.classList.remove("is-active");
  if (response.direction == "up" && response.index == 0) {
  } else if (response.direction == "down" && response.index == 21) {
  } else {
    document
      .getElementsByClassName(`img-step-${response.index}`)[0]
      .classList.remove("is-active");
  }
}

// function handleStepProgress(response) {
//   console.log(response);
//   console.log(response.index, "-------- progress -", response.progress);
// }

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
    .onStepExit(handleStepExit);
  //.onStepProgress(handleStepProgress);

  // setup resize event
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", (e) => {
    progress.style.width = `${Math.max(
      0,
      Math.min(
        100,
        ((window.pageYOffset - scrollyOffset) * 100) /
          (scrollyHeight - window.innerHeight)
      )
    )}%`;
  });
}

// kick things off
init();
