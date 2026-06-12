(function () {
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox.querySelector("img");
  var thumbs = Array.prototype.slice.call(document.querySelectorAll(".gallery button"));
  var current = 0;

  function show(i) {
    current = (i + thumbs.length) % thumbs.length;
    var t = thumbs[current].querySelector("img");
    lbImg.src = t.dataset.full || t.src;
    lbImg.alt = t.alt;
  }

  thumbs.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      show(i);
      lightbox.showModal();
    });
  });

  lightbox.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lightbox.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  lightbox.querySelector(".lb-close").addEventListener("click", function () { lightbox.close(); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) lightbox.close();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.open) return;
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  if (new URLSearchParams(location.search).get("sent") === "1") {
    var thanks = document.querySelector(".thanks");
    if (thanks) {
      thanks.classList.add("show");
      thanks.scrollIntoView({ block: "center" });
    }
  }
})();
