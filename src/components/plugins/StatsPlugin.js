import ClapprStats from '@guzzj/clappr-stats-plugin'
import ClapprNerdStats from '@guzzj/clappr-nerd-stats'
export default {
  props: {
    /**
     * Options for the stats plugin. For more details se [plugins docs](https://github.com/clappr/clappr-stats)
     */
     clapprStats: {
      type: Object
    },
    /**
     * Sets if nerdsStats plugin will be used
     */
     clapprNerdStats: {
      type: Object
    }
  },
  created () {
    if (this.clapprStats || this.clapprNerdStats) {
      this.dinamicPlugins.push(ClapprStats)
      this.pluginsConfigs.clapprStats = this.clapprStats || {}
      if (this.clapprNerdStats) {
        this.dinamicPlugins.push(ClapprNerdStats)
        this.pluginsConfigs.clapprNerdStats = this.clapprNerdStats
      }
    }
  }
}