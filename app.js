// ==========================================================
// AEON PPM LEARNING JOURNEY - GITHUB PAGES FRONTEND
// Ganti URL di bawah dengan URL Web App Apps Script Anda.
// ==========================================================

const API_URL = "https://script.google.com/macros/s/AKfycbxbaop9HbasKeMj1d9CqG9jjTqJRq68Gv3f-8zaVobcbv6pDW3LRu4IJpFezpO2nFRi/exec";

const nikInput = document.getElementById("nikInput");
const nameSelect = document.getElementById("nameSelect");
const loginBtn = document.getElementById("loginBtn");
const loginStatus = document.getElementById("loginStatus");

const loginView = document.getElementById("loginView");
const resultView = document.getElementById("resultView");
const changeParticipantBtn = document.getElementById("changeParticipantBtn");

const levelLabel = document.getElementById("levelLabel");
const participantName = document.getElementById("participantName");
const nameValue = document.getElementById("nameValue");
const nikValue = document.getElementById("nikValue");
const sectionValue = document.getElementById("sectionValue");
const basicValue = document.getElementById("basicValue");
const moduleCount = document.getElementById("moduleCount");
const moduleList = document.getElementById("moduleList");

window.addEventListener("DOMContentLoaded", loadParticipants);

loginBtn.addEventListener("click", loginParticipant);

nikInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    loginParticipant();
  }
});

nameSelect.addEventListener("change", () => {
  if (nameSelect.value) {
    nikInput.value = "";
  }
});

nikInput.addEventListener("input", () => {
  if (nikInput.value.trim()) {
    nameSelect.value = "";
  }
});

changeParticipantBtn.addEventListener("click", () => {
  resultView.classList.add("hidden");
  loginView.classList.remove("hidden");
  nikInput.value = "";
  nameSelect.value = "";
  loginStatus.textContent = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validUrl(value) {
  const url = String(value ?? "").trim();
  return /^https?:\/\//i.test(url) ? url : "";
}

async function callApi(action, keyword = "") {
  if (!API_URL || API_URL === "URL_APPSCRIPT_ANDA") {
    throw new Error("URL Apps Script belum diisi.");
  }

  const url =
    `${API_URL}?action=${encodeURIComponent(action)}` +
    (keyword ? `&keyword=${encodeURIComponent(keyword)}` : "");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

async function loadParticipants() {
  try {
    const result = await callApi("participants");

    if (!result.status || !Array.isArray(result.data)) {
      throw new Error(result.message || "Data peserta tidak tersedia.");
    }

    nameSelect.innerHTML = `<option value="">Pilih nama peserta...</option>`;

    result.data.forEach((person) => {
      const option = document.createElement("option");
      option.value = person.nik;
      option.textContent = `${person.nama} — ${person.nik}`;
      nameSelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    loginStatus.textContent =
      "Daftar nama belum dapat dimuat. Gunakan input NIK.";
  }
}

function getSearchKey() {
  const nik = nikInput.value.trim();
  if (nik) return nik;
  return nameSelect.value.trim();
}

async function loginParticipant() {
  const key = getSearchKey();

  if (!key) {
    loginStatus.textContent = "Masukkan NIK atau pilih nama peserta.";
    return;
  }

  loginBtn.disabled = true;
  loginStatus.textContent = "Memuat data peserta...";

  try {
    const result = await callApi("search", key);

    if (!result.status || !result.data) {
      throw new Error(result.message || "Data peserta tidak ditemukan.");
    }

    renderParticipant(result.data);

    loginStatus.textContent = "";
    loginView.classList.add("hidden");
    resultView.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error(error);
    loginStatus.textContent =
      error.message || "Terjadi kendala saat mengambil data.";
  } finally {
    loginBtn.disabled = false;
  }
}

function renderParticipant(data) {
  const modules = Array.isArray(data.modules) ? data.modules : [];

  levelLabel.textContent = data.level
    ? `Level ${String(data.level).replace(/^level\s*/i, "")}`
    : "Level";

  participantName.textContent = data.nama || "-";
  nameValue.textContent = data.nama || "-";
  nikValue.textContent = data.nik || "-";
  sectionValue.textContent = data.section || "-";
  basicValue.textContent = data.basic || "Belum ditentukan";
  moduleCount.textContent =
    `${modules.length} modul`;

  if (!modules.length) {
    moduleList.innerHTML = `
      <div class="empty-modules">
        Belum ditemukan modul untuk Basic yang harus dikerjakan.
      </div>
    `;
    return;
  }

  moduleList.innerHTML = modules.map((item) => {
    const postTest = validUrl(item.postTest);
    const moduleLink = validUrl(item.link);

    return `
      <div class="module-row">
        <div>
          <div class="module-title">${escapeHtml(item.module)}</div>
          <div class="module-category">${escapeHtml(item.category || "")}</div>
        </div>

        <div>
          ${
            postTest
              ? `<a class="link-btn post-btn"
                    href="${escapeHtml(postTest)}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Link Post Test
                 </a>`
              : `<span class="link-btn disabled-btn">Belum tersedia</span>`
          }
        </div>

        <div>
          ${
            moduleLink
              ? `<a class="link-btn module-btn"
                    href="${escapeHtml(moduleLink)}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Modul
                 </a>`
              : `<span class="link-btn disabled-btn">Belum tersedia</span>`
          }
        </div>
      </div>
    `;
  }).join("");
}
