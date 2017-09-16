<?php

/*
 * Copyright 2012-2015, Theia Smart Thumbnails, WeCodePixels, http://wecodepixels.com
 */

class TstAdmin_Dashboard {
	public $showPreview = true;

	public function echoPage() {
		$options = get_option( 'tst_dashboard' );
		$options = is_array( $options ) ? $options : array();

		?>
		<?php
		settings_fields( 'theia_smart_thumbnails_license_key' );
		?>
		<h3><?php _e( "Version", 'theia-smart-thumbnails' ); ?></h3>

		<p>
			You are using
			<a href="http://wecodepixels.com/theia-smart-thumbnails-for-wordpress/?utm_source=theia-smart-thumbnails-for-wordpress"
			   target="_blank"><b>Theia Smart Thumbnails</b></a>
			version <b class="theiaSmartThumbnails_adminVersion"><?php echo TST_VERSION; ?></b>, developed
			by
			<a href="http://wecodepixels.com/?utm_source=theia-smart-thumbnails-for-wordpress"
			   target="_blank"><b>WeCodePixels</b></a>.
			<br>
		</p>
		<br>

		<form method="post">
			<h3><?php _e( "License Key", 'theia-smart-thumbnails' ); ?></h3>

			<?php
			$this->activate_or_deactivate_license_if_necessary();
			?>

			<input id="theia_smart_thumbnails_license_key"
			       name="tst_license_key"
			       type="text"
			       class="regular-text"
			       value="<?php esc_attr_e( get_option( 'tst_license_key' ) ); ?>"
				<?php echo TstOptions::is_activated() ? 'disabled' : '' ?> />
			<?php if ( TstOptions::is_activated() ) {
				?>
				<input type="submit"
				       class="button-primary"
				       name="tst_do_deactivate_license"
				       value="Deactivate">
			<?php
			} else {
				?>
				<input type="submit"
				       class="button-primary"
				       name="tst_do_activate_license"
				       value="Activate">
			<?php
			}
			?>
		</form>

		<p>
			<?php _e( 'Be sure to enter your license key for automatic updates and support.', 'theia-smart-thumbnails' ); ?>
		</p>

		<br>

		<h3><?php _e( "Support", 'theia-smart-thumbnails' ); ?></h3>

		<p>
			1. If you have any problems or questions, you should first check
			<a href="http://wecodepixels.com/theia-smart-thumbnails-for-wordpress/docs/?utm_source=theia-smart-thumbnails-for-wordpress"
			   class="button"
			   target="_blank">
				The Documentation
			</a>
		</p>

		<form method="post" action="options.php">
			<?php settings_fields( 'tst_options_dashboard' ); ?>

			<p>
				2. If the plugin is misbehaving, try to <input name="tst_dashboard[reset_to_defaults]"
				                                               type="submit"
				                                               class="button"
				                                               value="Reset to Default Settings"
				                                               onclick="if(!confirm('Are you sure you want to reset all settings to their default values?')) return false;">
			</p>
		</form>

		<p>
			3. Deactivate all plugins. If the issue is solved, then re-activate them one-by-one to pinpoint the
			exact cause.
		</p>

		<p>
			4. If your issue persists, please proceed to
			<a <?php echo TST_IS_PRO ? 'href="http://wecodepixels.com/theia-smart-thumbnails-for-wordpress/support/?utm_source=theia-smart-thumbnails-for-wordpress"' : ''; ?>
				class="button"
				target="_blank" <?php echo TST_IS_PRO ? '' : 'disabled'; ?>>Submit a Ticket</a>
			<?php echo TstMisc::get_pro_only_notice(); ?>
		</p>
		<br>

		<h3><?php _e( "Updates and Announcements", 'theia-smart-thumbnails' ); ?></h3>
		<iframe class="theiaSmartThumbnails_news"
		        src="<?php echo TstMisc::get_request_scheme(); ?>://wecodepixels.com/theia-smart-thumbnails-for-wordpress/news"></iframe>
	<?php
	}

	public function activate_or_deactivate_license_if_necessary() {
		$action = null;
		$option = null;
		if ( array_key_exists( 'tst_do_activate_license', $_POST ) ) {
			$action = 'activate_license';
			$option = 'license_do_activate';
		} else if ( array_key_exists( 'tst_do_deactivate_license', $_POST ) ) {
			$action = 'deactivate_license';
			$option = 'license_do_deactivate';
		} else {
			return;
		}

		// Get or save license key.
		if ( array_key_exists( 'tst_license_key', $_POST ) ) {
			$license_key = $_POST['tst_license_key'];
			update_option( 'tst_license_key', $license_key );
		} else {
			$license_key = get_option( 'tst_license_key' );
		}

		// Set up API request parameters.
		$api_params = array(
			'edd_action' => $action,
			'license'    => $license_key,
			'item_name'  => urlencode( TST_EDD_ITEM_NAME ), // the name of our product in EDD,
			'url'        => home_url()
		);

		// Call API.
		$response = wp_remote_post( TST_EDD_STORE_URL, array(
			'timeout'   => 15,
			'sslverify' => false,
			'body'      => $api_params
		) );

		// Validate response.
		if ( is_wp_error( $response ) ) {
			return;
		}

		// Decode response.
		$license_data = json_decode( wp_remote_retrieve_body( $response ) );

		$is_activated = false;
		if ( $action == 'activate_license' ) {
			$is_activated = $license_data->success === true && $license_data->license == 'valid';

			if ( $is_activated ) {
				echo '<div class="updated"><p>License activated successfully. You have another ' . $license_data->activations_left . ' activations left for this key.</p></div>';
			} else {
				echo '<div class="error"><p>Activation failed. License is ' . $license_data->license . '. Error code: "' . $license_data->error . '".</p></div>';
			}
		} else {
			$is_activated = ! ( $license_data->success === true && $license_data->license == 'deactivated' );

			if ( ! $is_activated ) {
				echo '<div class="updated"><p>License deactivated successfully.</p></div>';
			} else {
				echo '<div class="error"><p>Deactivation failed.</p></div>';
			}
		}
		update_option( 'tst_license_is_activated', $is_activated );
	}
}
