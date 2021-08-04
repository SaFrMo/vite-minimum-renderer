import { createRenderer, Component, Renderer, RendererOptions, CreateAppFunction } from '@vue/runtime-core'
import { normalizeContainer } from './utils'

// lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.
let renderer: Renderer<Element | ShadowRoot>

const nodeOps: RendererOptions<Node, Element> = {
    patchProp(...args) {
        console.log('patch prop', args)
    },
    insert(el, parent, anchor) {
        console.log('insert', { el, parent, anchor })
        parent.insertBefore(el, anchor || null)
    },
    remove(el) {
        const parent = el.parentNode
        if (parent) {
            parent.removeChild(el)
        }
    },
    createElement(type, isSvg, isCustomizedBuiltIn, vnodeProps) {
        console.log('create element', { type, isSvg, isCustomizedBuiltIn, vnodeProps })
        const output = document.createElement(type)
        output.classList.add('custom-renderer')
        return output
    },
    createText(text) {
        return document.createTextNode(text)
    },
    createComment(text) {
        return document.createComment(text)
    },
    setText(node, text) {
        node.nodeValue = text
    },
    setElementText(node, text) {
        node.textContent = text
    },
    parentNode(node) {
        return node.parentNode as Element | null
    },
    nextSibling(node) {
        return node.nextSibling
    },
    querySelector: selector => document.querySelector(selector),
}

function ensureRenderer() {
    return (
        renderer ||
        (renderer = createRenderer<Node, Element | ShadowRoot>(nodeOps))
    )
}

export const createApp = ((...args) => {
    const app = ensureRenderer().createApp(...args)
    const { mount } = app
    app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
        const container = normalizeContainer(containerOrSelector)
        if (!container) return

        container.innerHTML = ''
        const proxy = mount(container, false, container instanceof SVGElement)
        console.log('proxy', proxy, container)
        if (container instanceof Element) {
            container.removeAttribute('v-cloak')
            container.setAttribute('data-v-app', '')
        }
        return proxy
    }
    console.log('app', app)
    return app
}
) as CreateAppFunction<Element>