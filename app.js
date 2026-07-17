// ── Unified App — Deepfake Detection + Transcription ──────────────────────────
(function () {
  'use strict';

  // ── Constants ───────────────────────────────────────────────────────────────
  const SPEED_FACTOR = 90;
  const MIN_PROGRESS_MS = 1500;

  const DEMO_AUDIO_URL = '/deepfake/demo.mp3';
  const DEMO_STT_AUDIO_URL = '/deepfake/demo.mp3';
  const DEMO_REDACTION_AUDIO_URL = '/deepfake/call-center-redacted.mp3';
  const DEMO_REDACTION_ORIGINAL_AUDIO_URL = '/deepfake/call-center-demo.mp3';
  const DEMO_MUSIC_AUDIO_URL = '/music/case-of-spring-fever-1940.opus';
  const DEMO_REDACTION_DATA = {"filename":"call_center_conversation.mp3","text":"Thank you for calling Green Valley Health member services. This is <pii:firstname></pii:firstname> speaking on a recorded line. Can I confirm I'm speaking with <pii:firstname></pii:firstname> <pii:lastname></pii:lastname>, born <pii:date_of_birth></pii:date_of_birth>, and living at <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>? Yes, this is <pii:firstname></pii:firstname> <pii:middlename></pii:middlename> <pii:lastname></pii:lastname>. The last 4 of my Social Security number are <pii:ssn></pii:ssn>, and my member ID is <phi></phi>. Thank you, <pii:prefix_suffix></pii:prefix_suffix> <pii:lastname></pii:lastname>. For verification, can you confirm the phone number and email we have on file: <pii:phone></pii:phone>, and <pii:email></pii:email>? Yes, that's right, although my new callback number is <pii:phone></pii:phone>, and my employer is <pii:employer></pii:employer> at <pii:workplace_address></pii:workplace_address>. I see your plan is under policy number <pii:policy_number></pii:policy_number>. And the primary care physician listed is <pii:prefix_suffix></pii:prefix_suffix> <pii:firstname></pii:firstname> <pii:lastname></pii:lastname> at Buckeye Family Clinic, <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>. That's correct. I'm calling about a claim for my <phi></phi> from <phi></phi>, after I <pii:insurance_claim></pii:insurance_claim>. The diagnosis code on my paperwork says <phi></phi>, and the imaging center was <phi></phi>. I found that claim. It shows service date <phi></phi>, account number <pii:claim_number></pii:claim_number>, billed amount <pii:transaction></pii:transaction>, and it references your prior authorization number <pii:claim_number></pii:claim_number>. I also had a prescription denied. It was for <phi></phi>, prescribed by <pii:prefix_suffix></pii:prefix_suffix> <pii:firstname></pii:firstname> <pii:lastname></pii:lastname> for <phi></phi>, and my pharmacy is CVS number 11472, <pii:address></pii:address>, <pii:address></pii:address>. I can see that medication request. To verify, your emergency contact is <pii:firstname></pii:firstname> <pii:lastname></pii:lastname>, <pii:emergency_contact></pii:emergency_contact>, at <pii:phone></pii:phone>, and your preferred mailing address is still <pii:mailing_address></pii:mailing_address>? Yes, and my wife's date of birth is <pii:date_of_birth></pii:date_of_birth>. Also, the hospital can fax records to my attorney, <pii:firstname></pii:firstname> <pii:middleinitial></pii:middleinitial> <pii:lastname></pii:lastname>, at <pii:phone></pii:phone>, because this relates to a workplace injury claim. Understood. I also see notes from your recent visit indicating <phi></phi>, <phi></phi>, and an <phi></phi>. The lab order was submitted under requisition number <phi></phi> from St. Anne's Outpatient Center. Thanks. Please send the appeal form to <pii:email></pii:email>, and mail a copy to <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>. If you need payment for the balance, my HSA card ending in <pii:bank_account></pii:bank_account> is available.","duration_ms":202920,"utterances":[{"utterance_uuid":"f74ac92e-3979-4c34-ae60-9d9de964cde3","text":"Thank you for calling Green Valley Health member services. This is <pii:firstname></pii:firstname> speaking on a recorded line. Can I confirm I'm speaking with <pii:firstname></pii:firstname> <pii:lastname></pii:lastname>, born <pii:date_of_birth></pii:date_of_birth>, and living at <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>?","start_ms":300,"duration_ms":17340,"speaker":1,"language":"en","words":[{"text":"Thank","start_ms":300,"duration_ms":180},{"text":"you","start_ms":480,"duration_ms":120},{"text":"for","start_ms":660,"duration_ms":60},{"text":"calling","start_ms":840,"duration_ms":240},{"text":"Green","start_ms":1320,"duration_ms":60},{"text":"Valley","start_ms":1560,"duration_ms":240},{"text":"Health","start_ms":1860,"duration_ms":180},{"text":"member","start_ms":2280,"duration_ms":60},{"text":"services.","start_ms":2580,"duration_ms":480},{"text":"This","start_ms":3360,"duration_ms":60},{"text":"is","start_ms":3480,"duration_ms":60},{"text":"","start_ms":3720,"duration_ms":300},{"text":"speaking","start_ms":4080,"duration_ms":240},{"text":"on","start_ms":4320,"duration_ms":60},{"text":"a","start_ms":4440,"duration_ms":60},{"text":"recorded","start_ms":4560,"duration_ms":300},{"text":"line.","start_ms":5100,"duration_ms":300},{"text":"Can","start_ms":6120,"duration_ms":60},{"text":"I","start_ms":6240,"duration_ms":60},{"text":"confirm","start_ms":6360,"duration_ms":180},{"text":"I'm","start_ms":6720,"duration_ms":180},{"text":"speaking","start_ms":6960,"duration_ms":180},{"text":"with","start_ms":7140,"duration_ms":60},{"text":"","start_ms":7500,"duration_ms":60},{"text":"","start_ms":7860,"duration_ms":360},{"text":"born","start_ms":8580,"duration_ms":60},{"text":"","start_ms":8880,"duration_ms":60},{"text":"","start_ms":9240,"duration_ms":480},{"text":"","start_ms":9780,"duration_ms":960},{"text":"and","start_ms":10980,"duration_ms":60},{"text":"living","start_ms":11100,"duration_ms":180},{"text":"at","start_ms":11340,"duration_ms":60},{"text":"","start_ms":11640,"duration_ms":780},{"text":"","start_ms":12840,"duration_ms":240},{"text":"","start_ms":13140,"duration_ms":180},{"text":"","start_ms":13440,"duration_ms":420},{"text":"","start_ms":14100,"duration_ms":180},{"text":"","start_ms":14460,"duration_ms":480},{"text":"","start_ms":15240,"duration_ms":300},{"text":"","start_ms":15660,"duration_ms":420},{"text":"","start_ms":16500,"duration_ms":1140}]},{"utterance_uuid":"17420dac-9294-46d7-b3bf-d3a431ef9f8e","text":"Yes, this is <pii:firstname></pii:firstname> <pii:middlename></pii:middlename> <pii:lastname></pii:lastname>. The last 4 of my Social Security number are <pii:ssn></pii:ssn>, and my member ID is <phi></phi>.","start_ms":18300,"duration_ms":13320,"speaker":2,"language":"en","words":[{"text":"Yes,","start_ms":18300,"duration_ms":300},{"text":"this","start_ms":19500,"duration_ms":60},{"text":"is","start_ms":19620,"duration_ms":60},{"text":"","start_ms":20040,"duration_ms":60},{"text":"","start_ms":20580,"duration_ms":60},{"text":"","start_ms":20940,"duration_ms":300},{"text":"The","start_ms":21720,"duration_ms":60},{"text":"last","start_ms":21900,"duration_ms":60},{"text":"4","start_ms":22380,"duration_ms":60},{"text":"of","start_ms":22500,"duration_ms":60},{"text":"my","start_ms":22620,"duration_ms":60},{"text":"Social","start_ms":22920,"duration_ms":60},{"text":"Security","start_ms":23220,"duration_ms":300},{"text":"number","start_ms":23700,"duration_ms":60},{"text":"are","start_ms":24000,"duration_ms":60},{"text":"","start_ms":24360,"duration_ms":1260},{"text":"and","start_ms":25920,"duration_ms":60},{"text":"my","start_ms":26040,"duration_ms":60},{"text":"member","start_ms":26280,"duration_ms":60},{"text":"ID","start_ms":26640,"duration_ms":240},{"text":"is","start_ms":26940,"duration_ms":60},{"text":"","start_ms":27360,"duration_ms":4260}]},{"utterance_uuid":"863ab9c9-e2e2-4c51-b36d-37a7cf68f4e6","text":"Thank you, <pii:prefix_suffix></pii:prefix_suffix> <pii:lastname></pii:lastname>. For verification, can you confirm the phone number and email we have on file: <pii:phone></pii:phone>, and <pii:email></pii:email>?","start_ms":32100,"duration_ms":15300,"speaker":1,"language":"en","words":[{"text":"Thank","start_ms":32100,"duration_ms":120},{"text":"you,","start_ms":32280,"duration_ms":240},{"text":"","start_ms":32760,"duration_ms":60},{"text":"","start_ms":33060,"duration_ms":360},{"text":"For","start_ms":34200,"duration_ms":60},{"text":"verification,","start_ms":34320,"duration_ms":720},{"text":"can","start_ms":35160,"duration_ms":60},{"text":"you","start_ms":35220,"duration_ms":180},{"text":"confirm","start_ms":35460,"duration_ms":240},{"text":"the","start_ms":35820,"duration_ms":60},{"text":"phone","start_ms":36060,"duration_ms":180},{"text":"number","start_ms":36300,"duration_ms":60},{"text":"and","start_ms":36660,"duration_ms":60},{"text":"email","start_ms":36960,"duration_ms":240},{"text":"we","start_ms":37260,"duration_ms":60},{"text":"have","start_ms":37440,"duration_ms":60},{"text":"on","start_ms":37620,"duration_ms":60},{"text":"file:","start_ms":37980,"duration_ms":420},{"text":"","start_ms":39120,"duration_ms":4140},{"text":"and","start_ms":43680,"duration_ms":60},{"text":"","start_ms":43980,"duration_ms":3420}]},{"utterance_uuid":"dfb1b2ac-3181-4dad-b905-b5010e7368ce","text":"Yes, that's right, although my new callback number is <pii:phone></pii:phone>, and my employer is <pii:employer></pii:employer> at <pii:workplace_address></pii:workplace_address>.","start_ms":47700,"duration_ms":12240,"speaker":2,"language":"en","words":[{"text":"Yes,","start_ms":47700,"duration_ms":240},{"text":"that'sright,","start_ms":48120,"duration_ms":600},{"text":"although","start_ms":49020,"duration_ms":120},{"text":"my","start_ms":49260,"duration_ms":60},{"text":"new","start_ms":49440,"duration_ms":60},{"text":"callback","start_ms":49620,"duration_ms":300},{"text":"number","start_ms":50100,"duration_ms":60},{"text":"is","start_ms":50340,"duration_ms":60},{"text":"","start_ms":50700,"duration_ms":3300},{"text":"and","start_ms":54120,"duration_ms":60},{"text":"my","start_ms":54240,"duration_ms":60},{"text":"employer","start_ms":54360,"duration_ms":300},{"text":"is","start_ms":54780,"duration_ms":60},{"text":"","start_ms":55140,"duration_ms":300},{"text":"","start_ms":55620,"duration_ms":360},{"text":"","start_ms":56160,"duration_ms":60},{"text":"at","start_ms":56820,"duration_ms":60},{"text":"","start_ms":57000,"duration_ms":720},{"text":"","start_ms":57900,"duration_ms":240},{"text":"","start_ms":58260,"duration_ms":300},{"text":"","start_ms":59160,"duration_ms":300},{"text":"","start_ms":59580,"duration_ms":360}]},{"utterance_uuid":"5b16a23c-d4da-492c-bb0b-11d2b9ad1cf6","text":"I see your plan is under policy number <pii:policy_number></pii:policy_number>. And the primary care physician listed is <pii:prefix_suffix></pii:prefix_suffix> <pii:firstname></pii:firstname> <pii:lastname></pii:lastname> at Buckeye Family Clinic, <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>.","start_ms":60600,"duration_ms":17820,"speaker":1,"language":"en","words":[{"text":"I","start_ms":60600,"duration_ms":60},{"text":"see","start_ms":60720,"duration_ms":120},{"text":"your","start_ms":60900,"duration_ms":120},{"text":"plan","start_ms":61140,"duration_ms":60},{"text":"is","start_ms":61260,"duration_ms":60},{"text":"under","start_ms":61440,"duration_ms":60},{"text":"policy","start_ms":61860,"duration_ms":240},{"text":"number","start_ms":62220,"duration_ms":60},{"text":"","start_ms":62700,"duration_ms":4680},{"text":"And","start_ms":68220,"duration_ms":60},{"text":"the","start_ms":68340,"duration_ms":60},{"text":"primary","start_ms":68520,"duration_ms":300},{"text":"care","start_ms":68940,"duration_ms":60},{"text":"physician","start_ms":69120,"duration_ms":240},{"text":"listed","start_ms":69600,"duration_ms":240},{"text":"is","start_ms":69900,"duration_ms":60},{"text":"","start_ms":70200,"duration_ms":60},{"text":"","start_ms":70620,"duration_ms":300},{"text":"","start_ms":71040,"duration_ms":360},{"text":"at","start_ms":71760,"duration_ms":60},{"text":"Buckeye","start_ms":72060,"duration_ms":300},{"text":"Family","start_ms":72480,"duration_ms":180},{"text":"Clinic,","start_ms":72720,"duration_ms":360},{"text":"","start_ms":74100,"duration_ms":360},{"text":"","start_ms":74700,"duration_ms":60},{"text":"","start_ms":75000,"duration_ms":180},{"text":"","start_ms":75240,"duration_ms":300},{"text":"","start_ms":76020,"duration_ms":360},{"text":"","start_ms":76500,"duration_ms":420},{"text":"","start_ms":77280,"duration_ms":1140}]},{"utterance_uuid":"7d601d0f-36d8-40cd-9ec4-503ac3564fdd","text":"That's correct. I'm calling about a claim for my <phi></phi> from <phi></phi>, after I <pii:insurance_claim></pii:insurance_claim>. The diagnosis code on my paperwork says <phi></phi>, and the imaging center was <phi></phi>.","start_ms":78720,"duration_ms":15060,"speaker":2,"language":"en","words":[{"text":"That's","start_ms":78720,"duration_ms":120},{"text":"correct.","start_ms":78960,"duration_ms":360},{"text":"I'm","start_ms":79620,"duration_ms":180},{"text":"calling","start_ms":79860,"duration_ms":180},{"text":"about","start_ms":80100,"duration_ms":60},{"text":"a","start_ms":80400,"duration_ms":60},{"text":"claim","start_ms":80580,"duration_ms":180},{"text":"for","start_ms":80820,"duration_ms":60},{"text":"my","start_ms":80940,"duration_ms":60},{"text":"","start_ms":81300,"duration_ms":360},{"text":"from","start_ms":81720,"duration_ms":60},{"text":"","start_ms":82020,"duration_ms":60},{"text":"","start_ms":82380,"duration_ms":240},{"text":"","start_ms":82680,"duration_ms":1020},{"text":"after","start_ms":83940,"duration_ms":60},{"text":"I","start_ms":84180,"duration_ms":60},{"text":"","start_ms":84360,"duration_ms":240},{"text":"","start_ms":84660,"duration_ms":60},{"text":"","start_ms":84840,"duration_ms":120},{"text":"","start_ms":85080,"duration_ms":60},{"text":"","start_ms":85440,"duration_ms":240},{"text":"","start_ms":85800,"duration_ms":600},{"text":"The","start_ms":86940,"duration_ms":60},{"text":"diagnosis","start_ms":87120,"duration_ms":540},{"text":"code","start_ms":87840,"duration_ms":120},{"text":"on","start_ms":88020,"duration_ms":60},{"text":"my","start_ms":88140,"duration_ms":60},{"text":"paperwork","start_ms":88260,"duration_ms":360},{"text":"says","start_ms":88800,"duration_ms":120},{"text":"","start_ms":89160,"duration_ms":1620},{"text":"and","start_ms":91080,"duration_ms":60},{"text":"the","start_ms":91200,"duration_ms":60},{"text":"imaging","start_ms":91260,"duration_ms":300},{"text":"center","start_ms":91740,"duration_ms":180},{"text":"was","start_ms":91980,"duration_ms":60},{"text":"","start_ms":92220,"duration_ms":420},{"text":"","start_ms":92820,"duration_ms":480},{"text":"","start_ms":93420,"duration_ms":360}]},{"utterance_uuid":"892edd4b-198c-46c0-a65b-f5a5b933852b","text":"I found that claim. It shows service date <phi></phi>, account number <pii:claim_number></pii:claim_number>, billed amount <pii:transaction></pii:transaction>, and it references your prior authorization number <pii:claim_number></pii:claim_number>.","start_ms":94200,"duration_ms":19380,"speaker":1,"language":"en","words":[{"text":"I","start_ms":94200,"duration_ms":60},{"text":"found","start_ms":94380,"duration_ms":60},{"text":"that","start_ms":94680,"duration_ms":60},{"text":"claim.","start_ms":94980,"duration_ms":540},{"text":"It","start_ms":95820,"duration_ms":60},{"text":"shows","start_ms":96000,"duration_ms":240},{"text":"service","start_ms":96420,"duration_ms":60},{"text":"date","start_ms":96840,"duration_ms":300},{"text":"","start_ms":97500,"duration_ms":3120},{"text":"account","start_ms":101040,"duration_ms":240},{"text":"number","start_ms":101340,"duration_ms":60},{"text":"","start_ms":101820,"duration_ms":3360},{"text":"billed","start_ms":105600,"duration_ms":180},{"text":"amount","start_ms":105840,"duration_ms":240},{"text":"","start_ms":106260,"duration_ms":1800},{"text":"and","start_ms":108420,"duration_ms":60},{"text":"it","start_ms":108540,"duration_ms":60},{"text":"references","start_ms":108660,"duration_ms":420},{"text":"your","start_ms":109080,"duration_ms":180},{"text":"prior","start_ms":109440,"duration_ms":180},{"text":"authorization","start_ms":109740,"duration_ms":480},{"text":"number","start_ms":110340,"duration_ms":60},{"text":"","start_ms":110820,"duration_ms":2760}]},{"utterance_uuid":"0cf5c5e0-ebe5-4941-8784-ae09b005d9f8","text":"I also had a prescription denied. It was for <phi></phi>, prescribed by <pii:prefix_suffix></pii:prefix_suffix> <pii:firstname></pii:firstname> <pii:lastname></pii:lastname> for <phi></phi>, and my pharmacy is CVS number 11472, <pii:address></pii:address>, <pii:address></pii:address>.","start_ms":114060,"duration_ms":16440,"speaker":2,"language":"en","words":[{"text":"I","start_ms":114060,"duration_ms":60},{"text":"also","start_ms":114180,"duration_ms":60},{"text":"had","start_ms":114480,"duration_ms":60},{"text":"a","start_ms":114660,"duration_ms":60},{"text":"prescription","start_ms":114840,"duration_ms":240},{"text":"denied.","start_ms":115560,"duration_ms":540},{"text":"It","start_ms":116760,"duration_ms":60},{"text":"was","start_ms":116820,"duration_ms":60},{"text":"for","start_ms":117000,"duration_ms":60},{"text":"","start_ms":117360,"duration_ms":660},{"text":"","start_ms":118260,"duration_ms":420},{"text":"","start_ms":118740,"duration_ms":300},{"text":"prescribed","start_ms":119820,"duration_ms":360},{"text":"by","start_ms":120240,"duration_ms":60},{"text":"","start_ms":120600,"duration_ms":60},{"text":"","start_ms":121080,"duration_ms":300},{"text":"","start_ms":121560,"duration_ms":300},{"text":"for","start_ms":121980,"duration_ms":60},{"text":"","start_ms":122220,"duration_ms":180},{"text":"","start_ms":122520,"duration_ms":300},{"text":"and","start_ms":123300,"duration_ms":60},{"text":"my","start_ms":123420,"duration_ms":60},{"text":"pharmacy","start_ms":123600,"duration_ms":420},{"text":"is","start_ms":124080,"duration_ms":60},{"text":"CVS","start_ms":124320,"duration_ms":420},{"text":"number","start_ms":124920,"duration_ms":60},{"text":"11472,","start_ms":125280,"duration_ms":1860},{"text":"","start_ms":127320,"duration_ms":840},{"text":"","start_ms":128460,"duration_ms":60},{"text":"","start_ms":128760,"duration_ms":60},{"text":"","start_ms":129120,"duration_ms":300},{"text":"","start_ms":129660,"duration_ms":300},{"text":"","start_ms":130080,"duration_ms":420}]},{"utterance_uuid":"252a1cc4-8c5f-4c8c-9b49-68dbd371029c","text":"I can see that medication request. To verify, your emergency contact is <pii:firstname></pii:firstname> <pii:lastname></pii:lastname>, <pii:emergency_contact></pii:emergency_contact>, at <pii:phone></pii:phone>, and your preferred mailing address is still <pii:mailing_address></pii:mailing_address>?","start_ms":130980,"duration_ms":17460,"speaker":1,"language":"en","words":[{"text":"I","start_ms":130980,"duration_ms":60},{"text":"can","start_ms":131160,"duration_ms":60},{"text":"see","start_ms":131280,"duration_ms":120},{"text":"that","start_ms":131400,"duration_ms":60},{"text":"medication","start_ms":131640,"duration_ms":360},{"text":"request.","start_ms":132120,"duration_ms":540},{"text":"To","start_ms":133200,"duration_ms":60},{"text":"verify,","start_ms":133380,"duration_ms":420},{"text":"your","start_ms":134040,"duration_ms":180},{"text":"emergency","start_ms":134340,"duration_ms":360},{"text":"contact","start_ms":135000,"duration_ms":180},{"text":"is","start_ms":135300,"duration_ms":60},{"text":"","start_ms":135600,"duration_ms":300},{"text":"","start_ms":136080,"duration_ms":300},{"text":"","start_ms":136800,"duration_ms":360},{"text":"at","start_ms":137520,"duration_ms":60},{"text":"","start_ms":137820,"duration_ms":3060},{"text":"and","start_ms":141240,"duration_ms":60},{"text":"your","start_ms":141300,"duration_ms":180},{"text":"preferred","start_ms":141600,"duration_ms":180},{"text":"mailing","start_ms":141900,"duration_ms":240},{"text":"address","start_ms":142140,"duration_ms":180},{"text":"is","start_ms":142500,"duration_ms":60},{"text":"still","start_ms":142740,"duration_ms":60},{"text":"","start_ms":143460,"duration_ms":240},{"text":"","start_ms":143820,"duration_ms":240},{"text":"","start_ms":144420,"duration_ms":1200},{"text":"","start_ms":145920,"duration_ms":300},{"text":"","start_ms":146340,"duration_ms":420},{"text":"","start_ms":147180,"duration_ms":1260}]},{"utterance_uuid":"cb608214-1f67-46b1-a488-bbc95f3d5db5","text":"Yes, and my wife's date of birth is <pii:date_of_birth></pii:date_of_birth>. Also, the hospital can fax records to my attorney, <pii:firstname></pii:firstname> <pii:middleinitial></pii:middleinitial> <pii:lastname></pii:lastname>, at <pii:phone></pii:phone>, because this relates to a workplace injury claim.","start_ms":149100,"duration_ms":15300,"speaker":2,"language":"en","words":[{"text":"Yes,","start_ms":149100,"duration_ms":240},{"text":"and","start_ms":150000,"duration_ms":60},{"text":"my","start_ms":150060,"duration_ms":60},{"text":"wife's","start_ms":150240,"duration_ms":300},{"text":"date","start_ms":150600,"duration_ms":120},{"text":"of","start_ms":150720,"duration_ms":60},{"text":"birth","start_ms":150900,"duration_ms":60},{"text":"is","start_ms":151140,"duration_ms":60},{"text":"","start_ms":151380,"duration_ms":60},{"text":"","start_ms":151860,"duration_ms":360},{"text":"","start_ms":152280,"duration_ms":900},{"text":"Also,","start_ms":153960,"duration_ms":180},{"text":"the","start_ms":154140,"duration_ms":60},{"text":"hospital","start_ms":154380,"duration_ms":240},{"text":"can","start_ms":154860,"duration_ms":60},{"text":"fax","start_ms":155100,"duration_ms":180},{"text":"records","start_ms":155340,"duration_ms":300},{"text":"to","start_ms":155700,"duration_ms":60},{"text":"my","start_ms":155820,"duration_ms":60},{"text":"attorney,","start_ms":156060,"duration_ms":540},{"text":"","start_ms":156960,"duration_ms":240},{"text":"","start_ms":157320,"duration_ms":60},{"text":"","start_ms":157560,"duration_ms":240},{"text":"at","start_ms":158400,"duration_ms":60},{"text":"","start_ms":158580,"duration_ms":3300},{"text":"because","start_ms":162120,"duration_ms":180},{"text":"this","start_ms":162360,"duration_ms":60},{"text":"relates","start_ms":162540,"duration_ms":180},{"text":"to","start_ms":162780,"duration_ms":60},{"text":"a","start_ms":162960,"duration_ms":60},{"text":"workplace","start_ms":163140,"duration_ms":480},{"text":"injury","start_ms":163680,"duration_ms":300},{"text":"claim.","start_ms":164040,"duration_ms":360}]},{"utterance_uuid":"6d69879e-c350-41d7-b467-fbc2eb6d7544","text":"Understood. I also see notes from your recent visit indicating <phi></phi>, <phi></phi>, and an <phi></phi>. The lab order was submitted under requisition number <phi></phi> from St. Anne's Outpatient Center.","start_ms":165060,"duration_ms":16800,"speaker":1,"language":"en","words":[{"text":"Understood.","start_ms":165060,"duration_ms":600},{"text":"I","start_ms":165960,"duration_ms":60},{"text":"also","start_ms":166080,"duration_ms":60},{"text":"see","start_ms":166380,"duration_ms":180},{"text":"notes","start_ms":166680,"duration_ms":180},{"text":"from","start_ms":166920,"duration_ms":60},{"text":"your","start_ms":167040,"duration_ms":180},{"text":"recent","start_ms":167280,"duration_ms":180},{"text":"visit","start_ms":167580,"duration_ms":360},{"text":"indicating","start_ms":168120,"duration_ms":300},{"text":"","start_ms":168720,"duration_ms":60},{"text":"","start_ms":168960,"duration_ms":60},{"text":"","start_ms":169260,"duration_ms":540},{"text":"","start_ms":170100,"duration_ms":660},{"text":"and","start_ms":171000,"duration_ms":60},{"text":"an","start_ms":171300,"duration_ms":60},{"text":"","start_ms":171660,"duration_ms":600},{"text":"","start_ms":172320,"duration_ms":60},{"text":"","start_ms":172680,"duration_ms":1020},{"text":"The","start_ms":174180,"duration_ms":60},{"text":"lab","start_ms":174420,"duration_ms":60},{"text":"order","start_ms":174720,"duration_ms":180},{"text":"was","start_ms":174900,"duration_ms":60},{"text":"submitted","start_ms":175080,"duration_ms":420},{"text":"under","start_ms":175560,"duration_ms":60},{"text":"requisition","start_ms":175920,"duration_ms":360},{"text":"number","start_ms":176520,"duration_ms":60},{"text":"","start_ms":177000,"duration_ms":2760},{"text":"from","start_ms":180240,"duration_ms":60},{"text":"St.","start_ms":180600,"duration_ms":60},{"text":"Anne's","start_ms":180960,"duration_ms":180},{"text":"Outpatient","start_ms":181200,"duration_ms":420},{"text":"Center.","start_ms":181800,"duration_ms":60}]},{"utterance_uuid":"60658940-1288-4540-b6c5-f201cf7e4d2d","text":"Thanks. Please send the appeal form to <pii:email></pii:email>, and mail a copy to <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>. If you need payment for the balance, my HSA card ending in <pii:bank_account></pii:bank_account> is available.","start_ms":182820,"duration_ms":20100,"speaker":2,"language":"en","words":[{"text":"Thanks.","start_ms":182820,"duration_ms":360},{"text":"Please","start_ms":183660,"duration_ms":240},{"text":"send","start_ms":184020,"duration_ms":60},{"text":"the","start_ms":184200,"duration_ms":60},{"text":"appeal","start_ms":184380,"duration_ms":300},{"text":"form","start_ms":184800,"duration_ms":60},{"text":"to","start_ms":185040,"duration_ms":60},{"text":"","start_ms":185400,"duration_ms":3360},{"text":"and","start_ms":189360,"duration_ms":60},{"text":"mail","start_ms":189540,"duration_ms":180},{"text":"a","start_ms":189780,"duration_ms":60},{"text":"copy","start_ms":189900,"duration_ms":180},{"text":"to","start_ms":190140,"duration_ms":60},{"text":"","start_ms":190500,"duration_ms":780},{"text":"","start_ms":191640,"duration_ms":240},{"text":"","start_ms":191940,"duration_ms":240},{"text":"","start_ms":192300,"duration_ms":480},{"text":"","start_ms":193200,"duration_ms":240},{"text":"","start_ms":193620,"duration_ms":600},{"text":"","start_ms":194520,"duration_ms":360},{"text":"","start_ms":195000,"duration_ms":360},{"text":"","start_ms":195600,"duration_ms":1380},{"text":"If","start_ms":197520,"duration_ms":120},{"text":"you","start_ms":197640,"duration_ms":120},{"text":"need","start_ms":197760,"duration_ms":180},{"text":"payment","start_ms":198000,"duration_ms":240},{"text":"for","start_ms":198300,"duration_ms":60},{"text":"the","start_ms":198360,"duration_ms":60},{"text":"balance,","start_ms":198660,"duration_ms":540},{"text":"my","start_ms":199320,"duration_ms":60},{"text":"HSA","start_ms":199620,"duration_ms":420},{"text":"card","start_ms":200160,"duration_ms":120},{"text":"ending","start_ms":200400,"duration_ms":180},{"text":"in","start_ms":200640,"duration_ms":60},{"text":"","start_ms":200940,"duration_ms":780},{"text":"is","start_ms":202080,"duration_ms":60},{"text":"available.","start_ms":202260,"duration_ms":660}]}],"redaction_ranges":[[3640,4030],[7420,17650],[19960,21250],[24280,25630],[27280,31630],[32680,33430],[39040,47410],[50620,54010],[55060,59950],[62620,67390],[70120,71410],[74020,78430],[81220,86410],[89080,90790],[92140,93790],[97420,100630],[101740,105190],[106180,108070],[110740,113590],[117280,119050],[120520,122830],[127240,130510],[135520,140890],[143380,148450],[151300,153190],[156880,161890],[168640,173710],[176920,179770],[185320,188770],[190420,196990],[200860,201730]]};
  const DEMO_DATA = {"filename":"AIAgentFrustration.mp3","frames":[{"start_time_ms":0,"end_time_ms":4000,"verdict":"synthetic","confidence":0.9848},{"start_time_ms":4000,"end_time_ms":8000,"verdict":"synthetic","confidence":0.9571},{"start_time_ms":8000,"end_time_ms":12000,"verdict":"non-synthetic","confidence":0.9398},{"start_time_ms":12000,"end_time_ms":16000,"verdict":"synthetic","confidence":0.9595},{"start_time_ms":16000,"end_time_ms":20000,"verdict":"non-synthetic","confidence":0.8176},{"start_time_ms":20000,"end_time_ms":24000,"verdict":"non-synthetic","confidence":0.9524},{"start_time_ms":24000,"end_time_ms":28000,"verdict":"synthetic","confidence":0.9089},{"start_time_ms":28000,"end_time_ms":32000,"verdict":"synthetic","confidence":0.9696},{"start_time_ms":32000,"end_time_ms":36000,"verdict":"synthetic","confidence":0.972},{"start_time_ms":36000,"end_time_ms":40000,"verdict":"non-synthetic","confidence":0.9173},{"start_time_ms":40000,"end_time_ms":44000,"verdict":"synthetic","confidence":0.9785},{"start_time_ms":44000,"end_time_ms":48000,"verdict":"non-synthetic","confidence":0.9094},{"start_time_ms":48000,"end_time_ms":52000,"verdict":"non-synthetic","confidence":0.6542},{"start_time_ms":52000,"end_time_ms":56000,"verdict":"synthetic","confidence":0.9671},{"start_time_ms":56000,"end_time_ms":60000,"verdict":"non-synthetic","confidence":0.9443},{"start_time_ms":60000,"end_time_ms":64000,"verdict":"synthetic","confidence":0.9611},{"start_time_ms":64000,"end_time_ms":68000,"verdict":"non-synthetic","confidence":0.9418},{"start_time_ms":68000,"end_time_ms":72000,"verdict":"synthetic","confidence":0.984},{"start_time_ms":72000,"end_time_ms":76000,"verdict":"non-synthetic","confidence":0.9723},{"start_time_ms":76000,"end_time_ms":80000,"verdict":"synthetic","confidence":0.9755},{"start_time_ms":80000,"end_time_ms":84000,"verdict":"non-synthetic","confidence":0.5998},{"start_time_ms":84000,"end_time_ms":88000,"verdict":"synthetic","confidence":0.9757},{"start_time_ms":88000,"end_time_ms":92000,"verdict":"synthetic","confidence":0.9563},{"start_time_ms":92000,"end_time_ms":96000,"verdict":"non-synthetic","confidence":0.9242},{"start_time_ms":96000,"end_time_ms":97698,"verdict":"synthetic","confidence":0.9821}],"duration_ms":97698};

  const DEMO_STT_DATA = {"filename":"AIAgentFrustration.mp3","text":"Welcome to Northwest Warehouse's automated customer service system. In a few words, can you describe your reason for calling today? Track an order. Thank you. Can you provide the account ID number or the name on the account? 02738917. Thank you. Let me find your account in our system. Hello, <pii:firstname>Roger</pii:firstname>. Would you like to place an order over the phone today? No, track an order. Thank you. Please provide the item number to place an order. No, no, track an existing order. I'm sorry, I didn't quite catch that. Did you say you'd like to place an order? No. Okay. Can you describe in a few words your reason for calling today? Track an order. Thank you. Did you say you'd like to place an order over the phone? No, track, tracking. I'm sorry, I didn't quite catch that. Can you answer yes or no? No, back, undo. I'm sorry, I didn't quite catch that. Can you describe in a few words your reason for calling today? Track package. Thank you. Did you say you'd like to place an order?","duration_ms":97320,"utterances":[{"utterance_uuid":"59578ed0-acb4-4941-9c4d-b792c9a3760b","text":"Welcome to Northwest Warehouse's automated customer service system. In a few words, can you describe your reason for calling today?","start_ms":240,"duration_ms":7260,"speaker":1,"language":"en","emotion":"Calm","accent":"American","deepfake_score":0.9810000000000001},{"utterance_uuid":"0e0d034a-aef3-44a4-9ea8-9de1eca2af2b","text":"Track an order.","start_ms":9420,"duration_ms":660,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.5392},{"utterance_uuid":"2282571c-b16c-49cc-ac67-1253ddc99ff9","text":"Thank you. Can you provide the account ID number or the name on the account?","start_ms":12300,"duration_ms":4680,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9783999999999999},{"utterance_uuid":"02b1d2d1-c057-455a-ab1e-6750ee5e5f4c","text":"02738917.","start_ms":19320,"duration_ms":4620,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.2754},{"utterance_uuid":"517e8e3b-8555-419a-af55-60f112763e5b","text":"Thank you. Let me find your account in our system. Hello, <pii:firstname>Roger</pii:firstname>. Would you like to place an order over the phone today?","start_ms":25560,"duration_ms":8820,"speaker":1,"language":"en","emotion":"Interested","accent":"American","deepfake_score":0.9723333333333333},{"utterance_uuid":"46c11e6d-7ffa-44a4-bf75-21ed6482ae95","text":"No, track an order.","start_ms":36720,"duration_ms":1560,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.08640000000000003},{"utterance_uuid":"36ecffcb-834f-43a0-b822-606eddb9efeb","text":"Thank you. Please provide the item number to place an order.","start_ms":40620,"duration_ms":3660,"speaker":1,"language":"en","emotion":"Calm","accent":"American","deepfake_score":0.9796},{"utterance_uuid":"47d3b3ba-71f5-48f9-ba46-c0bdf44f2900","text":"No, no, track an existing order.","start_ms":46080,"duration_ms":2160,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.08150000000000002},{"utterance_uuid":"4ddc44b8-e4ab-4024-875c-5be369a43654","text":"I'm sorry, I didn't quite catch that. Did you say you'd like to place an order?","start_ms":50520,"duration_ms":4620,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9727},{"utterance_uuid":"00c4dfe6-ac97-4e74-809c-564937cc718a","text":"No.","start_ms":56280,"duration_ms":60,"speaker":2,"language":"en","emotion":"Amused","accent":"American","deepfake_score":null},{"utterance_uuid":"00be4745-849b-4814-94a0-7768aac15c82","text":"Okay. Can you describe in a few words your reason for calling today?","start_ms":59040,"duration_ms":5340,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.78235},{"utterance_uuid":"e9bec06b-a77f-4713-b0e2-17ce89a03dbc","text":"Track an order.","start_ms":66600,"duration_ms":1080,"speaker":2,"language":"en","emotion":"Confident","accent":"American","deepfake_score":0.08599999999999997},{"utterance_uuid":"135317de-c976-497f-918e-9ccfd1dbc0fd","text":"Thank you. Did you say you'd like to place an order over the phone?","start_ms":69180,"duration_ms":3120,"speaker":1,"language":"en","emotion":"Interested","accent":"American","deepfake_score":0.9778},{"utterance_uuid":"66bc4b5f-3be1-44dd-9f0c-8aae8589e5a8","text":"No, track, tracking.","start_ms":73560,"duration_ms":2160,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":null},{"utterance_uuid":"c8093216-16b3-44ca-b30d-ff8274196cde","text":"I'm sorry, I didn't quite catch that. Can you answer yes or no?","start_ms":77280,"duration_ms":4320,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9766},{"utterance_uuid":"3de81bf7-a453-4618-a265-962e902c4d50","text":"No, back, undo.","start_ms":82320,"duration_ms":1560,"speaker":2,"language":"en","emotion":"Frustrated","accent":"American","deepfake_score":0.07579999999999998},{"utterance_uuid":"1415b904-e949-4fb2-a3a3-629df8e6610a","text":"I'm sorry, I didn't quite catch that. Can you describe in a few words your reason for calling today?","start_ms":85260,"duration_ms":5640,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9788},{"utterance_uuid":"ec69b9e7-0fac-4b3e-a4da-ea9773d56aed","text":"Track package.","start_ms":91620,"duration_ms":960,"speaker":2,"language":"en","emotion":"Excited","accent":"American","deepfake_score":0.10909999999999997},{"utterance_uuid":"4003694d-b15d-46b1-9276-80366dc178fc","text":"Thank you. Did you say you'd like to place an order?","start_ms":94320,"duration_ms":3000,"speaker":1,"language":"en","emotion":"Interested","accent":"American","deepfake_score":0.9723}]};

  // Demo Music Detection response — pre-recorded so the page renders instantly
  // on first load. Frames pasted from the real `music-detection` API output.
  const DEMO_MUSIC_DATA = (function () {
    const probs = [
      [0.9189,0.0789],[0.9363,0.0640],[0.9543,0.0439],[0.9541,0.0357],[0.9558,0.0315],
      [0.9559,0.0336],[0.9459,0.0318],[0.9451,0.0309],[0.9375,0.0294],[0.9364,0.0256],
      [0.9235,0.0224],[0.9144,0.0212],[0.9100,0.0215],[0.8989,0.0205],[0.8888,0.0186],
      [0.8713,0.0158],[0.8465,0.0146],[0.8215,0.0142],[0.7952,0.0134],[0.7826,0.0134],
      [0.7767,0.0155],[0.7680,0.0168],[0.7640,0.0208],[0.7766,0.0295],[0.7809,0.0832],
      [0.7868,0.7048],[0.7931,0.9900],[0.7975,0.9992],[0.7880,0.9991],[0.7797,0.9981],
      [0.7915,0.9950],[0.7780,0.9351],[0.7883,0.7120],[0.8026,0.3898],[0.8015,0.2253],
      [0.7952,0.5603],[0.7835,0.9748],[0.7955,0.9998],[0.8021,0.9998],[0.8095,0.9993],
      [0.8056,0.9814],[0.8270,0.9056],[0.8224,0.6998],[0.8308,0.5740],[0.8247,0.8305],
      [0.8027,0.8781],[0.7753,0.9041],[0.7820,0.8823],[0.7760,0.7350],[0.7806,0.5737],
      [0.7757,0.7814],[0.7498,0.9277],[0.7473,0.9817],[0.7463,0.9905],[0.7378,0.9953],
      [0.7328,0.9955],[0.7308,0.9917],[0.7463,0.9851],[0.7742,0.9917],[0.7814,0.9914],
      [0.7762,0.9891],[0.7804,0.9899],[0.7754,0.9871],[0.7820,0.9681],[0.7652,0.8682],
      [0.7661,0.8615],[0.7581,0.9917],[0.7765,0.9973],[0.7776,0.9962],[0.7721,0.9883],
      [0.7731,0.9870],[0.7451,0.9706],[0.7428,0.9829],[0.7490,0.9816],[0.7539,0.9733],
      [0.7225,0.9659],[0.7175,0.9500],[0.7132,0.9187],[0.6573,0.8673],[0.6610,0.9551],
      [0.6434,0.9893],[0.6357,0.9938],[0.6476,0.9950],[0.6551,0.9960],[0.6839,0.9960],
      [0.6780,0.9956],[0.6888,0.9888],[0.6801,0.9138],[0.6671,0.6665],[0.6425,0.3962],
      [0.6127,0.3044],[0.6249,0.6801],[0.6143,0.9707],[0.5984,0.9989],[0.5185,0.9991],
      [0.5610,0.9980],[0.5660,0.9939],[0.5692,0.9961],[0.5764,0.9958],[0.5885,0.9886],
      [0.5954,0.9922],[0.6016,0.9956],[0.6580,0.9931],[0.6878,0.9936],[0.8167,0.9902],
      [0.7967,0.9864],[0.8220,0.9888],[0.8185,0.9817],[0.8307,0.8934],[0.8359,0.9668],
      [0.8101,0.9946],[0.8301,0.9967],[0.8427,0.9964],[0.8485,0.9898],[0.8420,0.9888],
      [0.8460,0.9837],[0.8428,0.9857],[0.8429,0.9928],[0.8541,0.9937],[0.8523,0.9957],
      [0.8547,0.9959],[0.8672,0.9943],[0.8772,0.9890],[0.8770,0.9812],[0.8553,0.9425],
      [0.8663,0.8977],[0.8597,0.9661],[0.8594,0.9895],[0.8780,0.9917],[0.8748,0.9950],
      [0.8761,0.9983],[0.8788,0.9987],[0.8683,0.9985],[0.8712,0.9933],[0.8805,0.9110],
      [0.8773,0.5914],[0.8428,0.2854],[0.8261,0.1267],[0.7637,0.0754],[0.6779,0.0614],
      [0.5642,0.0692],[0.3595,0.1466],[0.1983,0.2399],[0.0938,0.7091],[0.0707,0.9060],
      [0.0516,0.9660],[0.0410,0.9747],[0.0339,0.9937],[0.0249,0.9953],[0.0235,0.9937],
      [0.0227,0.9876],[0.0190,0.9929],[0.0102,0.9926],[0.0089,0.9820],[0.0084,0.9065],
      [0.0077,0.6661],
    ];
    const FRAME_S = 0.192;
    const frames = probs.map((p, i) => ({
      start_time_s: +(i * FRAME_S).toFixed(3),
      end_time_s:   +((i + 1) * FRAME_S).toFixed(3),
      music_prob: p[0],
      speech_prob: p[1],
    }));
    // Final frame's end clipped to actual duration (29.984s)
    if (frames.length) frames[frames.length - 1].end_time_s = 29.984;
    return {
      filename: 'case-of-spring-fever-1940.opus',
      duration_s: 29.984,
      primary_label: 'music',
      music_pct: 90.3,
      speech_pct: 76.8,
      latency_ms: 60.8,
      frames,
    };
  })();

  // Pre-recorded AI Music Detection response so the demo page renders instantly.
  // Captured live from the preview endpoint on the Big Mac Papelão sample.
  const DEMO_AIMUSIC_AUDIO_URL = '/ai-music/big-mac-papelao.mp3';
  // Pre-recorded AI Music Detection response (captured live from the preview
  // batch endpoint for big-mac-papelao.mp3). New schema: clip-level content +
  // dual AI scores/confidence, plus a per-4s-window breakdown.
  const DEMO_AIMUSIC_DATA = {
    filename: 'big-mac-papelao.mp3',
    duration_s: 89.28,
    primary_verdict: 'ai-vocal-music',
    vocal_percentage: 91.45,
    vocal_ai_percentage: 62.72,
    vocal_ai_confidence: 0.9701,
    instrumental_percentage: 86.74,
    instrumental_ai_percentage: 1.1,
    instrumental_ai_confidence: 0.978,
    silence_percentage: 3.99,
    latency_ms: 1526.3,
    windows: [
      { start_time_ms: 0,     end_time_ms: 4000,  vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.9743, instrumental_percentage: 30,  instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 4000,  end_time_ms: 8000,  vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.977,  instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 8000,  end_time_ms: 12000, vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.9734, instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 12000, end_time_ms: 16000, vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.974,  instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 16000, end_time_ms: 20000, vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.9659, instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 20000, end_time_ms: 24000, vocal_percentage: 100, vocal_ai_percentage: 0,   vocal_ai_confidence: 0,      instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 24000, end_time_ms: 28000, vocal_percentage: 100, vocal_ai_percentage: 0,   vocal_ai_confidence: 0,      instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 28000, end_time_ms: 32000, vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.9785, instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 32000, end_time_ms: 36000, vocal_percentage: 60,  vocal_ai_percentage: 0,   vocal_ai_confidence: 0,      instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 36000, end_time_ms: 40000, vocal_percentage: 75,  vocal_ai_percentage: 100, vocal_ai_confidence: 0.9768, instrumental_percentage: 70,  instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 40000, end_time_ms: 44000, vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.974,  instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 44000, end_time_ms: 48000, vocal_percentage: 100, vocal_ai_percentage: 0,   vocal_ai_confidence: 0,      instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 48000, end_time_ms: 52000, vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.9755, instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 52000, end_time_ms: 56000, vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.9682, instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 56000, end_time_ms: 60000, vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.9348, instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 60000, end_time_ms: 64000, vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.9706, instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 64000, end_time_ms: 68000, vocal_percentage: 100, vocal_ai_percentage: 0,   vocal_ai_confidence: 0,      instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 68000, end_time_ms: 72000, vocal_percentage: 100, vocal_ai_percentage: 0,   vocal_ai_confidence: 0,      instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 72000, end_time_ms: 76000, vocal_percentage: 100, vocal_ai_percentage: 100, vocal_ai_confidence: 0.9663, instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 76000, end_time_ms: 80000, vocal_percentage: 100, vocal_ai_percentage: 0,   vocal_ai_confidence: 0,      instrumental_percentage: 100, instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 0 },
      { start_time_ms: 80000, end_time_ms: 84000, vocal_percentage: 55,  vocal_ai_percentage: 0,   vocal_ai_confidence: 0,      instrumental_percentage: 95,  instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 5 },
      { start_time_ms: 84000, end_time_ms: 88000, vocal_percentage: 80,  vocal_ai_percentage: 100, vocal_ai_confidence: 0.9718, instrumental_percentage: 0,   instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 20 },
      { start_time_ms: 88000, end_time_ms: 89280, vocal_percentage: 33.33, vocal_ai_percentage: 0, vocal_ai_confidence: 0,      instrumental_percentage: 0,   instrumental_ai_percentage: 0, instrumental_ai_confidence: 0, silence_percentage: 66.67 },
    ],
  };

  // Pre-recorded Language Detection response. Same audio file as transcription
  // (AIAgentFrustration.mp3 served from /deepfake/demo.mp3) so we don't ship
  // a separate asset.
  const DEMO_LANGUAGE_AUDIO_URL = '/deepfake/demo.mp3';
  const DEMO_LANGUAGE_FILENAME = 'AIAgentFrustration.mp3';
  const DEMO_LANGUAGE_DATA = {
    predicted_language: 'English',
    predicted_language_code: 'en',
    confidence: 0.99609375,
    duration_ms: 97698,
  };

  // ── Verdict helpers ─────────────────────────────────────────────────────────
  function isSyntheticFrame(f) { return f.verdict === 'synthetic'; }

  function computeVerdict(frames) {
    const synFrames = frames.filter(isSyntheticFrame);
    const c98 = synFrames.filter(f => f.confidence > 0.98).length;
    const c95 = synFrames.filter(f => f.confidence > 0.95).length;
    const c90 = synFrames.filter(f => f.confidence > 0.90).length;
    const c85 = synFrames.filter(f => f.confidence > 0.85).length;
    const pct = frames.length > 0 ? synFrames.length / frames.length : 0;
    let reason = '';
    if (c98 >= 1) reason = c98 + ' segment' + (c98 > 1 ? 's' : '') + ' with >98% conf.';
    else if (c95 >= 2) reason = c95 + ' segments with >95% conf.';
    else if (c90 >= 3) reason = c90 + ' segments with >90% conf.';
    else if (c85 >= 5) reason = c85 + ' segments with >85% conf.';
    else if (frames.length >= 7 && pct > 0.3) reason = Math.round(pct * 100) + '% of segments flagged as deepfake';
    const isSynthetic = reason !== '';
    return { isSynthetic, synFrames, reason };
  }
  function verdictClass(f) {
    if (f.verdict === 'synthetic') return 'synthetic';
    if (f.verdict === 'no-content') return 'no-content';
    return 'authentic';
  }
  function verdictText(f) {
    if (f.verdict === 'synthetic') return 'Deepfake';
    if (f.verdict === 'no-content') return 'No Content';
    return 'Authentic';
  }

  // ── Language Detection: code → country tables for flag emoji ────────────────
  // Maps each ISO 639-1 language code returned by the API to a 2-letter ISO 3166
  // country code; the flag emoji is composed from regional-indicator symbols.
  // Codes without a clean country mapping (Latin, Tibetan, etc.) fall back to 🌐.
  const LANG_COUNTRY = {
    af: 'ZA', sq: 'AL', am: 'ET', ar: 'SA', hy: 'AM', as: 'IN', az: 'AZ',
    ba: 'RU', eu: 'ES', be: 'BY', bn: 'BD', bs: 'BA', br: 'FR', bg: 'BG',
    yue: 'HK', ca: 'ES', zh: 'CN', hr: 'HR', cs: 'CZ', da: 'DK', nl: 'NL',
    en: 'US', et: 'EE', fo: 'FO', fi: 'FI', fr: 'FR', gl: 'ES', ka: 'GE',
    de: 'DE', el: 'GR', gu: 'IN', ht: 'HT', ha: 'NG', haw: 'US', he: 'IL',
    hi: 'IN', hu: 'HU', is: 'IS', id: 'ID', it: 'IT', ja: 'JP', jw: 'ID',
    kn: 'IN', kk: 'KZ', km: 'KH', ko: 'KR', lo: 'LA',          lv: 'LV',
    ln: 'CD', lt: 'LT', lb: 'LU', mk: 'MK', mg: 'MG', ms: 'MY', ml: 'IN',
    mt: 'MT', mi: 'NZ', mr: 'IN', mn: 'MN', my: 'MM', ne: 'NP', no: 'NO',
    nn: 'NO', oc: 'FR', ps: 'AF', fa: 'IR', pl: 'PL', pt: 'PT', pa: 'IN',
    ro: 'RO', ru: 'RU', sa: 'IN', sr: 'RS', sn: 'ZW', sd: 'PK', si: 'LK',
    sk: 'SK', sl: 'SI', so: 'SO', es: 'ES', su: 'ID', sw: 'KE', sv: 'SE',
    tl: 'PH', tg: 'TJ', ta: 'IN', tt: 'RU', te: 'IN', th: 'TH',
    tr: 'TR', tk: 'TM', uk: 'UA', ur: 'PK', uz: 'UZ', vi: 'VN',
    yi: 'IL', yo: 'NG',
    // Codes without a country flag — use globe fallback:
    // la (Latin), bo (Tibetan), cy (Welsh — subdivision flag, not country)
  };
  // Welsh has a subdivision flag (not derivable from a 2-letter country code).
  const LANG_FLAG_OVERRIDES = { cy: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}' };

  function flagFromCountryCode(cc) {
    if (!cc || cc.length !== 2) return null;
    const A = 0x1F1E6;
    const code = cc.toUpperCase();
    return String.fromCodePoint(A + (code.charCodeAt(0) - 65), A + (code.charCodeAt(1) - 65));
  }
  function flagForLanguage(code) {
    if (!code) return '\u{1F310}';
    if (LANG_FLAG_OVERRIDES[code]) return LANG_FLAG_OVERRIDES[code];
    const cc = LANG_COUNTRY[code];
    return flagFromCountryCode(cc) || '\u{1F310}';
  }

  // ── Mode State ──────────────────────────────────────────────────────────────
  let currentMode = 'transcription'; // 'deepfake' | 'transcription'

  // ── DOM refs ────────────────────────────────────────────────────────────────
  // Upload-progress text renders into the plate's uploading overlay label.
  const analysisStatus = document.getElementById('plate-uploading-label');
  const errorToast    = document.getElementById('error-toast');

  const resultsFilename = document.getElementById('results-filename');
  const resultsAudio  = document.getElementById('results-audio');
  const originalAudio = document.getElementById('original-audio');
  const playerEntryOriginal = document.getElementById('player-entry-original');
  const redactedLabel = document.getElementById('redacted-label');
  const histogram     = document.getElementById('histogram');
  const resultsTbody  = document.getElementById('results-tbody');
  const verdictRing   = document.getElementById('verdict-ring');
  const verdictIcon   = document.getElementById('verdict-icon');
  const verdictLabel  = document.getElementById('verdict-label');
  const verdictCount  = document.getElementById('verdict-count');

  const uploadAction  = document.getElementById('results-upload-action');
  const fileInput     = document.getElementById('results-file-input');
  const recordAction  = document.getElementById('results-record-action');
  const streamDemoAction = document.getElementById('results-stream-demo-action');
  const streamFileAction = document.getElementById('results-stream-file-action');
  const streamFileInput  = document.getElementById('results-stream-file-input');
  const histoTooltip  = document.getElementById('histo-tooltip');
  const sttChart      = document.getElementById('stt-chart');

  // Mode toggle
  const modeRadios    = document.querySelectorAll('input[name="mode"]');
  const deepfakeContent = document.getElementById('deepfake-content');
  const transcriptContainer = document.getElementById('transcript-container');
  const transcriptList = document.getElementById('transcript-list');
  const resultsVerdict = document.getElementById('results-verdict');
  const resultsSidebar = document.getElementById('results-sidebar');
  const sttOptions    = document.getElementById('stt-options');

  // Music Detection elements
  const musicContent      = document.getElementById('music-content');
  const musicHistogram    = document.getElementById('music-histogram');
  const musicHistogramFit = document.getElementById('music-histogram-fit');
  const musicTbody        = document.getElementById('music-tbody');
  const musicVerdictRing  = document.getElementById('music-verdict-ring');
  const musicVerdictIcon  = document.getElementById('music-verdict-icon');
  const musicVerdictLabel = document.getElementById('music-verdict-label');
  const musicVerdictSplit = document.getElementById('music-verdict-split');
  const musicSidebar      = document.getElementById('results-music-verdict');
  const musicViewBtns     = document.querySelectorAll('.music-view-btn');

  // AI Music Detection elements
  const aimusicContent       = document.getElementById('aimusic-content');
  const aimusicSidebar       = document.getElementById('results-aimusic-verdict');
  const aimusicHero          = document.getElementById('aimusic-hero');
  const aimusicHeroBadge     = document.getElementById('aimusic-hero-badge');
  const aimusicHeroBadgeText = document.getElementById('aimusic-hero-badge-text');
  const aimusicHeroHeadline  = document.getElementById('aimusic-hero-headline');
  const aimusicHeroSub       = document.getElementById('aimusic-hero-sub');
  const aimusicPaths           = document.getElementById('aimusic-paths');
  const aimusicPathVocal       = document.getElementById('aimusic-path-vocal');
  const aimusicPathVocalIcon   = document.getElementById('aimusic-path-vocal-icon');
  const aimusicPathVocalValue  = document.getElementById('aimusic-path-vocal-value');
  const aimusicPathInstr       = document.getElementById('aimusic-path-instr');
  const aimusicPathInstrIcon   = document.getElementById('aimusic-path-instr-icon');
  const aimusicPathInstrValue  = document.getElementById('aimusic-path-instr-value');
  const aimusicPathNote        = document.getElementById('aimusic-path-note');
  const aimusicHeroMeta        = document.getElementById('aimusic-hero-meta');
  const aimusicTimelineWrap    = document.getElementById('aimusic-timeline-wrap');
  const aimusicTimeline        = document.getElementById('aimusic-timeline');
  const aimusicAxis            = document.getElementById('aimusic-axis');
  const aimusicTimelineStatus  = document.getElementById('aimusic-timeline-status');
  const aimusicTbody           = document.getElementById('aimusic-tbody');

  // Language Detection elements
  const languageContent      = document.getElementById('language-content');
  const languageSidebar      = document.getElementById('results-language-verdict');
  const langHero             = document.getElementById('lang-hero');
  const langHeroFlag         = document.getElementById('lang-hero-flag');
  const langHeroName         = document.getElementById('lang-hero-name');
  const langHeroCode         = document.getElementById('lang-hero-code');
  const langHeroConfRow      = document.getElementById('lang-hero-conf-row');
  const langHeroConfVal      = document.getElementById('lang-hero-conf-val');
  const langHeroMeta         = document.getElementById('lang-hero-meta');
  const langHeroWarning      = document.getElementById('lang-hero-warning');

  // Redaction elements
  const redactionContent        = document.getElementById('redaction-content');
  const redactionTimeline       = document.getElementById('redaction-timeline');
  const redactionPlayhead       = document.getElementById('redaction-playhead');
  const redactionTimelineAxis   = document.getElementById('redaction-timeline-axis');
  const redactionTranscriptList = document.getElementById('redaction-transcript-list');
  const redactionStats          = document.getElementById('redaction-stats');
  const redactionOptions        = document.getElementById('redaction-options');
  const redactionSidebar        = document.getElementById('results-redaction-sidebar');
  const optRedactDiarization    = document.getElementById('redact-opt-diarization');
  const optRedactStartPad       = document.getElementById('redact-opt-start-pad');
  const optRedactEndPad         = document.getElementById('redact-opt-end-pad');

  // Bottom columns (Raw JSON + statistics) — replaced the old stats/JSON modals.
  // statsModalTitle is a write-only sink: per-mode titles are covered by the
  // stat-card group headers in the design layout.
  const statsModalTitle = { textContent: '' };
  const statsGrid     = document.getElementById('stats-grid');
  const jsonPre       = document.getElementById('json-pre');
  const jsonCopyBtn   = document.getElementById('json-copy-btn');

  // ── State ───────────────────────────────────────────────────────────────────
  let audioObjectUrl = null;
  let progressTimer = null;
  let currentData = null;
  let currentMeta = {};
  let currentFrames = [];
  let playbackTracker = null;

  // Persist last deepfake/STT/redaction results so mode-switching doesn't lose them
  let lastDeepfakeData = null;
  let lastDeepfakeAudioUrl = null;
  let lastDeepfakeMeta = null;
  let lastSttData = null;
  let lastSttAudioUrl = null;
  let lastSttMeta = null;
  let lastRedactionData = null;
  let lastRedactionAudioUrl = null;
  let lastRedactionOriginalUrl = null;
  let lastRedactionMeta = null;
  let lastMusicData = null;
  let lastMusicAudioUrl = null;
  let lastMusicMeta = null;
  let lastAimusicData = null;
  let lastAimusicAudioUrl = null;
  let lastAimusicMeta = null;
  let lastAimusicFilename = null;
  let lastLanguageData = null;
  let lastLanguageAudioUrl = null;
  let lastLanguageMeta = null;
  let lastLanguageFilename = null;
  let musicPlaybackTracker = null;
  let aimusicPlaybackTracker = null;
  let musicView = 'heatmap'; // 'heatmap' | 'detailed'
  let musicCells = [];       // cells currently rendered (for playback tracking)
  let musicResizeObserver = null;
  let isAnalyzing = false;
  let sttChartTracker = null;

  let redactionData = null;
  let redactionUtterances = [];
  let redactionPlaybackTracker = null;
  let redactionTranscriptTracker = null;

  // Transcription state
  let sttUtterances = [];
  let sttPartial = null;
  let sttData = null;

  // ── Design-chrome DOM refs ──────────────────────────────────────────────────
  const pageTitleEl     = document.getElementById('pg-page-title');
  const uploadPlate     = document.getElementById('pg-upload-plate');
  const plateHeader     = document.getElementById('plate-header');
  const plateHeaderTitle = document.getElementById('plate-header-title');
  const sttOptionsRow   = document.getElementById('stt-options-row');
  const plateStages     = document.getElementById('plate-stages');
  const plateUploadingLabel = document.getElementById('plate-uploading-label');
  const plateStreamingLabel = document.getElementById('plate-streaming-label');
  const plateQuotaDefault = document.getElementById('plate-quota-default');
  const plateQuotaLow   = document.getElementById('plate-quota-low');
  const streamSplit     = document.getElementById('stream-split');
  const bottomColumns   = document.getElementById('pg-bottom-columns');
  const navLinks        = document.querySelectorAll('.models-nav__link[data-mode]');
  const redactionAb     = document.getElementById('redaction-ab');
  const abOriginalBtn   = document.getElementById('redaction-ab-original');
  const abRedactedBtn   = document.getElementById('redaction-ab-redacted');
  const velmaDemoBtn    = document.getElementById('velma-demo-action');

  // ── Declarative per-mode configuration ──────────────────────────────────────
  // optionsRow: element shown (with .visible) in the plate's top row
  // plateTitle: text for the generic plate header (detection modes)
  // verdict:    the verdict-slot child to unhide
  // panels:     content panels shown for the mode
  // streaming:  whether the "Start streaming" split-button is available
  const MODES = {
    velma: {
      path: '/velma', title: 'Velma Triage',
      optionsRow: () => velmaOptions, verdict: null,
      panels: () => [velmaContent, transcriptContainer],
      streaming: true, demoButton: true,
      stages: ['Transcript', 'Speakers', 'Emotions', 'Roles', 'Behaviors', 'Summary'],
    },
    transcription: {
      path: '/transcription', title: 'Multilingual Transcription',
      optionsRow: () => sttOptionsRow, verdict: null,
      panels: () => [transcriptContainer],
      streaming: true,
      stages: ['Transcript', 'Speakers', 'Signals'],
    },
    deepfake: {
      path: '/deepfake', title: 'Deepfake Detection', plateTitle: 'Detect synthetic speech',
      optionsRow: () => plateHeader, verdict: () => resultsVerdict,
      panels: () => [deepfakeContent],
      streaming: true,
      stages: ['Analyzing audio'],
    },
    redaction: {
      path: '/redaction', title: 'PII/PHI Redaction',
      optionsRow: () => redactionOptions,
      verdict: () => document.getElementById('results-redaction-verdict'),
      panels: () => [redactionContent],
      streaming: false, abToggle: true,
      stages: ['Transcript', 'Redaction'],
    },
    music: {
      path: '/music', title: 'Music & Speech Detection', plateTitle: 'Detect music and speech',
      optionsRow: () => plateHeader, verdict: () => musicSidebar,
      panels: () => [musicContent],
      streaming: true,
      stages: ['Analyzing audio'],
    },
    aimusic: {
      path: '/ai-music', title: 'AI Music Detection', plateTitle: 'Detect AI-generated music',
      optionsRow: () => plateHeader, verdict: () => aimusicSidebar,
      panels: () => [aimusicContent],
      streaming: true,
      stages: ['Analyzing audio'],
    },
    language: {
      path: '/language', title: 'Language Detection', plateTitle: 'Identify spoken language',
      optionsRow: () => plateHeader, verdict: () => languageSidebar,
      panels: () => [languageContent],
      streaming: false,
      stages: ['Analyzing audio'],
    },
  };

  function setPageTitle(text) {
    if (pageTitleEl) pageTitleEl.textContent = text || (MODES[currentMode] ? MODES[currentMode].title : '');
  }

  // ── Mode Switching ──────────────────────────────────────────────────────────
  function switchMode(mode, pushUrl) {
    if (!MODES[mode]) mode = 'velma';
    currentMode = mode;
    const cfg = MODES[mode];
    const isDeepfake    = mode === 'deepfake';
    const isRedaction   = mode === 'redaction';
    const isMusic       = mode === 'music';
    const isAimusic     = mode === 'aimusic';
    const isLanguage    = mode === 'language';
    const isVelma       = mode === 'velma';

    // Update URL
    const targetPath = cfg.path;
    if (pushUrl !== false && location.pathname !== targetPath) {
      history.pushState({ mode: mode }, '', targetPath + location.search);
      try {
        const beaconUrl = `/api/track-view?path=${encodeURIComponent(targetPath)}`;
        if (navigator.sendBeacon) navigator.sendBeacon(beaconUrl);
        else fetch(beaconUrl, { method: 'POST', keepalive: true }).catch(() => {});
      } catch (e) {}
    }

    // CSS scope hook (per-mode player strip sizing, language dataviz hiding)
    document.body.dataset.mode = mode;

    // Sidebar active state
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.mode === mode));

    // Plate: option rows (exactly one visible), generic header title
    [velmaOptions, sttOptionsRow, redactionOptions, plateHeader].forEach(row => {
      if (row) row.classList.remove('visible');
    });
    const activeRow = cfg.optionsRow && cfg.optionsRow();
    if (activeRow) activeRow.classList.add('visible');
    if (plateHeaderTitle) plateHeaderTitle.textContent = cfg.plateTitle || '';

    // Plate: actions
    if (streamSplit) streamSplit.style.display = cfg.streaming ? '' : 'none';
    if (velmaDemoBtn) velmaDemoBtn.style.display = cfg.demoButton ? '' : 'none';

    // Verdict slot: unhide only this mode's statement container
    [resultsVerdict, musicSidebar, aimusicSidebar, languageSidebar,
     document.getElementById('results-redaction-verdict')].forEach(el => {
      if (el) el.hidden = true;
    });
    const verdictEl = cfg.verdict && cfg.verdict();
    if (verdictEl) verdictEl.hidden = false;

    // Content panels
    [velmaContent, transcriptContainer, deepfakeContent, redactionContent,
     musicContent, aimusicContent, languageContent].forEach(el => {
      if (el) el.classList.remove('visible');
    });
    (cfg.panels ? cfg.panels() : []).forEach(el => { if (el) el.classList.add('visible'); });

    // Redaction A/B source toggle on the player
    if (redactionAb) redactionAb.hidden = !cfg.abToggle;
    setActiveAudio(isRedaction ? 'redacted' : 'main');

    renderDebugPanel(true);

    // Stop any running animation frame trackers
    if (playbackTracker) { cancelAnimationFrame(playbackTracker); playbackTracker = null; }
    if (sttChartTracker) { cancelAnimationFrame(sttChartTracker); sttChartTracker = null; }
    if (redactionPlaybackTracker) { cancelAnimationFrame(redactionPlaybackTracker); redactionPlaybackTracker = null; }
    if (redactionTranscriptTracker) { cancelAnimationFrame(redactionTranscriptTracker); redactionTranscriptTracker = null; }
    if (musicPlaybackTracker) { cancelAnimationFrame(musicPlaybackTracker); musicPlaybackTracker = null; }
    if (aimusicPlaybackTracker) { cancelAnimationFrame(aimusicPlaybackTracker); aimusicPlaybackTracker = null; }

    if (isRecording) stopRecording();
    setPlateState('initial');

    if (isDeepfake) {
      const dfData = lastDeepfakeData || DEMO_DATA;
      const dfAudio = lastDeepfakeAudioUrl || DEMO_AUDIO_URL;
      currentMeta = lastDeepfakeMeta || {
        fileSize: 1.87 * 1024 * 1024,
        fileType: 'audio/mpeg',
        httpStatus: 200,
        httpStatusText: 'OK',
        responseSize: 4.2 * 1024,
        processingMs: 2660,
      };
      renderDeepfakeResults(dfData, dfAudio);
    } else if (isRedaction) {
      if (lastRedactionData) {
        redactionData = lastRedactionData;
        currentData = lastRedactionData;
        currentMeta = lastRedactionMeta || {};
        resultsFilename.textContent = lastRedactionData.filename || '';
        resultsAudio.src = lastRedactionAudioUrl || '';
        if (originalAudio) originalAudio.src = lastRedactionOriginalUrl || '';
        const ranges = lastRedactionData.redaction_ranges || [];
        const durMs = lastRedactionData.duration_ms || 0;
        renderRedactionTimeline(ranges, durMs);
        renderRedactionTranscript(lastRedactionData.utterances || []);
        renderRedactionSidebar(ranges, durMs);
        if (durMs) {
          setupRedactionPlaybackTracking(durMs);
          setupRedactionTranscriptTracking(lastRedactionData.utterances || []);
        }
      } else {
        const rData = DEMO_REDACTION_DATA;
        const rAudio = DEMO_REDACTION_AUDIO_URL;
        redactionData = rData;
        currentData = rData;
        currentMeta = {
          fileSize: 1.87 * 1024 * 1024,
          fileType: 'audio/mpeg',
          httpStatus: 200,
          httpStatusText: 'OK',
          responseSize: JSON.stringify(DEMO_REDACTION_DATA).length,
          processingMs: 2800,
        };
        resultsFilename.textContent = rData.filename || 'AIAgentFrustration.mp3';
        resultsAudio.src = rAudio;
        if (originalAudio) originalAudio.src = DEMO_REDACTION_ORIGINAL_AUDIO_URL;
        const ranges = rData.redaction_ranges || [];
        const durMs = rData.duration_ms || 0;
        renderRedactionTimeline(ranges, durMs);
        renderRedactionTranscript(rData.utterances || []);
        renderRedactionSidebar(ranges, durMs);
        if (durMs) {
          setupRedactionPlaybackTracking(durMs);
          setupRedactionTranscriptTracking(rData.utterances || []);
        }
      }
    } else if (isMusic) {
      const mData = lastMusicData || DEMO_MUSIC_DATA;
      const mAudio = lastMusicAudioUrl || DEMO_MUSIC_AUDIO_URL;
      currentMeta = lastMusicMeta || {
        fileSize: 243900,
        fileType: 'audio/opus',
        httpStatus: 200,
        httpStatusText: 'OK',
        responseSize: JSON.stringify(DEMO_MUSIC_DATA).length,
        processingMs: DEMO_MUSIC_DATA.latency_ms || 0,
      };
      renderMusicResults(mData, mAudio);
    } else if (isAimusic) {
      const aData = lastAimusicData || DEMO_AIMUSIC_DATA;
      const aAudio = lastAimusicAudioUrl || DEMO_AIMUSIC_AUDIO_URL;
      currentData = aData;
      currentMeta = lastAimusicMeta || {
        fileSize: 2124230,
        fileType: 'audio/mpeg',
        httpStatus: 200,
        httpStatusText: 'OK',
        responseSize: JSON.stringify(DEMO_AIMUSIC_DATA).length,
        processingMs: DEMO_AIMUSIC_DATA.latency_ms || 0,
      };
      resultsFilename.textContent = lastAimusicFilename || aData.filename || 'big-mac-papelao.mp3';
      resultsAudio.src = aAudio;
      renderAimusicResult(aData);
    } else if (isLanguage) {
      const lData = lastLanguageData || DEMO_LANGUAGE_DATA;
      currentData = lData;
      currentMeta = lastLanguageMeta || {
        fileSize: 1.87 * 1024 * 1024, fileType: 'audio/mpeg',
        httpStatus: 200, httpStatusText: 'OK',
        responseSize: JSON.stringify(DEMO_LANGUAGE_DATA).length,
        processingMs: 1100,
      };
      resultsFilename.textContent = lastLanguageFilename || DEMO_LANGUAGE_FILENAME;
      resultsAudio.src = lastLanguageAudioUrl || DEMO_LANGUAGE_AUDIO_URL;
      renderLanguageResult(lData);
    } else if (isVelma) {
      if (lastVelmaData) {
        velmaData = lastVelmaData;
        currentData = lastVelmaData;
        currentMeta = lastVelmaMeta || {};
        resultsFilename.textContent = lastVelmaFilename || '';
        if (lastVelmaAudioUrl) resultsAudio.src = lastVelmaAudioUrl;
        renderVelmaResults(lastVelmaData);
      } else {
        // No prior run — show the pre-cached demo, like the other model tabs.
        showVelmaDemo();
      }
      updateVelmaConfigSummary();
    } else {
      const sData = lastSttData || DEMO_STT_DATA;
      const sAudio = lastSttAudioUrl || DEMO_STT_AUDIO_URL;
      sttData = sData;
      currentData = sData;
      sttUtterances = sData.utterances || [];
      sttPartial = null;
      currentMeta = lastSttMeta || {
        fileSize: 1.87 * 1024 * 1024,
        fileType: 'audio/mpeg',
        httpStatus: 200,
        httpStatusText: 'OK',
        responseSize: JSON.stringify(DEMO_STT_DATA).length,
        processingMs: 2660,
      };
      resultsFilename.textContent = sData.filename || 'Irate_Caller_Final.mp3';
      resultsAudio.src = sAudio;
      renderTranscript();
    }

    setPageTitle(resultsFilename.textContent);
    refreshBottomPanels();
    syncPlayerMeta();
  }

  // Sidebar model nav drives the SPA mode switch
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (link.dataset.mode !== currentMode) switchMode(link.dataset.mode);
    });
  });

  // ── STT Options Helper ──────────────────────────────────────────────────────
  const optFast = document.getElementById('opt-fast');
  const optDiarization = document.getElementById('opt-diarization');
  const optDeepfake = document.getElementById('opt-deepfake');
  const optEmotion = document.getElementById('opt-emotion');
  const optAccent = document.getElementById('opt-accent');
  const optPii = document.getElementById('opt-pii');
  const optDebug = document.getElementById('opt-debug');
  const richOpts = [optDiarization, optDeepfake, optEmotion, optAccent, optPii];

  const debugPanel          = document.getElementById('stt-debug-panel');
  const debugModelEl        = document.getElementById('stt-debug-model');
  const debugPhaseEl        = document.getElementById('stt-debug-phase');
  const debugSinceEl        = document.getElementById('stt-debug-since');
  const debugCountersEl     = document.getElementById('stt-debug-counters');
  const debugInfoEl         = document.getElementById('stt-debug-info');
  const debugPartialsList   = document.getElementById('stt-debug-partials');
  const debugFinalsList     = document.getElementById('stt-debug-finals');
  const debugPartialsCount  = document.getElementById('stt-debug-partials-count');
  const debugFinalsCount    = document.getElementById('stt-debug-finals-count');
  const debugReverseBtn     = document.getElementById('stt-debug-reverse-btn');
  const debugCopyRawBtn     = document.getElementById('stt-debug-copy-raw-btn');

  optFast.addEventListener('change', () => {
    if (optFast.checked) richOpts.forEach(cb => { cb.checked = false; });
    syncFastDebugExclusion();
  });
  richOpts.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) optFast.checked = false;
      syncFastDebugExclusion();
    });
  });

  function isFastMode() { return optFast.checked; }

  // The streaming debug panel only understands the rich v1 stream (speakers,
  // clusters, claims). Fast (v2) streaming emits a plain {text, is_final} shape,
  // so Debug is unavailable in Fast mode — hide and force it off.
  function syncFastDebugExclusion() {
    if (!optDebug) return;
    const debugLabel = optDebug.closest('.pg-stt-option');
    if (optFast.checked) {
      if (optDebug.checked) { optDebug.checked = false; sttDebug = false; }
      optDebug.disabled = true;
      if (debugLabel) debugLabel.hidden = true;
      renderDebugPanel(true); // debugActive() is now false → panel hides
    } else {
      optDebug.disabled = false;
      if (debugLabel) debugLabel.hidden = false;
    }
  }

  function getSttOptions() {
    // In Velma mode, the STT options come from velmaConfig.stt (set via the Velma editor),
    // not from the (hidden) transcription STT checkboxes.
    if (currentMode === 'velma' && typeof velmaConfig !== 'undefined' && velmaConfig.stt) {
      return {
        speaker_diarization: !!velmaConfig.stt.speaker_diarization,
        deepfake_signal: !!velmaConfig.stt.deepfake_signal,
        emotion_signal: !!velmaConfig.stt.emotion_signal,
        accent_signal: !!velmaConfig.stt.accent_signal,
        pii_phi_tagging: !!velmaConfig.stt.pii_phi_tagging,
      };
    }
    return {
      speaker_diarization: optDiarization.checked,
      deepfake_signal: optDeepfake.checked,
      emotion_signal: optEmotion.checked,
      accent_signal: optAccent.checked,
      pii_phi_tagging: optPii.checked,
    };
  }

  // Speed factor for transcription: all 4 checked = 8x, just diarization = 20x, any 3 = 15x
  function getSttSpeedFactor() {
    if (isFastMode()) return 60; // vfast model is ~60x realtime
    const opts = getSttOptions();
    const count = [opts.emotion_signal, opts.accent_signal, opts.pii_phi_tagging].filter(Boolean).length;
    if (count >= 3) return 8;
    if (count >= 2) return 15;
    if (count >= 1) return 15;
    return 20;
  }

  // ── Upload action: click + drag-and-drop ──────────────────────────────────
  if (uploadAction && fileInput) {
    uploadAction.addEventListener('click', (e) => {
      if (e.target !== fileInput) fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        if (currentMode === 'deepfake') {
          startDeepfakeAnalysis(fileInput.files[0]);
        } else if (currentMode === 'redaction') {
          startRedactionBatch(fileInput.files[0]);
        } else if (currentMode === 'music') {
          startMusicAnalysis(fileInput.files[0]);
        } else if (currentMode === 'aimusic') {
          startAimusicAnalysis(fileInput.files[0]);
        } else if (currentMode === 'language') {
          startLanguageDetection(fileInput.files[0]);
        } else if (currentMode === 'velma') {
          startVelmaBatch(fileInput.files[0]);
        } else {
          startTranscriptionBatch(fileInput.files[0]);
        }
        fileInput.value = '';
      }
    });

    let dragCtr = 0;
    uploadAction.addEventListener('dragenter', (e) => { e.preventDefault(); dragCtr++; uploadAction.classList.add('drag-over'); });
    uploadAction.addEventListener('dragleave', (e) => { e.preventDefault(); dragCtr--; if (dragCtr <= 0) { dragCtr = 0; uploadAction.classList.remove('drag-over'); } });
    uploadAction.addEventListener('dragover', (e) => e.preventDefault());
    uploadAction.addEventListener('drop', (e) => {
      e.preventDefault();
      dragCtr = 0;
      uploadAction.classList.remove('drag-over');
      if (e.dataTransfer.files.length > 0) {
        if (currentMode === 'deepfake') startDeepfakeAnalysis(e.dataTransfer.files[0]);
        else if (currentMode === 'redaction') startRedactionBatch(e.dataTransfer.files[0]);
        else if (currentMode === 'music') startMusicAnalysis(e.dataTransfer.files[0]);
        else if (currentMode === 'aimusic') startAimusicAnalysis(e.dataTransfer.files[0]);
        else if (currentMode === 'language') startLanguageDetection(e.dataTransfer.files[0]);
        else if (currentMode === 'velma') startVelmaBatch(e.dataTransfer.files[0]);
        else startTranscriptionBatch(e.dataTransfer.files[0]);
      }
    });
  }

  // ── Live Recording State ───────────────────────────────────────────────────
  let isRecording = false;
  let mediaStream = null;
  let audioContext = null;
  let scriptProcessor = null;
  let recordingWs = null;
  let liveFrames = [];
  let liveMusicFrames = [];
  let liveAimusicWindows = [];   // accumulated `window` messages during AI-music streaming
  let aimusicDoneData = null;    // the streaming `done` clip-level summary, once received
  let recordingStartTime = 0;
  let mediaRecorder = null;
  let recordedChunks = [];
  let endFrameSent = false;

  if (recordAction) {
    recordAction.addEventListener('click', () => {
      if (recordAction.classList.contains('disabled-soon')) return;
      if (recordAction.classList.contains('streaming-soon')) return;
      if (isRecording) {
        stopRecording();
      } else {
        if (currentMode === 'deepfake') startDeepfakeRecording();
        else if (currentMode === 'music') startMusicRecording();
        else if (currentMode === 'aimusic') startAimusicRecording();
        else if (currentMode === 'velma') startVelmaMicStream();
        else startTranscriptionRecording();
      }
    });
  }

  if (streamDemoAction) {
    streamDemoAction.addEventListener('click', () => {
      if (streamDemoAction.classList.contains('streaming-soon')) return;
      if (isRecording) { stopRecording(); return; }
      if (currentMode === 'velma') startVelmaDemoStream();
      else if (currentMode === 'music') startMusicDemoStream();
      else if (currentMode === 'aimusic') startAimusicDemoStream();
      else startTranscriptionDemoStream();
    });
  }

  if (streamFileAction && streamFileInput) {
    streamFileAction.addEventListener('click', (e) => {
      if (streamFileAction.classList.contains('streaming-soon')) return;
      if (e.target !== streamFileInput) {
        if (isRecording) { stopRecording(); return; }
        streamFileInput.click();
      }
    });
    streamFileInput.addEventListener('change', () => {
      if (streamFileInput.files.length > 0) {
        if (currentMode === 'velma') startVelmaFileStream(streamFileInput.files[0]);
        else if (currentMode === 'music') startMusicFileStream(streamFileInput.files[0]);
        else if (currentMode === 'aimusic') startAimusicFileStream(streamFileInput.files[0]);
        else startTranscriptionFileStream(streamFileInput.files[0]);
        streamFileInput.value = '';
      }
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── UPLOAD PLATE STATE MACHINE ────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  // States: initial | file-dropping | uploading | processing | streaming |
  //         uploaded | low-quota | exhausted   (driven via data-state, CSS does the rest)

  const LOW_QUOTA_THRESHOLD = 5;

  function setPlateState(state) {
    if (!uploadPlate) return;
    // Normalize idle: an exhausted/low quota overrides "initial".
    if (state === 'initial' && quotaRemaining != null) {
      if (quotaRemaining <= 0) state = 'exhausted';
      else if (quotaRemaining <= LOW_QUOTA_THRESHOLD) state = 'low-quota';
    }
    uploadPlate.dataset.state = state;
    const expandBtn = uploadPlate.querySelector('[data-upload-plate-expand]');
    if (expandBtn) expandBtn.setAttribute('aria-expanded', state === 'uploaded' ? 'false' : 'true');
  }

  // Rate-limit rejections (HTTP 429 or WS upgrade refusal) land here from any mode.
  function handleRateLimited() {
    quotaRemaining = 0;
    setPlateState('exhausted');
    updateRateLimit();
  }

  function handleDroppedFile(file) {
    if (currentMode === 'deepfake') startDeepfakeAnalysis(file);
    else if (currentMode === 'redaction') startRedactionBatch(file);
    else if (currentMode === 'music') startMusicAnalysis(file);
    else if (currentMode === 'aimusic') startAimusicAnalysis(file);
    else if (currentMode === 'language') startLanguageDetection(file);
    else if (currentMode === 'velma') startVelmaBatch(file);
    else startTranscriptionBatch(file);
  }

  function initPlateChrome() {
    if (!uploadPlate) return;

    // Collapsed plate ("New analysis") expands back to the idle state.
    uploadPlate.addEventListener('click', (e) => {
      if (uploadPlate.dataset.state !== 'uploaded') return;
      setPlateState('initial');
    });

    // Whole-plate drag & drop (the design drops onto the plate, not a button).
    let plateDragCtr = 0;
    uploadPlate.addEventListener('dragenter', (e) => {
      e.preventDefault();
      plateDragCtr++;
      const st = uploadPlate.dataset.state;
      if (st === 'initial' || st === 'low-quota' || st === 'uploaded') setPlateState('file-dropping');
    });
    uploadPlate.addEventListener('dragleave', (e) => {
      e.preventDefault();
      plateDragCtr--;
      if (plateDragCtr <= 0) {
        plateDragCtr = 0;
        if (uploadPlate.dataset.state === 'file-dropping') setPlateState('initial');
      }
    });
    uploadPlate.addEventListener('dragover', (e) => e.preventDefault());
    uploadPlate.addEventListener('drop', (e) => {
      e.preventDefault();
      plateDragCtr = 0;
      if (uploadPlate.dataset.state === 'file-dropping') setPlateState('initial');
      if (e.dataTransfer.files.length > 0) handleDroppedFile(e.dataTransfer.files[0]);
    });

    // Streaming split-button dropdown
    if (streamSplit) {
      const toggle = streamSplit.querySelector('.pg-upload-stream__toggle');
      const menu = streamSplit.querySelector('.pg-upload-stream__menu');
      const close = () => {
        streamSplit.dataset.open = 'false';
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        if (menu) menu.hidden = true;
      };
      if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = streamSplit.dataset.open === 'true';
          streamSplit.dataset.open = isOpen ? 'false' : 'true';
          toggle.setAttribute('aria-expanded', String(!isOpen));
          menu.hidden = isOpen;
        });
        document.addEventListener('click', (e) => {
          if (!streamSplit.contains(e.target)) close();
        });
        menu.addEventListener('click', (e) => {
          if (e.target.closest('[role="menuitem"]')) close();
        });
      }
    }

    // Media-container hover line follows the cursor across player + dataviz
    document.querySelectorAll('.media-container').forEach((container) => {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        container.style.setProperty('--pg-hover-x', (e.clientX - rect.left) + 'px');
        container.dataset.hover = 'true';
      });
      container.addEventListener('mouseleave', () => {
        container.dataset.hover = 'false';
      });
    });

    // Stop button in the streaming overlay. stopPropagation: the click would
    // otherwise bubble to the plate's expand handler after the state flips.
    const stopBtn = document.getElementById('plate-stop-btn');
    if (stopBtn) stopBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isRecording) stopRecording();
    });

    // Exhausted-state CTA opens the HubSpot access modal
    const exhaustedCta = document.getElementById('plate-exhausted-cta');
    if (exhaustedCta) exhaustedCta.addEventListener('click', (e) => {
      e.stopPropagation();
      openHsModal();
    });

    // Velma "Try demo audio" re-runs the cached demo
    if (velmaDemoBtn) {
      velmaDemoBtn.addEventListener('click', () => {
        if (currentMode !== 'velma') return;
        showVelmaDemo();
        setPageTitle(resultsFilename.textContent);
        refreshBottomPanels();
        syncPlayerMeta();
      });
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── PLAYER CONTROLLER (design media-box around the hidden <audio>) ────────
  // ══════════════════════════════════════════════════════════════════════════
  const mediaBox = document.getElementById('audio-player');
  const playerIcon = mediaBox ? mediaBox.querySelector('.player-icon') : null;
  const playerPosIndicator = mediaBox ? mediaBox.querySelector('.player-position-indicator') : null;
  const playerCurrentTimeEl = mediaBox ? mediaBox.querySelector('[data-current-time]') : null;
  const playerTotalTimeEl = mediaBox ? mediaBox.querySelector('[data-total-time]') : null;
  const playerHoverIndicator = mediaBox ? mediaBox.querySelector('.player-hover-position-indicator') : null;
  const playerHoverTimeEl = mediaBox ? mediaBox.querySelector('[data-hover-time]') : null;

  // Which <audio> the transport controls drive. Redaction can flip to the
  // original (unredacted) track via the A/B chip; everything else uses results-audio.
  let abSelection = 'redacted';
  function activeAudio() {
    return (currentMode === 'redaction' && abSelection === 'original' && originalAudio)
      ? originalAudio : resultsAudio;
  }

  function setActiveAudio(which) {
    const prev = activeAudio();
    abSelection = which === 'original' ? 'original' : 'redacted';
    const next = activeAudio();
    if (abOriginalBtn) abOriginalBtn.classList.toggle('active', abSelection === 'original');
    if (abRedactedBtn) abRedactedBtn.classList.toggle('active', abSelection !== 'original');
    if (prev !== next) {
      const wasPlaying = prev && !prev.paused;
      const at = prev ? prev.currentTime : 0;
      if (prev) prev.pause();
      if (next) {
        try { next.currentTime = at; } catch (e) {}
        if (wasPlaying) next.play().catch(() => {});
      }
    }
    syncPlayerMeta();
  }

  function fmtPlayerTime(sec) {
    if (!isFinite(sec) || sec < 0) return '0:00';
    const s = Math.floor(sec);
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }

  function syncPlayerMeta() {
    const a = activeAudio();
    if (!a || !mediaBox) return;
    if (playerTotalTimeEl) playerTotalTimeEl.textContent = fmtPlayerTime(a.duration);
    if (playerCurrentTimeEl) playerCurrentTimeEl.textContent = fmtPlayerTime(a.currentTime);
    syncPlayerPosition();
  }

  function syncPlayerPosition() {
    const a = activeAudio();
    if (!a || !mediaBox) return;
    const dur = a.duration;
    const pct = (isFinite(dur) && dur > 0) ? (a.currentTime / dur) * 100 : 0;
    if (playerPosIndicator) playerPosIndicator.style.left = pct + '%';
    if (playerCurrentTimeEl) playerCurrentTimeEl.textContent = fmtPlayerTime(a.currentTime);
    if (playerIcon) playerIcon.dataset.playing = a.paused ? 'false' : 'true';
    if (mediaBox) mediaBox.dataset.playbackStarted = a.currentTime > 0 ? 'true' : 'false';
  }

  function initPlayerController() {
    if (!mediaBox) return;

    if (playerIcon) {
      playerIcon.addEventListener('click', (e) => {
        e.preventDefault();
        const a = activeAudio();
        if (!a || !a.src) return;
        if (a.paused) a.play().catch(() => {}); else a.pause();
      });
    }

    // Keep the view in sync with whichever audio element is active.
    [resultsAudio, originalAudio].forEach((a) => {
      if (!a) return;
      a.addEventListener('timeupdate', () => { if (a === activeAudio()) syncPlayerPosition(); });
      a.addEventListener('play',  () => { if (a === activeAudio() && playerIcon) playerIcon.dataset.playing = 'true'; });
      a.addEventListener('pause', () => { if (a === activeAudio() && playerIcon) playerIcon.dataset.playing = 'false'; });
      a.addEventListener('ended', () => { if (a === activeAudio() && playerIcon) playerIcon.dataset.playing = 'false'; });
      a.addEventListener('loadedmetadata', () => { if (a === activeAudio()) syncPlayerMeta(); });
      a.addEventListener('durationchange', () => { if (a === activeAudio()) syncPlayerMeta(); });
    });

    // Hover time + click-to-seek across the whole media container
    const container = mediaBox.closest('.media-container');
    const seekTarget = container || mediaBox;
    seekTarget.addEventListener('mousemove', (e) => {
      const a = activeAudio();
      if (!a || !isFinite(a.duration) || a.duration <= 0) return;
      const rect = mediaBox.getBoundingClientRect();
      const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      if (playerHoverIndicator) playerHoverIndicator.style.left = (frac * 100) + '%';
      if (playerHoverTimeEl) playerHoverTimeEl.textContent = fmtPlayerTime(frac * a.duration);
    });
    seekTarget.addEventListener('click', (e) => {
      if (e.target.closest('.player-icon') || e.target.closest('.pg-ab-toggle')) return;
      if (e.target.closest('.player-visualization') && e.target !== seekTarget) {
        // Clip strips have their own click-to-seek handlers with utterance context.
        if (e.target.closest('.transcript-clip, .pg-histo-bar, .mx-player-heat-cell, .aim-player-heat-cell, .pg-redaction-seg')) return;
      }
      const a = activeAudio();
      if (!a || !isFinite(a.duration) || a.duration <= 0) return;
      const rect = mediaBox.getBoundingClientRect();
      const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      a.currentTime = frac * a.duration;
      if (a.paused) a.play().catch(() => {});
    });

    if (abOriginalBtn) abOriginalBtn.addEventListener('click', () => setActiveAudio('original'));
    if (abRedactedBtn) abRedactedBtn.addEventListener('click', () => setActiveAudio('redacted'));
  }

  // ── Theme toggle (design service component, folded in) ─────────────────────
  function initThemeToggle() {
    const KEY = document.body.dataset.themeStorageKey || 'prototype-theme';
    const btns = document.querySelectorAll('.theme-toggle');
    if (!btns.length) return;
    const update = () => {
      const isDark = document.body.classList.contains('dark-mode');
      btns.forEach(btn => btn.setAttribute('aria-checked', isDark ? 'true' : 'false'));
    };
    update();
    btns.forEach(btn => btn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      document.body.classList.toggle('dark-mode', !isDark);
      try { localStorage.setItem(KEY, isDark ? 'light' : 'dark'); } catch (e) {}
      update();
    }));
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── DEEPFAKE MODE ─────────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  async function startDeepfakeAnalysis(file) {
    if (isAnalyzing) return;
    isAnalyzing = true;
    const durationMs = await getAudioDuration(file);
    showOverlay(file.name, 'Detecting synthetic voice across all segments');
    const estimatedMs = Math.max(MIN_PROGRESS_MS, (durationMs / SPEED_FACTOR));
    startProgress(estimatedMs);

    try {
      const startedAt = Date.now();
      const { data, meta } = await uploadAndAnalyze(file, '/api/velma-2-synthetic-voice-detection-batch');
      const processingMs = Date.now() - startedAt;
      await finishProgress();
      hideOverlay();

      if (lastDeepfakeAudioUrl) URL.revokeObjectURL(lastDeepfakeAudioUrl);
      audioObjectUrl = URL.createObjectURL(file);

      currentMeta = {
        fileSize: file.size,
        fileType: file.type || file.name.split('.').pop().toUpperCase(),
        httpStatus: meta.httpStatus,
        httpStatusText: meta.httpStatusText,
        responseSize: meta.responseSize,
        processingMs: processingMs,
      };

      lastDeepfakeData = data;
      lastDeepfakeAudioUrl = audioObjectUrl;
      lastDeepfakeMeta = { ...currentMeta };
      renderDeepfakeResults(data, audioObjectUrl);
      updateRateLimit();
    } catch (err) {
      showOverlayError(err.message || 'Analysis failed. Please try again.', err.rawText);
      isAnalyzing = false;
    }
  }

  function startDeepfakeRecording() {
    startRecordingCommon('/api/velma-2-synthetic-voice-detection-streaming?audio_format=s16le&sample_rate=16000&num_channels=1', (msg) => {
      if (msg?.type === 'frame' && msg.frame && typeof msg.frame.confidence === 'number') {
        liveFrames.push(msg.frame);
        renderDeepfakeLiveResults();
      } else if (msg?.type === 'done') {
        stopRecording();
      } else if (msg?.type === 'error') {
        showError('Streaming error: ' + (msg.error || 'Unknown'));
        if (liveFrames.length > 0) stopRecording();
        else cleanupRecording();
      }
    }, () => {
      resultsFilename.textContent = 'Live Recording';
      resultsAudio.removeAttribute('src');
      resultsAudio.load();
      if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = null; }
      currentData = null;

      renderVerdictStatement('deepfake-verdict-statement', {
        variant: '',
        title: 'Listening\u2026',
        stats: [{ value: '', label: 'No segments yet' }],
      });

      clearPlayerStrips();
      sttChart.innerHTML = '';

      resultsTbody.innerHTML = '';
      const placeholderRow = document.createElement('tr');
      const tdTime = document.createElement('td');
      tdTime.textContent = '0:00 \u2013 \u2026';
      const tdVerdict = document.createElement('td');
      const pill = document.createElement('span');
      pill.className = 'm__tag-flat';
      pill.textContent = 'Pending';
      tdVerdict.appendChild(pill);
      const tdConf = document.createElement('td');
      tdConf.textContent = '\u2014';
      placeholderRow.appendChild(tdTime);
      placeholderRow.appendChild(tdVerdict);
      placeholderRow.appendChild(tdConf);
      resultsTbody.appendChild(placeholderRow);

      window.scrollTo(0, 0);
    });
  }

  function renderDeepfakeLiveResults() {
    if (!liveFrames.length) return;
    const durationMs = Date.now() - recordingStartTime;
    currentData = { filename: 'Live Recording', frames: liveFrames, duration_ms: durationMs };
    resultsFilename.textContent = 'Live Recording';
    currentFrames = liveFrames;

    const { isSynthetic, synFrames, reason } = computeVerdict(liveFrames);

    renderVerdict(isSynthetic, synFrames.length, liveFrames.length, reason);
    renderHistogram(liveFrames);
    renderTable(liveFrames);
  }

  function renderDeepfakeResults(data, audioSrc) {
    currentData = data;
    resultsFilename.textContent = data.filename || 'Audio file';
    resultsAudio.src = audioSrc;

    const frames = data.frames || [];
    currentFrames = frames;

    if (frames.length === 0) {
      renderVerdictStatement('deepfake-verdict-statement', {
        variant: '',
        title: 'Insufficient data',
        stats: [{ value: '', label: 'Audio too short to analyze' }],
      });
      renderHistogram(frames);
      renderTable(frames);
      return;
    }

    const { isSynthetic, synFrames, reason } = computeVerdict(frames);

    renderVerdict(isSynthetic, synFrames.length, frames.length, reason);
    renderHistogram(frames);
    renderTable(frames);
    setupPlaybackTracking(frames);
    window.scrollTo(0, 0);
  }

  // Shared: design verdict statement into a .pg-verdict-slot container.
  // spec: { variant: 'danger'|'success'|'', title, stats: [{value, label}] }
  function renderVerdictStatement(containerId, spec) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.className = 'pg-verdict-statement' + (spec.variant ? ' ' + spec.variant : '');
    let html = '<h2 class="pg-verdict-statement-title">' +
      '<a class="pg-verdict-statement-link" href="#audio-player">' + escapeHtml(spec.title) + '</a></h2>';
    if (spec.stats && spec.stats.length) {
      html += '<div class="pg-verdict-statement-details">';
      spec.stats.forEach(s => {
        html += '<span class="pg-verdict-statement-stat">' +
          (s.value !== '' && s.value != null
            ? '<span class="pg-verdict-statement-stat-value">' + escapeHtml(String(s.value)) + '</span> '
            : '') +
          '<span class="pg-verdict-statement-stat-label">' + escapeHtml(s.label) + '</span></span>';
      });
      html += '</div>';
    }
    el.innerHTML = html;
    // Smooth-scroll the title link to the player
    const link = el.querySelector('.pg-verdict-statement-link');
    if (link) link.addEventListener('click', (e) => {
      e.preventDefault();
      const player = document.getElementById('audio-player');
      if (player) player.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function renderVerdict(isSynthetic, syntheticCount, totalCount, reason) {
    const stats = [{ value: syntheticCount + '/' + totalCount, label: 'deepfake segments' }];
    if (isSynthetic && reason) {
      // e.g. "3 segments with >98% conf." — split the leading count into the value slot
      const m = reason.match(/^(\d+)\s+(.*)$/);
      stats.push(m ? { value: m[1], label: m[2] } : { value: '', label: reason });
    }
    renderVerdictStatement('deepfake-verdict-statement', {
      variant: isSynthetic ? 'danger' : 'success',
      title: isSynthetic ? 'This is a deepfake' : 'This is authentic',
      stats: stats,
    });
  }

  // Remove any mode-specific strip overlays from the player visualization
  // (each mode's renderer draws its own; #stt-chart is cleared separately).
  function clearPlayerStrips() {
    const viz = document.getElementById('player-visualization');
    if (!viz) return;
    viz.querySelectorAll('.df-player-clips, .mx-player-heat, .aim-player-heat, .pg-redaction-player-track')
      .forEach(el => el.remove());
  }

  function renderHistogram(frames) {
    const viz = document.getElementById('player-visualization');
    clearPlayerStrips();
    sttChart.innerHTML = '';
    syncSpeakerLanes([]);
    if (!frames.length || !viz) return;

    const strip = document.createElement('div');
    strip.className = 'pg-histo-squares df-player-clips';

    frames.forEach((frame, i) => {
      const bar = document.createElement('div');
      bar.className = 'pg-histo-bar ' + verdictClass(frame);
      bar.style.opacity = confidenceToOpacity(frame.confidence);
      bar.dataset.tooltip = formatMs(frame.start_time_ms) + ' \u2013 ' + formatMs(frame.end_time_ms) +
        ' \u00B7 ' + verdictText(frame) + ' \u00B7 ' + (frame.confidence * 100).toFixed(0) + '%';
      bar.addEventListener('click', () => seekTo(frame.start_time_ms, i));
      strip.appendChild(bar);
    });
    viz.appendChild(strip);
  }

  function renderTable(frames) {
    resultsTbody.innerHTML = '';
    frames.forEach((frame, i) => {
      const tr = document.createElement('tr');
      tr.dataset.index = i;
      const vc = verdictClass(frame);
      const chipClass = vc === 'synthetic' ? 'verdict-synthetic' : vc === 'authentic' ? 'verdict-authentic' : '';

      const tdTime = document.createElement('td');
      tdTime.textContent = formatMs(frame.start_time_ms) + ' \u2013 ' + formatMs(frame.end_time_ms);

      const tdVerdict = document.createElement('td');
      const pill = document.createElement('span');
      pill.className = 'm__tag-flat' + (chipClass ? ' ' + chipClass : '');
      pill.textContent = verdictText(frame);
      tdVerdict.appendChild(pill);

      const tdConf = document.createElement('td');
      const confWrap = document.createElement('div');
      confWrap.className = 'pg-confidence-cell';
      const confTrack = document.createElement('div');
      confTrack.className = 'pg-confidence-bar-track';
      const confFill = document.createElement('div');
      confFill.className = 'pg-confidence-bar-fill ' + vc;
      confFill.style.width = (frame.confidence * 100) + '%';
      confTrack.appendChild(confFill);
      const confText = document.createElement('span');
      confText.textContent = (frame.confidence * 100).toFixed(1) + '%';
      confWrap.appendChild(confTrack);
      confWrap.appendChild(confText);
      tdConf.appendChild(confWrap);

      tr.appendChild(tdTime);
      tr.appendChild(tdVerdict);
      tr.appendChild(tdConf);
      tr.addEventListener('click', () => seekTo(frame.start_time_ms, i));
      resultsTbody.appendChild(tr);
    });
  }

  function deepfakeStrip() {
    const viz = document.getElementById('player-visualization');
    return viz ? viz.querySelector('.df-player-clips') : null;
  }

  function seekTo(startMs, index) {
    if (resultsAudio) {
      resultsAudio.currentTime = startMs / 1000;
      resultsAudio.play().catch(() => {});
    }
    const strip = deepfakeStrip();
    if (strip) strip.querySelectorAll('.pg-histo-bar').forEach((bar, i) => bar.classList.toggle('active', i === index));
    resultsTbody.querySelectorAll('tr').forEach((row, i) => row.classList.toggle('active', i === index));
  }

  function setupPlaybackTracking(frames) {
    if (playbackTracker) cancelAnimationFrame(playbackTracker);
    const strip = deepfakeStrip();
    const bars = strip ? strip.querySelectorAll('.pg-histo-bar') : [];
    const rows = resultsTbody.querySelectorAll('tr');

    function tick() {
      if (resultsAudio.paused) { playbackTracker = requestAnimationFrame(tick); return; }
      const currentMs = resultsAudio.currentTime * 1000;
      // Find the last frame whose start_time_ms <= currentMs (handles overlapping frames)
      let activeIdx = -1;
      for (let i = frames.length - 1; i >= 0; i--) {
        if (currentMs >= frames[i].start_time_ms && currentMs < frames[i].end_time_ms) { activeIdx = i; break; }
      }
      bars.forEach((bar, i) => bar.classList.toggle('active', i === activeIdx));
      rows.forEach((row, i) => row.classList.toggle('active', i === activeIdx));
      playbackTracker = requestAnimationFrame(tick);
    }
    playbackTracker = requestAnimationFrame(tick);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── TRANSCRIPTION MODE ────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  async function startTranscriptionBatch(file) {
    if (isAnalyzing) return;
    isAnalyzing = true;
    const durationMs = await getAudioDuration(file);
    showOverlay(file.name, 'Analyzing audio');
    const speedFactor = getSttSpeedFactor();
    const estimatedMs = Math.max(MIN_PROGRESS_MS, (durationMs / speedFactor));
    startProgress(estimatedMs);

    try {
      const startedAt = Date.now();
      const fast = isFastMode();
      const endpoint = fast ? '/api/velma-2-stt-batch-english-vfast' : '/api/velma-2-stt-batch';
      currentSttModel = endpoint.replace(/^\/api\//, '');
      debugReset();
      const opts = fast ? {} : getSttOptions();
      const { data, meta } = await uploadAndAnalyze(file, endpoint, opts);
      const processingMs = Date.now() - startedAt;
      await finishProgress();
      hideOverlay();

      if (lastSttAudioUrl) URL.revokeObjectURL(lastSttAudioUrl);
      audioObjectUrl = URL.createObjectURL(file);

      currentMeta = {
        fileSize: file.size,
        fileType: file.type || file.name.split('.').pop().toUpperCase(),
        httpStatus: meta.httpStatus,
        httpStatusText: meta.httpStatusText,
        responseSize: meta.responseSize,
        processingMs: processingMs,
      };

      // vfast returns { text, duration_ms } — wrap into utterance format
      if (fast && !data.utterances && data.text) {
        data.utterances = [{ text: data.text, start_ms: 0, duration_ms: data.duration_ms || 0 }];
      }
      sttData = data;
      currentData = data;
      sttUtterances = data.utterances || [];
      sttPartial = null;

      lastSttData = data;
      lastSttAudioUrl = audioObjectUrl;
      lastSttMeta = { ...currentMeta };
      resultsFilename.textContent = data.filename || file.name || 'Audio file';
      resultsAudio.src = audioObjectUrl;
      renderTranscript();
      window.scrollTo(0, 0);
      updateRateLimit();
    } catch (err) {
      showOverlayError(err.message || 'Transcription failed. Please try again.', err.rawText);
      isAnalyzing = false;
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── PII/PHI REDACTION MODE ────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  function getRedactionOptions() {
    return {
      speaker_diarization: optRedactDiarization ? optRedactDiarization.checked : true,
      start_redaction_padding_ms: optRedactStartPad ? (parseInt(optRedactStartPad.value, 10) || 0) : 80,
      end_redaction_padding_ms: optRedactEndPad ? (parseInt(optRedactEndPad.value, 10) || 0) : 10,
    };
  }

  function parseMultipartBuffer(buf, boundary) {
    const enc = new TextEncoder();
    const sep = enc.encode('--' + boundary);
    const crlfcrlf = enc.encode('\r\n\r\n');

    function indexOf(haystack, needle, from) {
      from = from || 0;
      outer: for (let i = from; i <= haystack.length - needle.length; i++) {
        for (let j = 0; j < needle.length; j++) {
          if (haystack[i + j] !== needle[j]) continue outer;
        }
        return i;
      }
      return -1;
    }

    const parts = {};
    let pos = 0;

    while (pos < buf.length) {
      const bStart = indexOf(buf, sep, pos);
      if (bStart === -1) break;
      const afterBoundary = bStart + sep.length;
      // Terminal boundary: --boundary--
      if (buf[afterBoundary] === 45 && buf[afterBoundary + 1] === 45) break;
      // Skip CRLF after boundary line
      const headerStart = afterBoundary + 2;
      const headerEnd = indexOf(buf, crlfcrlf, headerStart);
      if (headerEnd === -1) break;
      const headerText = new TextDecoder().decode(buf.slice(headerStart, headerEnd));
      const bodyStart = headerEnd + 4;
      const nextBoundary = indexOf(buf, sep, bodyStart);
      if (nextBoundary === -1) break;
      // Trim trailing \r\n before next boundary
      const body = buf.slice(bodyStart, nextBoundary - 2);
      if (headerText.includes('name="metadata"')) parts.metadata = body;
      else if (headerText.includes('name="audio"')) parts.audio = body;
      pos = nextBoundary;
    }
    return parts;
  }

  async function uploadAndAnalyzeMultipart(file, endpoint, extraFields) {
    const formData = new FormData();
    formData.append('upload_file', file);
    if (extraFields) {
      for (const [k, v] of Object.entries(extraFields)) formData.append(k, String(v));
    }
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && analysisStatus) {
          const pct = Math.round(e.loaded / e.total * 100);
          analysisStatus.textContent = pct < 100 ? 'Uploading\u2026 ' + pct + '%' : 'Processing on server\u2026';
        }
      });
      xhr.upload.addEventListener('load', () => {
        if (analysisStatus) analysisStatus.textContent = 'Processing on server\u2026';
      });
      xhr.responseType = 'arraybuffer';
      xhr.addEventListener('load', () => {
        if (xhr.status < 200 || xhr.status >= 300) {
          let detail = 'Server error (' + xhr.status + ')';
          try { const body = JSON.parse(new TextDecoder().decode(xhr.response)); detail = body.detail || body.message || detail; } catch {}
          const err = new Error(detail); err.httpStatus = xhr.status; err.rawText = ''; reject(err); return;
        }
        const contentType = xhr.getResponseHeader('content-type') || '';
        const bMatch = contentType.match(/boundary=([^;,\s"]+)/);
        if (!bMatch) { reject(new Error('Invalid response: missing multipart boundary')); return; }
        const boundary = bMatch[1];
        let parts;
        try { parts = parseMultipartBuffer(new Uint8Array(xhr.response), boundary); } catch {
          reject(new Error('Failed to parse multipart response')); return;
        }
        if (!parts.metadata) { reject(new Error('Invalid response: missing metadata part')); return; }
        if (!parts.audio) { reject(new Error('Invalid response: missing audio part')); return; }
        let metadata;
        try { metadata = JSON.parse(new TextDecoder().decode(parts.metadata)); } catch {
          reject(new Error('Invalid metadata JSON in response')); return;
        }
        resolve({
          metadata,
          audioBlob: new Blob([parts.audio], { type: 'audio/mpeg' }),
          meta: { httpStatus: xhr.status, httpStatusText: xhr.statusText, responseSize: xhr.response.byteLength },
        });
      });
      xhr.addEventListener('error', () => { const err = new Error('Network error — could not reach server'); err.rawText = ''; reject(err); });
      xhr.addEventListener('timeout', () => { const err = new Error('Request timed out'); err.rawText = ''; reject(err); });
      xhr.open('POST', endpoint);
      xhr.timeout = 300000;
      xhr.send(formData);
    });
  }

  async function startRedactionBatch(file) {
    if (isAnalyzing) return;
    isAnalyzing = true;
    const durationMs = await getAudioDuration(file);
    showOverlay(file.name, 'Redacting audio');
    const estimatedMs = Math.max(MIN_PROGRESS_MS, durationMs / 8);
    startProgress(estimatedMs);

    try {
      const startedAt = Date.now();
      const opts = getRedactionOptions();
      const { metadata, audioBlob, meta } = await uploadAndAnalyzeMultipart(
        file, '/api/velma-2-pii-phi-redaction-batch', opts
      );
      const processingMs = Date.now() - startedAt;
      await finishProgress();
      hideOverlay();
      isAnalyzing = false;

      if (lastRedactionAudioUrl) URL.revokeObjectURL(lastRedactionAudioUrl);
      if (lastRedactionOriginalUrl) URL.revokeObjectURL(lastRedactionOriginalUrl);
      const redactedUrl = URL.createObjectURL(audioBlob);
      const originalUrl = URL.createObjectURL(file);
      metadata.filename = file.name;

      currentMeta = {
        fileSize: file.size,
        fileType: file.type || file.name.split('.').pop().toUpperCase(),
        httpStatus: meta.httpStatus,
        httpStatusText: meta.httpStatusText,
        responseSize: meta.responseSize,
        processingMs,
      };

      redactionData = metadata;
      currentData = metadata;
      lastRedactionData = metadata;
      lastRedactionAudioUrl = redactedUrl;
      lastRedactionOriginalUrl = originalUrl;
      lastRedactionMeta = { ...currentMeta };
      redactionUtterances = metadata.utterances || [];

      resultsFilename.textContent = metadata.filename || file.name;
      resultsAudio.src = redactedUrl;
      if (originalAudio) originalAudio.src = originalUrl;

      const ranges = metadata.redaction_ranges || [];
      const durMs = metadata.duration_ms || 0;
      renderRedactionTimeline(ranges, durMs);
      renderRedactionTranscript(redactionUtterances);
      renderRedactionSidebar(ranges, durMs);
      if (durMs) {
        setupRedactionPlaybackTracking(durMs);
        setupRedactionTranscriptTracking(redactionUtterances);
      }
      window.scrollTo(0, 0);
      updateRateLimit();
    } catch (err) {
      showOverlayError(err.message || 'Redaction failed. Please try again.', err.rawText);
      isAnalyzing = false;
    }
  }

  // Redaction ranges as a strip overlay in the player visualization.
  function renderRedactionTimeline(ranges, durationMs) {
    const viz = document.getElementById('player-visualization');
    clearPlayerStrips();
    sttChart.innerHTML = '';
    syncSpeakerLanes([]);
    if (!viz || !durationMs || durationMs <= 0) return;

    const track = document.createElement('div');
    track.className = 'pg-redaction-player-track';
    ranges.forEach(([startMs, endMs]) => {
      const seg = document.createElement('div');
      seg.className = 'pg-redaction-seg';
      seg.style.left = (startMs / durationMs * 100).toFixed(3) + '%';
      seg.style.width = Math.max(0.3, (endMs - startMs) / durationMs * 100).toFixed(3) + '%';
      seg.dataset.tooltip = formatMs(startMs) + ' \u2013 ' + formatMs(endMs) + ' \u00b7 ' + ((endMs - startMs) / 1000).toFixed(1) + 's silenced';
      seg.addEventListener('click', (e) => {
        e.stopPropagation();
        const a = activeAudio();
        if (a) { a.currentTime = startMs / 1000; a.play().catch(() => {}); }
      });
      track.appendChild(seg);
    });
    viz.appendChild(track);
  }

  function renderRedactionTranscript(utterances) {
    redactionTranscriptList.innerHTML = '';
    if (!utterances.length) {
      const empty = document.createElement('div');
      empty.className = 'pg-transcript-empty';
      empty.textContent = 'Upload an audio file to see the redacted transcript.';
      redactionTranscriptList.appendChild(empty);
      return;
    }
    const showDiarization = optRedactDiarization ? optRedactDiarization.checked : true;
    utterances.slice().sort((a, b) => (a.start_ms || 0) - (b.start_ms || 0)).forEach(u => {
      redactionTranscriptList.appendChild(buildRedactionUtteranceEl(u, showDiarization));
    });
  }

  function buildRedactionUtteranceEl(u, showDiarization) {
    const el = document.createElement('div');
    const side = (u.speaker != null && u.speaker % 2 === 0) ? 'speaker-right' : 'speaker-left';
    el.className = 'pg-transcript-utterance ' + side;
    if (u.start_ms != null) {
      el.addEventListener('click', () => {
        const a = activeAudio();
        if (a) { a.currentTime = u.start_ms / 1000; a.play().catch(() => {}); }
      });
    }
    const header = document.createElement('div');
    header.className = 'pg-transcript-utterance-header';
    if (u.start_ms != null) {
      const time = document.createElement('span');
      time.className = 'pg-transcript-time';
      time.textContent = formatMs(u.start_ms);
      header.appendChild(time);
    }
    if (u.speaker != null && showDiarization) {
      const sp = document.createElement('span');
      sp.className = 'pg-transcript-speaker';
      sp.textContent = 'Speaker ' + u.speaker;
      header.appendChild(sp);
    }
    if (u.language) {
      const lf = document.createElement('span');
      lf.className = 'pg-transcript-flag';
      lf.textContent = languageName(u.language);
      header.appendChild(lf);
    }
    el.appendChild(header);
    const text = document.createElement('div');
    text.className = 'pg-transcript-text';
    const par = document.createElement('p');
    if (u.text && (/\[REDACTED\]/i.test(u.text) || /<(pii|phi)/i.test(u.text))) {
      par.innerHTML = renderRedactionText(u.text);
    } else {
      par.textContent = u.text || '';
    }
    text.appendChild(par);
    el.appendChild(text);
    return el;
  }

  function renderRedactionText(rawText) {
    // Handle both typed (<pii:firstname>, <phi:ssn>) and bare (<phi>, <pii>) tags
    const piiRegex = /<(pii|phi)(?::(\w+))?>([\s\S]*?)<\/\1(?::\2)?>/gi;
    if (piiRegex.test(rawText)) {
      piiRegex.lastIndex = 0;
      let result = '';
      let lastIdx = 0;
      let match;
      while ((match = piiRegex.exec(rawText)) !== null) {
        result += escapeHtml(rawText.slice(lastIdx, match.index));
        const tagKind = match[1].toUpperCase(); // PII or PHI
        const label = match[2] ? match[2].replace(/_/g, ' ').toUpperCase() : tagKind;
        result += '<span class="pii-tag" data-tooltip="' + escapeHtml(tagKind) + ': ' + escapeHtml(label.toLowerCase()) + '">[' + label + ']</span>';
        lastIdx = match.index + match[0].length;
      }
      result += escapeHtml(rawText.slice(lastIdx));
      return result;
    }
    // Handle [REDACTED] markers
    const parts = rawText.split(/(\[REDACTED\])/gi);
    return parts.map(p => /^\[REDACTED\]$/i.test(p)
      ? '<span class="pii-tag">[REDACTED]</span>'
      : escapeHtml(p)
    ).join('');
  }

  function renderRedactionSidebar(ranges, durationMs) {
    const totalSilencedMs = ranges.reduce((s, [a, b]) => s + (b - a), 0);
    const pct = durationMs > 0 ? totalSilencedMs / durationMs * 100 : 0;
    renderVerdictStatement('redaction-verdict-statement', {
      variant: 'success',
      title: ranges.length + ' redaction' + (ranges.length === 1 ? '' : 's') + ' made',
      stats: [
        { value: (totalSilencedMs / 1000).toFixed(1) + 's', label: 'silenced' },
        { value: pct.toFixed(1) + '%', label: 'of audio' },
      ],
    });
  }

  function setupRedactionPlaybackTracking(durationMs) {
    if (redactionPlaybackTracker) cancelAnimationFrame(redactionPlaybackTracker);
    if (!durationMs) return;
    redactionPlayhead.classList.add('active');
    function tick() {
      const pct = Math.min(resultsAudio.currentTime * 1000 / durationMs, 1);
      redactionPlayhead.style.left = (pct * 100).toFixed(3) + '%';
      redactionPlaybackTracker = requestAnimationFrame(tick);
    }
    redactionPlaybackTracker = requestAnimationFrame(tick);
  }

  function setupRedactionTranscriptTracking(utterances) {
    if (redactionTranscriptTracker) cancelAnimationFrame(redactionTranscriptTracker);
    if (!utterances.length) return;
    const sorted = utterances.slice().sort((a, b) => (a.start_ms || 0) - (b.start_ms || 0));
    function tick() {
      const currentMs = resultsAudio.currentTime * 1000;
      let activeIdx = -1;
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (currentMs >= sorted[i].start_ms) { activeIdx = i; break; }
      }
      redactionTranscriptList.querySelectorAll('.pg-transcript-utterance').forEach((el, i) => {
        el.classList.toggle('active', i === activeIdx);
      });
      redactionTranscriptTracker = requestAnimationFrame(tick);
    }
    redactionTranscriptTracker = requestAnimationFrame(tick);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── MUSIC DETECTION MODE ──────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  async function startMusicAnalysis(file) {
    if (isAnalyzing) return;
    isAnalyzing = true;
    const durationMs = await getAudioDuration(file);
    showOverlay(file.name, 'Detecting music and speech');
    // Music model on GPU runs ~35x realtime (e.g. 3.5min clip → ~5–6s).
    const estimatedMs = Math.max(MIN_PROGRESS_MS, durationMs / 35);
    startProgress(estimatedMs);

    try {
      const startedAt = Date.now();
      const { data, meta } = await uploadAndAnalyze(file, '/api/velma-2-music-detection-batch');
      // New GPU batch model returns frames keyed by `_ms`; renderer expects `_s`.
      if (Array.isArray(data.frames)) {
        for (const f of data.frames) {
          if (f.start_time_s == null && f.start_time_ms != null) f.start_time_s = f.start_time_ms / 1000;
          if (f.end_time_s   == null && f.end_time_ms   != null) f.end_time_s   = f.end_time_ms   / 1000;
        }
      }
      const processingMs = Date.now() - startedAt;
      await finishProgress();
      hideOverlay();
      isAnalyzing = false;

      if (lastMusicAudioUrl) URL.revokeObjectURL(lastMusicAudioUrl);
      audioObjectUrl = URL.createObjectURL(file);

      currentMeta = {
        fileSize: file.size,
        fileType: file.type || file.name.split('.').pop().toUpperCase(),
        httpStatus: meta.httpStatus,
        httpStatusText: meta.httpStatusText,
        responseSize: meta.responseSize,
        processingMs,
      };

      lastMusicData = data;
      lastMusicAudioUrl = audioObjectUrl;
      lastMusicMeta = { ...currentMeta };
      renderMusicResults(data, audioObjectUrl);
      updateRateLimit();
    } catch (err) {
      showOverlayError(err.message || 'Music detection failed. Please try again.', err.rawText);
      isAnalyzing = false;
    }
  }

  function renderMusicResults(data, audioSrc) {
    currentData = data;
    resultsFilename.textContent = data.filename || 'Audio file';
    resultsAudio.src = audioSrc;

    const frames = data.frames || [];
    currentFrames = frames;

    renderMusicVerdict(data);
    renderMusicHistogram(frames);
    renderMusicTable(frames, musicView);
    if (frames.length) setupMusicPlaybackTracking(frames);
    window.scrollTo(0, 0);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── LANGUAGE DETECTION MODE ──────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  // The hero card itself acts as a click + drop target so the user doesn't
  // have to use the small "Upload or drop a file" button at the top.
  if (langHero && fileInput) {
    langHero.addEventListener('click', (e) => {
      // Don't intercept clicks on interactive children (e.g. the embedded audio).
      if (e.target.closest('button, a, audio, input')) return;
      fileInput.click();
    });
    let langDragCtr = 0;
    langHero.addEventListener('dragenter', (e) => {
      e.preventDefault();
      langDragCtr++;
      langHero.classList.add('drag-over');
    });
    langHero.addEventListener('dragleave', (e) => {
      e.preventDefault();
      langDragCtr--;
      if (langDragCtr <= 0) { langDragCtr = 0; langHero.classList.remove('drag-over'); }
    });
    langHero.addEventListener('dragover', (e) => e.preventDefault());
    langHero.addEventListener('drop', (e) => {
      e.preventDefault();
      langDragCtr = 0;
      langHero.classList.remove('drag-over');
      if (e.dataTransfer.files.length > 0) {
        startLanguageDetection(e.dataTransfer.files[0]);
      }
    });
  }

  function resetLanguageHero() {
    renderVerdictStatement('language-verdict-statement', {
      variant: '',
      title: 'Identify spoken language',
      stats: [{ value: '', label: 'Upload an audio clip to detect its language' }],
    });
  }

  async function startLanguageDetection(file) {
    if (isAnalyzing) return;
    isAnalyzing = true;
    showOverlay(file.name, 'Identifying spoken language');
    // Language detection only looks at the first 30s, so it's fast regardless
    // of file length. Pace the progress bar to ~3 seconds.
    startProgress(3000);

    try {
      const startedAt = Date.now();
      const { data, meta } = await uploadAndAnalyze(file, '/api/velma-2-language-detection-batch');
      const processingMs = Date.now() - startedAt;
      await finishProgress();
      hideOverlay();
      isAnalyzing = false;

      if (lastLanguageAudioUrl) URL.revokeObjectURL(lastLanguageAudioUrl);
      audioObjectUrl = URL.createObjectURL(file);

      currentMeta = {
        fileSize: file.size,
        fileType: file.type || file.name.split('.').pop().toUpperCase(),
        httpStatus: meta.httpStatus,
        httpStatusText: meta.httpStatusText,
        responseSize: meta.responseSize,
        processingMs,
      };

      // The API doesn't echo the filename, so we keep it ourselves.
      lastLanguageData = data;
      lastLanguageAudioUrl = audioObjectUrl;
      lastLanguageMeta = { ...currentMeta };
      lastLanguageFilename = file.name;

      currentData = data;
      resultsFilename.textContent = file.name;
      resultsAudio.src = audioObjectUrl;
      renderLanguageResult(data);
      window.scrollTo(0, 0);
      updateRateLimit();
    } catch (err) {
      showOverlayError(err.message || 'Language detection failed. Please try again.', err.rawText);
      isAnalyzing = false;
    }
  }

  function renderLanguageResult(data) {
    const code = data.predicted_language_code || '';
    const name = data.predicted_language || 'Unknown';
    const conf = typeof data.confidence === 'number' ? data.confidence : 0;
    const durMs = typeof data.duration_ms === 'number' ? data.duration_ms : null;

    const pct = Math.max(0, Math.min(1, conf));
    const lowConf = conf < 0.5;
    const stats = [
      { value: (pct * 100).toFixed(1) + '%', label: 'confidence' },
      { value: '', label: (durMs != null && durMs > 30000) ? 'First 30s analyzed' : 'Full clip analyzed' },
    ];
    if (lowConf) {
      stats.push({ value: '', label: 'Low confidence — consider a longer or cleaner clip' });
    }
    renderVerdictStatement('language-verdict-statement', {
      variant: lowConf ? '' : 'success',
      title: 'This is ' + name + (code ? ' (' + code.toUpperCase() + ')' : ''),
      stats: stats,
    });

    // Language mode hides the dataviz (body[data-mode] CSS); clear any leftover strip.
    clearPlayerStrips();
    sttChart.innerHTML = '';
  }

  // ── AI Music Detection ─────────────────────────────────────────────────────
  async function startAimusicAnalysis(file) {
    if (isAnalyzing) return;
    isAnalyzing = true;
    showOverlay(file.name, 'Detecting AI-generated music');
    // The preview model takes ~0.5-2.5s depending on the file; pace progress
    // bar to a reasonable middle estimate.
    startProgress(Math.max(2500, Math.min(8000, file.size / 50000)));

    try {
      const startedAt = Date.now();
      const { data, meta } = await uploadAndAnalyze(file, '/api/velma-2-ai-music-detection-batch');
      const processingMs = Date.now() - startedAt;
      await finishProgress();
      hideOverlay();
      isAnalyzing = false;

      if (lastAimusicAudioUrl && lastAimusicAudioUrl !== DEMO_AIMUSIC_AUDIO_URL) {
        URL.revokeObjectURL(lastAimusicAudioUrl);
      }
      audioObjectUrl = URL.createObjectURL(file);

      currentMeta = {
        fileSize: file.size,
        fileType: file.type || file.name.split('.').pop().toUpperCase(),
        httpStatus: meta.httpStatus,
        httpStatusText: meta.httpStatusText,
        responseSize: meta.responseSize,
        processingMs,
      };

      lastAimusicData = data;
      lastAimusicAudioUrl = audioObjectUrl;
      lastAimusicMeta = { ...currentMeta };
      lastAimusicFilename = file.name;

      currentData = data;
      resultsFilename.textContent = file.name;
      resultsAudio.src = audioObjectUrl;
      renderAimusicResult(data);
      window.scrollTo(0, 0);
      updateRateLimit();
    } catch (err) {
      showOverlayError(err.message || 'AI music detection failed. Please try again.', err.rawText);
      isAnalyzing = false;
    }
  }

  function renderAimusicResult(data) {
    const verdict = data.primary_verdict || 'unknown';
    const n = (x) => (typeof x === 'number' && isFinite(x)) ? x : 0;
    const vAiPct = n(data.vocal_ai_percentage);
    const iAiPct = n(data.instrumental_ai_percentage);
    const iConf  = n(data.instrumental_ai_confidence);

    const titles = {
      'ai-vocal-music':  'This is AI vocal music',
      'ai-instrumental': 'This is AI instrumental',
      'not-ai-music':    'Not AI music',
    };
    const isAi = verdict === 'ai-vocal-music' || verdict === 'ai-instrumental';
    const stats = [];
    stats.push({ value: vAiPct.toFixed(1) + '%', label: 'AI on vocals' });
    if (iConf > 0 || iAiPct > 0) {
      stats.push({ value: iAiPct.toFixed(1) + '%', label: 'AI on instrumental' });
    } else {
      stats.push({ value: '', label: 'Instrumental not evaluated' });
    }
    stats.push({
      value: '',
      label: 'Content: vocals ' + n(data.vocal_percentage).toFixed(0) + '% \u00b7 instrumental ' +
        n(data.instrumental_percentage).toFixed(0) + '% \u00b7 silence ' + n(data.silence_percentage).toFixed(0) + '%',
    });
    renderVerdictStatement('aimusic-verdict-statement', {
      variant: isAi ? 'danger' : (verdict === 'not-ai-music' ? 'success' : ''),
      title: titles[verdict] || 'Unknown content',
      stats: stats,
    });

    // Per-window strip + table. Batch ships windows[]; streaming's final render
    // passes the accumulated windows through data.windows.
    const windows = (Array.isArray(data.windows) && data.windows.length) ? data.windows : liveAimusicWindows;
    renderAimusicTimeline(windows);
    setupAimusicPlaybackTracking(windows);
  }

  // ── AI Music per-window strip + table (shared by batch + streaming) ────
  let aimusicWindows = [];   // windows backing the current strip/table (for seek + playback)

  function aimusicWinDurMs(w) {
    return Math.max(0, (w.end_time_ms || 0) - (w.start_time_ms || 0));
  }

  // The headline question is "AI or not?", so the strip + chips collapse to
  // three states: `ai` (synthetic vocals OR AI instrumental), `human` (real
  // content, not flagged), `silence`. The vocal/instrumental nuance lives in
  // the table's Type column instead.
  function aimusicVerdict(w) {
    const vC = w.vocal_percentage || 0, iC = w.instrumental_percentage || 0, sil = w.silence_percentage || 0;
    if (sil >= 60 && vC < 50 && iC < 50) return 'silence';
    const iAi = w.instrumental_ai_percentage;   // batch: 0-1 probability; absent on streaming windows
    if ((w.vocal_ai_percentage || 0) >= 50 || (typeof iAi === 'number' && iAi >= 0.5)) return 'ai';
    return 'human';
  }

  // Which detection path the window was routed to, from its content mix.
  function aimusicType(w) {
    const vC = w.vocal_percentage || 0, iC = w.instrumental_percentage || 0, sil = w.silence_percentage || 0;
    if (sil >= 60 && vC < 50 && iC < 50) return 'silence';
    if (vC >= 50) return 'vocal';
    if (iC >= 50) return 'instrumental';
    return 'silence';
  }

  // The window's AI-detection confidence (only meaningful when verdict is `ai`).
  function aimusicWindowConfidence(w) {
    const t = aimusicType(w);
    if (t === 'vocal') return w.vocal_ai_confidence || 0;
    if (t === 'instrumental') return w.instrumental_ai_confidence || 0;
    return 0;
  }

  function aimusicClock(ms) {
    const total = Math.round((ms || 0) / 1000);
    const m = Math.floor(total / 60);
    return m + ':' + String(total % 60).padStart(2, '0');
  }

  const AIMUSIC_VERDICT_TEXT = { ai: 'AI', human: 'Not AI', silence: 'Silence' };
  const AIMUSIC_TYPE_TEXT    = { vocal: 'Vocal', instrumental: 'Instrumental', silence: 'Silence' };
  const AIMUSIC_CELL_VERDICT = { ai: 'ai', human: 'not-ai', silence: 'silence' };
  const AIMUSIC_CHIP_CLASS   = { ai: 'aim-verdict-ai', human: 'aim-verdict-not-ai', silence: '' };

  function aimusicTooltipText(w) {
    const v = aimusicVerdict(w), t = aimusicType(w);
    const time = aimusicClock(w.start_time_ms) + ' \u2013 ' + aimusicClock(w.end_time_ms);
    if (t === 'silence') return time + ' \u00b7 Silence';
    const c = aimusicWindowConfidence(w);
    const confStr = (v === 'ai' && c > 0) ? ' \u00b7 ' + (c * 100).toFixed(0) + '%' : '';
    return time + ' \u00b7 ' + AIMUSIC_TYPE_TEXT[t] + ' \u00b7 ' + AIMUSIC_VERDICT_TEXT[v] + confStr;
  }

  // Strip inside the player visualization, one cell per window, width \u221d duration.
  function renderAimusicTimeline(windows) {
    windows = windows || [];
    aimusicWindows = windows;
    const viz = document.getElementById('player-visualization');
    clearPlayerStrips();
    sttChart.innerHTML = '';
    syncSpeakerLanes([]);
    if (aimusicTbody) aimusicTbody.innerHTML = '';
    if (!windows.length || !viz) return;

    const heat = document.createElement('div');
    heat.className = 'aim-player-heat';
    windows.forEach((w, i) => {
      const v = aimusicVerdict(w);
      const cell = document.createElement('div');
      cell.className = 'aim-player-heat-cell';
      cell.dataset.verdict = AIMUSIC_CELL_VERDICT[v];
      cell.dataset.index = i;
      cell.style.flexGrow = String(Math.max(1, aimusicWinDurMs(w)));
      cell.style.flexBasis = '0';
      if (v === 'ai') {
        cell.style.opacity = confidenceToOpacity(aimusicWindowConfidence(w));
      } else if (v === 'human') {
        cell.style.opacity = '0.85';
      }
      cell.dataset.tooltip = aimusicTooltipText(w);
      cell.addEventListener('click', () => seekAimusic(w.start_time_ms, i));
      heat.appendChild(cell);
    });
    viz.appendChild(heat);

    renderAimusicTable(windows);
  }

  function renderAimusicTable(windows) {
    if (!aimusicTbody) return;
    aimusicTbody.innerHTML = '';
    windows.forEach((w, i) => {
      const v = aimusicVerdict(w), t = aimusicType(w);
      const tr = document.createElement('tr');
      tr.dataset.index = i;

      const tdTime = document.createElement('td');
      tdTime.textContent = aimusicClock(w.start_time_ms) + ' \u2013 ' + aimusicClock(w.end_time_ms);

      const tdType = document.createElement('td');
      tdType.textContent = AIMUSIC_TYPE_TEXT[t];

      const tdVerdict = document.createElement('td');
      const pill = document.createElement('span');
      pill.className = 'm__tag-flat' + (AIMUSIC_CHIP_CLASS[v] ? ' ' + AIMUSIC_CHIP_CLASS[v] : '');
      pill.textContent = AIMUSIC_VERDICT_TEXT[v];
      tdVerdict.appendChild(pill);

      const tdConf = document.createElement('td');
      const c = aimusicWindowConfidence(w);
      if (v === 'ai' && c > 0) {
        const wrap = document.createElement('div');
        wrap.className = 'aim-cell';
        const track = document.createElement('div');
        track.className = 'aim-bar';
        const fill = document.createElement('div');
        fill.className = 'aim-bar-fill';
        fill.style.width = (c * 100) + '%';
        track.appendChild(fill);
        const txt = document.createElement('span');
        txt.className = 'aim-pct';
        txt.textContent = (c * 100).toFixed(1) + '%';
        wrap.appendChild(track);
        wrap.appendChild(txt);
        tdConf.appendChild(wrap);
      } else {
        tdConf.textContent = '\u2014';
        tdConf.className = 'aim-empty';
      }

      tr.appendChild(tdTime);
      tr.appendChild(tdType);
      tr.appendChild(tdVerdict);
      tr.appendChild(tdConf);
      tr.addEventListener('click', () => seekAimusic(w.start_time_ms, i));
      aimusicTbody.appendChild(tr);
    });
  }

  function aimusicSetActive(index) {
    const viz = document.getElementById('player-visualization');
    const heat = viz ? viz.querySelector('.aim-player-heat') : null;
    if (heat) heat.querySelectorAll('.aim-player-heat-cell').forEach((c, i) => c.classList.toggle('active', i === index));
    if (aimusicTbody) aimusicTbody.querySelectorAll('tr').forEach((r, i) => r.classList.toggle('active', i === index));
  }

  function seekAimusic(startMs, index) {
    if (resultsAudio) {
      try { resultsAudio.currentTime = (startMs || 0) / 1000; } catch (e) {}
      resultsAudio.play().catch(() => {});
    }
    aimusicSetActive(index);
  }

  function setupAimusicPlaybackTracking(windows) {
    if (aimusicPlaybackTracker) cancelAnimationFrame(aimusicPlaybackTracker);
    if (!windows || !windows.length || !resultsAudio) return;
    function tick() {
      if (currentMode !== 'aimusic') { aimusicPlaybackTracker = null; return; }
      if (resultsAudio.paused) { aimusicPlaybackTracker = requestAnimationFrame(tick); return; }
      const ms = resultsAudio.currentTime * 1000;
      let active = -1;
      for (let i = 0; i < windows.length; i++) {
        if (ms >= windows[i].start_time_ms && ms < windows[i].end_time_ms) { active = i; break; }
      }
      aimusicSetActive(active);
      aimusicPlaybackTracker = requestAnimationFrame(tick);
    }
    aimusicPlaybackTracker = requestAnimationFrame(tick);
  }

  // ── AI Music Detection: streaming (mirrors the Music Detection demo) ──────
  // Reset to a "listening" state and clear the strip at stream start.
  function resetAimusicLiveUI() {
    liveAimusicWindows = [];
    aimusicDoneData = null;
    renderVerdictStatement('aimusic-verdict-statement', {
      variant: '',
      title: 'Listening\u2026',
      stats: [{ value: '', label: 'Per-window verdicts appear below as they arrive.' }],
    });
    renderAimusicTimeline([]);
  }

  function renderAimusicLive() {
    renderAimusicTimeline(liveAimusicWindows);
  }

  function handleAimusicStreamMessage(msg) {
    if (msg?.type === 'window' && msg.window) {
      liveAimusicWindows.push(msg.window);
      renderAimusicLive();
    } else if (msg?.type === 'done') {
      aimusicDoneData = msg;
      stopRecording();   // routes to the aimusic finalize branch below
    } else if (msg?.type === 'error') {
      showError('Streaming error: ' + (msg.error || 'Unknown'));
      if (liveAimusicWindows.length > 0) {
        stopRecording();
      } else {
        cleanupRecording();
        demoCleanup();
        // No windows arrived before the error — restore the last (batch/cached)
        // verdict so the page doesn't stay stuck on "Listening…".
        renderAimusicResult(lastAimusicData || DEMO_AIMUSIC_DATA);
      }
    }
  }

  function startAimusicRecording() {
    liveAimusicWindows = [];
    aimusicDoneData = null;
    startRecordingCommon(
      '/api/velma-2-ai-music-detection-streaming?audio_format=s16le&sample_rate=16000&num_channels=1',
      handleAimusicStreamMessage,
      () => {
        resultsFilename.textContent = 'Live Recording';
        resultsAudio.removeAttribute('src');
        resultsAudio.load();
        if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = null; }
        resetAimusicLiveUI();
        window.scrollTo(0, 0);
      }
    );
  }

  function startAimusicDemoStream() {
    return startAimusicStreamFromUrl(DEMO_AIMUSIC_AUDIO_URL, 'Demo stream', false);
  }

  async function startAimusicFileStream(file) {
    const url = URL.createObjectURL(file);
    await startAimusicStreamFromUrl(url, file.name, true);
  }

  async function startAimusicStreamFromUrl(url, filename, isUserFile) {
    if (isRecording) return;
    if (currentMode !== 'aimusic') return;

    liveAimusicWindows = [];
    aimusicDoneData = null;

    resultsFilename.textContent = filename;
    if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = null; }
    if (isUserFile) audioObjectUrl = url;
    resultsAudio.src = url;
    lastAimusicAudioUrl = url;
    resetAimusicLiveUI();
    window.scrollTo(0, 0);

    // Fetch + decode → 16 kHz mono PCM s16le (same pipeline as the music demo)
    let int16;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const arr = await res.arrayBuffer();
      const actx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      const audio = await actx.decodeAudioData(arr);
      const ch = audio.getChannelData(0);
      int16 = new Int16Array(ch.length);
      for (let i = 0; i < ch.length; i++) {
        int16[i] = Math.max(-32768, Math.min(32767, Math.round(ch[i] * 32767)));
      }
      actx.close().catch(() => {});
    } catch (err) {
      showError('Failed to load audio: ' + (err && err.message ? err.message : err));
      return;
    }

    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = proto + '//' + location.host + '/api/velma-2-ai-music-detection-streaming?audio_format=s16le&sample_rate=16000&num_channels=1';
    recordingWs = new WebSocket(wsUrl);
    recordingWs.binaryType = 'arraybuffer';
    endFrameSent = false;
    isDemoStreaming = true;

    recordingWs.onopen = () => {
      isRecording = true;
      recordingStartTime = Date.now();
      updateRecordButton();

      try { resultsAudio.currentTime = 0; } catch {}
      const playPromise = resultsAudio.play();
      if (playPromise && playPromise.catch) playPromise.catch(() => { /* autoplay blocked — silent */ });

      // Pace at realtime: 4096 samples = 256 ms at 16 kHz
      const CHUNK = 4096;
      let offset = 0;
      function sendNext() {
        if (!isRecording || !recordingWs || recordingWs.readyState !== WebSocket.OPEN) return;
        if (offset >= int16.length) {
          try { recordingWs.send(''); } catch (e) {}
          endFrameSent = true;
          return;
        }
        const end = Math.min(offset + CHUNK, int16.length);
        const slice = int16.subarray(offset, end);
        const ab = new ArrayBuffer(slice.byteLength);
        new Int16Array(ab).set(slice);
        recordingWs.send(ab);
        offset = end;
        demoChunkTimer = setTimeout(sendNext, 256);
      }
      sendNext();
    };

    recordingWs.addEventListener('message', async (event) => {
      let text = '';
      try {
        if (typeof event.data === 'string') text = event.data;
        else if (event.data instanceof Blob) text = await event.data.text();
        else if (event.data instanceof ArrayBuffer) text = new TextDecoder().decode(event.data);
      } catch { return; }
      if (!text) return;
      let msg; try { msg = JSON.parse(text); } catch { return; }
      handleAimusicStreamMessage(msg);
    });

    recordingWs.onerror = () => { demoCleanup(); };

    recordingWs.onclose = () => {
      const wasRecording = isRecording;
      demoCleanup();
      if (wasRecording && currentMode === 'aimusic' && (aimusicDoneData || liveAimusicWindows.length > 0)) {
        // Finalize if the stream produced data and stopRecording's aimusic
        // branch hasn't already done so.
        finalizeAimusicStream(filename, url);
      } else if (wasRecording && currentMode === 'aimusic') {
        // Connected but closed before any window/done arrived — don't leave the
        // hero stuck on "Listening…". Surface a notice and restore the last
        // (batch) result so the page stays meaningful.
        showError('AI Music streaming returned no results before the connection closed. Try the batch upload instead.');
        renderAimusicResult(lastAimusicData || DEMO_AIMUSIC_DATA);
      }
    };
  }

  // Build a clip-level result from the streamed windows + `done` summary, then
  // render the final verdict. Idempotent — may be called from the `done`
  // handler (via stopRecording) and again from onclose.
  function finalizeAimusicStream(filename, url) {
    const windows = liveAimusicWindows.slice();
    const done = aimusicDoneData;
    const durationMs = done && typeof done.duration_ms === 'number'
      ? done.duration_ms
      : (windows.length ? windows[windows.length - 1].end_time_ms : (Date.now() - recordingStartTime));
    const fname = filename || resultsFilename.textContent || 'Live stream';

    const data = done ? {
      filename: fname,
      duration_s: durationMs / 1000,
      primary_verdict: done.primary_verdict,
      vocal_percentage: done.vocal_percentage,
      vocal_ai_percentage: done.vocal_ai_percentage,
      vocal_ai_confidence: done.vocal_ai_confidence,
      instrumental_percentage: done.instrumental_percentage,
      instrumental_ai_percentage: done.instrumental_ai_percentage,
      instrumental_ai_confidence: done.instrumental_ai_confidence,
      silence_percentage: done.silence_percentage,
      window_count: typeof done.window_count === 'number' ? done.window_count : windows.length,
      windows,
    } : computeAimusicSummaryFromWindows(windows, fname, durationMs);

    currentData = data;
    currentMeta = {
      fileSize: 0, fileType: 'PCM 16kHz', httpStatus: 101, httpStatusText: 'Switching Protocols',
      responseSize: JSON.stringify(data).length, processingMs: Date.now() - recordingStartTime,
    };
    lastAimusicData = data;
    if (url) lastAimusicAudioUrl = url;
    lastAimusicMeta = { ...currentMeta };
    lastAimusicFilename = fname;
    renderAimusicResult(data);
  }

  // Fallback clip-level summary when the stream is stopped before the `done`
  // message arrives (so instrumental AI — which runs only at clip end — is 0).
  function computeAimusicSummaryFromWindows(windows, filename, durationMs) {
    const cnt = windows.length || 1;
    const avg = (key) => windows.reduce((a, w) => a + (w[key] || 0), 0) / cnt;
    let aiMs = 0, totMs = 0;
    for (const w of windows) {
      const d = aimusicWinDurMs(w);
      totMs += d;
      if ((w.vocal_ai_percentage || 0) >= 50) aiMs += d;
    }
    const vAiPct = totMs ? (aiMs / totMs) * 100 : 0;
    const vConfWins = windows.filter(w => (w.vocal_percentage || 0) >= 50 && (w.vocal_ai_confidence || 0) > 0);
    const vConf = vConfWins.length ? vConfWins.reduce((a, w) => a + w.vocal_ai_confidence, 0) / vConfWins.length : 0;
    return {
      filename: filename || 'Live stream',
      duration_s: durationMs / 1000,
      primary_verdict: vAiPct >= 30 ? 'ai-vocal-music' : 'not-ai-music',
      vocal_percentage: avg('vocal_percentage'),
      vocal_ai_percentage: vAiPct,
      vocal_ai_confidence: vConf,
      instrumental_percentage: avg('instrumental_percentage'),
      instrumental_ai_percentage: 0,
      instrumental_ai_confidence: 0,
      silence_percentage: avg('silence_percentage'),
      window_count: windows.length,
      windows: windows.slice(),
    };
  }

  function resetMusicLiveUI() {
    currentData = null;
    musicVerdictRing.className = 'verdict-ring pending';
    musicVerdictIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%"><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></svg>';
    musicVerdictLabel.textContent = 'Listening';
    musicVerdictSplit.innerHTML =
      '<div class="verdict-ring-split-item music"><span class="v">—</span><span class="l">Music</span></div>' +
      '<div class="verdict-ring-split-item speech"><span class="v">—</span><span class="l">Speech</span></div>';
    musicHistogram.innerHTML = '';
    musicTbody.innerHTML = '';
    const placeholderRow = document.createElement('tr');
    placeholderRow.style.color = 'var(--text-caption)';
    const tdTime = document.createElement('td');
    tdTime.textContent = '0:00 – …';
    const tdMusic = document.createElement('td');
    tdMusic.textContent = '—';
    const tdSpeech = document.createElement('td');
    tdSpeech.textContent = '—';
    placeholderRow.appendChild(tdTime);
    placeholderRow.appendChild(tdMusic);
    placeholderRow.appendChild(tdSpeech);
    musicTbody.appendChild(placeholderRow);
  }

  function handleMusicStreamMessage(msg) {
    if (msg?.type === 'frame' && msg.frame && typeof msg.frame.music_prob === 'number') {
      const f = msg.frame;
      liveMusicFrames.push({
        start_time_s: (f.start_time_ms || 0) / 1000,
        end_time_s:   (f.end_time_ms   || 0) / 1000,
        music_prob:   f.music_prob,
        speech_prob:  f.speech_prob,
      });
      renderMusicLiveResults();
    } else if (msg?.type === 'done') {
      stopRecording();
    } else if (msg?.type === 'error') {
      showError('Streaming error: ' + (msg.error || 'Unknown'));
      if (liveMusicFrames.length > 0) stopRecording();
      else { cleanupRecording(); demoCleanup(); }
    }
  }

  function startMusicRecording() {
    liveMusicFrames = [];
    startRecordingCommon(
      '/api/velma-2-music-detection-streaming?audio_format=s16le&sample_rate=16000&num_channels=1',
      handleMusicStreamMessage,
      () => {
        resultsFilename.textContent = 'Live Recording';
        resultsAudio.removeAttribute('src');
        resultsAudio.load();
        if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = null; }
        resetMusicLiveUI();
        window.scrollTo(0, 0);
      }
    );
  }

  function startMusicDemoStream() {
    return startMusicStreamFromUrl(DEMO_MUSIC_AUDIO_URL, 'Demo stream', false);
  }

  async function startMusicFileStream(file) {
    const url = URL.createObjectURL(file);
    await startMusicStreamFromUrl(url, file.name, true);
  }

  async function startMusicStreamFromUrl(url, filename, isUserFile) {
    if (isRecording) return;
    if (currentMode !== 'music') return;

    liveMusicFrames = [];

    resultsFilename.textContent = filename;
    if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = null; }
    if (isUserFile) audioObjectUrl = url;
    resultsAudio.src = url;
    lastMusicAudioUrl = url;
    resetMusicLiveUI();
    window.scrollTo(0, 0);

    // Fetch + decode → 16 kHz mono PCM s16le (same pipeline as transcription demo)
    let int16;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const arr = await res.arrayBuffer();
      const actx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      const audio = await actx.decodeAudioData(arr);
      const ch = audio.getChannelData(0);
      int16 = new Int16Array(ch.length);
      for (let i = 0; i < ch.length; i++) {
        int16[i] = Math.max(-32768, Math.min(32767, Math.round(ch[i] * 32767)));
      }
      actx.close().catch(() => {});
    } catch (err) {
      showError('Failed to load audio: ' + (err && err.message ? err.message : err));
      return;
    }

    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = proto + '//' + location.host + '/api/velma-2-music-detection-streaming?audio_format=s16le&sample_rate=16000&num_channels=1';
    recordingWs = new WebSocket(wsUrl);
    recordingWs.binaryType = 'arraybuffer';
    endFrameSent = false;
    isDemoStreaming = true;

    recordingWs.onopen = () => {
      isRecording = true;
      recordingStartTime = Date.now();
      updateRecordButton();

      try { resultsAudio.currentTime = 0; } catch {}
      const playPromise = resultsAudio.play();
      if (playPromise && playPromise.catch) playPromise.catch(() => { /* autoplay blocked — silent */ });

      // Pace at realtime: 4096 samples = 256 ms at 16 kHz
      const CHUNK = 4096;
      let offset = 0;
      function sendNext() {
        if (!isRecording || !recordingWs || recordingWs.readyState !== WebSocket.OPEN) return;
        if (offset >= int16.length) {
          try { recordingWs.send(''); } catch (e) {}
          endFrameSent = true;
          return;
        }
        const end = Math.min(offset + CHUNK, int16.length);
        const slice = int16.subarray(offset, end);
        const ab = new ArrayBuffer(slice.byteLength);
        new Int16Array(ab).set(slice);
        recordingWs.send(ab);
        offset = end;
        demoChunkTimer = setTimeout(sendNext, 256);
      }
      sendNext();
    };

    recordingWs.addEventListener('message', async (event) => {
      let text = '';
      try {
        if (typeof event.data === 'string') text = event.data;
        else if (event.data instanceof Blob) text = await event.data.text();
        else if (event.data instanceof ArrayBuffer) text = new TextDecoder().decode(event.data);
      } catch { return; }
      if (!text) return;
      let msg; try { msg = JSON.parse(text); } catch { return; }
      handleMusicStreamMessage(msg);
    });

    recordingWs.onerror = () => { demoCleanup(); };

    recordingWs.onclose = () => {
      const wasRecording = isRecording;
      demoCleanup();
      // Finalize music UI if the stream completed naturally (i.e. user didn't click stop,
      // which would have routed through stopRecording's music branch already)
      if (wasRecording && liveMusicFrames.length > 0 && currentMode === 'music') {
        const data = computeMusicSummary(liveMusicFrames, { filename });
        currentData = data;
        currentFrames = liveMusicFrames;
        lastMusicData = data;
        lastMusicAudioUrl = url;
        currentMeta = {
          fileSize: 0, fileType: 'PCM 16kHz', httpStatus: 101, httpStatusText: 'Switching Protocols',
          responseSize: JSON.stringify(data).length, processingMs: Date.now() - recordingStartTime,
        };
        lastMusicMeta = { ...currentMeta };
        renderMusicVerdict(data);
        renderMusicHistogram(liveMusicFrames);
        renderMusicTable(liveMusicFrames, musicView);
        setupMusicPlaybackTracking(liveMusicFrames);
      }
    };
  }

  function computeMusicSummary(frames, opts) {
    let mCount = 0, sCount = 0;
    for (const f of frames) {
      if ((f.music_prob  || 0) >= 0.5) mCount++;
      if ((f.speech_prob || 0) >= 0.5) sCount++;
    }
    const music_pct  = frames.length ? (mCount / frames.length) * 100 : 0;
    const speech_pct = frames.length ? (sCount / frames.length) * 100 : 0;
    let primary_label = 'neither';
    if (music_pct >= 50 && music_pct >= speech_pct) primary_label = 'music';
    else if (speech_pct >= 50) primary_label = 'speech';
    return {
      filename: (opts && opts.filename) || 'Live Recording',
      duration_s: frames.length ? frames[frames.length - 1].end_time_s : 0,
      primary_label,
      music_pct,
      speech_pct,
      frames,
    };
  }

  function renderMusicLiveResults() {
    if (!liveMusicFrames.length) return;
    const data = computeMusicSummary(liveMusicFrames, { filename: resultsFilename.textContent });
    currentData = data;
    currentFrames = liveMusicFrames;
    renderMusicVerdict(data);
    renderMusicHistogram(liveMusicFrames);
    renderMusicTable(liveMusicFrames, musicView);
  }

  function renderMusicVerdict(data) {
    const musicPct = (data.music_pct != null) ? data.music_pct : 0;
    const speechPct = (data.speech_pct != null) ? data.speech_pct : 0;
    const label = (data.primary_label || 'unknown').toLowerCase();
    let title;
    if (label === 'music') title = 'This is ' + musicPct.toFixed(0) + '% music';
    else if (label === 'speech') title = 'This is ' + speechPct.toFixed(0) + '% speech';
    else if (label === 'neither') title = 'Neither music nor speech';
    else title = 'Unknown content';
    const other = (label === 'speech')
      ? { value: musicPct.toFixed(0) + '%', label: 'music' }
      : { value: speechPct.toFixed(0) + '%', label: 'speech' };
    renderVerdictStatement('music-verdict-statement', { variant: 'success', title: title, stats: [other] });
  }

  // Two-row music/speech probability heatmap inside the player visualization.
  function renderMusicHistogram(frames) {
    const viz = document.getElementById('player-visualization');
    clearPlayerStrips();
    sttChart.innerHTML = '';
    syncSpeakerLanes(['Music', 'Speech']);
    if (!frames.length || !viz) return;

    const heat = document.createElement('div');
    heat.className = 'mx-player-heat';

    ['music', 'speech'].forEach(kind => {
      const row = document.createElement('div');
      row.className = 'mx-player-heat-row';
      row.dataset.row = kind;
      frames.forEach((f, i) => {
        const prob = kind === 'music' ? (f.music_prob || 0) : (f.speech_prob || 0);
        const cell = document.createElement('div');
        cell.className = 'mx-player-heat-cell';
        cell.style.opacity = prob.toFixed(3);
        cell.dataset.idx = i;
        cell.dataset.tooltip = formatSecPrecise(f.start_time_s) + ' \u2013 ' + formatSecPrecise(f.end_time_s) +
          ' \u00b7 ' + (kind === 'music' ? 'Music' : 'Speech') + ' ' + (prob * 100).toFixed(1) + '%';
        cell.addEventListener('click', () => seekToMusic(f.start_time_s * 1000, i));
        row.appendChild(cell);
      });
      heat.appendChild(row);
    });
    viz.appendChild(heat);
  }

  function renderMusicTable(frames) {
    musicTbody.innerHTML = '';
    frames.forEach((f, i) => {
      const tr = document.createElement('tr');
      tr.dataset.index = i;

      const tdTime = document.createElement('td');
      tdTime.textContent = formatSecPrecise(f.start_time_s) + ' \u2013 ' + formatSecPrecise(f.end_time_s);
      tr.appendChild(tdTime);

      [['music', f.music_prob || 0], ['speech', f.speech_prob || 0]].forEach(([kind, prob]) => {
        const td = document.createElement('td');
        const cell = document.createElement('div');
        cell.className = 'mx-cell';
        const bar = document.createElement('div');
        bar.className = 'mx-bar';
        const fill = document.createElement('div');
        fill.className = 'mx-bar-fill ' + kind;
        fill.style.width = (prob * 100).toFixed(1) + '%';
        bar.appendChild(fill);
        const pct = document.createElement('span');
        pct.className = 'mx-pct';
        pct.textContent = (prob * 100).toFixed(1) + '%';
        cell.appendChild(bar);
        cell.appendChild(pct);
        td.appendChild(cell);
        tr.appendChild(td);
      });

      tr.addEventListener('click', () => seekToMusic(f.start_time_s * 1000, i));
      musicTbody.appendChild(tr);
    });
  }

  function musicHeatEl() {
    const viz = document.getElementById('player-visualization');
    return viz ? viz.querySelector('.mx-player-heat') : null;
  }

  function highlightMusicFrame(frameIdx) {
    const heat = musicHeatEl();
    if (heat) heat.querySelectorAll('.mx-player-heat-cell').forEach(cell => {
      cell.classList.toggle('active', Number(cell.dataset.idx) === frameIdx);
    });
    musicTbody.querySelectorAll('tr').forEach(row => {
      row.classList.toggle('active', Number(row.dataset.index) === frameIdx);
    });
  }

  function seekToMusic(startMs, frameIdx) {
    if (resultsAudio) {
      resultsAudio.currentTime = startMs / 1000;
      resultsAudio.play().catch(() => {});
    }
    highlightMusicFrame(frameIdx);
  }

  function setupMusicPlaybackTracking(frames) {
    if (musicPlaybackTracker) cancelAnimationFrame(musicPlaybackTracker);
    function tick() {
      if (resultsAudio.paused) { musicPlaybackTracker = requestAnimationFrame(tick); return; }
      const currentMs = resultsAudio.currentTime * 1000;
      let activeFrameIdx = -1;
      for (let i = frames.length - 1; i >= 0; i--) {
        const startMs = frames[i].start_time_s * 1000;
        const endMs   = frames[i].end_time_s * 1000;
        if (currentMs >= startMs && currentMs < endMs) { activeFrameIdx = i; break; }
      }
      highlightMusicFrame(activeFrameIdx);
      musicPlaybackTracker = requestAnimationFrame(tick);
    }
    musicPlaybackTracker = requestAnimationFrame(tick);
  }

  function formatSecPrecise(s) {
    return s.toFixed(2) + 's';
  }

  function buildSttStreamingParams() {
    const opts = getSttOptions();
    const params = new URLSearchParams();
    params.set('speaker_diarization', opts.speaker_diarization);
    params.set('emotion_signal', opts.emotion_signal);
    params.set('accent_signal', opts.accent_signal);
    params.set('deepfake_signal', opts.deepfake_signal);
    params.set('pii_phi_tagging', opts.pii_phi_tagging);
    // Raw PCM format params — required so the server knows how to decode headerless audio
    params.set('audio_format', 's16le');
    params.set('sample_rate', '16000');
    params.set('num_channels', '1');
    // Enable partial results for real-time text preview
    params.set('partial_results', 'true');
    return params;
  }

  // v2 (vfast) streaming accepts no feature toggles — just raw PCM format params.
  function buildSttStreamingV2Params() {
    const params = new URLSearchParams();
    params.set('audio_format', 's16le');
    params.set('sample_rate', '16000');
    params.set('num_channels', '1');
    return params;
  }

  function sttStreamingPath() {
    return isFastMode() ? '/api/velma-2-stt-streaming-english-v2' : '/api/velma-2-stt-streaming';
  }

  function sttStreamingQuery() {
    return (isFastMode() ? buildSttStreamingV2Params() : buildSttStreamingParams()).toString();
  }

  function handleTranscriptionStreamMessage(msg) {
    if (msg?.type === 'utterance' && msg.utterance) {
      debugOnMessage();
      debugLogFinal(msg.utterance);
      sttUtterances.push(msg.utterance);
      deduplicateUtterances();
      sttPartial = null;
      updateSttData();
      renderTranscript();
    } else if (msg?.type === 'partial_utterance' && msg.partial_utterance) {
      debugOnMessage();
      debugLogPartial(msg.partial_utterance);
      sttPartial = msg.partial_utterance;
      renderTranscript();
    } else if (msg?.type === 'done') {
      debugOnMessage();
      debugSetPhase('done', 'duration_ms=' + (msg.duration_ms || 0));
      if (!sttDebug && sttPartial) {
        sttUtterances.push({
          text: sttPartial.text,
          start_ms: sttPartial.start_ms || 0,
          duration_ms: 0,
          speaker: sttPartial.speaker || 1,
          language: null, emotion: null, accent: null,
        });
        deduplicateUtterances();
        sttPartial = null;
      }
      if (msg.duration_ms) {
        updateSttData();
        if (sttData) sttData.duration_ms = msg.duration_ms;
      }
      renderTranscript();
      stopRecording();
    } else if (msg?.type === 'error') {
      debugOnMessage();
      debugSetPhase('error', msg.error || 'Unknown');
      showError('Streaming error: ' + (msg.error || 'Unknown'));
      if (sttUtterances.length > 0) stopRecording();
      else cleanupRecording();
    }
  }

  function startTranscriptionRecording() {
    sttUtterances = [];
    sttPartial = null;
    sttData = null;
    currentData = null;
    currentSttModel = sttStreamingPath().replace(/^\/api\//, '');
    debugReset();

    startRecordingCommon(sttStreamingPath() + '?' + sttStreamingQuery(), handleTranscriptionStreamMessage, () => {
      resultsFilename.textContent = 'Live Recording';
      resultsAudio.removeAttribute('src');
      resultsAudio.load();
      if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = null; }
      renderTranscript();
      window.scrollTo(0, 0);
    });
  }

  // ── File/demo streaming (shared pipeline) ────────────────────────────────
  let demoChunkTimer = null;
  let isDemoStreaming = false;

  function startTranscriptionDemoStream() {
    return startTranscriptionStreamFromUrl(DEMO_STT_AUDIO_URL, 'Demo stream', false);
  }

  async function startTranscriptionFileStream(file) {
    const url = URL.createObjectURL(file);
    await startTranscriptionStreamFromUrl(url, file.name, true);
  }

  async function startTranscriptionStreamFromUrl(url, filename, isUserFile) {
    if (isRecording) return;
    if (currentMode !== 'transcription') return;

    sttUtterances = [];
    sttPartial = null;
    sttData = null;
    currentData = null;
    currentSttModel = sttStreamingPath().replace(/^\/api\//, '');
    debugReset();

    resultsFilename.textContent = filename;
    if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = null; }
    if (isUserFile) audioObjectUrl = url; // track blob url so we can revoke later
    resultsAudio.src = url;
    renderTranscript();
    window.scrollTo(0, 0);

    // Fetch + decode → 16 kHz mono PCM s16le
    let int16;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const arr = await res.arrayBuffer();
      const actx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      const audio = await actx.decodeAudioData(arr);
      const ch = audio.getChannelData(0);
      int16 = new Int16Array(ch.length);
      for (let i = 0; i < ch.length; i++) {
        int16[i] = Math.max(-32768, Math.min(32767, Math.round(ch[i] * 32767)));
      }
      actx.close().catch(() => {});
    } catch (err) {
      showError('Failed to load audio: ' + (err && err.message ? err.message : err));
      return;
    }

    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = proto + '//' + location.host + sttStreamingPath() + '?' + sttStreamingQuery();
    recordingWs = new WebSocket(wsUrl);
    recordingWs.binaryType = 'arraybuffer';
    endFrameSent = false;
    isDemoStreaming = true;
    debugSetPhase('connecting', '');

    recordingWs.onopen = () => {
      isRecording = true;
      recordingStartTime = Date.now();
      debugSetPhase('streaming', '');
      updateRecordButton();

      // Play the source audio alongside the stream so the user hears what the model hears.
      // User gesture (button click) already happened, so autoplay should be allowed.
      try { resultsAudio.currentTime = 0; } catch {}
      const playPromise = resultsAudio.play();
      if (playPromise && playPromise.catch) playPromise.catch(() => { /* autoplay blocked — silent */ });

      // Pace at realtime: 4096 samples = 256 ms at 16 kHz
      const CHUNK = 4096;
      let offset = 0;
      function sendNext() {
        if (!isRecording || !recordingWs || recordingWs.readyState !== WebSocket.OPEN) return;
        if (offset >= int16.length) {
          try { recordingWs.send(''); } catch (e) {}
          endFrameSent = true;
          if (debugPhase !== 'done' && debugPhase !== 'error') debugSetPhase('end-sent', '');
          return;
        }
        const end = Math.min(offset + CHUNK, int16.length);
        const slice = int16.subarray(offset, end);
        const ab = new ArrayBuffer(slice.byteLength);
        new Int16Array(ab).set(slice);
        recordingWs.send(ab);
        offset = end;
        demoChunkTimer = setTimeout(sendNext, 256);
      }
      sendNext();
    };

    recordingWs.addEventListener('message', async (event) => {
      let text = '';
      try {
        if (typeof event.data === 'string') text = event.data;
        else if (event.data instanceof Blob) text = await event.data.text();
        else if (event.data instanceof ArrayBuffer) text = new TextDecoder().decode(event.data);
      } catch { return; }
      if (!text) return;
      debugLogRaw(text);
      let msg; try { msg = JSON.parse(text); } catch { return; }
      handleTranscriptionStreamMessage(msg);
    });

    recordingWs.onerror = () => {
      debugSetPhase('error', 'socket error');
      demoCleanup();
    };

    recordingWs.onclose = (event) => {
      if (debugPhase !== 'done' && debugPhase !== 'error') {
        debugSetPhase('closed', 'code=' + event.code + (event.reason ? ' ' + event.reason : ''));
      }
      demoCleanup();
    };
  }

  function demoCleanup() {
    if (demoChunkTimer) { clearTimeout(demoChunkTimer); demoChunkTimer = null; }
    isDemoStreaming = false;
    isRecording = false;
    updateRecordButton();
  }

  // Cluster raw utterances by time proximity for display.
  // Groups consecutive utterances within 4s of each other (using the max start_ms
  // in each group for chaining), keeps only the longest text per group.
  // Operates on a copy — never mutates sttUtterances.
  function clusterUtterances(utterances) {
    if (utterances.length < 2) return utterances.slice();
    const sorted = utterances.slice().sort((a, b) => a.start_ms - b.start_ms);
    const groups = [[sorted[0]]];
    for (let i = 1; i < sorted.length; i++) {
      const lastGroup = groups[groups.length - 1];
      const groupMaxMs = Math.max(...lastGroup.map(u => u.start_ms));
      if (sorted[i].start_ms - groupMaxMs < 4000) {
        lastGroup.push(sorted[i]);
      } else {
        groups.push([sorted[i]]);
      }
    }
    return groups.map(group =>
      group.reduce((best, u) =>
        (u.text || '').length > (best.text || '').length ? u : best
      )
    );
  }

  function deduplicateUtterances() { /* no-op — dedup now happens in clusterUtterances at render time */ }

  // ── Streaming debug panel ────────────────────────────────────────────────
  let sttDebug = false;
  let currentSttModel = '';    // displayed in debug panel; set whenever we invoke an STT endpoint
  let debugPartials = [];      // { seq, t, partial: {text, start_ms, speaker} }
  let debugFinals = [];        // { seq, t, utterance: {...} }
  let debugPartialSeq = 0;     // arrival counter for partials
  let debugFinalSeq = 0;       // arrival counter for finals
  let debugPhase = 'idle';     // 'idle'|'connecting'|'streaming'|'end-sent'|'done'|'closed'|'error'
  let debugPhaseSince = Date.now();
  let debugPhaseInfo = '';
  let debugStreamStart = 0;
  let debugLastMsgAt = 0;
  let debugTickerId = null;
  let debugFrozen = null;      // { streamMs, lastMsgOffsetMs } when phase is terminal
  let expandedPartialGroups = new Set();  // keys: String(start_ms)
  let expandedFinals = new Set();         // keys: final seq number
  let debugRawMessages = [];   // every raw upstream WS frame, unmodified — for engineering diagnosis

  const DEBUG_TERMINAL = ['done', 'closed', 'error'];
  function isDebugTerminal() { return DEBUG_TERMINAL.indexOf(debugPhase) !== -1; }

  function debugActive() {
    return !!(optDebug && optDebug.checked && currentMode === 'transcription');
  }

  function debugReset() {
    debugPartials = [];
    debugFinals = [];
    debugPartialSeq = 0;
    debugFinalSeq = 0;
    debugPhase = 'idle';
    debugPhaseSince = Date.now();
    debugPhaseInfo = '';
    debugStreamStart = Date.now();
    debugLastMsgAt = 0;
    debugFrozen = null;
    expandedPartialGroups = new Set();
    expandedFinals = new Set();
    debugRawMessages = [];
    if (debugActive()) renderDebugPanel(true);
  }

  function debugLogRaw(text) {
    if (currentMode !== 'transcription') return;
    debugRawMessages.push({ t_ms: Date.now() - debugStreamStart, text });
  }

  function debugSetPhase(phase, info) {
    debugPhase = phase;
    debugPhaseSince = Date.now();
    debugPhaseInfo = info || '';
    if (DEBUG_TERMINAL.indexOf(phase) !== -1 && debugStreamStart) {
      debugFrozen = {
        streamMs: Date.now() - debugStreamStart,
        lastMsgOffsetMs: debugLastMsgAt ? debugLastMsgAt - debugStreamStart : null,
      };
    } else {
      debugFrozen = null;
    }
    if (debugActive()) renderDebugPanel();
  }

  function debugOnMessage() {
    debugLastMsgAt = Date.now();
  }

  function debugLogPartial(p) {
    debugPartials.unshift({ seq: ++debugPartialSeq, t: Date.now() - debugStreamStart, partial: p });
    if (debugActive()) renderDebugPanel();
  }

  function debugLogFinal(u) {
    debugFinals.unshift({ seq: ++debugFinalSeq, t: Date.now() - debugStreamStart, utterance: u });
    if (debugActive()) renderDebugPanel();
  }

  // Mirrors clusterUtterances logic: groups finals within 4s, keeps longest-text per group.
  // Returns a map from utterance_uuid → { groupIdx, kept: bool }.
  function computeClusterTags(finals) {
    const tags = {};
    if (!finals.length) return tags;
    const sorted = finals.slice().sort((a, b) => a.start_ms - b.start_ms);
    const groups = [[sorted[0]]];
    for (let i = 1; i < sorted.length; i++) {
      const last = groups[groups.length - 1];
      const maxMs = Math.max.apply(null, last.map(u => u.start_ms));
      if (sorted[i].start_ms - maxMs < 4000) last.push(sorted[i]);
      else groups.push([sorted[i]]);
    }
    groups.forEach((g, gi) => {
      const keeper = g.reduce((best, u) => (u.text || '').length > (best.text || '').length ? u : best);
      g.forEach(u => {
        const uid = u.utterance_uuid || String(u.start_ms);
        tags[uid] = { groupIdx: gi, kept: u === keeper };
      });
    });
    return tags;
  }

  function formatTOffset(ms) {
    const s = Math.max(0, ms) / 1000;
    return '+' + s.toFixed(2) + 's';
  }

  function renderDebugPanel(force) {
    if (!debugPanel) return;
    if (!debugActive()) {
      debugPanel.setAttribute('hidden', '');
      if (debugTickerId) { clearInterval(debugTickerId); debugTickerId = null; }
      return;
    }
    debugPanel.removeAttribute('hidden');

    if (debugModelEl) {
      if (currentSttModel) {
        debugModelEl.textContent = currentSttModel;
        debugModelEl.removeAttribute('hidden');
      } else {
        debugModelEl.setAttribute('hidden', '');
      }
    }

    // Phase pill + counters
    debugPhaseEl.className = 'stt-debug-phase ' + debugPhase;
    debugPhaseEl.textContent = ({
      'idle': 'Idle',
      'connecting': 'Connecting…',
      'streaming': 'Streaming audio',
      'end-sent': 'End-of-audio sent · waiting for model…',
      'done': 'Done',
      'closed': 'Closed',
      'error': 'Error',
    })[debugPhase] || debugPhase;

    if (debugFrozen) {
      const s = (debugFrozen.streamMs / 1000).toFixed(1) + 's';
      const m = debugFrozen.lastMsgOffsetMs != null
        ? '+' + (debugFrozen.lastMsgOffsetMs / 1000).toFixed(1) + 's'
        : '—';
      debugSinceEl.textContent = 'stream: ' + s + ' · last msg: ' + m;
      if (debugTickerId) { clearInterval(debugTickerId); debugTickerId = null; }
    } else {
      const sincePhase = ((Date.now() - debugPhaseSince) / 1000).toFixed(1) + 's';
      const sinceMsg = debugLastMsgAt ? ((Date.now() - debugLastMsgAt) / 1000).toFixed(1) + 's' : '—';
      debugSinceEl.textContent = 'phase: ' + sincePhase + ' · last msg: ' + sinceMsg;
      if (!debugTickerId) {
        debugTickerId = setInterval(() => {
          if (!debugActive() || debugFrozen) {
            clearInterval(debugTickerId); debugTickerId = null; return;
          }
          const p = ((Date.now() - debugPhaseSince) / 1000).toFixed(1) + 's';
          const mm = debugLastMsgAt ? ((Date.now() - debugLastMsgAt) / 1000).toFixed(1) + 's' : '—';
          debugSinceEl.textContent = 'phase: ' + p + ' · last msg: ' + mm;
        }, 250);
      }
    }
    debugCountersEl.textContent = 'partials: ' + debugPartials.length + ' · finals: ' + debugFinals.length;
    debugInfoEl.textContent = debugPhaseInfo || '';

    debugPartialsCount.textContent = String(debugPartials.length);
    debugFinalsCount.textContent = String(debugFinals.length);

    // Build a lookup: for each final, which seq# covers a given start_ms?
    // A final "claims" a partial if the partial's start_ms falls within the final's range.
    // debugFinals is newest-first; build array sorted by arrival order for seq lookups.
    const finalRanges = debugFinals.map(e => ({
      seq: e.seq,
      start: e.utterance.start_ms || 0,
      end: (e.utterance.start_ms || 0) + (e.utterance.duration_ms || 0),
    }));
    function claimingFinalSeq(startMs) {
      const ms = startMs || 0;
      // Pick the final whose range contains ms; prefer latest arrival if multiple overlap
      let best = null;
      for (let i = 0; i < finalRanges.length; i++) {
        const f = finalRanges[i];
        if (ms >= f.start && ms < f.end) { if (!best || f.seq > best.seq) best = f; }
      }
      return best ? best.seq : null;
    }

    // Partials column — group by start_ms (progressive extensions of the same utterance)
    debugPartialsList.innerHTML = '';
    const maxFinalEnd = finalRanges.length
      ? Math.max.apply(null, finalRanges.map(f => f.end))
      : -1;

    // Group by start_ms. debugPartials is newest-first, so group's [0] = latest text.
    const partialGroupMap = new Map(); // startMsKey → { startMs, entries: [] }
    const partialGroupOrder = [];
    debugPartials.forEach((entry) => {
      const key = entry.partial.start_ms == null ? 'null' : String(entry.partial.start_ms);
      let g = partialGroupMap.get(key);
      if (!g) {
        g = { key, startMs: entry.partial.start_ms, entries: [] };
        partialGroupMap.set(key, g);
        partialGroupOrder.push(g);
      }
      g.entries.push(entry);
    });

    partialGroupOrder.forEach((group) => {
      const latest = group.entries[0];
      const p = latest.partial;
      const pStart = p.start_ms || 0;
      const isClaimed = pStart < maxFinalEnd;
      const claimedBy = claimingFinalSeq(pStart);
      const expanded = expandedPartialGroups.has(group.key);
      const multi = group.entries.length > 1;

      const row = document.createElement('div');
      row.className = 'stt-debug-row stt-debug-partial-group';
      if (isClaimed) row.classList.add('superseded');
      if (multi) row.classList.add('is-group');
      if (expanded) row.classList.add('is-expanded');
      row.setAttribute('data-partial-start', group.key);
      if (claimedBy != null) row.setAttribute('data-claim-seq', String(claimedBy));

      const meta = document.createElement('div');
      meta.className = 'stt-debug-row-meta';
      const oldestEntry = group.entries[group.entries.length - 1];
      const seqLabel = multi
        ? ('#' + oldestEntry.seq + '..#' + latest.seq)
        : ('#' + latest.seq);
      let html = '';
      if (multi) html += '<span class="exp-toggle" role="button" title="Expand partial progression">' + (expanded ? '▾' : '▸') + '</span>';
      else html += '<span class="exp-toggle-spacer"></span>';
      html += '<span class="seq">' + seqLabel + '</span>' +
        '<span class="t">' + formatTOffset(latest.t) + '</span>' +
        '<span>' + (p.start_ms == null ? '—' : p.start_ms) + 'ms</span>' +
        (p.speaker != null ? '<span class="sp">sp' + p.speaker + '</span>' : '');
      if (multi) html += '<span class="count">' + group.entries.length + ' partials</span>';
      if (claimedBy != null) html += '<span class="claim">→ F#' + claimedBy + '</span>';
      meta.innerHTML = html;
      row.appendChild(meta);

      const text = document.createElement('div');
      text.className = 'stt-debug-row-text';
      text.textContent = p.text || '';
      row.appendChild(text);

      if (multi) {
        const children = document.createElement('div');
        children.className = 'stt-debug-row-children';
        if (!expanded) children.setAttribute('hidden', '');
        // Show oldest→newest so the text progression reads top-to-bottom
        group.entries.slice().reverse().forEach((e) => {
          const child = document.createElement('div');
          child.className = 'stt-debug-row-child';
          const cmeta = document.createElement('div');
          cmeta.className = 'stt-debug-row-child-meta';
          cmeta.innerHTML = '<span class="seq">#' + e.seq + '</span>' +
            '<span class="t">' + formatTOffset(e.t) + '</span>';
          const ctext = document.createElement('div');
          ctext.className = 'stt-debug-row-child-text';
          ctext.textContent = e.partial.text || '';
          child.appendChild(cmeta);
          child.appendChild(ctext);
          children.appendChild(child);
        });
        row.appendChild(children);
      }
      debugPartialsList.appendChild(row);
    });

    // Finals column
    debugFinalsList.innerHTML = '';
    const tags = computeClusterTags(debugFinals.map(e => e.utterance));
    // Build a map: groupIdx → seq of the keeper (for merged rows to reference)
    const groupKeeperSeq = {};
    debugFinals.forEach((entry) => {
      const uid = entry.utterance.utterance_uuid || String(entry.utterance.start_ms);
      const tag = tags[uid];
      if (tag && tag.kept) groupKeeperSeq[tag.groupIdx] = entry.seq;
    });
    debugFinals.forEach((entry) => {
      const u = entry.utterance;
      const uid = u.utterance_uuid || String(u.start_ms);
      const tag = tags[uid];
      const expanded = expandedFinals.has(entry.seq);

      // Find partial groups whose start_ms falls within this final's range
      const fStart = u.start_ms || 0;
      const fEnd = fStart + (u.duration_ms || 0);
      const claimedGroups = partialGroupOrder.filter((g) => {
        if (g.startMs == null) return false;
        return g.startMs >= fStart && g.startMs < fEnd;
      });
      const hasClaims = claimedGroups.length > 0;

      const row = document.createElement('div');
      row.className = 'stt-debug-row stt-debug-final';
      if (tag && !tag.kept) row.classList.add('merged');
      if (hasClaims) row.classList.add('is-group');
      if (expanded) row.classList.add('is-expanded');
      row.setAttribute('data-final-seq', String(entry.seq));

      const meta = document.createElement('div');
      meta.className = 'stt-debug-row-meta';
      const parts = [];
      if (hasClaims) parts.push('<span class="exp-toggle" role="button" title="Expand claimed partials">' + (expanded ? '▾' : '▸') + '</span>');
      else parts.push('<span class="exp-toggle-spacer"></span>');
      parts.push('<span class="seq">F#' + entry.seq + '</span>');
      parts.push('<span class="t">' + formatTOffset(entry.t) + '</span>');
      parts.push('<span>' + (u.start_ms != null ? u.start_ms : '—') + '..' + ((u.start_ms != null && u.duration_ms != null) ? (u.start_ms + u.duration_ms) : '—') + 'ms</span>');
      if (u.speaker != null) parts.push('<span class="sp">sp' + u.speaker + '</span>');
      if (u.language) parts.push('<span class="lg">' + u.language + '</span>');
      if (u.emotion) parts.push('<span class="em">' + u.emotion + '</span>');
      if (u.accent) parts.push('<span class="ac">' + u.accent + '</span>');
      if (u.deepfake_score != null) parts.push('<span class="df">df=' + Number(u.deepfake_score).toFixed(3) + '</span>');
      if (u.utterance_uuid) parts.push('<span class="uid">' + u.utterance_uuid.slice(0, 8) + '</span>');
      if (hasClaims) {
        const partialCount = claimedGroups.reduce((n, g) => n + g.entries.length, 0);
        parts.push('<span class="count">' + claimedGroups.length + ' group' + (claimedGroups.length === 1 ? '' : 's') + ' · ' + partialCount + ' partials</span>');
      }
      if (tag) {
        if (tag.kept) {
          parts.push('<span class="tag">kept</span>');
        } else {
          const winnerSeq = groupKeeperSeq[tag.groupIdx];
          const label = winnerSeq != null ? 'superseded by F#' + winnerSeq : 'superseded';
          parts.push('<span class="tag merged">' + label + '</span>');
        }
      }
      meta.innerHTML = parts.join('');
      row.appendChild(meta);

      const text = document.createElement('div');
      text.className = 'stt-debug-row-text';
      text.textContent = u.text || '';
      row.appendChild(text);

      if (hasClaims) {
        const children = document.createElement('div');
        children.className = 'stt-debug-row-children';
        if (!expanded) children.setAttribute('hidden', '');
        claimedGroups.forEach((g) => {
          const latest = g.entries[0];
          const child = document.createElement('div');
          child.className = 'stt-debug-row-child stt-debug-claimed-group';
          child.setAttribute('data-partial-start', g.key);
          const cmeta = document.createElement('div');
          cmeta.className = 'stt-debug-row-child-meta';
          const gOldest = g.entries[g.entries.length - 1];
          const seqLabel = g.entries.length > 1
            ? ('#' + gOldest.seq + '..#' + latest.seq)
            : ('#' + latest.seq);
          cmeta.innerHTML = '<span class="seq">' + seqLabel + '</span>' +
            '<span>' + g.startMs + 'ms</span>' +
            '<span class="count">' + g.entries.length + '×</span>';
          const ctext = document.createElement('div');
          ctext.className = 'stt-debug-row-child-text';
          ctext.textContent = latest.partial.text || '';
          child.appendChild(cmeta);
          child.appendChild(ctext);
          children.appendChild(child);
        });
        row.appendChild(children);
      }
      debugFinalsList.appendChild(row);
    });
  }

  // Event delegation: expand/collapse on click
  if (debugPartialsList) {
    debugPartialsList.addEventListener('click', (e) => {
      const row = e.target.closest('.stt-debug-partial-group.is-group');
      if (!row) return;
      const key = row.getAttribute('data-partial-start');
      if (!key) return;
      if (expandedPartialGroups.has(key)) expandedPartialGroups.delete(key);
      else expandedPartialGroups.add(key);
      renderDebugPanel(true);
    });
  }
  if (debugFinalsList) {
    debugFinalsList.addEventListener('click', (e) => {
      const row = e.target.closest('.stt-debug-final.is-group');
      if (!row) return;
      // Child claimed-group clicks → jump/expand that partial group in the left column
      const childGroup = e.target.closest('.stt-debug-claimed-group');
      if (childGroup) {
        const childKey = childGroup.getAttribute('data-partial-start');
        if (childKey) {
          expandedPartialGroups.add(childKey);
          renderDebugPanel(true);
          const target = debugPartialsList.querySelector('[data-partial-start="' + CSS.escape(childKey) + '"]');
          if (target) target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
        return;
      }
      const seqAttr = row.getAttribute('data-final-seq');
      if (!seqAttr) return;
      const seq = Number(seqAttr);
      if (expandedFinals.has(seq)) expandedFinals.delete(seq);
      else expandedFinals.add(seq);
      renderDebugPanel(true);
    });
  }

  // Hover cross-linking between partials and finals
  function setLinkedClass(seq, on) {
    if (!debugPartialsList || !debugFinalsList) return;
    const pRows = debugPartialsList.querySelectorAll('[data-claim-seq="' + seq + '"]');
    pRows.forEach((r) => r.classList.toggle('is-linked', on));
    const fRow = debugFinalsList.querySelector('[data-final-seq="' + seq + '"]');
    if (fRow) fRow.classList.toggle('is-linked', on);
  }
  if (debugPartialsList) {
    debugPartialsList.addEventListener('mouseover', (e) => {
      const row = e.target.closest('[data-claim-seq]');
      if (!row) return;
      setLinkedClass(row.getAttribute('data-claim-seq'), true);
    });
    debugPartialsList.addEventListener('mouseout', (e) => {
      const row = e.target.closest('[data-claim-seq]');
      if (!row) return;
      setLinkedClass(row.getAttribute('data-claim-seq'), false);
    });
  }
  if (debugFinalsList) {
    debugFinalsList.addEventListener('mouseover', (e) => {
      const row = e.target.closest('[data-final-seq]');
      if (!row) return;
      setLinkedClass(row.getAttribute('data-final-seq'), true);
    });
    debugFinalsList.addEventListener('mouseout', (e) => {
      const row = e.target.closest('[data-final-seq]');
      if (!row) return;
      setLinkedClass(row.getAttribute('data-final-seq'), false);
    });
  }

  if (optDebug) {
    optDebug.addEventListener('change', () => {
      sttDebug = optDebug.checked;
      renderDebugPanel(true);
      renderTranscript();
    });
    sttDebug = optDebug.checked;
    syncFastDebugExclusion();
  }

  let debugReverseTranscript = false;
  if (debugReverseBtn) {
    debugReverseBtn.addEventListener('click', () => {
      debugReverseTranscript = !debugReverseTranscript;
      debugReverseBtn.classList.toggle('active', debugReverseTranscript);
      renderTranscript();
    });
  }

  if (debugCopyRawBtn) {
    debugCopyRawBtn.addEventListener('click', async () => {
      if (!debugRawMessages.length) {
        const original = debugCopyRawBtn.textContent;
        debugCopyRawBtn.textContent = 'No messages yet';
        setTimeout(() => { debugCopyRawBtn.textContent = original; }, 1500);
        return;
      }
      const header = '# model=' + (currentSttModel || 'unknown') + ' · messages=' + debugRawMessages.length;
      const jsonl = debugRawMessages.map(r => JSON.stringify(r)).join('\n');
      const payload = header + '\n' + jsonl + '\n';
      try {
        await navigator.clipboard.writeText(payload);
        const original = debugCopyRawBtn.textContent;
        debugCopyRawBtn.textContent = '✓ Copied ' + debugRawMessages.length;
        setTimeout(() => { debugCopyRawBtn.textContent = original; }, 1500);
      } catch {
        // Fallback: trigger a download
        const blob = new Blob([payload], { type: 'application/jsonl' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (currentSttModel || 'stt') + '-raw-' + Date.now() + '.jsonl';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 0);
      }
    });
  }

  function updateSttData() {
    const durationMs = Date.now() - recordingStartTime;
    sttData = { filename: 'Live Recording', utterances: clusterUtterances(sttUtterances), duration_ms: durationMs };
    currentData = sttData;
  }

  // Lightweight update: only replace/add the partial element at the bottom
  // without rebuilding the entire transcript list (avoids flicker)
  function renderStreamingPartial() {
    // Remove old partial and listening indicator
    const oldPartial = transcriptList.querySelector('[data-partial]');
    if (oldPartial) oldPartial.remove();
    const oldIndicator = transcriptList.querySelector('[data-listening]');
    if (oldIndicator) oldIndicator.remove();

    const reversed = debugReverseTranscript && debugActive();

    if (sttPartial) {
      const opts = getSttOptions();
      const el = buildUtteranceEl(sttPartial, opts, true, -1);
      el.setAttribute('data-partial', 'true');
      if (reversed) {
        transcriptList.prepend(el);
        if (!debugActive()) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        transcriptList.appendChild(el);
        if (!debugActive()) el.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    } else if (isRecording) {
      const indicator = document.createElement('div');
      indicator.className = 'pg-transcript-empty';
      indicator.textContent = 'Listening\u2026';
      indicator.style.opacity = '0.5';
      indicator.setAttribute('data-listening', 'true');
      if (reversed) transcriptList.prepend(indicator);
      else transcriptList.appendChild(indicator);
    }
  }

  function renderTranscript() {
    transcriptList.innerHTML = '';

    if (sttUtterances.length === 0 && !sttPartial) {
      const empty = document.createElement('div');
      empty.className = 'pg-transcript-empty';
      empty.textContent = isRecording ? 'Listening\u2026' : 'Upload an audio file or start recording to see the transcript.';
      if (isRecording) empty.setAttribute('data-listening', 'true');
      transcriptList.appendChild(empty);
      sttChart.innerHTML = '';
      sttChart.classList.remove('visible');
      return;
    }

    const opts = getSttOptions();
    // Only cluster during streaming to merge overlapping partials;
    // batch results are already clean so render them as-is. But always
    // sort by start_ms — streaming utterances arrive out of order.
    const byStart = (a, b) => (a.start_ms || 0) - (b.start_ms || 0);
    let displayUtterances = isRecording
      ? clusterUtterances(sttUtterances)
      : sttUtterances.slice().sort(byStart);

    // Debug reverse: newest first so order matches the debug panel columns.
    const reversed = debugReverseTranscript && debugActive();
    if (reversed) displayUtterances = displayUtterances.slice().reverse();

    if (reversed && sttPartial) {
      const partialEl = buildUtteranceEl(sttPartial, opts, true, -1);
      partialEl.setAttribute('data-partial', 'true');
      transcriptList.appendChild(partialEl);
    }

    displayUtterances.forEach((u, i) => {
      const origIdx = reversed ? (displayUtterances.length - 1 - i) : i;
      transcriptList.appendChild(buildUtteranceEl(u, opts, false, origIdx));
    });

    if (!reversed && sttPartial) {
      const partialEl = buildUtteranceEl(sttPartial, opts, true, -1);
      partialEl.setAttribute('data-partial', 'true');
      transcriptList.appendChild(partialEl);
    }

    // Show a live "listening" indicator only when recording and no partial is active
    if (isRecording && !sttPartial) {
      const indicator = document.createElement('div');
      indicator.className = 'pg-transcript-empty';
      indicator.textContent = 'Listening\u2026';
      indicator.style.opacity = '0.5';
      indicator.setAttribute('data-listening', 'true');
      transcriptList.appendChild(indicator);
    }

    if (isRecording && transcriptList.lastElementChild && !debugActive()) {
      transcriptList.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    // Render emotion chart
    const opts2 = getSttOptions();
    if (sttUtterances.length > 0 && !isRecording && opts2.speaker_diarization) {
      renderSttChart();
    } else {
      sttChart.innerHTML = '';
      sttChart.classList.remove('visible');
    }

    // Always track playback → bubble highlights
    if (!isRecording && sttUtterances.length > 0) {
      setupTranscriptPlaybackTracking();
    }
  }

  let sttPlaybackTracker = null;

  function setupTranscriptPlaybackTracking() {
    if (sttPlaybackTracker) cancelAnimationFrame(sttPlaybackTracker);

    function tick() {
      const currentMs = resultsAudio.currentTime * 1000;
      // Sticky: highlight the last utterance whose start_ms <= currentMs
      let activeIdx = -1;
      for (let i = sttUtterances.length - 1; i >= 0; i--) {
        if (currentMs >= sttUtterances[i].start_ms) { activeIdx = i; break; }
      }
      transcriptList.querySelectorAll('.pg-transcript-utterance').forEach((el, i) => {
        const wasActive = el.classList.contains('active');
        const nowActive = i === activeIdx;
        el.classList.toggle('active', nowActive);
        if (nowActive && !wasActive && !debugActive()) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
      sttPlaybackTracker = requestAnimationFrame(tick);
    }
    sttPlaybackTracker = requestAnimationFrame(tick);
  }

  // Speaker lanes on the player dataviz: distinct speakers → lanes 1..5.
  // Sets --speaker-count (drives strip height + lane math) and the labels.
  const playerDataviz = document.querySelector('.pg-player-dataviz');
  const speakerLabelsEl = document.getElementById('speaker-labels');

  function syncSpeakerLanes(labels) {
    const count = Math.min(Math.max(labels.length, 1), 5);
    if (playerDataviz) playerDataviz.style.setProperty('--speaker-count', count);
    if (mediaBox) mediaBox.setAttribute('data-speaker-count', count);
    if (speakerLabelsEl) {
      speakerLabelsEl.innerHTML = labels.slice(0, 5).map((label, i) =>
        '<div class="speaker-label" data-speaker-index="' + (i + 1) + '"><span>' +
        escapeHtml(label) + '</span></div>'
      ).join('');
    }
  }

  function clipTooltipText(u) {
    const endTimeMs = u.start_ms + (u.duration_ms || 2000);
    let dfTooltip = '';
    if (u.deepfake_score != null) {
      const s = u.deepfake_score;
      if (s > 0.7) dfTooltip = ' \u00b7 Deepfake (' + Math.round((s - 0.5) * 200) + '%)';
      else if (s < 0.3) dfTooltip = ' \u00b7 Authentic (' + Math.round((0.5 - s) * 200) + '%)';
      else dfTooltip = ' \u00b7 Uncertain authenticity';
    }
    return formatMs(u.start_ms) + ' \u2013 ' + formatMs(endTimeMs) +
      ' \u00b7 ' + (u.speaker_label || ('Speaker ' + (u.speaker || 0))) +
      (u.emotion ? ' \u00b7 ' + u.emotion : '') + dfTooltip;
  }

  function renderSttChart() {
    clearPlayerStrips();
    sttChart.innerHTML = '';
    if (!sttUtterances.length) { sttChart.classList.remove('visible'); return; }

    // Calculate total duration
    const lastU = sttUtterances[sttUtterances.length - 1];
    const totalMs = (sttData && sttData.duration_ms)
      ? sttData.duration_ms
      : (lastU.start_ms + (lastU.duration_ms || 4000));
    if (totalMs <= 0) return;

    // Distinct speakers \u2192 lanes
    const speakers = Array.from(
      new Set(sttUtterances.map(u => (u.speaker != null ? u.speaker : 0)))
    ).sort((a, b) => a - b);
    const laneOf = new Map(speakers.map((s, i) => [s, Math.min(i + 1, 5)]));
    syncSpeakerLanes(speakers.map(s => 'Speaker ' + s));

    sttUtterances.forEach((u, i) => {
      // Extend the clip to the start of the next utterance from ANY speaker
      let nextStartMs = totalMs;
      for (let j = 0; j < sttUtterances.length; j++) {
        if (sttUtterances[j].start_ms > u.start_ms) {
          nextStartMs = sttUtterances[j].start_ms;
          break;
        }
      }
      const endMs = Math.max(nextStartMs, u.start_ms + (u.duration_ms || 2000));

      const clip = document.createElement('div');
      clip.className = 'transcript-clip emotion-' + emotionSlug(u.emotion);
      clip.setAttribute('data-speaker-index', laneOf.get(u.speaker != null ? u.speaker : 0));
      clip.style.left = (u.start_ms / totalMs * 100).toFixed(3) + '%';
      clip.style.width = ((endMs - u.start_ms) / totalMs * 100).toFixed(3) + '%';
      clip.dataset.tooltip = clipTooltipText(u);
      clip.dataset.uttIdx = i;

      const viz = document.createElement('div');
      viz.className = 'clip-visualization';
      clip.appendChild(viz);

      // Click to seek and highlight transcript row
      clip.addEventListener('click', () => {
        if (resultsAudio) {
          resultsAudio.currentTime = u.start_ms / 1000;
          resultsAudio.play().catch(() => {});
        }
        const bubbles = transcriptList.querySelectorAll('.pg-transcript-utterance');
        bubbles.forEach((el, j) => el.classList.toggle('active', j === i));
        if (bubbles[i]) bubbles[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
      });

      sttChart.appendChild(clip);
    });

    sttChart.classList.add('visible');

    // Sync clip highlight with playback
    setupSttChartPlaybackTracking();
  }

  function setupSttChartPlaybackTracking() {
    if (sttChartTracker) cancelAnimationFrame(sttChartTracker);
    const clips = sttChart.querySelectorAll('.transcript-clip');

    function tick() {
      const currentMs = resultsAudio.currentTime * 1000;
      let activeIdx = -1;
      for (let i = sttUtterances.length - 1; i >= 0; i--) {
        if (currentMs >= sttUtterances[i].start_ms) { activeIdx = i; break; }
      }
      clips.forEach(clip => {
        clip.classList.toggle('hover', parseInt(clip.dataset.uttIdx) === activeIdx);
      });
      sttChartTracker = requestAnimationFrame(tick);
    }
    sttChartTracker = requestAnimationFrame(tick);
  }

  const LANGUAGE_FLAGS = {
    EN: '🇬🇧', ES: '🇪🇸', FR: '🇫🇷', DE: '🇩🇪', IT: '🇮🇹',
    PT: '🇵🇹', RU: '🇷🇺', ZH: '🇨🇳', JA: '🇯🇵', KO: '🇰🇷',
    AR: '🇸🇦', HI: '🇮🇳', NL: '🇳🇱', PL: '🇵🇱', SV: '🇸🇪',
    DA: '🇩🇰', NO: '🇳🇴', FI: '🇫🇮', TR: '🇹🇷', EL: '🇬🇷',
    HE: '🇮🇱', TH: '🇹🇭', VI: '🇻🇳', ID: '🇮🇩', MS: '🇲🇾',
    UK: '🇺🇦', CS: '🇨🇿', RO: '🇷🇴', HU: '🇭🇺', BG: '🇧🇬',
    HR: '🇭🇷', SK: '🇸🇰', SL: '🇸🇮', LT: '🇱🇹', LV: '🇱🇻',
    ET: '🇪🇪', CA: '🏳️', GL: '🏳️', EU: '🏳️', FA: '🇮🇷',
    UR: '🇵🇰', BN: '🇧🇩', TA: '🇮🇳', TE: '🇮🇳', MR: '🇮🇳',
    SW: '🇰🇪', AF: '🇿🇦', TL: '🇵🇭', CY: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  };

  const ACCENT_SHORT = {
    American: 'American', British: 'British', Australian: 'Australian',
    Southern: 'Southern US', Indian: 'Indian', Irish: 'Irish', Scottish: 'Scottish',
    Eastern_European: 'E. European', African: 'African', Asian: 'Asian',
    Latin_American: 'Latin Am.', Middle_Eastern: 'Middle Eastern', Unknown: 'Unknown',
  };

  // Emotion coloring comes from the design system's --emotion-* tokens.
  // Unknown emotions fall back to the "unknown" gray token.
  const KNOWN_EMOTIONS = new Set([
    'affectionate', 'afraid', 'amused', 'angry', 'anxious', 'ashamed', 'bored',
    'calm', 'concerned', 'confident', 'confused', 'contemptuous', 'curious',
    'disappointed', 'disgusted', 'excited', 'frustrated', 'happy', 'hopeful',
    'interested', 'neutral', 'proud', 'relieved', 'sad', 'stressed',
    'surprised', 'tired',
  ]);

  function emotionSlug(name) {
    const s = String(name || '').toLowerCase();
    return KNOWN_EMOTIONS.has(s) ? s : 'unknown';
  }

  // CSS color value for inline styles (emo bars, chips)
  function emotionVar(name) {
    return 'var(--emotion-' + emotionSlug(name) + ', var(--emotion-unknown))';
  }

  // Human-readable language name from an ISO code ("en" → "English")
  let langDisplayNames = null;
  try { langDisplayNames = new Intl.DisplayNames(['en'], { type: 'language' }); } catch (e) {}
  function languageName(code) {
    if (!code) return '';
    try {
      const name = langDisplayNames && langDisplayNames.of(code.toLowerCase());
      return name && name !== code.toLowerCase() ? name : code.toUpperCase();
    } catch (e) { return code.toUpperCase(); }
  }

  function buildUtteranceEl(u, opts, isPartial, index) {
    const el = document.createElement('div');
    // Side follows the actual speaker (not row parity): odd speakers left, even right.
    const side = (u.speaker != null && u.speaker % 2 === 0) ? 'speaker-right' : 'speaker-left';
    el.className = 'pg-transcript-utterance ' + side + ' ec-' +
      emotionSlug(u.emotion && opts.emotion_signal ? u.emotion : 'neutral');

    if (u.start_ms != null && !isPartial) {
      el.addEventListener('click', () => {
        if (resultsAudio) {
          resultsAudio.currentTime = u.start_ms / 1000;
          resultsAudio.play().catch(() => {});
        }
      });
    }

    const header = document.createElement('div');
    header.className = 'pg-transcript-utterance-header';

    // Timestamp (start only)
    if (u.start_ms != null) {
      const time = document.createElement('span');
      time.className = 'pg-transcript-time';
      time.textContent = formatMs(u.start_ms);
      header.appendChild(time);
    }

    // Speaker name
    if (u.speaker != null && opts.speaker_diarization) {
      const sp = document.createElement('span');
      sp.className = 'pg-transcript-speaker';
      sp.textContent = u.speaker_label || ('Speaker ' + u.speaker);
      header.appendChild(sp);
    }

    // Emotion inline (colored via the utterance's ec-* class)
    if (u.emotion && opts.emotion_signal) {
      const em = document.createElement('span');
      em.className = 'pg-transcript-emotion';
      em.textContent = u.emotion;
      header.appendChild(em);
    }

    // Language name
    if (u.language) {
      const lf = document.createElement('span');
      lf.className = 'pg-transcript-flag';
      lf.textContent = languageName(u.language);
      header.appendChild(lf);
    }

    // Accent
    if (u.accent && opts.accent_signal) {
      const la = document.createElement('span');
      la.className = 'pg-transcript-accent';
      la.textContent = (ACCENT_SHORT[u.accent] || u.accent) + ' accent';
      header.appendChild(la);
    }

    // Deepfake verdict
    if (opts.deepfake_signal && u.deepfake_score != null) {
      const score = u.deepfake_score;
      const df = document.createElement('span');
      df.className = 'pg-transcript-verdict';
      if (score > 0.7) {
        const conf = Math.round((score - 0.5) * 2 * 100);
        df.classList.add('m__tag--error');
        df.textContent = 'Deepfake';
        df.dataset.tooltip = 'Deepfake · ' + conf + '% confidence';
      } else if (score < 0.3) {
        const conf = Math.round((0.5 - score) * 2 * 100);
        df.textContent = 'Authentic';
        df.dataset.tooltip = 'Authentic · ' + conf + '% confidence';
      } else {
        df.textContent = 'Uncertain authenticity';
        if (score > 0.5) {
          const conf = Math.round((score - 0.5) * 2 * 100);
          df.dataset.tooltip = 'Uncertain · leans Deepfake at ' + conf + '% confidence';
        } else if (score < 0.5) {
          const conf = Math.round((0.5 - score) * 2 * 100);
          df.dataset.tooltip = 'Uncertain · leans Authentic at ' + conf + '% confidence';
        } else {
          df.dataset.tooltip = 'Uncertain · 50/50';
        }
      }
      header.appendChild(df);
    }

    el.appendChild(header);

    const text = document.createElement('div');
    text.className = 'pg-transcript-text' + (isPartial ? ' partial' : '');
    const p = document.createElement('p');
    if (opts.pii_phi_tagging && u.text && /<pii|<phi/i.test(u.text)) {
      p.innerHTML = renderPiiText(u.text);
    } else {
      p.textContent = u.text || '';
    }
    text.appendChild(p);
    el.appendChild(text);

    return el;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── SHARED RECORDING LOGIC ────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  function startRecordingCommon(wsPath, onMessage, onOpen) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      mediaStream = stream;

      // MediaRecorder for playback recording (saved locally, not sent over WS)
      const mimeCandidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus'];
      const mimeType = mimeCandidates.find(m => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m));
      mediaRecorder = mimeType ? new MediaRecorder(mediaStream, { mimeType }) : new MediaRecorder(mediaStream);
      recordedChunks = [];
      mediaRecorder.addEventListener('dataavailable', (e) => {
        if (e.data && e.data.size > 0) recordedChunks.push(e.data);
      });
      mediaRecorder.start(200);

      const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = proto + '//' + location.host + wsPath;
      recordingWs = new WebSocket(wsUrl);
      recordingWs.binaryType = 'arraybuffer';
      endFrameSent = false;
      if (currentMode === 'transcription') debugSetPhase('connecting', '');

      recordingWs.onopen = () => {
        isRecording = true;
        liveFrames = [];
        recordingStartTime = Date.now();
        if (currentMode === 'transcription') debugSetPhase('streaming', '');
        updateRecordButton();

        // Stream raw PCM 16-bit little-endian 16kHz mono over WebSocket
        audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
        const source = audioContext.createMediaStreamSource(mediaStream);
        scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
        const silencer = audioContext.createGain();
        silencer.gain.value = 0;

        scriptProcessor.onaudioprocess = (e) => {
          if (!isRecording || !recordingWs || recordingWs.readyState !== WebSocket.OPEN) return;
          const float32 = e.inputBuffer.getChannelData(0);
          const int16 = new Int16Array(float32.length);
          for (let i = 0; i < float32.length; i++) {
            int16[i] = Math.max(-32768, Math.min(32767, Math.round(float32[i] * 32767)));
          }
          recordingWs.send(int16.buffer);
        };

        source.connect(scriptProcessor);
        scriptProcessor.connect(silencer);
        silencer.connect(audioContext.destination);

        if (onOpen) onOpen();
      };

      recordingWs.addEventListener('message', async (event) => {
        let text = '';
        try {
          if (typeof event.data === 'string') text = event.data;
          else if (event.data instanceof Blob) text = await event.data.text();
          else if (event.data instanceof ArrayBuffer) text = new TextDecoder().decode(event.data);
        } catch { return; }
        if (!text) return;
        debugLogRaw(text);

        let msg;
        try { msg = JSON.parse(text); } catch { return; }
        onMessage(msg);
      });

      recordingWs.onerror = () => {
        console.error('WebSocket error');
        if (currentMode === 'transcription') debugSetPhase('error', 'socket error');
        cleanupRecording();
      };

      recordingWs.onclose = (event) => {
        if (currentMode === 'transcription' && debugPhase !== 'done' && debugPhase !== 'error') {
          debugSetPhase('closed', 'code=' + event.code + (event.reason ? ' ' + event.reason : ''));
        }
        if (isRecording) {
          const hasData =
            currentMode === 'deepfake' ? liveFrames.length > 0
            : currentMode === 'music'  ? liveMusicFrames.length > 0
            : currentMode === 'aimusic' ? (aimusicDoneData || liveAimusicWindows.length > 0)
            : sttUtterances.length > 0;
          if (hasData) {
            stopRecording();
          } else {
            cleanupRecording();
            const reason = event.reason || '';
            let msg;
            if (event.code === 1006) msg = 'Could not connect to the server. You may have reached the rate limit \u2014 please wait a minute and try again.';
            else if (event.code === 1011) msg = 'Upstream server error: ' + (reason || 'the service is temporarily unavailable.');
            else if (event.code === 1000 && reason === 'Timeout') msg = 'Recording timed out after 5 minutes.';
            else msg = 'Connection closed' + (reason ? ': ' + reason : '') + ' (code ' + event.code + ').';
            showError(msg);
          }
        }
      };
    }).catch(() => {
      showError('Microphone access denied. Please allow microphone access and try again.');
    });
  }

  function stopRecording() {
    if (scriptProcessor) { scriptProcessor.disconnect(); scriptProcessor = null; }

    if (demoChunkTimer) { clearTimeout(demoChunkTimer); demoChunkTimer = null; }

    if (recordingWs && recordingWs.readyState === WebSocket.OPEN && !endFrameSent) {
      recordingWs.send('');
      endFrameSent = true;
      if (currentMode === 'transcription' && debugPhase !== 'done' && debugPhase !== 'error') {
        debugSetPhase('end-sent', '');
      }
      // Don't close immediately — let the server send back final results
      // The connection will close after we receive the 'done' message
    }

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.addEventListener('stop', () => {
        const mt = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(recordedChunks, { type: mt });
        if (audioObjectUrl) URL.revokeObjectURL(audioObjectUrl);
        audioObjectUrl = URL.createObjectURL(blob);
        resultsAudio.src = audioObjectUrl;
        recordedChunks = [];
        mediaRecorder = null;
      });
      mediaRecorder.stop();
    }

    cleanupRecording();

    if (currentMode === 'deepfake' && liveFrames.length > 0) {
      const durationMs = Date.now() - recordingStartTime;
      const data = { filename: 'Live Recording', frames: liveFrames, duration_ms: durationMs };
      currentMeta = {
        fileSize: 0, fileType: 'PCM 16kHz', httpStatus: 101, httpStatusText: 'Switching Protocols',
        responseSize: JSON.stringify(data).length, processingMs: durationMs,
      };
      currentData = data;
      currentFrames = liveFrames;

      const { isSynthetic, synFrames, reason } = computeVerdict(liveFrames);

      renderVerdict(isSynthetic, synFrames.length, liveFrames.length, reason);
      renderHistogram(liveFrames);
      renderTable(liveFrames);
    } else if (currentMode === 'music' && liveMusicFrames.length > 0) {
      const durationMs = Date.now() - recordingStartTime;
      const data = computeMusicSummary(liveMusicFrames, { filename: resultsFilename.textContent });
      currentMeta = {
        fileSize: 0, fileType: 'PCM 16kHz', httpStatus: 101, httpStatusText: 'Switching Protocols',
        responseSize: JSON.stringify(data).length, processingMs: durationMs,
      };
      currentData = data;
      currentFrames = liveMusicFrames;
      lastMusicData = data;
      lastMusicMeta = { ...currentMeta };
      renderMusicVerdict(data);
      renderMusicHistogram(liveMusicFrames);
      renderMusicTable(liveMusicFrames, musicView);
      setupMusicPlaybackTracking(liveMusicFrames);
    } else if (currentMode === 'aimusic' && (aimusicDoneData || liveAimusicWindows.length > 0)) {
      finalizeAimusicStream();
    } else if (currentMode === 'transcription') {
      const durationMs = Date.now() - recordingStartTime;
      currentMeta = {
        fileSize: 0, fileType: 'PCM 16kHz', httpStatus: 101, httpStatusText: 'Switching Protocols',
        responseSize: sttData ? JSON.stringify(sttData).length : 0, processingMs: durationMs,
      };
      // Keep sttPartial visible until finals arrive from the server.
      // The 'done' handler will promote any lingering partial to a final utterance.
      updateSttData();
      renderTranscript();
    }
  }

  function cleanupRecording() {
    isRecording = false;
    updateRecordButton();
    if (scriptProcessor) { scriptProcessor.disconnect(); scriptProcessor = null; }
    if (audioContext) { audioContext.close().catch(() => {}); audioContext = null; }
    if (mediaStream) { mediaStream.getTracks().forEach(t => t.stop()); mediaStream = null; }
  }

  function updateRecordButton() {
    if (isRecording) {
      if (plateStreamingLabel) {
        plateStreamingLabel.textContent =
          currentMode === 'transcription' || currentMode === 'velma' ? 'Listening…' : 'Streaming…';
      }
      setPlateState('streaming');
    } else if (uploadPlate && uploadPlate.dataset.state === 'streaming') {
      // Stream ended — collapse to "New analysis" with the results visible below.
      setPlateState('uploaded');
      refreshBottomPanels();
      setPageTitle(resultsFilename.textContent);
      syncPlayerMeta();
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── MODALS ────────────────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  // The Raw JSON + statistics live in the always-visible bottom columns now —
  // re-render both from currentData/currentMeta after every analysis.
  function refreshBottomPanels() {
    if (!currentData) {
      if (bottomColumns) bottomColumns.classList.remove('visible');
      return;
    }
    if (currentMode === 'velma') {
      statsGrid.innerHTML = renderVelmaStats(currentData, currentMeta);
      if (bottomColumns) bottomColumns.classList.add('visible');
      showJsonModal();
      return;
    }
    showStatsModal();
    showJsonModal();
  }

  // Close a modal on a genuine backdrop click — but NOT when the click is the tail
  // end of a text-selection drag that started inside the modal. Dragging to select
  // text and releasing the mouse over the backdrop synthesizes a `click` whose
  // target is the backdrop, which would otherwise close the modal mid-edit. Only
  // close when the press AND the release both happened on the backdrop itself.
  function closeOnBackdrop(modalEl, closeFn) {
    let downOnBackdrop = false;
    modalEl.addEventListener('mousedown', (e) => { downOnBackdrop = (e.target === modalEl); });
    modalEl.addEventListener('click', (e) => { if (e.target === modalEl && downOnBackdrop) closeFn(); });
  }

  jsonCopyBtn.addEventListener('click', () => {
    const text = JSON.stringify(currentData, null, 2);
    const onSuccess = () => {
      jsonCopyBtn.textContent = 'Copied!';
      setTimeout(() => { jsonCopyBtn.textContent = 'Copy'; }, 2000);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallbackCopy(text, onSuccess));
    } else {
      fallbackCopy(text, onSuccess);
    }
  });

  // ── HubSpot Access Modal ─────────────────────────────────────────────
  const hsModal = document.getElementById('hs-modal');
  const hsClose = document.getElementById('hs-modal-close');
  const ctaBtn = document.getElementById('cta-access-btn');
  function openHsModal() { if (hsModal) hsModal.hidden = false; }
  if (ctaBtn && hsModal) {
    ctaBtn.addEventListener('click', openHsModal);
    hsClose.addEventListener('click', () => { hsModal.hidden = true; });
    closeOnBackdrop(hsModal, () => { hsModal.hidden = true; });
  }

  function fallbackCopy(text, onSuccess) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      const ok = document.execCommand('copy');
      if (ok) onSuccess();
    } catch {}
    document.body.removeChild(ta);
  }

  function showStatsModal() {
    if (!currentData) return;
    const m = currentMeta;
    let groups;

    if (currentMode === 'music') {
      statsModalTitle.textContent = 'Music Detection Statistics';
      const frames = currentData.frames || [];
      const durationS = currentData.duration_s || 0;
      const durationMs = durationS * 1000;
      const procTimeStr = m.processingMs ? formatDuration(m.processingMs) : 'N/A';
      const procFactor = m.processingMs && durationMs ? (durationMs / m.processingMs).toFixed(1) + 'x real-time' : 'N/A';
      const httpStr = m.httpStatus ? m.httpStatus + (m.httpStatusText ? ' ' + m.httpStatusText : '') : 'N/A';
      const fileType = m.fileType || (currentData.filename ? currentData.filename.split('.').pop().toUpperCase() : 'N/A');
      const avgMusic  = frames.length ? frames.reduce((s, f) => s + (f.music_prob  || 0), 0) / frames.length : 0;
      const avgSpeech = frames.length ? frames.reduce((s, f) => s + (f.speech_prob || 0), 0) / frames.length : 0;
      const maxMusic  = frames.length ? Math.max(...frames.map(f => f.music_prob  || 0)) : 0;
      const maxSpeech = frames.length ? Math.max(...frames.map(f => f.speech_prob || 0)) : 0;
      const costVal = durationMs ? '$' + (durationMs / 3600000 * 0.001).toFixed(6) : 'N/A';
      const serverLatency = currentData.latency_ms != null ? formatDuration(currentData.latency_ms) : 'N/A';

      groups = [
        { group: 'Detection', rows: [
          ['Model', 'velma-2-music-detection-batch'],
          ['Primary label', (currentData.primary_label || 'unknown').replace(/^./, c => c.toUpperCase())],
          ['Music coverage', (currentData.music_pct  != null ? currentData.music_pct.toFixed(1)  : '0.0') + '%'],
          ['Speech coverage', (currentData.speech_pct != null ? currentData.speech_pct.toFixed(1) : '0.0') + '%'],
          ['Avg music probability', (avgMusic * 100).toFixed(1) + '%'],
          ['Avg speech probability', (avgSpeech * 100).toFixed(1) + '%'],
          ['Max music probability', (maxMusic * 100).toFixed(1) + '%'],
          ['Max speech probability', (maxSpeech * 100).toFixed(1) + '%'],
        ]},
        { group: 'Audio', rows: [
          ['File Name', currentData.filename || 'N/A'],
          ['File Size', m.fileSize ? formatBytes(m.fileSize) : 'N/A'],
          ['File Type', fileType],
          ['Audio Duration', formatDuration(durationMs)],
          ['Total frames', String(frames.length)],
          ['Frame resolution', '~0.192s'],
        ]},
        { group: 'Performance', rows: [
          ['Server latency', serverLatency],
          ['Round-trip time', procTimeStr],
          ['Processing Factor', procFactor],
          ['Cost', costVal],
          ['Rate', '$0.001/hr'],
        ]},
        { group: 'Request', rows: [
          ['HTTP', httpStr],
          ['Endpoint', '/api/velma-2-music-detection-batch'],
          ['Response Size', m.responseSize ? formatBytes(m.responseSize) : 'N/A'],
        ]},
      ];
    } else if (currentMode === 'aimusic') {
      statsModalTitle.textContent = 'AI Music Detection Statistics';
      const durationS = currentData.duration_s || 0;
      const durationMs = durationS * 1000;
      const procTimeStr = m.processingMs ? formatDuration(m.processingMs) : 'N/A';
      const procFactor = m.processingMs && durationMs ? (durationMs / m.processingMs).toFixed(1) + 'x real-time' : 'N/A';
      const httpStr = m.httpStatus ? m.httpStatus + (m.httpStatusText ? ' ' + m.httpStatusText : '') : 'N/A';
      const fileType = m.fileType || (currentData.filename ? currentData.filename.split('.').pop().toUpperCase() : 'N/A');
      const serverLatency = currentData.latency_ms != null ? formatDuration(currentData.latency_ms) : 'N/A';
      const verdictMap = { 'ai-vocal-music': 'AI Vocal Music', 'ai-instrumental': 'AI Instrumental', 'not-ai-music': 'Not AI Music' };
      const verdictLabel = verdictMap[currentData.primary_verdict] || currentData.primary_verdict || 'Unknown';
      const isStream = m.httpStatus === 101;
      const num = (x) => (typeof x === 'number' && isFinite(x)) ? x : null;
      const pct = (x) => num(x) != null ? num(x).toFixed(1) + '%' : '—';
      const conf = (x) => (num(x) != null && num(x) > 0) ? num(x).toFixed(4) : '—';
      const windowCount = (typeof currentData.window_count === 'number') ? currentData.window_count
        : (Array.isArray(currentData.windows) ? currentData.windows.length : null);

      groups = [
        { group: 'Detection', rows: [
          ['Model', isStream ? 'velma-2-ai-music-detection-streaming' : 'velma-2-ai-music-detection-batch'],
          ['Primary verdict', verdictLabel],
          ['Vocal AI coverage', pct(currentData.vocal_ai_percentage)],
          ['Vocal AI confidence', conf(currentData.vocal_ai_confidence)],
          ['Instrumental AI score', pct(currentData.instrumental_ai_percentage)],
          ['Instrumental AI confidence', conf(currentData.instrumental_ai_confidence)],
        ]},
        { group: 'Content', rows: [
          ['Vocal content', pct(currentData.vocal_percentage)],
          ['Instrumental content', pct(currentData.instrumental_percentage)],
          ['Silence', pct(currentData.silence_percentage)],
          ['Windows analysed', windowCount != null ? String(windowCount) : '—'],
        ]},
        { group: 'Audio', rows: [
          ['File Name', currentData.filename || 'N/A'],
          ['File Size', m.fileSize ? formatBytes(m.fileSize) : (isStream ? '— (live stream)' : 'N/A')],
          ['File Type', fileType],
          ['Audio Duration', formatDuration(durationMs)],
        ]},
        { group: 'Performance', rows: [
          ['Server latency', serverLatency],
          ['Round-trip time', procTimeStr],
          ['Processing Factor', procFactor],
        ]},
        { group: 'Request', rows: [
          ['HTTP', httpStr],
          ['Endpoint', isStream ? '/api/velma-2-ai-music-detection-streaming' : '/api/velma-2-ai-music-detection-batch'],
          ['Response Size', m.responseSize ? formatBytes(m.responseSize) : 'N/A'],
        ]},
      ];
    } else if (currentMode === 'language') {
      statsModalTitle.textContent = 'Language Detection Statistics';
      const durationMs = currentData.duration_ms || 0;
      const procTimeStr = m.processingMs ? formatDuration(m.processingMs) : 'N/A';
      const procFactor = m.processingMs && durationMs ? (durationMs / m.processingMs).toFixed(1) + 'x real-time' : 'N/A';
      const httpStr = m.httpStatus ? m.httpStatus + (m.httpStatusText ? ' ' + m.httpStatusText : '') : 'N/A';
      const fileType = m.fileType || (lastLanguageFilename ? lastLanguageFilename.split('.').pop().toUpperCase() : 'N/A');
      const conf = currentData.confidence;
      const analyzedMs = Math.min(durationMs, 30000);

      groups = [
        { group: 'Detection', rows: [
          ['Model', 'velma-2-language-detection-batch'],
          ['Predicted language', currentData.predicted_language || 'N/A'],
          ['ISO 639-1 code', currentData.predicted_language_code || 'N/A'],
          ['Confidence', typeof conf === 'number' ? (conf * 100).toFixed(2) + '%' : 'N/A'],
          ['Threshold guidance', typeof conf === 'number' && conf < 0.5 ? 'Low — consider fallback' : 'Acceptable'],
        ]},
        { group: 'Audio', rows: [
          ['File Name', lastLanguageFilename || 'N/A'],
          ['File Size', m.fileSize ? formatBytes(m.fileSize) : 'N/A'],
          ['File Type', fileType],
          ['Audio Duration', durationMs ? formatDuration(durationMs) : 'N/A'],
          ['Audio analyzed', formatDuration(analyzedMs) + (durationMs > 30000 ? ' (first 30 s)' : '')],
        ]},
        { group: 'Performance', rows: [
          ['Processing Time', procTimeStr],
          ['Processing Factor', procFactor],
        ]},
        { group: 'Request', rows: [
          ['HTTP', httpStr],
          ['Endpoint', '/api/velma-2-language-detection-batch'],
          ['Response Size', m.responseSize ? formatBytes(m.responseSize) : 'N/A'],
        ]},
      ];
    } else if (currentMode === 'deepfake') {
      statsModalTitle.textContent = 'Detection Statistics';
      const frames = currentData.frames || [];
      const { isSynthetic: isSyn, synFrames } = computeVerdict(frames);
      const avgSynConf = synFrames.length ? synFrames.reduce((s, f) => s + f.confidence, 0) / synFrames.length : 0;
      const maxSynConf = synFrames.length ? Math.max(...synFrames.map(f => f.confidence)) : 0;
      const durationMs = currentData.duration_ms || 0;
      const procTimeStr = m.processingMs ? formatDuration(m.processingMs) : 'N/A';
      const procFactor = m.processingMs && durationMs ? (durationMs / m.processingMs).toFixed(1) + 'x real-time' : 'N/A';
      const costVal = durationMs ? '$' + (durationMs / 3600000 * 0.25).toFixed(4) : 'N/A';
      const httpStr = m.httpStatus ? m.httpStatus + (m.httpStatusText ? ' ' + m.httpStatusText : '') : 'N/A';
      const fileType = m.fileType || (currentData.filename ? currentData.filename.split('.').pop().toUpperCase() : 'N/A');

      groups = [
        { group: 'Detection', rows: [
          ['Model', 'velma-2-synthetic-voice-detection'],
          ['Verdict', isSyn ? 'Deepfake detected' : 'Authentic'],
          ['Deepfake segments', synFrames.length + ' / ' + frames.length],
          ['Avg deepfake confidence', synFrames.length ? (avgSynConf * 100).toFixed(1) + '%' : 'N/A'],
          ['Max deepfake confidence', synFrames.length ? (maxSynConf * 100).toFixed(1) + '%' : 'N/A'],
        ]},
        { group: 'Audio', rows: [
          ['File Name', currentData.filename || 'N/A'],
          ['File Size', m.fileSize ? formatBytes(m.fileSize) : 'N/A'],
          ['File Type', fileType],
          ['Audio Duration', formatDuration(durationMs)],
          ['Total segments', String(frames.length)],
        ]},
        { group: 'Performance', rows: [
          ['Processing Time', procTimeStr],
          ['Processing Factor', procFactor],
          ['Cost', costVal],
          ['Rate', '$0.25/hr'],
        ]},
        { group: 'Request', rows: [
          ['HTTP', httpStr],
          ['Endpoint', '/api/velma-2-synthetic-voice-detection-batch'],
          ['Response Size', m.responseSize ? formatBytes(m.responseSize) : 'N/A'],
        ]},
      ];
    } else {
      statsModalTitle.textContent = 'Transcription Statistics';
      const utterances = currentData.utterances || [];
      const durationMs = currentData.duration_ms || 0;
      const languages = [...new Set(utterances.map(u => u.language).filter(Boolean))];
      const speakers = [...new Set(utterances.map(u => u.speaker).filter(s => s != null))];
      const procTimeStr = m.processingMs ? formatDuration(m.processingMs) : 'N/A';
      const procFactor = m.processingMs && durationMs ? (durationMs / m.processingMs).toFixed(1) + 'x real-time' : 'N/A';
      const httpStr = m.httpStatus ? m.httpStatus + (m.httpStatusText ? ' ' + m.httpStatusText : '') : 'N/A';
      const fileType = m.fileType || (currentData.filename ? currentData.filename.split('.').pop().toUpperCase() : 'N/A');

      const dfUtterances = utterances.filter(u => u.deepfake_score != null);
      const dfAvg = dfUtterances.length ? (dfUtterances.reduce((s, u) => s + u.deepfake_score, 0) / dfUtterances.length) : null;
      const dfMax = dfUtterances.length ? Math.max(...dfUtterances.map(u => u.deepfake_score)) : null;

      groups = [
        { group: 'Transcription', rows: [
          ['Model', 'velma-2-stt'],
          ['Utterances', String(utterances.length)],
          ['Speakers', speakers.length ? speakers.length.toString() : 'N/A'],
          ['Languages', languages.length ? languages.join(', ') : 'N/A'],
          ['Deepfake analyzed', dfUtterances.length ? dfUtterances.length + ' / ' + utterances.length + ' utterances' : 'N/A'],
          ['Avg deepfake score', dfAvg != null ? dfAvg.toFixed(4) : 'N/A'],
          ['Max deepfake score', dfMax != null ? dfMax.toFixed(4) : 'N/A'],
        ]},
        { group: 'Audio', rows: [
          ['File Name', currentData.filename || 'N/A'],
          ['File Size', m.fileSize ? formatBytes(m.fileSize) : 'N/A'],
          ['File Type', fileType],
          ['Audio Duration', formatDuration(durationMs)],
        ]},
        { group: 'Performance', rows: [
          ['Processing Time', procTimeStr],
          ['Processing Factor', procFactor],
        ]},
        { group: 'Request', rows: [
          ['HTTP', httpStr],
          ['Endpoint', m.httpStatus === 101 ? '/api/velma-2-stt-streaming' : '/api/velma-2-stt-batch'],
          ['Response Size', m.responseSize ? formatBytes(m.responseSize) : 'N/A'],
        ]},
      ];
    }

    statsGrid.innerHTML = statsCardsHtml(groups);
    if (bottomColumns) bottomColumns.classList.add('visible');
  }

  // groups: [{group, rows: [[label, value], …]}, …] → design stat cards
  function statsCardsHtml(groups) {
    let html = '';
    groups.forEach(g => {
      html += '<section class="pg-stats-card"><h6 class="pg-stats-card-title">' + escapeHtml(g.group) + '</h6><dl class="pg-stats-list">';
      g.rows.forEach(([label, value]) => {
        html += '<dt>' + escapeHtml(String(label)) + '</dt><dd>' + escapeHtml(String(value)) + '</dd>';
      });
      html += '</dl></section>';
    });
    return html;
  }

  function showJsonModal() {
    if (!currentData) return;
    // Cap the pretty-printed payload — velma responses can run to megabytes.
    let text = JSON.stringify(currentData, null, 2);
    const MAX_JSON_CHARS = 400000;
    if (text.length > MAX_JSON_CHARS) {
      text = text.slice(0, MAX_JSON_CHARS) + '\n… (truncated for display — use Copy for the full payload)';
    }
    jsonPre.innerHTML = syntaxHighlightJson(text);
    if (bottomColumns) bottomColumns.classList.add('visible');
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── SHARED UTILITIES ──────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  async function uploadAndAnalyze(file, endpoint, extraFields) {
    const formData = new FormData();
    formData.append('upload_file', file);
    if (extraFields) {
      for (const [key, value] of Object.entries(extraFields)) {
        formData.append(key, String(value));
      }
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && analysisStatus) {
          const pct = Math.round(e.loaded / e.total * 100);
          analysisStatus.textContent = pct < 100
            ? 'Uploading\u2026 ' + pct + '%'
            : 'Processing on server\u2026';
        }
      });

      xhr.upload.addEventListener('load', () => {
        if (analysisStatus) analysisStatus.textContent = 'Processing on server\u2026';
      });

      xhr.addEventListener('load', () => {
        const responseText = xhr.responseText;
        if (xhr.status < 200 || xhr.status >= 300) {
          let body = {};
          try { body = JSON.parse(responseText); } catch {}
          const msg = body.detail || body.message || body.error || ('Server error (' + xhr.status + ')');
          const err = new Error(msg);
          err.rawText = responseText;
          err.httpStatus = xhr.status;
          reject(err);
          return;
        }
        let data;
        try { data = JSON.parse(responseText); } catch {
          const err = new Error('Invalid response from server');
          err.rawText = responseText;
          reject(err);
          return;
        }
        resolve({
          data,
          meta: { httpStatus: xhr.status, httpStatusText: xhr.statusText, responseSize: responseText.length },
        });
      });

      xhr.addEventListener('error', () => {
        const err = new Error('Network error — could not reach server');
        err.rawText = '';
        reject(err);
      });

      xhr.addEventListener('timeout', () => {
        const err = new Error('Request timed out');
        err.rawText = '';
        reject(err);
      });

      xhr.open('POST', endpoint);
      xhr.timeout = 300000; // 5 min
      xhr.send(formData);
    });
  }

  function getAudioDuration(file) {
    return new Promise((resolve) => {
      const audio = new Audio();
      const url = URL.createObjectURL(file);
      audio.addEventListener('loadedmetadata', () => {
        const dur = audio.duration;
        URL.revokeObjectURL(url);
        resolve(isFinite(dur) ? dur * 1000 : 10000);
      });
      audio.addEventListener('error', () => { URL.revokeObjectURL(url); resolve(10000); });
      audio.src = url;
    });
  }

  // \u2500\u2500 Analysis progress \u2192 upload-plate states \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // The old full-screen overlay is gone; the plate itself narrates the flow:
  //   showOverlay()      \u2192 'uploading'   (spinner + label)
  //   startProgress()    \u2192 'processing'  (stage chips ticking through)
  //   finishProgress()   \u2192 all stages checked, brief beat
  //   hideOverlay()      \u2192 'uploaded'    (collapsed "New analysis" plate)
  //   showOverlayError() \u2192 'initial' + error toast
  function buildStages() {
    if (!plateStages) return;
    const names = (MODES[currentMode] && MODES[currentMode].stages) || ['Analyzing audio'];
    // Stage check-off timing is pure CSS (per-chip --stage-delay via nth-child).
    plateStages.innerHTML = names.map(n =>
      '<span class="pg-processing-stage">' +
      '<svg class="pg-stage-check" width="20" height="20" viewBox="0 0 10 10" aria-hidden="true">' +
      '<path d="M 1.5 4.55 L 4 7.95 L 9 2.05" fill="none" stroke="currentColor" stroke-width="1" /></svg>' +
      escapeHtml(n) + '</span>'
    ).join('');
  }

  function startProgress(estimatedMs) {
    buildStages();
    setPlateState('processing');
  }

  function finishProgress() {
    return new Promise((resolve) => setTimeout(resolve, 350));
  }

  function stopProgress() {}

  function showOverlay(filename, statusText) {
    if (plateUploadingLabel) {
      plateUploadingLabel.textContent = statusText || ('Uploading \u201c' + truncate(filename || 'audio', 30) + '\u201d\u2026');
    }
    setPlateState('uploading');
  }

  function hideOverlay() {
    stopProgress();
    setPlateState('uploaded');
    setPageTitle(resultsFilename.textContent);
    refreshBottomPanels();
    syncPlayerMeta();
  }

  function showOverlayError(msg, rawText) {
    stopProgress();
    setPlateState('initial');
    showError(msg);
    if (rawText) {
      // Surface the raw error payload in the JSON panel for inspection.
      try { jsonPre.textContent = JSON.stringify(JSON.parse(rawText), null, 2); }
      catch { jsonPre.textContent = rawText; }
      if (bottomColumns) bottomColumns.classList.add('visible');
    }
  }

  function showError(msg) {
    errorToast.textContent = msg;
    errorToast.classList.add('visible');
    setTimeout(() => errorToast.classList.remove('visible'), 5000);
  }

  function syntaxHighlightJson(json) {
    return json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")\s*:/g, '<span class="pg-json-key">$1</span>:')
      .replace(/:\s*("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")/g, ': <span class="pg-json-string">$1</span>')
      .replace(/:\s*(-?\d+\.?\d*([eE][+-]?\d+)?)/g, ': <span class="pg-json-number">$1</span>')
      .replace(/:\s*(true|false)/g, ': <span class="pg-json-bool">$1</span>')
      .replace(/:\s*(null)/g, ': <span class="pg-json-null">$1</span>')
      .replace(/([{}[\]])/g, '<span class="pg-json-brace">$1</span>');
  }

  // Render PII/PHI tagged text with blurred spans
  function renderPiiText(rawText) {
    // Match <pii:type>content</pii:type> and <phi:type>content</phi:type>
    const piiRegex = /<(pii|phi)(?::(\w+))?>([\s\S]*?)<\/\1(?::\2)?>/gi;
    let result = '';
    let lastIdx = 0;
    let match;
    while ((match = piiRegex.exec(rawText)) !== null) {
      result += escapeHtml(rawText.slice(lastIdx, match.index));
      const tagType = match[1].toUpperCase();
      const tagName = match[2] ? match[2].replace(/_/g, ' ') : tagType;
      const content = match[3];
      result += '<span class="pii-blur" title="' + tagType + ': ' + escapeHtml(tagName) + '">' + escapeHtml(content) + '</span>';
      lastIdx = match.index + match[0].length;
    }
    result += escapeHtml(rawText.slice(lastIdx));
    return result;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function formatMs(ms) {
    const totalSec = Math.floor(ms / 1000);
    return Math.floor(totalSec / 60) + ':' + String(totalSec % 60).padStart(2, '0');
  }

  function formatSecCompact(ms) {
    const sec = Math.round(ms / 1000);
    if (sec < 60) return sec + 's';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + 'm' + (s > 0 ? s + 's' : '');
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  function formatDuration(ms) {
    if (ms < 1000) return ms.toFixed(0) + 'ms';
    const sec = ms / 1000;
    if (sec < 60) return sec.toFixed(2) + 's';
    const m = Math.floor(sec / 60);
    return m + 'm ' + (sec % 60).toFixed(1) + 's';
  }

  function truncate(str, n) { return str.length > n ? str.slice(0, n - 1) + '\u2026' : str; }

  function confidenceToOpacity(c) {
    const t = Math.max(0, (c - 0.5) / 0.5);
    return Math.max(0.3, Math.pow(t, 1.8)).toFixed(2);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── VELMA MODE (ensemble listening: clips + behaviors + summary + topics)
  // ══════════════════════════════════════════════════════════════════════════

  const DEMO_VELMA_AUDIO_URL = '/deepfake/irate-caller-demo.mp3';
  const DEMO_VELMA_DATA_URL = '/velma-demo-data.json';
  let DEMO_VELMA_DATA = null;

  // Velma has no built-in catalog of conversation types or participant roles —
  // integrators author their own. These are a couple of *examples* a tester can
  // opt into via "Load example"; they are NOT defaults and are not pre-selected.
  const VELMA_EXAMPLE_CONV_TYPES = [
    {
      conversation_type_uuid: '11111111-1111-4111-8111-111111111001',
      name: 'Customer Service Call',
      short_description: 'A phone call between a customer and a service representative.',
      detailed_description: 'An inbound or outbound voice call where one participant (the Customer Service Representative) is acting on behalf of a company to assist or resolve issues raised by another participant (the Customer). Typically includes greeting and identification, issue identification, troubleshooting or resolution attempt, and closure.',
    },
    {
      conversation_type_uuid: '11111111-1111-4111-8111-111111111002',
      name: 'Sales Call',
      short_description: 'A sales conversation between a representative and a prospect.',
      detailed_description: 'An outbound or inbound voice call where a sales representative presents, discusses, or attempts to close a transaction with a prospect or potential customer. Typically includes discovery, presentation, objection handling, and a call-to-action.',
    },
  ];

  const VELMA_EXAMPLE_ROLES = [
    {
      participant_role_uuid: '22222222-2222-4222-8222-222222222001',
      name: 'Customer',
      short_description: 'The caller reaching out for assistance.',
      detailed_description: 'The party seeking help. Customers describe an issue, ask questions, share account or order details on request, and seek resolution. They are not acting on behalf of a company or following a service script.',
    },
    {
      participant_role_uuid: '22222222-2222-4222-8222-222222222002',
      name: 'Customer Service Representative',
      short_description: 'The company-side agent assisting the caller.',
      detailed_description: 'The company representative handling the call. CSRs greet the caller, verify identity, gather details, follow scripts and processes, troubleshoot, and attempt to resolve the customer\'s issue.',
    },
    {
      participant_role_uuid: '22222222-2222-4222-8222-222222222003',
      name: 'Sales Representative',
      short_description: 'The seller-side participant on a sales call.',
      detailed_description: 'The participant attempting to advance or close a sale. Sales reps qualify, present features and benefits, handle objections, and ask for the close.',
    },
  ];

  // Behaviors are NOT preconfigured. The endpoint's only behavior catalog is the
  // server-defined presets (GET list-presets), referenced as "preset:<id>".
  // Testers pick presets or author their own custom behavior objects.

  // The endpoint's `config` form field / first stream frame accepts the literal
  // string "default" (server applies its built-in configuration) or a full
  // BatchConfig object. The editor always builds an explicit BatchConfig (shown
  // live in the right pane) so developers see exactly what's sent; a single
  // "use default" checkbox swaps the payload for the literal string "default".

  // Documented BatchConfig / STTOptions defaults (straight from the spec). This
  // is the editor's starting state: nothing selected (empty conversation_types /
  // participant_roles / behaviors), STT + produce_* at their documented defaults.
  function buildCustomConfigSeed() {
    return {
      conversation_types: [],
      participant_roles: [],
      behaviors: [],
      stt: {
        speaker_diarization: true,
        emotion_signal: false,
        accent_signal: false,
        deepfake_signal: false,
        pii_phi_tagging: false,
      },
      produce_topics: true,
      produce_topic_sentiments: true,
      produce_summary: true,
    };
  }

  // Fresh state is the literal string "default" — exactly the spec's contract:
  // `config` is either "default" (server's built-in config) or a BatchConfig.
  function buildDefaultVelmaConfig() {
    return 'default';
  }

  function isDefaultConfig() {
    return velmaConfig === 'default';
  }

  // First time the tester changes anything, replace "default" with an explicit
  // BatchConfig seeded with the documented defaults, then apply their edit.
  function ensureCustomConfig() {
    if (velmaConfig === 'default') velmaConfig = buildCustomConfigSeed();
    return velmaConfig;
  }

  // Tracks presets that have been expanded into editable BehaviorDefs:
  // behavior_uuid → preset identifier (ephemeral, lets us collapse back to a ref).
  const velmaPresetExpansions = new Map();

  // Active Velma config — the single config state: "default" or a BatchConfig object.
  let velmaConfig = buildDefaultVelmaConfig();

  // Velma DOM refs
  const velmaContent       = document.getElementById('velma-content');
  const velmaSidebar       = document.getElementById('results-velma-sidebar');
  const velmaOptions       = document.getElementById('velma-options');
  const velmaConfigBtn     = document.getElementById('velma-config-btn');
  const velmaConfigSummary = document.getElementById('velma-config-summary');
  const velmaSetupBtn      = document.getElementById('velma-setup-btn');
  const velmaDemoAction    = document.getElementById('results-velma-demo-action');
  const velmaSummaryText   = document.getElementById('velma-summary-text');
  const velmaConvTypePick  = document.getElementById('velma-conv-type-pick');
  const velmaRolePicks     = document.getElementById('velma-role-picks');
  const velmaSpeakersTbody = document.getElementById('velma-speakers-tbody');
  const velmaBehaviorsTbody= document.getElementById('velma-behaviors-tbody');
  const velmaBehaviorsTable = document.querySelector('.velma-behaviors-table');
  const velmaResultsBehaviorsNote = document.getElementById('velma-results-behaviors-note');
  const velmaTopicsBySpeaker = document.getElementById('velma-topics-by-speaker');
  const velmaSummarySection      = document.getElementById('velma-summary-section');
  const velmaPicksSection        = document.getElementById('velma-picks-section');
  const velmaSpeakersSection     = document.getElementById('velma-speakers-section');
  const velmaBehaviorsSection    = document.getElementById('velma-behaviors-section');
  const velmaTopicsSection       = document.getElementById('velma-topics-section');
  const velmaConfigModal     = document.getElementById('velma-config-modal');
  const velmaConfigModalClose= document.getElementById('velma-config-modal-close');
  const velmaConfigTextarea  = document.getElementById('velma-config-textarea');
  const velmaConfigError     = document.getElementById('velma-config-error');
  const velmaConfigApplyBtn  = document.getElementById('velma-config-apply-btn');
  const velmaConfigResetBtn  = document.getElementById('velma-config-reset-btn');
  const velmaCfgConvList     = document.getElementById('velma-cfg-conv-list');
  const velmaCfgAddConvBtn   = document.getElementById('velma-cfg-add-conv-btn');
  const velmaCfgConvExampleBtn = document.getElementById('velma-cfg-conv-example-btn');
  const velmaCfgRolesList    = document.getElementById('velma-cfg-roles-list');
  const velmaCfgRolesExampleBtn = document.getElementById('velma-cfg-roles-example-btn');
  const velmaCfgBehaviorsList= document.getElementById('velma-cfg-behaviors-list');
  const velmaCfgBehaviorsWarning = document.getElementById('velma-cfg-behaviors-warning');
  const velmaCfgPresetsList  = document.getElementById('velma-cfg-presets-list');
  const velmaCfgAddRoleBtn   = document.getElementById('velma-cfg-add-role-btn');
  const velmaCfgAddBehaviorBtn = document.getElementById('velma-cfg-add-behavior-btn');
  const velmaCfgRawToggle    = document.getElementById('velma-config-raw-toggle');
  const velmaCfgSttDiar      = document.getElementById('velma-cfg-stt-diar');
  const velmaCfgSttEmot      = document.getElementById('velma-cfg-stt-emot');
  const velmaCfgSttAcc       = document.getElementById('velma-cfg-stt-acc');
  const velmaCfgSttDeepfake  = document.getElementById('velma-cfg-stt-deepfake');
  const velmaCfgSttPii       = document.getElementById('velma-cfg-stt-pii');
  const velmaCfgLanguage     = document.getElementById('velma-cfg-language');
  const velmaCfgProdTopics   = document.getElementById('velma-cfg-prod-topics');
  const velmaCfgProdSentiments = document.getElementById('velma-cfg-prod-sentiments');
  const velmaCfgProdSummary  = document.getElementById('velma-cfg-prod-summary');
  const btnShowStatsVelma    = document.getElementById('btn-show-stats-velma');
  const btnShowJsonVelma     = document.getElementById('btn-show-json-velma');
  const btnEditConfigVelma   = document.getElementById('btn-edit-config-velma');

  // Velma state
  let velmaData = null;
  // What the most recent run asked for — used to flag "behaviors requested but
  // none came back" (the API drops behaviors when no conversation types/roles).
  let velmaLastRequest = null;
  function captureVelmaRequest() {
    if (isDefaultConfig()) { velmaLastRequest = { behaviorsRequested: false }; return; }
    const c = velmaConfig || {};
    velmaLastRequest = {
      behaviorsRequested: (c.behaviors || []).length > 0,
      hasConvTypes: (c.conversation_types || []).length > 0,
      hasRoles: (c.participant_roles || []).length > 0,
    };
  }
  let lastVelmaData = null;
  let lastVelmaAudioUrl = null;
  let lastVelmaMeta = null;
  let lastVelmaFilename = '';
  // Map of clip_uuid → array of detected behavior names attached to that clip.
  // Set when rendering Velma results; consumed by patchVelmaTranscriptBubbles to overlay chips.
  let velmaClipBehaviorsByUuid = {};

  function updateVelmaConfigSummary() {
    if (!velmaConfigSummary) return;
    if (isDefaultConfig()) {
      velmaConfigSummary.textContent = 'Endpoint default configuration';
      return;
    }
    const c = velmaConfig;
    const nT = (c.conversation_types || []).length;
    const nR = (c.participant_roles || []).length;
    const behaviors = c.behaviors || [];
    const nB = behaviors.length;
    const nPreset = behaviors.filter(b => typeof b === 'string').length;
    const behaviorLabel = `${nB} behavior${nB === 1 ? '' : 's'}` +
      (nPreset ? ` (${nPreset} preset${nPreset === 1 ? '' : 's'})` : '');
    velmaConfigSummary.textContent =
      `Custom · ${nT} conversation type${nT === 1 ? '' : 's'} · ${nR} role${nR === 1 ? '' : 's'} · ${behaviorLabel}`;
  }

  function clearVelmaResults() {
    if (!velmaContent) return;
    velmaData = null;
    velmaClipBehaviorsByUuid = {};
    velmaSummaryText.textContent = '';
    velmaConvTypePick.innerHTML = '';
    velmaRolePicks.innerHTML = '';
    velmaSpeakersTbody.innerHTML = '';
    velmaBehaviorsTbody.innerHTML = '';
    velmaTopicsBySpeaker.innerHTML = '';
    if (velmaResultsBehaviorsNote) velmaResultsBehaviorsNote.style.display = 'none';
    if (velmaBehaviorsTable) velmaBehaviorsTable.style.display = '';
    if (velmaSummarySection)   velmaSummarySection.style.display = 'none';
    if (velmaPicksSection)     velmaPicksSection.style.display = 'none';
    if (velmaSpeakersSection)  velmaSpeakersSection.style.display = 'none';
    if (velmaBehaviorsSection) velmaBehaviorsSection.style.display = 'none';
    if (velmaTopicsSection)    velmaTopicsSection.style.display = 'none';
  }

  async function loadDemoVelmaData() {
    if (DEMO_VELMA_DATA) return DEMO_VELMA_DATA;
    try {
      const res = await fetch(DEMO_VELMA_DATA_URL);
      if (!res.ok) throw new Error('Failed to fetch demo data');
      DEMO_VELMA_DATA = await res.json();
      return DEMO_VELMA_DATA;
    } catch (err) {
      console.warn('Velma demo data failed to load:', err);
      return null;
    }
  }

  function renderVelmaDemo() {
    if (!DEMO_VELMA_DATA) return;
    velmaData = DEMO_VELMA_DATA;
    currentData = DEMO_VELMA_DATA;
    currentMeta = {
      fileSize: 5385320,
      fileType: 'audio/mpeg',
      httpStatus: 200,
      httpStatusText: 'OK',
      responseSize: JSON.stringify(DEMO_VELMA_DATA).length,
      processingMs: 42000,
    };
    resultsFilename.textContent = DEMO_VELMA_DATA.filename || 'Irate_Caller_Final.mp3';
    resultsAudio.src = DEMO_VELMA_AUDIO_URL;
    renderVelmaResults(DEMO_VELMA_DATA);
  }

  // Show the pre-cached Velma demo (fetches the JSON once, then renders), so the
  // Velma tab opens populated like the other model tabs do with their DEMO_*_DATA.
  async function showVelmaDemo() {
    const data = await loadDemoVelmaData();
    if (!data) { clearVelmaResults(); return; }
    renderVelmaDemo();
  }

  async function startVelmaBatch(file) {
    if (isAnalyzing) return;
    isAnalyzing = true;
    const durationMs = await getAudioDuration(file);
    showOverlay(file.name, 'Running ensemble analysis (transcription · emotion · behaviors · summary)');
    // Velma is slower than basic STT; assume ~5x realtime
    const estimatedMs = Math.max(MIN_PROGRESS_MS, durationMs / 5);
    startProgress(estimatedMs);

    try {
      const startedAt = Date.now();
      // The `config` form field is either the literal string `default` or a JSON BatchConfig.
      captureVelmaRequest();
      const configField = isDefaultConfig() ? 'default' : JSON.stringify(velmaConfig);
      const { data, meta } = await uploadAndAnalyze(file, '/api/velma-2-batch', { config: configField });
      const processingMs = Date.now() - startedAt;
      await finishProgress();
      hideOverlay();

      if (lastVelmaAudioUrl) URL.revokeObjectURL(lastVelmaAudioUrl);
      const audioUrl = URL.createObjectURL(file);

      currentMeta = {
        fileSize: file.size,
        fileType: file.type || file.name.split('.').pop().toUpperCase(),
        httpStatus: meta.httpStatus,
        httpStatusText: meta.httpStatusText,
        responseSize: meta.responseSize,
        processingMs,
      };

      velmaData = data;
      currentData = data;
      lastVelmaData = data;
      lastVelmaAudioUrl = audioUrl;
      lastVelmaFilename = file.name;
      lastVelmaMeta = { ...currentMeta };
      resultsFilename.textContent = file.name;
      resultsAudio.src = audioUrl;
      renderVelmaResults(data);
      window.scrollTo(0, 0);
      updateRateLimit();
      isAnalyzing = false;
    } catch (err) {
      showOverlayError(err.message || 'Velma analysis failed. Please try again.', err.rawText);
      isAnalyzing = false;
    }
  }

  async function startVelmaDemo() {
    if (isAnalyzing) return;
    try {
      const res = await fetch(DEMO_VELMA_AUDIO_URL);
      if (!res.ok) throw new Error('Could not load demo audio');
      const blob = await res.blob();
      const file = new File([blob], 'call-center-demo.mp3', { type: blob.type || 'audio/mpeg' });
      startVelmaBatch(file);
    } catch (err) {
      showError(err.message || 'Could not load demo audio');
    }
  }

  if (velmaDemoAction) {
    velmaDemoAction.addEventListener('click', () => {
      if (currentMode !== 'velma') return;
      startVelmaDemo();
    });
  }

  // ── Velma Streaming (WebSocket /api/velma-2-streaming) ──────────────────────
  // Mirrors the STT streaming transport (decode → 16 kHz mono s16le → paced
  // 256 ms chunks) but follows the velma-2-streaming protocol: send the config
  // text frame FIRST, then binary audio, then an empty text frame to end. Server
  // events (clip / conversation_type / participant_role / behavior_detection /
  // topics / topic_sentiment / summary / done) are accumulated into a
  // batch-shaped object and rendered progressively via renderVelmaResults.

  let velmaStreamData = null;
  let velmaStreamRenderPending = false;

  function newVelmaStreamData() {
    return {
      clips: [],
      behaviors: [],
      participant_role_picks: [],
      conversation_type_pick: null,
      topics: [],
      topic_sentiments: [],
      summary: null,
      duration_ms: 0,
    };
  }

  function scheduleVelmaStreamRender() {
    if (velmaStreamRenderPending) return;
    velmaStreamRenderPending = true;
    setTimeout(() => {
      velmaStreamRenderPending = false;
      // Mid-stream render — not final, so the "no behaviors returned" note stays
      // suppressed until the `done` event arrives.
      if (velmaStreamData) renderVelmaResults(velmaStreamData, false);
    }, 150);
  }

  function handleVelmaStreamMessage(msg) {
    if (!msg || !velmaStreamData) return;
    switch (msg.type) {
      case 'clip':
        if (msg.clip) velmaStreamData.clips.push(msg.clip);
        break;
      case 'conversation_type':
        if (msg.pick) velmaStreamData.conversation_type_pick = msg.pick;
        break;
      case 'participant_role':
        if (msg.pick) {
          // Replace any existing pick for the same speaker (events may re-fire).
          const i = velmaStreamData.participant_role_picks
            .findIndex(p => p.speaker_label === msg.pick.speaker_label);
          if (i >= 0) velmaStreamData.participant_role_picks[i] = msg.pick;
          else velmaStreamData.participant_role_picks.push(msg.pick);
        }
        break;
      case 'behavior_detection':
        if (msg.detection) velmaStreamData.behaviors.push(msg.detection);
        break;
      case 'topics':
        if (Array.isArray(msg.topics)) velmaStreamData.topics = msg.topics;
        break;
      case 'topic_sentiment':
        if (msg.topic_sentiment) velmaStreamData.topic_sentiments.push(msg.topic_sentiment);
        break;
      case 'summary':
        if (typeof msg.text === 'string') velmaStreamData.summary = msg.text;
        break;
      case 'error':
        showError('Streaming error: ' + (msg.error || 'Unknown error'));
        return;
      case 'done':
        if (typeof msg.duration_ms === 'number') velmaStreamData.duration_ms = msg.duration_ms;
        velmaStreamFinalize();
        return;
      default:
        return; // ignore unknown event types
    }
    scheduleVelmaStreamRender();
  }

  function velmaStreamFinalize() {
    velmaData = velmaStreamData;
    currentData = velmaStreamData;
    lastVelmaData = velmaStreamData;
    currentMeta = {
      fileSize: 0,
      fileType: 'PCM 16 kHz mono',
      httpStatus: 101,
      httpStatusText: 'Switching Protocols',
      responseSize: JSON.stringify(velmaStreamData).length,
      processingMs: velmaStreamData.duration_ms || 0,
    };
    lastVelmaMeta = { ...currentMeta };
    renderVelmaResults(velmaStreamData, true); // final — surface the empty-behaviors note if applicable
    updateRateLimit();
    // The model has finished; flip the record button back to its idle state
    // (the socket closes right after `done`).
    isRecording = false;
    updateRecordButton();
  }

  function startVelmaDemoStream() {
    return runVelmaStream(DEMO_VELMA_AUDIO_URL, 'Irate_Caller_Final.mp3', false);
  }

  async function startVelmaFileStream(file) {
    const url = URL.createObjectURL(file);
    await runVelmaStream(url, file.name, true);
  }

  // Live mic streaming — mirrors transcription's record button, but talks the
  // velma-2-streaming protocol (config frame first, then PCM, then empty frame).
  function startVelmaMicStream() {
    if (currentMode !== 'velma' || isRecording || isAnalyzing) return;
    captureVelmaRequest();
    clearVelmaResults();
    velmaStreamData = newVelmaStreamData();
    velmaData = velmaStreamData;
    currentData = velmaStreamData;
    resultsFilename.textContent = 'Live recording';
    resultsAudio.removeAttribute('src');
    startRecordingCommon(
      '/api/velma-2-streaming?audio_format=s16le&sample_rate=16000&num_channels=1',
      handleVelmaStreamMessage,
      () => {
        // First frame must be the config (before any audio chunk).
        try { recordingWs.send(isDefaultConfig() ? 'default' : JSON.stringify(velmaConfig)); } catch (e) {}
      }
    );
  }

  async function runVelmaStream(url, filename, isUserFile) {
    if (isRecording || isAnalyzing) return;
    if (currentMode !== 'velma') return;

    captureVelmaRequest();
    clearVelmaResults();
    velmaStreamData = newVelmaStreamData();
    velmaData = velmaStreamData;
    currentData = velmaStreamData;

    resultsFilename.textContent = filename;
    if (lastVelmaAudioUrl) { URL.revokeObjectURL(lastVelmaAudioUrl); lastVelmaAudioUrl = null; }
    if (isUserFile) lastVelmaAudioUrl = url; // track blob url so we can revoke later
    resultsAudio.src = url;
    lastVelmaFilename = filename;
    window.scrollTo(0, 0);

    // Fetch + decode → 16 kHz mono PCM s16le (same as the STT streaming transport)
    let int16;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const arr = await res.arrayBuffer();
      const actx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      const audio = await actx.decodeAudioData(arr);
      const ch = audio.getChannelData(0);
      int16 = new Int16Array(ch.length);
      for (let i = 0; i < ch.length; i++) {
        int16[i] = Math.max(-32768, Math.min(32767, Math.round(ch[i] * 32767)));
      }
      actx.close().catch(() => {});
    } catch (err) {
      showError('Failed to load audio: ' + (err && err.message ? err.message : err));
      return;
    }

    // Raw/headerless PCM requires audio_format + sample_rate + num_channels.
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = proto + '//' + location.host +
      '/api/velma-2-streaming?audio_format=s16le&sample_rate=16000&num_channels=1';
    recordingWs = new WebSocket(wsUrl);
    recordingWs.binaryType = 'arraybuffer';
    endFrameSent = false;

    recordingWs.onopen = () => {
      isRecording = true;
      recordingStartTime = Date.now();

      // Protocol step 1: first text frame is the config — literal `default` or JSON BatchConfig.
      try { recordingWs.send(isDefaultConfig() ? 'default' : JSON.stringify(velmaConfig)); } catch (e) {}

      // Play the source audio alongside the stream so the user hears what the model hears.
      try { resultsAudio.currentTime = 0; } catch {}
      const playPromise = resultsAudio.play();
      if (playPromise && playPromise.catch) playPromise.catch(() => { /* autoplay blocked — silent */ });

      // Protocol step 2: paced binary audio (4096 samples = 256 ms at 16 kHz).
      const CHUNK = 4096;
      let offset = 0;
      function sendNext() {
        if (!isRecording || !recordingWs || recordingWs.readyState !== WebSocket.OPEN) return;
        if (offset >= int16.length) {
          // Protocol step 3: empty text frame signals end of audio.
          try { recordingWs.send(''); } catch (e) {}
          endFrameSent = true;
          return;
        }
        const end = Math.min(offset + CHUNK, int16.length);
        const slice = int16.subarray(offset, end);
        const ab = new ArrayBuffer(slice.byteLength);
        new Int16Array(ab).set(slice);
        recordingWs.send(ab);
        offset = end;
        demoChunkTimer = setTimeout(sendNext, 256);
      }
      sendNext();
    };

    recordingWs.addEventListener('message', async (event) => {
      let text = '';
      try {
        if (typeof event.data === 'string') text = event.data;
        else if (event.data instanceof Blob) text = await event.data.text();
        else if (event.data instanceof ArrayBuffer) text = new TextDecoder().decode(event.data);
      } catch { return; }
      if (!text) return;
      let msg; try { msg = JSON.parse(text); } catch { return; }
      handleVelmaStreamMessage(msg);
    });

    recordingWs.onerror = () => {
      if (demoChunkTimer) { clearTimeout(demoChunkTimer); demoChunkTimer = null; }
      isRecording = false;
      updateRecordButton();
    };

    recordingWs.onclose = (event) => {
      if (demoChunkTimer) { clearTimeout(demoChunkTimer); demoChunkTimer = null; }
      isRecording = false;
      updateRecordButton();
      // Surface abnormal closes (a clean run ends via the `done` event, code 1000).
      const code = event.code;
      const reason = event.reason || '';
      if (code !== 1000 && !(velmaStreamData && velmaStreamData.duration_ms)) {
        let m;
        if (code === 4029) m = 'Insufficient credits to complete the request.';
        else if (code === 4003) m = 'This request is not permitted.';
        else if (code === 1003) m = 'Protocol error: ' + (reason || 'invalid config or unsupported audio format.');
        else if (code === 1011) m = 'Upstream server error: ' + (reason || 'the service is temporarily unavailable.');
        else if (code === 1006) m = 'Could not connect to the server. You may have reached the rate limit — please wait a minute and try again.';
        else m = 'Connection closed' + (reason ? ': ' + reason : '') + ' (code ' + code + ').';
        showError(m);
      }
    };
  }

  // ── Velma Rendering ────────────────────────────────────────────────────────

  function renderVelmaResults(data, isFinal = true) {
    if (!data) { clearVelmaResults(); return; }

    // ── Summary. The model tags PII/PHI inline; always blur when present (they're
    //    sensitive regardless of whether the user explicitly requested STT pii tagging).
    if (data.summary) {
      if (/<(pii|phi)/i.test(data.summary)) {
        velmaSummaryText.innerHTML = renderPiiText(data.summary);
      } else {
        velmaSummaryText.textContent = data.summary;
      }
      velmaSummarySection.style.display = '';
    } else {
      velmaSummarySection.style.display = 'none';
    }

    // ── Conversation type pick + role picks
    velmaConvTypePick.innerHTML = '';
    velmaRolePicks.innerHTML = '';
    const havePicks = !!data.conversation_type_pick || (data.participant_role_picks && data.participant_role_picks.length);
    velmaPicksSection.style.display = havePicks ? '' : 'none';

    if (data.conversation_type_pick) {
      const p = data.conversation_type_pick;
      velmaConvTypePick.appendChild(buildPickBadge('Type', p.name, p.confidence, p.selection_source, p.reasoning, p.detail));
    }
    const rolePicks = data.participant_role_picks || [];
    rolePicks.forEach(rp => {
      velmaRolePicks.appendChild(buildPickBadge(rp.speaker_label, rp.name, rp.confidence, rp.selection_source, rp.reasoning, rp.detail));
    });

    // ── Speaker→role map (used by behavior table + transcript chips + topics)
    const clips = data.clips || [];
    const speakerToRole = {};
    rolePicks.forEach(rp => { speakerToRole[rp.speaker_label] = rp.name; });

    // ── Per-speaker emotion stacked bar chart
    const speakerStats = computeSpeakerStats(clips, data.duration_ms || 0);
    velmaSpeakersTbody.innerHTML = '';
    if (speakerStats.length) {
      velmaSpeakersSection.style.display = '';
      speakerStats.forEach(s => velmaSpeakersTbody.appendChild(buildSpeakerRow(s, speakerToRole[s.label])));
    } else {
      velmaSpeakersSection.style.display = 'none';
    }

    // ── Behaviors table
    velmaBehaviorsTbody.innerHTML = '';
    const behaviors = data.behaviors || [];
    // Did this run request behaviors but get none back? The API drops behaviors
    // when the config has no conversation types / participant roles — flag it
    // (only on the final render, so streaming-in-progress doesn't false-alarm).
    const behaviorsEmptyButRequested = isFinal && behaviors.length === 0 &&
      velmaLastRequest && velmaLastRequest.behaviorsRequested;
    if (behaviors.length || behaviorsEmptyButRequested) {
      velmaBehaviorsSection.style.display = '';
      if (behaviorsEmptyButRequested) {
        if (velmaBehaviorsTable) velmaBehaviorsTable.style.display = 'none';
        if (velmaResultsBehaviorsNote) {
          const missing = [];
          if (!velmaLastRequest.hasConvTypes) missing.push('a conversation type');
          if (!velmaLastRequest.hasRoles) missing.push('participant roles');
          velmaResultsBehaviorsNote.innerHTML = missing.length
            ? '⚠ You requested behaviors but the API returned none. Behaviors are only evaluated when the config also defines ' +
              missing.join(' and ') + '. Add ' + missing.join(' and ') + ' in the config (or use <strong>Load example</strong>) and re-run.'
            : '⚠ You requested behaviors but the API returned none for this audio.';
          velmaResultsBehaviorsNote.style.display = '';
        }
      } else {
        if (velmaBehaviorsTable) velmaBehaviorsTable.style.display = '';
        if (velmaResultsBehaviorsNote) velmaResultsBehaviorsNote.style.display = 'none';
        // Sort: detected first (by speaker_label asc, then confidence desc), then undetected, then skipped/errored
        const sorted = [...behaviors].sort((a, b) => {
          const rank = (x) => x.error_reason ? 3 : x.skipped ? 2 : x.detected ? 0 : 1;
          const ra = rank(a), rb = rank(b);
          if (ra !== rb) return ra - rb;
          const sa = a.speaker_label || '';
          const sb = b.speaker_label || '';
          if (sa !== sb) return sa.localeCompare(sb);
          return (b.confidence || 0) - (a.confidence || 0);
        });
        // Group consecutive rows by speaker to render speaker cell once per group
        let lastSpeaker = null;
        sorted.forEach(b => {
          const speakerKey = b.speaker_label || '—';
          const isNewGroup = speakerKey !== lastSpeaker;
          velmaBehaviorsTbody.appendChild(buildBehaviorRow(b, speakerToRole[b.speaker_label], isNewGroup));
          lastSpeaker = speakerKey;
        });
      }
    } else {
      velmaBehaviorsSection.style.display = 'none';
    }

    // ── Topics, grouped by speaker, with per-topic sentiment chips
    velmaTopicsBySpeaker.innerHTML = '';
    const topics = data.topics || [];
    const ts = data.topic_sentiments || [];
    if (topics.length || ts.length) {
      velmaTopicsSection.style.display = '';
      renderVelmaTopicsBySpeaker(topics, ts, speakerToRole);
    } else {
      velmaTopicsSection.style.display = 'none';
    }

    // ── Transcript: reuse the existing transcription pipeline (stt-chart + bubble list)
    // 1. Build clip_uuid → [{name, definitive}] map for behavior chip overlay (detected only)
    velmaClipBehaviorsByUuid = {};
    behaviors.forEach(b => {
      if (!b.detected) return;
      (b.evidence_clip_uuids || []).forEach(uuid => {
        if (!velmaClipBehaviorsByUuid[uuid]) velmaClipBehaviorsByUuid[uuid] = [];
        velmaClipBehaviorsByUuid[uuid].push({
          name: b.behavior_name,
          definitive: b.definitive_clip_uuid === uuid,
        });
      });
    });

    // 2. Map Velma clips → STT utterance shape. Assign consistent integer speaker indices
    //    (so left/right bubble alignment and chart colors stay stable across the call).
    const speakerOrder = {};
    let nextSpeakerIdx = 1;
    clips.forEach(c => {
      if (c.speaker_label != null && speakerOrder[c.speaker_label] == null) {
        speakerOrder[c.speaker_label] = nextSpeakerIdx++;
      }
    });
    sttUtterances = clips.map(c => ({
      // Carry through clip_uuid + role so post-render patching can label and decorate bubbles.
      clip_uuid: c.clip_uuid,
      __velma_speaker_label: c.speaker_label,
      __velma_role_name: speakerToRole[c.speaker_label],
      __velma_detection_model_results: c.detection_model_results || {},
      text: c.text,
      start_ms: c.start_ms,
      duration_ms: c.duration_ms,
      speaker: speakerOrder[c.speaker_label] != null ? speakerOrder[c.speaker_label] : 1,
      language: c.language,
      emotion: c.emotion,
      accent: c.accent,
      deepfake_score: c.deepfake_score,
    }));
    sttPartial = null;
    sttData = { utterances: sttUtterances, duration_ms: data.duration_ms };

    // 3. Render via the shared pipeline (this draws #stt-chart + #transcript-list bubbles)
    renderTranscript();

    // 4. Velma has its own per-speaker emotion chart; hide the transcription
    //    timeline that renderTranscript draws.
    const chart = document.getElementById('stt-chart');
    if (chart) { chart.innerHTML = ''; chart.classList.remove('visible'); }

    // 5. Patch the rendered bubbles: replace "Speaker N" with role name; add behavior chips.
    patchVelmaTranscriptBubbles();
  }

  function patchVelmaTranscriptBubbles() {
    const bubbles = transcriptList.querySelectorAll('.pg-transcript-utterance');
    bubbles.forEach((bEl, i) => {
      const u = sttUtterances[i];
      if (!u) return;
      // Stamp the clip_uuid on the bubble so behavior-name clicks can locate it
      if (u.clip_uuid) bEl.setAttribute('data-clip-uuid', u.clip_uuid);
      // Replace "Speaker N" with the inferred role name from participant_role_picks
      if (u.__velma_role_name) {
        const sp = bEl.querySelector('.transcript-speaker');
        if (sp) sp.textContent = u.__velma_role_name;
      }
      // Add behavior chips after the timestamp
      const clipB = velmaClipBehaviorsByUuid[u.clip_uuid] || [];
      if (clipB.length) {
        const header = bEl.querySelector('.pg-transcript-utterance-header');
        if (header) {
          const wrap = document.createElement('span');
          wrap.className = 'velma-bubble-behaviors';
          clipB.forEach(cb => {
            const chip = document.createElement('span');
            chip.className = 'velma-bubble-behavior' + (cb.definitive ? ' definitive' : '');
            chip.textContent = cb.name;
            wrap.appendChild(chip);
          });
          const time = header.querySelector('.transcript-time');
          if (time && time.nextSibling) header.insertBefore(wrap, time.nextSibling);
          else header.appendChild(wrap);
        }
      }
      // Surface detection_model_results when present (raw debug signal — per-clip
      // scores from individual detection models like Interruption, Synthetic Voice, etc.)
      const dmr = u.__velma_detection_model_results || {};
      const dmrKeys = Object.keys(dmr);
      if (dmrKeys.length) {
        const block = document.createElement('div');
        block.className = 'velma-clip-models';
        dmrKeys.forEach(k => {
          const el = document.createElement('span');
          el.className = 'velma-clip-model';
          const score = typeof dmr[k] === 'number' ? dmr[k].toFixed(2) : String(dmr[k]);
          el.innerHTML = `<span class="velma-clip-model-name">${escapeHtml(k)}</span>${escapeHtml(score)}`;
          block.appendChild(el);
        });
        bEl.appendChild(block);
      }
    });
  }

  // Jump a behavior click to its evidence clip and briefly flash the bubble
  function jumpToClip(clipUuid) {
    if (!clipUuid) return;
    const bubble = transcriptList.querySelector(`.pg-transcript-utterance[data-clip-uuid="${clipUuid}"]`);
    if (!bubble) return;
    bubble.scrollIntoView({ behavior: 'smooth', block: 'center' });
    bubble.classList.remove('velma-bubble-flash');
    void bubble.offsetWidth; // restart animation
    bubble.classList.add('velma-bubble-flash');
    setTimeout(() => bubble.classList.remove('velma-bubble-flash'), 1700);
    // Also seek audio to the clip's start so it's ready to play
    const u = sttUtterances.find(x => x.clip_uuid === clipUuid);
    if (u && resultsAudio && typeof u.start_ms === 'number') {
      try { resultsAudio.currentTime = u.start_ms / 1000; } catch {}
    }
  }

  function buildPickBadge(label, value, confidence, source, reasoning, detail) {
    const el = document.createElement('div');
    el.className = 'velma-pick';
    el.innerHTML =
      `<span class="velma-pick-label">${escapeHtml(label)}:</span>` +
      `<span class="velma-pick-value">${escapeHtml(value || '')}</span>` +
      (confidence != null ? `<span class="velma-pick-conf">${Math.round(confidence * 100)}%</span>` : '') +
      (source ? `<span class="velma-pick-source">${escapeHtml(source)}</span>` : '');
    // Show model's reasoning inline (or detail if reasoning is null) — raw API output for debugging
    const text = reasoning || detail || '';
    if (text) {
      const r = document.createElement('span');
      r.className = 'velma-pick-reasoning';
      r.textContent = text;
      el.appendChild(r);
    }
    return el;
  }

  // Per-speaker emotion pattern bar chart (one row per speaker)
  function computeSpeakerStats(clips, totalDurationMs) {
    const map = {};
    clips.forEach(c => {
      const k = c.speaker_label || '—';
      if (!map[k]) map[k] = { label: k, totalMs: 0, segments: [], langCounts: {}, accentCounts: {}, emotionCounts: {} };
      const dur = c.duration_ms || 0;
      map[k].totalMs += dur;
      map[k].segments.push({ emotion: (c.emotion || 'neutral').toLowerCase(), durationMs: dur });
      if (c.language) map[k].langCounts[c.language] = (map[k].langCounts[c.language] || 0) + 1;
      if (c.accent)   map[k].accentCounts[c.accent] = (map[k].accentCounts[c.accent] || 0) + 1;
      if (c.emotion)  map[k].emotionCounts[c.emotion] = (map[k].emotionCounts[c.emotion] || 0) + 1;
    });
    const total = totalDurationMs || Object.values(map).reduce((a, x) => a + x.totalMs, 0);
    return Object.values(map).map(s => ({
      label: s.label,
      speakingPct: total ? s.totalMs / total : 0,
      segments: s.segments,
      language: topKey(s.langCounts),
      accent: topKey(s.accentCounts),
      distinctEmotions: Object.keys(s.emotionCounts),
    }));
  }
  function topKey(counts) {
    let best = null, bestN = -1;
    for (const k of Object.keys(counts)) { if (counts[k] > bestN) { best = k; bestN = counts[k]; } }
    return best;
  }
  function buildSpeakerRow(s, roleName) {
    const tr = document.createElement('tr');
    const tdSpeaker = document.createElement('td');
    tdSpeaker.innerHTML =
      `<div class="velma-speaker-name">${escapeHtml(roleName || s.label)}</div>` +
      (roleName ? `<span class="velma-speaker-role">${escapeHtml(s.label)}</span>` : '');
    tr.appendChild(tdSpeaker);
    const tdBar = document.createElement('td');
    const bar = document.createElement('div');
    bar.className = 'velma-emotion-bar';
    const totalSegMs = s.segments.reduce((a, x) => a + x.durationMs, 0) || 1;
    s.segments.forEach(seg => {
      const seg2 = document.createElement('div');
      seg2.className = 'velma-emotion-bar-seg';
      const color = EMOTION_COLORS[seg.emotion] || '#78909c';
      seg2.style.background = color;
      seg2.style.flexBasis = ((seg.durationMs / totalSegMs) * 100).toFixed(2) + '%';
      seg2.title = `${seg.emotion} · ${(seg.durationMs / 1000).toFixed(1)}s`;
      bar.appendChild(seg2);
    });
    tdBar.appendChild(bar);
    const legend = document.createElement('div');
    legend.className = 'velma-emotion-legend';
    s.distinctEmotions.forEach((em, i) => {
      const chip = document.createElement('span');
      chip.className = 'velma-emotion-legend-chip';
      chip.style.color = EMOTION_COLORS[em.toLowerCase()] || '#78909c';
      chip.textContent = (i === 0 ? '' : ', ') + em;
      legend.appendChild(chip);
    });
    tdBar.appendChild(legend);
    tr.appendChild(tdBar);
    const tdTime = document.createElement('td');
    tdTime.textContent = Math.round(s.speakingPct * 100) + '%';
    tr.appendChild(tdTime);
    const tdLang = document.createElement('td');
    const langName = s.language ? (s.language.toUpperCase() === 'EN' ? 'English' : s.language) : '';
    const accentName = s.accent ? (ACCENT_SHORT[s.accent] || s.accent) + ' accent' : '';
    tdLang.textContent = [langName, accentName].filter(Boolean).join(', ');
    tr.appendChild(tdLang);
    return tr;
  }

  // Topics grouped by speaker — each speaker row shows their topics as
  // sentiment-colored chips. Fall back to a single "All speakers" row if
  // topic_sentiments is empty.
  function renderVelmaTopicsBySpeaker(topics, topicSentiments, speakerToRole) {
    const bySpeaker = new Map();
    topicSentiments.forEach(s => {
      const k = s.speaker_label;
      if (!bySpeaker.has(k)) bySpeaker.set(k, []);
      bySpeaker.get(k).push(s);
    });
    if (bySpeaker.size === 0) {
      // No per-speaker breakdown — render the flat topics list
      const row = document.createElement('div');
      row.className = 'velma-topics-speaker-row';
      const label = document.createElement('span');
      label.className = 'velma-topics-speaker-label';
      label.textContent = 'All speakers';
      row.appendChild(label);
      topics.forEach(t => row.appendChild(buildTopicChip(t, null)));
      velmaTopicsBySpeaker.appendChild(row);
      return;
    }
    bySpeaker.forEach((sents, speakerLabel) => {
      const row = document.createElement('div');
      row.className = 'velma-topics-speaker-row';
      const label = document.createElement('span');
      label.className = 'velma-topics-speaker-label';
      const roleName = speakerToRole[speakerLabel];
      label.innerHTML = escapeHtml(roleName || speakerLabel) +
        (roleName ? `<span class="velma-topics-speaker-label-sub">(${escapeHtml(speakerLabel)})</span>` : '');
      row.appendChild(label);
      sents.forEach(s => row.appendChild(buildTopicChip(s.topic, s)));
      velmaTopicsBySpeaker.appendChild(row);
    });
  }

  function buildTopicChip(topic, sentiment) {
    const chip = document.createElement('span');
    let kind = 'neu';
    if (sentiment && sentiment.sentiment_score > 0.1) kind = 'pos';
    else if (sentiment && sentiment.sentiment_score < -0.1) kind = 'neg';
    chip.className = 'velma-topic-chip ' + kind;
    chip.appendChild(document.createTextNode(topic));
    if (sentiment) {
      const score = document.createElement('span');
      score.className = 'velma-topic-chip-score';
      const s = Number(sentiment.sentiment_score || 0).toFixed(2);
      score.textContent = (sentiment.sentiment_score > 0 ? '+' : '') + s;
      chip.appendChild(score);
      chip.title = `${sentiment.sentiment_label} (${s})`;
    }
    return chip;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  function buildBehaviorRow(b, roleName, isNewGroup) {
    const tr = document.createElement('tr');
    tr.className = 'velma-behavior-row' +
      (b.detected ? '' : ' undetected') +
      (b.skipped ? ' skipped' : '') +
      (b.error_reason ? ' error' : '');

    // Speaker cell — only render if start of new speaker group
    const tdSpeaker = document.createElement('td');
    if (isNewGroup) {
      tdSpeaker.innerHTML =
        `<div class="velma-behavior-speaker-cell">${escapeHtml(roleName || b.speaker_label || '—')}</div>` +
        (roleName && b.speaker_label ? `<span class="velma-behavior-speaker-role">${escapeHtml(b.speaker_label)}</span>` : '');
    }
    tr.appendChild(tdSpeaker);

    // ── Behavior name + status pill (raw API: detected / skipped / error)
    const tdName = document.createElement('td');
    const name = document.createElement('span');
    name.className = 'velma-behavior-name';
    name.textContent = b.behavior_name;
    // Tooltip with the configured definition (what we asked the model to detect)
    const cfg = (velmaConfig.behaviors || []).find(x => x.behavior_uuid === b.behavior_uuid);
    if (cfg) {
      const parts = [];
      if (cfg.short_description) parts.push(cfg.short_description);
      if (cfg.detailed_description) parts.push(cfg.detailed_description);
      if (parts.length) name.title = parts.join('\n\n');
    }
    // Click target → jump to first evidence clip in the transcript
    const targetClipUuid = b.definitive_clip_uuid || (Array.isArray(b.evidence_clip_uuids) && b.evidence_clip_uuids[0]) || null;
    if (targetClipUuid) {
      name.addEventListener('click', () => jumpToClip(targetClipUuid));
    } else {
      name.classList.add('no-evidence');
    }
    tdName.appendChild(name);

    let statusText, statusKind;
    if (b.error_reason)      { statusText = 'error';        statusKind = 'error'; }
    else if (b.skipped)      { statusText = 'skipped';      statusKind = 'skipped'; }
    else if (b.detected)     { statusText = 'detected';     statusKind = 'detected'; }
    else                     { statusText = 'not detected'; statusKind = 'undetected'; }
    const pill = document.createElement('span');
    pill.className = 'velma-behavior-pill velma-behavior-pill--' + statusKind;
    pill.textContent = statusText;
    tdName.appendChild(pill);

    // Evidence clip count (raw API)
    if (Array.isArray(b.evidence_clip_uuids) && b.evidence_clip_uuids.length > 0) {
      const ev = document.createElement('span');
      ev.className = 'velma-behavior-evidence';
      ev.textContent = `Evidence: ${b.evidence_clip_uuids.length} clip${b.evidence_clip_uuids.length === 1 ? '' : 's'}`;
      if (b.definitive_clip_uuid) ev.textContent += ' (1 definitive)';
      tdName.appendChild(ev);
    }
    tr.appendChild(tdName);

    // ── Model reasoning (raw API output only — reasoning / skip_reason / error_reason)
    const tdReasoning = document.createElement('td');
    tdReasoning.className = 'velma-behavior-reasoning';
    const reasoning = b.reasoning || b.skip_reason || b.error_reason || '';
    if (reasoning) {
      tdReasoning.textContent = reasoning;
    } else {
      tdReasoning.innerHTML = '<span class="velma-behavior-reasoning-empty">No reasoning returned</span>';
    }
    tr.appendChild(tdReasoning);

    // ── Confidence (raw API value, no reinterpretation)
    const tdConf = document.createElement('td');
    tdConf.className = 'velma-behavior-confidence';
    if (b.confidence == null) {
      tdConf.textContent = '—';
    } else {
      tdConf.textContent = Math.round(b.confidence * 100) + '%';
    }
    tr.appendChild(tdConf);

    return tr;
  }

  // ── Velma config editor ────────────────────────────────────────────────────

  function newUuid() {
    // Prefer crypto.randomUUID; fall back to a v4-shaped string.
    if (crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function openVelmaConfigModal() {
    velmaConfigError.textContent = '';
    if (velmaCfgRawToggle) velmaCfgRawToggle.checked = false;
    renderVelmaEditorForm();
    renderVelmaEditorJson();
    setRawJsonEditable(false);
    velmaConfigModal.hidden = false;
    // Presets load lazily (read-only, no usage cost) and re-render when ready.
    renderVelmaPresetsList();
    loadVelmaPresets().then(renderVelmaPresetsList);
  }
  function closeVelmaConfigModal() {
    velmaConfigModal.hidden = true;
  }

  // ── Form rendering (left pane) ─────────────────────────────────────────────

  function cfgKindMeta(kind) {
    if (kind === 'conv') return { uuidField: 'conversation_type_uuid', listField: 'conversation_types' };
    if (kind === 'role') return { uuidField: 'participant_role_uuid', listField: 'participant_roles' };
    return { uuidField: 'behavior_uuid', listField: 'behaviors' };
  }

  // Any edit replaces the literal "default" with an explicit BatchConfig.
  function markCustom() {
    ensureCustomConfig();
  }

  function renderVelmaEditorForm() {
    renderVelmaConvList();
    renderVelmaRolesList();
    renderVelmaBehaviorsList();
    renderVelmaPresetsList();
    renderVelmaSttToggles();
    renderVelmaOutputToggles();
    updateBehaviorsWarning();
  }

  // The API only evaluates behaviors when the config ALSO defines at least one
  // conversation type and participant roles — otherwise it silently returns an
  // empty `behaviors` array. Warn so testers don't build a no-op config.
  function updateBehaviorsWarning() {
    if (!velmaCfgBehaviorsWarning) return;
    const cfg = (typeof velmaConfig === 'object') ? velmaConfig : {};
    const nBeh = (cfg.behaviors || []).length;
    const nConv = (cfg.conversation_types || []).length;
    const nRoles = (cfg.participant_roles || []).length;
    if (nBeh > 0 && (nConv === 0 || nRoles === 0)) {
      const missing = [];
      if (nConv === 0) missing.push('a conversation type');
      if (nRoles === 0) missing.push('participant roles');
      velmaCfgBehaviorsWarning.innerHTML =
        '⚠ Behaviors are only evaluated when the config also defines ' + missing.join(' and ') +
        '. As-is the API returns <strong>no behavior results</strong> — add ' + missing.join(' and ') +
        ' above (or use <strong>Load example</strong>).';
      velmaCfgBehaviorsWarning.style.display = '';
    } else {
      velmaCfgBehaviorsWarning.style.display = 'none';
    }
  }

  function renderVelmaConvList() {
    if (!velmaCfgConvList) return;
    velmaCfgConvList.innerHTML = '';
    (velmaConfig.conversation_types || []).forEach(c => velmaCfgConvList.appendChild(buildCfgRow('conv', c)));
  }

  function renderVelmaRolesList() {
    if (!velmaCfgRolesList) return;
    velmaCfgRolesList.innerHTML = '';
    (velmaConfig.participant_roles || []).forEach(r => velmaCfgRolesList.appendChild(buildCfgRow('role', r)));
  }

  function renderVelmaBehaviorsList() {
    if (!velmaCfgBehaviorsList) return;
    velmaCfgBehaviorsList.innerHTML = '';
    // Hand-authored behaviors only. preset:<id> strings AND preset-expanded
    // BehaviorDefs both live in the presets list above.
    (velmaConfig.behaviors || []).forEach(b => {
      if (typeof b === 'string') return;
      if (b.behavior_uuid && velmaPresetExpansions.has(b.behavior_uuid)) return;
      velmaCfgBehaviorsList.appendChild(buildCfgRow('behavior', b));
    });
  }

  // ── Behavior presets (server-defined, referenced as "preset:<identifier>") ──
  let velmaPresetsCache = null;

  function presetRef(identifier) { return 'preset:' + identifier; }

  // The expanded BehaviorDef (if any) that originated from this preset.
  function expandedPresetBehavior(identifier) {
    let foundUuid = null;
    velmaPresetExpansions.forEach((id, uuid) => { if (id === identifier) foundUuid = uuid; });
    if (!foundUuid) return null;
    return (velmaConfig.behaviors || []).find(b => typeof b === 'object' && b.behavior_uuid === foundUuid) || null;
  }

  // 'off' | 'ref' | 'expanded'
  function presetState(identifier) {
    if ((velmaConfig.behaviors || []).some(b => b === presetRef(identifier))) return 'ref';
    if (expandedPresetBehavior(identifier)) return 'expanded';
    return 'off';
  }

  function setPresetIncluded(identifier, included) {
    markCustom();
    velmaConfig.behaviors = velmaConfig.behaviors || [];
    if (included && presetState(identifier) === 'off') {
      velmaConfig.behaviors.push(presetRef(identifier));
    } else if (!included) {
      const ref = presetRef(identifier);
      const exp = expandedPresetBehavior(identifier);
      velmaConfig.behaviors = velmaConfig.behaviors.filter(b => b !== ref && b !== exp);
      if (exp) velmaPresetExpansions.delete(exp.behavior_uuid);
    }
    renderVelmaEditorForm();
    renderVelmaEditorJson();
    updateVelmaConfigSummary();
  }

  // Turn a preset:<id> reference into a full, editable BehaviorDef (catalog text
  // + a generated UUID). Reversible via collapsePreset.
  function expandPreset(p) {
    markCustom();
    velmaConfig.behaviors = velmaConfig.behaviors || [];
    const uuid = newUuid();
    const def = {
      behavior_uuid: uuid,
      name: p.name || p.identifier,
      short_description: p.short_description || '',
      detailed_description: p.detailed_description || '',
    };
    const idx = velmaConfig.behaviors.indexOf(presetRef(p.identifier));
    if (idx >= 0) velmaConfig.behaviors.splice(idx, 1, def);
    else velmaConfig.behaviors.push(def);
    velmaPresetExpansions.set(uuid, p.identifier);
    renderVelmaEditorForm();
    renderVelmaEditorJson();
    updateVelmaConfigSummary();
  }

  function collapsePreset(identifier) {
    markCustom();
    const exp = expandedPresetBehavior(identifier);
    if (exp) {
      const i = velmaConfig.behaviors.indexOf(exp);
      if (i >= 0) velmaConfig.behaviors.splice(i, 1, presetRef(identifier));
      velmaPresetExpansions.delete(exp.behavior_uuid);
    }
    renderVelmaEditorForm();
    renderVelmaEditorJson();
    updateVelmaConfigSummary();
  }

  async function loadVelmaPresets() {
    if (velmaPresetsCache) return velmaPresetsCache;
    try {
      const res = await fetch('/api/velma-2-batch/list-presets');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const body = await res.json();
      velmaPresetsCache = Array.isArray(body.presets) ? body.presets : [];
    } catch (err) {
      console.warn('Velma presets failed to load:', err);
      velmaPresetsCache = [];
    }
    return velmaPresetsCache;
  }

  function renderVelmaPresetsList() {
    if (!velmaCfgPresetsList) return;
    const presets = velmaPresetsCache;
    if (presets == null) {
      velmaCfgPresetsList.innerHTML = '<div class="velma-cfg-defn">Loading presets…</div>';
      return;
    }
    if (!presets.length) {
      velmaCfgPresetsList.innerHTML = '<div class="velma-cfg-defn">No presets available.</div>';
      return;
    }
    velmaCfgPresetsList.innerHTML = '';
    presets.forEach(p => velmaCfgPresetsList.appendChild(buildPresetRow(p)));
  }

  function buildPresetRow(p) {
    const state = presetState(p.identifier);
    const row = document.createElement('div');
    row.className = 'velma-cfg-row' + (state === 'expanded' ? ' expanded-preset expanded' : '');

    const head = document.createElement('div');
    head.className = 'velma-cfg-row-head';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.className = 'velma-cfg-row-checkbox';
    cb.checked = state !== 'off';
    cb.addEventListener('click', e => e.stopPropagation());
    cb.addEventListener('change', () => setPresetIncluded(p.identifier, cb.checked));
    head.appendChild(cb);

    const title = document.createElement('div');
    title.className = 'velma-cfg-row-title';
    const name = document.createElement('span');
    name.className = 'velma-cfg-row-name';
    name.textContent = p.name || p.identifier;
    title.appendChild(name);
    const badge = document.createElement('span');
    badge.className = 'velma-cfg-row-badge';
    badge.textContent = state === 'expanded' ? 'expanded def' : ('preset:' + p.identifier);
    title.appendChild(badge);
    const short = document.createElement('span');
    short.className = 'velma-cfg-row-short';
    short.textContent = p.short_description || '';
    title.appendChild(short);
    head.appendChild(title);

    // Expand ↔ collapse control (only when the preset is included).
    if (state === 'ref') {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'velma-cfg-preset-toggle';
      btn.textContent = 'Expand to JSON';
      btn.addEventListener('click', (e) => { e.stopPropagation(); expandPreset(p); });
      head.appendChild(btn);
    } else if (state === 'expanded') {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'velma-cfg-preset-toggle';
      btn.textContent = 'Collapse to ref';
      btn.addEventListener('click', (e) => { e.stopPropagation(); collapsePreset(p.identifier); });
      head.appendChild(btn);
    }

    if (p.detailed_description && state !== 'expanded') head.title = p.detailed_description;
    row.appendChild(head);

    // Expanded: editable BehaviorDef fields inline (the row carries .expanded).
    if (state === 'expanded') {
      const def = expandedPresetBehavior(p.identifier);
      if (def) {
        const uuid = def.behavior_uuid;
        const body = document.createElement('div');
        body.className = 'velma-cfg-row-body';
        body.appendChild(buildField('Name', 'input', def.name || '', val => { updateCfgEntryField('behavior', uuid, 'name', val); name.textContent = val || '(unnamed)'; }));
        body.appendChild(buildField('Short description', 'textarea', def.short_description || '', val => { updateCfgEntryField('behavior', uuid, 'short_description', val); short.textContent = val; }, '2.5rem'));
        body.appendChild(buildField('Detailed description', 'textarea', def.detailed_description || '', val => updateCfgEntryField('behavior', uuid, 'detailed_description', val), '6rem'));
        row.appendChild(body);
      }
    }

    return row;
  }

  function buildCfgRow(kind, entry) {
    // kind: 'conv' | 'role' | 'behavior'. Every row is a config member the tester
    // authored, so it's always editable + removable (no library / checkbox).
    const { uuidField } = cfgKindMeta(kind);
    const uuid = entry[uuidField];

    const row = document.createElement('div');
    row.className = 'velma-cfg-row';
    row.dataset.uuid = uuid;
    row.dataset.kind = kind;

    // Head: name + short + expand
    const head = document.createElement('div');
    head.className = 'velma-cfg-row-head';

    const title = document.createElement('div');
    title.className = 'velma-cfg-row-title';
    const name = document.createElement('span');
    name.className = 'velma-cfg-row-name';
    name.textContent = entry.name || '(unnamed)';
    title.appendChild(name);
    const short = document.createElement('span');
    short.className = 'velma-cfg-row-short';
    short.textContent = entry.short_description || '';
    title.appendChild(short);
    head.appendChild(title);

    const exp = document.createElement('button');
    exp.type = 'button';
    exp.className = 'velma-cfg-row-expand';
    exp.textContent = '▾';
    head.appendChild(exp);

    head.addEventListener('click', () => {
      row.classList.toggle('expanded');
      exp.textContent = row.classList.contains('expanded') ? '▴' : '▾';
    });

    row.appendChild(head);

    // Body: editable fields
    const body = document.createElement('div');
    body.className = 'velma-cfg-row-body';
    body.appendChild(buildField('Name', 'input', entry.name || '', val => {
      updateCfgEntryField(kind, uuid, 'name', val); name.textContent = val || '(unnamed)';
    }));
    body.appendChild(buildField('Short description', 'textarea', entry.short_description || '', val => {
      updateCfgEntryField(kind, uuid, 'short_description', val); short.textContent = val;
    }, '2.5rem'));
    body.appendChild(buildField('Detailed description', 'textarea', entry.detailed_description || '', val => updateCfgEntryField(kind, uuid, 'detailed_description', val), '6rem'));
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'velma-cfg-row-remove';
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => removeCustomCfgEntry(kind, uuid));
    body.appendChild(remove);
    row.appendChild(body);

    return row;
  }

  function buildField(label, type, value, onChange, minHeight) {
    const wrap = document.createElement('label');
    wrap.className = 'velma-cfg-field';
    const lab = document.createElement('span');
    lab.className = 'velma-cfg-field-label';
    lab.textContent = label;
    wrap.appendChild(lab);
    const el = document.createElement(type === 'textarea' ? 'textarea' : 'input');
    el.className = type === 'textarea' ? 'velma-cfg-textarea' : 'velma-cfg-input';
    if (type !== 'textarea') el.type = 'text';
    if (minHeight) el.style.minHeight = minHeight;
    el.value = value;
    el.addEventListener('input', () => onChange(el.value));
    wrap.appendChild(el);
    return wrap;
  }

  function renderVelmaSttToggles() {
    // In the "default" state, preview the documented STTOptions defaults so the
    // toggles aren't misleadingly all-off; they materialize on first change.
    const s = (typeof velmaConfig === 'object' && velmaConfig.stt) ? velmaConfig.stt : buildCustomConfigSeed().stt;
    if (velmaCfgSttDiar)     velmaCfgSttDiar.checked     = !!s.speaker_diarization;
    if (velmaCfgSttEmot)     velmaCfgSttEmot.checked     = !!s.emotion_signal;
    if (velmaCfgSttAcc)      velmaCfgSttAcc.checked      = !!s.accent_signal;
    if (velmaCfgSttDeepfake) velmaCfgSttDeepfake.checked = !!s.deepfake_signal;
    if (velmaCfgSttPii)      velmaCfgSttPii.checked      = !!s.pii_phi_tagging;
    if (velmaCfgLanguage)    velmaCfgLanguage.value      = (s.language == null ? '' : s.language);
  }

  function renderVelmaOutputToggles() {
    const c = (typeof velmaConfig === 'object') ? velmaConfig : buildCustomConfigSeed();
    // produce_* default to true per spec when unset.
    if (velmaCfgProdTopics)     velmaCfgProdTopics.checked     = c.produce_topics !== false;
    if (velmaCfgProdSentiments) velmaCfgProdSentiments.checked = c.produce_topic_sentiments !== false;
    if (velmaCfgProdSummary)    velmaCfgProdSummary.checked    = c.produce_summary !== false;
  }

  // ── Form → velmaConfig mutations ───────────────────────────────────────────

  function updateCfgEntryField(kind, uuid, field, value) {
    markCustom();
    const { uuidField, listField } = cfgKindMeta(kind);
    const entry = (velmaConfig[listField] || []).find(x => typeof x === 'object' && x[uuidField] === uuid);
    if (entry) {
      entry[field] = value;
      updateVelmaConfigSummary();
      renderVelmaEditorJson();
    }
  }

  function removeCustomCfgEntry(kind, uuid) {
    markCustom();
    const { uuidField, listField } = cfgKindMeta(kind);
    velmaConfig[listField] = (velmaConfig[listField] || [])
      .filter(x => typeof x === 'string' || x[uuidField] !== uuid);
    renderVelmaEditorForm();
    renderVelmaEditorJson();
    updateVelmaConfigSummary();
  }

  function addCustomCfgEntry(kind) {
    markCustom();
    const { listField } = cfgKindMeta(kind);
    velmaConfig[listField] = velmaConfig[listField] || [];
    const uuid = newUuid();
    if (kind === 'conv') {
      velmaConfig[listField].push({ conversation_type_uuid: uuid, name: 'New conversation type', short_description: '', detailed_description: '' });
    } else if (kind === 'role') {
      velmaConfig[listField].push({ participant_role_uuid: uuid, name: 'New role', short_description: '', detailed_description: '' });
    } else {
      velmaConfig[listField].push({ behavior_uuid: uuid, name: 'New behavior', short_description: '', detailed_description: '' });
    }
    renderVelmaEditorForm();
    renderVelmaEditorJson();
    updateVelmaConfigSummary();
    // Auto-expand the newly added row
    const listEl = kind === 'conv' ? velmaCfgConvList : (kind === 'role' ? velmaCfgRolesList : velmaCfgBehaviorsList);
    const newRow = listEl && listEl.lastElementChild;
    if (newRow) {
      newRow.classList.add('expanded');
      const exp = newRow.querySelector('.velma-cfg-row-expand');
      if (exp) exp.textContent = '▴';
      newRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      const firstInput = newRow.querySelector('input[type="text"]');
      if (firstInput) firstInput.focus();
    }
  }

  // Opt-in example loader for conversation types / roles (NOT defaults).
  function loadCfgExample(kind) {
    markCustom();
    const { uuidField, listField } = cfgKindMeta(kind);
    const examples = kind === 'conv' ? VELMA_EXAMPLE_CONV_TYPES : VELMA_EXAMPLE_ROLES;
    velmaConfig[listField] = velmaConfig[listField] || [];
    examples.forEach(ex => {
      if (!velmaConfig[listField].some(x => typeof x === 'object' && x[uuidField] === ex[uuidField])) {
        velmaConfig[listField].push(JSON.parse(JSON.stringify(ex)));
      }
    });
    renderVelmaEditorForm();
    renderVelmaEditorJson();
    updateVelmaConfigSummary();
  }

  // ── JSON pane (right) ──────────────────────────────────────────────────────

  function renderVelmaEditorJson() {
    if (!velmaConfigTextarea) return;
    if (velmaCfgRawToggle && velmaCfgRawToggle.checked) return; // user is editing, don't clobber
    // The pane always shows the exact `config` value that will be sent — the
    // literal "default" string, or the explicit BatchConfig object.
    velmaConfigTextarea.value = JSON.stringify(velmaConfig, null, 2);
  }

  function setRawJsonEditable(editable) {
    if (!velmaConfigTextarea) return;
    velmaConfigTextarea.readOnly = !editable;
    // Disable form interactions when raw editing is on
    const form = document.getElementById('velma-config-form');
    if (form) form.style.opacity = editable ? '0.45' : '';
    if (form) form.style.pointerEvents = editable ? 'none' : '';
  }

  // ── Wiring ────────────────────────────────────────────────────────────────

  if (velmaConfigBtn) velmaConfigBtn.addEventListener('click', openVelmaConfigModal);
  if (velmaSetupBtn) velmaSetupBtn.addEventListener('click', openVelmaConfigModal);
  if (btnEditConfigVelma) btnEditConfigVelma.addEventListener('click', openVelmaConfigModal);
  if (velmaConfigModalClose) velmaConfigModalClose.addEventListener('click', closeVelmaConfigModal);
  if (velmaConfigModal) {
    closeOnBackdrop(velmaConfigModal, closeVelmaConfigModal);
  }

  if (velmaCfgAddConvBtn) velmaCfgAddConvBtn.addEventListener('click', () => addCustomCfgEntry('conv'));
  if (velmaCfgAddRoleBtn) velmaCfgAddRoleBtn.addEventListener('click', () => addCustomCfgEntry('role'));
  if (velmaCfgAddBehaviorBtn) velmaCfgAddBehaviorBtn.addEventListener('click', () => addCustomCfgEntry('behavior'));
  if (velmaCfgConvExampleBtn) velmaCfgConvExampleBtn.addEventListener('click', () => loadCfgExample('conv'));
  if (velmaCfgRolesExampleBtn) velmaCfgRolesExampleBtn.addEventListener('click', () => loadCfgExample('role'));

  // STT signal toggles (5 booleans on stt).
  [
    [velmaCfgSttDiar, 'speaker_diarization'],
    [velmaCfgSttEmot, 'emotion_signal'],
    [velmaCfgSttAcc, 'accent_signal'],
    [velmaCfgSttDeepfake, 'deepfake_signal'],
    [velmaCfgSttPii, 'pii_phi_tagging'],
  ].forEach(([cb, field]) => {
    if (!cb) return;
    cb.addEventListener('change', () => {
      markCustom();
      velmaConfig.stt = velmaConfig.stt || {};
      velmaConfig.stt[field] = cb.checked;
      renderVelmaEditorJson();
    });
  });

  // Optional STT language (blank = auto-detect → omit).
  if (velmaCfgLanguage) {
    velmaCfgLanguage.addEventListener('input', () => {
      markCustom();
      velmaConfig.stt = velmaConfig.stt || {};
      const v = velmaCfgLanguage.value.trim();
      if (v) velmaConfig.stt.language = v;
      else delete velmaConfig.stt.language;
      renderVelmaEditorJson();
    });
  }

  // Output toggles (produce_*).
  [
    [velmaCfgProdTopics, 'produce_topics'],
    [velmaCfgProdSentiments, 'produce_topic_sentiments'],
    [velmaCfgProdSummary, 'produce_summary'],
  ].forEach(([cb, field]) => {
    if (!cb) return;
    cb.addEventListener('change', () => {
      markCustom();
      velmaConfig[field] = cb.checked;
      renderVelmaEditorJson();
    });
  });

  if (velmaCfgRawToggle) {
    velmaCfgRawToggle.addEventListener('change', () => {
      setRawJsonEditable(velmaCfgRawToggle.checked);
      if (velmaCfgRawToggle.checked) {
        velmaConfigTextarea.value = JSON.stringify(velmaConfig, null, 2);
        velmaConfigTextarea.focus();
      } else {
        // Try to parse current textarea; if valid, adopt it
        try {
          const parsed = JSON.parse(velmaConfigTextarea.value);
          if (parsed === 'default' || (parsed && typeof parsed === 'object')) velmaConfig = parsed;
          velmaConfigError.textContent = '';
        } catch (e) {
          velmaConfigError.textContent = 'JSON didn\'t parse — discarded raw edits.';
        }
        renderVelmaEditorForm();
        renderVelmaEditorJson();
        updateVelmaConfigSummary();
      }
    });
  }

  if (velmaConfigTextarea) {
    velmaConfigTextarea.addEventListener('input', () => {
      if (!velmaCfgRawToggle || !velmaCfgRawToggle.checked) return;
      try {
        const parsed = JSON.parse(velmaConfigTextarea.value);
        if (parsed === 'default' || (parsed && typeof parsed === 'object')) {
          velmaConfig = parsed;
          velmaConfigError.textContent = '';
          updateVelmaConfigSummary();
        }
      } catch (err) {
        velmaConfigError.textContent = 'Invalid JSON: ' + err.message;
      }
    });
  }

  if (velmaConfigApplyBtn) {
    velmaConfigApplyBtn.addEventListener('click', () => {
      // If user is in raw mode, parse once more; otherwise velmaConfig is already up to date.
      if (velmaCfgRawToggle && velmaCfgRawToggle.checked) {
        try {
          const parsed = JSON.parse(velmaConfigTextarea.value);
          if (parsed !== 'default' && (!parsed || typeof parsed !== 'object')) throw new Error('Config must be a JSON object or the string "default"');
          velmaConfig = parsed;
          velmaConfigError.textContent = '';
        } catch (err) {
          velmaConfigError.textContent = 'Invalid JSON: ' + err.message;
          return;
        }
      }
      updateVelmaConfigSummary();
      closeVelmaConfigModal();
    });
  }
  if (velmaConfigResetBtn) {
    velmaConfigResetBtn.addEventListener('click', () => {
      velmaConfig = buildDefaultVelmaConfig();
      velmaPresetExpansions.clear();
      velmaConfigError.textContent = '';
      if (velmaCfgRawToggle) velmaCfgRawToggle.checked = false;
      setRawJsonEditable(false);
      renderVelmaEditorForm();
      renderVelmaEditorJson();
      updateVelmaConfigSummary();
    });
  }

  function renderVelmaStats(data, meta) {
    const clips = data.clips || [];
    const behaviors = data.behaviors || [];
    const detected = behaviors.filter(b => b.detected).length;
    const skipped = behaviors.filter(b => b.skipped).length;
    const errored = behaviors.filter(b => b.error_reason).length;
    const langs = new Set(clips.map(c => c.language).filter(Boolean));
    const accents = new Set(clips.map(c => c.accent).filter(Boolean));
    const speakers = new Set(clips.map(c => c.speaker_label).filter(Boolean));
    const rows = [
      ['Audio duration', ((data.duration_ms || 0) / 1000).toFixed(1) + ' s'],
      ['Clips', clips.length],
      ['Speakers', speakers.size],
      ['Languages', Array.from(langs).join(', ') || '—'],
      ['Accents', Array.from(accents).join(', ') || '—'],
      ['Behaviors detected', `${detected} / ${behaviors.length}`],
      ['Behaviors skipped', skipped],
      ['Behaviors errored', errored],
      ['Topics', (data.topics || []).length],
      ['Topic sentiments', (data.topic_sentiments || []).length],
      ['Server processing', meta && meta.processingMs ? (meta.processingMs / 1000).toFixed(1) + ' s' : '—'],
      ['Response size', meta && meta.responseSize ? Math.round(meta.responseSize / 1024) + ' KB' : '—'],
      ['HTTP', meta && meta.httpStatus ? meta.httpStatus + ' ' + (meta.httpStatusText || '') : '—'],
    ];
    return statsCardsHtml([
      { group: 'General Statistics', rows: rows.slice(0, 10) },
      { group: 'Request', rows: rows.slice(10) },
    ]);
  }

  // ── URL Routing ──────────────────────────────────────────────────────────
  window.addEventListener('popstate', (e) => {
    const mode = (e.state && e.state.mode) || getModeFromPath();
    switchMode(mode, false);
  });

  function getModeFromPath() {
    const path = location.pathname.replace(/\/$/, '');
    if (path === '/deepfake') return 'deepfake';
    if (path === '/redaction') return 'redaction';
    if (path === '/music') return 'music';
    if (path === '/ai-music') return 'aimusic';
    if (path === '/language') return 'language';
    if (path === '/transcription') return 'transcription';
    // Velma is the released headline model and the default landing mode for '/'.
    return 'velma';
  }

  // ── Scrollbar: show only while scrolling ──────────────────────────────
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    document.documentElement.classList.add('is-scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => document.documentElement.classList.remove('is-scrolling'), 1200);
  }, { passive: true });

  // ── Rate limit display (plate quota meter) ───────────────────────────
  let quotaRemaining = null;
  let quotaLimit = null;

  function applyQuotaToPlate() {
    if (quotaRemaining == null) return;
    if (plateQuotaDefault) plateQuotaDefault.textContent = quotaRemaining + ' / ' + quotaLimit;
    if (plateQuotaLow) {
      plateQuotaLow.innerHTML = '<span class="pg-upload-meta-danger">' + quotaRemaining + '</span> / ' + quotaLimit;
    }
    // Only flip between the idle-ish states; never interrupt an active flow.
    const st = uploadPlate ? uploadPlate.dataset.state : 'initial';
    if (st === 'initial' || st === 'low-quota' || st === 'exhausted') {
      setPlateState('initial'); // setPlateState normalizes to low-quota/exhausted
    }
  }

  function updateRateLimit() {
    fetch('/api/usage').then(r => r.json()).then(d => {
      quotaRemaining = d.remaining;
      quotaLimit = d.limit;
      applyQuotaToPlate();
    }).catch(() => {});
  }
  updateRateLimit();

  // ── Init ────────────────────────────────────────────────────────────────
  // Wire the design chrome once, then let switchMode drive everything.
  initPlateChrome();
  initPlayerController();
  initThemeToggle();

  const initMode = getModeFromPath();
  switchMode(initMode, false);

  // Replace initial state so back button works
  history.replaceState({ mode: initMode }, '', MODES[initMode].path + location.search);
})();
