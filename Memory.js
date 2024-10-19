document.querySelector(".control-button span").onclick = function () {
  let yourName = prompt("What's your name");
  if (yourName == null || yourName == "") {
    document.querySelector(".info-container .name span").innerHTML = "unkown";
  } else {
    document.querySelector(".info-container .name span").innerHTML = yourName;
  }
  document.querySelector(".control-button").remove();
};

let duration = 1000;

let blockContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blockContainer.children);

// console.log(blocks);
let orderRange = [...Array(blocks.length).keys()];
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  // console.log(block);
  block.addEventListener(`click`, function () {
    flipBlock(block);
  });
});

// flip block function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add(`is-flipped`);
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains(`is-flipped`)
  );
  if (allFlippedBlocks.length === 2) {
    // console.log(`two flipped blocks selected`);
    // stop clicking
    stopclicking();
    // check Matched
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// stop clicking
function stopclicking() {
  blockContainer.classList.add(`no-clicking`);

  setTimeout(() => {
    blockContainer.classList.remove(`no-clicking`);
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(`.tries span`);
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove(`is-flipped`);
    secondBlock.classList.remove(`is-flipped`);

    firstBlock.classList.add(`has-match`);
    secondBlock.classList.add(`has-match`);
    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove(`is-flipped`);
      secondBlock.classList.remove(`is-flipped`);
    }, duration);
    document.getElementById("fail").play();
  }
}

/* shuffle function */

function shuffle(array) {
  let current = array.length;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    // console.log(random);
    temp = array[current];

    array[current] = array[random];

    array[random] = temp;
  }
}
