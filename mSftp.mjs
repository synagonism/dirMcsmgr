/**
 * DOING: sftp the-files in dirManager/sftp.json
 * INPUT:
 * OUTPUT:
 * RUN: node mSftp.mjs password
 *
 * modified: {2021-04-29}
 * created: {2018-09-27}
 */

import moFs from 'fs'
import mfClient from 'ssh2-sftp-client'
import mfEs6_promise_pool from 'es6-promise-pool'

var oSftp = {
  host: 'linux1087.grserver.gr',
  port: 2234,
  username: 'kaseluri160933'
}

if (process.argv[2]) {
  oSftp.password = process.argv[2]
} else {
  console.log('type password as 3rd argument')
  process.exit()
}

function fSftp () {
  var aFil = JSON.parse(moFs.readFileSync('dirManager/sftp.json'))
  console.log(aFil)
  // worldview-agnostic: local root = the worldview folder we run in (cwd); remote = httpdocs/<worldview>/
  var sLocalRoot = process.cwd().replace(/\\/g, '/') + '/'
  var sWorldview = sLocalRoot.split('/').filter(Boolean).pop()

  const fSend_file = (oConfigIn, sFileIn) => {
      return new Promise(function (resolve, reject) {
      let sftp = new mfClient();
      console.log(sFileIn);
      sftp.on('keyboard-interactive', (name, instructions, instructionsLang, prompts, finish) => { finish([oConfigIn.password]); });
      sftp.connect(oConfigIn).then(() => {
        // SPECIFIC INFO
        return sftp.put(sLocalRoot + sFileIn,
          "/var/www/vhosts/synagonism.net/httpdocs/" + sWorldview + "/" + sFileIn);
      }).then(() => {
        console.log('finish '+sFileIn);
        sftp.end();
        resolve(sFileIn);
      }).catch((err) => {
        console.log(err, 'catch error');
      });
    });
  };

  var nCount = 0;
  var fSend_file_producer = function () {
    console.log("count= " + nCount);
    if (nCount < aFil.length) {
      nCount++;
      return(fSend_file(oSftp, aFil[nCount-1]));
    } else {
      return null;
    }
  }

  // The number of promises to process simultaneously.
  var nConcurrency = 10;

  // Create a pool.
  var oPool = new mfEs6_promise_pool(fSend_file_producer, nConcurrency)

  oPool.start().then(function () {
    console.log({"message":"OK"}); // res.send('{"message":"OK"}');
  });
}

export {oSftp, fSftp}