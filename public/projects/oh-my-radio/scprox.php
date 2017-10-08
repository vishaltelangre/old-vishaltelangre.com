<?php

require_once 'shoutcast_stats.php';

$station_url = $_POST['url'];

$url =  parse_url($station_url);
$host = $url['host'];
$port = $url['port'];

$sc = new ShoutcastStats($host, $port);
$stats = $sc->getBasicStats();
echo json_encode( $stats );
