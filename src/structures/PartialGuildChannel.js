const Constants = require('../util/Constants');
const Base = require('./Base');

/*
{ type: 0, id: '123123', name: 'heavy-testing' } }
*/

/**
 * Represents a guild channel that the client only has limited information for - e.g. from invites.
 */
class PartialGuildChannel extends Base {
  constructor(client, data) {
    super(client);
    this._patch(data);
  }

  _patch(data) {
    super._patch(data);
    /**
     * The ID of this guild channel
     * @type {Snowflake}
     */
    this.id = data.id;

    /**
     * The name of this guild channel
     * @type {string}
     */
    this.name = data.name;

    /**
     * The type of this guild channel - `text` or `voice`
     * @type {string}
     */
    this.type = Constants.ChannelTypes.TEXT === data.type ? 'text' : 'voice';
  }
}

module.exports = PartialGuildChannel;
