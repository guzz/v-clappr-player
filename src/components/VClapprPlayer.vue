<template>
  <div :id="id" :style="[{ height: playerHeight }, { width: playerWidth }]" />
</template>

<script>
import Clappr from '@clappr/player'
import YoutubePlayback from '@guzzj/clappr-youtube-playback'
import DashShakaPlayback from '@guzzj/dash-shaka-playback'
import LevelSelector from '@guzzj/level-selector'
import ClapprProps from './ClapprProps'
import Plugins from './plugins'
import './VClapprPlayer.css'
export default {
  mixins: [
    ClapprProps,
    ...Plugins
  ],
  props: {
    /**
     * Aspect ratio of the player.
     * It wil check the `width` first and calculate the `height`, if no `width` is set it will do the oposite.
     * Ex. `16 / 9`
     */
    aspectRatio: {
      type: Number
    },
    /**
     * Height of the player.
     * You can use a number or a string with `px` or `%`
     */
    height: {
      type: [Number, String]
    },
    /**
     * Width of the player.
     * You can use a number or a string with `px` or `%`
     */
    width: {
      type: [Number, String],
      default: '100%'
    }
  },
  data () {
    return {
      player: null,
      playerHeight: null,
      playerWidth: null,
      pluginsConfigs: {},
      dinamicPlugins: [],
      registeredPlugins: [],
      plugins: {},
    }
  },
  watch: {
    source (val) {
      this.loadSources(val)
    }
  },
  mounted () {
    this.mountPlayer()
  },
  methods: {
    async mountPlayer () {
      this.checkSize()
      const options = Object.assign({}, this.options, {
        source: this.source,
        width: this.playerWidth,
        height: this.playerHeight,
        plugins: [
          YoutubePlayback,
          DashShakaPlayback,
          LevelSelector,
          ...this.dinamicPlugins
        ],
        events: {
          onReady: this.onReady,
          onPlay: this.onPlay,
          onPause: this.onPause,
          onSeek: this.onSeek,
          onEnded: this.onEnded,
          onError: this.onError,
          onResize: this.onResize,
          onStop: this.onStop,
          onTimeUpdate: this.onTimeUpdate,
          onVolumeUpdate: this.onVolumeUpdate,
          onSubtitleAvailable: this.onSubtitleAvailable,
        },
        parentId: '#' + this.id,
        ...this.pluginsConfigs
      })
      delete options.parent
      this.player = new Clappr.Player(options)
      this.loadPlugins()
    },
    checkSize () {
      const isPercentage = string => typeof string === 'string' && string.includes('%')
      const formatSize = size => typeof size === 'number' ? size + 'px' : size
      this.playerWidth = this.width
      this.playerHeight = this.height
      if (this.aspectRatio) {
        if (this.playerWidth) {
          let width = this.playerWidth
          if (isPercentage(width)) {
            width = this.$el.clientWidth
          } else {
            width = parseInt(width)
          }
          this.playerHeight = formatSize(width / this.aspectRatio)
        } else if (this.playerHeight) {
          let height = this.playerHeight
          if (isPercentage(height)) {
            height = this.$el.clientHeight
          } else {
            height = parseInt(height)
          }
          this.playerWidth = formatSize(height * this.aspectRatio)
        }
      }
    },
    loadSources (source) {
      this.player.load(source)
    },
    loadPlugins () {
      for (let i = 0; this.registeredPlugins.length > i; i++) {
        const pluginName = this.registeredPlugins[i]
        this.plugins[pluginName] = this.player.getPlugin(pluginName)
      }
    }
  }
}
</script>
