<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Test app </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> App Links </q-item-label>

        <AppLink v-for="link in appLinks" :key="link.title" v-bind="link" />
      </q-list>

      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-img> </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<!--
Need to
extras: [
  // 'ionicons-v4',
  // 'mdi-v5',
  'fontawesome-v6',
-->
<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import AppLink from 'components/AppLink.vue'

const appLinks = [
  {
    title: 'Lesson 1',
    caption: 'lesson 1',
    icon: 'school',
    link: '/'
  },
  {
    title: 'Lesson 2a',
    caption: 'lesson 2 (Review)',
    icon: 'fas fa-dog',
    link: '/lesson2a'
  },
  {
    title: 'Lesson 2b',
    caption: 'lesson 2 (Review)',
    icon: 'fas fa-dog',
    link: '/lesson2b'
  },
  {
    title: 'Lesson 3b',
    caption: 'animation',
    icon: 'fas fa-dog',
    link: '/lesson3b'
  },
  {
    title: 'Lesson 4a',
    caption: 'Adding an image carousel',
    icon: 'fas fa-image',
    link: '/lesson4a'
  },
  {
    title: 'Lesson 4b',
    caption: 'An image carousel with V-for',
    icon: 'fas fa-image',
    link: '/lesson4b'
  },
  {
    title: 'Lesson 4c',
    caption: 'Grid page',
    icon: 'fas fa-image',
    link: '/lesson4c'
  },
  {
    title: 'Navigation',
    caption: 'Using the Router',
    icon: 'school',
    link: '/test/'
  },
  {
    title: 'Preferences',
    caption: '',
    icon: 'settings',
    link: 'preferences'
  }
]

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    AppLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      appLinks,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
