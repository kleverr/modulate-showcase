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

  // Pre-recorded Emotion / Accent Detection responses (actual API output from
  // /api/velma-2-emotion-batch and /api/velma-2-accent-batch on the repo demo
  // files) so the tabs light up without an API call on first load.
  const DEMO_EMOTION_AUDIO_URL = '/deepfake/irate-caller-demo.mp3';
  const DEMO_EMOTION_FILENAME = 'irate-caller-demo.mp3';
  const DEMO_EMOTION_FILESIZE = 5385320;
  const DEMO_EMOTION_DATA = {
    emotion: 'Angry',
    time_series: [
      { start_ms: 0,      duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 15000,  duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 30000,  duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 45000,  duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 60000,  duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 75000,  duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 90000,  duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 105000, duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 120000, duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 135000, duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 150000, duration_ms: 15000, emotion: 'Angry' },
      { start_ms: 165000, duration_ms: 15000, emotion: 'Angry' },
      { start_ms: 180000, duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 195000, duration_ms: 15000, emotion: 'Angry' },
      { start_ms: 210000, duration_ms: 15000, emotion: 'Angry' },
      { start_ms: 225000, duration_ms: 15000, emotion: 'Frustrated' },
      { start_ms: 240000, duration_ms: 15000, emotion: 'Angry' },
    ],
  };

  const DEMO_ACCENT_AUDIO_URL = '/deepfake/call-center-demo.mp3';
  const DEMO_ACCENT_FILENAME = 'call-center-demo.mp3';
  const DEMO_ACCENT_FILESIZE = 3255552;
  const DEMO_ACCENT_DATA = {
    accent: 'American',
    time_series: [
      { start_ms: 0,      duration_ms: 15000, accent: 'American' },
      { start_ms: 15000,  duration_ms: 15000, accent: 'American' },
      { start_ms: 30000,  duration_ms: 15000, accent: 'American' },
      { start_ms: 45000,  duration_ms: 15000, accent: 'American' },
      { start_ms: 60000,  duration_ms: 15000, accent: 'American' },
      { start_ms: 75000,  duration_ms: 15000, accent: 'American' },
      { start_ms: 90000,  duration_ms: 15000, accent: 'American' },
      { start_ms: 105000, duration_ms: 15000, accent: 'American' },
      { start_ms: 120000, duration_ms: 15000, accent: 'American' },
      { start_ms: 135000, duration_ms: 15000, accent: 'American' },
      { start_ms: 150000, duration_ms: 15000, accent: 'American' },
      { start_ms: 165000, duration_ms: 15000, accent: 'American' },
      { start_ms: 180000, duration_ms: 15000, accent: 'American' },
    ],
  };

  // ── Verdict helpers ─────────────────────────────────────────────────────────
  function isSyntheticFrame(f) { return f.verdict === 'synthetic'; }

  function computeVerdict(frames) {
    const synFrames = frames.filter(isSyntheticFrame);
    // Silence ("no-content") segments carry no signal either way — judge
    // against speech segments only.
    const n = frames.filter(f => f.verdict !== 'no-content').length;
    const c98 = synFrames.filter(f => f.confidence > 0.98).length;
    const c95 = synFrames.filter(f => f.confidence > 0.95).length;
    const c90 = synFrames.filter(f => f.confidence > 0.90).length;
    const c85 = synFrames.filter(f => f.confidence > 0.85).length;
    const pct = n > 0 ? synFrames.length / n : 0;
    // Corroboration counts scale down for short clips: a 1-segment file can
    // never produce 2 corroborating segments, so require at most n of them.
    const need = (k) => Math.max(1, Math.min(k, n));
    const seg = (k) => k + ' segment' + (k === 1 ? '' : 's');
    let reason = '';
    if (c98 >= 1) reason = seg(c98) + ' with >98% conf.';
    else if (c95 >= need(2)) reason = seg(c95) + ' with >95% conf.';
    else if (c90 >= need(3)) reason = seg(c90) + ' with >90% conf.';
    else if (c85 >= need(5)) reason = seg(c85) + ' with >85% conf.';
    else if (pct >= 0.5) reason = Math.round(pct * 100) + '% of segments flagged as deepfake';
    else if (n >= 7 && pct > 0.3) reason = Math.round(pct * 100) + '% of segments flagged as deepfake';
    const isSynthetic = reason !== '';
    return { isSynthetic, synFrames, reason };
  }

  // Plain-language description of computeVerdict, shown in the verdict-info
  // popover. Keep in sync with the rules above.
  const DEEPFAKE_VERDICT_RULES_HTML =
    '<p>The file-level verdict is a derived metric: the model scores each segment ' +
    'independently, and this page combines those scores into one overall call.</p>' +
    '<p>A file is called a <strong>deepfake</strong> when any of these hold:</p>' +
    '<ul>' +
    '<li>a segment is flagged with &gt;98% confidence</li>' +
    '<li>2+ segments &gt;95%, 3+ &gt;90%, or 5+ &gt;85% <br>(short clips need only as many segments as they have)</li>' +
    '<li>half or more of the speech segments are flagged</li>' +
    '<li>over 30% are flagged in files with 7+ segments</li>' +
    '</ul>' +
    '<p>Silent segments are ignored. Everything else reads <strong>authentic</strong>. ' +
    'Per-segment verdicts and confidences come straight from the model.</p>';

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
  // Upload-progress text renders into the plate's uploading overlay label.
  const analysisStatus = document.getElementById('plate-uploading-label');
  const errorToast    = document.getElementById('error-toast');

  const resultsFilename = document.getElementById('results-filename');
  const resultsAudio  = document.getElementById('results-audio');
  const originalAudio = document.getElementById('original-audio');
  const playerEntryOriginal = document.getElementById('player-entry-original');
  const redactedLabel = document.getElementById('redacted-label');
  const resultsTbody  = document.getElementById('results-tbody');

  const uploadAction  = document.getElementById('results-upload-action');
  const fileInput     = document.getElementById('results-file-input');
  const recordAction  = document.getElementById('results-record-action');
  const streamDemoAction = document.getElementById('results-stream-demo-action');
  const streamFileAction = document.getElementById('results-stream-file-action');
  const streamFileInput  = document.getElementById('results-stream-file-input');
  const histoTooltip  = document.getElementById('histo-tooltip');
  const sttChart      = document.getElementById('stt-chart');

  // Mode toggle
  const deepfakeContent = document.getElementById('deepfake-content');
  const transcriptContainer = document.getElementById('transcript-container');
  const transcriptList = document.getElementById('transcript-list');
  const resultsVerdict = document.getElementById('results-verdict');
  const sttOptions    = document.getElementById('stt-options');

  // Music Detection elements
  const musicContent      = document.getElementById('music-content');
  const musicTbody        = document.getElementById('music-tbody');
  const musicSidebar      = document.getElementById('results-music-verdict');

  // AI Music Detection elements
  const aimusicContent       = document.getElementById('aimusic-content');
  const aimusicSidebar       = document.getElementById('results-aimusic-verdict');
  const aimusicTbody           = document.getElementById('aimusic-tbody');

  // Language Detection elements
  const languageContent      = document.getElementById('language-content');
  const languageSidebar      = document.getElementById('results-language-verdict');

  // Redaction elements
  const redactionContent        = document.getElementById('redaction-content');
  const redactionTranscriptList = document.getElementById('redaction-transcript-list');
  const redactionOptions        = document.getElementById('redaction-options');
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
    emotion: {
      path: '/emotion', title: 'Emotion Detection', plateTitle: 'Detect emotional tone',
      optionsRow: () => plateHeader,
      verdict: () => document.getElementById('results-emotion-verdict'),
      panels: () => [document.getElementById('emotion-content')],
      streaming: false,
      stages: ['Analyzing audio'],
    },
    accent: {
      path: '/accent', title: 'Accent Detection', plateTitle: 'Detect speaker accent',
      optionsRow: () => plateHeader,
      verdict: () => document.getElementById('results-accent-verdict'),
      panels: () => [document.getElementById('accent-content')],
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
     document.getElementById('results-redaction-verdict'),
     document.getElementById('results-emotion-verdict'),
     document.getElementById('results-accent-verdict')].forEach(el => {
      if (el) el.hidden = true;
    });
    const verdictEl = cfg.verdict && cfg.verdict();
    if (verdictEl) verdictEl.hidden = false;

    // Content panels
    [velmaContent, transcriptContainer, deepfakeContent, redactionContent,
     musicContent, aimusicContent, languageContent,
     document.getElementById('emotion-content'),
     document.getElementById('accent-content')].forEach(el => {
      if (el) el.classList.remove('visible');
    });
    (cfg.panels ? cfg.panels() : []).forEach(el => { if (el) el.classList.add('visible'); });

    // Redaction A/B source toggle on the player
    if (redactionAb) redactionAb.hidden = !cfg.abToggle;
    setActiveAudio(isRedaction ? 'redacted' : 'main');

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
    } else if (mode === 'emotion' || mode === 'accent') {
      showEaMode(mode);
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

    // A demo (or prior run) is already on screen — start the plate collapsed
    // ("New analysis"), matching the uploaded state the results imply.
    if (currentData) setPlateState('uploaded');
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
  const richOpts = [optDiarization, optDeepfake, optEmotion, optAccent, optPii];

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
        } else if (currentMode === 'aimusic') {
          startAimusicAnalysis(fileInput.files[0]);
        } else if (currentMode === 'language') {
          startLanguageDetection(fileInput.files[0]);
        } else if (currentMode === 'emotion' || currentMode === 'accent') {
          startEaDetection(currentMode, fileInput.files[0]);
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
      else if (currentMode === 'deepfake') startDeepfakeDemoStream();
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
        else if (currentMode === 'deepfake') startDeepfakeFileStream(streamFileInput.files[0]);
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
    else if (currentMode === 'emotion' || currentMode === 'accent') startEaDetection(currentMode, file);
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

    // Velma "Try demo audio" re-runs the cached demo (showVelmaDemo syncs
    // the title/columns/player itself once the async data lands)
    if (velmaDemoBtn) {
      velmaDemoBtn.addEventListener('click', () => {
        if (currentMode !== 'velma') return;
        showVelmaDemo();
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

  const PLAY_GLYPH = '<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><polygon fill="currentColor" points="40 30 40 190 190 110 40 30" /></svg>';
  const PAUSE_GLYPH = '<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><rect fill="currentColor" x="55" y="35" width="38" height="150" /><rect fill="currentColor" x="127" y="35" width="38" height="150" /></svg>';

  function updatePlayIcon(playing) {
    if (!playerIcon) return;
    const state = playing ? 'true' : 'false';
    if (playerIcon.dataset.playing !== state) {
      playerIcon.dataset.playing = state;
      playerIcon.innerHTML = playing ? PAUSE_GLYPH : PLAY_GLYPH;
    }
  }

  function syncPlayerPosition() {
    const a = activeAudio();
    if (!a || !mediaBox) return;
    const dur = a.duration;
    const pct = (isFinite(dur) && dur > 0) ? (a.currentTime / dur) * 100 : 0;
    if (playerPosIndicator) {
      playerPosIndicator.style.left = pct + '%';
      // Near the right edge the caption flips to the left of the line
      playerPosIndicator.classList.toggle('caption-flipped', pct > 88);
      playerPosIndicator.classList.toggle('caption-near-start', pct < 7);
    }
    if (playerCurrentTimeEl) playerCurrentTimeEl.textContent = fmtPlayerTime(a.currentTime);
    updatePlayIcon(!a.paused);
    const started = a.currentTime > 0 ? 'true' : 'false';
    if (mediaBox) mediaBox.dataset.playbackStarted = started;
    // Red playhead across the whole media container (visualization + bar)
    const container = mediaBox.closest('.media-container');
    if (container) {
      container.dataset.playbackStarted = started;
      container.style.setProperty('--pg-pos-x', pct + '%');
    }
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
    let posRaf = null;
    const posTick = () => {
      syncPlayerPosition();
      const a = activeAudio();
      posRaf = (a && !a.paused) ? requestAnimationFrame(posTick) : null;
    };
    const startPosLoop = () => { if (!posRaf) posRaf = requestAnimationFrame(posTick); };
    [resultsAudio, originalAudio].forEach((a) => {
      if (!a) return;
      a.addEventListener('timeupdate', () => { if (a === activeAudio()) syncPlayerPosition(); });
      a.addEventListener('play',  () => { if (a === activeAudio()) { updatePlayIcon(true); startPosLoop(); } });
      a.addEventListener('pause', () => { if (a === activeAudio()) updatePlayIcon(false); });
      a.addEventListener('ended', () => { if (a === activeAudio()) updatePlayIcon(false); });
      a.addEventListener('loadedmetadata', () => {
        if (a === activeAudio()) syncPlayerMeta();
        // MediaRecorder blobs (live recordings) load with duration=Infinity in
        // Chrome — seek far past the end once to force the real duration, so
        // the total time and playhead position work after streaming stops.
        if (a.duration === Infinity) {
          const settle = () => {
            a.removeEventListener('timeupdate', settle);
            a.currentTime = 0;
            if (a === activeAudio()) syncPlayerMeta();
          };
          a.addEventListener('timeupdate', settle);
          a.currentTime = 1e101;
        }
      });
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
      if (playerHoverIndicator) {
        playerHoverIndicator.style.left = (frac * 100) + '%';
        playerHoverIndicator.classList.add('active');
        // Near the right edge the caption flips to the left of the line
        playerHoverIndicator.classList.toggle('caption-flipped', frac > 0.88);
        playerHoverIndicator.classList.toggle('caption-near-start', frac < 0.07);
      }
      mediaBox.classList.add('has-hover-indicator');
      if (playerHoverTimeEl) playerHoverTimeEl.textContent = fmtPlayerTime(frac * a.duration);
    });
    seekTarget.addEventListener('mouseleave', () => {
      if (playerHoverIndicator) playerHoverIndicator.classList.remove('active');
      mediaBox.classList.remove('has-hover-indicator');
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

  function handleDeepfakeStreamMessage(msg) {
    if (msg?.type === 'frame' && msg.frame && typeof msg.frame.confidence === 'number') {
      liveFrames.push(msg.frame);
      renderDeepfakeLiveResults();
    } else if (msg?.type === 'done') {
      stopRecording();
    } else if (msg?.type === 'error') {
      showError('Streaming error: ' + (msg.error || 'Unknown'));
      if (liveFrames.length > 0) stopRecording();
      else { cleanupRecording(); demoCleanup(); }
    }
  }

  function resetDeepfakeLiveUI(title) {
    currentData = null;

    renderVerdictStatement('deepfake-verdict-statement', {
      variant: '',
      title: title,
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
  }

  function startDeepfakeRecording() {
    startRecordingCommon('/api/velma-2-synthetic-voice-detection-streaming?audio_format=s16le&sample_rate=16000&num_channels=1', handleDeepfakeStreamMessage, () => {
      resultsFilename.textContent = 'Live Recording';
      resultsAudio.removeAttribute('src');
      resultsAudio.load();
      if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = null; }
      resetDeepfakeLiveUI('Listening\u2026');
    });
  }

  function startDeepfakeDemoStream() {
    return startDeepfakeStreamFromUrl(DEMO_AUDIO_URL, 'Demo stream', false);
  }

  async function startDeepfakeFileStream(file) {
    const url = URL.createObjectURL(file);
    await startDeepfakeStreamFromUrl(url, file.name, true);
  }

  async function startDeepfakeStreamFromUrl(url, filename, isUserFile) {
    if (isRecording) return;
    if (currentMode !== 'deepfake') return;

    liveFrames = [];

    resultsFilename.textContent = filename;
    if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = null; }
    if (isUserFile) audioObjectUrl = url;
    resultsAudio.src = url;
    lastDeepfakeAudioUrl = url;
    resetDeepfakeLiveUI('Streaming\u2026');

    // Fetch + decode \u2192 16 kHz mono PCM s16le (same pipeline as the music demo)
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
    const wsUrl = proto + '//' + location.host + '/api/velma-2-synthetic-voice-detection-streaming?audio_format=s16le&sample_rate=16000&num_channels=1';
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
      if (playPromise && playPromise.catch) playPromise.catch(() => { /* autoplay blocked \u2014 silent */ });

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
      handleDeepfakeStreamMessage(msg);
    });

    recordingWs.onerror = () => { demoCleanup(); };

    recordingWs.onclose = () => {
      const wasRecording = isRecording;
      demoCleanup();
      // Finalize if the stream produced data and the user didn't click stop
      // (which would have routed through stopRecording's deepfake branch already)
      if (wasRecording && currentMode === 'deepfake' && liveFrames.length > 0) {
        finalizeDeepfakeStream(filename);
      } else if (wasRecording && currentMode === 'deepfake') {
        showError('Streaming returned no results before the connection closed. Try the batch upload instead.');
      }
    };
  }

  // Build the final result from streamed frames and render the verdict.
  // Called from stopRecording (user stop / done message) and from onclose.
  function finalizeDeepfakeStream(filename) {
    const durationMs = liveFrames.length
      ? liveFrames[liveFrames.length - 1].end_time_ms
      : (Date.now() - recordingStartTime);
    const data = {
      filename: filename || resultsFilename.textContent || 'Live Recording',
      frames: liveFrames,
      duration_ms: durationMs,
    };
    currentMeta = {
      fileSize: 0, fileType: 'PCM 16kHz', httpStatus: 101, httpStatusText: 'Switching Protocols',
      responseSize: JSON.stringify(data).length, processingMs: Date.now() - recordingStartTime,
    };
    currentData = data;
    currentFrames = liveFrames;
    lastDeepfakeData = data;
    lastDeepfakeMeta = { ...currentMeta };

    const { isSynthetic, synFrames, reason } = computeVerdict(liveFrames);

    renderVerdict(isSynthetic, synFrames.length, liveFrames.length, reason);
    renderHistogram(liveFrames);
    renderTable(liveFrames);
    setupPlaybackTracking(liveFrames);
  }

  function renderDeepfakeLiveResults() {
    if (!liveFrames.length) return;
    const durationMs = Date.now() - recordingStartTime;
    // The filename was set by whichever entry point started the stream
    // (mic recording, demo stream, or file stream).
    currentData = { filename: resultsFilename.textContent, frames: liveFrames, duration_ms: durationMs };
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
  // spec: { variant: 'danger'|'success'|'', title, stats: [{value, label}],
  //         info: {label, html} — optional "how is this decided?" popover }
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
    if (spec.info) {
      html += '<div class="pg-verdict-info">' +
        '<button type="button" class="pg-verdict-info-link" aria-expanded="false">' +
        escapeHtml(spec.info.label) + '</button>' +
        '<div class="pg-verdict-info-pop" hidden>' + spec.info.html + '</div>' +
        '</div>';
    }
    el.innerHTML = html;
    // The title toggles playback (and brings the player into view if needed)
    const link = el.querySelector('.pg-verdict-statement-link');
    if (link) {
      link.title = 'Play / pause the audio';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const a = activeAudio();
        if (a && a.src) {
          if (a.paused) a.play().catch(() => {}); else a.pause();
        }
        const player = document.getElementById('audio-player');
        if (player) {
          const r = player.getBoundingClientRect();
          if (r.top < 0 || r.bottom > window.innerHeight) {
            player.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    }
    const infoLink = el.querySelector('.pg-verdict-info-link');
    if (infoLink) infoLink.addEventListener('click', () => {
      const pop = el.querySelector('.pg-verdict-info-pop');
      const open = pop.hidden;
      pop.hidden = !open;
      infoLink.setAttribute('aria-expanded', String(open));
    });
  }

  // Close any open verdict-info popover on outside click or Escape.
  function closeVerdictInfoPops(except) {
    document.querySelectorAll('.pg-verdict-info-pop:not([hidden])').forEach(pop => {
      const wrap = pop.closest('.pg-verdict-info');
      if (except && wrap && wrap.contains(except)) return;
      pop.hidden = true;
      const btn = wrap && wrap.querySelector('.pg-verdict-info-link');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }
  document.addEventListener('click', (e) => closeVerdictInfoPops(e.target));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVerdictInfoPops(null); });

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
      info: { label: 'How is this decided?', html: DEEPFAKE_VERDICT_RULES_HTML },
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
          const err = new Error(detail); err.httpStatus = xhr.status; err.rawText = '';
          if (xhr.status === 429) handleRateLimited();
          reject(err); return;
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
    renderMusicTable(frames);
    if (frames.length) setupMusicPlaybackTracking(frames);
    window.scrollTo(0, 0);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── LANGUAGE DETECTION MODE ──────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

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

  // ══════════════════════════════════════════════════════════════════════════
  // ── EMOTION / ACCENT DETECTION MODES ─────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════
  // Both models share the same response shape ({<label>, time_series: [{start_ms,
  // duration_ms, <label>}]}), so one implementation drives both tabs,
  // parameterized by EA_KINDS. Emotion windows color via the design system's
  // --emotion-* tokens; accents get a deterministic fallback palette.

  const EA_FALLBACK_PALETTE = ['#5b7fc7', '#c76b5b', '#5bc7a8', '#c7a85b', '#8f5bc7', '#c75b96', '#5bb2c7', '#96c75b'];

  // API emotion labels the design tokens don't name directly.
  const EA_EMOTION_ALIASES = { fearful: 'afraid', content: 'calm' };

  const EA_KINDS = {
    emotion: {
      field: 'emotion',
      endpoint: '/api/velma-2-emotion-batch',
      model: 'velma-2-emotion-batch',
      title: 'Emotion Detection',
      overlayMsg: 'Detecting emotional tone',
      verdictTitle: (label) => 'This sounds ' + String(label || 'unknown').toLowerCase(),
      color: (label) => {
        const key = String(label || '').toLowerCase();
        return emotionVar(EA_EMOTION_ALIASES[key] || key);
      },
      demoData: DEMO_EMOTION_DATA,
      demoAudioUrl: DEMO_EMOTION_AUDIO_URL,
      demoFilename: DEMO_EMOTION_FILENAME,
      demoFileSize: DEMO_EMOTION_FILESIZE,
      demoProcessingMs: 4340,
    },
    accent: {
      field: 'accent',
      endpoint: '/api/velma-2-accent-batch',
      model: 'velma-2-accent-batch',
      title: 'Accent Detection',
      overlayMsg: 'Detecting speaker accent',
      verdictTitle: (label) => {
        const l = String(label || 'Unknown');
        return 'This is ' + (/^[aeiou]/i.test(l) ? 'an ' : 'a ') + l + ' accent';
      },
      color: (label) => {
        const key = String(label || '').toLowerCase();
        let hash = 0;
        for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
        return EA_FALLBACK_PALETTE[hash % EA_FALLBACK_PALETTE.length];
      },
      demoData: DEMO_ACCENT_DATA,
      demoAudioUrl: DEMO_ACCENT_AUDIO_URL,
      demoFilename: DEMO_ACCENT_FILENAME,
      demoFileSize: DEMO_ACCENT_FILESIZE,
      demoProcessingMs: 4110,
    },
  };

  // Per-kind DOM refs + last-run state.
  for (const kind of Object.keys(EA_KINDS)) {
    const cfg = EA_KINDS[kind];
    cfg.tbody  = document.getElementById(kind + '-tbody');
    cfg.legend = document.getElementById(kind + '-legend');
    cfg.last = { data: null, audioUrl: null, meta: null, filename: null };
  }

  async function startEaDetection(kind, file) {
    if (isAnalyzing) return;
    const cfg = EA_KINDS[kind];
    isAnalyzing = true;
    showOverlay(file.name, cfg.overlayMsg);
    // Roughly linear in audio length (~4 s for a 4-minute file); pace by size.
    startProgress(Math.max(3000, Math.min(10000, file.size / 600)));

    try {
      const startedAt = Date.now();
      const { data, meta } = await uploadAndAnalyze(file, cfg.endpoint);
      const processingMs = Date.now() - startedAt;
      await finishProgress();

      if (cfg.last.audioUrl && cfg.last.audioUrl !== cfg.demoAudioUrl) {
        URL.revokeObjectURL(cfg.last.audioUrl);
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

      // The API doesn't echo the filename, so we keep it ourselves.
      cfg.last = { data, audioUrl: audioObjectUrl, meta: { ...currentMeta }, filename: file.name };

      currentData = data;
      resultsFilename.textContent = file.name;
      resultsAudio.src = audioObjectUrl;
      renderEaResult(kind, data);
      hideOverlay();
      isAnalyzing = false;
      window.scrollTo(0, 0);
      updateRateLimit();
    } catch (err) {
      showOverlayError(err.message || cfg.title + ' failed. Please try again.', err.rawText);
      isAnalyzing = false;
    }
  }

  function renderEaResult(kind, data) {
    const cfg = EA_KINDS[kind];
    const label = data[cfg.field] || 'Unknown';
    const windows = data.time_series || [];

    // ── Verdict statement ──
    const stats = [];
    if (windows.length) {
      stats.push({ value: windows.length, label: 'windows × 15 s' });
      const distinct = [...new Set(windows.map(w => w[cfg.field]).filter(Boolean))];
      if (distinct.length > 1) stats.push({ value: '', label: distinct.join(' · ') });
    } else {
      stats.push({ value: '', label: 'Clip shorter than one 15 s window — whole-file label only' });
    }
    renderVerdictStatement(kind + '-verdict-statement', {
      variant: 'success',
      title: cfg.verdictTitle(label),
      stats,
    });

    // ── Per-window strip in the player visualization ──
    const viz = document.getElementById('player-visualization');
    clearPlayerStrips();
    sttChart.innerHTML = '';
    syncSpeakerLanes([]);
    if (cfg.tbody) cfg.tbody.innerHTML = '';
    if (cfg.legend) cfg.legend.innerHTML = '';
    if (!windows.length || !viz) return;

    const spanMs = windows[windows.length - 1].start_ms + windows[windows.length - 1].duration_ms;
    const strip = document.createElement('div');
    strip.className = 'ea-player-strip';
    // clearPlayerStrips() removes it on the next mode's render
    strip.classList.add('pg-redaction-player-track');
    windows.forEach((w) => {
      const wLabel = w[cfg.field] || 'Unknown';
      const seg = document.createElement('div');
      seg.className = 'ea-seg';
      seg.style.left = (w.start_ms / spanMs * 100).toFixed(3) + '%';
      seg.style.width = (w.duration_ms / spanMs * 100).toFixed(3) + '%';
      seg.style.background = cfg.color(wLabel);
      seg.dataset.tooltip = formatMs(w.start_ms) + ' – ' + formatMs(w.start_ms + w.duration_ms) + ' · ' + wLabel;
      seg.dataset.startMs = w.start_ms;
      seg.dataset.endMs = w.start_ms + w.duration_ms;
      seg.addEventListener('click', (e) => {
        e.stopPropagation();
        resultsAudio.currentTime = w.start_ms / 1000;
        resultsAudio.play().catch(() => {});
      });
      strip.appendChild(seg);
    });
    viz.appendChild(strip);

    // ── Legend ──
    const seen = [];
    windows.forEach(w => {
      const l = w[cfg.field] || 'Unknown';
      if (!seen.includes(l)) seen.push(l);
    });
    if (cfg.legend) {
      seen.forEach((l) => {
        const item = document.createElement('span');
        item.className = 'ea-legend-item';
        const sw = document.createElement('i');
        sw.className = 'ea-legend-sw';
        sw.style.background = cfg.color(l);
        item.appendChild(sw);
        item.appendChild(document.createTextNode(l));
        cfg.legend.appendChild(item);
      });
    }

    // ── Windows table ──
    if (cfg.tbody) {
      windows.forEach((w, i) => {
        const wLabel = w[cfg.field] || 'Unknown';
        const tr = document.createElement('tr');
        tr.dataset.index = i;
        const tdTime = document.createElement('td');
        tdTime.textContent = formatMs(w.start_ms) + ' – ' + formatMs(w.start_ms + w.duration_ms);
        tr.appendChild(tdTime);
        const tdLabel = document.createElement('td');
        const cell = document.createElement('span');
        cell.className = 'ea-legend-item';
        const sw = document.createElement('i');
        sw.className = 'ea-legend-sw';
        sw.style.background = cfg.color(wLabel);
        cell.appendChild(sw);
        cell.appendChild(document.createTextNode(wLabel));
        tdLabel.appendChild(cell);
        tr.appendChild(tdLabel);
        tr.addEventListener('click', () => {
          resultsAudio.currentTime = w.start_ms / 1000;
          resultsAudio.play().catch(() => {});
        });
        cfg.tbody.appendChild(tr);
      });
    }
  }

  // Highlight the window under the playhead while the audio plays.
  resultsAudio.addEventListener('timeupdate', () => {
    if (currentMode !== 'emotion' && currentMode !== 'accent') return;
    const viz = document.getElementById('player-visualization');
    const strip = viz ? viz.querySelector('.ea-player-strip') : null;
    if (!strip) return;
    const ms = resultsAudio.currentTime * 1000;
    let activeIdx = -1;
    Array.from(strip.children).forEach((seg, i) => {
      const on = ms >= +seg.dataset.startMs && ms < +seg.dataset.endMs;
      seg.classList.toggle('active', on);
      if (on) activeIdx = i;
    });
    const cfg = EA_KINDS[currentMode];
    if (cfg.tbody) cfg.tbody.querySelectorAll('tr').forEach((row, i) => {
      row.classList.toggle('active', i === activeIdx);
    });
  });

  // Restore the tab's last run (or the pre-cached demo) on mode switch / init.
  function showEaMode(kind) {
    const cfg = EA_KINDS[kind];
    const data = cfg.last.data || cfg.demoData;
    currentData = data;
    currentMeta = cfg.last.meta || {
      fileSize: cfg.demoFileSize, fileType: 'audio/mpeg',
      httpStatus: 200, httpStatusText: 'OK',
      responseSize: JSON.stringify(cfg.demoData).length,
      processingMs: cfg.demoProcessingMs,
    };
    resultsFilename.textContent = cfg.last.filename || cfg.demoFilename;
    resultsAudio.src = cfg.last.audioUrl || cfg.demoAudioUrl;
    renderEaResult(kind, data);
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
        renderMusicTable(liveMusicFrames);
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
    renderMusicTable(liveMusicFrames);
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
      sttUtterances.push(msg.utterance);
      deduplicateUtterances();
      sttPartial = null;
      updateSttData();
      renderTranscript();
    } else if (msg?.type === 'partial_utterance' && msg.partial_utterance) {
      sttPartial = msg.partial_utterance;
      renderTranscript();
    } else if (msg?.type === 'done') {
      if (sttPartial) {
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

    recordingWs.onopen = () => {
      isRecording = true;
      recordingStartTime = Date.now();
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
      demoCleanup();
    };

    recordingWs.onclose = () => {
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

  function updateSttData() {
    const durationMs = Date.now() - recordingStartTime;
    sttData = { filename: 'Live Recording', utterances: clusterUtterances(sttUtterances), duration_ms: durationMs };
    currentData = sttData;
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
    const displayUtterances = isRecording
      ? clusterUtterances(sttUtterances)
      : sttUtterances.slice().sort(byStart);

    displayUtterances.forEach((u, i) => {
      transcriptList.appendChild(buildUtteranceEl(u, opts, false, i));
    });

    if (sttPartial) {
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

    if (isRecording && transcriptList.lastElementChild) {
      transcriptList.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    // Render the emotion clip strip — during live streams too, so the player
    // visualization fills in progressively as clips arrive.
    const opts2 = getSttOptions();
    if (sttUtterances.length > 0 && opts2.speaker_diarization) {
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
        if (nowActive && !wasActive) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

  // Per-utterance authenticity from the model's deepfake score (0 = authentic,
  // 1 = deepfake). The verdict is always the leaning \u2014 "Likely" marks the low-
  // confidence middle band \u2014 and pct is the probability of the named class.
  function utteranceAuthenticity(score) {
    const deepfake = score > 0.7;
    const label = deepfake ? 'Deepfake'
      : score >= 0.5 ? 'Likely deepfake'
      : score > 0.3 ? 'Likely authentic'
      : 'Authentic';
    const pct = Math.round((score >= 0.5 ? score : 1 - score) * 100);
    return { label, pct, deepfake };
  }

  function clipTooltipText(u) {
    const endTimeMs = u.start_ms + (u.duration_ms || 2000);
    let dfTooltip = '';
    if (u.deepfake_score != null) {
      const v = utteranceAuthenticity(u.deepfake_score);
      dfTooltip = ' \u00b7 ' + v.label + ' ' + v.pct + '%';
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

    // Accent — the model emits 'Unknown'/'Other' when it can't classify; skip
    // the chip then rather than surfacing noise.
    if (u.accent && opts.accent_signal && u.accent !== 'Unknown' && u.accent !== 'Other') {
      const la = document.createElement('span');
      la.className = 'pg-transcript-accent';
      la.textContent = (ACCENT_SHORT[u.accent] || u.accent) + ' accent';
      header.appendChild(la);
    }

    // Deepfake verdict
    if (opts.deepfake_signal && u.deepfake_score != null) {
      const df = document.createElement('span');
      df.className = 'pg-transcript-verdict';
      const v = utteranceAuthenticity(u.deepfake_score);
      if (v.deepfake) df.classList.add('deepfake');
      df.textContent = v.label;
      df.dataset.tooltip = 'Model deepfake score ' + u.deepfake_score.toFixed(2) + ' (0 = authentic, 1 = deepfake)';
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

      recordingWs.onopen = () => {
        isRecording = true;
        liveFrames = [];
        recordingStartTime = Date.now();
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
        cleanupRecording();
      };

      recordingWs.onclose = (event) => {
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
      finalizeDeepfakeStream();
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
      renderMusicTable(liveMusicFrames);
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
    // Re-sync the quota meter — a refused WS upgrade (rate limit) is only
    // visible to the client as a connection error, so poll to find out.
    updateRateLimit();
    if (scriptProcessor) { scriptProcessor.disconnect(); scriptProcessor = null; }
    if (audioContext) { audioContext.close().catch(() => {}); audioContext = null; }
    if (mediaStream) { mediaStream.getTracks().forEach(t => t.stop()); mediaStream = null; }
  }

  // While recording from the mic the player has no loaded audio, so its total
  // time would go stale (it keeps the previous file's duration). Tick the
  // label with the elapsed recording length instead; streams that play a real
  // file (demo / stream-from-file) have a finite duration and are left alone.
  let liveDurationTimer = null;
  function startLiveDurationTicker() {
    stopLiveDurationTicker();
    const tick = () => {
      const a = activeAudio();
      if (isRecording && (!a || !a.src || !isFinite(a.duration))) {
        if (playerTotalTimeEl) playerTotalTimeEl.textContent = fmtPlayerTime((Date.now() - recordingStartTime) / 1000);
      }
    };
    tick();
    liveDurationTimer = setInterval(tick, 500);
  }
  function stopLiveDurationTicker() {
    if (liveDurationTimer) { clearInterval(liveDurationTimer); liveDurationTimer = null; }
  }

  function updateRecordButton() {
    if (isRecording) {
      if (plateStreamingLabel) {
        plateStreamingLabel.textContent =
          currentMode === 'transcription' || currentMode === 'velma' ? 'Listening…' : 'Streaming…';
      }
      setPlateState('streaming');
      startLiveDurationTicker();
    } else if (uploadPlate && uploadPlate.dataset.state === 'streaming') {
      // Stream ended — collapse to "New analysis" with the results visible below.
      stopLiveDurationTicker();
      setPlateState('uploaded');
      refreshBottomPanels();
      setPageTitle(resultsFilename.textContent);
      syncPlayerMeta();
    } else {
      stopLiveDurationTicker();
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
    } else if (currentMode === 'emotion' || currentMode === 'accent') {
      const cfg = EA_KINDS[currentMode];
      statsModalTitle.textContent = cfg.title + ' Statistics';
      const windows = currentData.time_series || [];
      const analyzedMs = windows.reduce((s, w) => s + (w.duration_ms || 0), 0);
      const distinct = [...new Set(windows.map(w => w[cfg.field]).filter(Boolean))];
      const procTimeStr = m.processingMs ? formatDuration(m.processingMs) : 'N/A';
      const procFactor = m.processingMs && analyzedMs ? (analyzedMs / m.processingMs).toFixed(1) + 'x real-time' : 'N/A';
      const httpStr = m.httpStatus ? m.httpStatus + (m.httpStatusText ? ' ' + m.httpStatusText : '') : 'N/A';
      const eaFilename = cfg.last.filename || cfg.demoFilename;
      const fileType = m.fileType || (eaFilename ? eaFilename.split('.').pop().toUpperCase() : 'N/A');

      groups = [
        { group: 'Detection', rows: [
          ['Model', cfg.model],
          ['Whole-file ' + cfg.field, currentData[cfg.field] || 'N/A'],
          ['Windows analyzed', String(windows.length)],
          ['Window length', '15 s'],
          ['Distinct ' + cfg.field + ' labels', distinct.length ? distinct.join(', ') : 'N/A'],
        ]},
        { group: 'Audio', rows: [
          ['File Name', eaFilename || 'N/A'],
          ['File Size', m.fileSize ? formatBytes(m.fileSize) : 'N/A'],
          ['File Type', fileType],
          ['Audio analyzed', formatDuration(analyzedMs) + ' (trailing remainder under 15 s is omitted)'],
        ]},
        { group: 'Performance', rows: [
          ['Processing Time', procTimeStr],
          ['Processing Factor', procFactor],
        ]},
        { group: 'Request', rows: [
          ['HTTP', httpStr],
          ['Endpoint', cfg.endpoint],
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
          if (xhr.status === 429) handleRateLimited();
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
    // Early stages check off on a CSS timer (per-chip --stage-delay via
    // nth-child) — that's decorative pacing, not real progress. The strip
    // therefore ends in a spinner that keeps running until the response
    // actually lands, so a long wait never looks "done".
    plateStages.innerHTML = names.map(n =>
      '<span class="pg-processing-stage">' +
      '<svg class="pg-stage-check" width="20" height="20" viewBox="0 0 10 10" aria-hidden="true">' +
      '<path d="M 1.5 4.55 L 4 7.95 L 9 2.05" fill="none" stroke="currentColor" stroke-width="1" /></svg>' +
      escapeHtml(n) + '</span>'
    ).join('') +
      '<span class="pg-processing-stage pg-processing-stage--spinner">' +
      '<img class="m__loader" src="/assets/service/loader-icon.svg" alt="" aria-hidden="true" />' +
      'Waiting for results…</span>';
  }

  function startProgress(estimatedMs) {
    buildStages();
    setPlateState('processing');
  }

  function finishProgress() {
    return new Promise((resolve) => setTimeout(resolve, 350));
  }

  function stopProgress() {}

  // A new analysis is starting \u2014 the old results would sit under the plate for
  // the whole wait otherwise. Clear the current mode's report, the shared player
  // surfaces and the bottom columns (the last-run caches survive, so switching
  // tabs still restores prior results; success overwrites them anyway).
  function clearCurrentResults() {
    clearPlayerStrips();
    sttChart.innerHTML = '';
    sttChart.classList.remove('visible');
    syncSpeakerLanes([]);
    if (bottomColumns) bottomColumns.classList.remove('visible');

    // Silence + unload the previous audio; the player captions reset via sync.
    [resultsAudio, originalAudio].forEach(a => {
      if (!a) return;
      a.pause();
      a.removeAttribute('src');
      try { a.load(); } catch (e) {}
    });
    if (mediaBox) mediaBox.dataset.playbackStarted = 'false';
    const container = mediaBox ? mediaBox.closest('.media-container') : null;
    if (container) container.dataset.playbackStarted = 'false';
    updatePlayIcon(false);
    syncPlayerMeta();

    const emptyVerdict = (id) => {
      const el = document.getElementById(id);
      if (el) { el.innerHTML = ''; el.className = 'pg-verdict-statement'; }
    };

    switch (currentMode) {
      case 'velma':
        clearVelmaResults();
        break;
      case 'transcription':
        sttUtterances = [];
        sttPartial = null;
        sttData = null;
        renderTranscript();
        break;
      case 'deepfake':
        resultsTbody.innerHTML = '';
        emptyVerdict('deepfake-verdict-statement');
        break;
      case 'music':
        musicTbody.innerHTML = '';
        emptyVerdict('music-verdict-statement');
        break;
      case 'aimusic':
        if (aimusicTbody) aimusicTbody.innerHTML = '';
        emptyVerdict('aimusic-verdict-statement');
        break;
      case 'language':
        emptyVerdict('language-verdict-statement');
        break;
      case 'redaction':
        renderRedactionTranscript([]);
        emptyVerdict('redaction-verdict-statement');
        break;
      case 'emotion':
      case 'accent': {
        const cfg = EA_KINDS[currentMode];
        if (cfg.tbody) cfg.tbody.innerHTML = '';
        if (cfg.legend) cfg.legend.innerHTML = '';
        emptyVerdict(currentMode + '-verdict-statement');
        break;
      }
    }
  }

  function showOverlay(filename, statusText) {
    clearCurrentResults();
    if (filename) setPageTitle(truncate(filename, 60));
    if (plateUploadingLabel) {
      plateUploadingLabel.textContent = statusText || ('Uploading \u201c' + truncate(filename || 'audio', 30) + '\u201d\u2026');
    }
    setPlateState('uploading');
  }

  function hideOverlay() {
    stopProgress();
    setPlateState('uploaded');
    // Not every batch success path resets the flag itself — this is the one
    // choke point they all pass through, and a stuck flag silently blocks
    // every subsequent "New analysis" upload.
    isAnalyzing = false;
    // Success handlers assign filename/currentData right AFTER calling
    // hideOverlay — defer the chrome sync one tick so it reads fresh values.
    setTimeout(() => {
      setPageTitle(resultsFilename.textContent);
      refreshBottomPanels();
      syncPlayerMeta();
    }, 0);
  }

  function showOverlayError(msg, rawText) {
    stopProgress();
    setPlateState('initial');
    isAnalyzing = false;
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

  const DEMO_VELMA_AUDIO_URL = '/deepfake/order-status-demo.mp3';
  const DEMO_VELMA_DATA_URL = '/velma-demo-data.json';
  let DEMO_VELMA_DATA = null;

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
  // The tab's default configuration: the "Fraud Detection and Prevention"
  // detection package (25 types, 14 roles, 18 preset behaviors) with every
  // STT signal and output ON — a package-accurate out-of-the-box demo.
  // Loaded from /velma-default-config.json (shared with the demo fixture
  // regeneration script); until it arrives we fall back to the literal
  // "default" contract.
  let velmaDefaultSeed = null;

  fetch('/velma-default-config.json')
    .then(r => (r.ok ? r.json() : null))
    .then(seed => {
      if (!seed) return;
      velmaDefaultSeed = seed;
      // If the user hasn't customized anything yet, adopt the seed as the
      // active config so untouched runs carry all signals + behaviors.
      if (velmaConfig === 'default') {
        velmaConfig = structuredClone(velmaDefaultSeed);
        rebuildLibraryFromConfig();
        updateVelmaConfigSummary();
        renderVelmaEditor();
        refreshConfigTextarea();
      }
    })
    .catch(() => {});

  function buildCustomConfigSeed() {
    if (velmaDefaultSeed) return structuredClone(velmaDefaultSeed);
    return {
      conversation_types: [],
      participant_roles: [],
      behaviors: [],
      stt: {
        speaker_diarization: true,
        emotion_signal: true,
        accent_signal: true,
        deepfake_signal: true,
        pii_phi_tagging: true,
      },
      produce_topics: true,
      produce_topic_sentiments: true,
      produce_summary: true,
    };
  }

  function buildDefaultVelmaConfig() {
    return velmaDefaultSeed ? structuredClone(velmaDefaultSeed) : 'default';
  }

  // "Default" now means the starter seed (or the literal string before it loads).
  function isDefaultConfig() {
    if (velmaConfig === 'default') return true;
    return velmaDefaultSeed != null &&
      JSON.stringify(velmaConfig) === JSON.stringify(velmaDefaultSeed);
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
  const velmaOptions       = document.getElementById('velma-options');
  const velmaConfigBtn     = document.getElementById('velma-config-btn');
  const velmaConfigSummary = document.getElementById('velma-config-summary');
  const velmaSetupBtn      = document.getElementById('velma-setup-btn');
  const velmaSummaryText   = document.getElementById('velma-summary-text');
  const velmaSpeakersTbody = document.getElementById('velma-speakers-tbody');
  const velmaBehaviorsTbody= document.getElementById('velma-behaviors-tbody');
  const velmaBehaviorsTable = document.querySelector('.velma-behaviors-table');
  const velmaResultsBehaviorsNote = document.getElementById('velma-results-behaviors-note');
  const velmaTopicsBySpeaker = document.getElementById('velma-topics-by-speaker');
  const velmaSummarySection      = document.getElementById('velma-summary-section');
  const velmaSpeakersSection     = document.getElementById('velma-speakers-section');
  const velmaBehaviorsSection    = document.getElementById('velma-behaviors-section');
  const velmaTopicsSection       = document.getElementById('velma-topics-section');
  const velmaConfigModal     = document.getElementById('velma-config-modal');
  const velmaConfigModalClose= document.getElementById('velma-config-modal-close');
  const velmaConfigTextarea  = document.getElementById('velma-config-textarea');
  const velmaConfigError     = document.getElementById('velma-config-error');
  const velmaConfigApplyBtn  = document.getElementById('velma-config-apply-btn');
  const velmaConfigResetBtn  = document.getElementById('velma-config-reset-btn');
  const velmaCfgTabBehaviors = document.getElementById('velma-cfg-tab-behaviors');
  const velmaCfgTabConfig    = document.getElementById('velma-cfg-tab-config');
  const velmaCfgConfigDot    = document.getElementById('velma-cfg-config-dot');
  const velmaCfgPanelBehaviors = document.getElementById('velma-cfg-panel-behaviors');
  const velmaCfgPanelConfig  = document.getElementById('velma-cfg-panel-config');
  const velmaCfgBehaviorsGrid = document.getElementById('velma-cfg-behaviors-grid');
  const velmaCfgBehaviorFilter = document.getElementById('velma-cfg-behavior-filter');
  const velmaCfgPackagesGrid = document.getElementById('velma-cfg-packages-grid');
  const velmaCfgConvGrid     = document.getElementById('velma-cfg-conv-grid');
  const velmaCfgRolesGrid    = document.getElementById('velma-cfg-roles-grid');
  const velmaCfgBehaviorsWarning = document.getElementById('velma-cfg-behaviors-warning');
  const velmaCfgAddConvBtn   = document.getElementById('velma-cfg-add-conv-btn');
  const velmaCfgAddRoleBtn   = document.getElementById('velma-cfg-add-role-btn');
  const velmaCfgAddBehaviorBtn = document.getElementById('velma-cfg-add-behavior-btn');
  const velmaCfgSaveBtn      = document.getElementById('velma-cfg-save-btn');
  const velmaCfgCopyBtn      = document.getElementById('velma-cfg-copy-btn');
  const velmaCfgDownloadBtn  = document.getElementById('velma-cfg-download-btn');
  const velmaCfgUploadBtn    = document.getElementById('velma-cfg-upload-btn');
  const velmaCfgUploadInput  = document.getElementById('velma-cfg-upload-input');
  const velmaCfgProblems     = document.getElementById('velma-cfg-problems');
  const velmaCfgSttDiar      = document.getElementById('velma-cfg-stt-diar');
  const velmaCfgSttEmot      = document.getElementById('velma-cfg-stt-emot');
  const velmaCfgSttAcc       = document.getElementById('velma-cfg-stt-acc');
  const velmaCfgSttDeepfake  = document.getElementById('velma-cfg-stt-deepfake');
  const velmaCfgSttPii       = document.getElementById('velma-cfg-stt-pii');
  const velmaCfgProdTopics   = document.getElementById('velma-cfg-prod-topics');
  const velmaCfgProdSentiments = document.getElementById('velma-cfg-prod-sentiments');
  const velmaCfgProdSummary  = document.getElementById('velma-cfg-prod-summary');

  // Velma state
  let velmaData = null;
  // What the most recent run asked for — used to flag "behaviors requested but
  // none came back" (the API drops behaviors when no conversation types/roles).
  let velmaLastRequest = null;
  function captureVelmaRequest() {
    if (typeof velmaConfig !== 'object') { velmaLastRequest = { behaviorsRequested: false }; return; }
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
    if (velmaConfig === 'default') {
      velmaConfigSummary.textContent = 'Endpoint default configuration';
      return;
    }
    const prefix = isDefaultConfig() ? 'Default' : 'Custom';
    const c = velmaConfig;
    const nT = (c.conversation_types || []).length;
    const nR = (c.participant_roles || []).length;
    const behaviors = c.behaviors || [];
    const nB = behaviors.length;
    const nPreset = behaviors.filter(b => typeof b === 'string').length;
    const behaviorLabel = `${nB} behavior${nB === 1 ? '' : 's'}` +
      (nPreset ? ` (${nPreset} preset${nPreset === 1 ? '' : 's'})` : '');
    velmaConfigSummary.textContent =
      `${prefix} · ${nT} conversation type${nT === 1 ? '' : 's'} · ${nR} role${nR === 1 ? '' : 's'} · ${behaviorLabel}`;
  }

  function clearVelmaResults() {
    if (!velmaContent) return;
    velmaData = null;
    velmaClipBehaviorsByUuid = {};
    // The transcript, emotion strip and bottom columns are shared surfaces —
    // clear them too, or a new stream plays over the previous run's report.
    sttUtterances = [];
    sttPartial = null;
    sttData = null;
    renderTranscript();
    syncSpeakerLanes([]);
    if (bottomColumns) bottomColumns.classList.remove('visible');
    velmaSummaryText.textContent = '';
    velmaSpeakersTbody.innerHTML = '';
    velmaBehaviorsTbody.innerHTML = '';
    velmaTopicsBySpeaker.innerHTML = '';
    if (velmaResultsBehaviorsNote) velmaResultsBehaviorsNote.style.display = 'none';
    if (velmaBehaviorsTable) velmaBehaviorsTable.style.display = '';
    if (velmaSummarySection)   velmaSummarySection.style.display = 'none';
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
      fileSize: 2807818,
      fileType: 'audio/mpeg',
      httpStatus: 200,
      httpStatusText: 'OK',
      responseSize: JSON.stringify(DEMO_VELMA_DATA).length,
      processingMs: 42000,
    };
    resultsFilename.textContent = DEMO_VELMA_DATA.filename || 'Order-status.mp3';
    resultsAudio.src = DEMO_VELMA_AUDIO_URL;
    renderVelmaResults(DEMO_VELMA_DATA);
  }

  // Show the pre-cached Velma demo (fetches the JSON once, then renders), so the
  // Velma tab opens populated like the other model tabs do with their DEMO_*_DATA.
  async function showVelmaDemo() {
    const data = await loadDemoVelmaData();
    if (!data) { clearVelmaResults(); return; }
    renderVelmaDemo();
    // The demo loads async — switchMode's refresh already ran with no data,
    // so sync the title, bottom columns and player once it's actually rendered.
    if (currentMode === 'velma') {
      setPageTitle(resultsFilename.textContent);
      refreshBottomPanels();
      syncPlayerMeta();
      // Demo on screen → collapsed plate, unless an analysis is mid-flight.
      const st = uploadPlate ? uploadPlate.dataset.state : '';
      if (!isAnalyzing && !isRecording && (st === 'initial' || st === 'low-quota')) {
        setPlateState('uploaded');
      }
    }
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
      const configField = (typeof velmaConfig === 'object') ? JSON.stringify(velmaConfig) : 'default';
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
      const file = new File([blob], 'Order-status.mp3', { type: blob.type || 'audio/mpeg' });
      startVelmaBatch(file);
    } catch (err) {
      showError(err.message || 'Could not load demo audio');
    }
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
      partial_clip: null,
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
        if (msg.clip) {
          velmaStreamData.clips.push(msg.clip);
          velmaStreamData.partial_clip = null;
        }
        break;
      case 'partial_clip':
        if (msg.partial_clip) velmaStreamData.partial_clip = msg.partial_clip;
        break;
      case 'clip_update':
        if (msg.clip_update && msg.clip_update.clip_uuid) {
          const idx = velmaStreamData.clips.findIndex(c => c.clip_uuid === msg.clip_update.clip_uuid);
          if (idx >= 0) velmaStreamData.clips[idx] = { ...velmaStreamData.clips[idx], ...msg.clip_update };
        }
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
        if (msg.detection) {
          // Detections can re-fire for the same behavior+speaker — keep the latest.
          const j = velmaStreamData.behaviors.findIndex(b =>
            b.behavior_uuid === msg.detection.behavior_uuid &&
            b.speaker_label === msg.detection.speaker_label);
          if (j >= 0) velmaStreamData.behaviors[j] = msg.detection;
          else velmaStreamData.behaviors.push(msg.detection);
        }
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
    return runVelmaStream(DEMO_VELMA_AUDIO_URL, 'Order-status.mp3', false);
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
        try { recordingWs.send(typeof velmaConfig === 'object' ? JSON.stringify(velmaConfig) : 'default'); } catch (e) {}
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
      updateRecordButton();

      // Protocol step 1: first text frame is the config — literal `default` or JSON BatchConfig.
      try { recordingWs.send(typeof velmaConfig === 'object' ? JSON.stringify(velmaConfig) : 'default'); } catch (e) {}

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

    // ── Role picks feed the Speakers table (design: role name + reasoning +
    //    "Inferred, N%" tag live inside the speaker cell). The conversation-type
    //    pick renders as the lead-in paragraph of Topics & Sentiment.
    const rolePicks = data.participant_role_picks || [];

    // ── Speaker→role maps (used by behavior table + transcript chips + topics)
    const clips = data.clips || [];
    const speakerToRole = {};
    const speakerToPick = {};
    rolePicks.forEach(rp => {
      speakerToRole[rp.speaker_label] = rp.name;
      speakerToPick[rp.speaker_label] = rp;
    });

    // ── Per-speaker emotion pattern rows
    const speakerStats = computeSpeakerStats(clips, data.duration_ms || 0);
    velmaSpeakersTbody.innerHTML = '';
    if (speakerStats.length) {
      velmaSpeakersSection.style.display = '';
      speakerStats.forEach(s => velmaSpeakersTbody.appendChild(buildSpeakerRow(s, speakerToPick[s.label])));
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
        renderVelmaBehaviorsTable(behaviors, speakerToRole);
      }
    } else {
      velmaBehaviorsSection.style.display = 'none';
    }

    // ── Topics, grouped by speaker, with per-topic sentiment chips
    velmaTopicsBySpeaker.innerHTML = '';
    const topics = data.topics || [];
    const ts = data.topic_sentiments || [];
    if (topics.length || ts.length || data.conversation_type_pick) {
      velmaTopicsSection.style.display = '';
      renderVelmaTopicsBySpeaker(topics, ts, speakerToRole, data.conversation_type_pick);
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
    // Mid-stream: surface the in-progress utterance like the STT tab does.
    if (!isFinal && data.partial_clip) {
      const pc = data.partial_clip;
      sttPartial = {
        text: pc.text,
        start_ms: pc.start_ms || 0,
        duration_ms: pc.duration_ms || 0,
        speaker: pc.speaker_label != null && speakerOrder[pc.speaker_label] != null
          ? speakerOrder[pc.speaker_label] : 1,
        language: pc.language, emotion: pc.emotion, accent: pc.accent,
      };
    } else {
      sttPartial = null;
    }
    sttData = { utterances: sttUtterances, duration_ms: data.duration_ms };

    // 3. Render via the shared pipeline (this draws the emotion clip strip in
    //    the player + the transcript rows below).
    renderTranscript();

    // 4. Relabel the player's speaker lanes with the inferred role names
    //    (design shows e.g. "Customer" / "Support specialist" on the strip).
    const laneLabels = Object.keys(speakerOrder)
      .sort((a, b) => speakerOrder[a] - speakerOrder[b])
      .map(label => speakerToRole[label] || label);
    if (laneLabels.length) syncSpeakerLanes(laneLabels);

    // 5. Patch the rendered rows: replace "Speaker N" with role name; add behavior links.
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
        const sp = bEl.querySelector('.pg-transcript-speaker');
        if (sp) sp.textContent = u.__velma_role_name;
      }
      // Add behavior links after the speaker (design: linked behavior names in the header)
      const clipB = velmaClipBehaviorsByUuid[u.clip_uuid] || [];
      if (clipB.length) {
        const header = bEl.querySelector('.pg-transcript-utterance-header');
        if (header) {
          const anchor = header.querySelector('.pg-transcript-speaker') || header.querySelector('.pg-transcript-time');
          clipB.forEach(cb => {
            const chip = document.createElement('a');
            chip.href = '#';
            chip.className = 'pg-behavior-link' + (cb.definitive ? ' definitive' : '');
            chip.textContent = cb.name;
            chip.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); });
            if (anchor && anchor.nextSibling) header.insertBefore(chip, anchor.nextSibling);
            else header.appendChild(chip);
          });
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
  // SelectionSource enum → display text ("auto_selected_single_option" would be ugly raw)
  function prettySelectionSource(source) {
    if (!source) return 'Inferred';
    if (source === 'auto_selected_single_option') return 'Auto-selected';
    return source.charAt(0).toUpperCase() + source.slice(1).replace(/_/g, ' ');
  }

  function buildSpeakerRow(s, rolePick) {
    const roleName = rolePick ? rolePick.name : null;
    const tr = document.createElement('tr');

    const tdSpeaker = document.createElement('td');
    let cell = '<span class="pg-speaker-cell-name">' + escapeHtml(roleName || s.label) + '</span>';
    const desc = rolePick ? (rolePick.reasoning || rolePick.detail || '') : '';
    if (desc) cell += '<div class="pg-speaker-cell-desc">' + escapeHtml(desc) + '</div>';
    if (rolePick && rolePick.confidence != null) {
      cell += '<span class="m__tag-flat">' + escapeHtml(prettySelectionSource(rolePick.selection_source)) + ', ' + Math.round(rolePick.confidence * 100) + '%</span>';
    }
    tdSpeaker.innerHTML = cell;
    tr.appendChild(tdSpeaker);

    // Emotion pattern: bar width = share of speaking time, segments = clip emotions
    const tdBar = document.createElement('td');
    const bar = document.createElement('div');
    bar.className = 'pg-emo-bar';
    bar.style.width = Math.max(2, Math.round(s.speakingPct * 100)) + '%';
    const totalSegMs = s.segments.reduce((a, x) => a + x.durationMs, 0) || 1;
    s.segments.forEach(seg => {
      const seg2 = document.createElement('div');
      seg2.className = 'pg-emo-seg';
      seg2.style.width = ((seg.durationMs / totalSegMs) * 100).toFixed(2) + '%';
      seg2.style.background = emotionVar(seg.emotion);
      seg2.dataset.tooltip = seg.emotion + ' \u00b7 ' + (seg.durationMs / 1000).toFixed(1) + 's';
      bar.appendChild(seg2);
    });
    tdBar.appendChild(bar);
    const labels = document.createElement('div');
    labels.className = 'pg-emo-labels';
    s.distinctEmotions.forEach((em, i) => {
      const chip = document.createElement('span');
      chip.className = 'ec-' + emotionSlug(em);
      chip.textContent = em;
      if (i > 0) labels.appendChild(document.createTextNode(', '));
      labels.appendChild(chip);
    });
    tdBar.appendChild(labels);
    tr.appendChild(tdBar);

    const tdTime = document.createElement('td');
    tdTime.className = 'pg-num';
    tdTime.textContent = Math.round(s.speakingPct * 100) + '%';
    tr.appendChild(tdTime);

    const tdLang = document.createElement('td');
    const langName2 = s.language ? languageName(s.language) : '';
    const accentName = s.accent ? (ACCENT_SHORT[s.accent] || s.accent) + ' accent' : '';
    tdLang.textContent = [langName2, accentName].filter(Boolean).join(', ');
    tr.appendChild(tdLang);
    return tr;
  }

  // Topics grouped by speaker — each speaker row shows their topics as
  // sentiment-colored chips. Fall back to a single "All speakers" row if
  // topic_sentiments is empty.
  function renderVelmaTopicsBySpeaker(topics, topicSentiments, speakerToRole, convPick) {
    // Lead-in: the conversation-type pick as a paragraph with an "Inferred, N%" tag
    if (convPick) {
      const type = document.createElement('div');
      type.className = 'pg-topics-type';
      let html = '<strong>' + escapeHtml(convPick.name || '') + '.</strong> ' +
        escapeHtml(convPick.reasoning || convPick.detail || '');
      if (convPick.confidence != null) {
        html += '<span class="m__tag-flat">' + escapeHtml(prettySelectionSource(convPick.selection_source)) + ', ' + Math.round(convPick.confidence * 100) + '%</span>';
      }
      type.innerHTML = html;
      velmaTopicsBySpeaker.appendChild(type);
    }

    const bySpeaker = new Map();
    topicSentiments.forEach(s => {
      const k = s.speaker_label;
      if (!bySpeaker.has(k)) bySpeaker.set(k, []);
      bySpeaker.get(k).push(s);
    });
    if (bySpeaker.size === 0 && !topics.length) return;

    const section = document.createElement('div');
    section.className = 'pg-results-table-section';
    const table = document.createElement('table');
    table.className = 'pg-topics-table';
    table.innerHTML = '<thead><tr><th>Speaker</th><th>Topics</th></tr></thead>';
    const tbody = document.createElement('tbody');

    const appendRow = (label, chips) => {
      const tr = document.createElement('tr');
      const tdSpeaker = document.createElement('td');
      tdSpeaker.innerHTML = '<span class="pg-speaker-cell-name">' + escapeHtml(label) + '</span>';
      tr.appendChild(tdSpeaker);
      const tdTopics = document.createElement('td');
      const group = document.createElement('div');
      group.className = 'm__tag-group';
      chips.forEach(c => group.appendChild(c));
      tdTopics.appendChild(group);
      tr.appendChild(tdTopics);
      tbody.appendChild(tr);
    };

    if (bySpeaker.size === 0) {
      appendRow('All speakers', topics.map(t => buildTopicChip(t, null)));
    } else {
      bySpeaker.forEach((sents, speakerLabel) => {
        const roleName = speakerToRole[speakerLabel];
        appendRow(roleName || speakerLabel, sents.map(s => buildTopicChip(s.topic, s)));
      });
    }
    table.appendChild(tbody);
    section.appendChild(table);
    velmaTopicsBySpeaker.appendChild(section);
  }

  function buildTopicChip(topic, sentiment) {
    const chip = document.createElement('span');
    chip.className = 'm__tag';
    if (sentiment && sentiment.sentiment_score < -0.1) chip.classList.add('m__tag--error');
    chip.appendChild(document.createTextNode(topic + ' '));
    if (sentiment) {
      const score = document.createElement('span');
      score.className = 'pg-num muted';
      const s = Number(sentiment.sentiment_score || 0).toFixed(2);
      score.textContent = (sentiment.sentiment_score > 0 ? '+' : '') + s;
      chip.appendChild(score);
      if (sentiment.sentiment_label) chip.dataset.tooltip = sentiment.sentiment_label + ' (' + s + ')';
    }
    return chip;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  // Design behaviors table: one speaker cell (rowspan) per group, detected rows
  // with linked names + evidence quotes, then a "Not detected" subhead for the rest.
  function renderVelmaBehaviorsTable(behaviors, speakerToRole) {
    const rank = (x) => x.error_reason ? 3 : x.skipped ? 2 : x.detected ? 0 : 1;
    const bySpeaker = new Map();
    behaviors.forEach(b => {
      const k = b.speaker_label || '\u2014';
      if (!bySpeaker.has(k)) bySpeaker.set(k, []);
      bySpeaker.get(k).push(b);
    });

    // Quote lookup: clip_uuid → clip text (for evidence links)
    const clipText = {};
    sttUtterances.forEach(u => { if (u.clip_uuid) clipText[u.clip_uuid] = u.text || ''; });

    bySpeaker.forEach((list, speakerLabel) => {
      const sorted = list.slice().sort((a, b) => {
        const ra = rank(a), rb = rank(b);
        if (ra !== rb) return ra - rb;
        return (b.confidence || 0) - (a.confidence || 0);
      });
      const detected = sorted.filter(b => rank(b) === 0);
      const rest = sorted.filter(b => rank(b) !== 0);
      // subhead counts as a row for the rowspan
      const groupRows = sorted.length + (detected.length && rest.length ? 1 : 0);

      let emittedSpeakerCell = false;
      const speakerCellHtml = () => {
        const roleName = speakerToRole[speakerLabel];
        return escapeHtml(roleName || speakerLabel);
      };

      const emitRow = (b, opts) => {
        const tr = document.createElement('tr');
        tr.className = 'pg-behavior-row' +
          (opts.detected ? ' pg-behavior-row--detected' : ' pg-behavior-row--inactive') +
          (opts.detectedLast ? ' pg-behavior-row--detected-last' : '') +
          (opts.groupEnd ? ' pg-behavior-row--group-end' : '');

        if (!emittedSpeakerCell) {
          const tdSpeaker = document.createElement('td');
          tdSpeaker.rowSpan = groupRows;
          tdSpeaker.className = 'pg-behavior-speaker-cell';
          tdSpeaker.innerHTML = speakerCellHtml();
          tr.appendChild(tdSpeaker);
          emittedSpeakerCell = true;
        }

        // Behavior name (linked when there is evidence to jump to)
        const tdName = document.createElement('td');
        const targetClipUuid = b.definitive_clip_uuid ||
          (Array.isArray(b.evidence_clip_uuids) && b.evidence_clip_uuids[0]) || null;
        if (opts.detected && targetClipUuid) {
          const link = document.createElement('a');
          link.href = '#';
          link.className = 'pg-behavior-link';
          link.innerHTML = '<svg width="18" height="18" aria-hidden="true"><use href="#behaviors" /></svg>' +
            escapeHtml(b.behavior_name);
          link.addEventListener('click', (e) => { e.preventDefault(); jumpToClip(targetClipUuid); });
          tdName.appendChild(link);
        } else {
          const name = document.createElement('span');
          name.className = 'pg-behavior-name' + (opts.detected ? '' : ' pg-behavior-name--inactive');
          name.textContent = b.behavior_name;
          tdName.appendChild(name);
        }
        // Config tooltip: what we asked the model to detect
        const cfg = (velmaConfig.behaviors || []).find(x => x.behavior_uuid === b.behavior_uuid);
        if (cfg && (cfg.short_description || cfg.detailed_description)) {
          tdName.dataset.tooltip = [cfg.short_description, cfg.detailed_description].filter(Boolean).join(' \u2014 ');
        }
        if (b.skipped || b.error_reason) {
          const flag = document.createElement('div');
          flag.className = 'caption';
          flag.textContent = b.error_reason ? 'error' : 'skipped';
          tdName.appendChild(flag);
        }
        tr.appendChild(tdName);

        // Model reasoning + evidence quotes
        const tdReasoning = document.createElement('td');
        const reasoning = document.createElement('div');
        reasoning.className = 'pg-model-reasoning';
        reasoning.textContent = b.reasoning || b.skip_reason || b.error_reason || '';
        tdReasoning.appendChild(reasoning);
        if (opts.detected && Array.isArray(b.evidence_clip_uuids) && b.evidence_clip_uuids.length) {
          const evList = document.createElement('div');
          evList.className = 'pg-evidence-list';
          b.evidence_clip_uuids.slice(0, 3).forEach(uuid => {
            const text = (clipText[uuid] || '').replace(/<[^>]+>/g, '');
            if (!text) return;
            const ev = document.createElement('a');
            ev.href = '#';
            ev.className = 'pg-evidence-link pg-evidence-link--fade';
            ev.textContent = text.length > 60 ? text.slice(0, 60) : text;
            ev.addEventListener('click', (e) => { e.preventDefault(); jumpToClip(uuid); });
            evList.appendChild(ev);
          });
          if (evList.children.length) tdReasoning.appendChild(evList);
        }
        tr.appendChild(tdReasoning);

        // Confidence
        const tdConf = document.createElement('td');
        tdConf.className = 'pg-num';
        tdConf.textContent = b.confidence == null ? '\u2014' : Math.round(b.confidence * 100) + '%';
        tr.appendChild(tdConf);

        velmaBehaviorsTbody.appendChild(tr);
      };

      detected.forEach((b, i) => emitRow(b, {
        detected: true,
        detectedLast: i === detected.length - 1 && rest.length > 0,
        groupEnd: i === detected.length - 1 && rest.length === 0,
      }));

      if (detected.length && rest.length) {
        const subhead = document.createElement('tr');
        subhead.className = 'pg-behavior-subhead-row';
        subhead.innerHTML = '<td colspan="3"><span class="pg-behavior-subhead">Not detected</span></td>';
        velmaBehaviorsTbody.appendChild(subhead);
      }

      rest.forEach((b, i) => emitRow(b, {
        detected: false,
        groupEnd: i === rest.length - 1,
      }));
    });
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

  // ── Editor state: the library ──────────────────────────────────────────────
  // The editor works on a "library": every definition it knows about (from the
  // active config, the preset catalog, uploads) with an enabled flag. Enabled
  // entries ARE velmaConfig's lists — syncConfigFromLibrary() rebuilds them
  // after every UI mutation, so the switches and the raw JSON never drift.
  //   behavior rows: { kind:'preset', id, catalog, def, enabled } — def is null
  //                  while the preset is a plain "preset:<id>" ref and gets
  //                  materialized on first edit ("Revert to preset" clears it);
  //                  { kind:'custom', def, enabled }
  //   type/role rows: { def, enabled }
  let velmaLibrary = { types: [], roles: [], behaviors: [] };
  const velmaOpenRows = new Set();   // accordion state, keyed by libraryRowKey
  let velmaCfgDirty = false;         // Config tab has unsaved textarea edits
  let velmaCfgLastValidation = { ok: true, config: null, problems: [] };

  const VELMA_STORAGE_KEY = 'velma-config-v1';

  function persistVelmaEditorState() {
    try {
      // An untouched (default) config is never persisted — it should always
      // follow the shipped seed, not a stale snapshot of it.
      if (isDefaultConfig()) { localStorage.removeItem(VELMA_STORAGE_KEY); return; }
      localStorage.setItem(VELMA_STORAGE_KEY, JSON.stringify({
        config: velmaConfig,
        library: velmaLibrary,
        expansions: Array.from(velmaPresetExpansions.entries()),
      }));
    } catch (e) { /* best-effort */ }
  }

  function restoreVelmaEditorState() {
    try {
      const stored = JSON.parse(localStorage.getItem(VELMA_STORAGE_KEY) || 'null');
      if (!stored || stored.config == null) return false;
      velmaConfig = stored.config;
      (stored.expansions || []).forEach(([uuid, id]) => velmaPresetExpansions.set(uuid, id));
      if (stored.library && Array.isArray(stored.library.behaviors)) velmaLibrary = stored.library;
      else rebuildLibraryFromConfig();
      updateVelmaConfigSummary();
      return true;
    } catch (e) { return false; }
  }

  function cfgKindMeta(kind) {
    if (kind === 'conv') return { uuidField: 'conversation_type_uuid', listField: 'conversation_types', libField: 'types' };
    if (kind === 'role') return { uuidField: 'participant_role_uuid', listField: 'participant_roles', libField: 'roles' };
    return { uuidField: 'behavior_uuid', listField: 'behaviors', libField: 'behaviors' };
  }

  function presetRef(identifier) { return 'preset:' + identifier; }

  function findPresetCatalog(id) {
    return (velmaPresetsCache || []).find(p => p.identifier === id) || null;
  }

  function libraryRowKey(kind, row) {
    if (kind === 'behavior' && row.kind === 'preset') return 'preset:' + row.id;
    const { uuidField } = cfgKindMeta(kind);
    return (row.def && row.def[uuidField]) || '';
  }

  function rebuildLibraryFromConfig() {
    const cfg = (typeof velmaConfig === 'object' && velmaConfig) ? velmaConfig : {};
    velmaLibrary.types = (cfg.conversation_types || []).map(def => ({ def, enabled: true }));
    velmaLibrary.roles = (cfg.participant_roles || []).map(def => ({ def, enabled: true }));
    velmaLibrary.behaviors = (cfg.behaviors || []).map(entry => {
      if (typeof entry === 'string') {
        const id = entry.replace(/^preset:/, '');
        return { kind: 'preset', id, catalog: findPresetCatalog(id), def: null, enabled: true };
      }
      const fromPreset = entry.behavior_uuid && velmaPresetExpansions.get(entry.behavior_uuid);
      if (fromPreset) return { kind: 'preset', id: fromPreset, catalog: findPresetCatalog(fromPreset), def: entry, enabled: true };
      return { kind: 'custom', def: entry, enabled: true };
    });
    mergeCatalogIntoLibrary();
  }

  // Catalog presets not present in the config appear as switched-off rows.
  function mergeCatalogIntoLibrary() {
    (velmaPresetsCache || []).forEach(p => {
      const row = velmaLibrary.behaviors.find(r => r.kind === 'preset' && r.id === p.identifier);
      if (row) { row.catalog = p; return; }
      velmaLibrary.behaviors.push({ kind: 'preset', id: p.identifier, catalog: p, def: null, enabled: false });
    });
  }

  // Enabled library entries → velmaConfig lists. The single write path for
  // every switch/edit on the Behaviors tab.
  function syncConfigFromLibrary() {
    ensureCustomConfig();
    velmaConfig.conversation_types = velmaLibrary.types.filter(r => r.enabled).map(r => r.def);
    velmaConfig.participant_roles = velmaLibrary.roles.filter(r => r.enabled).map(r => r.def);
    velmaConfig.behaviors = velmaLibrary.behaviors.filter(r => r.enabled)
      .map(r => (r.kind === 'preset' && !r.def) ? presetRef(r.id) : r.def);
    updateVelmaConfigSummary();
    updateBehaviorsWarning();
    renderPackagesGrid();
    refreshConfigTextarea();
    persistVelmaEditorState();
  }

  // ── Presets catalog ─────────────────────────────────────────────────────────
  let velmaPresetsCache = null;

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

  // ── Detection packages (docs.modulate.ai/velma/detection-packages) ─────────
  // Static copies live in /velma-packages/: index.json (manifest) + one full
  // {conversation_types, participant_roles, behaviors} bundle per slug.
  let velmaPackagesManifest = null;          // null = not loaded yet
  const velmaPackageConfigs = new Map();     // slug → { bundle, snapshot }

  function velmaListsSnapshot(cfg) {
    if (typeof cfg !== 'object' || !cfg) return '';
    return JSON.stringify({
      t: cfg.conversation_types || [], r: cfg.participant_roles || [], b: cfg.behaviors || [],
    });
  }

  async function loadVelmaPackages() {
    if (velmaPackagesManifest) return velmaPackagesManifest;
    try {
      const res = await fetch('/velma-packages/index.json');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      velmaPackagesManifest = await res.json();
    } catch (err) {
      console.warn('Velma packages failed to load:', err);
      velmaPackagesManifest = [];
    }
    return velmaPackagesManifest;
  }

  async function fetchPackageBundle(slug) {
    const cached = velmaPackageConfigs.get(slug);
    if (cached) return cached;
    const res = await fetch('/velma-packages/' + slug + '.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const bundle = await res.json();
    const entry = { bundle, snapshot: velmaListsSnapshot(bundle) };
    velmaPackageConfigs.set(slug, entry);
    return entry;
  }

  async function applyVelmaPackage(pkg) {
    let entry;
    try {
      entry = await fetchPackageBundle(pkg.slug);
    } catch (err) {
      velmaConfigError.textContent = 'Could not load the "' + pkg.name + '" package.';
      return;
    }
    velmaConfigError.textContent = '';
    // The package replaces the three lists; signals and outputs are kept.
    const cfg = structuredClone(typeof velmaConfig === 'object' && velmaConfig ? velmaConfig : buildCustomConfigSeed());
    cfg.conversation_types = structuredClone(entry.bundle.conversation_types || []);
    cfg.participant_roles = structuredClone(entry.bundle.participant_roles || []);
    cfg.behaviors = structuredClone(entry.bundle.behaviors || []);
    adoptVelmaConfig(cfg);
    refreshConfigTextarea(true);
    renderPackagesGrid();
  }

  function renderPackagesGrid() {
    if (!velmaCfgPackagesGrid) return;
    if (velmaPackagesManifest == null) {
      velmaCfgPackagesGrid.innerHTML = '<div class="caption velma-cfg-defn">Loading packages…</div>';
      return;
    }
    velmaCfgPackagesGrid.innerHTML = '';
    if (!velmaPackagesManifest.length) {
      velmaCfgPackagesGrid.innerHTML = '<div class="caption velma-cfg-defn">Packages unavailable.</div>';
      return;
    }
    const current = velmaListsSnapshot(velmaConfig);
    velmaPackagesManifest.forEach(pkg => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'velma-cfg-pkg';
      const cached = velmaPackageConfigs.get(pkg.slug);
      if (cached && cached.snapshot === current) card.classList.add('active');
      card.title = pkg.description || '';
      const name = document.createElement('span');
      name.className = 'velma-cfg-pkg-name';
      name.textContent = pkg.name;
      card.appendChild(name);
      const counts = document.createElement('span');
      counts.className = 'velma-cfg-pkg-counts';
      counts.textContent = pkg.behaviors + ' behaviors · ' + pkg.types + ' types · ' + pkg.roles + ' roles';
      card.appendChild(counts);
      card.addEventListener('click', () => applyVelmaPackage(pkg));
      velmaCfgPackagesGrid.appendChild(card);
    });
  }

  // ── Behaviors tab rendering ─────────────────────────────────────────────────

  function renderVelmaEditor() {
    renderVelmaSttToggles();
    renderVelmaOutputToggles();
    renderPackagesGrid();
    renderLibraryGrid('behavior', velmaCfgBehaviorsGrid, velmaLibrary.behaviors);
    renderLibraryGrid('conv', velmaCfgConvGrid, velmaLibrary.types);
    renderLibraryGrid('role', velmaCfgRolesGrid, velmaLibrary.roles);
    updateBehaviorsWarning();
  }

  let velmaBehaviorFilter = '';

  function renderLibraryGrid(kind, gridEl, rows) {
    if (!gridEl) return;
    gridEl.innerHTML = '';
    if (kind === 'behavior' && velmaPresetsCache == null && !rows.length) {
      gridEl.innerHTML = '<div class="caption velma-cfg-defn">Loading presets…</div>';
      return;
    }
    if (kind === 'behavior' && velmaBehaviorFilter) {
      const q = velmaBehaviorFilter.toLowerCase();
      const all = rows.length;
      rows = rows.filter(r => {
        const s = rowDisplaySource('behavior', r);
        return String(s.name || '').toLowerCase().includes(q) ||
          (r.kind === 'preset' && r.id.toLowerCase().includes(q));
      });
      if (!rows.length) {
        gridEl.innerHTML = '<div class="caption velma-cfg-defn">No behaviors match “' +
          escapeHtml(velmaBehaviorFilter) + '” (' + all + ' total).</div>';
        return;
      }
    }
    if (!rows.length) {
      const empty = document.createElement('div');
      empty.className = 'caption velma-cfg-defn';
      empty.textContent = kind === 'behavior' ? 'No behaviors yet — add a custom one below.'
        : 'None — Velma falls back to generic labels.';
      gridEl.appendChild(empty);
      return;
    }
    rows.forEach(row => gridEl.appendChild(buildLibraryRow(kind, row)));
  }

  function rowDisplaySource(kind, row) {
    if (kind === 'behavior' && row.kind === 'preset') return row.def || row.catalog || { name: row.id };
    return row.def || {};
  }

  function behaviorBadgeText(row) {
    if (row.kind !== 'preset') return 'custom';
    return row.def ? 'preset · edited' : 'preset';
  }

  // "3 types · 2 roles" chip for behaviors scoped via applies_to_* (uploaded
  // configs only — the UI itself never writes these fields).
  function scopeChipFor(def) {
    if (!def) return null;
    const t = Array.isArray(def.applies_to_conversation_type_uuids) ? def.applies_to_conversation_type_uuids : [];
    const r = Array.isArray(def.applies_to_participant_role_uuids) ? def.applies_to_participant_role_uuids : [];
    if (!t.length && !r.length) return null;
    const nameOf = (rows, uuidField, uuid) => {
      const hit = rows.find(x => x.def && x.def[uuidField] === uuid);
      return hit ? (hit.def.name || uuid) : uuid;
    };
    const parts = [];
    if (t.length) parts.push(t.length + ' type' + (t.length === 1 ? '' : 's'));
    if (r.length) parts.push(r.length + ' role' + (r.length === 1 ? '' : 's'));
    const chip = document.createElement('span');
    chip.className = 'velma-cfg-scope-chip';
    chip.textContent = parts.join(' · ');
    chip.title = 'Applies to: ' +
      t.map(u => nameOf(velmaLibrary.types, 'conversation_type_uuid', u))
        .concat(r.map(u => nameOf(velmaLibrary.roles, 'participant_role_uuid', u))).join(', ') +
      ' — edit scoping on the JSON tab';
    return chip;
  }

  function buildLibraryRow(kind, row) {
    const key = libraryRowKey(kind, row);
    const src = rowDisplaySource(kind, row);

    const item = document.createElement('div');
    item.className = 'velma-cfg-item' + (row.enabled ? ' on' : '') + (velmaOpenRows.has(key) ? ' open' : '');

    const head = document.createElement('div');
    head.className = 'velma-cfg-item-head';

    const sw = document.createElement('label');
    sw.className = 'm__toggle-secondary velma-cfg-item-switch';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!row.enabled;
    cb.addEventListener('change', () => {
      row.enabled = cb.checked;
      item.classList.toggle('on', row.enabled);
      syncConfigFromLibrary();
    });
    sw.appendChild(cb);
    sw.addEventListener('click', e => e.stopPropagation());
    head.appendChild(sw);

    const name = document.createElement('span');
    name.className = 'velma-cfg-item-name';
    name.textContent = src.name || '(unnamed)';
    head.appendChild(name);

    let badge = null;
    if (kind === 'behavior') {
      badge = document.createElement('span');
      badge.className = 'velma-cfg-item-badge' + (row.kind === 'custom' ? ' custom' : '');
      badge.textContent = behaviorBadgeText(row);
      head.appendChild(badge);
      const chip = scopeChipFor(row.def || row.catalog);
      if (chip) head.appendChild(chip);
    }

    const caret = document.createElement('span');
    caret.className = 'velma-cfg-item-caret';
    caret.textContent = '▾';
    head.appendChild(caret);

    if (src.short_description) head.title = src.short_description;
    head.addEventListener('click', () => {
      const open = !velmaOpenRows.has(key);
      if (open) velmaOpenRows.add(key); else velmaOpenRows.delete(key);
      item.classList.toggle('open', open);
      const existing = item.querySelector('.velma-cfg-item-body');
      if (existing) existing.remove();
      if (open) item.appendChild(buildRowDetail(kind, row, { name, badge }));
    });

    item.appendChild(head);
    if (velmaOpenRows.has(key)) item.appendChild(buildRowDetail(kind, row, { name, badge }));
    return item;
  }

  function buildRowDetail(kind, row, live) {
    const body = document.createElement('div');
    body.className = 'velma-cfg-item-body';
    const src = rowDisplaySource(kind, row);
    const isPresetRow = kind === 'behavior' && row.kind === 'preset';

    let note = null;
    const renderPresetNote = () => {
      if (!note) return;
      note.innerHTML = '';
      if (row.def) {
        note.appendChild(document.createTextNode('Edited copy of the server preset — sent as a full definition. '));
        const revert = document.createElement('a');
        revert.href = '#';
        revert.textContent = 'Revert to preset';
        revert.addEventListener('click', (e) => {
          e.preventDefault();
          if (row.def && row.def.behavior_uuid) velmaPresetExpansions.delete(row.def.behavior_uuid);
          row.def = null;
          syncConfigFromLibrary();
          renderVelmaEditor();
        });
        note.appendChild(revert);
      } else {
        note.textContent = 'Server preset (sent as "' + presetRef(row.id) + '"). Editing any field turns it into your own copy.';
      }
    };
    if (isPresetRow) {
      note = document.createElement('div');
      note.className = 'caption velma-cfg-item-note';
      renderPresetNote();
      body.appendChild(note);
    }

    // For preset rows the first edit materializes an editable BehaviorDef.
    const ensureDef = () => {
      if (!isPresetRow) return row.def;
      if (!row.def) {
        row.def = {
          behavior_uuid: newUuid(),
          name: (row.catalog && row.catalog.name) || row.id,
          short_description: (row.catalog && row.catalog.short_description) || '',
          detailed_description: (row.catalog && row.catalog.detailed_description) || '',
        };
        velmaPresetExpansions.set(row.def.behavior_uuid, row.id);
        if (live.badge) live.badge.textContent = behaviorBadgeText(row);
        renderPresetNote();
      }
      return row.def;
    };

    const onField = (field) => (val) => {
      const def = ensureDef();
      def[field] = val;
      if (field === 'name' && live.name) live.name.textContent = val || '(unnamed)';
      syncConfigFromLibrary();
    };

    body.appendChild(buildField('Name', 'input', src.name || '', onField('name')));
    body.appendChild(buildField('Short description', 'textarea', src.short_description || '', onField('short_description'), '2.5rem'));
    body.appendChild(buildField('Detailed description', 'textarea', src.detailed_description || '', onField('detailed_description'), '6rem'));

    if (!isPresetRow) {
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'm__button-secondary-outline S velma-cfg-item-remove';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        const { libField } = cfgKindMeta(kind);
        velmaLibrary[libField] = velmaLibrary[libField].filter(r => r !== row);
        velmaOpenRows.delete(libraryRowKey(kind, row));
        syncConfigFromLibrary();
        renderVelmaEditor();
      });
      body.appendChild(remove);
    }
    return body;
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

  function addLibraryEntry(kind) {
    const uuid = newUuid();
    let row;
    if (kind === 'conv') {
      row = { def: { conversation_type_uuid: uuid, name: 'New conversation type', short_description: '', detailed_description: '' }, enabled: true };
      velmaLibrary.types.push(row);
    } else if (kind === 'role') {
      row = { def: { participant_role_uuid: uuid, name: 'New role', short_description: '', detailed_description: '' }, enabled: true };
      velmaLibrary.roles.push(row);
    } else {
      row = { kind: 'custom', def: { behavior_uuid: uuid, name: 'New behavior', short_description: '', detailed_description: '' }, enabled: true };
      velmaLibrary.behaviors.push(row);
    }
    velmaOpenRows.add(libraryRowKey(kind, row));
    syncConfigFromLibrary();
    renderVelmaEditor();
    const gridEl = kind === 'conv' ? velmaCfgConvGrid : (kind === 'role' ? velmaCfgRolesGrid : velmaCfgBehaviorsGrid);
    const newItem = gridEl && gridEl.lastElementChild;
    if (newItem) {
      newItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      const firstInput = newItem.querySelector('input[type="text"]');
      if (firstInput) { firstInput.focus(); firstInput.select(); }
    }
  }

  // The API only evaluates behaviors when the config also has at least one
  // conversation type AND one participant role — otherwise it silently returns
  // an empty `behaviors` array (verified against the live endpoint).
  function updateBehaviorsWarning() {
    if (!velmaCfgBehaviorsWarning) return;
    const nBeh = velmaLibrary.behaviors.filter(r => r.enabled).length;
    const nT = velmaLibrary.types.filter(r => r.enabled).length;
    const nR = velmaLibrary.roles.filter(r => r.enabled).length;
    if (nBeh > 0 && (nT === 0 || nR === 0)) {
      velmaCfgBehaviorsWarning.innerHTML =
        '⚠ Behaviors need at least one conversation type and one role to run — ' +
        'as-is the API returns <strong>no behavior results</strong>. Enable or add them under ' +
        '<strong>Conversation context</strong> above.';
      velmaCfgBehaviorsWarning.style.display = '';
    } else {
      velmaCfgBehaviorsWarning.style.display = 'none';
    }
  }

  function renderVelmaSttToggles() {
    const s = (typeof velmaConfig === 'object' && velmaConfig.stt) ? velmaConfig.stt : buildCustomConfigSeed().stt;
    if (velmaCfgSttDiar)     velmaCfgSttDiar.checked     = !!s.speaker_diarization;
    if (velmaCfgSttEmot)     velmaCfgSttEmot.checked     = !!s.emotion_signal;
    if (velmaCfgSttAcc)      velmaCfgSttAcc.checked      = !!s.accent_signal;
    if (velmaCfgSttDeepfake) velmaCfgSttDeepfake.checked = !!s.deepfake_signal;
    if (velmaCfgSttPii)      velmaCfgSttPii.checked      = !!s.pii_phi_tagging;
  }

  function renderVelmaOutputToggles() {
    const c = (typeof velmaConfig === 'object') ? velmaConfig : buildCustomConfigSeed();
    if (velmaCfgProdTopics)     velmaCfgProdTopics.checked     = c.produce_topics !== false;
    if (velmaCfgProdSentiments) velmaCfgProdSentiments.checked = c.produce_topic_sentiments !== false;
    if (velmaCfgProdSummary)    velmaCfgProdSummary.checked    = c.produce_summary !== false;
  }

  // ── Config tab: raw BatchConfig with validation ─────────────────────────────

  const VELMA_CONFIG_KEYS = ['conversation_types', 'participant_roles', 'behaviors', 'stt',
    'produce_topics', 'produce_topic_sentiments', 'produce_summary'];
  const VELMA_BEHAVIOR_FIELDS = ['behavior_uuid', 'name', 'short_description', 'detailed_description',
    'applies_to_conversation_type_uuids', 'applies_to_participant_role_uuids'];

  function canonicalConfigText() { return JSON.stringify(velmaConfig, null, 2); }

  function refreshConfigTextarea(force) {
    if (!velmaConfigTextarea) return;
    if (velmaCfgDirty && !force) return;
    velmaConfigTextarea.value = canonicalConfigText();
    setCfgDirty(false);
    renderCfgProblems([]);
  }

  function setCfgDirty(dirty) {
    velmaCfgDirty = dirty;
    if (velmaCfgConfigDot) velmaCfgConfigDot.hidden = !dirty;
    updateSaveBtn();
  }

  function updateSaveBtn() {
    if (velmaCfgSaveBtn) velmaCfgSaveBtn.disabled = !velmaCfgDirty || !velmaCfgLastValidation.ok;
  }

  function renderCfgProblems(problems) {
    if (!velmaCfgProblems) return;
    velmaCfgProblems.innerHTML = '';
    (problems || []).forEach(p => {
      const li = document.createElement('li');
      li.className = p.level === 'error' ? 'err' : 'warn';
      li.textContent = p.text;
      velmaCfgProblems.appendChild(li);
    });
  }

  function sanitizeCfgEntry(kind, entry, problems) {
    const warn = t => problems.push({ level: 'warn', text: t });
    const error = t => problems.push({ level: 'error', text: t });
    const { uuidField } = cfgKindMeta(kind);
    const kindLabel = kind === 'conv' ? 'Conversation type' : (kind === 'role' ? 'Role' : 'Behavior');

    if (typeof entry === 'string') {
      if (kind !== 'behavior') { error(kindLabel + ' entries must be objects.'); return null; }
      const m = /^preset:([\w.-]+)$/.exec(entry);
      if (!m) { error('"' + entry + '" — behavior strings must look like "preset:<identifier>".'); return null; }
      if (velmaPresetsCache && velmaPresetsCache.length && !findPresetCatalog(m[1])) {
        error('Unknown preset "' + m[1] + '" — the API would reject this config (422).');
      }
      return entry;
    }
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      error(kindLabel + ' entries must be objects' + (kind === 'behavior' ? ' or "preset:<id>" strings.' : '.'));
      return null;
    }
    const allowed = kind === 'behavior' ? VELMA_BEHAVIOR_FIELDS
      : [uuidField, 'name', 'short_description', 'detailed_description'].concat(
          kind === 'role' ? ['applies_to_conversation_type_uuids'] : []);
    const clean = {};
    allowed.forEach(f => { if (entry[f] !== undefined) clean[f] = entry[f]; });
    const dropped = Object.keys(entry).filter(k => !allowed.includes(k));
    if (dropped.length) warn(kindLabel + ' "' + (entry.name || '?') + '": dropped non-schema field' + (dropped.length > 1 ? 's' : '') + ' ' + dropped.join(', ') + '.');
    if (!clean.name) error(kindLabel + ' entry is missing "name".');
    if (!clean[uuidField]) { clean[uuidField] = newUuid(); warn(kindLabel + ' "' + (clean.name || '?') + '": generated a missing ' + uuidField + '.'); }
    if (kind === 'behavior' && !clean.short_description && !clean.detailed_description) {
      warn('Behavior "' + (clean.name || '?') + '" has no description — detection quality will suffer.');
    }
    return clean;
  }

  // Parses + validates the Config tab text. Accepts a full BatchConfig,
  // {"behaviors": [...]}, a bare behavior array (both merge into the current
  // config), or the literal "default". DT-style: auto-repairs pasted fragments,
  // whitelists fields, and gates Save on error-level problems.
  function validateVelmaConfigText(text) {
    const problems = [];
    const warn = t => problems.push({ level: 'warn', text: t });
    const error = t => problems.push({ level: 'error', text: t });
    const raw = String(text || '').trim();
    if (!raw) {
      error('Empty — paste a BatchConfig, a {"behaviors": […]} object, or a bare behavior array.');
      return { ok: false, config: null, problems };
    }
    let parsed;
    try { parsed = JSON.parse(raw); }
    catch (e1) {
      try { parsed = JSON.parse('{' + raw + '}'); warn('Auto-repaired a pasted fragment (wrapped in braces).'); }
      catch (e2) {
        try { parsed = JSON.parse('{' + raw); warn('Auto-repaired a pasted fragment.'); }
        catch (e3) {
          error('Invalid JSON: ' + e1.message);
          return { ok: false, config: null, problems };
        }
      }
    }

    if (parsed === 'default') return { ok: true, config: 'default', problems };

    const base = () => structuredClone(typeof velmaConfig === 'object' && velmaConfig ? velmaConfig : buildCustomConfigSeed());
    let cfg;

    if (Array.isArray(parsed)) {
      warn('Bare behavior list — merged into the current config (types, roles and settings kept).');
      cfg = base();
      cfg.behaviors = parsed.map(e => sanitizeCfgEntry('behavior', e, problems)).filter(x => x != null);
    } else if (parsed && typeof parsed === 'object') {
      const hasOtherConfigKeys = VELMA_CONFIG_KEYS.some(k => k !== 'behaviors' && parsed[k] !== undefined);
      if (!hasOtherConfigKeys && Array.isArray(parsed.behaviors)) {
        warn('Behavior list — merged into the current config (types, roles and settings kept).');
        cfg = base();
        cfg.behaviors = parsed.behaviors.map(e => sanitizeCfgEntry('behavior', e, problems)).filter(x => x != null);
        Object.keys(parsed).filter(k => k !== 'behaviors').forEach(k => warn('Dropped unknown field "' + k + '".'));
      } else {
        cfg = {};
        cfg.conversation_types = (Array.isArray(parsed.conversation_types) ? parsed.conversation_types : [])
          .map(e => sanitizeCfgEntry('conv', e, problems)).filter(x => x != null);
        cfg.participant_roles = (Array.isArray(parsed.participant_roles) ? parsed.participant_roles : [])
          .map(e => sanitizeCfgEntry('role', e, problems)).filter(x => x != null);
        cfg.behaviors = (Array.isArray(parsed.behaviors) ? parsed.behaviors : [])
          .map(e => sanitizeCfgEntry('behavior', e, problems)).filter(x => x != null);
        if (parsed.stt !== undefined) {
          if (parsed.stt && typeof parsed.stt === 'object' && !Array.isArray(parsed.stt)) cfg.stt = parsed.stt;
          else warn('Dropped "stt" — it must be an object.');
        }
        ['produce_topics', 'produce_topic_sentiments', 'produce_summary'].forEach(k => {
          if (parsed[k] !== undefined) cfg[k] = !!parsed[k];
        });
        Object.keys(parsed).filter(k => !VELMA_CONFIG_KEYS.includes(k))
          .forEach(k => warn('Dropped unknown top-level field "' + k + '".'));
      }
    } else {
      error('Config must be a JSON object, an array of behaviors, or the string "default".');
      return { ok: false, config: null, problems };
    }

    if ((cfg.behaviors || []).length && (!(cfg.conversation_types || []).length || !(cfg.participant_roles || []).length)) {
      warn('Behaviors are listed but conversation types / roles are empty — the API will skip behavior detection.');
    }

    return { ok: !problems.some(p => p.level === 'error'), config: cfg, problems };
  }

  // Adopt a config (from Save / Upload / seed) as the single source of truth.
  function adoptVelmaConfig(cfg) {
    velmaConfig = cfg;
    if (typeof cfg === 'object' && cfg) {
      const uuids = new Set((cfg.behaviors || []).filter(b => b && typeof b === 'object').map(b => b.behavior_uuid));
      Array.from(velmaPresetExpansions.keys()).forEach(u => { if (!uuids.has(u)) velmaPresetExpansions.delete(u); });
    } else {
      velmaPresetExpansions.clear();
    }
    rebuildLibraryFromConfig();
    renderVelmaEditor();
    updateVelmaConfigSummary();
    persistVelmaEditorState();
  }

  // Returns true when there is nothing left unsaved (saved or already clean).
  function saveConfigEdits() {
    if (!velmaCfgDirty) return true;
    const v = validateVelmaConfigText(velmaConfigTextarea.value);
    velmaCfgLastValidation = v;
    if (!v.ok) { renderCfgProblems(v.problems); updateSaveBtn(); return false; }
    adoptVelmaConfig(v.config);
    refreshConfigTextarea(true);
    renderCfgProblems(v.problems.filter(p => p.level === 'warn'));
    return true;
  }

  // ── Tabs / modal shell ──────────────────────────────────────────────────────

  function switchCfgTab(tab) {
    const behaviors = tab === 'behaviors';
    if (velmaCfgTabBehaviors) {
      velmaCfgTabBehaviors.classList.toggle('active', behaviors);
      velmaCfgTabBehaviors.setAttribute('aria-selected', String(behaviors));
    }
    if (velmaCfgTabConfig) {
      velmaCfgTabConfig.classList.toggle('active', !behaviors);
      velmaCfgTabConfig.setAttribute('aria-selected', String(!behaviors));
    }
    if (velmaCfgPanelBehaviors) velmaCfgPanelBehaviors.hidden = !behaviors;
    if (velmaCfgPanelConfig) velmaCfgPanelConfig.hidden = behaviors;
    if (!behaviors) refreshConfigTextarea();
  }

  function openVelmaConfigModal() {
    velmaConfigError.textContent = '';
    if (typeof velmaConfig === 'object' || velmaDefaultSeed) ensureCustomConfig();
    if (!velmaLibrary.behaviors.length && !velmaLibrary.types.length && !velmaLibrary.roles.length) {
      rebuildLibraryFromConfig();
    }
    renderVelmaEditor();
    refreshConfigTextarea();
    switchCfgTab('behaviors');
    velmaConfigModal.hidden = false;
    loadVelmaPackages().then((manifest) => {
      renderPackagesGrid();
      Promise.all(manifest.map(p => fetchPackageBundle(p.slug).catch(() => null)))
        .then(renderPackagesGrid);
    });
    // Presets load lazily (read-only, no usage cost); off rows appear when ready.
    loadVelmaPresets().then(() => {
      mergeCatalogIntoLibrary();
      renderVelmaEditor();
      if (velmaCfgDirty) {
        velmaCfgLastValidation = validateVelmaConfigText(velmaConfigTextarea.value);
        renderCfgProblems(velmaCfgLastValidation.problems);
        updateSaveBtn();
      }
    });
  }

  function closeVelmaConfigModal() {
    velmaConfigModal.hidden = true;
  }

  // ── Wiring ──────────────────────────────────────────────────────────────────

  if (velmaConfigBtn) velmaConfigBtn.addEventListener('click', openVelmaConfigModal);
  if (velmaSetupBtn) velmaSetupBtn.addEventListener('click', openVelmaConfigModal);
  if (velmaConfigModalClose) velmaConfigModalClose.addEventListener('click', closeVelmaConfigModal);
  if (velmaConfigModal) closeOnBackdrop(velmaConfigModal, closeVelmaConfigModal);

  if (velmaCfgTabBehaviors) velmaCfgTabBehaviors.addEventListener('click', () => switchCfgTab('behaviors'));
  if (velmaCfgTabConfig) velmaCfgTabConfig.addEventListener('click', () => switchCfgTab('config'));

  if (velmaCfgBehaviorFilter) {
    velmaCfgBehaviorFilter.addEventListener('input', () => {
      velmaBehaviorFilter = velmaCfgBehaviorFilter.value.trim();
      renderLibraryGrid('behavior', velmaCfgBehaviorsGrid, velmaLibrary.behaviors);
    });
  }

  if (velmaCfgAddConvBtn) velmaCfgAddConvBtn.addEventListener('click', () => addLibraryEntry('conv'));
  if (velmaCfgAddRoleBtn) velmaCfgAddRoleBtn.addEventListener('click', () => addLibraryEntry('role'));
  if (velmaCfgAddBehaviorBtn) velmaCfgAddBehaviorBtn.addEventListener('click', () => addLibraryEntry('behavior'));

  // Signals (5 booleans on stt).
  [
    [velmaCfgSttDiar, 'speaker_diarization'],
    [velmaCfgSttEmot, 'emotion_signal'],
    [velmaCfgSttAcc, 'accent_signal'],
    [velmaCfgSttDeepfake, 'deepfake_signal'],
    [velmaCfgSttPii, 'pii_phi_tagging'],
  ].forEach(([cb, field]) => {
    if (!cb) return;
    cb.addEventListener('change', () => {
      ensureCustomConfig();
      velmaConfig.stt = velmaConfig.stt || {};
      velmaConfig.stt[field] = cb.checked;
      refreshConfigTextarea();
      persistVelmaEditorState();
    });
  });

  // Outputs (produce_*).
  [
    [velmaCfgProdTopics, 'produce_topics'],
    [velmaCfgProdSentiments, 'produce_topic_sentiments'],
    [velmaCfgProdSummary, 'produce_summary'],
  ].forEach(([cb, field]) => {
    if (!cb) return;
    cb.addEventListener('change', () => {
      ensureCustomConfig();
      velmaConfig[field] = cb.checked;
      refreshConfigTextarea();
      persistVelmaEditorState();
    });
  });

  if (velmaConfigTextarea) {
    velmaConfigTextarea.addEventListener('input', () => {
      setCfgDirty(velmaConfigTextarea.value !== canonicalConfigText());
      if (!velmaCfgDirty) { renderCfgProblems([]); return; }
      velmaCfgLastValidation = validateVelmaConfigText(velmaConfigTextarea.value);
      renderCfgProblems(velmaCfgLastValidation.problems);
      updateSaveBtn();
    });
  }

  if (velmaCfgSaveBtn) {
    velmaCfgSaveBtn.addEventListener('click', () => {
      if (saveConfigEdits()) switchCfgTab('behaviors');
    });
  }

  if (velmaCfgCopyBtn) {
    velmaCfgCopyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(velmaConfigTextarea.value);
        const orig = velmaCfgCopyBtn.textContent;
        velmaCfgCopyBtn.textContent = '✓ Copied';
        setTimeout(() => { velmaCfgCopyBtn.textContent = orig; }, 1200);
      } catch (e) { /* clipboard unavailable */ }
    });
  }

  if (velmaCfgDownloadBtn) {
    velmaCfgDownloadBtn.addEventListener('click', () => {
      const blob = new Blob([velmaConfigTextarea.value], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'velma-config.json';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 0);
    });
  }

  function loadConfigTextFromFile(file) {
    if (!file) return;
    file.text().then(text => {
      switchCfgTab('config');
      velmaConfigTextarea.value = text;
      setCfgDirty(true);
      velmaCfgLastValidation = validateVelmaConfigText(text);
      renderCfgProblems(velmaCfgLastValidation.problems);
      updateSaveBtn();
    }).catch(() => {
      renderCfgProblems([{ level: 'error', text: 'Could not read the file.' }]);
    });
  }

  if (velmaCfgUploadBtn && velmaCfgUploadInput) {
    velmaCfgUploadBtn.addEventListener('click', () => velmaCfgUploadInput.click());
    velmaCfgUploadInput.addEventListener('change', () => {
      if (velmaCfgUploadInput.files.length > 0) loadConfigTextFromFile(velmaCfgUploadInput.files[0]);
      velmaCfgUploadInput.value = '';
    });
  }

  if (velmaCfgPanelConfig) {
    velmaCfgPanelConfig.addEventListener('dragover', (e) => {
      e.preventDefault();
      velmaCfgPanelConfig.classList.add('drag-over');
    });
    velmaCfgPanelConfig.addEventListener('dragleave', () => velmaCfgPanelConfig.classList.remove('drag-over'));
    velmaCfgPanelConfig.addEventListener('drop', (e) => {
      e.preventDefault();
      velmaCfgPanelConfig.classList.remove('drag-over');
      if (e.dataTransfer.files.length > 0) loadConfigTextFromFile(e.dataTransfer.files[0]);
    });
  }

  if (velmaConfigApplyBtn) {
    velmaConfigApplyBtn.addEventListener('click', () => {
      if (velmaCfgDirty && !saveConfigEdits()) {
        velmaConfigError.textContent = 'The Config tab has unsaved edits that don’t validate — fix them or Reset.';
        switchCfgTab('config');
        return;
      }
      velmaConfigError.textContent = '';
      updateVelmaConfigSummary();
      persistVelmaEditorState();
      closeVelmaConfigModal();
    });
  }

  if (velmaConfigResetBtn) {
    velmaConfigResetBtn.addEventListener('click', () => {
      velmaConfig = buildDefaultVelmaConfig();
      velmaPresetExpansions.clear();
      velmaOpenRows.clear();
      try { localStorage.removeItem(VELMA_STORAGE_KEY); } catch (e) {}
      velmaConfigError.textContent = '';
      setCfgDirty(false);
      rebuildLibraryFromConfig();
      renderVelmaEditor();
      refreshConfigTextarea(true);
      updateVelmaConfigSummary();
    });
  }

  // A config uploaded/customized for a demo must survive a reload.
  restoreVelmaEditorState();

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
    if (path === '/emotion') return 'emotion';
    if (path === '/accent') return 'accent';
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
