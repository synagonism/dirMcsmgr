/*
 * mEllaTxtfnm.mjs - module that converts GreekAncient text to phonemic-notation
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Kaseluris.Nikos.1959 (hmnSngo)
 * kaseluris.nikos@gmail.com
 * https://synagonism.net/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * DOING:
 * INPUT: wrd.txt
 * OUTPUT: wrd2.txt
 *
 * RUN: node Mcsmgr/mEllaTxtfm.mjs wrd.txt
 *
 * PROBLEM:
 * - 
 *
 */

import moFs from 'fs';
import mfReadlines from 'n-readlines'; // npm install n-readlines
import * as moLagElla from './mLagElla.js'

const
  // contains the-versions of mHitp.js 
  aVersion = [
    'mEllaTxtFnm.mjs.0-1-0.2022-05-12: created'
  ]

let
  sFileIn = 'wrd.txt',
  sFileOut = 'wrd2.txt'


/**
 * DOING: it finds the-phonemic-notation of Greek-words
 */
function mEllaTxtFnm(sFileIn, sFileOut) {
  let
    aFileIn,
    aFile = [],
    n,
    s = '',
    sLn

  aFileIn = moFs.readFileSync(sFileIn).toString().split('\n')

  for (n = 0; n < aFileIn.length; n++) {
    sLn = aFileIn[n]
    //finds pronunciation
    sLn = sLn + moLagElla.fEllawordFindPhonemaBoth(sLn)
    //add on new array
    aFile[n] = sLn
  }

  //create string of new array
  for (n = 0; n < aFile.length; n++) {
    sLn = aFile[n]
    s = s + sLn + '\n'
  }

  //write new file
  moFs.writeFileSync(sFileOut, s)
}
mEllaTxtFnm(sFileIn, sFileOut)

export {mEllaTxtFnm}