import { createRouter, createWebHistory } from 'vue-router'

export const ROLE_USER = 'ROLE_USER'
export const ROLE_ADMIN = 'ROLE_ADMIN'

const routes = [
  {
    path: '/workpanel',
    name: 'workpanel',
    component: () => import('../views/WorkPanel.vue'),
    redirect: '/workdesc',
    children: [
      {
        path: '/workdesc/:jobId',
        name: 'workdesc',
        component: () => import('../components/work/workDesc.vue'),
        props: true
      },
      {
        path: '/questionnaire/:jobId',
        name: 'questionnaire',
        component: () => import('../components/work/questionnaire.vue'),
        props: true
      },
      {
        path: '/check/:jobId',
        name: 'check',
        component: () => import('../components/work/check.vue'),
        props: true
      },
      {
        path: '/workdo2/:jobId',
        name: 'workdo',
        component: () => import('../components/work/workDo2.vue'),
        props: true
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User.vue'),
    meta: {
      roles: [ROLE_USER]
    },
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('../components/Welcome.vue')
      },
      {
        path: '/availablejobs',
        component: () => import('../components/AvailableJobs.vue')
      },
      {
        path: '/myreward',
        component: () => import('../components/MyReward.vue')
      },
      {
        path: '/rewardrank',
        component: () => import('../components/RewardRank.vue')
      },
      {
        path: '/workhistory',
        component: () => import('../components/WorkHistory.vue')
      },
      {
        path: '/infoedit',
        component: () => import('../components/InfoEdit.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      roles: [ROLE_ADMIN]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
