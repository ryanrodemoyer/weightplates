<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/barbuilder">Bar Builder</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
$purple: #663399;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $purple;
    }
  }
}

.center {
  text-align: center;
}

$darkamount: 2;

$purple: #663399;

$darklavender: darken(
  $color: lavender,
  $amount: $darkamount
);

$darklightblue: darken(
  $color: lightblue,
  $amount: $darkamount
);

.btn-purple {
  color: #fff;
  background-color: $purple;
  border-color: $purple;
}

.btn-purple:hover {
  color: #fff;
  background-color: darken($color: $purple, $amount: 5);
  border-color: darken($color: $purple, $amount: 5);
}

.btn-outline-purple {
  color: $purple;
  border-color: $purple;
}

.btn-outline-purple:hover {
  color: #fff;
  background-color: $purple;
  border-color: $purple;
}

.btn-lavender {
  background-color: lavender;
  border-color: $darklavender;
}

.btn-lavender:hover {
  background-color: $darklavender;
  border-color: $darklavender;
}

.btn-lightblue {
  background-color: lightblue;
  border-color: $darklightblue;
}

.btn-lightblue:hover {
  background-color: $darklightblue;
  border-color: $darklightblue;
}
</style>
