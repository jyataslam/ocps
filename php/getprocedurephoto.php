<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');


$procedures = 'Facelift';

$query = "SELECT p.id, p.procedures, p.age, p.gender, p.ethnicity, p.height, p.weight, p.description, p.details, p.date, ph.pic1, ph.pic2 FROM patients as p LEFT JOIN photos as ph ON p.id = ph.patient WHERE p.procedures = '$procedures'";




$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception('invalid query: ' . mysqli_error($conn));
}

if (mysqli_num_rows($result) === 0) {
    throw new Exception("no user");
};

if (!$result) {
    throw new Exception('invalid query: ' . mysqli_error($conn));
}

$output['success'] = true;
$output['patients'] = [];





while($row = mysqli_fetch_assoc($result)){

    $output['patients'][] = [
        'id' => $row['id'],
        'procedure' => $row['procedures'],
        'photos' => $row['pic1'],
        'photos2' => $row['pic2'],
        'age' => $row['age'],
        'gender' => $row['gender'],
        'ethnicity' => $row['ethnicity'],
        'height' => $row['height'],
        'weight' => $row['weight'],
        'desc' => $row['description'],
        'details' => $row['details'],
        ];
};


echo '<div id="procedurephotos">
        <h1>Facelift Main</h1>
    </div>';



// print_r(json_encode($output));


?>
