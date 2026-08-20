import type { Component } from 'vue'

export type HtmlLinkTarget = '_blank' | '_self' | '_parent' | '_top' | string
export type UITagElement = keyof HTMLElementTagNameMap | Component
