<?php

namespace App\Services;

use App\Models\Member;

class CheckoutService {

    public function sendSMS(Member $checkedOutMember, string $roomFromNo){
      
        $checkOutMessage = "Ndugu $checkedOutMember->name, umehamishwa kutoka chumba namba $roomFromNo, tafadhali subiri maelekezo ya chumba unachotakiwa kwenda.";

        $api_key='db927f0150db6097';
        $secret_key = 'MzAxOTBjYWQ0YTQyMGU1N2Q1ZTA1MWJlNGU2YzRjZWY4NGQ4NGE2YmJkZDM3MDVlZThiZGI0MzA5NDczMzAzNw==';
        
        $postData = array(
            'source_addr' => 'INFO',
            'encoding'=>0,
            'schedule_time' => '',
            'message' => 'HAMA CHUMBA ICHO',
            'recipients' => [array('recipient_id' => '1','dest_addr'=>'255693307286')]
        );
        
        $Url ='https://apisms.beem.africa/v1/send';
        
        $ch = curl_init($Url);
        error_reporting(E_ALL);
        ini_set('display_errors', 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt_array($ch, array(
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Authorization:Basic ' . base64_encode("$api_key:$secret_key"),
                'Content-Type: application/json'
            ),
            CURLOPT_POSTFIELDS => json_encode($postData)
        ));
        
        $response = curl_exec($ch);
        
        if($response === FALSE){
                echo $response;
        
            die(curl_error($ch));
        }
    }


}