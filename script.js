const umbrellaImg = document.getElementById("umbrella-img");
const colorButtons = document.querySelectorAll(".umbrella-color button");
const loader = document.getElementById("loader");
const buyBtn = document.querySelector(".buy-now-button");
const uploadBtn = document.querySelector(".custom-file-upload");
const logoPreview = document.getElementById("logo-preview");
const fileInput = document.getElementById("upload-logo");
const slider = document.getElementById("logo-size-slider");

const uploadLabel = document.getElementById("upload-label");
const uploadText = document.getElementById("upload-text");
const removeFileBtn = document.getElementById("remove-file");
const fileWarning = document.getElementById("file-warning");

const colorMap = {
    pink: { file: "Pink umbrella.png", color: "#ff4081" },
    blue: { file: "Blue umbrella.png", color: "#0099ff" },
    yellow: { file: "Yellow umbrella.png", color: "#ffeb3b" }
};

if (colorButtons.length > 0) {
    colorButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedColor = btn.classList[0].split("-")[0];
            const newColor = colorMap[selectedColor].color;

            localStorage.setItem("selectedColor", newColor);

            umbrellaImg.style.opacity = 0;
            logoPreview.style.display = "none";
            logoPreview.style.opacity = 0;

            loader.classList.remove("hidden");

            buyBtn.style.backgroundColor = newColor;
            uploadBtn.style.backgroundColor = newColor;
            slider.style.setProperty("--slider-color", newColor);

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
}

function truncateFileName(name, maxLength = 15) {
    const dotIndex = name.lastIndexOf(".");
    if (dotIndex === -1) return name;

    const base = name.substring(0, dotIndex);
    const ext = name.substring(dotIndex);

    if (base.length <= maxLength) return name;

    return base.substring(0, maxLength) + "…" + ext;
}

if (fileInput) {
    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        fileWarning.classList.add("hidden");

        if (!file.type.startsWith("image/")) {
            fileWarning.textContent = "⚠ Only image files are allowed";
            fileWarning.classList.remove("hidden");
            this.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            fileWarning.textContent = "⚠ File size exceeds 5MB";
            fileWarning.classList.remove("hidden");
            this.value = "";
            return;
        }

        uploadText.textContent = truncateFileName(file.name, 15);

        removeFileBtn.classList.remove("hidden");

        const reader = new FileReader();
        reader.onload = (event) => {
            logoPreview.src = event.target.result;
            logoPreview.style.display = "block";
            slider.style.display = "block";
        };
        reader.readAsDataURL(file);
    });

    removeFileBtn.addEventListener("click", () => {
        fileInput.value = "";
        uploadText.textContent = "UPLOAD LOGO";
        removeFileBtn.classList.add("hidden");

        logoPreview.src = "";
        logoPreview.style.display = "none";
        slider.style.display = "none";
    });

    slider.addEventListener("input", () => {
        logoPreview.style.width = slider.value + "px";
    });

}

document.addEventListener("DOMContentLoaded", () => {
    const selectedColor = localStorage.getItem("selectedColor");

    const confirmBtn = document.querySelector(".customize-another-button");

    if (selectedColor && confirmBtn) {
        document.body.style.backgroundColor = selectedColor + "20";
        confirmBtn.style.backgroundColor = selectedColor;
    }
});
