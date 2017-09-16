<?php

/*
 * Copyright 2012-2015, Theia Smart Thumbnails, WeCodePixels, http://wecodepixels.com
 */

class TstAdmin_Sizes {
	public function echoPage() {
		$sizes            = TstMisc::get_image_sizes();
		$images_url       = plugin_dir_url( __FILE__ ) . '/images/';
		$disabled_if_free = TST_IS_PRO ? '' : 'disabled';

		?>
		<form method="post" action="options.php">
			<?php
			settings_fields( 'tst_options_sizes' );
			$options = get_option( 'tst_sizes' );
			$options = is_array( $options ) ? $options : array();

			?>

			<h3><?php _e( "Thumbnail sizes", 'theia-smart-thumbnails' ); ?> <?php echo TstMisc::get_pro_only_notice(); ?></h3>

			<?php TstMisc::echo_regenerate_all_thumbnails_notice(); ?>

			<table class="tst_sizesTable">
				<tr>
					<th>
						Thumbnail ID
					</th>
					<th>
						Size
					</th>
					<th>
						Use focus point <a href="#aboutFocusPoint">(?)</a>
					</th>
					<th>
						Crop
					</th>
					<th>
						Crop-to-Fit <a href="#aboutCropToFit">(?)</a>
					</th>
					<th>
						Crop-to-Fit background color <a href="#aboutCropToFit">(?)</a>
					</th>
				</tr>

				<?php foreach ( $sizes as $key => $value ): ?>
					<?php
					$use_focus_point_name = 'use_focus_point_' . $key;
					$crop_to_fit_name     = 'crop_to_fit_' . $key;
					$sizes_options        = TstOptions::get_sizes_options_for_thumbnail( $key );
					?>


					<tr>
						<td>
							<?php echo $key; ?>
						</td>
						<td>
							<?php echo $value['width'] . '&times;' . $value['height']; ?>
						</td>
						<td>
							<select name="tst_sizes[<?php echo $use_focus_point_name; ?>]"<?php echo $disabled_if_free; ?>>
								<?php
								foreach ( TstOptions::get_use_focus_point_options() as $option_key => $option_value ) {
									echo '<option value="' . $option_key . '"' . ( $sizes_options['use_focus_point_mode'] == $option_key ? 'selected' : '' ) . '>' . $option_value . '</option>';
								}
								?>
							</select>
						</td>
						<td>
							<?php echo $value['crop'] ? 'Yes' : 'No'; ?>
						</td>
						<td>
							<?php if ( $value['crop'] ) : ?>
								<select name="tst_sizes[<?php echo $crop_to_fit_name; ?>]"<?php echo $disabled_if_free; ?>>
									<?php
									foreach ( TstOptions::get_crop_to_fit_options() as $option_key => $option_value ) {
										echo '<option value="' . $option_key . '"' . ( $sizes_options['crop_to_fit_mode'] == $option_key ? 'selected' : '' ) . '>' . $option_value . '</option>';
									}
									?>
								</select>
							<?php else: ?>
								-
							<?php endif; ?>
						</td>
						<td>
							<?php if ( $value['crop'] ) : ?>
								<input type="text"
								       id="tst_cropToFitColor_<?php echo $key; ?>"
								       name="tst_sizes[<?php echo $crop_to_fit_name; ?>_background_color]"
								       value="<?php echo $sizes_options['crop_to_fit_background_color']; ?>"
									<?php echo $disabled_if_free; ?>>
								<script>
									jQuery(document).ready(function ($) {
										$('#tst_cropToFitColor_<?php echo $key; ?>').wpColorPicker();
									});
								</script>
							<?php else: ?>
								-
							<?php endif; ?>
						</td>
					</tr>
				<?php endforeach; ?>
			</table>

			<p class="submit">
				<input type="submit"
				       class="button-primary"
				       value="<?php _e( 'Save All Changes', 'theia-smart-thumbnails' ) ?>"
					<?php echo $disabled_if_free; ?>/>
			</p>
		</form>

		<h3 id="aboutFocusPoint">About focus points <?php echo TstMisc::get_pro_only_notice(); ?></h3>
		<p>
			Focus points can be set for each image individually, and will determine how its thumbnails are cropped.
		</p>
		<table class="tst_aboutCropToFit">
			<tr>
				<td>
					<img src="<?php echo $images_url; ?>use-focus-point-original.png">
					<br>
					Original
				</td>
				<td>
					<img src="<?php echo $images_url; ?>use-focus-point-before.png">
					<br>
					Without focus point
				</td>
				<td>
					<img src="<?php echo $images_url; ?>use-focus-point-after.png">
					<br>
					With focus point
				</td>
			</tr>
		</table>
		<br>

		<h3 id="aboutCropToFit">About Crop-to-Fit    <?php echo TstMisc::get_pro_only_notice(); ?></h3>
		<p>
			Enable this option for thumbnails that must to be of a fixed size, but without being cropped. Instead, the
			images will be resized and then filled with the specified background color.
		</p>
		<table class="tst_aboutCropToFit">
			<tr>
				<td>
					<img src="<?php echo $images_url; ?>crop-to-fit-original.png">
					<br>
					Original
				</td>
				<td>
					<img src="<?php echo $images_url; ?>crop-to-fit-before.png">
					<br>
					Crop
				</td>
				<td>
					<img src="<?php echo $images_url; ?>crop-to-fit-after.png">
					<br>
					Crop to fit
				</td>
			</tr>
		</table>
	<?php
	}
}