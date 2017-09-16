<div class="pantry-section" ng-controller="pantry">
    <div class="mid-section">
        <h2>Your <span>Pantry</span>
        <div class="addItem">
        <input class="knob" data-thickness=".2" data-readOnly="true" data-max="5" value="{{cart_items_count}}" data-width="36" data-height="36" data-fgColor="#fc7700" data-bgColor="#b0b0b0">
        </div>
        </h2>
        <div class="tabs">
            <div class="tabbox" ng-click="display_plan_box()">
                <strong> {{box_size}}</strong> <br/>
                Snacks
            </div>
            <div class="tabbox" ng-click="display_plan_box()">

                {{frequencies[delivery_frequency]}}
            </div>
        </div>

        <div class="pantry-item pantry-itemHeight">
            <div class="lisiting pantry-scrollHeight"  ng-show="show_plan===0 && cart_items_count > 0">
                <div class="item-box" ng-repeat="entity_id in cart track by $index">
                    <div class="overflow">
                        <div class="item"><img src='<?php echo $productImageUrl; ?>{{cart_unique_items[entity_id]["square_image"]}}' width="440" height="440" alt="" /></div>
                        <div class="item-name">{{cart_unique_items[entity_id]["name"]}}</div>
                    </div>
                    <div class="close-item" ng-click="remove_item($index,entity_id)"></div>
                </div>

            </div>
           <!--Choose Pantry Start-->

            <div class="selectPantry pantry-itemHeight" ng-show="show_plan === 1">
                <div class="choose_num">
                    <label>Choose the number of snacks per box: </label>
<div class="form clearfix">
                    <p>
                        <input type="radio" name="box_size" ng-click="setBoxsize(5)" ng-model="box_size" value="5"  id="5snack" />
                        <label for="5snack"><span>5</span> Snacks</label>
                    </p>
                    <p>
                        <input type="radio" name="box_size" ng-click="setBoxsize(10)"  ng-model="box_size" value="10"  id="10snack" />
                        <label for="10snack"><span>10</span> Snacks</label>
                    </p>
                    </div>

                </div>
                <div class="choose_freq">
                    <label>Choose your delivery frequency:  </label>

<div class="form">
                    <p>
                        <input type="radio" name="delivery_frequency" ng-click="setDeliveryFrequency('weekly')" ng-model="delivery_frequency" value="weekly" id="weekly" />
                        <label  for="weekly">Once A Week</label>
                    </p>
                    <p>

                        <input type="radio" name="delivery_frequency"  ng-click="setDeliveryFrequency('biweekly')"  ng-model="delivery_frequency" value="biweekly" id="biweekly" />
                        <label for="biweekly" >Every Two Weeks</label>
                    </p>
                    <p>
                        <input type="radio" name="delivery_frequency" ng-click="setDeliveryFrequency('monthly')"  ng-model="delivery_frequency" value="monthly" id="monthly" />
                        <label for="monthly">Once A Month</label>
                    </p>
                    </div>

                </div>
            </div>
            <!--Choose Pantry End-->
            
             <!--EMPTY Pantry Start-->
            <div class="emptyPantry pantry-itemHeight"  ng-show="show_plan===0 && cart_items_count == 0">
            		<div class="emptyBox">
                    	<div class="dashBorder">
                    		<img src="<?php echo $imagesUrl; ?>empty_icon.png" alt="" />
                        </div>
                    </div>
            </div>
            <!--EMPTY Pantry End-->
            
            
        </div>
		
        <div class="discountBg">
        <div class="discount_price">
            <p><span>50%</span> off on first box, REG <span>{{reg_prices[box_size]| currency}}</span></p>
            <div class="shipping">
                $<span>{{final_prices[box_size]}}</span>
            </div>
        </div>

        <a href="javascript:void(0)" class="btn_orange_big btn-checkout" ng-click="do_checkout()" ng-show="cart_items_count>=box_size && show_plan === 0">CheckOut</a>
        <a href="javascript:void(0)" class="btn_orange_big disabled" ng-show="cart_items_count<box_size && show_plan === 0">CheckOut</a>
         <a href="javascript:void(0)" class="btn_orange_big " ng-click="save_plan(box_size, delivery_frequency)" ng-show="show_plan === 1">Save</a>
        </div>
    </div>
</div>
