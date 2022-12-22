<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Games app </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-expansion-item icon="" label="Games" default-opened>
        <AppLink v-for="link in gameLinks" :key="link.title" v-bind="link" />
      </q-expansion-item>

      <q-expansion-item icon="" label="App preferences" default-closed>
        <AppLink v-for="link in appLinks" :key="link.title" v-bind="link" />
      </q-expansion-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import AppLink from 'components/AppLink.vue'

const gameLinks = [
  {
    title: 'Jumping Game 1',
    caption: '',
    icon: 'school',
    link: 'jumping_game1'
  },
  {
    title: 'Jumping Game 2',
    caption: '',
    icon: 'school',
    link: 'jumping_game2'
  },
  {
    title: 'Jumping Game 3',
    caption: '',
    icon: 'school',
    link: 'jumping_game3'
  },
  {
    title: 'Jumping Game 4',
    caption: '',
    icon: 'school',
    link: 'jumping_game4'
  },
  {
    title: 'Jumping Game 5',
    caption: 'With png images, counter, controls',
    icon: 'school',
    link: 'jumping_game5'
  },
  {
    title: 'Jewel (Vuewel) Game',
    caption: '',
    icon: 'school',
    link: 'vuewel'
  },
]

const appLinks = [
  {
    title: 'Preferences',
    caption: '',
    icon: 'settings',
    link: '/preferences'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    AppLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      appLinks,
      gameLinks,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
