const Collection = require('../util/Collection');
const UserConnection = require('./UserConnection');
const Base = require('./Base');

/**
 * Represents a user's profile on Discord.
 */
class UserProfile extends Base {
  constructor(user, data) {
    super(user.client);

    /**
     * The owner of the profile
     * @type {User}
     */
    this.user = user;

    /**
     * The guilds that the client user and the user share
     * @type {Collection<Snowflake, Guild>}
     */
    this.mutualGuilds = new Collection();

    /**
     * The user's connections
     * @type {Collection<Snowflake, UserConnection>}
     */
    this.connections = new Collection();

    this._patch(data);
  }

  setup(data) {
    super._patch(data);
    /**
     * If the user has Discord Premium
     * @type {boolean}
     */
    this.premium = data.premium;

    /**
     * The date since which the user has had Discord Premium
     * @type {?Date}
     */
    this.premiumSince = data.premium_since ? new Date(data.premium_since) : null;

    for (const guild of data.mutual_guilds) {
      if (this.client.guilds.has(guild.id)) {
        this.mutualGuilds.set(guild.id, this.client.guilds.get(guild.id));
      }
    }
    for (const connection of data.connected_accounts) {
      this.connections.set(connection.id, new UserConnection(this.user, connection));
    }
  }
}

module.exports = UserProfile;
