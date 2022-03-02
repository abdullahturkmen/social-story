let storyData = [
  {
    "user-name": "Abdullah Developer",
    "user-avatar":
      "https://cdn.pixabay.com/photo/2014/07/09/10/04/man-388104_960_720.jpg",
    storiesList: [
      { story: "https://picsum.photos/id/502/1000/1000" }
    ]
  },
  {
    "user-name": "Abdullah Deveci",
    "user-avatar":
      "https://image.cnbcfm.com/api/v1/image/106689818-1599150563582-musk.jpg?v=1630603757",
    storiesList: [
      { story: "https://picsum.photos/id/503/1200/800" },
      { story: "https://picsum.photos/id/504/1200/1600" },
       { story: "https://picsum.photos/id/505/1200/500" },
      { story: "https://picsum.photos/id/506/1200/800" },
       { story: "https://picsum.photos/id/507/1200/1200" },
      { story: "https://picsum.photos/id/508/1200/2000" }
    ]
  }
];

//console.log(storyData);

storyData.forEach((item) => {
  var storyCoverItem =
    '<div class="swiper-slide" onclick="openStory(this)"><div class="user-avatar"><img src="' +
    item["user-avatar"] +
    '" alt=""></div><span>' +
    item["user-name"] +
    "</span></div>";

  let storyCoverListAdd = (document
    .getElementById("stories-cover")
    .getElementsByClassName("swiper-wrapper")[0].innerHTML += storyCoverItem);

  var storyLiElements = "";

  item.storiesList.forEach((storyItem) => {
    storyLiElements +=
      '<li class="story-list-item"><img src="' +
      storyItem["story"] +
      '" alt=""></li>';
  });

  var storyItem =
    '<div class="swiper-slide"><ul class="story-list">' +
    storyLiElements +
    "</ul></div>";

  let storyListAdd = (document
    .getElementById("stories")
    .getElementsByClassName("swiper-wrapper")[0].innerHTML += storyItem);

  storyCoverSwiper();
});

function storyCoverSwiper() {
  var swiperStoryCover = new Swiper(".mySwiper", {
    slidesPerView: 6,
    spaceBetween: 20,
    slidesPerGroup: 1,
    freeMode: true,
    loop: false,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      "@0.00": {
        slidesPerView: 3,
        spaceBetween: 20
      },
      "@0.75": {
        slidesPerView: 4,
        spaceBetween: 24
      },
      "@1.00": {
        slidesPerView: 5,
        spaceBetween: 26
      },
      "@1.50": {
        slidesPerView: 6,
        spaceBetween: 30
      }
    }
  });
}

function storyListSwiper(initialNum) {
  var swiperStoryList = new Swiper(".myStorySwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    initialSlide: initialNum,
    loop: false,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
}

function openStory(event) {
  var ariaLabel = event.attributes["aria-label"].nodeValue;

  var initialSelectNum = ariaLabel.substring(0, 1) - 1;

  storyListSwiper(initialSelectNum);

  document.getElementsByClassName("stories")[0].classList.remove("hide");

  activeStoryDetails();
}

function closeStory() {
  document.getElementsByClassName("stories")[0].classList.add("hide");
  document.getElementById("story-details").innerHTML = "";
  removeStoryController();
  removeStoryActive();
}

function activeStoryDetails() {
  setTimeout(function () {
    var activeStoryLabel = document
      .getElementById("stories")
      .getElementsByClassName("swiper-slide-active")[0].attributes["aria-label"]
      .nodeValue;

    var activeStoryNum = activeStoryLabel.substring(0, 1) - 1;

    var activeStoryUserAvatar = document
      .getElementById("stories-cover")
      .getElementsByClassName("swiper-wrapper")[0].children[activeStoryNum]
      .children[0].innerHTML;

    var activeStoryUserName = document
      .getElementById("stories-cover")
      .getElementsByClassName("swiper-wrapper")[0].children[activeStoryNum]
      .children[1].innerText;

    var activeStoryCount = document
      .getElementById("stories")
      .getElementsByClassName("swiper-slide-active")[0].children[0]
      .childElementCount;

    var activeStoryCountDotItem = "";

    for (let i = 0; i < activeStoryCount; i++) {
      activeStoryCountDotItem += "<li><span></span></li>";
    }

    var activeStoryCountDots =
      '<div class="story-details-dots"><ul>' +
      activeStoryCountDotItem +
      "</ul></div>";

    var activeStoryCloseButton =
      '<div class="close-stories" onclick="closeStory()"></div>';

    document.getElementById("story-details").innerHTML =
      activeStoryCountDots +
      activeStoryUserAvatar +
      activeStoryUserName +
      activeStoryCloseButton;

    var addActiveDotClass = document
      .getElementById("stories")
      .getElementsByClassName("story-details-dots")[0]
      .children[0].children[0].classList.add("active-story-dot");

    var addActiveClass = document
      .getElementById("stories")
      .getElementsByClassName("swiper-slide-active")[0]
      .children[0].firstElementChild.classList.add("active");

    //console.log(addActiveClass);
    sliderAutoChange();
    addStoryController();
  }, 500);
}

storySliderChange = new Swiper(".myStorySwiper").on(
  "transitionEnd",
  function () {
    activeStoryDetails();
    removeStoryController();
    removeStoryActive();
  }
);

function addStoryController() {
  document
    .getElementById("stories")
    .getElementsByClassName("story-list-item active")[0].innerHTML +=
    '<div class="story-controller"><div class="story-controller-prev" onclick="prevSlide()"></div><div class="story-controller-next" onclick="nextSlide()"></div></div>';
}

function removeStoryController() {
  document.getElementsByClassName("story-controller")[0].remove();
}

function removeStoryActive() {
  document
    .getElementById("stories")
    .getElementsByClassName("story-list-item active")[0]
    .classList.remove("active");
}

function prevSlide() {
  clearTimeout(initial);
  sliderAutoChange();
  removeStoryController();
  var activeSlide = document
    .getElementById("stories")
    .getElementsByClassName("story-list-item active")[0];

  if (activeSlide.previousElementSibling === null) {
    activeSlide.classList.remove("active");

    const swipers = document.querySelector(".myStorySwiper").swiper;

    swipers.slidePrev();
    activeStoryDetails();
  } else {
    activeSlide.classList.remove("active");

    activeSlide.previousElementSibling.classList.add("active");
    
    
  var activeSlideDot = document
    .getElementById("stories")
    .getElementsByClassName("active-story-dot")[0];
  activeSlideDot.classList.remove("active-story-dot");

  activeSlideDot.previousElementSibling.classList.add("active-story-dot");
  }
  addStoryController();

}

function nextSlide() {
  sliderAutoChange();
  removeStoryController();
  var activeSlide = document
    .getElementById("stories")
    .getElementsByClassName("story-list-item active")[0];
  if (activeSlide.nextElementSibling === null) {
    var lastSlideControl = document
      .getElementById("stories")
      .getElementsByClassName("swiper-slide-active")[0];

    if (lastSlideControl.nextElementSibling === null) {
      closeStory();
    }

    activeSlide.classList.remove("active");

    const swipers = document.querySelector(".myStorySwiper").swiper;

    swipers.slideNext();
    activeStoryDetails();
  } else {
    activeSlide.classList.remove("active");

    activeSlide.nextElementSibling.classList.add("active");
    
    var activeSlideDot = document
    .getElementById("stories")
    .getElementsByClassName("active-story-dot")[0];
  activeSlideDot.classList.remove("active-story-dot");

  activeSlideDot.nextElementSibling.classList.add("active-story-dot");
    
  }
  addStoryController();

  
}

var initial;

function sliderAutoChange() {
  clearTimeout(initial);
  initial = window.setTimeout(function () {
    nextSlide();
  }, 5000);
}