<!--reservation-->
	<div class="reservation book-right">
		<div class="container">
			<h3 class="w3layouts-title title-reserve">Make a Reservation</h3>
			<!--<div class="book-info">
				-->
			<div class="book-left1"></div>
			<div class="book-right1">
				<form action="#" method="post" class="book-right2">
					<div class="date-field">
						<label>Date :</label>
						<input type="text" id="datepicker" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}"
						    required="">
					</div>
					<div class="form-left">
						<label>No.of People :</label>
						<select required="">
							<option value="">1 Person</option>
							<option value="1">2 </option>
							<option value="2">3 </option>
							<option value="3">4 </option>
							<option value="4"> 5</option>
							<option value="5">More</option>
						</select>
					</div>
					<div class="form-right">
						<label>Time :</label>
						<select required="">
							<option value="">Select Time</option>
							<option value="1">10:00</option>
							<option value="2">11:00</option>
							<option value="3">12:00</option>
							<option value="4">13:00</option>
							<option value="4">14:00</option>
							<option value="4">15:00</option>
							<option value="4">16:00</option>
							<option value="4">17:00</option>
							<option value="4">18:00</option>
							<option value="4">19:00</option>
							<option value="4">20:00</option>
							<option value="4">21:00</option>
							<option value="4">22:00</option>


						</select>

					</div>
					<div class="clearfix"> </div>
					<div class="phone-info">
						<label>Contact Info :</label>
						<input type="text" placeholder="Phone Number" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Contact';}"
						    required="">
					</div>
					<input type="submit" value="Book a Table">
				</form>
			</div>

			<div class="clearfix"> </div>
		</div>
	</div>