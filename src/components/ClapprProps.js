export default {
  props: {
    /**
     * Used to specify where the player should be attached using a id of one DOM element.
     */
    id: {
      type: String,
      default: 'player'
    },
    /**
     * Sets media source URL to play. You can set the media source accordingly to existing playbacks.
     */
    source: {
      type: [String, Object],
      required: true,
      validator: source => typeof source === 'string' || !!source.url
    },
    /**
     * A list of Clappr Plugins that you want to register.
     * Check the Plugins Page for more information on plugins present in this component and how to use them.
     * Check other external plugins in [clappr docs](https://github.com/clappr/clappr#handshake-third-party-pluginsintegrations)
     */
    externalPlugins: {
      type: Array,
      default: () => []
    },
    /**
     * An `Object` with all the options that will go directly for clappr player.
     * Only 5 options don´t work: `parent`, `parentId`, `source`, `events` and `plugins`
     * For more information check [clappr docs](https://github.com/clappr/clappr-core#hammer_and_wrench-configuration)
     */
    options: {
      type: Object,
      default: () => {}
    },
  },
  methods: {
    onError () {
      /**
       * Fired when player receives an error
       */
      this.$emit('error')
    },
    onResize () {
      /**
       * Fired when player resizes
       */
      this.checkSize()
      this.$emit('resize')
    },
    onPlay () {
      /**
       * Fired when player starts to play
       */
      this.$emit('play')
    },
    onPause () {
      /**
       * Fired when player pauses
       */
      this.$emit('pause')
    },
    onStop () {
      /**
       * Fired when player stops
       */
      this.$emit('stop')
    },
    onSeek () {
      /**
       * Fired when player seeks the video
       */
      this.$emit('seek')
    },
    onEnded () {
      /**
       * Fired when player seeks the video
       */
      this.$emit('ended')
    },
    onTimeUpdate () {
      /**
       * Fired when the time is updated on player
       */
      this.$emit('time-update')
    },
    onVolumeUpdate () {
      /**
       * Fired when player updates its volume
       */
      this.$emit('volume-update')
    },
    onSubtitleAvailable () {
      /**
       * Fired when subtitles is available
       */
      this.$emit('subtitle-available')
    }
  }
}