import PIPPlugin from '@guzzj/clappr-pip-plugin'
export default {
  props: {
    /**
     * Enable Picture in Picture
     */
     allowPip: {
      type: Boolean
    }
  },
  created () {
    if (this.allowPip) {
      this.dinamicPlugins.push(PIPPlugin)
    }
  }
}