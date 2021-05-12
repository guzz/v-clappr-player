import QueuePlugin from '@guzzj/clappr-queue-plugin'

export default {
  props: {
    /**
     * Options for the queue plugin. For more details se [plugins docs](https://github.com/joaopaulovieira/clappr-queue-plugin)
     */
    queue: {
      type: Object
    }
  },
  created () {
    if (this.queue) {
      this.dinamicPlugins.push(QueuePlugin)
      this.pluginsConfigs.queue = this.queue
      this.registeredPlugins.push('queue')
    }
  }
}