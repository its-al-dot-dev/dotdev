import { type UiKitThemeConfig } from '../../utils/uiKitTheme.ts'
import layout from './app/layout.ts'
import doc from './app/doc.ts'
import play from './app/play.ts'
import { tw } from './utils.ts'
import listbox from './components/listbox.ts'
import button from './components/button.ts'
import ui from './components/ui.ts'
import tag from './components/tag.ts'
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

const index: UiKitThemeConfig = {
  namespace: 'd',
  theme: 'default',
  app: tw({
    layout,
    doc,
    play,
  }),
  components: tw({
    ui,
    listbox,
    button,
    tag,
    input,
    textarea,
    group,
    avatar,
    switch: switchInput,
    checkbox,
    radio,
    'icon-button': iconButton,
    icon,
    'select-button': selectButton,
    menu,
    select,
    'select-listbox': selectListbox,
  }),
}

export default index
