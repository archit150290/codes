
<div id="midContent" class="popup prod-section" ng-controller="productsgrid"  ng-show="show_products == true">
    <div class="heading">&nbsp;</div>
    <div class="product_list" >



<!--div class="row">
            
            <div class="snack added-item">
                <img src="https://naturebox.com/media/catalog/product//5/4/544_square1.jpg" width="440" height="440" alt=""  class="product_img"/>
                <div class="product-desc snack-product" product-name="{{item.name}}" avg-rating="{{item.average_rating.stars}}">
                    <div class="head"> Sea Salt Pop Pops</div>
                    <div class="rating"><img src="https://naturebox.com/nm-assets/images/stars/4.svg" width="76" height="15" alt="" /></div>
                </div>
                <div class="product-topdesc snack-product"  product-name="{{item.name}}">
                    <div class="topBtn">
                        <a href="<?php echo $natureboxUrl;?>/product/{{item.url_key}}" class="itemAdd" target="_blank">Item Added To Pantry</a>
                    </div>
                    
                    <div class="more-add-item">
                    	<div class="subs"><a href="#"></a></div>
                        <input type="text" value="2"/>
                        <div class="add"><a href="#"></a></div>
                    </div>
                    
                </div>
            </div>
        </div-->




        <div class="row"  ng-repeat="productGroup in productsGroups = (products )  track by $index ">
            
            <div class="snack" ng-class="{'added-item':cart.indexOf(item.entity_id)!==-1}" ng-repeat="item in productGroup  track by $index ">
                <img src="<?php echo $productImageUrl;?>{{item.square_image}}" width="440" height="440" alt=""  class="product_img"/>
                <div class="product-desc snack-product" product-name="{{item.name}}" avg-rating="{{item.average_rating.stars}}">
                    <div class="head"> {{item.name}}</div>
                    <div class="rating"><img src="<?php echo $natureboxUrl; ?>/nm-assets/images/stars/{{item.average_rating.stars}}.svg" width="76" height="15" alt="" /></div>
                    
                    <div ng-show="cart.indexOf(item.entity_id)===-1" class="add-pantry" ng-click="add_to_pantry(item)"  >
                        <a href="javascript:void(0);" ng-class="{disabled: cart_items_count >= box_size}" ><img src="<?php echo $imagesUrl; ?>add_pantry.png" width="176" height="37" alt="" /></a>
                    </div>
                </div>
                <!--before product added-->

                <div id="before_added_{{item.entity_id}}" ng-show="cart.indexOf(item.entity_id)===-1" class="product-topdesc snack-product before_added" entity-id="{{item.entity_id}}"  product-name="{{item.name}}">
                    <div class="topBtn">
                        <a href="#" ng-click="get_product(item.entity_id,'more-info')" class="more-finfo" data-toggle="modal" >More Info</a>
                        <a href="#" class="nutrition" data-toggle="modal"  ng-click="get_product(item.entity_id,'nutrition')">Nutrition</a>
                    </div>
                    <div class="snackSpecs">
                        <img src="<?php echo $imagesUrl; ?>low_calory_icon.png" width="65" alt="" />
                        <img src="<?php echo $imagesUrl; ?>low_crab_icon.png" width="65" alt="" />
                        <img src="<?php echo $imagesUrl; ?>low_fat_icon.png" width="65" alt="" />
                    </div>
                </div>
                <!---->
                <!--After product added-->
                <div ng-show="cart.indexOf(item.entity_id)!==-1" id="after_added_{{item.entity_id}}" class="product-topdesc snack-product after_added" entity-id="{{item.entity_id}}"  product-name="{{item.name}}">
                    <div class="topBtn">
                        <a href="javascript:void(0);" class="itemAdd" target="_blank">Item Added To Pantry</a>
                    </div>                    
                    <div class="more-add-item">
                      <div class="subs icon_cnt"><a ng-click="remove_item('xxx',item.entity_id)" href="javascript:void(0);"></a></div>
                      <span class='add_count'>{{getDupCounter(item)}}</span>                      
                        <!--input id='after_added_count_{{item.entity_id}}' type="text" value="{{getDupCounter(item)}}"/-->
                        <div class="add icon_cnt"><a ng-click="add_to_pantry(item)" href="javascript:void(0);"></a></div>
                    </div>
                    
                </div>
                <!---->
            </div>
        </div>


    </div>
    
<input type='hidden' name='sku_formula' ng-bind='sku_formula' />
</div>


<!-- Modal more Info -->
<div class="modal fade" id="more-info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    
       <div class="product-modal reveal-modal open">
    <div class="product-details">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><img src="<?php echo $imagesUrl; ?>modal_close.png" alt="" /></button>
                    <div class="product-name">{{productDetails.name}}</div>
      </div>
      <div class="modal-body">
    
        <div class="row">

            <div class="col-sm-4">
                <div class="detail-image">
                    <img width="400" height="400" src="<?php echo $productImageUrl;?>{{productDetails.square_image}}">
                </div>
            </div>

            <div class="col-sm-8">
                    <div class="product-description">{{productDetails.description}}</div>
                <div class="ingredients">
                        {{productDetails.ingredients}}
                </div>
                <button ng-click="add_to_pantry(productDetails)" data-productid="709" value="add-to-pantry" class="round add-to-pantry product-id-709 ">
                            Add to pantry
                        </button>
                
            </div>
        </div>
    </div>
    </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal more Info -->
<div class="modal fade" id="nutrition_popup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    
       <div class="product-modal reveal-modal open">
    <div class="product-details">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><img src="<?php echo $imagesUrl; ?>modal_close.png" alt="" /></button>
                    <div class="product-name">{{productDetails.name}}</div>
      </div>
      <div class="modal-body">
    
        <div class="nutrition-facts">
        <div class="row">
        	<div class="col-xs-12">
            <h3>Nutrition Facts</h3>
          <div class="serving-size">Serving Size: {{productDetails.nutrition_facts.serving_size}}</div>
          <div class="serving-per-container">Serving Per Container: {{productDetails.nutrition_facts.servings_per_bag}}</div>
            </div>
        </div>
    <div class="row">
        <div class="col-sm-6"> 
          <ul class="nutrition-list">
            <li class="amount"><span>Amount Per Serving</span></li>
            <li class="calorie"><span>Calories:</span> {{productDetails.nutrition_facts.calories}} <span class="cal-fat">Cal From Fat:{{productDetails.nutrition_facts.calories_from_fat}}</span></li>
            <li class="daily-value"><span>% Daily Value* </span></li>
            <li class="small-list-container">
              <div class="list-header"><span>Total Fat:</span> {{productDetails.nutrition_facts.total_fat}} <span class="percent">{{productDetails.nutrition_facts.percent_total_fat}}</span></div>
              <ul class="inner-list">
                <li>Saturated Fat {{productDetails.nutrition_facts.saturated_fat}}<span class="percent">{{productDetails.nutrition_facts.percent_saturated_fat}}</span></li>
                <li class="inner-last">Trans Fat {{productDetails.nutrition_facts.trans_fat}}</li>
              </ul>
            </li>
            <li><span>Cholesterol</span> {{productDetails.nutrition_facts.cholesterol}} <span class="percent">{{productDetails.nutrition_facts.percent_cholesterol}}</span></li>
            <li><span>Sodium</span> {{productDetails.nutrition_facts.sodium}} <span class="percent">{{productDetails.nutrition_facts.percent_sodium}}</span></li>
            <li class="small-list-container">
              <div class="list-header"><span>Total Carb</span> {{productDetails.nutrition_facts.total_carb}} <span class="percent">{{productDetails.nutrition_facts.percent_total_carb}}</span></div>
              <ul class="inner-list">
                <li>Dietary Fiber {{productDetails.nutrition_facts.dietary_fiber}} <span class="percent">{{productDetails.nutrition_facts.percent_dietary_fiber}}</span></li>
                <li class="inner-last">Sugars {{productDetails.nutrition_facts.sugars}} </li>
              </ul>
            </li>
            <li class="last"><span>Protein</span> {{productDetails.nutrition_facts.protein}}</li>
          </ul><!--nutrition-list-->
          <div class="vitamins">
            <ul>
              <li>Vitamin A {{productDetails.nutrition_facts.vitamin_a}}</li>
              <li>Calcium {{productDetails.nutrition_facts.calcium}}</li>
            </ul>
            <ul class="second">
              <li>Vitamin C {{productDetails.nutrition_facts.vitamin_c}}</li>
              <li>Iron {{productDetails.nutrition_facts.iron}}</li>
            </ul>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="note">
            <p>*Percent Daily Values are based on a 2,000 calorie diet. Your Daily Values may be higher or lower depending on your calorie needs.</p>
          </div>
          <div class="ingredients">
            <p>Ingredients: {{productDetails.nutrition_facts.ingredients}} </p>
          </div>
          <div class="warning">
            <p>Contains: {{productDetails.nutrition_facts.allergen_warning}} </p>
          </div>
          <div class="disclosure">Packed in a facility that also processes tree nuts, peanuts, milk, wheat, egg, soy, and fish.</div>
          <br>
            <button ng-click="add_to_pantry(productDetails)" data-productid="709" value="add-to-pantry" class="round add-to-pantry product-id-709 ">
                            Add to pantry
                        </button>
        </div>
        
    </div>
    </div>
    </div>
    </div>
      </div>
    </div>
  </div>
</div>




<!-- old code starts here -->
<!-- old code starts here -->




