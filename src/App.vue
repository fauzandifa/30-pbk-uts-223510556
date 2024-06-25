<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          TUGAS PBK TEORI
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/Todos" label="Todos" />
        <q-route-tab to="/Posts" label="Posts" />
        <q-route-tab to="/Albums" label="Albums" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<style>
.q-page-container {
  background-image: url('https://i.pinimg.com/564x/91/11/b2/9111b20fcfb60c17ea4d6ca8857761d3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; /* Set tinggi minimal sebesar tinggi viewport (100% viewport height) */
}
</style>