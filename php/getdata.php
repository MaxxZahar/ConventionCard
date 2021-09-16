<?php
if (isset($_GET['bid'])) {
    $bid = $_GET['bid'];
    if (file_exists("../data/bidslist.csv")) {
        $file = fopen("../data/bidslist.csv", 'r');
        $data = fgetcsv($file, 1000, ";");
        fclose($file);
        echo var_dump($data);
    }
}
