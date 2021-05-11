import ScrubThumbnailsPlugin from '@guzzj/clappr-thumbnails-plugin'

export default {
  props: {
    /**
     * Options for the thumbnails plugin. For more details se [plugins docs](https://github.com/tjenkinson/clappr-thumbnails-plugin)
     */
     scrubThumbnails: {
      type: Object
    },
    /**
     * Use this option if you are using a sprite sheet for your thumbnails.
     * @param spriteSheetUrl - The url where your sprite is hosted
     * @param numThumbs - Total thumbnails in your sheet
     * @param thumbWidth - Width of a single thumbnail
     * @param thumbHeight - Height of a single thumbnail
     * @param numColumns - Number of columns of the sheet
     * @param timeInterval - Time interval between thumbnails
     */
     scrubThumbnailsFromSprite: {
      type: Object,
      validator: options => {
        return !options
          || Object.keys(options)
              .filter(o => [
                'spriteSheetUrl',
                'numThumbs',
                'thumbWidth',
                'thumbHeight',
                'numColumns',
                'timeInterval',
              ].includes(o)).length === 6
      }
    }
  },
  created () {
    if (this.scrubThumbnails) {
      this.dinamicPlugins.push(ScrubThumbnailsPlugin)
      console.log(this.scrubThumbnailsFromSprite)
      if (this.scrubThumbnailsFromSprite) {
        const mappedOptions = [
          'spriteSheetUrl',
          'numThumbs',
          'thumbWidth',
          'thumbHeight',
          'numColumns',
          'timeInterval'
        ].map(o => this.scrubThumbnailsFromSprite[o])
        const thumbs = ScrubThumbnailsPlugin.buildSpriteConfig(...mappedOptions)
        const newOptions = {
          ...this.scrubThumbnails,
          thumbs
        }
        this.pluginsConfigs.scrubThumbnails = newOptions
      } else {
        this.pluginsConfigs.scrubThumbnails = this.scrubThumbnails
      }
      this.registeredPlugins.push('scrub-thumbnails')
    }
  }
}