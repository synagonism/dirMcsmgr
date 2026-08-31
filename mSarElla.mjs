/*
 * mSar.mjs - module that SEARCHES and REPLACES the-lines of a-file
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
 * OUTPUT: this file after SaR
 *
 * RUN: node Mcsmgr/mSar.mjs sFileIn sFileOut
 */

import moFs from 'fs';
import mfReadlines from 'n-readlines'; // npm install n-readlines
import {fWriteJsonArray} from './mUtil.mjs'

const
  // contains the-versions of mSar.mjs 
  aVersion = [
    'mSar.mjs: {2022-01-08} created'
  ]

let
  sFileIn,
  sFileOut

if (process.argv[2]) {
  sFileIn = process.argv[2]
} else {
  console.log('type sFileIn after mSar.mjs')
  process.exit()
}

if (process.argv[3]) {
  sFileOut = process.argv[3]
} else {
  console.log('type sFileOut after sFileIn')
  process.exit()
}


/**
 * DOING:
 *  it replaces idWrdrElla000ἀ for idWrdrElla0007936
 */
function fReplaceEllaId(sFileIn, sFileOut) {
  let
    aFileIn,
    n,
    s = '',
    sLn

  aFileIn = moFs.readFileSync(sFileIn).toString().split('\n')

  for (n = 0; n < aFileIn.length; n++) {
    sLn = aFileIn[n]

    //replace idWrdrEllaἀ for idWrdrElla7936
    // sLn='abc idWrdrEllaἀ" jklἀ idWrdrElla234ἀ ἀβγ'
    // 'abc idWrdrElla7936" jklἀ idWrdrElla2347936 ἀβγ'
    // 3digits start with 9
    // 4digits start with 7 or 8
    while (new RegExp('idWrdrElla[0-9;]*[ΆΑάαἀἁἂἃἄἅἆἇἈἉἊἋἌἍἎἏὰάᾀᾁᾂᾃᾄᾅᾆᾇᾈᾉᾊᾋᾌᾍᾎᾏᾰᾱᾲᾳᾴᾶᾷᾸᾹᾺΆᾼΒβΓγΔδΈΕέεἐἑἒἓἔἕἘἙἚἛἜἝὲέῈΈΖζΉΗήηἠἡἢἣἤἥἦἧἨἩἪἫἬἭἮἯὴήᾐᾑᾒᾓᾔᾕᾖᾗᾘᾙᾚᾛᾜᾝᾞᾟῂῃῄῆῇῊΉῌΘθΊΙίιἰἱἲἳἴἵἶἷἸἹἺἻἼἽἾἿὶίῐῑῒΐῖῗῘῙῚΊΚκΛλΜμΝνΞξΌΟοόὀὁὂὃὄὅὈὉὊὋὌὍὸόΠπΡρῤῥῬΣσΤτΎΥυύὐὑὒὓὔὕὖὗὙὛὝὟὺύῠῡῢΰῦῧῨῩῪΎΦφΧχΨψΏΩωώὠὡὢὣὤὥὦὧὨὩὪὫὬὭὮὯὼώᾠᾡᾢᾣᾤᾥᾦᾧᾨᾩᾪᾫᾬᾭᾮᾯῲῳῴῶῷῸΌῺΏῼ]').test(sLn)) {
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ά/g, 'idWrdrElla$1902;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Α/g, 'idWrdrElla$1913;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ά/g, 'idWrdrElla$1940;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)α/g, 'idWrdrElla$1945;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἀ/g, 'idWrdrElla$17936;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἁ/g, 'idWrdrElla$17937;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἂ/g, 'idWrdrElla$17938;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἃ/g, 'idWrdrElla$17939;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἄ/g, 'idWrdrElla$17940;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἅ/g, 'idWrdrElla$17941;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἆ/g, 'idWrdrElla$17942;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἇ/g, 'idWrdrElla$17943;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἀ/g, 'idWrdrElla$17944;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἁ/g, 'idWrdrElla$17945;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἂ/g, 'idWrdrElla$17946;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἃ/g, 'idWrdrElla$17947;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἄ/g, 'idWrdrElla$17948;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἅ/g, 'idWrdrElla$17949;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἆ/g, 'idWrdrElla$17950;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἇ/g, 'idWrdrElla$17951;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὰ/g, 'idWrdrElla$18048;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ά/g, 'idWrdrElla$18049;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾀ/g, 'idWrdrElla$18064;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾁ/g, 'idWrdrElla$18065;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾂ/g, 'idWrdrElla$18066;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾃ/g, 'idWrdrElla$18067;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾄ/g, 'idWrdrElla$18068;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾅ/g, 'idWrdrElla$18069;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾆ/g, 'idWrdrElla$18070;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾇ/g, 'idWrdrElla$18071;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾈ/g, 'idWrdrElla$18072;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾉ/g, 'idWrdrElla$18073;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾊ/g, 'idWrdrElla$18074;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾋ/g, 'idWrdrElla$18075;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾌ/g, 'idWrdrElla$18076;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾍ/g, 'idWrdrElla$18077;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾎ/g, 'idWrdrElla$18078;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾏ/g, 'idWrdrElla$18079;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾰ/g, 'idWrdrElla$18112;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾱ/g, 'idWrdrElla$18113;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾲ/g, 'idWrdrElla$18114;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾳ/g, 'idWrdrElla$18115;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾴ/g, 'idWrdrElla$18116;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾶ/g, 'idWrdrElla$18118;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾷ/g, 'idWrdrElla$18119;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ᾰ/g, 'idWrdrElla$18120;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ᾱ/g, 'idWrdrElla$18121;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὰ/g, 'idWrdrElla$18122;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ά/g, 'idWrdrElla$18123;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾼ/g, 'idWrdrElla$18124;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Β/g, 'idWrdrElla$1914;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)β/g, 'idWrdrElla$1946;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Γ/g, 'idWrdrElla$1915;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)γ/g, 'idWrdrElla$1947;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Δ/g, 'idWrdrElla$1916;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)δ/g, 'idWrdrElla$1948;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Έ/g, 'idWrdrElla$1904;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ε/g, 'idWrdrElla$1917;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)έ/g, 'idWrdrElla$1941;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ε/g, 'idWrdrElla$1949;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἐ/g, 'idWrdrElla$17952;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἑ/g, 'idWrdrElla$17953;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἒ/g, 'idWrdrElla$17954;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἓ/g, 'idWrdrElla$17955;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἔ/g, 'idWrdrElla$17956;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἕ/g, 'idWrdrElla$17957;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἐ/g, 'idWrdrElla$17960;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἑ/g, 'idWrdrElla$17961;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἒ/g, 'idWrdrElla$17962;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἓ/g, 'idWrdrElla$17963;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἔ/g, 'idWrdrElla$17964;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἕ/g, 'idWrdrElla$17965;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὲ/g, 'idWrdrElla$18050;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)έ/g, 'idWrdrElla$18051;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὲ/g, 'idWrdrElla$18136;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Έ/g, 'idWrdrElla$18137;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ζ/g, 'idWrdrElla$1918;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ζ/g, 'idWrdrElla$1950;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ή/g, 'idWrdrElla$1905;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Η/g, 'idWrdrElla$1919;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ή/g, 'idWrdrElla$1942;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)η/g, 'idWrdrElla$1951;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἠ/g, 'idWrdrElla$17968;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἡ/g, 'idWrdrElla$17969;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἢ/g, 'idWrdrElla$17970;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἣ/g, 'idWrdrElla$17971;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἤ/g, 'idWrdrElla$17972;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἥ/g, 'idWrdrElla$17973;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἦ/g, 'idWrdrElla$17974;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἧ/g, 'idWrdrElla$17975;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἠ/g, 'idWrdrElla$17976;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἡ/g, 'idWrdrElla$17977;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἢ/g, 'idWrdrElla$17978;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἣ/g, 'idWrdrElla$17979;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἤ/g, 'idWrdrElla$17980;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἥ/g, 'idWrdrElla$17981;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἦ/g, 'idWrdrElla$17982;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἧ/g, 'idWrdrElla$17983;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὴ/g, 'idWrdrElla$18052;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ή/g, 'idWrdrElla$18053;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾐ/g, 'idWrdrElla$18080;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾑ/g, 'idWrdrElla$18081;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾒ/g, 'idWrdrElla$18082;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾓ/g, 'idWrdrElla$18083;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾔ/g, 'idWrdrElla$18084;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾕ/g, 'idWrdrElla$18085;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾖ/g, 'idWrdrElla$18086;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾗ/g, 'idWrdrElla$18087;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾘ/g, 'idWrdrElla$18088;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾙ/g, 'idWrdrElla$18089;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾚ/g, 'idWrdrElla$18090;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾛ/g, 'idWrdrElla$18091;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾜ/g, 'idWrdrElla$18092;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾝ/g, 'idWrdrElla$18093;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾞ/g, 'idWrdrElla$18094;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾟ/g, 'idWrdrElla$18095;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῂ/g, 'idWrdrElla$18130;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῃ/g, 'idWrdrElla$18131;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῄ/g, 'idWrdrElla$18132;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῆ/g, 'idWrdrElla$18134;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῇ/g, 'idWrdrElla$18135;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὴ/g, 'idWrdrElla$18138;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ή/g, 'idWrdrElla$18139;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῌ/g, 'idWrdrElla$18140;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Θ/g, 'idWrdrElla$1920;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)θ/g, 'idWrdrElla$1952;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ί/g, 'idWrdrElla$1906;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ι/g, 'idWrdrElla$1921;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ί/g, 'idWrdrElla$1943;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ι/g, 'idWrdrElla$1953;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἰ/g, 'idWrdrElla$17984;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἱ/g, 'idWrdrElla$17985;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἲ/g, 'idWrdrElla$17986;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἳ/g, 'idWrdrElla$17987;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἴ/g, 'idWrdrElla$17988;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἵ/g, 'idWrdrElla$17989;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἶ/g, 'idWrdrElla$17990;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ἷ/g, 'idWrdrElla$17991;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἰ/g, 'idWrdrElla$17992;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἱ/g, 'idWrdrElla$17993;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἲ/g, 'idWrdrElla$17994;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἳ/g, 'idWrdrElla$17995;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἴ/g, 'idWrdrElla$17996;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἵ/g, 'idWrdrElla$17997;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἶ/g, 'idWrdrElla$17998;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ἷ/g, 'idWrdrElla$17999;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὶ/g, 'idWrdrElla$18054;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ί/g, 'idWrdrElla$18055;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῐ/g, 'idWrdrElla$18144;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῑ/g, 'idWrdrElla$18145;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῒ/g, 'idWrdrElla$18146;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ΐ/g, 'idWrdrElla$18147;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῖ/g, 'idWrdrElla$18150;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῗ/g, 'idWrdrElla$18151;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ῐ/g, 'idWrdrElla$18152;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ῑ/g, 'idWrdrElla$18153;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὶ/g, 'idWrdrElla$18154;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ί/g, 'idWrdrElla$18155;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Κ/g, 'idWrdrElla$1922;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)κ/g, 'idWrdrElla$1954;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Λ/g, 'idWrdrElla$1923;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)λ/g, 'idWrdrElla$1955;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Μ/g, 'idWrdrElla$1924;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)μ/g, 'idWrdrElla$1956;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ν/g, 'idWrdrElla$1925;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ν/g, 'idWrdrElla$1957;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ξ/g, 'idWrdrElla$1926;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ξ/g, 'idWrdrElla$1958;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ό/g, 'idWrdrElla$1908;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ο/g, 'idWrdrElla$1927;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ο/g, 'idWrdrElla$1959;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ό/g, 'idWrdrElla$1972;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὀ/g, 'idWrdrElla$18000;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὁ/g, 'idWrdrElla$18001;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὂ/g, 'idWrdrElla$18002;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὃ/g, 'idWrdrElla$18003;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὄ/g, 'idWrdrElla$18004;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὅ/g, 'idWrdrElla$18005;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὀ/g, 'idWrdrElla$18008;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὁ/g, 'idWrdrElla$18009;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὂ/g, 'idWrdrElla$18010;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὃ/g, 'idWrdrElla$18011;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὄ/g, 'idWrdrElla$18012;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὅ/g, 'idWrdrElla$18013;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὸ/g, 'idWrdrElla$18056;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ό/g, 'idWrdrElla$18057;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Π/g, 'idWrdrElla$1928;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)π/g, 'idWrdrElla$1960;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ρ/g, 'idWrdrElla$1929;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ρ/g, 'idWrdrElla$1961;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῤ/g, 'idWrdrElla$18164;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῥ/g, 'idWrdrElla$18165;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ῥ/g, 'idWrdrElla$18172;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Σ/g, 'idWrdrElla$1931;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ς/g, 'idWrdrElla$1962;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)σ/g, 'idWrdrElla$1963;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Τ/g, 'idWrdrElla$1932;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)τ/g, 'idWrdrElla$1964;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ύ/g, 'idWrdrElla$1910;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Υ/g, 'idWrdrElla$1933;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)υ/g, 'idWrdrElla$1965;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ύ/g, 'idWrdrElla$1973;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὐ/g, 'idWrdrElla$18016;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὑ/g, 'idWrdrElla$18017;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὒ/g, 'idWrdrElla$18018;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὓ/g, 'idWrdrElla$18019;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὔ/g, 'idWrdrElla$18020;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὕ/g, 'idWrdrElla$18021;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὖ/g, 'idWrdrElla$18022;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὗ/g, 'idWrdrElla$18023;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὑ/g, 'idWrdrElla$18025;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὓ/g, 'idWrdrElla$18027;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὕ/g, 'idWrdrElla$18029;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὗ/g, 'idWrdrElla$18031;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὺ/g, 'idWrdrElla$18058;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ύ/g, 'idWrdrElla$18059;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῠ/g, 'idWrdrElla$18160;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῡ/g, 'idWrdrElla$18161;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῢ/g, 'idWrdrElla$18162;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ΰ/g, 'idWrdrElla$18163;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῦ/g, 'idWrdrElla$18166;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῧ/g, 'idWrdrElla$18167;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ῠ/g, 'idWrdrElla$18168;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ῡ/g, 'idWrdrElla$18169;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὺ/g, 'idWrdrElla$18170;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ύ/g, 'idWrdrElla$18171;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Φ/g, 'idWrdrElla$1934;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)φ/g, 'idWrdrElla$1966;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Χ/g, 'idWrdrElla$1935;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)χ/g, 'idWrdrElla$1967;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ψ/g, 'idWrdrElla$1936;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ψ/g, 'idWrdrElla$1968;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ώ/g, 'idWrdrElla$1911;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ω/g, 'idWrdrElla$1937;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ω/g, 'idWrdrElla$1969;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ώ/g, 'idWrdrElla$1974;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὠ/g, 'idWrdrElla$18032;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὡ/g, 'idWrdrElla$18033;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὢ/g, 'idWrdrElla$18034;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὣ/g, 'idWrdrElla$18035;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὤ/g, 'idWrdrElla$18036;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὥ/g, 'idWrdrElla$18037;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὦ/g, 'idWrdrElla$18038;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὧ/g, 'idWrdrElla$18039;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὠ/g, 'idWrdrElla$18040;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὡ/g, 'idWrdrElla$18041;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὢ/g, 'idWrdrElla$18042;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὣ/g, 'idWrdrElla$18043;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὤ/g, 'idWrdrElla$18044;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὥ/g, 'idWrdrElla$18045;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὦ/g, 'idWrdrElla$18046;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὧ/g, 'idWrdrElla$18047;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ὼ/g, 'idWrdrElla$18060;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ώ/g, 'idWrdrElla$18061;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾠ/g, 'idWrdrElla$18096;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾡ/g, 'idWrdrElla$18097;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾢ/g, 'idWrdrElla$18098;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾣ/g, 'idWrdrElla$18099;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾤ/g, 'idWrdrElla$18100;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾥ/g, 'idWrdrElla$18101;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾦ/g, 'idWrdrElla$18102;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾧ/g, 'idWrdrElla$18103;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾨ/g, 'idWrdrElla$18104;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾩ/g, 'idWrdrElla$18105;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾪ/g, 'idWrdrElla$18106;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾫ/g, 'idWrdrElla$18107;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾬ/g, 'idWrdrElla$18108;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾭ/g, 'idWrdrElla$18109;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾮ/g, 'idWrdrElla$18110;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ᾯ/g, 'idWrdrElla$18111;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῲ/g, 'idWrdrElla$18178;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῳ/g, 'idWrdrElla$18179;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῴ/g, 'idWrdrElla$18180;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῶ/g, 'idWrdrElla$18182;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῷ/g, 'idWrdrElla$18183;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὸ/g, 'idWrdrElla$18184;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ό/g, 'idWrdrElla$18185;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ὼ/g, 'idWrdrElla$18186;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)Ώ/g, 'idWrdrElla$18187;')
        sLn = sLn.replace(/idWrdrElla([0-9;]*)ῼ/g, 'idWrdrElla$18188;')
    }
    s = s + sLn + '\n'
  }

  moFs.writeFileSync(sFileOut, s)
}
fReplaceEllaId(sFileIn, sFileOut)

export {fReplaceEllaId}