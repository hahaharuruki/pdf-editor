<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/pdf-to-image">PDF to JPEG 変換</router-link></li>
        <li><router-link to="/merge-pdf">PDF 結合</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  background-color: #333;
  padding: 1rem;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
}
nav ul li {
  display: inline;
}
nav ul li a {
  color: white;
  text-decoration: none;
}
</style>