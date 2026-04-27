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
  const DEMO_REDACTION_DATA = {"filename":"call_center_conversation.mp3","text":"Thank you for calling Green Valley Health member services. This is <pii:firstname></pii:firstname> speaking on a recorded line. Can I confirm I'm speaking with <pii:firstname></pii:firstname> <pii:lastname></pii:lastname>, born <pii:date_of_birth></pii:date_of_birth>, and living at <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>? Yes, this is <pii:firstname></pii:firstname> <pii:middlename></pii:middlename> <pii:lastname></pii:lastname>. The last 4 of my Social Security number are <pii:ssn></pii:ssn>, and my member ID is <phi></phi>. Thank you, <pii:prefix_suffix></pii:prefix_suffix> <pii:lastname></pii:lastname>. For verification, can you confirm the phone number and email we have on file: <pii:phone></pii:phone>, and <pii:email></pii:email>? Yes, that's right, although my new callback number is <pii:phone></pii:phone>, and my employer is <pii:employer></pii:employer> at <pii:workplace_address></pii:workplace_address>. I see your plan is under policy number <pii:policy_number></pii:policy_number>. And the primary care physician listed is <pii:prefix_suffix></pii:prefix_suffix> <pii:firstname></pii:firstname> <pii:lastname></pii:lastname> at Buckeye Family Clinic, <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>. That's correct. I'm calling about a claim for my <phi></phi> from <phi></phi>, after I <pii:insurance_claim></pii:insurance_claim>. The diagnosis code on my paperwork says <phi></phi>, and the imaging center was <phi></phi>. I found that claim. It shows service date <phi></phi>, account number <pii:claim_number></pii:claim_number>, billed amount <pii:transaction></pii:transaction>, and it references your prior authorization number <pii:claim_number></pii:claim_number>. I also had a prescription denied. It was for <phi></phi>, prescribed by <pii:prefix_suffix></pii:prefix_suffix> <pii:firstname></pii:firstname> <pii:lastname></pii:lastname> for <phi></phi>, and my pharmacy is CVS number 11472, <pii:address></pii:address>, <pii:address></pii:address>. I can see that medication request. To verify, your emergency contact is <pii:firstname></pii:firstname> <pii:lastname></pii:lastname>, <pii:emergency_contact></pii:emergency_contact>, at <pii:phone></pii:phone>, and your preferred mailing address is still <pii:mailing_address></pii:mailing_address>? Yes, and my wife's date of birth is <pii:date_of_birth></pii:date_of_birth>. Also, the hospital can fax records to my attorney, <pii:firstname></pii:firstname> <pii:middleinitial></pii:middleinitial> <pii:lastname></pii:lastname>, at <pii:phone></pii:phone>, because this relates to a workplace injury claim. Understood. I also see notes from your recent visit indicating <phi></phi>, <phi></phi>, and an <phi></phi>. The lab order was submitted under requisition number <phi></phi> from St. Anne's Outpatient Center. Thanks. Please send the appeal form to <pii:email></pii:email>, and mail a copy to <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>. If you need payment for the balance, my HSA card ending in <pii:bank_account></pii:bank_account> is available.","duration_ms":202920,"utterances":[{"utterance_uuid":"f74ac92e-3979-4c34-ae60-9d9de964cde3","text":"Thank you for calling Green Valley Health member services. This is <pii:firstname></pii:firstname> speaking on a recorded line. Can I confirm I'm speaking with <pii:firstname></pii:firstname> <pii:lastname></pii:lastname>, born <pii:date_of_birth></pii:date_of_birth>, and living at <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>?","start_ms":300,"duration_ms":17340,"speaker":1,"language":"en","words":[{"text":"Thank","start_ms":300,"duration_ms":180},{"text":"you","start_ms":480,"duration_ms":120},{"text":"for","start_ms":660,"duration_ms":60},{"text":"calling","start_ms":840,"duration_ms":240},{"text":"Green","start_ms":1320,"duration_ms":60},{"text":"Valley","start_ms":1560,"duration_ms":240},{"text":"Health","start_ms":1860,"duration_ms":180},{"text":"member","start_ms":2280,"duration_ms":60},{"text":"services.","start_ms":2580,"duration_ms":480},{"text":"This","start_ms":3360,"duration_ms":60},{"text":"is","start_ms":3480,"duration_ms":60},{"text":"","start_ms":3720,"duration_ms":300},{"text":"speaking","start_ms":4080,"duration_ms":240},{"text":"on","start_ms":4320,"duration_ms":60},{"text":"a","start_ms":4440,"duration_ms":60},{"text":"recorded","start_ms":4560,"duration_ms":300},{"text":"line.","start_ms":5100,"duration_ms":300},{"text":"Can","start_ms":6120,"duration_ms":60},{"text":"I","start_ms":6240,"duration_ms":60},{"text":"confirm","start_ms":6360,"duration_ms":180},{"text":"I'm","start_ms":6720,"duration_ms":180},{"text":"speaking","start_ms":6960,"duration_ms":180},{"text":"with","start_ms":7140,"duration_ms":60},{"text":"","start_ms":7500,"duration_ms":60},{"text":"","start_ms":7860,"duration_ms":360},{"text":"born","start_ms":8580,"duration_ms":60},{"text":"","start_ms":8880,"duration_ms":60},{"text":"","start_ms":9240,"duration_ms":480},{"text":"","start_ms":9780,"duration_ms":960},{"text":"and","start_ms":10980,"duration_ms":60},{"text":"living","start_ms":11100,"duration_ms":180},{"text":"at","start_ms":11340,"duration_ms":60},{"text":"","start_ms":11640,"duration_ms":780},{"text":"","start_ms":12840,"duration_ms":240},{"text":"","start_ms":13140,"duration_ms":180},{"text":"","start_ms":13440,"duration_ms":420},{"text":"","start_ms":14100,"duration_ms":180},{"text":"","start_ms":14460,"duration_ms":480},{"text":"","start_ms":15240,"duration_ms":300},{"text":"","start_ms":15660,"duration_ms":420},{"text":"","start_ms":16500,"duration_ms":1140}]},{"utterance_uuid":"17420dac-9294-46d7-b3bf-d3a431ef9f8e","text":"Yes, this is <pii:firstname></pii:firstname> <pii:middlename></pii:middlename> <pii:lastname></pii:lastname>. The last 4 of my Social Security number are <pii:ssn></pii:ssn>, and my member ID is <phi></phi>.","start_ms":18300,"duration_ms":13320,"speaker":2,"language":"en","words":[{"text":"Yes,","start_ms":18300,"duration_ms":300},{"text":"this","start_ms":19500,"duration_ms":60},{"text":"is","start_ms":19620,"duration_ms":60},{"text":"","start_ms":20040,"duration_ms":60},{"text":"","start_ms":20580,"duration_ms":60},{"text":"","start_ms":20940,"duration_ms":300},{"text":"The","start_ms":21720,"duration_ms":60},{"text":"last","start_ms":21900,"duration_ms":60},{"text":"4","start_ms":22380,"duration_ms":60},{"text":"of","start_ms":22500,"duration_ms":60},{"text":"my","start_ms":22620,"duration_ms":60},{"text":"Social","start_ms":22920,"duration_ms":60},{"text":"Security","start_ms":23220,"duration_ms":300},{"text":"number","start_ms":23700,"duration_ms":60},{"text":"are","start_ms":24000,"duration_ms":60},{"text":"","start_ms":24360,"duration_ms":1260},{"text":"and","start_ms":25920,"duration_ms":60},{"text":"my","start_ms":26040,"duration_ms":60},{"text":"member","start_ms":26280,"duration_ms":60},{"text":"ID","start_ms":26640,"duration_ms":240},{"text":"is","start_ms":26940,"duration_ms":60},{"text":"","start_ms":27360,"duration_ms":4260}]},{"utterance_uuid":"863ab9c9-e2e2-4c51-b36d-37a7cf68f4e6","text":"Thank you, <pii:prefix_suffix></pii:prefix_suffix> <pii:lastname></pii:lastname>. For verification, can you confirm the phone number and email we have on file: <pii:phone></pii:phone>, and <pii:email></pii:email>?","start_ms":32100,"duration_ms":15300,"speaker":1,"language":"en","words":[{"text":"Thank","start_ms":32100,"duration_ms":120},{"text":"you,","start_ms":32280,"duration_ms":240},{"text":"","start_ms":32760,"duration_ms":60},{"text":"","start_ms":33060,"duration_ms":360},{"text":"For","start_ms":34200,"duration_ms":60},{"text":"verification,","start_ms":34320,"duration_ms":720},{"text":"can","start_ms":35160,"duration_ms":60},{"text":"you","start_ms":35220,"duration_ms":180},{"text":"confirm","start_ms":35460,"duration_ms":240},{"text":"the","start_ms":35820,"duration_ms":60},{"text":"phone","start_ms":36060,"duration_ms":180},{"text":"number","start_ms":36300,"duration_ms":60},{"text":"and","start_ms":36660,"duration_ms":60},{"text":"email","start_ms":36960,"duration_ms":240},{"text":"we","start_ms":37260,"duration_ms":60},{"text":"have","start_ms":37440,"duration_ms":60},{"text":"on","start_ms":37620,"duration_ms":60},{"text":"file:","start_ms":37980,"duration_ms":420},{"text":"","start_ms":39120,"duration_ms":4140},{"text":"and","start_ms":43680,"duration_ms":60},{"text":"","start_ms":43980,"duration_ms":3420}]},{"utterance_uuid":"dfb1b2ac-3181-4dad-b905-b5010e7368ce","text":"Yes, that's right, although my new callback number is <pii:phone></pii:phone>, and my employer is <pii:employer></pii:employer> at <pii:workplace_address></pii:workplace_address>.","start_ms":47700,"duration_ms":12240,"speaker":2,"language":"en","words":[{"text":"Yes,","start_ms":47700,"duration_ms":240},{"text":"that'sright,","start_ms":48120,"duration_ms":600},{"text":"although","start_ms":49020,"duration_ms":120},{"text":"my","start_ms":49260,"duration_ms":60},{"text":"new","start_ms":49440,"duration_ms":60},{"text":"callback","start_ms":49620,"duration_ms":300},{"text":"number","start_ms":50100,"duration_ms":60},{"text":"is","start_ms":50340,"duration_ms":60},{"text":"","start_ms":50700,"duration_ms":3300},{"text":"and","start_ms":54120,"duration_ms":60},{"text":"my","start_ms":54240,"duration_ms":60},{"text":"employer","start_ms":54360,"duration_ms":300},{"text":"is","start_ms":54780,"duration_ms":60},{"text":"","start_ms":55140,"duration_ms":300},{"text":"","start_ms":55620,"duration_ms":360},{"text":"","start_ms":56160,"duration_ms":60},{"text":"at","start_ms":56820,"duration_ms":60},{"text":"","start_ms":57000,"duration_ms":720},{"text":"","start_ms":57900,"duration_ms":240},{"text":"","start_ms":58260,"duration_ms":300},{"text":"","start_ms":59160,"duration_ms":300},{"text":"","start_ms":59580,"duration_ms":360}]},{"utterance_uuid":"5b16a23c-d4da-492c-bb0b-11d2b9ad1cf6","text":"I see your plan is under policy number <pii:policy_number></pii:policy_number>. And the primary care physician listed is <pii:prefix_suffix></pii:prefix_suffix> <pii:firstname></pii:firstname> <pii:lastname></pii:lastname> at Buckeye Family Clinic, <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>.","start_ms":60600,"duration_ms":17820,"speaker":1,"language":"en","words":[{"text":"I","start_ms":60600,"duration_ms":60},{"text":"see","start_ms":60720,"duration_ms":120},{"text":"your","start_ms":60900,"duration_ms":120},{"text":"plan","start_ms":61140,"duration_ms":60},{"text":"is","start_ms":61260,"duration_ms":60},{"text":"under","start_ms":61440,"duration_ms":60},{"text":"policy","start_ms":61860,"duration_ms":240},{"text":"number","start_ms":62220,"duration_ms":60},{"text":"","start_ms":62700,"duration_ms":4680},{"text":"And","start_ms":68220,"duration_ms":60},{"text":"the","start_ms":68340,"duration_ms":60},{"text":"primary","start_ms":68520,"duration_ms":300},{"text":"care","start_ms":68940,"duration_ms":60},{"text":"physician","start_ms":69120,"duration_ms":240},{"text":"listed","start_ms":69600,"duration_ms":240},{"text":"is","start_ms":69900,"duration_ms":60},{"text":"","start_ms":70200,"duration_ms":60},{"text":"","start_ms":70620,"duration_ms":300},{"text":"","start_ms":71040,"duration_ms":360},{"text":"at","start_ms":71760,"duration_ms":60},{"text":"Buckeye","start_ms":72060,"duration_ms":300},{"text":"Family","start_ms":72480,"duration_ms":180},{"text":"Clinic,","start_ms":72720,"duration_ms":360},{"text":"","start_ms":74100,"duration_ms":360},{"text":"","start_ms":74700,"duration_ms":60},{"text":"","start_ms":75000,"duration_ms":180},{"text":"","start_ms":75240,"duration_ms":300},{"text":"","start_ms":76020,"duration_ms":360},{"text":"","start_ms":76500,"duration_ms":420},{"text":"","start_ms":77280,"duration_ms":1140}]},{"utterance_uuid":"7d601d0f-36d8-40cd-9ec4-503ac3564fdd","text":"That's correct. I'm calling about a claim for my <phi></phi> from <phi></phi>, after I <pii:insurance_claim></pii:insurance_claim>. The diagnosis code on my paperwork says <phi></phi>, and the imaging center was <phi></phi>.","start_ms":78720,"duration_ms":15060,"speaker":2,"language":"en","words":[{"text":"That's","start_ms":78720,"duration_ms":120},{"text":"correct.","start_ms":78960,"duration_ms":360},{"text":"I'm","start_ms":79620,"duration_ms":180},{"text":"calling","start_ms":79860,"duration_ms":180},{"text":"about","start_ms":80100,"duration_ms":60},{"text":"a","start_ms":80400,"duration_ms":60},{"text":"claim","start_ms":80580,"duration_ms":180},{"text":"for","start_ms":80820,"duration_ms":60},{"text":"my","start_ms":80940,"duration_ms":60},{"text":"","start_ms":81300,"duration_ms":360},{"text":"from","start_ms":81720,"duration_ms":60},{"text":"","start_ms":82020,"duration_ms":60},{"text":"","start_ms":82380,"duration_ms":240},{"text":"","start_ms":82680,"duration_ms":1020},{"text":"after","start_ms":83940,"duration_ms":60},{"text":"I","start_ms":84180,"duration_ms":60},{"text":"","start_ms":84360,"duration_ms":240},{"text":"","start_ms":84660,"duration_ms":60},{"text":"","start_ms":84840,"duration_ms":120},{"text":"","start_ms":85080,"duration_ms":60},{"text":"","start_ms":85440,"duration_ms":240},{"text":"","start_ms":85800,"duration_ms":600},{"text":"The","start_ms":86940,"duration_ms":60},{"text":"diagnosis","start_ms":87120,"duration_ms":540},{"text":"code","start_ms":87840,"duration_ms":120},{"text":"on","start_ms":88020,"duration_ms":60},{"text":"my","start_ms":88140,"duration_ms":60},{"text":"paperwork","start_ms":88260,"duration_ms":360},{"text":"says","start_ms":88800,"duration_ms":120},{"text":"","start_ms":89160,"duration_ms":1620},{"text":"and","start_ms":91080,"duration_ms":60},{"text":"the","start_ms":91200,"duration_ms":60},{"text":"imaging","start_ms":91260,"duration_ms":300},{"text":"center","start_ms":91740,"duration_ms":180},{"text":"was","start_ms":91980,"duration_ms":60},{"text":"","start_ms":92220,"duration_ms":420},{"text":"","start_ms":92820,"duration_ms":480},{"text":"","start_ms":93420,"duration_ms":360}]},{"utterance_uuid":"892edd4b-198c-46c0-a65b-f5a5b933852b","text":"I found that claim. It shows service date <phi></phi>, account number <pii:claim_number></pii:claim_number>, billed amount <pii:transaction></pii:transaction>, and it references your prior authorization number <pii:claim_number></pii:claim_number>.","start_ms":94200,"duration_ms":19380,"speaker":1,"language":"en","words":[{"text":"I","start_ms":94200,"duration_ms":60},{"text":"found","start_ms":94380,"duration_ms":60},{"text":"that","start_ms":94680,"duration_ms":60},{"text":"claim.","start_ms":94980,"duration_ms":540},{"text":"It","start_ms":95820,"duration_ms":60},{"text":"shows","start_ms":96000,"duration_ms":240},{"text":"service","start_ms":96420,"duration_ms":60},{"text":"date","start_ms":96840,"duration_ms":300},{"text":"","start_ms":97500,"duration_ms":3120},{"text":"account","start_ms":101040,"duration_ms":240},{"text":"number","start_ms":101340,"duration_ms":60},{"text":"","start_ms":101820,"duration_ms":3360},{"text":"billed","start_ms":105600,"duration_ms":180},{"text":"amount","start_ms":105840,"duration_ms":240},{"text":"","start_ms":106260,"duration_ms":1800},{"text":"and","start_ms":108420,"duration_ms":60},{"text":"it","start_ms":108540,"duration_ms":60},{"text":"references","start_ms":108660,"duration_ms":420},{"text":"your","start_ms":109080,"duration_ms":180},{"text":"prior","start_ms":109440,"duration_ms":180},{"text":"authorization","start_ms":109740,"duration_ms":480},{"text":"number","start_ms":110340,"duration_ms":60},{"text":"","start_ms":110820,"duration_ms":2760}]},{"utterance_uuid":"0cf5c5e0-ebe5-4941-8784-ae09b005d9f8","text":"I also had a prescription denied. It was for <phi></phi>, prescribed by <pii:prefix_suffix></pii:prefix_suffix> <pii:firstname></pii:firstname> <pii:lastname></pii:lastname> for <phi></phi>, and my pharmacy is CVS number 11472, <pii:address></pii:address>, <pii:address></pii:address>.","start_ms":114060,"duration_ms":16440,"speaker":2,"language":"en","words":[{"text":"I","start_ms":114060,"duration_ms":60},{"text":"also","start_ms":114180,"duration_ms":60},{"text":"had","start_ms":114480,"duration_ms":60},{"text":"a","start_ms":114660,"duration_ms":60},{"text":"prescription","start_ms":114840,"duration_ms":240},{"text":"denied.","start_ms":115560,"duration_ms":540},{"text":"It","start_ms":116760,"duration_ms":60},{"text":"was","start_ms":116820,"duration_ms":60},{"text":"for","start_ms":117000,"duration_ms":60},{"text":"","start_ms":117360,"duration_ms":660},{"text":"","start_ms":118260,"duration_ms":420},{"text":"","start_ms":118740,"duration_ms":300},{"text":"prescribed","start_ms":119820,"duration_ms":360},{"text":"by","start_ms":120240,"duration_ms":60},{"text":"","start_ms":120600,"duration_ms":60},{"text":"","start_ms":121080,"duration_ms":300},{"text":"","start_ms":121560,"duration_ms":300},{"text":"for","start_ms":121980,"duration_ms":60},{"text":"","start_ms":122220,"duration_ms":180},{"text":"","start_ms":122520,"duration_ms":300},{"text":"and","start_ms":123300,"duration_ms":60},{"text":"my","start_ms":123420,"duration_ms":60},{"text":"pharmacy","start_ms":123600,"duration_ms":420},{"text":"is","start_ms":124080,"duration_ms":60},{"text":"CVS","start_ms":124320,"duration_ms":420},{"text":"number","start_ms":124920,"duration_ms":60},{"text":"11472,","start_ms":125280,"duration_ms":1860},{"text":"","start_ms":127320,"duration_ms":840},{"text":"","start_ms":128460,"duration_ms":60},{"text":"","start_ms":128760,"duration_ms":60},{"text":"","start_ms":129120,"duration_ms":300},{"text":"","start_ms":129660,"duration_ms":300},{"text":"","start_ms":130080,"duration_ms":420}]},{"utterance_uuid":"252a1cc4-8c5f-4c8c-9b49-68dbd371029c","text":"I can see that medication request. To verify, your emergency contact is <pii:firstname></pii:firstname> <pii:lastname></pii:lastname>, <pii:emergency_contact></pii:emergency_contact>, at <pii:phone></pii:phone>, and your preferred mailing address is still <pii:mailing_address></pii:mailing_address>?","start_ms":130980,"duration_ms":17460,"speaker":1,"language":"en","words":[{"text":"I","start_ms":130980,"duration_ms":60},{"text":"can","start_ms":131160,"duration_ms":60},{"text":"see","start_ms":131280,"duration_ms":120},{"text":"that","start_ms":131400,"duration_ms":60},{"text":"medication","start_ms":131640,"duration_ms":360},{"text":"request.","start_ms":132120,"duration_ms":540},{"text":"To","start_ms":133200,"duration_ms":60},{"text":"verify,","start_ms":133380,"duration_ms":420},{"text":"your","start_ms":134040,"duration_ms":180},{"text":"emergency","start_ms":134340,"duration_ms":360},{"text":"contact","start_ms":135000,"duration_ms":180},{"text":"is","start_ms":135300,"duration_ms":60},{"text":"","start_ms":135600,"duration_ms":300},{"text":"","start_ms":136080,"duration_ms":300},{"text":"","start_ms":136800,"duration_ms":360},{"text":"at","start_ms":137520,"duration_ms":60},{"text":"","start_ms":137820,"duration_ms":3060},{"text":"and","start_ms":141240,"duration_ms":60},{"text":"your","start_ms":141300,"duration_ms":180},{"text":"preferred","start_ms":141600,"duration_ms":180},{"text":"mailing","start_ms":141900,"duration_ms":240},{"text":"address","start_ms":142140,"duration_ms":180},{"text":"is","start_ms":142500,"duration_ms":60},{"text":"still","start_ms":142740,"duration_ms":60},{"text":"","start_ms":143460,"duration_ms":240},{"text":"","start_ms":143820,"duration_ms":240},{"text":"","start_ms":144420,"duration_ms":1200},{"text":"","start_ms":145920,"duration_ms":300},{"text":"","start_ms":146340,"duration_ms":420},{"text":"","start_ms":147180,"duration_ms":1260}]},{"utterance_uuid":"cb608214-1f67-46b1-a488-bbc95f3d5db5","text":"Yes, and my wife's date of birth is <pii:date_of_birth></pii:date_of_birth>. Also, the hospital can fax records to my attorney, <pii:firstname></pii:firstname> <pii:middleinitial></pii:middleinitial> <pii:lastname></pii:lastname>, at <pii:phone></pii:phone>, because this relates to a workplace injury claim.","start_ms":149100,"duration_ms":15300,"speaker":2,"language":"en","words":[{"text":"Yes,","start_ms":149100,"duration_ms":240},{"text":"and","start_ms":150000,"duration_ms":60},{"text":"my","start_ms":150060,"duration_ms":60},{"text":"wife's","start_ms":150240,"duration_ms":300},{"text":"date","start_ms":150600,"duration_ms":120},{"text":"of","start_ms":150720,"duration_ms":60},{"text":"birth","start_ms":150900,"duration_ms":60},{"text":"is","start_ms":151140,"duration_ms":60},{"text":"","start_ms":151380,"duration_ms":60},{"text":"","start_ms":151860,"duration_ms":360},{"text":"","start_ms":152280,"duration_ms":900},{"text":"Also,","start_ms":153960,"duration_ms":180},{"text":"the","start_ms":154140,"duration_ms":60},{"text":"hospital","start_ms":154380,"duration_ms":240},{"text":"can","start_ms":154860,"duration_ms":60},{"text":"fax","start_ms":155100,"duration_ms":180},{"text":"records","start_ms":155340,"duration_ms":300},{"text":"to","start_ms":155700,"duration_ms":60},{"text":"my","start_ms":155820,"duration_ms":60},{"text":"attorney,","start_ms":156060,"duration_ms":540},{"text":"","start_ms":156960,"duration_ms":240},{"text":"","start_ms":157320,"duration_ms":60},{"text":"","start_ms":157560,"duration_ms":240},{"text":"at","start_ms":158400,"duration_ms":60},{"text":"","start_ms":158580,"duration_ms":3300},{"text":"because","start_ms":162120,"duration_ms":180},{"text":"this","start_ms":162360,"duration_ms":60},{"text":"relates","start_ms":162540,"duration_ms":180},{"text":"to","start_ms":162780,"duration_ms":60},{"text":"a","start_ms":162960,"duration_ms":60},{"text":"workplace","start_ms":163140,"duration_ms":480},{"text":"injury","start_ms":163680,"duration_ms":300},{"text":"claim.","start_ms":164040,"duration_ms":360}]},{"utterance_uuid":"6d69879e-c350-41d7-b467-fbc2eb6d7544","text":"Understood. I also see notes from your recent visit indicating <phi></phi>, <phi></phi>, and an <phi></phi>. The lab order was submitted under requisition number <phi></phi> from St. Anne's Outpatient Center.","start_ms":165060,"duration_ms":16800,"speaker":1,"language":"en","words":[{"text":"Understood.","start_ms":165060,"duration_ms":600},{"text":"I","start_ms":165960,"duration_ms":60},{"text":"also","start_ms":166080,"duration_ms":60},{"text":"see","start_ms":166380,"duration_ms":180},{"text":"notes","start_ms":166680,"duration_ms":180},{"text":"from","start_ms":166920,"duration_ms":60},{"text":"your","start_ms":167040,"duration_ms":180},{"text":"recent","start_ms":167280,"duration_ms":180},{"text":"visit","start_ms":167580,"duration_ms":360},{"text":"indicating","start_ms":168120,"duration_ms":300},{"text":"","start_ms":168720,"duration_ms":60},{"text":"","start_ms":168960,"duration_ms":60},{"text":"","start_ms":169260,"duration_ms":540},{"text":"","start_ms":170100,"duration_ms":660},{"text":"and","start_ms":171000,"duration_ms":60},{"text":"an","start_ms":171300,"duration_ms":60},{"text":"","start_ms":171660,"duration_ms":600},{"text":"","start_ms":172320,"duration_ms":60},{"text":"","start_ms":172680,"duration_ms":1020},{"text":"The","start_ms":174180,"duration_ms":60},{"text":"lab","start_ms":174420,"duration_ms":60},{"text":"order","start_ms":174720,"duration_ms":180},{"text":"was","start_ms":174900,"duration_ms":60},{"text":"submitted","start_ms":175080,"duration_ms":420},{"text":"under","start_ms":175560,"duration_ms":60},{"text":"requisition","start_ms":175920,"duration_ms":360},{"text":"number","start_ms":176520,"duration_ms":60},{"text":"","start_ms":177000,"duration_ms":2760},{"text":"from","start_ms":180240,"duration_ms":60},{"text":"St.","start_ms":180600,"duration_ms":60},{"text":"Anne's","start_ms":180960,"duration_ms":180},{"text":"Outpatient","start_ms":181200,"duration_ms":420},{"text":"Center.","start_ms":181800,"duration_ms":60}]},{"utterance_uuid":"60658940-1288-4540-b6c5-f201cf7e4d2d","text":"Thanks. Please send the appeal form to <pii:email></pii:email>, and mail a copy to <pii:address></pii:address>, <pii:address></pii:address> <pii:zipcode></pii:zipcode>. If you need payment for the balance, my HSA card ending in <pii:bank_account></pii:bank_account> is available.","start_ms":182820,"duration_ms":20100,"speaker":2,"language":"en","words":[{"text":"Thanks.","start_ms":182820,"duration_ms":360},{"text":"Please","start_ms":183660,"duration_ms":240},{"text":"send","start_ms":184020,"duration_ms":60},{"text":"the","start_ms":184200,"duration_ms":60},{"text":"appeal","start_ms":184380,"duration_ms":300},{"text":"form","start_ms":184800,"duration_ms":60},{"text":"to","start_ms":185040,"duration_ms":60},{"text":"","start_ms":185400,"duration_ms":3360},{"text":"and","start_ms":189360,"duration_ms":60},{"text":"mail","start_ms":189540,"duration_ms":180},{"text":"a","start_ms":189780,"duration_ms":60},{"text":"copy","start_ms":189900,"duration_ms":180},{"text":"to","start_ms":190140,"duration_ms":60},{"text":"","start_ms":190500,"duration_ms":780},{"text":"","start_ms":191640,"duration_ms":240},{"text":"","start_ms":191940,"duration_ms":240},{"text":"","start_ms":192300,"duration_ms":480},{"text":"","start_ms":193200,"duration_ms":240},{"text":"","start_ms":193620,"duration_ms":600},{"text":"","start_ms":194520,"duration_ms":360},{"text":"","start_ms":195000,"duration_ms":360},{"text":"","start_ms":195600,"duration_ms":1380},{"text":"If","start_ms":197520,"duration_ms":120},{"text":"you","start_ms":197640,"duration_ms":120},{"text":"need","start_ms":197760,"duration_ms":180},{"text":"payment","start_ms":198000,"duration_ms":240},{"text":"for","start_ms":198300,"duration_ms":60},{"text":"the","start_ms":198360,"duration_ms":60},{"text":"balance,","start_ms":198660,"duration_ms":540},{"text":"my","start_ms":199320,"duration_ms":60},{"text":"HSA","start_ms":199620,"duration_ms":420},{"text":"card","start_ms":200160,"duration_ms":120},{"text":"ending","start_ms":200400,"duration_ms":180},{"text":"in","start_ms":200640,"duration_ms":60},{"text":"","start_ms":200940,"duration_ms":780},{"text":"is","start_ms":202080,"duration_ms":60},{"text":"available.","start_ms":202260,"duration_ms":660}]}],"redaction_ranges":[[3640,4030],[7420,17650],[19960,21250],[24280,25630],[27280,31630],[32680,33430],[39040,47410],[50620,54010],[55060,59950],[62620,67390],[70120,71410],[74020,78430],[81220,86410],[89080,90790],[92140,93790],[97420,100630],[101740,105190],[106180,108070],[110740,113590],[117280,119050],[120520,122830],[127240,130510],[135520,140890],[143380,148450],[151300,153190],[156880,161890],[168640,173710],[176920,179770],[185320,188770],[190420,196990],[200860,201730]]};
  const DEMO_DATA = {"filename":"AIAgentFrustration.mp3","frames":[{"start_time_ms":0,"end_time_ms":4000,"verdict":"synthetic","confidence":0.9848},{"start_time_ms":4000,"end_time_ms":8000,"verdict":"synthetic","confidence":0.9571},{"start_time_ms":8000,"end_time_ms":12000,"verdict":"non-synthetic","confidence":0.9398},{"start_time_ms":12000,"end_time_ms":16000,"verdict":"synthetic","confidence":0.9595},{"start_time_ms":16000,"end_time_ms":20000,"verdict":"non-synthetic","confidence":0.8176},{"start_time_ms":20000,"end_time_ms":24000,"verdict":"non-synthetic","confidence":0.9524},{"start_time_ms":24000,"end_time_ms":28000,"verdict":"synthetic","confidence":0.9089},{"start_time_ms":28000,"end_time_ms":32000,"verdict":"synthetic","confidence":0.9696},{"start_time_ms":32000,"end_time_ms":36000,"verdict":"synthetic","confidence":0.972},{"start_time_ms":36000,"end_time_ms":40000,"verdict":"non-synthetic","confidence":0.9173},{"start_time_ms":40000,"end_time_ms":44000,"verdict":"synthetic","confidence":0.9785},{"start_time_ms":44000,"end_time_ms":48000,"verdict":"non-synthetic","confidence":0.9094},{"start_time_ms":48000,"end_time_ms":52000,"verdict":"non-synthetic","confidence":0.6542},{"start_time_ms":52000,"end_time_ms":56000,"verdict":"synthetic","confidence":0.9671},{"start_time_ms":56000,"end_time_ms":60000,"verdict":"non-synthetic","confidence":0.9443},{"start_time_ms":60000,"end_time_ms":64000,"verdict":"synthetic","confidence":0.9611},{"start_time_ms":64000,"end_time_ms":68000,"verdict":"non-synthetic","confidence":0.9418},{"start_time_ms":68000,"end_time_ms":72000,"verdict":"synthetic","confidence":0.984},{"start_time_ms":72000,"end_time_ms":76000,"verdict":"non-synthetic","confidence":0.9723},{"start_time_ms":76000,"end_time_ms":80000,"verdict":"synthetic","confidence":0.9755},{"start_time_ms":80000,"end_time_ms":84000,"verdict":"non-synthetic","confidence":0.5998},{"start_time_ms":84000,"end_time_ms":88000,"verdict":"synthetic","confidence":0.9757},{"start_time_ms":88000,"end_time_ms":92000,"verdict":"synthetic","confidence":0.9563},{"start_time_ms":92000,"end_time_ms":96000,"verdict":"non-synthetic","confidence":0.9242},{"start_time_ms":96000,"end_time_ms":97698,"verdict":"synthetic","confidence":0.9821}],"duration_ms":97698};

  const DEMO_STT_DATA = {"filename":"AIAgentFrustration.mp3","text":"Welcome to Northwest Warehouse's automated customer service system. In a few words, can you describe your reason for calling today? Track an order. Thank you. Can you provide the account ID number or the name on the account? 02738917. Thank you. Let me find your account in our system. Hello, <pii:firstname>Roger</pii:firstname>. Would you like to place an order over the phone today? No, track an order. Thank you. Please provide the item number to place an order. No, no, track an existing order. I'm sorry, I didn't quite catch that. Did you say you'd like to place an order? No. Okay. Can you describe in a few words your reason for calling today? Track an order. Thank you. Did you say you'd like to place an order over the phone? No, track, tracking. I'm sorry, I didn't quite catch that. Can you answer yes or no? No, back, undo. I'm sorry, I didn't quite catch that. Can you describe in a few words your reason for calling today? Track package. Thank you. Did you say you'd like to place an order?","duration_ms":97320,"utterances":[{"utterance_uuid":"59578ed0-acb4-4941-9c4d-b792c9a3760b","text":"Welcome to Northwest Warehouse's automated customer service system. In a few words, can you describe your reason for calling today?","start_ms":240,"duration_ms":7260,"speaker":1,"language":"en","emotion":"Calm","accent":"American","deepfake_score":0.9810000000000001},{"utterance_uuid":"0e0d034a-aef3-44a4-9ea8-9de1eca2af2b","text":"Track an order.","start_ms":9420,"duration_ms":660,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.5392},{"utterance_uuid":"2282571c-b16c-49cc-ac67-1253ddc99ff9","text":"Thank you. Can you provide the account ID number or the name on the account?","start_ms":12300,"duration_ms":4680,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9783999999999999},{"utterance_uuid":"02b1d2d1-c057-455a-ab1e-6750ee5e5f4c","text":"02738917.","start_ms":19320,"duration_ms":4620,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.2754},{"utterance_uuid":"517e8e3b-8555-419a-af55-60f112763e5b","text":"Thank you. Let me find your account in our system. Hello, <pii:firstname>Roger</pii:firstname>. Would you like to place an order over the phone today?","start_ms":25560,"duration_ms":8820,"speaker":1,"language":"en","emotion":"Interested","accent":"American","deepfake_score":0.9723333333333333},{"utterance_uuid":"46c11e6d-7ffa-44a4-bf75-21ed6482ae95","text":"No, track an order.","start_ms":36720,"duration_ms":1560,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.08640000000000003},{"utterance_uuid":"36ecffcb-834f-43a0-b822-606eddb9efeb","text":"Thank you. Please provide the item number to place an order.","start_ms":40620,"duration_ms":3660,"speaker":1,"language":"en","emotion":"Calm","accent":"American","deepfake_score":0.9796},{"utterance_uuid":"47d3b3ba-71f5-48f9-ba46-c0bdf44f2900","text":"No, no, track an existing order.","start_ms":46080,"duration_ms":2160,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.08150000000000002},{"utterance_uuid":"4ddc44b8-e4ab-4024-875c-5be369a43654","text":"I'm sorry, I didn't quite catch that. Did you say you'd like to place an order?","start_ms":50520,"duration_ms":4620,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9727},{"utterance_uuid":"00c4dfe6-ac97-4e74-809c-564937cc718a","text":"No.","start_ms":56280,"duration_ms":60,"speaker":2,"language":"en","emotion":"Amused","accent":"American","deepfake_score":null},{"utterance_uuid":"00be4745-849b-4814-94a0-7768aac15c82","text":"Okay. Can you describe in a few words your reason for calling today?","start_ms":59040,"duration_ms":5340,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.78235},{"utterance_uuid":"e9bec06b-a77f-4713-b0e2-17ce89a03dbc","text":"Track an order.","start_ms":66600,"duration_ms":1080,"speaker":2,"language":"en","emotion":"Confident","accent":"American","deepfake_score":0.08599999999999997},{"utterance_uuid":"135317de-c976-497f-918e-9ccfd1dbc0fd","text":"Thank you. Did you say you'd like to place an order over the phone?","start_ms":69180,"duration_ms":3120,"speaker":1,"language":"en","emotion":"Interested","accent":"American","deepfake_score":0.9778},{"utterance_uuid":"66bc4b5f-3be1-44dd-9f0c-8aae8589e5a8","text":"No, track, tracking.","start_ms":73560,"duration_ms":2160,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":null},{"utterance_uuid":"c8093216-16b3-44ca-b30d-ff8274196cde","text":"I'm sorry, I didn't quite catch that. Can you answer yes or no?","start_ms":77280,"duration_ms":4320,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9766},{"utterance_uuid":"3de81bf7-a453-4618-a265-962e902c4d50","text":"No, back, undo.","start_ms":82320,"duration_ms":1560,"speaker":2,"language":"en","emotion":"Frustrated","accent":"American","deepfake_score":0.07579999999999998},{"utterance_uuid":"1415b904-e949-4fb2-a3a3-629df8e6610a","text":"I'm sorry, I didn't quite catch that. Can you describe in a few words your reason for calling today?","start_ms":85260,"duration_ms":5640,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9788},{"utterance_uuid":"ec69b9e7-0fac-4b3e-a4da-ea9773d56aed","text":"Track package.","start_ms":91620,"duration_ms":960,"speaker":2,"language":"en","emotion":"Excited","accent":"American","deepfake_score":0.10909999999999997},{"utterance_uuid":"4003694d-b15d-46b1-9276-80366dc178fc","text":"Thank you. Did you say you'd like to place an order?","start_ms":94320,"duration_ms":3000,"speaker":1,"language":"en","emotion":"Interested","accent":"American","deepfake_score":0.9723}]};

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

  // ── Mode State ──────────────────────────────────────────────────────────────
  let currentMode = 'transcription'; // 'deepfake' | 'transcription'

  // ── DOM refs ────────────────────────────────────────────────────────────────
  const overlay       = document.getElementById('analysis-overlay');
  const progressFill  = document.getElementById('progress-fill');
  const analysisTitle = document.getElementById('analysis-title');
  const analysisStatus = document.getElementById('analysis-status');
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

  // Modals
  const statsModal    = document.getElementById('stats-modal');
  const statsModalTitle = document.getElementById('stats-modal-title');
  const statsGrid     = document.getElementById('stats-grid');
  const jsonModal     = document.getElementById('json-modal');
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

  // ── Mobile layout ───────────────────────────────────────────────────────────
  const resultsLayout   = document.querySelector('.results-layout');
  const resultsMain     = document.querySelector('.results-main');
  const histogramSection = document.querySelector('.histogram-section');

  function applyMobileLayout(isMobile) {
    if (!resultsVerdict || !resultsLayout || !resultsMain || !histogramSection) return;
    if (currentMode !== 'deepfake') return;
    if (isMobile) {
      resultsMain.insertBefore(resultsVerdict, histogramSection);
    } else {
      resultsLayout.appendChild(resultsVerdict);
    }
  }

  const mobileQuery = window.matchMedia('(max-width: 768px)');
  applyMobileLayout(mobileQuery.matches);
  mobileQuery.addEventListener('change', e => applyMobileLayout(e.matches));

  // ── Mode Switching ──────────────────────────────────────────────────────────
  function switchMode(mode, pushUrl) {
    currentMode = mode;
    const isDeepfake    = mode === 'deepfake';
    const isRedaction   = mode === 'redaction';
    const isTranscription = mode === 'transcription';

    // Update URL
    const targetPath = isDeepfake ? '/deepfake' : isRedaction ? '/redaction' : '/transcription';
    if (pushUrl !== false && location.pathname !== targetPath) {
      history.pushState({ mode: mode }, '', targetPath + location.search);
    }

    deepfakeContent.style.display = isDeepfake ? '' : 'none';
    resultsVerdict.style.display = isDeepfake ? '' : 'none';
    transcriptContainer.classList.toggle('visible', isTranscription);
    resultsSidebar.classList.toggle('visible', isTranscription);
    sttOptions.classList.toggle('visible', isTranscription);
    redactionContent.style.display = isRedaction ? 'block' : 'none';
    redactionSidebar.classList.toggle('visible', isRedaction);
    redactionOptions.classList.toggle('visible', isRedaction);
    if (playerEntryOriginal) playerEntryOriginal.style.display = isRedaction ? '' : 'none';
    if (redactedLabel) redactedLabel.style.display = isRedaction ? '' : 'none';
    if (streamDemoAction) streamDemoAction.style.display = isTranscription ? '' : 'none';
    if (streamFileAction) streamFileAction.style.display = isTranscription ? '' : 'none';
    if (recordAction) {
      recordAction.style.display = '';
      recordAction.classList.toggle('disabled-soon', isRedaction);
    }
    renderDebugPanel(true);

    // Stop any running animation frame trackers
    if (playbackTracker) { cancelAnimationFrame(playbackTracker); playbackTracker = null; }
    if (sttChartTracker) { cancelAnimationFrame(sttChartTracker); sttChartTracker = null; }
    if (redactionPlaybackTracker) { cancelAnimationFrame(redactionPlaybackTracker); redactionPlaybackTracker = null; }
    if (redactionTranscriptTracker) { cancelAnimationFrame(redactionTranscriptTracker); redactionTranscriptTracker = null; }

    if (recordAction) {
      recordAction.classList.remove('disabled-soon');
      const span = recordAction.querySelector('span');
      if (span) span.textContent = 'Start streaming';
    }

    if (isRecording) stopRecording();

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
      applyMobileLayout(mobileQuery.matches);
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
  }

  modeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) switchMode(radio.value);
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
  const debugPhaseEl        = document.getElementById('stt-debug-phase');
  const debugSinceEl        = document.getElementById('stt-debug-since');
  const debugCountersEl     = document.getElementById('stt-debug-counters');
  const debugInfoEl         = document.getElementById('stt-debug-info');
  const debugPartialsList   = document.getElementById('stt-debug-partials');
  const debugFinalsList     = document.getElementById('stt-debug-finals');
  const debugPartialsCount  = document.getElementById('stt-debug-partials-count');
  const debugFinalsCount    = document.getElementById('stt-debug-finals-count');
  const debugReverseBtn     = document.getElementById('stt-debug-reverse-btn');

  optFast.addEventListener('change', () => {
    if (optFast.checked) richOpts.forEach(cb => { cb.checked = false; });
  });
  richOpts.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) optFast.checked = false;
    });
  });

  function isFastMode() { return optFast.checked; }

  function getSttOptions() {
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
  let recordingStartTime = 0;
  let mediaRecorder = null;
  let recordedChunks = [];
  let endFrameSent = false;

  if (recordAction) {
    recordAction.addEventListener('click', () => {
      if (recordAction.classList.contains('disabled-soon')) return;
      if (isRecording) {
        stopRecording();
      } else {
        if (currentMode === 'deepfake') startDeepfakeRecording();
        else startTranscriptionRecording();
      }
    });
  }

  if (streamDemoAction) {
    streamDemoAction.addEventListener('click', () => {
      if (isRecording) { stopRecording(); return; }
      startTranscriptionDemoStream();
    });
  }

  if (streamFileAction && streamFileInput) {
    streamFileAction.addEventListener('click', (e) => {
      if (e.target !== streamFileInput) {
        if (isRecording) { stopRecording(); return; }
        streamFileInput.click();
      }
    });
    streamFileInput.addEventListener('change', () => {
      if (streamFileInput.files.length > 0) {
        startTranscriptionFileStream(streamFileInput.files[0]);
        streamFileInput.value = '';
      }
    });
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

      verdictRing.className = 'verdict-ring pending';
      verdictIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%"><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></svg>';
      verdictLabel.textContent = 'Listening';
      verdictCount.textContent = 'No segments';

      histogram.innerHTML = '';
      const placeholderBar = document.createElement('div');
      placeholderBar.className = 'histo-bar';
      placeholderBar.style.height = '40%';
      placeholderBar.style.background = 'var(--ui-border)';
      histogram.appendChild(placeholderBar);

      resultsTbody.innerHTML = '';
      const placeholderRow = document.createElement('tr');
      placeholderRow.style.color = 'var(--text-caption)';
      const tdTime = document.createElement('td');
      tdTime.textContent = '0:00 \u2013 \u2026';
      const tdVerdict = document.createElement('td');
      const pill = document.createElement('span');
      pill.className = 'verdict-pill';
      pill.style.background = 'var(--ui-border)';
      pill.style.color = 'var(--text-caption)';
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
      verdictRing.className = 'verdict-ring authentic';
      verdictIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
      verdictLabel.textContent = 'Insufficient data';
      verdictCount.textContent = 'Audio too short to analyze';
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

  function renderVerdict(isSynthetic, syntheticCount, totalCount, reason) {
    verdictRing.className = 'verdict-ring ' + (isSynthetic ? 'synthetic' : 'authentic');

    verdictIcon.innerHTML = isSynthetic
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><rect x="4" y="8" width="16" height="12" rx="2"/><circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none"/><line x1="12" y1="4" x2="12" y2="8"/><circle cx="12" cy="3" r="1"/><line x1="2" y1="13" x2="4" y2="13"/><line x1="20" y1="13" x2="22" y2="13"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';

    verdictLabel.textContent = isSynthetic ? 'Deepfake' : 'Authentic';
    verdictCount.textContent = syntheticCount + '/' + totalCount + ' deepfake segments';

    let reasonEl = verdictCount.parentElement.querySelector('.verdict-reason');
    if (isSynthetic && reason) {
      if (!reasonEl) {
        reasonEl = document.createElement('div');
        reasonEl.className = 'verdict-reason';
        reasonEl.style.cssText = 'font-size:0.7rem;opacity:0.55;margin-top:2px;';
        verdictCount.parentElement.appendChild(reasonEl);
      }
      reasonEl.textContent = reason;
      reasonEl.hidden = false;
    } else if (reasonEl) {
      reasonEl.hidden = true;
    }
  }

  function renderHistogram(frames) {
    histogram.innerHTML = '';
    if (!frames.length) return;

    const squaresRow = document.createElement('div');
    squaresRow.className = 'histo-squares';

    frames.forEach((frame, i) => {
      const bar = document.createElement('div');
      bar.className = 'histo-bar ' + verdictClass(frame);
      const alpha = confidenceToOpacity(frame.confidence);
      const vc = verdictClass(frame);
      const rgb = vc === 'synthetic' ? '255,53,84' : vc === 'no-content' ? '220,220,230' : '21,207,135';
      bar.style.background = 'rgba(' + rgb + ',' + alpha + ')';

      const verdictWord = verdictText(frame);
      const verdictColor = vc === 'synthetic' ? 'rgb(255,53,84)' : vc === 'no-content' ? 'rgb(120,120,140)' : 'rgb(21,207,135)';
      const tooltipHtml =
        formatMs(frame.start_time_ms) + ' \u2013 ' + formatMs(frame.end_time_ms) +
        ' <span style="color:' + verdictColor + '">\u00B7 <span style="font-weight:700">' + verdictWord + '</span>' +
        ' \u00B7 ' + (frame.confidence * 100).toFixed(0) + '%</span>';

      bar.addEventListener('mouseenter', () => {
        const rect = bar.getBoundingClientRect();
        histoTooltip.innerHTML = tooltipHtml;
        histoTooltip.style.display = 'block';
        histoTooltip.style.top = (rect.top - 6) + 'px';
        histoTooltip.style.left = (rect.left + rect.width / 2) + 'px';
        histoTooltip.style.transform = 'translate(-50%, -100%)';
      });
      bar.addEventListener('mouseleave', () => { histoTooltip.style.display = 'none'; });
      bar.addEventListener('click', () => seekTo(frame.start_time_ms, i));
      squaresRow.appendChild(bar);
    });
    histogram.appendChild(squaresRow);

    const axisRow = document.createElement('div');
    axisRow.className = 'histo-axis';
    frames.forEach((frame, i) => {
      const tick = document.createElement('div');
      tick.className = 'histo-tick';
      if (i % 5 === 0) tick.textContent = formatSecCompact(frame.start_time_ms);
      axisRow.appendChild(tick);
    });
    histogram.appendChild(axisRow);
  }

  function renderTable(frames) {
    resultsTbody.innerHTML = '';
    frames.forEach((frame, i) => {
      const tr = document.createElement('tr');
      tr.dataset.index = i;

      const tdTime = document.createElement('td');
      tdTime.textContent = formatMs(frame.start_time_ms) + ' \u2013 ' + formatMs(frame.end_time_ms);

      const tdVerdict = document.createElement('td');
      const pill = document.createElement('span');
      pill.className = 'verdict-pill ' + verdictClass(frame);
      pill.textContent = verdictText(frame);
      tdVerdict.appendChild(pill);

      const tdConf = document.createElement('td');
      const confWrap = document.createElement('div');
      confWrap.className = 'confidence-cell';
      const confTrack = document.createElement('div');
      confTrack.className = 'confidence-bar-track';
      const confFill = document.createElement('div');
      confFill.className = 'confidence-bar-fill ' + verdictClass(frame);
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

  function seekTo(startMs, index) {
    if (resultsAudio) {
      resultsAudio.currentTime = startMs / 1000;
      resultsAudio.play().catch(() => {});
    }
    histogram.querySelectorAll('.histo-bar').forEach((bar, i) => bar.classList.toggle('active', i === index));
    resultsTbody.querySelectorAll('tr').forEach((row, i) => row.classList.toggle('active', i === index));
  }

  function setupPlaybackTracking(frames) {
    if (playbackTracker) cancelAnimationFrame(playbackTracker);
    const bars = histogram.querySelectorAll('.histo-bar');
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

  function renderRedactionTimeline(ranges, durationMs) {
    redactionTimeline.querySelectorAll('.redaction-range').forEach(el => el.remove());
    redactionTimelineAxis.innerHTML = '';

    if (!durationMs || durationMs <= 0) {
      redactionPlayhead.classList.remove('active');
      return;
    }

    ranges.forEach(([startMs, endMs]) => {
      const range = document.createElement('div');
      range.className = 'redaction-range';
      range.style.left = (startMs / durationMs * 100).toFixed(3) + '%';
      range.style.width = Math.max(0.3, (endMs - startMs) / durationMs * 100).toFixed(3) + '%';
      range.addEventListener('mouseenter', () => {
        const rect = range.getBoundingClientRect();
        histoTooltip.textContent = formatMs(startMs) + ' \u2013 ' + formatMs(endMs) + ' \u00B7 ' + ((endMs - startMs) / 1000).toFixed(1) + 's';
        histoTooltip.style.display = 'block';
        histoTooltip.style.top = (rect.top - 6) + 'px';
        histoTooltip.style.left = (rect.left + rect.width / 2) + 'px';
        histoTooltip.style.transform = 'translate(-50%, -100%)';
      });
      range.addEventListener('mouseleave', () => { histoTooltip.style.display = 'none'; });
      range.addEventListener('click', (e) => {
        e.stopPropagation();
        if (resultsAudio) { resultsAudio.currentTime = startMs / 1000; resultsAudio.play().catch(() => {}); }
      });
      redactionTimeline.insertBefore(range, redactionPlayhead);
    });

    // Axis ticks
    const ticks = 5;
    for (let i = 0; i <= ticks; i++) {
      const tick = document.createElement('span');
      tick.textContent = formatMs(durationMs * i / ticks);
      redactionTimelineAxis.appendChild(tick);
    }

    redactionTimeline.onclick = (e) => {
      const rect = redactionTimeline.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (resultsAudio) { resultsAudio.currentTime = pct * durationMs / 1000; resultsAudio.play().catch(() => {}); }
    };
  }

  function renderRedactionTranscript(utterances) {
    redactionTranscriptList.innerHTML = '';
    if (!utterances.length) {
      const empty = document.createElement('div');
      empty.className = 'transcript-empty';
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
    el.className = 'transcript-utterance ' + side;
    el.style.setProperty('--ec', '#78909c');
    if (u.start_ms != null) {
      el.addEventListener('click', () => {
        if (resultsAudio) { resultsAudio.currentTime = u.start_ms / 1000; resultsAudio.play().catch(() => {}); }
      });
    }
    const header = document.createElement('div');
    header.className = 'transcript-utterance-header';
    if (u.start_ms != null) {
      const time = document.createElement('span');
      time.className = 'transcript-time';
      time.textContent = formatMs(u.start_ms);
      header.appendChild(time);
    }
    if (u.speaker != null && showDiarization) {
      const sp = document.createElement('span');
      sp.className = 'transcript-speaker';
      sp.textContent = 'Speaker ' + u.speaker;
      header.appendChild(sp);
    }
    if (u.language) {
      const flag = LANGUAGE_FLAGS[u.language.toUpperCase()];
      if (flag) {
        const lf = document.createElement('span');
        lf.className = 'transcript-accent';
        lf.textContent = flag;
        lf.title = u.language.toUpperCase();
        header.appendChild(lf);
      }
    }
    el.appendChild(header);
    const text = document.createElement('div');
    text.className = 'transcript-text';
    if (u.text && (/\[REDACTED\]/i.test(u.text) || /<(pii|phi)/i.test(u.text))) {
      text.innerHTML = renderRedactionText(u.text);
    } else {
      text.textContent = u.text || '';
    }
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
        result += '<span class="redacted-marker">[' + label + ']</span>';
        lastIdx = match.index + match[0].length;
      }
      result += escapeHtml(rawText.slice(lastIdx));
      return result;
    }
    // Handle [REDACTED] markers
    const parts = rawText.split(/(\[REDACTED\])/gi);
    return parts.map(p => /^\[REDACTED\]$/i.test(p)
      ? '<span class="redacted-marker">[REDACTED]</span>'
      : escapeHtml(p)
    ).join('');
  }

  function renderRedactionSidebar(ranges, durationMs) {
    redactionStats.innerHTML = '';
    const totalSilencedMs = ranges.reduce((s, [a, b]) => s + (b - a), 0);
    const pct = durationMs > 0 ? totalSilencedMs / durationMs * 100 : 0;
    [
      { val: String(ranges.length), lbl: 'Redactions' },
      { val: (totalSilencedMs / 1000).toFixed(1) + 's', lbl: 'Silenced' },
      { val: pct.toFixed(1) + '%', lbl: 'Of audio' },
    ].forEach(({ val, lbl }) => {
      const card = document.createElement('div');
      card.className = 'redaction-stat-card';
      const v = document.createElement('div'); v.className = 'redaction-stat-val'; v.textContent = val;
      const l = document.createElement('div'); l.className = 'redaction-stat-lbl'; l.textContent = lbl;
      card.appendChild(v); card.appendChild(l);
      redactionStats.appendChild(card);
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
      redactionTranscriptList.querySelectorAll('.transcript-utterance').forEach((el, i) => {
        el.classList.toggle('active', i === activeIdx);
      });
      redactionTranscriptTracker = requestAnimationFrame(tick);
    }
    redactionTranscriptTracker = requestAnimationFrame(tick);
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
    debugReset();

    startRecordingCommon('/api/velma-2-stt-streaming?' + buildSttStreamingParams().toString(), handleTranscriptionStreamMessage, () => {
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
    const wsUrl = proto + '//' + location.host + '/api/velma-2-stt-streaming?' + buildSttStreamingParams().toString();
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
    if (debugActive()) renderDebugPanel(true);
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
  }

  let debugReverseTranscript = false;
  if (debugReverseBtn) {
    debugReverseBtn.addEventListener('click', () => {
      debugReverseTranscript = !debugReverseTranscript;
      debugReverseBtn.classList.toggle('active', debugReverseTranscript);
      renderTranscript();
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
      indicator.className = 'transcript-empty';
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
      empty.className = 'transcript-empty';
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
      indicator.className = 'transcript-empty';
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
      transcriptList.querySelectorAll('.transcript-utterance').forEach((el, i) => {
        const wasActive = el.classList.contains('active');
        const nowActive = i === activeIdx;
        el.classList.toggle('active', nowActive);
        if (nowActive && !wasActive && !debugActive()) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
      sttPlaybackTracker = requestAnimationFrame(tick);
    }
    sttPlaybackTracker = requestAnimationFrame(tick);
  }

  function renderSttChart() {
    sttChart.innerHTML = '';
    if (!sttUtterances.length) { sttChart.classList.remove('visible'); return; }

    // Calculate total duration
    const lastU = sttUtterances[sttUtterances.length - 1];
    const totalMs = (sttData && sttData.duration_ms)
      ? sttData.duration_ms
      : (lastU.start_ms + (lastU.duration_ms || 4000));
    if (totalMs <= 0) return;

    // Group utterances by speaker
    const speakerMap = new Map();
    sttUtterances.forEach((u, i) => {
      const spk = u.speaker != null ? u.speaker : 0;
      if (!speakerMap.has(spk)) speakerMap.set(spk, []);
      speakerMap.get(spk).push({ u, i });
    });
    const speakers = Array.from(speakerMap.keys()).sort((a, b) => a - b);

    // Build rows
    speakers.forEach(spk => {
      const row = document.createElement('div');
      row.className = 'stt-chart-row';

      const label = document.createElement('div');
      label.className = 'stt-chart-label';
      label.textContent = 'Speaker ' + spk;
      row.appendChild(label);

      speakerMap.get(spk).forEach(({ u, i }) => {
        const bar = document.createElement('div');
        bar.className = 'stt-chart-bar';

        // Extend bar to the start of the next utterance from ANY speaker
        let nextStartMs = totalMs;
        for (let j = 0; j < sttUtterances.length; j++) {
          if (sttUtterances[j].start_ms > u.start_ms) {
            nextStartMs = sttUtterances[j].start_ms;
            break;
          }
        }
        const endMs = Math.max(nextStartMs, u.start_ms + (u.duration_ms || 2000));
        const leftPct = (u.start_ms / totalMs * 100).toFixed(3);
        const widthPct = ((endMs - u.start_ms) / totalMs * 100).toFixed(3);
        bar.style.left = leftPct + '%';
        bar.style.width = widthPct + '%';

        const ec = u.emotion ? (EMOTION_COLORS[u.emotion.toLowerCase()] || '#78909c') : '#78909c';
        bar.style.background = ec;

        // Tooltip
        const endTimeMs = u.start_ms + (u.duration_ms || 2000);
        let dfTooltip = '';
        if (u.deepfake_score != null) {
          const s = u.deepfake_score;
          if (s > 0.7) dfTooltip = ' · Deepfake (' + Math.round((s - 0.5) * 200) + '%)';
          else if (s < 0.3) dfTooltip = ' · Authentic (' + Math.round((0.5 - s) * 200) + '%)';
          else dfTooltip = ' · Uncertain authenticity';
        }
        const tooltipText = formatMs(u.start_ms) + ' \u2013 ' + formatMs(endTimeMs) +
          ' · Speaker ' + (u.speaker || 0) + (u.emotion ? ' · ' + u.emotion : '') + dfTooltip;
        bar.addEventListener('mouseenter', () => {
          const rect = bar.getBoundingClientRect();
          histoTooltip.textContent = tooltipText;
          histoTooltip.style.display = 'block';
          histoTooltip.style.top = (rect.top - 6) + 'px';
          histoTooltip.style.left = (rect.left + rect.width / 2) + 'px';
          histoTooltip.style.transform = 'translate(-50%, -100%)';
        });
        bar.addEventListener('mouseleave', () => { histoTooltip.style.display = 'none'; });

        // Click to seek and highlight transcript bubble
        bar.addEventListener('click', () => {
          if (resultsAudio) {
            resultsAudio.currentTime = u.start_ms / 1000;
            resultsAudio.play().catch(() => {});
          }
          const bubbles = transcriptList.querySelectorAll('.transcript-utterance');
          bubbles.forEach((el, j) => el.classList.toggle('active', j === i));
          if (bubbles[i]) bubbles[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        bar.dataset.uttIdx = i;
        row.appendChild(bar);
      });

      sttChart.appendChild(row);
    });

    sttChart.classList.add('visible');

    // Sync chart bars with playback
    setupSttChartPlaybackTracking();
  }

  function setupSttChartPlaybackTracking() {
    if (sttChartTracker) cancelAnimationFrame(sttChartTracker);
    const bars = sttChart.querySelectorAll('.stt-chart-bar');

    function tick() {
      const currentMs = resultsAudio.currentTime * 1000;
      let activeIdx = -1;
      for (let i = sttUtterances.length - 1; i >= 0; i--) {
        if (currentMs >= sttUtterances[i].start_ms) { activeIdx = i; break; }
      }
      bars.forEach(bar => {
        bar.classList.toggle('active', parseInt(bar.dataset.uttIdx) === activeIdx);
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

  const EMOTION_COLORS = {
    angry: '#e53935', contemptuous: '#c62828', disgusted: '#e91e63',
    afraid: '#ef5350', anxious: '#ff7043',
    stressed: '#8e24aa', surprised: '#7b1fa2', frustrated: '#6a1b9a',
    excited: '#ff5722', hopeful: '#ff9800', amused: '#ff9800',
    proud: '#ec407a', curious: '#ab47bc',
    sad: '#5c6bc0', disappointed: '#42a5f5', bored: '#5c6bc0', tired: '#7986cb',
    concerned: '#26a69a', confused: '#ff8a65',
    calm: '#42a5f5', confident: '#5c6bc0', interested: '#7986cb',
    neutral: '#78909c', unknown: '#546e7a', affectionate: '#ec407a',
  };

  function buildUtteranceEl(u, opts, isPartial, index) {
    const el = document.createElement('div');
    // Alternate bubble alignment by speaker (odd left, even right)
    const side = (u.speaker != null && u.speaker % 2 === 0) ? 'speaker-right' : 'speaker-left';
    el.className = 'transcript-utterance ' + side;

    // No emotion coloring on bubbles
    const emotionColor = (u.emotion && opts.emotion_signal)
      ? EMOTION_COLORS[u.emotion.toLowerCase()] || null : null;
    el.style.setProperty('--ec', emotionColor || '#78909c');

    if (u.start_ms != null && !isPartial) {
      el.addEventListener('click', () => {
        if (resultsAudio) {
          resultsAudio.currentTime = u.start_ms / 1000;
          resultsAudio.play().catch(() => {});
        }
      });
    }

    const header = document.createElement('div');
    header.className = 'transcript-utterance-header';

    // Timestamp (start only)
    if (u.start_ms != null) {
      const time = document.createElement('span');
      time.className = 'transcript-time';
      time.textContent = formatMs(u.start_ms);
      header.appendChild(time);
    }

    // Speaker name
    if (u.speaker != null && opts.speaker_diarization) {
      const sp = document.createElement('span');
      sp.className = 'transcript-speaker';
      sp.textContent = 'Speaker ' + u.speaker;
      header.appendChild(sp);
    }

    // Emotion inline
    if (u.emotion && opts.emotion_signal) {
      const em = document.createElement('span');
      em.className = 'transcript-emotion';
      if (emotionColor) em.style.color = emotionColor;
      em.textContent = u.emotion;
      header.appendChild(em);
    }

    // Language flag
    if (u.language) {
      const flag = LANGUAGE_FLAGS[u.language.toUpperCase()];
      if (flag) {
        const lf = document.createElement('span');
        lf.className = 'transcript-accent';
        lf.textContent = flag;
        lf.title = u.language.toUpperCase();
        header.appendChild(lf);
      }
    }

    // Accent (shortened text, bolded)
    if (u.accent && opts.accent_signal) {
      const la = document.createElement('span');
      la.className = 'transcript-accent';
      la.style.fontWeight = '700';
      la.textContent = (ACCENT_SHORT[u.accent] || u.accent) + ' accent';
      header.appendChild(la);
    }

    // Deepfake verdict pill
    if (opts.deepfake_signal && u.deepfake_score != null) {
      const score = u.deepfake_score;
      const df = document.createElement('span');
      df.className = 'verdict-pill sm';
      if (score > 0.7) {
        const conf = Math.round((score - 0.5) * 2 * 100);
        df.className += ' synthetic';
        df.textContent = 'Deepfake';
        df.title = 'Deepfake · ' + conf + '% confidence';
      } else if (score < 0.3) {
        const conf = Math.round((0.5 - score) * 2 * 100);
        df.className += ' authentic';
        df.textContent = 'Authentic';
        df.title = 'Authentic · ' + conf + '% confidence';
      } else {
        df.className += ' uncertain';
        df.textContent = 'Uncertain authenticity';
        if (score > 0.5) {
          const conf = Math.round((score - 0.5) * 2 * 100);
          df.title = 'Uncertain · leans Deepfake at ' + conf + '% confidence';
        } else if (score < 0.5) {
          const conf = Math.round((0.5 - score) * 2 * 100);
          df.title = 'Uncertain · leans Authentic at ' + conf + '% confidence';
        } else {
          df.title = 'Uncertain · 50/50';
        }
      }
      header.appendChild(df);
    }

    el.appendChild(header);

    const text = document.createElement('div');
    text.className = 'transcript-text' + (isPartial ? ' partial' : '');
    if (opts.pii_phi_tagging && u.text && /<pii|<phi/i.test(u.text)) {
      text.innerHTML = renderPiiText(u.text);
    } else {
      text.textContent = u.text || '';
    }
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
          const hasData = currentMode === 'deepfake' ? liveFrames.length > 0 : sttUtterances.length > 0;
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
    if (!recordAction) return;
    const span = recordAction.querySelector('span');
    if (isRecording) { recordAction.classList.add('recording'); span.textContent = 'Stop streaming'; }
    else { recordAction.classList.remove('recording'); span.textContent = 'Start streaming'; }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── MODALS ────────────────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  document.getElementById('btn-show-stats').addEventListener('click', () => showStatsModal());
  document.getElementById('btn-show-json').addEventListener('click', () => showJsonModal());
  document.getElementById('btn-show-stats-stt').addEventListener('click', () => showStatsModal());
  document.getElementById('btn-show-json-stt').addEventListener('click', () => showJsonModal());
  document.getElementById('btn-show-json-redaction').addEventListener('click', () => showJsonModal());

  document.getElementById('stats-modal-close').addEventListener('click', () => statsModal.classList.remove('visible'));
  document.getElementById('json-modal-close').addEventListener('click', () => jsonModal.classList.remove('visible'));
  statsModal.addEventListener('click', (e) => { if (e.target === statsModal) statsModal.classList.remove('visible'); });
  jsonModal.addEventListener('click', (e) => { if (e.target === jsonModal) jsonModal.classList.remove('visible'); });

  jsonCopyBtn.addEventListener('click', () => {
    const text = JSON.stringify(currentData, null, 2);
    const onSuccess = () => {
      jsonCopyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      setTimeout(() => {
        jsonCopyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy';
      }, 2000);
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
  if (ctaBtn && hsModal) {
    ctaBtn.addEventListener('click', () => hsModal.classList.add('visible'));
    hsClose.addEventListener('click', () => hsModal.classList.remove('visible'));
    hsModal.addEventListener('click', (e) => { if (e.target === hsModal) hsModal.classList.remove('visible'); });
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

    if (currentMode === 'deepfake') {
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

    let html = '<table class="stats-table">';
    groups.forEach(g => {
      html += '<tr class="stats-group-row"><td colspan="2">' + g.group + '</td></tr>';
      g.rows.forEach(([label, value]) => {
        html += '<tr><td class="stats-label">' + escapeHtml(String(label)) + '</td><td class="stats-value">' + escapeHtml(String(value)) + '</td></tr>';
      });
    });
    html += '</table>';
    statsGrid.innerHTML = html;
    statsModal.classList.add('visible');
  }

  function showJsonModal() {
    if (!currentData) return;
    jsonPre.innerHTML = syntaxHighlightJson(JSON.stringify(currentData, null, 2));
    jsonModal.classList.add('visible');
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

  function startProgress(estimatedMs) {
    const start = Date.now();
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    void progressFill.offsetWidth;

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = (1 - Math.exp(-elapsed / estimatedMs)) * 88;
      progressFill.style.transition = 'width 0.3s linear';
      progressFill.style.width = pct + '%';
      progressTimer = requestAnimationFrame(tick);
    };
    progressTimer = requestAnimationFrame(tick);
  }

  function finishProgress() {
    return new Promise((resolve) => {
      if (progressTimer) cancelAnimationFrame(progressTimer);
      progressFill.style.transition = 'width 0.4s ease-out';
      progressFill.style.width = '100%';
      setTimeout(resolve, 500);
    });
  }

  function stopProgress() { if (progressTimer) cancelAnimationFrame(progressTimer); }

  function showOverlay(filename, statusText) {
    if (analysisTitle) analysisTitle.textContent = 'Analyzing \u201c' + truncate(filename, 30) + '\u201d';
    if (analysisStatus) analysisStatus.textContent = statusText || 'Processing audio';
    progressFill.style.width = '0%';
    overlay.classList.remove('error');
    overlay.classList.add('visible');
  }

  function hideOverlay() {
    overlay.classList.remove('visible', 'error');
  }

  function showOverlayError(msg, rawText) {
    stopProgress();
    overlay.classList.add('error');
    document.getElementById('overlay-error-msg').textContent = msg;
    const pre = document.getElementById('overlay-error-json');
    if (rawText) {
      try { pre.textContent = JSON.stringify(JSON.parse(rawText), null, 2); }
      catch { pre.textContent = rawText; }
    } else {
      pre.textContent = '(no response body)';
    }
  }

  document.getElementById('overlay-dismiss-btn').addEventListener('click', () => {
    hideOverlay();
    isAnalyzing = false;
  });

  function showError(msg) {
    errorToast.textContent = msg;
    errorToast.classList.add('visible');
    setTimeout(() => errorToast.classList.remove('visible'), 5000);
  }

  function syntaxHighlightJson(json) {
    return json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")\s*:/g, '<span class="json-key">$1</span>:')
      .replace(/:\s*("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")/g, ': <span class="json-string">$1</span>')
      .replace(/:\s*(-?\d+\.?\d*([eE][+-]?\d+)?)/g, ': <span class="json-number">$1</span>')
      .replace(/:\s*(true|false)/g, ': <span class="json-bool">$1</span>')
      .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
      .replace(/([{}[\]])/g, '<span class="json-brace">$1</span>');
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

  // ── URL Routing ──────────────────────────────────────────────────────────
  window.addEventListener('popstate', (e) => {
    const mode = (e.state && e.state.mode) || getModeFromPath();
    document.getElementById('mode-' + mode).checked = true;
    switchMode(mode, false);
  });

  function getModeFromPath() {
    const path = location.pathname.replace(/\/$/, '');
    if (path === '/deepfake') return 'deepfake';
    if (path === '/redaction') return 'redaction';
    return 'transcription';
  }

  // ── Scrollbar: show only while scrolling ──────────────────────────────
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    document.documentElement.classList.add('is-scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => document.documentElement.classList.remove('is-scrolling'), 1200);
  }, { passive: true });

  // ── Rate limit display ───────────────────────────────────────────────
  const rateLimitBar = document.getElementById('rate-limit-bar');
  function updateRateLimit() {
    fetch('/api/usage').then(r => r.json()).then(d => {
      rateLimitBar.textContent = d.remaining + '/' + d.limit + ' requests available';
      rateLimitBar.style.color = d.remaining <= 2 ? 'var(--deepfake)' : '';
    }).catch(() => {});
  }
  updateRateLimit();

  // ── Init ────────────────────────────────────────────────────────────────
  const initMode = getModeFromPath();
  currentMode = initMode;
  document.getElementById('mode-' + initMode).checked = true;

  if (initMode === 'deepfake') {
    // Deepfake init
    transcriptContainer.classList.remove('visible');
    resultsSidebar.classList.remove('visible');
    redactionContent.style.display = 'none';
    currentMeta = {
      fileSize: 1.87 * 1024 * 1024, fileType: 'audio/mpeg',
      httpStatus: 200, httpStatusText: 'OK',
      responseSize: 4.2 * 1024, processingMs: 2660,
    };
    renderDeepfakeResults(DEMO_DATA, DEMO_AUDIO_URL);
  } else if (initMode === 'redaction') {
    // Redaction init
    deepfakeContent.style.display = 'none';
    resultsVerdict.style.display = 'none';
    transcriptContainer.classList.remove('visible');
    resultsSidebar.classList.remove('visible');
    sttOptions.classList.remove('visible');
    redactionContent.style.display = 'block';
    redactionSidebar.classList.add('visible');
    redactionOptions.classList.add('visible');
    if (recordAction) { recordAction.style.display = ''; recordAction.classList.add('disabled-soon'); }
    if (streamDemoAction) streamDemoAction.style.display = 'none';
    if (streamFileAction) streamFileAction.style.display = 'none';
    if (playerEntryOriginal) playerEntryOriginal.style.display = '';
    if (redactedLabel) redactedLabel.style.display = '';
    redactionData = DEMO_REDACTION_DATA;
    currentData = DEMO_REDACTION_DATA;
    currentMeta = {
      fileSize: 1958055, fileType: 'audio/mpeg',
      httpStatus: 200, httpStatusText: 'OK',
      responseSize: JSON.stringify(DEMO_REDACTION_DATA).length, processingMs: 2800,
    };
    resultsFilename.textContent = DEMO_REDACTION_DATA.filename || 'AIAgentFrustration.mp3';
    resultsAudio.src = DEMO_REDACTION_AUDIO_URL;
    if (originalAudio) originalAudio.src = DEMO_REDACTION_ORIGINAL_AUDIO_URL;
    const initRanges = DEMO_REDACTION_DATA.redaction_ranges || [];
    const initDurMs = DEMO_REDACTION_DATA.duration_ms || 0;
    renderRedactionTimeline(initRanges, initDurMs);
    renderRedactionTranscript(DEMO_REDACTION_DATA.utterances || []);
    renderRedactionSidebar(initRanges, initDurMs);
    if (initDurMs) {
      setupRedactionPlaybackTracking(initDurMs);
      setupRedactionTranscriptTracking(DEMO_REDACTION_DATA.utterances || []);
    }
  } else {
    // Transcription init (default)
    deepfakeContent.style.display = 'none';
    resultsVerdict.style.display = 'none';
    redactionContent.style.display = 'none';
    transcriptContainer.classList.add('visible');
    resultsSidebar.classList.add('visible');
    sttOptions.classList.add('visible');
    if (recordAction) {
      recordAction.classList.remove('disabled-soon');
      recordAction.querySelector('span').textContent = 'Start streaming';
    }

    sttData = DEMO_STT_DATA;
    currentData = DEMO_STT_DATA;
    sttUtterances = DEMO_STT_DATA.utterances || [];
    sttPartial = null;
    currentMeta = {
      fileSize: 1958055, fileType: 'audio/mpeg',
      httpStatus: 200, httpStatusText: 'OK',
      responseSize: JSON.stringify(DEMO_STT_DATA).length, processingMs: 2660,
    };
    resultsFilename.textContent = DEMO_STT_DATA.filename || 'AIAgentFrustration.mp3';
    resultsAudio.src = DEMO_STT_AUDIO_URL;
    renderTranscript();
  }

  // Replace initial state so back button works
  const initPath = initMode === 'deepfake' ? '/deepfake' : initMode === 'redaction' ? '/redaction' : '/transcription';
  history.replaceState({ mode: initMode }, '', initPath + location.search);
})();
