
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'vuewel', component: () => import('pages/VuewelGamePage.vue') },
      { path: 'test_motion', component: () => import('src/pages/TestMotionPage.vue') },
      { path: 'jumping_game1', component: () => import('src/pages/Jumping_Game1.vue') },
      { path: 'jumping_game2', component: () => import('src/pages/Jumping_Game2.vue') },
      { path: 'jumping_game3', component: () => import('src/pages/Jumping_Game3.vue') },
      { path: 'jumping_game4', component: () => import('src/pages/Jumping_Game4.vue') },
      { path: 'jumping_game5', component: () => import('src/pages/Jumping_Game5.vue') },
      { path: 'preferences', component: () => import('pages/PreferencesPage.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
