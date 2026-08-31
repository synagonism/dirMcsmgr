/*
 * mSortFileReverse.mjs - module that sorts the-lines of text-file in reverse order
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Kaseluris.Nikos.1959 (hmnSngo)
 * kaseluris.nikos@gmail.com
 * https:// synagonism.net/
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
 *   it works as a-module AND stand-alone.
 * INPUT: a-text file
 * OUTPUT: this file after reverse sorting
 *
 * RUN: node Mcsmgr/mSortFileReverse.mjs sFileIn sFileOut
 */

import moFs from 'fs';
import mfReadlines from 'n-readlines'; // npm install n-readlines
import {fWriteJsonArray} from './mUtil.mjs'

const
  // contains the-versions of mSortFileReverse.mjs 
  aVersion = [
    'mSortFileReverse.mjs: {2022-01-26} created'
  ]

let
  sFileIn,
  sFileOut

if (process.argv[2]) {
  sFileIn = process.argv[2]
} else {
  console.log('type sFileIn after mSortFileReverse.mjs')
  process.exit()
}

if (process.argv[3]) {
  sFileOut = process.argv[3]
} else {
  console.log('type sFileOut after sFileIn')
  process.exit()
}


/**
 * DOING: it sorts the-lines by suffix
 */
function mSortFileReverse(sFileIn, sFileOut) {
  let
    aFileIn,
    aFile = [],
    n,
    s = '',
    sLn

  aFileIn = moFs.readFileSync(sFileIn).toString().split('\n')

  for (n = 0; n < aFileIn.length; n++) {
    sLn = aFileIn[n]
    //reverse line
    sLn = sLn.split('').reverse().join('')
    //add on new array
    aFile[n] = sLn
  }

  //sort new array
  aFile = aFile.sort()

  //reverse the-new array
  for (n = 0; n < aFile.length; n++) {
    sLn = aFile[n]
    //reverse line
    sLn = sLn.split('').reverse().join('')
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
mSortFileReverse(sFileIn, sFileOut)

export {mSortFileReverse}