import { type ThemeBuilderConfig } from 'dotdev/theme'
import ui from './components/ui.ts'
import layout from './app/layout.ts'
import doc from './app/doc.ts'
import landing from './app/landing.ts'
import listbox from './components/listbox.ts'
import scrollArea from './components/scroll-area.ts'
import breadcrumbs from './components/breadcrumbs.ts'
import accordion from './components/accordion.ts'
import button from './components/button.ts'
import tag from './components/tag.ts'
import message from './components/message.ts'
import divider from './components/divider.ts'
import input from './components/input.ts'
import textarea from './components/textarea.ts'
import group from './components/group.ts'
import selectButton from './components/select-button.ts'
import switchInput from './components/switch.ts'
import avatar from './components/avatar.ts'
import checkbox from './components/checkbox.ts'
import radio from './components/radio.ts'
import iconButton from './components/icon-button.ts'
import icon from './components/icon.ts'
import menu from './components/menu.ts'
import select from './components/select.ts'
import selectListbox from './components/select-listbox.ts'
import table from './components/table.ts'

const index: ThemeBuilderConfig = {
  namespace: 'd',
  theme: 'default',
  app: {
    layout,
    doc,
    landing,
  },
  components: {
    ui,
    accordion,
    breadcrumbs,
    button,
    icon,
    iconButton,
    listbox,
    scrollArea,
    tag,
    message,
    divider,
    input,
    textarea,
    avatar,
    switchInput,
    checkbox,
    radio,
    selectButton,
    menu,
    select,
    selectListbox,
    group,
    table,
  },
}

export default index
