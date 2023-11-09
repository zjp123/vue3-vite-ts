<script lang="tsx">
import type { PropType } from 'vue'
import { ElResult, ElButton } from 'element-plus'
import { defineComponent, ref, computed, unref } from 'vue'
// import { ExceptionEnum } from '/@/enums/exceptionEnum'
// import notDataSvg from '/@/assets/svg/no-data.svg'
// import netWorkSvg from '/@/assets/svg/net-error.svg'
import { useRoute } from 'vue-router'
// import { useDesign } from '/@/hooks/web/useDesign'
// import { useGo, useRedo } from '/@/hooks/web/usePage'

const useGo: any = () => {}
const useRedo: any = () => {}

export enum ExceptionEnum {
    // page not access
    PAGE_NOT_ACCESS = 403,

    // page not found
    PAGE_NOT_FOUND = 404,

    // error
    ERROR = 500,

    // net work error
    NET_WORK_ERROR = 10000,

    // No data on the page. In fact, it is not an exception page
    PAGE_NOT_DATA = 10100
}

interface MapValue {
    title: string
    subTitle: string
    btnText?: string
    icon?: string
    handler?: any
    status?: string
}

export default defineComponent({
    name: 'ErrorPage',
    props: {
        // 状态码
        status: {
            type: Number as PropType<number>,
            default: ExceptionEnum.PAGE_NOT_FOUND
        },

        title: {
            type: String as PropType<string>,
            default: ''
        },

        subTitle: {
            type: String as PropType<string>,
            default: ''
        },

        full: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    setup(props) {
        const statusMapRef = ref(new Map<string | number, MapValue>())

        const { query } = useRoute()
        const go = useGo()
        const redo = useRedo()
        // const { t } = useI18n()
        // const { prefixCls } = useDesign('app-exception-page')

        const getStatus: any = computed(() => {
            const { status: routeStatus } = query
            const { status } = props
            return Number(routeStatus) || status
        })

        const getMapValue = computed((): MapValue => {
            return unref(statusMapRef).get(unref(getStatus)) as MapValue
        })

        const backLoginI18n = '11'
        const backHomeI18n = '22'

        unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
            title: '403',
            status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
            subTitle: '33',
            btnText: props.full ? backLoginI18n : backHomeI18n,
            handler: () => (props.full ? go('/login') : go())
        })

        unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
            title: '404',
            status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
            subTitle: '44',
            btnText: props.full ? backLoginI18n : backHomeI18n,
            handler: () => (props.full ? go('/login') : go())
        })

        unref(statusMapRef).set(ExceptionEnum.ERROR, {
            title: '500',
            status: `${ExceptionEnum.ERROR}`,
            subTitle: '55',
            btnText: backHomeI18n,
            handler: () => go()
        })

        unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
            title: '66',
            subTitle: '',
            btnText: '77',
            handler: () => redo()
            // icon: notDataSvg
        })

        unref(statusMapRef).set(ExceptionEnum.NET_WORK_ERROR, {
            // title: t('sys.exception.networkErrorTitle'),
            // subTitle: t('sys.exception.networkErrorSubTitle'),
            // btnText: t('common.redo'),
            // handler: () => redo(),
            // icon: netWorkSvg,
            title: '',
            subTitle: ''
        })

        return () => {
            const { title, subTitle, btnText, icon, handler } = unref(getMapValue) || {}
            return (
                <ElResult
                    class={'app-exception-page'}
                    title={props.title || title}
                    sub-title={props.subTitle || subTitle}
                >
                    {{
                        extra: () =>
                            btnText && (
                                <ElButton type="primary" onClick={handler}>
                                    {() => btnText}
                                </ElButton>
                            ),
                        icon: () => (icon ? <img src={icon} /> : null)
                    }}
                </ElResult>
            )
        }
    }
})
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-app-exception-page';

.@{prefix-cls} {
    display: flex;
    flex-direction: column;
    align-items: center;

    .ant-result-icon {
        img {
            max-width: 400px;
            max-height: 300px;
        }
    }
}
</style>
