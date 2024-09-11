document.addEventListener("DOMContentLoaded", function() {
  const tocHeader = document.querySelector(".toc-header");
  const tocList = document.querySelector(".toc ul");
  const tocArrow = tocHeader.querySelector("span");

  // 目次の開閉機能
  tocHeader.addEventListener("click", function() {
      if (tocList.style.display === "none" || tocList.style.display === "") {
          tocList.style.display = "block";
          tocArrow.textContent = "▲"; // 展開時に矢印を上向きに変更
      } else {
          tocList.style.display = "none";
          tocArrow.textContent = "▼"; // 非表示時に矢印を下向きに変更
      }
  });

  // 初期状態で目次を非表示に
  tocList.style.display = "none";
  tocArrow.textContent = "▼"; // 初期状態の矢印を下向きに
});