<!DOCTYPE html>
<html>
    <head>
        <script src="http://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="dataTables/media/js/jquery.dataTables.js"></script>
        <link rel="stylesheet" type="text/css" href="dataTables/media/css/jquery.dataTables.css">
        <link rel="stylesheet" type="text/css" href="css/custom.css">
        <title>Amp Id Export</title>
    </head>
    <body>
        <div id="divLoading" class="show"> </div>
        <?php
        $path = (@$_SERVER["HTTPS"] == "on") ? "https://" : "http://";
        $path .= $_SERVER["SERVER_NAME"] . dirname($_SERVER["PHP_SELF"]);
        echo "<table id='example' class='display' cellspacing='0' width='100%'>";
        echo "<thead><th>No.</th><th>ampid</th><th>utm_campaign(AdId)</th><th>ad_id</th></thead>";
        echo "<tfoot><th>No.</th><th>ampid</th><th>utm_campaign(AdId)</th><th>ad_id</th></tfoot>";
        echo '<div id="buttonSec">';
        echo '<button class="button downloadcsv" currentDir="' . $path . '">Download CSV</button>';
        echo '<button class="button sendEmail" currentDir="' . $path . '">Send Email</button>';
        echo '<input placeholder="Enter Email" type="email" id="emailId"></div>';
        echo "<tbody>";
        if (file_exists("files")) {
            $allFiles = scandir("files", 1);
            $currentFile = $allFiles[0];
            $file = fopen("files/" . $currentFile, "r");
            $counter = 1;
            $rebuilder = "";
            $totalData = count(file("files/" . $currentFile));
            echo '<input type="hidden" class="old" id="FileName" value=' . $currentFile . '>';
            while (!feof($file)) {
                //======check end of records
                if ($totalData == $counter)
                    break;

                if ($rebuilder == "rebuild") {
                    echo "<tr>";
                    echo "<td>" . $counter . "</td>";
                }

                foreach (fgetcsv($file) as $csvFileData) {
                    if ($csvFileData == "Amp_id") {
                        $rebuilder = "rebuild";
                        $counter--;
                        break;
                    }
                    if($csvFileData!=""){
                        echo "<td>" . $csvFileData . "</td>";
                    }
                }
                echo "</tr>";
                $counter++;
            }
            fclose($file);
        } else {
            //$OrderedList = array("amp_id", "nonce", "ts", "utm_campaign", "client", "utm_medium", "ad_id");
            $OrderedList = array("amp_id",  "utm_campaign", "ad_id");
            if ($_SERVER['QUERY_STRING'] == "refetch") {
                require 'sdk-1.6.2/sdk.class.php';
                require 'sdk-1.6.2/config.php';
                $dynamodb = new AmazonDynamoDB();
                //$dynamodb->set_region($dynamodb::REGION_US_W1);
                $timeDate = date('dy-his');
                $start_key = null;
                if (!file_exists("files")) {
                    $oldmask = umask(0);  // helpful when used in linux server
                    mkdir("files", 0777, true);
                }
                echo '<input type="hidden" class="new" id="FileName" value="contacts_' . $timeDate . '.csv">';
                $counter = 1;
                do {
                    $params = array(
                        'TableName' => 'utm_amp_tokens',
                    );

                    if ($start_key) {
                        $params['ExclusiveStartKey'] = array(
                            'HashKeyElement' => array(
                                AmazonDynamoDB::TYPE_STRING => $start_key
                            )
                        );

                        $start_key = null;
                    }
                    $response = $dynamodb->scan($params);

                    if ($response->isOK()) {
                        $value = $response->body->Items;
                        for ($i = 0; $i < count($value); $i++) {
                            echo "<tr>";
                            echo "<td>" . $counter . "</td>";
                            $testingString = '';
                            foreach ($OrderedList as $listFinal) {
                                $x = (array) $value[$i]->$listFinal;
                                if (!empty($x)) {
                                    foreach ($x as $key => $xValues) {
                                        echo "<td>" . $xValues . "</td>";
                                        $testingString .= $xValues . ",";
                                    }
                                } else {
                                    echo "<td>--</td>";
                                    $testingString .= "--,";
                                }
                            }
                            echo "</tr>";
                            if (!file_exists("files/contacts_" . $timeDate . ".csv")) {
                                $file = fopen("files/contacts_" . $timeDate . ".csv", "a");
                                $HeaderString = "Amp_id,utm_capmaign(AdId),ad_id";
                                fputcsv($file, explode(',', $HeaderString));
                            }
                            fputcsv($file, explode(',', $testingString));
                            $counter++;
                        }

                        // Get the last evaluated key if it is provided
                        if ($response->body->LastEvaluatedKey) {
                            $start_key = (string) $response->body
                                    ->LastEvaluatedKey
                                    ->HashKeyElement
                                    ->{AmazonDynamoDB::TYPE_STRING};
                        }
                    } else {
                        // Throw an exception if the response was not OK (200-level)
                        echo "<span style='color:red'>Error while connecting</span>";
                        echo "<script>";
                        echo "$('#buttonSec').css('display', 'none')";
                        echo "</script>";
                        //throw new DynamoDB_Exception('DynamoDB Scan operation failed.');
                    }
                } while ($start_key);
            } else {
                echo "<script>";
                echo "$('#buttonSec .downloadcsv, #buttonSec .sendEmail, #buttonSec #emailId').css('display', 'none')";
                echo "</script>";
                echo "<tr id='ndA'>";
                echo "<td>No data Available</td>";
                echo "<td></td>";
                echo "<td></td>";
                echo "</tr>";
            }
        }
        echo "</tbody></table>";
        ?>

        <script>
            $(document).ready(function () {
                if ($("table#example tbody").find("tr").attr("id") == "ndA") {
                    $("#buttonSec").prepend('<button class="button reFetch">Fetch</button>');
                } else {
                    $("#buttonSec").prepend('<button class="button reFetch">Refetch</button>');
                }
                //=======updating buttons
                $('#divLoading').removeClass('show');
                $(".downloadcsv,.sendEmail").attr("download-csv", $("#FileName").val());
                $('#example').DataTable({
                    //==to disable ordering of the columns
                  //  columnDefs: [{orderable: false, targets: [0, 1, 2]}],
                    //"bFilter": false
                });
                $("#divLoading").removeClass("show");

                //==on clicking download attachemnt
                $(".downloadcsv").click(function () {
                    var overallPath = $(this).attr("currentDir") + "/files/" + $(this).attr("download-csv");
                    window.open(overallPath)
                    window.close();
                });

                //==on clicking send email
                $(".sendEmail").click(function () {
                    var csvFile = $(this).attr("download-csv");
                    $(this).text("Sending...");
                    $(this).attr("disabled", "");
                    var Email = $("#emailId").val().trim();
                    if (Email == "") {
                        alert("Email ID id blank")
                        $(this).text("Send Email");
                        $(this).removeAttr("disabled");
                        return false;
                    }
                    $("#divLoading").addClass("show1");
                    console.log(Email)
                    var emailBtn = $(this);
                    $.ajax({
                        url: "ajaxController.php?action=sendEmail",
                        type: 'POST',
                        data: {file: csvFile, email: Email},
                        success: function (result) {
                            console.log(result)
                            alert(result)
                            $("#emailId").val("")
                            emailBtn.text("Send Email");
                            emailBtn.removeAttr("disabled");
                            $("#divLoading").removeClass("show1");
                        },
                        error: function (xhr, status, error) {
                            $("#divLoading").removeClass("show1");
                            console.log(error);
                        }
                    });
                });

            });
            $(document).on("click", ".reFetch", function () {

                if ($("table#example tbody").find("tr").attr("id") == "ndA") {
                    var url = window.location.href + "?refetch";
                    window.location.href = url;
                }
                //=======refetching data;
                $.ajax({
                    url: "ajaxController.php?action=reFetch",
                    type: 'POST',
                    success: function (result) {
                        console.log(result);
                        if (result == 1) {

                            var url = window.location.href;
                            window.location.href = url.split("?")[0] + "?refetch";
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(error);
                    }
                });
            })
        </script>
    </body>
</html>
