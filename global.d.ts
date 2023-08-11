// global.d.ts
// interface Global {
//     MY_GLOBAL_VAR: 18
// }

// declare const aaa: number

// declare const MY_GLOBAL_VAR: number

declare function myGlobalFunction(): void

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $globalVar: string // 在这里定义全局变量的类型
    }
}

declare module 'aaa' {
    const bbb: number
}
