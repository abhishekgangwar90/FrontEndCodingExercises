// Get all the elements
// Start the progressbar promise => id, speed
class ProgressBar {
  interval = 0;

  startProgressBar(element, time) {
    return new Promise((resolve, reject) => {
      const timer = time / 1000;
      clearInterval(this.interval);

      this.interval = setInterval(() => {
        this.updateProgressBar(element, resolve);
      }, timer);
    });
  }

  updateProgressBar(element, resolve) {
    const currentWidth = element.style.width;
    const widthWithoutPercentage = currentWidth
      ? currentWidth.substring(0, currentWidth.length - 1)
      : 0;
    const widthInNumber = Number(widthWithoutPercentage);

    if (widthInNumber === 100) {
      clearInterval(this.interval);
      resolve("resolved");
      return;
    }

    element.style.width = `${Number(widthInNumber) + 1}%`;
  }
}

function resetWidth() {
  const progressBarElm = document.getElementsByClassName("progressive-bar");

  for (let bar of progressBarElm) {
    bar.style.width = "0%";
  }
}

function startAnimation() {
  resetWidth();
  const progressBar = new ProgressBar();
  const progressBarElm = document.getElementsByClassName("progressive-bar");

  progressBar.startProgressBar(progressBarElm[0], 3000);
}

function startAllAnimation() {
  resetWidth();

  const progressBarElm = document.getElementsByClassName("progressive-bar");

  for (let element of progressBarElm) {
    const progressBar = new ProgressBar();
    progressBar.startProgressBar(element, 3000);
  }
}

function startGradualAnimation() {
  resetWidth();

  let initialtimer = 3000;
  const progressBarElm = document.getElementsByClassName("progressive-bar");
  for (let element of progressBarElm) {
    initialtimer += 3000;
    const progressBar = new ProgressBar();
    progressBar.startProgressBar(element, initialtimer);
  }
}

function startAnimationAfterOneFinishes() {
  resetWidth();

  let initialtimer = 3000;
  let totalFinishedTask = 0;
  const progressBarElm = document.getElementsByClassName("progressive-bar");

  const progressBar = new ProgressBar();

  const runProgressBar = () => {
    if (totalFinishedTask === progressBarElm.length) {
      return;
    }

    progressBar
      .startProgressBar(progressBarElm[totalFinishedTask], initialtimer)
      .then(() => {
        totalFinishedTask++;
        runProgressBar();
      });
  };

  runProgressBar();
}
