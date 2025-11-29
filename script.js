const umbrellaImg = document.getElementById("umbrella-img");
const colorButtons = document.querySelectorAll(".umbrella-color button");
const loader = document.getElementById("loader");
const buyBtn = document.querySelector(".buy-now-button");
const uploadBtn = document.querySelector(".custom-file-upload");
const logoPreview = document.getElementById("logo-preview");
const fileInput = document.getElementById("upload-logo");
const slider = document.getElementById("logo-size-slider");

const colorMap = {
    pink: { file: "Pink umbrella.png", color: "#ff4081" },
    blue: { file: "Blue umbrella.png", color: "#0099ff" },
    yellow: { file: "Yellow umbrella.png", color: "#ffeb3b" }
};

colorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const selectedColor = btn.classList[0].split("-")[0];
        const newColor = colorMap[selectedColor].color;

        umbrellaImg.style.opacity = 0;
        logoPreview.style.display = "none";
        logoPreview.style.opacity = 0;

        loader.classList.remove("hidden");

        buyBtn.style.backgroundColor = newColor;
        uploadBtn.style.backgroundColor = newColor;
        slider.style.setProperty("--slider-color", newColor);

        loader.querySelector(".loader-icon").style.filter =
            `brightness(0) saturate(100%) sepia(100%) hue-rotate(0deg) drop-shadow(0 0 0 ${newColor})`;

        setTimeout(() => {
            umbrellaImg.src = `../assets/${colorMap[selectedColor].file}`;
            document.body.style.backgroundColor = newColor + "20";

            umbrellaImg.style.opacity = 1;

            logoPreview.style.display = "block";
            logoPreview.style.opacity = 1;

            loader.classList.add("hidden");
        }, 600);
    });
});

fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        logoPreview.src = event.target.result;
        logoPreview.style.display = "block";
        slider.style.display = "block";
    };
    reader.readAsDataURL(file);
});

slider.addEventListener("input", () => {
    logoPreview.style.width = slider.value + "px";
});
