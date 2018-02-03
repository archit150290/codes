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

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'spicybite');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'pass');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

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
define('AUTH_KEY',         'B$&$-FmH&B#:_|Olj2X_E42Kd|r!kQu;VB@X|8FU@#/4b$gT_)tMuF5&1R}bWEBE');
define('SECURE_AUTH_KEY',  'o;P&a+.>5yDzMB -ci8L#V9t4P<p^MwM-<:-,<:XB/-zi3R{S1Sk)+E56pI=N3Wf');
define('LOGGED_IN_KEY',    'xGle03mY%mRjEJol*;tP-ZYK.Fy-oYy_M_pJZ7eNRWT@S#?l*&2V;.if@HH^$RY;');
define('NONCE_KEY',        '6?`,>^O$U5pmRu7}~w}w!yIA>~qc5Nkit!][{AO@WKeJoDjwR/eZV7Uzfzn.G@<K');
define('AUTH_SALT',        'mpPA`lmPV1@hFCU.<0Ib(F|e635bEu3-c2FEL>]1Ka~(A5j):9:8BDsn8U.(),}9');
define('SECURE_AUTH_SALT', '!`~?K1ey)n==[VG3yVd^!-Q8pz5F-<x%69%]Xx+Pcw9j9,wcwG=J5LbC gXXeK| ');
define('LOGGED_IN_SALT',   ' [e1W.9Y%blr9ya^t&]87{ 9u(I?Qg3hJHi.RpBQzCS4GTbw;FOdc<s-RwF=)fFf');
define('NONCE_SALT',       'H_*+ACod%hX#Eq/$:^2IQ1#~hcY&_2~l`?ayPpU(g82&7Ro<A2GUweDHDBOgPN@p');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

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
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
