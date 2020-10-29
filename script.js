var scroller = scrollama();
const progress = document.getElementsByClassName("progress-bar")[0];
const scrolly = document.getElementById("scrolly");
let scrollyHeight = scrolly.clientHeight;
let scrollyOffset = scrolly.getBoundingClientRect().top;
console.log(scrollyHeight);
console.log(scrollyOffset);

// generic window resize listener event
function handleResize() {
  console.log("resizing");
  // 3. tell scrollama to update new element dimensions
  scroller.resize();
  scrollyHeight = scrolly.clientHeight;
  scrollyOffset = scrolly.getBoundingClientRect().top;
  console.log(scrollyHeight);
  console.log(scrollyOffset);
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
  document
    .getElementsByClassName(`img-step-${response.index}`)[0]
    .classList.remove("is-active");
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
    progress.style.width = `${Math.min(
      100,
      ((window.scrollY - scrollyOffset) * 100) /
        (scrollyHeight - window.innerHeight)
    )}%`;
  });
}

// kick things off
init();
