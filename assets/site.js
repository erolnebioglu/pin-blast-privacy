(function () {
  var stored = null;
  try { stored = localStorage.getItem("lang"); } catch (e) {}
  var q = new URLSearchParams(location.search).get("lang");
  var guess = (navigator.language || "en").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
  var lang = q === "tr" || q === "en" ? q : (stored || guess);
  function apply(l) {
    document.documentElement.lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.set === l ? "true" : "false");
    });
    var t = document.querySelector('title[data-l="' + l + '"]');
    var el = document.getElementById("doc-title");
    if (el && el.dataset[l]) document.title = el.dataset[l];
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.dataset.set); });
    });
    apply(lang);
  });
  document.documentElement.lang = lang;
})();
