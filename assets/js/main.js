(function () {
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (window.scrollY > 10) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox.querySelector(".lb-img");
  var lbCounter = lightbox.querySelector(".lb-counter");
  var thumbs = Array.prototype.slice.call(document.querySelectorAll(".gallery button"));
  var current = 0;

  function show(i) {
    current = (i + thumbs.length) % thumbs.length;
    var t = thumbs[current].querySelector("img");
    lbImg.src = t.dataset.full || t.src;
    lbImg.alt = t.alt;
    if (lbCounter) lbCounter.textContent = (current + 1) + " / " + thumbs.length;
  }

  function openLb(i) {
    show(i);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lb-close").focus();
  }

  function closeLb() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  thumbs.forEach(function (btn, i) {
    btn.addEventListener("click", function () { openLb(i); });
  });

  var carousel = document.querySelector(".carousel");
  if (carousel) {
    var carImg = carousel.querySelector(".carousel-img");
    var carCounter = carousel.querySelector(".carousel-counter");
    var carIndex = 0;

    function showCarousel(i) {
      carIndex = (i + thumbs.length) % thumbs.length;
      var t = thumbs[carIndex].querySelector("img");
      carImg.src = t.dataset.full || t.src;
      carImg.alt = t.alt;
      carCounter.textContent = (carIndex + 1) + " / " + thumbs.length;
    }

    carousel.querySelector(".carousel-prev").addEventListener("click", function () {
      showCarousel(carIndex - 1);
    });
    carousel.querySelector(".carousel-next").addEventListener("click", function () {
      showCarousel(carIndex + 1);
    });
    carousel.querySelector(".carousel-img-btn").addEventListener("click", function () {
      openLb(carIndex);
    });

    var carSwipeStartX = 0;
    var carSwipeStartY = 0;
    carousel.addEventListener("touchstart", function (e) {
      carSwipeStartX = e.changedTouches[0].clientX;
      carSwipeStartY = e.changedTouches[0].clientY;
    }, { passive: true });
    carousel.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - carSwipeStartX;
      var dy = e.changedTouches[0].clientY - carSwipeStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx < 0) showCarousel(carIndex + 1);
        else showCarousel(carIndex - 1);
      }
    }, { passive: true });
  }

  lightbox.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lightbox.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  lightbox.querySelector(".lb-close").addEventListener("click", closeLb);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLb();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "Escape") closeLb();
  });

  /* Swipe gesture */
  var swipeStartX = 0;
  var swipeStartY = 0;
  lightbox.addEventListener("touchstart", function (e) {
    swipeStartX = e.changedTouches[0].clientX;
    swipeStartY = e.changedTouches[0].clientY;
  }, { passive: true });
  lightbox.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - swipeStartX;
    var dy = e.changedTouches[0].clientY - swipeStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) show(current + 1);
      else show(current - 1);
    }
  }, { passive: true });

  if (new URLSearchParams(location.search).get("sent") === "1") {
    var thanks = document.querySelector(".thanks");
    if (thanks) {
      thanks.classList.add("show");
      thanks.scrollIntoView({ block: "center" });
    }
  }
})();
