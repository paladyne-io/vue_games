<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Games app </q-toolbar-title>
        <!--
        <div>Quasar v{{ $q.version }}</div>
        -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>

      <q-expansion-item icon="" label="Games" default-opened>
        <AppLink v-for="link in course2GameLinks" :key="link.title" v-bind="link" />
      </q-expansion-item>

      <q-expansion-item icon="" label="Course 1" default-closed>
        <q-item-label header>Course 1 links</q-item-label>
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

const course2GameLinks = [
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

const course2Links = [
  {
    title: ' Course 2 - Lesson 1',
    caption: 'Vue Reactivity',
    icon: 'school',
    link: 'course2_lesson1'
  },
  {
    title: ' Course 2 - Lesson 2',
    caption: 'Vue Prop and Slots',
    icon: 'school',
    link: 'course2_lesson2'
  },
  {
    title: ' Course 2 - Lesson 3a',
    caption: 'Installing a library',
    icon: 'school',
    link: 'course2_lesson3'
  },
  {
    title: ' Course 2 - Test Motion',
    caption: 'Test the motion library',
    icon: 'school',
    link: 'course2_test_motion'
  },
  {
    title: ' Course 2 - Lesson 3b Installing a charting library',
    caption: 'Vue Charts 3 (uses chart.js)',
    icon: 'school',
    link: 'course2_lesson3b'
  },
  {
    title: ' Course 2 - Lesson 4 Making the Jewel game',
    caption: 'Vuewel',
    icon: 'school',
    link: 'course2_lesson4'
  }
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
      course2Links,
      course2GameLinks,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
