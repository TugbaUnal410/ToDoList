// Sayfa açılınca mevcut elemanlara silme butonu ekle
let myList = document.querySelectorAll("#list li");
myList.forEach(function (item) {
  addCloseButton(item);
});

// Her li'ye silme butonu ekleyen fonksiyon
function addCloseButton(li) {
  let span = document.createElement("span");
  span.textContent = "×";
  span.className = "close";
  span.onclick = function () {
    li.remove();
  };
  li.appendChild(span);

  // Yapıldı işaretleme
  li.onclick = function () {
    li.classList.toggle("checked");
  };
}

// ➕ ELEMAN EKLEME
function newElement() {
  let input = document.getElementById("task");
  let value = input.value.trim();

  // BOŞSA HATA TOAST
  if (value === "") {
    showToast("error");
    return;
  }

  // li oluştur
  let li = document.createElement("li");
  li.textContent = value;

  // listeye ekle
  document.getElementById("list").appendChild(li);

  // silme butonu ekle
  addCloseButton(li);

  // input temizle
  input.value = "";

  // başarı toast
  showToast("success");

  saveToLocal(); // local storage kaydet
}

// 🔔 TOAST GÖSTERME
function showToast(type) {
  let toast = document.querySelector("." + type);
  $(toast).toast("show");
}

// 💾 LOCAL STORAGE KAYDET
function saveToLocal() {
  let items = [];
  document.querySelectorAll("#list li").forEach(li => {
    items.push(li.childNodes[0].nodeValue);
  });

  localStorage.setItem("todoList", JSON.stringify(items));
}

// 📥 LOCAL STORAGE YÜKLE
function loadFromLocal() {
  let data = localStorage.getItem("todoList");
  if (!data) return;

  let items = JSON.parse(data);
  document.getElementById("list").innerHTML = "";

  items.forEach(text => {
    let li = document.createElement("li");
    li.textContent = text;
    document.getElementById("list").appendChild(li);
    addCloseButton(li);
  });
}

// Sayfa açılınca yükle
loadFromLocal();
