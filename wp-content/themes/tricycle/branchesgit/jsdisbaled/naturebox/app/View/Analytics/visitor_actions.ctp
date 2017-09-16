<script>
    var data_tables = <?php echo json_encode($tables); ?>;
</script>
<?php //pr($tables); ?>
<div  ng-controller="dashboard" ng-init="">

    <div class="row">
        <div class="col-md-7">
            <table  class="table table-hover">
                <thead>
                    <tr>
                        <th style="width:50%" widthx="150px;">Snack Category</th>
                        <th style="width:25%" ># Clicks</th>
                        <th style="width:25%" widthx="150px;"># Add To Pantry</th>

                    </tr>

                </thead>
            </table>
            <div style="heightx: 220px; overflow-y:auto;  margin-top:-20px;">
                <table class="table table-hover">
                    <tbody style="">
                        <tr ng-repeat="(cat,item) in tables.category.rows">

                            <td style="width:50%" class="text-capitalize"> {{cat}} </td>
                            <td style="width:25%" widthx="150px;"> {{item.clicks}} </td>
                            <td style="width:25%" widthx="150px;" align="right"> {{item.added_to_pantry}} </td>

                        </tr>


                    </tbody>
                </table>
            </div>

        </div>
        <div class="col-md-5">Graph</div>
    </div>

    <h3>Tile Position</h3>
    <div class="row">

        <div class="col-md-7">
            <table  class="table table-hover">
                <thead>
                    <tr >
                        <th>Snack Category</th>
                        <th ng-repeat="item in tables.tile_position.cols">{{item}}</th>
                    </tr>

                </thead>
            </table>

            <div style="height: 220px; overflow-y:auto;  margin-top:-20px;">
                <table class="table table-hover">
                    <tbody style="">
                        <tr ng-repeat="(cat,item) in tables.tile_position.rows">

                            <td style="width:40%" class="text-capitalize"> {{cat}} </td>
                            <td ng-repeat="colItem in tables.tile_position.cols">{{item[colItem] ? item[colItem] : 0}}</td>    

                        </tr>


                    </tbody>
                </table>
            </div> 

        </div>
        <div class="col-md-5">Graph</div>
    </div>

    <h3>Products</h3>
    <div class="row">
        <div class="col-md-7">
            <table  class="table table-hover">
                <thead>
                    <tr>
                        <th style="" >Snack Name</th>
                        <th style="" >View Nutrition</th>
                        <th style="">More Info</th>
                        <th style="">Added to Cart</th>
                        <th style="">Removed from Cart</th>

                    </tr>

                </thead>
            </table>
            
            <hr />
            <div style="height: 500px; overflow-y:auto;  margin-top:-20px;">
                <table class="table table-hover">
                    <tbody style="">
                    <tbody ng-repeat="(cat, dataset) in tables.product">
                        <tr >
                            <td class="text-capitalize"><strong>{{cat}}</strong></td>
                            
                            <td ><strong>{{dataset.total_clicks["product_more_info"]}}</strong></td>
                            <td ><strong>{{dataset.total_clicks["product_nutrition"]}}</strong></td>
                            <td ><strong>{{dataset.total_clicks["added_to_pantry"]}}</strong></td>
                            <td ><strong>{{dataset.total_clicks["removed_from_pantry"]}}</strong></td>

                        </tr>
                        <tr ng-repeat="(key,item) in dataset.products.row">
                            <td class="text-capitalize">&nbsp;&nbsp;&nbsp;{{key}}</td>
                            <td >{{item["product_more_info"]}}</td>
                            <td >{{item["product_nutrition"]}}</td>
                            <td >{{item["added_to_pantry"]}}</td>
                            <td >{{item["removed_from_pantry"]}}</td>
                            
                        </tr>



                    </tbody>


                    </tbody>
                </table>
            </div>

        </div>
        <div class="col-md-5">Graph</div>
    </div>
    
    <h3>Ratings</h3>
    <div class="row">
        <div class="col-md-7">
            <table  class="table table-hover">
                <thead>
                    <tr>
                        <th style="width:40%" widthx="150px;">Rating</th>
                        <th  ># Clicks</th>
                        

                    </tr>

                </thead>
            </table>
            <div style="heightx: 220px; overflow-y:auto;  margin-top:-20px;">
                <table class="table table-hover">
                    <tbody style="">
                        <tr ng-repeat="(key,item) in tables.rating.rows">
                            <td style="width:40%" class="text-capitalize"> {{key}} </td>
                            <td  > {{item.value}} </td>
                        </tr>


                    </tbody>
                </table>
            </div>

        </div>
        <div class="col-md-5">Graph</div>
    </div>
    
    <h3>Snack Specs</h3>
    <div class="row">
        <div class="col-md-7">
            <table  class="table table-hover">
                <thead>
                    <tr>
                        <th style="width:40%" widthx="150px;">Snack Spec</th>
                        <th  >Cart</th>
                        

                    </tr>

                </thead>
            </table>
            <div style="heightx: 220px; overflow-y:auto;  margin-top:-20px;">
                <table class="table table-hover">
                    <tbody style="">
                        <tr ng-repeat="(key,item) in tables.snack_spec.rows">
                            <td style="width:40%" class="text-capitalize"> {{key}} </td>
                            <td  > {{item.value}} </td>
                        </tr>


                    </tbody>
                </table>
            </div>

        </div>
        <div class="col-md-5">Graph</div>
    </div>
    
    <h3>What plan is selected?</h3>
    <div class="row">
        <div class="col-md-7">
            <table  class="table table-hover">
                <thead>
                    <tr>
                        <th style="width:40%" widthx="150px;">Plan</th>
                        <th  ># of selection</th>
                        

                    </tr>

                </thead>
            </table>
            <div style="heightx: 220px; overflow-y:auto;  margin-top:-20px;">
                <table class="table table-hover">
                    <tbody style="">
                        <tr ng-repeat="(key,item) in tables.plan.rows">
                            <td style="width:40%" class="text-capitalize"> {{key}} </td>
                            <td  > {{item.value}} </td>
                        </tr>


                    </tbody>
                </table>
            </div>

        </div>
        <div class="col-md-5">Graph</div>
    </div>
    
    <h3>Other Events</h3>
    <div class="row">
        <div class="col-md-7">
            
            <div style="heightx: 220px; overflow-y:auto;  margin-top:20px;">
                <table class="table table-hover">
                    <tbody style="">
                        <tr ng-repeat="(key,item) in tables.plan.common">
                            <td style="width:40%" class="text-capitalize"> {{common_plan_map[key]}} </td>
                            <td  > {{item}} </td>
                        </tr>


                    </tbody>
                </table>
            </div>

        </div>
        <div class="col-md-5">Graph</div>
    </div>

   

</div>

