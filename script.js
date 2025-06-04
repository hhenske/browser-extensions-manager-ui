

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("card-container");

    let extensions = [];

    fetch("./data.json")
        .then((res) => res.json())
        .then((data) => {
            extensions = data.map((item, index) => ({
                ...item,
                id: index + 1
            }));
            renderExtensions(extensions);
        })
        .catch((error) => console.error("Failed to load extensions: ", err));

    function renderExtensions(list) {
        container.innerHTML = "";

        list.forEach((ext) => {
            const card = document.createElement("div");
            card.className = "extension-card";

            card.innerHTML = `
            <div class="card-content">
                <div class="card-icon">
                    <img src="${ext.logo}" alt="${ext.name} logo" />
                </div>
                <div class="card-info">
                    <h3>${ext.name}</h3>
                    <p>${ext.description}</p>
                </div>
            </div>
            <div class="card-bottom">
            <button class="btn remove-btn" data-id="${ext.id}">Remove</button>
            <label class="switch">
                <input type="checkbox" class="toggle-switch" data-id="${ext.id}" ${ext.isActive ? "checked" : ""}>
                <span class="slider round"></span>
            </label>
        </div>
        `;

        container.appendChild(card);
        });

    attachEventListeners();
    }


    function attachEventListeners() {
        document.querySelectorAll(".remove-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(e.target.dataset.id);
                renderExtensions(extensions);
            });
        });

        document.querySelectorAll(".toggle-switch").forEach((toggle) => {
            toggle.addEventListener("change", (e) => {
                const id = parseInt(e.target.dataset.id);
                const ext = extensions.find((ext) => ext.id === id);
                ext.isActive = e.target.checked;
                renderExtensions(extensions);
            });
        });
    }


    document.getElementById("all-btn").addEventListener("click", () => {
        renderExtensions(extensions);
    });

    document.getElementById("active-btn").addEventListener("click", () => {
        renderExtensions(extensions.filter((ext) => ext.isActive));
    })

    document.getElementById("inactive-btn").addEventListener("click", () => {
        renderExtensions(extensions.filter((ext) => !ext.isActive));
        });
   

    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    moonIcon.addEventListener('click', () => {
        document.body.classList.add('dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline';
    });

    sunIcon.addEventListener('click', () => {
        document.body.classList.remove('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    });

});