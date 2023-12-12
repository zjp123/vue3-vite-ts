import LAYOUT from '@/components/layout/index.vue'
// import { t } from '/@/hooks/web/useI18n'

const dashboard: any = {
    path: '/sys',
    name: '系统管理',
    component: LAYOUT,
    redirect: '/sys/roles',
    meta: {
        orderNo: 10,
        icon: 'ion:grid-outline'
        // title: t('routes.dashboard.dashboard')
    },
    children: [
        {
            path: 'roles',
            name: '角色管理',
            component: () => import('@/pages/sys/roles/index.vue'),
            meta: {
                // affix: true,
                // title: t('routes.dashboard.analysis')
            }
        },
        {
            path: 'permissions',
            name: '权限管理',
            component: () => import('@/pages/sys/permissions/index.vue'),
            meta: {
                // title: t('routes.dashboard.workbench')
            }
        }
    ]
}

export default dashboard
