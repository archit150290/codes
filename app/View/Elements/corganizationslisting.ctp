<?php if (isset($orgdata["organization"]) && !empty($orgdata["organization"])) { ?>

    <div class="row rec-org">
        <div class = "col-md-12">
            <?php
            //=counter to break loop after three org
            $counter = 1;
            foreach ($orgdata["organization"] as $organizationlist) {
                //====checks image, if available
                $file_headers = @get_headers($organizationlist["image"]);
                $image = ($organizationlist["image"] != "" && $file_headers[0] != 'HTTP/1.1 404 Not Found') ? $organizationlist["image"] : Router::url('/', true) . "img/big-thumb.png";
                $handClass = ($type == "public" && ($organizationlist["is_request"] != 1 && $organizationlist["is_org_joined"] != 1)) ? '' : 'no-hand';
                ?>
                <div class="col-md-4 " <?php echo ($type == "public" && ($organizationlist["is_request"] != 1 && $organizationlist["is_org_joined"] != 1)) ? 'style="cursor: pointer"' : ''; ?>>
                    <div class="text-center rec-comp <?php echo $handClass; ?>" >
                        <div class="new">
                            <?php
                            if ($type == "endorser") {
                                echo $this->Html->link($this->Html->Image($image, array("width" => "240", "height" => "250", "class" => "img-circle")), array("controller" => "client", "action" => "orginfo", $organizationlist["id"]), array('escape' => false));
                                if ($organizationlist["status"] == 0) {
                                    echo '<div class="inact-ribbon">' . $this->Html->Image("inact-ribbon.png") . '</div>';
                                }
                            } else {
                                echo $this->Html->Image($image, array("width" => "240", "height" => "250", "class" => "img-circle $handClass"));
                            }
                            ?>
                        </div>
                        <h3 class="rec-org-name">
                            <?php
                            if ($type == "endorser") {
                                echo $this->Html->link($organizationlist["name"], array("controller" => "client", "action" => "orginfo", $organizationlist["id"]));
                            } else {
                                echo $organizationlist["name"];
                            }
                            ?>
                        </h3>
                        <?php /* ?>
                          <div class="comp-discrptn"> <?php echo $organizationlist["about"];?></div>
                          <?php */ ?>
                        <?php
                        if ($type == "public") {
                            //pr($organizationlist);
                            if ($organizationlist["is_org_joined"] == 1) {
                                echo '<button type="button" disabled="disabled" class="btn btn-orange">ALREADY JOINED</button>';
                            } else if ($organizationlist["is_request"] == 1) {
                                echo '<button type="button" disabled="disabled" class="btn btn-orange">REQUEST SENT</button>';
                            } else if ($organizationlist["is_request"] == 0) {
                                echo '<button style="display:none" type="button" id="joinrequestorg" data-id = ' . $organizationlist["id"] . ' class="btn btn-orange">SEND REQUEST</button>';
                            }
                        } else if ($type == "endorser") {
                            echo '<div class = "switchbutton">';
                            if ($defaultorg == $organizationlist["id"]) {
                                echo $this->Html->Image("selected-org.png", array("class" => "defaultorg", "rel" => $organizationlist["id"]));
                            } else {
                                echo '<button data-orgid="' . $organizationlist["id"] . '" class="swtichorg btn btn-orange" type="button">Switch Org</button>';
                            }
                            echo '</div>';
                        }

                        //=check if user is a admin of an org
                        if ($type == "endorser" && $organizationlist["role"] == "admin") {
                            echo '<div title="Admin for the org" class="admin-icon">' . $this->Html->Image("admin-icon.png") . '</div>';
                        }
                        ?>
                    </div>
                </div>
                <?php
                if ($counter % 3 == 0) {
                    echo "</div></div>";
                    if (count($orgdata["organization"]) != $counter) {
                        echo "<div class='row rec-org'><div class='col-md-12'>";
                    }
                }
                $counter++;
            }
            ?>
        </div>
    </div>
<?php } ?>
