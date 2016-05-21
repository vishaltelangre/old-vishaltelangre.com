<?php
class ShoutcastStats {
  private $_host,
          $port,
          $status = false,
          $error = false;
  public function __construct($host = '', $port = 8000){
    $this->setDetails( $host, $port );
  }

  public function setDetails($host = '', $port = 8000){
    $this->_host = $host;
    $this->_port = $port;
    return $this;
  }

  public function getBasicStats(){
    $doc = $this->_curl('http://' . $this->_host . ':' . $this->_port . '/7.html', false);
    $ret = new \stdClass();

    if ($doc) {
      $parts = explode(',', $doc);
        if (count($parts) > 5) {
          $ret->currentListeners = (isset($parts[0])) ? strip_tags(array_shift($parts)) : 0;
          $ret->streamStatus = (isset($parts[0])) ? array_shift($parts) : 0;
          $ret->peakListeners = (isset($parts[0])) ? array_shift($parts) : 0;
          $ret->maxListeners = (isset($parts[0])) ? array_shift($parts) : 0;
          $ret->uniqueListeners = (isset($parts[0])) ? array_shift($parts) : 0;
          $ret->bitrate = (isset($parts[0])) ? array_shift($parts) : 0;
          $ret->songTitle = strip_tags(implode(',', $parts));
          return $ret;
        } else {
          $this->_error = 'Error while loading stats: ' . $doc;
        }
    } else {
      $this->_error = 'Failed to load stats';
    }
    return false;
  }

  private function _curl($url){
    $ret = false;
    $this->_status = false;
    $this->_error = false;

    $ch = curl_init();
    if (is_resource($ch)) {
       curl_setopt($ch, CURLOPT_URL, $url);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13)');
       curl_setopt($ch, CURLOPT_TIMEOUT, 5);
       $data = curl_exec($ch);
       curl_close($ch);

      if ($data) {
        $this->_status = true;
        $ret = $data;
      } else {
          $this->_error = 'Failed to connect';
      }
    } else {
      $this->_error = 'cURL is not a resource';
    }
    return $ret;
  }
}