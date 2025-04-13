const basket = document.getElementById("basket");
const items = document.getElementById("items");
const basketSound = document.getElementById("basketSound");

// Modals
const imageModal = document.getElementById("imageModal");
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const modalContent = imageModal.querySelector(".modal-content");

// Basket click
basket.addEventListener("click", () => {
  basket.classList.add("clicked");
  basketSound.play();
  items.style.display = "flex";
  setTimeout(() => basket.classList.remove("clicked"), 600);
});

// Icon clicks
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("click", () => {
    const type = item.getAttribute("data-type");
    const media = item.getAttribute("data-media");
    const message = item.getAttribute("data-message");

    // Reset modal content
    modalContent.innerHTML = `<span class="close">&times;</span>`;

    if (type === "message") {
      const msg = document.createElement("p");
      msg.textContent = message;
      msg.style.fontSize = "1.5em";
      msg.style.color = "#d14d72";
      modalContent.appendChild(msg);
      imageModal.style.display = "flex";

    } else if (type === "image" || type === "mixed" || type === "video") {
      const files = JSON.parse(media);

      files.forEach(file => {
        if (file.endsWith(".mp4")) {
          const vid = document.createElement("video");
          vid.src = file;
          vid.controls = true;
          vid.style.margin = "10px 0";
          vid.style.maxWidth = "100%";
          modalContent.appendChild(vid);
          vid.play();
        } else {
          const img = document.createElement("img");
          img.src = file;
          img.style.margin = "10px 0";
          modalContent.appendChild(img);
        }
      });

      imageModal.style.display = "flex";
    }

    // Close buttons
    document.querySelectorAll(".close").forEach(btn => {
      btn.onclick = () => {
        imageModal.style.display = "none";
        videoModal.style.display = "none";
        modalVideo.pause();
        modalVideo.currentTime = 0;
      };
    });
  });
});
