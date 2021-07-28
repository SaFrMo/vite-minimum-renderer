import { createRenderer, Component, RendererOptions } from '@vue/runtime-core'
import { normalizeContainer } from './utils'

const nodeOps: RendererOptions = {
    patchProp() {

    },
    insert(el, parent, anchor) {
        parent.insertBefore(el, anchor || null)

    },
    remove() {

    },
    createElement(type, isSvg, isCustomizedBuiltIn, vnodeProps) {
        console.log(vnodeProps)
        const output = document.createElement(type)
        output.classList.add('custom-renderer')
        // output
        return output

    },
    createText(text) {
        return document.createTextNode(text)
    },
    createComment(text) {
        return document.createComment(text)
    },
    setText(node, text) {
        node.innerText = text
    },
    setElementText(node, text) {
        node.innerText = text
    },
    parentNode(node) {
        return node.parentNode
    },
    nextSibling(node) {
        return node.nextSibling
    },
}

export const createApp = ((root: Component) => {
    const app = createRenderer(nodeOps).createApp(root)
    const { mount } = app
    app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
        const container = normalizeContainer(containerOrSelector)
        if (!container) return

        const proxy = mount(container, false, container instanceof SVGElement)

        return proxy
    }
    return app
}
)