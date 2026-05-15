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
  let lastMusicData = null;
  let lastMusicAudioUrl = null;
  let lastMusicMeta = null;
  let lastLanguageData = null;
  let lastLanguageAudioUrl = null;
  let lastLanguageMeta = null;
  let lastLanguageFilename = null;
  let musicPlaybackTracker = null;
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

  // ── Mobile layout ───────────────────────────────────────────────────────────
  const resultsLayout   = document.querySelector('.results-layout');
  const resultsMain     = document.querySelector('.results-main');
  const histogramSection = document.querySelector('.histogram-section');

  function applyMobileLayout(isMobile) {
    if (!resultsLayout || !resultsMain) return;
    if (currentMode === 'deepfake' && resultsVerdict && histogramSection) {
      if (isMobile) resultsMain.insertBefore(resultsVerdict, histogramSection);
      else resultsLayout.appendChild(resultsVerdict);
    } else if (currentMode === 'music' && musicSidebar && musicContent) {
      if (isMobile) resultsMain.insertBefore(musicSidebar, musicContent);
      else resultsLayout.appendChild(musicSidebar);
    } else if (currentMode === 'language' && languageSidebar && languageContent) {
      if (isMobile) resultsMain.insertBefore(languageSidebar, languageContent);
      else resultsLayout.appendChild(languageSidebar);
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
    const isMusic       = mode === 'music';
    const isLanguage    = mode === 'language';
    const isTranscription = mode === 'transcription';
    const isVelma       = mode === 'velma';

    // Update URL
    const targetPath = isDeepfake ? '/deepfake'
      : isRedaction ? '/redaction'
      : isMusic ? '/music'
      : isLanguage ? '/language'
      : isVelma ? '/velma'
      : '/transcription';
    if (pushUrl !== false && location.pathname !== targetPath) {
      history.pushState({ mode: mode }, '', targetPath + location.search);
      try {
        const beaconUrl = `/api/track-view?path=${encodeURIComponent(targetPath)}`;
        if (navigator.sendBeacon) navigator.sendBeacon(beaconUrl);
        else fetch(beaconUrl, { method: 'POST', keepalive: true }).catch(() => {});
      } catch (e) {}
    }

    deepfakeContent.style.display = isDeepfake ? '' : 'none';
    resultsVerdict.style.display = isDeepfake ? '' : 'none';
    // Velma reuses the transcription stt-chart + transcript-list, so show it in both modes.
    transcriptContainer.classList.toggle('visible', isTranscription || isVelma);
    resultsSidebar.classList.toggle('visible', isTranscription);
    sttOptions.classList.toggle('visible', isTranscription);
    redactionContent.style.display = isRedaction ? 'block' : 'none';
    redactionSidebar.classList.toggle('visible', isRedaction);
    redactionOptions.classList.toggle('visible', isRedaction);
    if (musicContent) musicContent.style.display = isMusic ? '' : 'none';
    if (musicSidebar) musicSidebar.style.display = isMusic ? '' : 'none';
    if (languageContent) languageContent.classList.toggle('visible', isLanguage);
    if (languageSidebar) languageSidebar.style.display = isLanguage ? '' : 'none';
    if (velmaContent) velmaContent.classList.toggle('visible', isVelma);
    if (velmaSidebar) velmaSidebar.classList.toggle('visible', isVelma);
    if (velmaOptions) velmaOptions.classList.toggle('visible', isVelma);
    if (velmaDemoAction) velmaDemoAction.style.display = isVelma ? '' : 'none';
    if (playerEntryOriginal) playerEntryOriginal.style.display = isRedaction ? '' : 'none';
    if (redactedLabel) redactedLabel.style.display = isRedaction ? '' : 'none';
    if (streamDemoAction) streamDemoAction.style.display = (isTranscription || isMusic) ? '' : 'none';
    if (streamFileAction) streamFileAction.style.display = (isTranscription || isMusic) ? '' : 'none';
    if (recordAction) {
      // Velma + redaction + language are batch-only — hide live record.
      recordAction.style.display = (isVelma || isRedaction || isLanguage) ? 'none' : '';
      recordAction.classList.toggle('disabled-soon', isRedaction);
    }
    renderDebugPanel(true);

    // Stop any running animation frame trackers
    if (playbackTracker) { cancelAnimationFrame(playbackTracker); playbackTracker = null; }
    if (sttChartTracker) { cancelAnimationFrame(sttChartTracker); sttChartTracker = null; }
    if (redactionPlaybackTracker) { cancelAnimationFrame(redactionPlaybackTracker); redactionPlaybackTracker = null; }
    if (redactionTranscriptTracker) { cancelAnimationFrame(redactionTranscriptTracker); redactionTranscriptTracker = null; }
    if (musicPlaybackTracker) { cancelAnimationFrame(musicPlaybackTracker); musicPlaybackTracker = null; }

    if (recordAction) {
      recordAction.classList.toggle('disabled-soon', isRedaction);
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
      applyMobileLayout(mobileQuery.matches);
    } else if (isLanguage) {
      if (lastLanguageData) {
        currentData = lastLanguageData;
        currentMeta = lastLanguageMeta || {};
        resultsFilename.textContent = lastLanguageFilename || '';
        if (lastLanguageAudioUrl) resultsAudio.src = lastLanguageAudioUrl;
        renderLanguageResult(lastLanguageData);
      } else {
        resetLanguageHero();
      }
      applyMobileLayout(mobileQuery.matches);
    } else if (isVelma) {
      if (lastVelmaData) {
        velmaData = lastVelmaData;
        currentData = lastVelmaData;
        currentMeta = lastVelmaMeta || {};
        resultsFilename.textContent = lastVelmaFilename || '';
        if (lastVelmaAudioUrl) resultsAudio.src = lastVelmaAudioUrl;
        renderVelmaResults(lastVelmaData);
      } else if (DEMO_VELMA_DATA) {
        renderVelmaDemo();
      } else {
        loadDemoVelmaData().then(() => { if (currentMode === 'velma') renderVelmaDemo(); });
        clearVelmaResults();
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
  });
  richOpts.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) optFast.checked = false;
    });
  });

  function isFastMode() { return optFast.checked; }

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
        else if (currentMode === 'music') startMusicRecording();
        else startTranscriptionRecording();
      }
    });
  }

  if (streamDemoAction) {
    streamDemoAction.addEventListener('click', () => {
      if (isRecording) { stopRecording(); return; }
      if (currentMode === 'music') startMusicDemoStream();
      else startTranscriptionDemoStream();
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
        if (currentMode === 'music') startMusicFileStream(streamFileInput.files[0]);
        else startTranscriptionFileStream(streamFileInput.files[0]);
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
    if (!langHeroFlag) return;
    langHeroFlag.textContent = '\u{1F310}';
    langHeroName.textContent = '—';
    langHeroCode.textContent = 'Upload an audio clip to detect its language';
    langHeroConfRow.style.display = 'none';
    langHeroConfVal.classList.remove('low');
    langHeroConfVal.textContent = '—';
    langHeroMeta.textContent = '';
    langHeroWarning.style.display = 'none';
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

    langHeroFlag.textContent = flagForLanguage(code);
    langHeroName.textContent = name;
    langHeroCode.textContent = code ? code.toUpperCase() : '—';

    langHeroConfRow.style.display = '';
    const pct = Math.max(0, Math.min(1, conf));
    langHeroConfVal.textContent = (pct * 100).toFixed(1) + '%';
    langHeroConfVal.classList.toggle('low', conf < 0.5);

    const parts = [];
    if (durMs != null) {
      const secs = (durMs / 1000).toFixed(1);
      parts.push(`Audio: ${secs} s`);
      if (durMs > 30000) parts.push('first 30 s analyzed');
    }
    // Processing time is captured per-request in currentMeta and persisted in
    // lastLanguageMeta, so it survives mode-switches too.
    const procMs = currentMeta && currentMeta.processingMs;
    if (procMs) {
      parts.push(`Processed in ${(procMs / 1000).toFixed(2)} s`);
      // Compare against the actually-analyzed audio (capped at 30 s) for an
      // honest real-time multiplier — otherwise a 5-minute clip would show
      // a misleading 200x factor when the model only looked at 30 s.
      if (durMs != null) {
        const analyzedMs = Math.min(durMs, 30000);
        const factor = analyzedMs / procMs;
        if (factor > 0 && isFinite(factor)) {
          parts.push(`${factor.toFixed(1)}× real-time`);
        }
      }
    }
    langHeroMeta.textContent = parts.join(' · ');

    langHeroWarning.style.display = conf < 0.5 ? '' : 'none';
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
    const label = (data.primary_label || 'unknown').toLowerCase();
    musicVerdictRing.className = 'verdict-ring ' + label;

    const ICONS = {
      music:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
      speech:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
      neither: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
      unknown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    };
    musicVerdictIcon.innerHTML = ICONS[label] || ICONS.unknown;

    const TEXT = { music: 'Music', speech: 'Speech', neither: 'Neither', unknown: 'Unknown' };
    musicVerdictLabel.textContent = TEXT[label] || 'Unknown';

    const musicPct = (data.music_pct != null) ? data.music_pct : 0;
    const speechPct = (data.speech_pct != null) ? data.speech_pct : 0;
    musicVerdictSplit.innerHTML =
      '<div class="verdict-ring-split-item music"><span class="v">' + musicPct.toFixed(0) + '%</span><span class="l">Music</span></div>' +
      '<div class="verdict-ring-split-item speech"><span class="v">' + speechPct.toFixed(0) + '%</span><span class="l">Speech</span></div>';
  }

  // Build the cells we'll render based on current view + available width.
  // Returns { cells, fit } where fit=true means cells fill the container width
  // (heatmap mode); fit=false means fixed-width cells with possible scroll.
  function buildMusicCells(frames, view) {
    if (!frames.length) return { cells: [], fit: false };

    const DETAILED_PX = 11;       // legacy fixed width
    const HEATMAP_TARGET_PX = 6;  // ideal cell width when there's room
    const HEATMAP_MIN_PX = 2;     // smallest readable cell

    if (view === 'detailed') {
      const cells = frames.map((f, i) => ({
        cellWidth: DETAILED_PX,
        music: f.music_prob,
        speech: f.speech_prob,
        startMs: f.start_time_s * 1000,
        endMs: f.end_time_s * 1000,
        firstFrameIdx: i,
        lastFrameIdx: i,
        groupSize: 1,
      }));
      return { cells, fit: false };
    }

    // Heatmap: fit to container
    const containerWidth = musicHistogramFit
      ? musicHistogramFit.clientWidth - rowLabelOffsetPx() - 2  // -2 for safe rounding
      : 800;
    const W = Math.max(200, containerWidth);

    if (frames.length * HEATMAP_TARGET_PX <= W) {
      // Plenty of room: one cell per frame at target width
      const cells = frames.map((f, i) => ({
        cellWidth: HEATMAP_TARGET_PX,
        music: f.music_prob,
        speech: f.speech_prob,
        startMs: f.start_time_s * 1000,
        endMs: f.end_time_s * 1000,
        firstFrameIdx: i,
        lastFrameIdx: i,
        groupSize: 1,
      }));
      return { cells, fit: true };
    }

    // Aggregate: max-pool adjacent frames so cells get at least MIN_CELL_PX wide
    const maxCells = Math.max(1, Math.floor(W / HEATMAP_MIN_PX));
    const groupSize = Math.ceil(frames.length / maxCells);
    const numCells = Math.ceil(frames.length / groupSize);
    const cellWidth = Math.max(HEATMAP_MIN_PX, Math.floor(W / numCells));
    const cells = [];
    for (let g = 0; g < numCells; g++) {
      const start = g * groupSize;
      const end = Math.min(start + groupSize, frames.length);
      let mMax = 0, sMax = 0;
      for (let k = start; k < end; k++) {
        if (frames[k].music_prob  > mMax) mMax = frames[k].music_prob;
        if (frames[k].speech_prob > sMax) sMax = frames[k].speech_prob;
      }
      cells.push({
        cellWidth,
        music: mMax,
        speech: sMax,
        startMs: frames[start].start_time_s * 1000,
        endMs:   frames[end - 1].end_time_s * 1000,
        firstFrameIdx: start,
        lastFrameIdx: end - 1,
        groupSize: end - start,
      });
    }
    return { cells, fit: true };
  }

  // Width of the row label slot (e.g. "MUSIC") so the bars fill the rest.
  // Falls back to 4.1rem ≈ 65.6px (3.5rem label + 0.6rem gap).
  function rowLabelOffsetPx() {
    const root = document.documentElement;
    const fs = parseFloat(getComputedStyle(root).fontSize) || 16;
    return Math.round(4.1 * fs);
  }

  function renderMusicHistogram(frames) {
    musicHistogram.innerHTML = '';
    if (!frames.length) { musicCells = []; return; }

    const { cells, fit } = buildMusicCells(frames, musicView);
    musicCells = cells;

    if (musicHistogramFit) musicHistogramFit.classList.toggle('scrollable', !fit);

    musicHistogram.appendChild(buildMusicRow('music',  'Music',  cells, fit));
    musicHistogram.appendChild(buildMusicRow('speech', 'Speech', cells, fit));
    musicHistogram.appendChild(buildMusicAxis(frames, fit));
  }

  function buildMusicRow(kind, label, cells, fit) {
    const row = document.createElement('div');
    row.className = 'music-histo-row';
    const lbl = document.createElement('div');
    lbl.className = 'music-histo-row-label ' + kind;
    lbl.textContent = label;
    const bars = document.createElement('div');
    bars.className = 'music-histo-row-bars' + (fit ? ' fit' : '');
    cells.forEach((cell, ci) => bars.appendChild(makeMusicCellBar(kind, cell, ci, fit)));
    row.appendChild(lbl);
    row.appendChild(bars);
    return row;
  }

  function makeMusicCellBar(kind, cell, cellIndex, fit) {
    const prob = kind === 'music' ? cell.music : cell.speech;
    const bar = document.createElement('div');
    bar.className = 'histo-bar ' + kind;
    bar.dataset.cellIndex = cellIndex;
    if (fit) {
      // Heatmap: stretch equally so cells fill the row width
      bar.style.flex = '1 1 0';
      bar.style.width = 'auto';
      bar.style.minWidth = '0';
    } else {
      bar.style.flex = '0 0 ' + cell.cellWidth + 'px';
      bar.style.width = cell.cellWidth + 'px';
    }
    bar.style.aspectRatio = 'auto';
    bar.style.height = '22px';
    const alpha = Math.max(0.12, Math.pow(prob, 1.4));
    const rgb = kind === 'music' ? '124,58,237' : '20,184,166';
    bar.style.background = 'rgba(' + rgb + ',' + alpha.toFixed(3) + ')';

    const labelWord = kind === 'music' ? 'Music' : 'Speech';
    const labelColor = kind === 'music' ? 'rgb(196,167,255)' : 'rgb(110,232,212)';
    const groupNote = cell.groupSize > 1
      ? ' <span style="opacity:0.6">(max of ' + cell.groupSize + ' frames)</span>'
      : '';
    const tooltipHtml =
      formatMs(cell.startMs) + ' – ' + formatMs(cell.endMs) +
      ' <span style="color:' + labelColor + '">· <span style="font-weight:700">' + labelWord + '</span> ' +
      (prob * 100).toFixed(1) + '%</span>' + groupNote;

    bar.addEventListener('mouseenter', () => {
      const rect = bar.getBoundingClientRect();
      histoTooltip.innerHTML = tooltipHtml;
      histoTooltip.style.display = 'block';
      histoTooltip.style.top = (rect.top - 6) + 'px';
      histoTooltip.style.left = (rect.left + rect.width / 2) + 'px';
      histoTooltip.style.transform = 'translate(-50%, -100%)';
    });
    bar.addEventListener('mouseleave', () => { histoTooltip.style.display = 'none'; });
    bar.addEventListener('click', () => seekToMusic(cell.startMs, cell.firstFrameIdx));
    return bar;
  }

  // Adaptive time axis: pick a tick interval producing 5–10 ticks total.
  function buildMusicAxis(frames, fit) {
    const axisRow = document.createElement('div');
    axisRow.className = 'histo-axis music-histo-axis' + (fit ? '' : ' gapped');
    if (!frames.length) return axisRow;

    const lastFrame = frames[frames.length - 1];
    const totalMs = lastFrame.end_time_s * 1000;

    if (fit) {
      // Heatmap: position absolute, percentage-based
      const intervalMs = pickAxisIntervalMs(totalMs);
      let lastTickMs = 0;
      for (let t = 0; t <= totalMs; t += intervalMs) {
        const tick = document.createElement('span');
        tick.className = 'music-histo-axis-tick-abs';
        if (t === 0) tick.classList.add('first');
        tick.style.left = ((t / totalMs) * 100).toFixed(3) + '%';
        tick.textContent = formatSecCompact(t);
        axisRow.appendChild(tick);
        lastTickMs = t;
      }
      // Final tick at duration end (only if far enough from previous)
      if (totalMs - lastTickMs > intervalMs * 0.7) {
        const endTick = document.createElement('span');
        endTick.className = 'music-histo-axis-tick-abs last';
        endTick.style.left = '100%';
        endTick.textContent = formatSecCompact(totalMs);
        axisRow.appendChild(endTick);
      }
    } else {
      // Detailed: legacy per-frame ticks every 5 frames
      frames.forEach((frame, i) => {
        const tick = document.createElement('div');
        tick.className = 'histo-tick';
        if (i % 5 === 0) tick.textContent = formatSecCompact(frame.start_time_s * 1000);
        axisRow.appendChild(tick);
      });
    }
    return axisRow;
  }

  function pickAxisIntervalMs(totalMs) {
    const totalS = totalMs / 1000;
    const candidates = [1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 1200];
    for (const sec of candidates) {
      if (totalS / sec <= 8) return sec * 1000;
    }
    return 1800 * 1000;
  }

  // Build table rows. In 'detailed' view: one row per ~192ms frame. In 'heatmap' view:
  // bucket frames into 1-second groups, max-pooling music/speech probabilities. Each row
  // tracks its underlying frame-index range so click/seek and playback tracking work in
  // both modes.
  function renderMusicTable(frames, view) {
    musicTbody.innerHTML = '';
    if (!frames.length) return;

    let groups;
    if (view === 'detailed') {
      groups = frames.map((f, i) => ({
        startMs: f.start_time_s * 1000,
        endMs:   f.end_time_s   * 1000,
        music:   f.music_prob,
        speech:  f.speech_prob,
        firstFrameIdx: i,
        lastFrameIdx:  i,
      }));
    } else {
      const BUCKET_MS = 1000;
      groups = [];
      let i = 0;
      while (i < frames.length) {
        const startMs = frames[i].start_time_s * 1000;
        const bucketEndMs = Math.floor(startMs / BUCKET_MS + 1) * BUCKET_MS;
        let j = i;
        let mMax = 0, sMax = 0;
        while (j < frames.length && frames[j].start_time_s * 1000 < bucketEndMs) {
          if (frames[j].music_prob  > mMax) mMax = frames[j].music_prob;
          if (frames[j].speech_prob > sMax) sMax = frames[j].speech_prob;
          j++;
        }
        groups.push({
          startMs,
          endMs: frames[j - 1].end_time_s * 1000,
          music: mMax,
          speech: sMax,
          firstFrameIdx: i,
          lastFrameIdx:  j - 1,
        });
        i = j;
      }
    }

    groups.forEach((g) => {
      const tr = document.createElement('tr');
      tr.dataset.firstFrame = g.firstFrameIdx;
      tr.dataset.lastFrame  = g.lastFrameIdx;

      const tdTime = document.createElement('td');
      tdTime.textContent = formatSecPrecise(g.startMs / 1000) + ' – ' + formatSecPrecise(g.endMs / 1000);

      tr.appendChild(tdTime);
      tr.appendChild(buildProbCell(g.music, 'music'));
      tr.appendChild(buildProbCell(g.speech, 'speech'));
      tr.addEventListener('click', () => seekToMusic(g.startMs, g.firstFrameIdx));
      musicTbody.appendChild(tr);
    });
  }

  function buildProbCell(prob, kind) {
    const td = document.createElement('td');
    const wrap = document.createElement('div');
    wrap.className = 'confidence-cell';
    const track = document.createElement('div');
    track.className = 'confidence-bar-track';
    const fill = document.createElement('div');
    fill.className = 'confidence-bar-fill ' + kind;
    fill.style.width = (prob * 100) + '%';
    track.appendChild(fill);
    const text = document.createElement('span');
    text.textContent = (prob * 100).toFixed(1) + '%';
    wrap.appendChild(track);
    wrap.appendChild(text);
    td.appendChild(wrap);
    return td;
  }

  // Highlight whatever histogram cell + table row contain `frameIdx` (a representative
  // underlying frame index). Used by both click-to-seek and playback tracking so the two
  // views stay in sync regardless of grouping.
  function seekToMusic(startMs, frameIdx) {
    if (resultsAudio) {
      resultsAudio.currentTime = startMs / 1000;
      resultsAudio.play().catch(() => {});
    }
    let activeCellIdx = -1;
    for (let c = 0; c < musicCells.length; c++) {
      if (frameIdx >= musicCells[c].firstFrameIdx && frameIdx <= musicCells[c].lastFrameIdx) {
        activeCellIdx = c;
        break;
      }
    }
    musicHistogram.querySelectorAll('.histo-bar').forEach((bar) => {
      bar.classList.toggle('active', Number(bar.dataset.cellIndex) === activeCellIdx);
    });
    musicTbody.querySelectorAll('tr').forEach((row) => {
      const first = Number(row.dataset.firstFrame);
      const last  = Number(row.dataset.lastFrame);
      row.classList.toggle('active', frameIdx >= first && frameIdx <= last);
    });
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
      // Map active frame to its containing cell (in current view)
      let activeCellIdx = -1;
      if (activeFrameIdx >= 0 && musicCells.length) {
        for (let c = 0; c < musicCells.length; c++) {
          if (activeFrameIdx >= musicCells[c].firstFrameIdx && activeFrameIdx <= musicCells[c].lastFrameIdx) {
            activeCellIdx = c;
            break;
          }
        }
      }
      musicHistogram.querySelectorAll('.histo-bar').forEach((bar) => {
        bar.classList.toggle('active', Number(bar.dataset.cellIndex) === activeCellIdx);
      });
      musicTbody.querySelectorAll('tr').forEach((row) => {
        const first = Number(row.dataset.firstFrame);
        const last  = Number(row.dataset.lastFrame);
        row.classList.toggle('active', activeFrameIdx >= first && activeFrameIdx <= last);
      });
      musicPlaybackTracker = requestAnimationFrame(tick);
    }
    musicPlaybackTracker = requestAnimationFrame(tick);
  }

  // Toggle handler
  musicViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view === musicView) return;
      musicView = view;
      musicViewBtns.forEach(b => b.classList.toggle('active', b.dataset.view === view));
      if (currentMode === 'music' && currentData && currentData.frames) {
        renderMusicHistogram(currentData.frames);
        renderMusicTable(currentData.frames, musicView);
      }
    });
  });

  // Re-layout heatmap when the container width changes (window resize, sidebar reflow)
  if (window.ResizeObserver && musicHistogramFit) {
    let resizeRaf = null;
    musicResizeObserver = new ResizeObserver(() => {
      if (currentMode !== 'music') return;
      if (musicView !== 'heatmap') return;
      if (!currentData || !currentData.frames) return;
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => renderMusicHistogram(currentData.frames));
    });
    musicResizeObserver.observe(musicHistogramFit);
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
    return isFastMode() ? '/api/velma-2-stt-streaming-v2' : '/api/velma-2-stt-streaming';
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
  document.getElementById('btn-show-stats-music').addEventListener('click', () => showStatsModal());
  document.getElementById('btn-show-json-music').addEventListener('click', () => showJsonModal());
  document.getElementById('btn-show-stats-language').addEventListener('click', () => showStatsModal());
  document.getElementById('btn-show-json-language').addEventListener('click', () => showJsonModal());

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

  // ══════════════════════════════════════════════════════════════════════════
  // ── VELMA MODE (ensemble listening: clips + behaviors + summary + topics)
  // ══════════════════════════════════════════════════════════════════════════

  const DEMO_VELMA_AUDIO_URL = '/deepfake/call-center-demo.mp3';
  const DEMO_VELMA_DATA_URL = '/velma-demo-data.json';
  let DEMO_VELMA_DATA = null;

  // Curated library of selectable conversation types. UUIDs are stable.
  const VELMA_CONV_TYPE_LIBRARY = [
    {
      conversation_type_uuid: '11111111-1111-4111-8111-111111111001',
      name: 'Customer Service Call',
      short_description: 'A phone call between a customer and a service representative.',
      detailed_description: 'An inbound or outbound voice call where one participant (the Customer Service Representative) is acting on behalf of a company to assist or resolve issues raised by another participant (the Customer). Typically includes greeting and identification, issue identification, troubleshooting or resolution attempt, and closure. Should not include automated IVR-only conversations with no human agent.',
    },
    {
      conversation_type_uuid: '11111111-1111-4111-8111-111111111002',
      name: 'Sales Call',
      short_description: 'A sales conversation between a representative and a prospect.',
      detailed_description: 'An outbound or inbound voice call where a sales representative presents, discusses, or attempts to close a transaction with a prospect or potential customer. Typically includes discovery, presentation, objection handling, and a call-to-action.',
    },
    {
      conversation_type_uuid: '11111111-1111-4111-8111-111111111003',
      name: 'AI Agent Customer Support Call',
      short_description: 'A customer support call handled by an AI voice agent.',
      detailed_description: 'A voice call where one participant is an AI-powered voice agent handling customer support requests (IVR with NLU, conversational AI, voicebot). The AI agent attempts to identify the caller, understand the request, and provide self-service resolution or escalate to a human.',
    },
    {
      conversation_type_uuid: '11111111-1111-4111-8111-111111111004',
      name: 'Technical Support Call',
      short_description: 'A technical support call about a product or service.',
      detailed_description: 'A voice call where a support specialist troubleshoots a product or service issue with a user. Typically follows: issue identification, diagnostic questions, attempted fixes, and resolution or escalation.',
    },
  ];

  const VELMA_ROLE_LIBRARY = [
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
      detailed_description: 'The company representative handling the call. CSRs greet the caller, verify identity, gather details, follow scripts and processes, troubleshoot, and attempt to resolve the customer\'s issue. They use professional, procedural language.',
    },
    {
      participant_role_uuid: '22222222-2222-4222-8222-222222222003',
      name: 'Sales Representative',
      short_description: 'The seller-side participant on a sales call.',
      detailed_description: 'The participant attempting to advance or close a sale. Sales reps qualify, present features and benefits, handle objections, and ask for the close. They typically speak from a sales script or playbook.',
    },
    {
      participant_role_uuid: '22222222-2222-4222-8222-222222222004',
      name: 'Prospect',
      short_description: 'A potential buyer being sold to.',
      detailed_description: 'The participant being sold to who has not yet purchased. Prospects ask questions about the product, raise objections, and signal interest or disinterest. They are not bound by a sales script.',
    },
    {
      participant_role_uuid: '22222222-2222-4222-8222-222222222005',
      name: 'AI Agent',
      short_description: 'An AI-powered voice agent on the call.',
      detailed_description: 'A non-human participant. AI agents follow a structured prompt or playbook, use natural speech, and may struggle with off-script or ambiguous user input. Often introduces itself as a virtual assistant.',
    },
  ];

  const VELMA_BEHAVIOR_LIBRARY = [
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333001',
      name: 'Issue Resolved',
      short_description: 'Customer\'s problem successfully addressed before the conversation ends.',
      detailed_description: 'Present if all of these hold: (1) the customer\'s stated issue is referenced; (2) the representative confirms a concrete resolution OR the customer explicitly acknowledges the issue is resolved; (3) closure cues are present (e.g., "that\'s all set", "is there anything else?"). Should not be flagged if the customer ends the call still expressing frustration with the same issue, or if resolution is contingent on a future event with no commitment made.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333002',
      name: 'Issue Not Resolved',
      short_description: 'Customer\'s problem remains unaddressed at the close of the conversation.',
      detailed_description: 'Present if: (1) the customer\'s stated issue is referenced; (2) the representative fails to provide a concrete resolution and makes no firm follow-up commitment, OR the customer explicitly states the issue is unresolved. Should not be flagged if the issue is resolved, the call ends with a clear follow-up commitment, or the concern was a clarifying question rather than a problem requiring resolution.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333003',
      name: 'Complaints',
      short_description: 'Customer expresses dissatisfaction with a product, service, or experience.',
      detailed_description: 'Present if the customer\'s speech contains (1) a statement attributing a negative outcome to the company, AND (2) explicit dissatisfaction markers such as evaluative phrases ("this is unacceptable", "I\'m disappointed", "this is ridiculous") or negative adjectives applied to the product/service ("broken", "useless"). Should not be flagged when the customer is calmly reporting a fact, asking a question, or describing a third-party experience.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333006',
      name: 'Customer Gratitude',
      short_description: 'Customer expresses sincere thanks or appreciation toward the representative.',
      detailed_description: 'Present if the customer\'s speech contains an explicit expression of gratitude beyond a perfunctory call-closing "thanks" — e.g., specific acknowledgment of the representative\'s effort, naming what the rep did well, or warm prosody markers around the thanks. Should not be flagged for terse, scripted "thank you" responses at the end of a call.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333007',
      name: 'Rapport Building',
      short_description: 'Participants establish a positive social connection beyond the transactional task.',
      detailed_description: 'Present if speech contains at least two of: (1) personal small talk unrelated to the task (weather, weekend, sports); (2) named-acknowledgment ("thanks, Sarah", "I appreciate that, John"); (3) shared-experience statements ("I had that happen too"); (4) warm prosody markers — laughter, friendly pacing. Should not be flagged for perfunctory greetings or single-word affirmations.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333008',
      name: 'Action Plan Created',
      short_description: 'Participants agree on a concrete next-step plan with owner and timing.',
      detailed_description: 'Present if speech contains an explicit articulation of a future action that names (1) what will happen, (2) who will do it, and (3) approximately when. Examples: "I\'ll send the appeal form to your email by Friday", "we will follow up Tuesday at 2pm". Should not be flagged for vague intentions ("we\'ll be in touch") that lack owner or time.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333009',
      name: 'Future Planning',
      short_description: 'Participants discuss plans, intentions, or arrangements for future actions or events.',
      detailed_description: 'Present if speech contains forward-looking statements about non-immediate actions — schedule discussions, contingency planning, follow-up arrangements. Distinct from Action Plan Created in that it covers planning discourse without requiring owner/time commitments. Should not be flagged for present-tense procedural statements about what is being done in the moment.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333010',
      name: 'Unaddressed Question',
      short_description: 'A direct question is asked but goes unanswered or receives a non-answer.',
      detailed_description: 'Present if all hold: (1) speech contains a direct interrogative from one participant; (2) the response either changes the subject, gives a vague non-answer ("we\'re looking into it", "that\'s a good question"), or no response is offered before the conversation moves on. Should not be flagged for follow-up questions used to clarify before answering.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333004',
      name: 'Coercion Manipulation',
      short_description: 'Social engineering through intimidation, threats, or dominance pressure.',
      detailed_description: 'Present if the speech meets at least two of: (1) explicit threats of negative consequences toward the other participant or company (escalation, legal action, defamation); (2) commands or ultimatums in dominance-oriented tone ("you will do X", "I won\'t leave until"); (3) reduced empathy markers — no acknowledgment of the other party\'s constraints; (4) pressure timing — sustained insistence without pause. Should not be flagged for normal escalation requests or polite firm requests.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333011',
      name: 'Bargaining Manipulation',
      short_description: 'Persuasion through cajoling, false urgency, or strategic emotional pressure.',
      detailed_description: 'Present if speech contains at least two of: (1) pressure-based phrasing without explicit threat ("just this once", "between you and me", "if you really cared"); (2) strategic silence or pacing changes to extract concessions; (3) inconsistent emotional framing (alternating warmth and coldness); (4) appeals to non-procedural reasons for an exception. Should not be flagged for ordinary requests for accommodation.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333012',
      name: 'Threat-based Harassment',
      short_description: 'Targeted threats toward an individual in a professional context.',
      detailed_description: 'Present if speech contains: (1) explicit verbal threats directed at the other participant — physical harm, doxxing, retaliation, or harm to family/career; (2) sustained hostile prosody (aggressive volume, growling, snarling tone); (3) personalized language ("you specifically", "I know where you"). Should not be flagged for statements about pursuing legitimate channels (escalation, complaints, legal action), even when emotionally charged.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333013',
      name: 'Vishing',
      short_description: 'Voice phishing — impersonation to extract credentials or sensitive information.',
      detailed_description: 'Present if speech contains at least two of: (1) the speaker requests credentials, access codes, or authentication factors they should not need (e.g., asking the agent to read out the customer\'s full SSN); (2) urgent framing ("this needs to be resolved immediately or your account will be closed"); (3) impersonation cues — claiming to be from internal IT, fraud team, or executive without verifying identity; (4) abnormal call-center background, stress markers, or scripted-but-mismatched pacing. Should not be flagged for legitimate caller verification questions from the agent side.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333014',
      name: 'Return Fraud Attempt',
      short_description: 'Customer attempting a fraudulent product return or refund.',
      detailed_description: 'Present if speech contains: (1) inconsistencies in the stated reason for return that the customer steers around when probed; (2) scripted or rehearsed explanations with low affective variation; (3) attempts to bypass normal return procedures (e.g., refusing to provide an order number, demanding immediate refund without inspection); (4) suspicious timing relative to the original purchase. Should not be flagged for legitimate refund requests where the customer cooperates with verification.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333005',
      name: 'Inappropriate Speech',
      short_description: 'Unprofessional or unsuitable spoken content for the conversation context.',
      detailed_description: 'Present if speech contains at least one of: (1) profanity, slurs, or sexually-suggestive content; (2) personal remarks targeting another participant\'s identity, appearance, intelligence, or competence ("you\'re stupid", "you people"); (3) hostile prosody markers — yelling, sarcasm-as-mockery, contempt — combined with boundary-crossing content. Should not be flagged for firm professional disagreement or product-directed complaints that don\'t target a person.',
    },
    {
      behavior_uuid: '33333333-3333-4333-8333-333333333015',
      name: 'Sexual Harassment',
      short_description: 'Unwanted sexual advances, remarks, or content directed at a participant.',
      detailed_description: 'Present if speech contains: (1) sexually-suggestive or explicit remarks directed at the other participant; (2) repeated personal compliments about appearance after the recipient signals disinterest; (3) propositions, invitations, or boundary-crossing personal questions. Should not be flagged for incidental references to relationships or sexuality unrelated to the recipient.',
    },
  ];

  // Default selection (UUIDs into the libraries above)
  const DEFAULT_SELECTED_CONV_TYPE = '11111111-1111-4111-8111-111111111001';
  const DEFAULT_SELECTED_ROLE_UUIDS = [
    '22222222-2222-4222-8222-222222222001',
    '22222222-2222-4222-8222-222222222002',
  ];
  const DEFAULT_SELECTED_BEHAVIOR_UUIDS = [
    '33333333-3333-4333-8333-333333333001', // Issue Resolved
    '33333333-3333-4333-8333-333333333002', // Issue Not Resolved
    '33333333-3333-4333-8333-333333333003', // Complaints
    '33333333-3333-4333-8333-333333333004', // Coercion Manipulation
    '33333333-3333-4333-8333-333333333005', // Inappropriate Speech
  ];

  function buildDefaultVelmaConfig() {
    return {
      conversation_types: VELMA_CONV_TYPE_LIBRARY
        .filter(c => c.conversation_type_uuid === DEFAULT_SELECTED_CONV_TYPE)
        .map(c => JSON.parse(JSON.stringify(c))),
      participant_roles: VELMA_ROLE_LIBRARY
        .filter(r => DEFAULT_SELECTED_ROLE_UUIDS.includes(r.participant_role_uuid))
        .map(r => JSON.parse(JSON.stringify(r))),
      behaviors: VELMA_BEHAVIOR_LIBRARY
        .filter(b => DEFAULT_SELECTED_BEHAVIOR_UUIDS.includes(b.behavior_uuid))
        .map(b => JSON.parse(JSON.stringify(b))),
      stt: {
        speaker_diarization: true,
        emotion_signal: true,
        accent_signal: true,
        deepfake_signal: false,
        pii_phi_tagging: false,
      },
      produce_topics: true,
      produce_topic_sentiments: true,
      produce_summary: true,
    };
  }

  // Active Velma config (mutable via the editor modal)
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
  const velmaCfgConvSelect   = document.getElementById('velma-cfg-conv-type-select');
  const velmaCfgConvDefn     = document.getElementById('velma-cfg-conv-type-defn');
  const velmaCfgRolesList    = document.getElementById('velma-cfg-roles-list');
  const velmaCfgBehaviorsList= document.getElementById('velma-cfg-behaviors-list');
  const velmaCfgAddRoleBtn   = document.getElementById('velma-cfg-add-role-btn');
  const velmaCfgAddBehaviorBtn = document.getElementById('velma-cfg-add-behavior-btn');
  const velmaCfgRawToggle    = document.getElementById('velma-config-raw-toggle');
  const velmaCfgSttDiar      = document.getElementById('velma-cfg-stt-diar');
  const velmaCfgSttEmot      = document.getElementById('velma-cfg-stt-emot');
  const velmaCfgSttAcc       = document.getElementById('velma-cfg-stt-acc');
  const velmaCfgSttPii       = document.getElementById('velma-cfg-stt-pii');
  const btnShowStatsVelma    = document.getElementById('btn-show-stats-velma');
  const btnShowJsonVelma     = document.getElementById('btn-show-json-velma');
  const btnEditConfigVelma   = document.getElementById('btn-edit-config-velma');

  // Velma state
  let velmaData = null;
  let lastVelmaData = null;
  let lastVelmaAudioUrl = null;
  let lastVelmaMeta = null;
  let lastVelmaFilename = '';
  // Map of clip_uuid → array of detected behavior names attached to that clip.
  // Set when rendering Velma results; consumed by patchVelmaTranscriptBubbles to overlay chips.
  let velmaClipBehaviorsByUuid = {};

  function updateVelmaConfigSummary() {
    if (!velmaConfigSummary) return;
    const c = velmaConfig;
    const nT = (c.conversation_types || []).length + (c.presets || []).length;
    const nR = (c.participant_roles || []).length;
    const nB = (c.behaviors || []).length;
    velmaConfigSummary.textContent =
      `${nT} conversation type${nT === 1 ? '' : 's'} · ${nR} role${nR === 1 ? '' : 's'} · ${nB} behavior${nB === 1 ? '' : 's'}`;
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
      fileSize: 1.7 * 1024 * 1024,
      fileType: 'audio/mpeg',
      httpStatus: 200,
      httpStatusText: 'OK',
      responseSize: JSON.stringify(DEMO_VELMA_DATA).length,
      processingMs: 28000,
    };
    resultsFilename.textContent = DEMO_VELMA_DATA.filename || 'call-center-demo.mp3';
    resultsAudio.src = DEMO_VELMA_AUDIO_URL;
    renderVelmaResults(DEMO_VELMA_DATA);
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
      const configJson = JSON.stringify(velmaConfig);
      const { data, meta } = await uploadAndAnalyze(file, '/api/velma-2-batch', { config: configJson });
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

  // ── Velma Rendering ────────────────────────────────────────────────────────

  function renderVelmaResults(data) {
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
    if (behaviors.length) {
      velmaBehaviorsSection.style.display = '';
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
    const bubbles = transcriptList.querySelectorAll('.transcript-utterance');
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
        const header = bEl.querySelector('.transcript-utterance-header');
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
    const bubble = transcriptList.querySelector(`.transcript-utterance[data-clip-uuid="${clipUuid}"]`);
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
    velmaConfigModal.classList.add('visible');
  }
  function closeVelmaConfigModal() {
    velmaConfigModal.classList.remove('visible');
  }

  // ── Form rendering (left pane) ─────────────────────────────────────────────

  function renderVelmaEditorForm() {
    renderVelmaConvTypeSelect();
    renderVelmaRolesList();
    renderVelmaBehaviorsList();
    renderVelmaSttToggles();
  }

  function renderVelmaConvTypeSelect() {
    if (!velmaCfgConvSelect) return;
    velmaCfgConvSelect.innerHTML = '';
    // Build options: every library entry + any custom conv_types from current config
    const merged = [...VELMA_CONV_TYPE_LIBRARY];
    (velmaConfig.conversation_types || []).forEach(c => {
      if (!merged.find(x => x.conversation_type_uuid === c.conversation_type_uuid)) {
        merged.push({ ...c, __custom: true });
      }
    });
    const activeUuid = (velmaConfig.conversation_types && velmaConfig.conversation_types[0])
      ? velmaConfig.conversation_types[0].conversation_type_uuid : '';
    merged.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.conversation_type_uuid;
      opt.textContent = c.name + (c.__custom ? '  (custom)' : '');
      if (c.conversation_type_uuid === activeUuid) opt.selected = true;
      velmaCfgConvSelect.appendChild(opt);
    });
    const active = merged.find(c => c.conversation_type_uuid === activeUuid);
    velmaCfgConvDefn.textContent = active ? active.detailed_description : '';
  }

  function renderVelmaRolesList() {
    if (!velmaCfgRolesList) return;
    velmaCfgRolesList.innerHTML = '';
    // Build merged list: library + any custom in current config (preserves order)
    const merged = [...VELMA_ROLE_LIBRARY];
    (velmaConfig.participant_roles || []).forEach(r => {
      if (!merged.find(x => x.participant_role_uuid === r.participant_role_uuid)) {
        merged.push({ ...r, __custom: true });
      }
    });
    merged.forEach(r => velmaCfgRolesList.appendChild(buildCfgRow('role', r)));
  }

  function renderVelmaBehaviorsList() {
    if (!velmaCfgBehaviorsList) return;
    velmaCfgBehaviorsList.innerHTML = '';
    const merged = [...VELMA_BEHAVIOR_LIBRARY];
    (velmaConfig.behaviors || []).forEach(b => {
      if (!merged.find(x => x.behavior_uuid === b.behavior_uuid)) {
        merged.push({ ...b, __custom: true });
      }
    });
    merged.forEach(b => velmaCfgBehaviorsList.appendChild(buildCfgRow('behavior', b)));
  }

  function buildCfgRow(kind, entry) {
    // kind: 'role' | 'behavior'
    const uuidField = kind === 'role' ? 'participant_role_uuid' : 'behavior_uuid';
    const listField = kind === 'role' ? 'participant_roles' : 'behaviors';
    const uuid = entry[uuidField];
    const inConfig = (velmaConfig[listField] || []).find(x => x[uuidField] === uuid);
    // Show the user's edited def from config if present; otherwise the library def
    const def = inConfig || entry;

    const row = document.createElement('div');
    row.className = 'velma-cfg-row';
    row.dataset.uuid = uuid;
    row.dataset.kind = kind;

    // Head: checkbox + name + short + expand
    const head = document.createElement('div');
    head.className = 'velma-cfg-row-head';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.className = 'velma-cfg-row-checkbox';
    cb.checked = !!inConfig;
    cb.addEventListener('click', e => e.stopPropagation());
    cb.addEventListener('change', () => toggleCfgEntry(kind, def, cb.checked));
    head.appendChild(cb);

    const title = document.createElement('div');
    title.className = 'velma-cfg-row-title';
    const name = document.createElement('span');
    name.className = 'velma-cfg-row-name';
    name.textContent = def.name;
    title.appendChild(name);
    if (entry.__custom) {
      const badge = document.createElement('span');
      badge.className = 'velma-cfg-row-badge';
      badge.textContent = 'Custom';
      title.appendChild(badge);
    }
    const short = document.createElement('span');
    short.className = 'velma-cfg-row-short';
    short.textContent = def.short_description || '';
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
    body.appendChild(buildField('Name', 'input', def.name, val => updateCfgEntryField(kind, uuid, 'name', val)));
    body.appendChild(buildField('Short description', 'textarea', def.short_description || '', val => updateCfgEntryField(kind, uuid, 'short_description', val), '2.5rem'));
    body.appendChild(buildField('Detailed description', 'textarea', def.detailed_description || '', val => updateCfgEntryField(kind, uuid, 'detailed_description', val), '6rem'));
    if (entry.__custom) {
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'velma-cfg-row-remove';
      remove.textContent = 'Remove this custom entry';
      remove.addEventListener('click', () => removeCustomCfgEntry(kind, uuid));
      body.appendChild(remove);
    }
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
    if (!velmaCfgSttDiar) return;
    const s = velmaConfig.stt || {};
    velmaCfgSttDiar.checked = !!s.speaker_diarization;
    velmaCfgSttEmot.checked = !!s.emotion_signal;
    velmaCfgSttAcc.checked  = !!s.accent_signal;
    velmaCfgSttPii.checked  = !!s.pii_phi_tagging;
  }

  // ── Form → velmaConfig mutations ───────────────────────────────────────────

  function toggleCfgEntry(kind, defn, checked) {
    const uuidField = kind === 'role' ? 'participant_role_uuid' : 'behavior_uuid';
    const listField = kind === 'role' ? 'participant_roles' : 'behaviors';
    velmaConfig[listField] = velmaConfig[listField] || [];
    const idx = velmaConfig[listField].findIndex(x => x[uuidField] === defn[uuidField]);
    if (checked && idx === -1) {
      // Add a deep clone of the definition (library or custom)
      const clone = JSON.parse(JSON.stringify(defn));
      delete clone.__custom;
      velmaConfig[listField].push(clone);
    } else if (!checked && idx >= 0) {
      velmaConfig[listField].splice(idx, 1);
    }
    updateVelmaConfigSummary();
    renderVelmaEditorJson();
  }

  function updateCfgEntryField(kind, uuid, field, value) {
    const uuidField = kind === 'role' ? 'participant_role_uuid' : 'behavior_uuid';
    const listField = kind === 'role' ? 'participant_roles' : 'behaviors';
    const entry = (velmaConfig[listField] || []).find(x => x[uuidField] === uuid);
    if (entry) {
      entry[field] = value;
      updateVelmaConfigSummary();
      renderVelmaEditorJson();
    }
    // If the entry isn't in the config (unchecked library entry), the edit is dropped.
    // The user can check it first, then edit.
  }

  function removeCustomCfgEntry(kind, uuid) {
    const uuidField = kind === 'role' ? 'participant_role_uuid' : 'behavior_uuid';
    const listField = kind === 'role' ? 'participant_roles' : 'behaviors';
    velmaConfig[listField] = (velmaConfig[listField] || []).filter(x => x[uuidField] !== uuid);
    renderVelmaEditorForm();
    renderVelmaEditorJson();
    updateVelmaConfigSummary();
  }

  function addCustomCfgEntry(kind) {
    if (kind === 'role') {
      const uuid = newUuid();
      velmaConfig.participant_roles = velmaConfig.participant_roles || [];
      velmaConfig.participant_roles.push({
        participant_role_uuid: uuid,
        name: 'Custom role',
        short_description: '',
        detailed_description: '',
      });
    } else {
      const uuid = newUuid();
      velmaConfig.behaviors = velmaConfig.behaviors || [];
      velmaConfig.behaviors.push({
        behavior_uuid: uuid,
        name: 'Custom behavior',
        short_description: '',
        detailed_description: '',
      });
    }
    renderVelmaEditorForm();
    renderVelmaEditorJson();
    updateVelmaConfigSummary();
    // Auto-expand the newly added row
    const newRow = (kind === 'role' ? velmaCfgRolesList : velmaCfgBehaviorsList).lastElementChild;
    if (newRow) {
      newRow.classList.add('expanded');
      newRow.querySelector('.velma-cfg-row-expand').textContent = '▴';
      newRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      const firstInput = newRow.querySelector('input[type="text"]');
      if (firstInput) firstInput.focus();
    }
  }

  // ── JSON pane (right) ──────────────────────────────────────────────────────

  function renderVelmaEditorJson() {
    if (!velmaConfigTextarea) return;
    if (velmaCfgRawToggle && velmaCfgRawToggle.checked) return; // user is editing, don't clobber
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
    velmaConfigModal.addEventListener('click', (e) => {
      if (e.target === velmaConfigModal) closeVelmaConfigModal();
    });
  }

  if (velmaCfgConvSelect) {
    velmaCfgConvSelect.addEventListener('change', () => {
      const uuid = velmaCfgConvSelect.value;
      // Look up in library + any custom entries already in config
      const fromLib = VELMA_CONV_TYPE_LIBRARY.find(c => c.conversation_type_uuid === uuid);
      const fromCfg = (velmaConfig.conversation_types || []).find(c => c.conversation_type_uuid === uuid);
      const defn = fromCfg || fromLib;
      if (!defn) return;
      velmaConfig.conversation_types = [JSON.parse(JSON.stringify(defn))];
      delete velmaConfig.conversation_types[0].__custom;
      velmaCfgConvDefn.textContent = defn.detailed_description || '';
      updateVelmaConfigSummary();
      renderVelmaEditorJson();
    });
  }

  if (velmaCfgAddRoleBtn) velmaCfgAddRoleBtn.addEventListener('click', () => addCustomCfgEntry('role'));
  if (velmaCfgAddBehaviorBtn) velmaCfgAddBehaviorBtn.addEventListener('click', () => addCustomCfgEntry('behavior'));

  [velmaCfgSttDiar, velmaCfgSttEmot, velmaCfgSttAcc, velmaCfgSttPii].forEach((cb, i) => {
    if (!cb) return;
    cb.addEventListener('change', () => {
      velmaConfig.stt = velmaConfig.stt || {};
      const fields = ['speaker_diarization', 'emotion_signal', 'accent_signal', 'pii_phi_tagging'];
      velmaConfig.stt[fields[i]] = cb.checked;
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
          if (parsed && typeof parsed === 'object') velmaConfig = parsed;
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
        if (parsed && typeof parsed === 'object') {
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
          if (!parsed || typeof parsed !== 'object') throw new Error('Config must be a JSON object');
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
      velmaConfigError.textContent = '';
      if (velmaCfgRawToggle) velmaCfgRawToggle.checked = false;
      setRawJsonEditable(false);
      renderVelmaEditorForm();
      renderVelmaEditorJson();
      updateVelmaConfigSummary();
    });
  }

  // ── Velma sidebar buttons ──────────────────────────────────────────────────
  if (btnShowJsonVelma) {
    btnShowJsonVelma.addEventListener('click', () => {
      if (!velmaData) return;
      jsonPre.textContent = JSON.stringify(velmaData, null, 2);
      jsonModal.classList.add('visible');
    });
  }
  if (btnShowStatsVelma) {
    btnShowStatsVelma.addEventListener('click', () => {
      if (!velmaData) return;
      statsModalTitle.textContent = 'Velma Statistics';
      statsGrid.innerHTML = renderVelmaStats(velmaData, currentMeta);
      statsModal.classList.add('visible');
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
    let html = '<table class="stats-table">';
    rows.forEach(([k, v]) => {
      html += '<tr><td class="stats-label">' + escapeHtml(k) + '</td><td class="stats-value">' + escapeHtml(String(v)) + '</td></tr>';
    });
    html += '</table>';
    return html;
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
    if (path === '/music') return 'music';
    if (path === '/language') return 'language';
    if (path === '/velma') return 'velma';
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
    if (musicContent) musicContent.style.display = 'none';
    if (musicSidebar) musicSidebar.style.display = 'none';
    currentMeta = {
      fileSize: 1.87 * 1024 * 1024, fileType: 'audio/mpeg',
      httpStatus: 200, httpStatusText: 'OK',
      responseSize: 4.2 * 1024, processingMs: 2660,
    };
    renderDeepfakeResults(DEMO_DATA, DEMO_AUDIO_URL);
  } else if (initMode === 'music') {
    // Music Detection init
    deepfakeContent.style.display = 'none';
    resultsVerdict.style.display = 'none';
    transcriptContainer.classList.remove('visible');
    resultsSidebar.classList.remove('visible');
    sttOptions.classList.remove('visible');
    redactionContent.style.display = 'none';
    if (recordAction) { recordAction.style.display = ''; recordAction.classList.remove('disabled-soon'); }
    if (streamDemoAction) streamDemoAction.style.display = '';
    if (streamFileAction) streamFileAction.style.display = '';
    currentMeta = {
      fileSize: 243900, fileType: 'audio/opus',
      httpStatus: 200, httpStatusText: 'OK',
      responseSize: JSON.stringify(DEMO_MUSIC_DATA).length,
      processingMs: DEMO_MUSIC_DATA.latency_ms || 0,
    };
    renderMusicResults(DEMO_MUSIC_DATA, DEMO_MUSIC_AUDIO_URL);
  } else if (initMode === 'language') {
    // Language Detection init — no demo, just the hero placeholder.
    deepfakeContent.style.display = 'none';
    resultsVerdict.style.display = 'none';
    transcriptContainer.classList.remove('visible');
    resultsSidebar.classList.remove('visible');
    sttOptions.classList.remove('visible');
    redactionContent.style.display = 'none';
    if (musicContent) musicContent.style.display = 'none';
    if (musicSidebar) musicSidebar.style.display = 'none';
    if (languageContent) languageContent.classList.add('visible');
    if (languageSidebar) languageSidebar.style.display = '';
    if (recordAction) recordAction.style.display = 'none';
    if (streamDemoAction) streamDemoAction.style.display = 'none';
    if (streamFileAction) streamFileAction.style.display = 'none';
    resetLanguageHero();
  } else if (initMode === 'velma') {
    // Velma init — render pre-cached demo (matches transcription/deepfake/redaction UX)
    deepfakeContent.style.display = 'none';
    resultsVerdict.style.display = 'none';
    transcriptContainer.classList.add('visible'); // reuse stt-chart + transcript-list
    resultsSidebar.classList.remove('visible');
    sttOptions.classList.remove('visible');
    redactionContent.style.display = 'none';
    if (musicContent) musicContent.style.display = 'none';
    if (musicSidebar) musicSidebar.style.display = 'none';
    if (velmaContent) velmaContent.classList.add('visible');
    if (velmaSidebar) velmaSidebar.classList.add('visible');
    if (velmaOptions) velmaOptions.classList.add('visible');
    if (velmaDemoAction) velmaDemoAction.style.display = '';
    if (recordAction) recordAction.style.display = 'none';
    if (streamDemoAction) streamDemoAction.style.display = 'none';
    if (streamFileAction) streamFileAction.style.display = 'none';
    clearVelmaResults();
    updateVelmaConfigSummary();
    loadDemoVelmaData().then(() => { if (currentMode === 'velma') renderVelmaDemo(); });
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
    if (musicContent) musicContent.style.display = 'none';
    if (musicSidebar) musicSidebar.style.display = 'none';
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
    if (musicContent) musicContent.style.display = 'none';
    if (musicSidebar) musicSidebar.style.display = 'none';
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
  const initPath = initMode === 'deepfake' ? '/deepfake'
    : initMode === 'redaction' ? '/redaction'
    : initMode === 'music' ? '/music'
    : initMode === 'language' ? '/language'
    : initMode === 'velma' ? '/velma'
    : '/transcription';
  history.replaceState({ mode: initMode }, '', initPath + location.search);
})();
