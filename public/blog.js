document.addEventListener("DOMContentLoaded", function () {
    const articleTitle = "【2024年最新版】安全性で比較!PDFを無料で編集するサービス4選（結合・抽出・圧縮・変換）";
    document.getElementById("article-title").innerText = articleTitle;
    document.getElementById("article-title-text").innerText = articleTitle;
  
    const tocHeader = document.getElementById("toc-header");
    const tocList = document.getElementById("toc-list");
    const tocToggle = document.getElementById("toc-toggle");
  
    tocHeader.addEventListener("click", function () {
      if (tocList.style.display === "none") {
        tocList.style.display = "block";
        tocToggle.innerText = "▲";
      } else {
        tocList.style.display = "none";
        tocToggle.innerText = "▼";
      }
    });
  });