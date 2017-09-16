<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

define('WP_HOME','http://192.168.5.225/tricycle');
define('WP_SITEURL','http://192.168.5.225/tricycle');

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'tricycle_db');

/** MySQL database username */
define('DB_USER', 'tricycle_user');

/** MySQL database password */
define('DB_PASSWORD', 'tricycle_pass');

/** MySQL hostname */
define('DB_HOST', 'stonex36');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '.%p]ts>gDE%%zX(Mw+U1y&%<UQgr.85fHMakO3ywh(M|NyQAXqJv,!>kv:-PwGbx');
define('SECURE_AUTH_KEY',  'TEnX:K>=#]4%HXfJejU; ^:S5XmQ8G4(<b*GOZxIP[K|J+mb9P6<_I5#U971+sOz');
define('LOGGED_IN_KEY',    '%ot4(-a3A+*@l/nQ{w6X1vwxo~KyTMIQ+:`u4>)Ce2U|AReFC)pry@z=H^|c>K=+');
define('NONCE_KEY',        'Z/IH8XST<|{.-3-tc; B b2wwCMW;%Y+)l!.{F/_QPZJ6~pGcUy9>Uv:a-p_Q~JK');
define('AUTH_SALT',        'xr0Kh`4tT)|NEx}Wqc9my+K54w-:2O)*ACu=u#l`r@%bn_s~P7JuU13dn;CB5i^{');
define('SECURE_AUTH_SALT', '!Xe]qD+u+oQ ol>;]!qRQ<H2Fjr<_?!O1.BPx?,s83V`ArzOr|8+L7CK~APvFZfC');
define('LOGGED_IN_SALT',   '/m~F|m~T%#ijFYu&7n/eV=Dm.0al93k&OnjWQ@c14Ey<|+mj++ix+%vGEYQ>F^Bt');
define('NONCE_SALT',       '7%&GfP*AB1v:Es+D~ q[G&_DC1IP^p,4$>|c^n3-wm!mTwaCz.c2lxlIt!*v]pX|');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'try_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
