import ContextMenuPlugin from '@guzzj/clappr-context-menu-plugin'

export default {
  props: {
    /**
     * Options for the context menu plugin. For more details se [plugins docs](https://github.com/joaopaulovieira/clappr-context-menu-plugin)
     */
     contextMenu: {
      type: Object
    }
  },
  created () {
    if (this.contextMenu) {
      this.dinamicPlugins.push(ContextMenuPlugin)
      this.pluginsConfigs.contextMenu = this.contextMenu
      this.registeredPlugins.push('context-menu')
    }
  }
}