import { cloneDeep, omit } from 'lodash-es'
import { Router, createRouter, createWebHistory } from 'vue-router'

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()
const LAYOUT = () => import('@/components/layout/index.vue')
let dynamicViewsModules: Record<string, () => Promise<any>>
export const EXCEPTION_COMPONENT = () => import('@/pages/exception/Exception.vue')

const getParentLayout = (_name?: string) => {
    return () =>
        new Promise((resolve) => {
            resolve({
                name: _name || 'ParentLayout'
            })
        })
}

// 将背景对象变成路由对象
export function transformObjToRoute(routeList: any[]) {
    routeList.forEach((route) => {
        const component = route.component as string
        if (component) {
            if (component.toUpperCase() === 'LAYOUT') {
                route.component = LayoutMap.get(component.toUpperCase())
            } else {
                route.children = [cloneDeep(route)]
                route.component = LAYOUT
                //某些情况下如果name如果没有值， 多个一级路由菜单会导致页面404
                if (!route.name || !route.menuName) {
                    console.warn('找不到菜单对应的name或menuName, 请检查数据!')
                }
                route.name = `${route.name || route.menuName}Parent`
                route.path = ''
                const meta = route.meta || {}
                meta.single = true
                meta.affix = false
                route.meta = meta
            }
        } else {
            console.warn('请正确配置路由：' + route?.name + '的component属性')
        }
        route.children && asyncImportRoute(route.children)
    })
    return routeList
}

// Dynamic introduction
function asyncImportRoute(routes: any) {
    dynamicViewsModules = dynamicViewsModules || import.meta.glob('../pages/**/*.{vue,tsx}')
    if (!routes) return
    routes.forEach((item: any) => {
        if (!item.component && item.meta?.frameSrc) {
            item.component = 'IFRAME'
        }
        const { component, name } = item
        const { children } = item
        if (component) {
            const layoutFound = LayoutMap.get(component.toUpperCase())
            if (layoutFound) {
                item.component = layoutFound
            } else {
                item.component = dynamicImport(dynamicViewsModules, component as string)
            }
        } else if (name) {
            item.component = getParentLayout()
        }
        children && asyncImportRoute(children)
    })
}

function dynamicImport(dynamicViewsModules: Record<string, () => Promise<any>>, component: string) {
    const keys = Object.keys(dynamicViewsModules)
    const matchKeys = keys.filter((key) => {
        const k = key.replace('../pages', '')
        const startFlag = component.startsWith('/')
        const endFlag = component.endsWith('.vue') || component.endsWith('.tsx')
        const startIndex = startFlag ? 0 : 1
        const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
        return k.substring(startIndex, lastIndex) === component
    })
    if (matchKeys?.length === 1) {
        const matchKey = matchKeys[0]
        return dynamicViewsModules[matchKey]
    } else if (matchKeys?.length > 1) {
        console.warn(
            'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
        )
        return
    } else {
        console.warn(
            '在src/pages/下找不到`' + component + '.vue` 或 `' + component + '.tsx`, 请自行创建!'
        )
        return EXCEPTION_COMPONENT
    }
}

// 将路由转换成菜单
export function transformRouteToMenu(routeModList: any[], routerMapping = false) {
    // 借助 lodash 深拷贝
    const cloneRouteModList = cloneDeep(routeModList)
    const routeList: any[] = []

    // 对路由项进行修改
    cloneRouteModList.forEach((item) => {
        if (routerMapping && item.meta.hideChildrenInMenu && typeof item.redirect === 'string') {
            item.path = item.redirect
        }

        if (item.meta?.single) {
            const realItem = item?.children?.[0]
            realItem && routeList.push(realItem)
        } else {
            routeList.push(item)
        }
    })
    // 提取树指定结构
    const list = treeMap(routeList, {
        conversion: (node: any) => {
            const { meta: { title, hideMenu = false } = {} } = node

            return {
                ...(node.meta || {}),
                meta: node.meta,
                name: title,
                hideMenu,
                path: node.path,
                ...(node.redirect ? { redirect: node.redirect } : {})
            }
        }
    })
    // 路径处理
    joinParentPath(list)
    return cloneDeep(list)
}

// 路径处理
function joinParentPath(menus: any[], parentPath = '') {
    for (let index = 0; index < menus.length; index++) {
        const menu = menus[index]
        // https://next.router.vuejs.org/guide/essentials/nested-routes.html
        // Note that nested paths that start with / will be treated as a root path.
        // 请注意，以 / 开头的嵌套路径将被视为根路径。
        // This allows you to leverage the component nesting without having to use a nested URL.
        // 这允许你利用组件嵌套，而无需使用嵌套 URL。
        if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
            // path doesn't start with /, nor is it a url, join parent path
            // 路径不以 / 开头，也不是 url，加入父路径
            menu.path = `${parentPath}/${menu.path}`
        }
        if (menu?.children?.length) {
            joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path)
        }
    }
}

export function isUrl(path: string): boolean {
    const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/
    return reg.test(path)
}

/**
 * @description: Extract tree specified structure
 * @description: 提取树指定结构
 */
export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): T[] {
    return treeData.map((item) => treeMapEach(item, opt))
}

/**
 * @description: Extract tree specified structure
 * @description: 提取树指定结构
 */
export function treeMapEach(
    data: any,
    { children = 'children', conversion }: { children?: string; conversion: Fn }
) {
    const haveChildren = Array.isArray(data[children]) && data[children].length > 0
    const conversionData = conversion(data) || {}
    if (haveChildren) {
        return {
            ...conversionData,
            [children]: data[children].map((i: number) =>
                treeMapEach(i, {
                    children,
                    conversion
                })
            )
        }
    } else {
        return {
            ...conversionData
        }
    }
}
declare interface Fn<T = any, R = T> {
    (...arg: T[]): R
}

/**
 * Convert multi-level routing to level 2 routing
 * 将多级路由转换为 2 级路由
 */
export function flatMultiLevelRoutes(routeModules: any[]) {
    const modules: any[] = cloneDeep(routeModules)

    for (let index = 0; index < modules.length; index++) {
        const routeModule = modules[index]
        // 判断级别是否 多级 路由
        if (!isMultipleRoute(routeModule)) {
            // 声明终止当前循环， 即跳过此次循环，进行下一轮
            continue
        }
        // 路由等级提升
        promoteRouteLevel(routeModule)
    }
    return modules
}

// Determine whether the level exceeds 2 levels
// 判断级别是否超过2级
function isMultipleRoute(routeModule: any) {
    // Reflect.has 与 in 操作符 相同, 用于检查一个对象(包括它原型链上)是否拥有某个属性
    if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
        return false
    }

    const children = routeModule.children

    let flag = false
    for (let index = 0; index < children.length; index++) {
        const child = children[index]
        if (child.children?.length) {
            flag = true
            break
        }
    }
    return flag
}

// Routing level upgrade
// 路由等级提升
function promoteRouteLevel(routeModule: any) {
    // Use vue-router to splice menus
    // 使用vue-router拼接菜单
    // createRouter 创建一个可以被 Vue 应用程序使用的路由实例
    let router: Router | null = createRouter({
        routes: [routeModule],
        history: createWebHistory()
    })
    // getRoutes： 获取所有 路由记录的完整列表。
    const routes = router.getRoutes()
    // 将所有子路由添加到二级路由
    addToChildren(routes, routeModule.children || [], routeModule)
    router = null

    // omit lodash的函数 对传入的item对象的children进行删除
    routeModule.children = routeModule.children?.map((item: any) => omit(item, 'children'))
}

// Add all sub-routes to the secondary route
// 将所有子路由添加到二级路由
function addToChildren(routes: any[], children: any[], routeModule: any) {
    for (let index = 0; index < children.length; index++) {
        const child = children[index]
        const route = routes.find((item) => item.name === child.name)
        if (!route) {
            continue
        }
        routeModule.children = routeModule.children || []
        if (!routeModule.children.find((item: any) => item.name === route.name)) {
            routeModule.children?.push(route)
        }
        if (child.children?.length) {
            addToChildren(routes, child.children, routeModule)
        }
    }
}
