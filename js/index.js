function initMap() {
  var position = {lat: 59.938717, lng: 30.323047};
  var map = new google.maps.Map(document.querySelector('.map'), {zoom: 17, center: position});
  var icon = 'img/map-marker.png';
  var marker = new google.maps.Marker({
    position: {lat: 59.938717, lng: 30.3238},
    map: map,
    icon: icon
  });
}

// форма
var contactForm = document.querySelector('.write-us');
var popupButtonOpen = document.querySelector('.contacts-button');
var popup = document.querySelector('.modal');
var popupButtonClose = popup.querySelector(".modal-close");
var nameField = popup.querySelector("[name=name]");
var emailField = popup.querySelector("[name=email]");
var contentField = popup.querySelector("[name=email-content]");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("name");
  storageEmail= localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

popupButtonOpen.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add('modal-visible');
  if (storageName) {
    nameField.value = storageName;
    emailField.focus();
  }
  if (storageEmail) {
    emailField.value = storageEmail;
    contentField.focus();
  }
});
popupButtonClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove('modal-visible');
  popup.classList.remove("modal-error");
});
contactForm.addEventListener("submit", function (evt) {
  if (!nameField.value) {
    nameField.classList.add("field-error");
  }
  if (!emailField.value) {
    emailField.classList.add("field-error");
  }
  if (!contentField.value) {
    contentField.classList.add("field-error");
  }
  if (!nameField.value || !emailField.value || !contentField.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
    nameField.classList.remove("field-error");
    emailField.classList.remove("field-error");
    contentField.classList.remove("field-error");
    if (isStorageSupport) {
      localStorage.setItem("name", nameField.value);
      localStorage.setItem("email", emailField.value);
    }
  }
});
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-visible")) {
      popup.classList.remove("modal-visible");
      popup.classList.remove("modal-error");
    }
  }
});