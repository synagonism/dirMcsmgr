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
    while (new RegExp('idWrdrElla[0-9]+[ΆΑάαἀἁἂἃἄἅἆἇἈἉἊἋἌἍἎἏὰάᾀᾁᾂᾃᾄᾅᾆᾇᾈᾉᾊᾋᾌᾍᾎᾏᾰᾱᾲᾳᾴᾶᾷᾸᾹᾺΆᾼΒβΓγΔδΈΕέεἐἑἒἓἔἕἘἙἚἛἜἝὲέῈΈΖζΉΗήηἠἡἢἣἤἥἦἧἨἩἪἫἬἭἮἯὴήᾐᾑᾒᾓᾔᾕᾖᾗᾘᾙᾚᾛᾜᾝᾞᾟῂῃῄῆῇῊΉῌΘθΊΙίιἰἱἲἳἴἵἶἷἸἹἺἻἼἽἾἿὶίῐῑῒΐῖῗῘῙῚΊΚκΛλΜμΝνΞξΌΟοόὀὁὂὃὄὅὈὉὊὋὌὍὸόΠπΡρῤῥῬΣσΤτΎΥυύὐὑὒὓὔὕὖὗὙὛὝὟὺύῠῡῢΰῦῧῨῩῪΎΦφΧχΨψΏΩωώὠὡὢὣὤὥὦὧὨὩὪὫὬὭὮὯὼώᾠᾡᾢᾣᾤᾥᾦᾧᾨᾩᾪᾫᾬᾭᾮᾯῲῳῴῶῷῸΌῺΏῼ]').test(sLn)) {
        sLn = sLn.replace(/idWrdrElla(\d*)Ά/g, 'idWrdrElla$1902')
        sLn = sLn.replace(/idWrdrElla(\d*)Α/g, 'idWrdrElla$1913')
        sLn = sLn.replace(/idWrdrElla(\d*)ά/g, 'idWrdrElla$1940')
        sLn = sLn.replace(/idWrdrElla(\d*)α/g, 'idWrdrElla$1945')
        sLn = sLn.replace(/idWrdrElla(\d*)ἀ/g, 'idWrdrElla$17936')
        sLn = sLn.replace(/idWrdrElla(\d*)ἁ/g, 'idWrdrElla$17937')
        sLn = sLn.replace(/idWrdrElla(\d*)ἂ/g, 'idWrdrElla$17938')
        sLn = sLn.replace(/idWrdrElla(\d*)ἃ/g, 'idWrdrElla$17939')
        sLn = sLn.replace(/idWrdrElla(\d*)ἄ/g, 'idWrdrElla$17940')
        sLn = sLn.replace(/idWrdrElla(\d*)ἅ/g, 'idWrdrElla$17941')
        sLn = sLn.replace(/idWrdrElla(\d*)ἆ/g, 'idWrdrElla$17942')
        sLn = sLn.replace(/idWrdrElla(\d*)ἇ/g, 'idWrdrElla$17943')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἀ/g, 'idWrdrElla$17944')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἁ/g, 'idWrdrElla$17945')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἂ/g, 'idWrdrElla$17946')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἃ/g, 'idWrdrElla$17947')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἄ/g, 'idWrdrElla$17948')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἅ/g, 'idWrdrElla$17949')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἆ/g, 'idWrdrElla$17950')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἇ/g, 'idWrdrElla$17951')
        sLn = sLn.replace(/idWrdrElla(\d*)ὰ/g, 'idWrdrElla$18048')
        sLn = sLn.replace(/idWrdrElla(\d*)ά/g, 'idWrdrElla$18049')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾀ/g, 'idWrdrElla$18064')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾁ/g, 'idWrdrElla$18065')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾂ/g, 'idWrdrElla$18066')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾃ/g, 'idWrdrElla$18067')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾄ/g, 'idWrdrElla$18068')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾅ/g, 'idWrdrElla$18069')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾆ/g, 'idWrdrElla$18070')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾇ/g, 'idWrdrElla$18071')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾈ/g, 'idWrdrElla$18072')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾉ/g, 'idWrdrElla$18073')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾊ/g, 'idWrdrElla$18074')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾋ/g, 'idWrdrElla$18075')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾌ/g, 'idWrdrElla$18076')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾍ/g, 'idWrdrElla$18077')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾎ/g, 'idWrdrElla$18078')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾏ/g, 'idWrdrElla$18079')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾰ/g, 'idWrdrElla$18112')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾱ/g, 'idWrdrElla$18113')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾲ/g, 'idWrdrElla$18114')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾳ/g, 'idWrdrElla$18115')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾴ/g, 'idWrdrElla$18116')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾶ/g, 'idWrdrElla$18118')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾷ/g, 'idWrdrElla$18119')
        sLn = sLn.replace(/idWrdrElla(\d*)Ᾰ/g, 'idWrdrElla$18120')
        sLn = sLn.replace(/idWrdrElla(\d*)Ᾱ/g, 'idWrdrElla$18121')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὰ/g, 'idWrdrElla$18122')
        sLn = sLn.replace(/idWrdrElla(\d*)Ά/g, 'idWrdrElla$18123')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾼ/g, 'idWrdrElla$18124')
        sLn = sLn.replace(/idWrdrElla(\d*)Β/g, 'idWrdrElla$1914')
        sLn = sLn.replace(/idWrdrElla(\d*)β/g, 'idWrdrElla$1946')
        sLn = sLn.replace(/idWrdrElla(\d*)Γ/g, 'idWrdrElla$1915')
        sLn = sLn.replace(/idWrdrElla(\d*)γ/g, 'idWrdrElla$1947')
        sLn = sLn.replace(/idWrdrElla(\d*)Δ/g, 'idWrdrElla$1916')
        sLn = sLn.replace(/idWrdrElla(\d*)δ/g, 'idWrdrElla$1948')
        sLn = sLn.replace(/idWrdrElla(\d*)Έ/g, 'idWrdrElla$1904')
        sLn = sLn.replace(/idWrdrElla(\d*)Ε/g, 'idWrdrElla$1917')
        sLn = sLn.replace(/idWrdrElla(\d*)έ/g, 'idWrdrElla$1941')
        sLn = sLn.replace(/idWrdrElla(\d*)ε/g, 'idWrdrElla$1949')
        sLn = sLn.replace(/idWrdrElla(\d*)ἐ/g, 'idWrdrElla$17952')
        sLn = sLn.replace(/idWrdrElla(\d*)ἑ/g, 'idWrdrElla$17953')
        sLn = sLn.replace(/idWrdrElla(\d*)ἒ/g, 'idWrdrElla$17954')
        sLn = sLn.replace(/idWrdrElla(\d*)ἓ/g, 'idWrdrElla$17955')
        sLn = sLn.replace(/idWrdrElla(\d*)ἔ/g, 'idWrdrElla$17956')
        sLn = sLn.replace(/idWrdrElla(\d*)ἕ/g, 'idWrdrElla$17957')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἐ/g, 'idWrdrElla$17960')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἑ/g, 'idWrdrElla$17961')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἒ/g, 'idWrdrElla$17962')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἓ/g, 'idWrdrElla$17963')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἔ/g, 'idWrdrElla$17964')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἕ/g, 'idWrdrElla$17965')
        sLn = sLn.replace(/idWrdrElla(\d*)ὲ/g, 'idWrdrElla$18050')
        sLn = sLn.replace(/idWrdrElla(\d*)έ/g, 'idWrdrElla$18051')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὲ/g, 'idWrdrElla$18136')
        sLn = sLn.replace(/idWrdrElla(\d*)Έ/g, 'idWrdrElla$18137')
        sLn = sLn.replace(/idWrdrElla(\d*)Ζ/g, 'idWrdrElla$1918')
        sLn = sLn.replace(/idWrdrElla(\d*)ζ/g, 'idWrdrElla$1950')
        sLn = sLn.replace(/idWrdrElla(\d*)Ή/g, 'idWrdrElla$1905')
        sLn = sLn.replace(/idWrdrElla(\d*)Η/g, 'idWrdrElla$1919')
        sLn = sLn.replace(/idWrdrElla(\d*)ή/g, 'idWrdrElla$1942')
        sLn = sLn.replace(/idWrdrElla(\d*)η/g, 'idWrdrElla$1951')
        sLn = sLn.replace(/idWrdrElla(\d*)ἠ/g, 'idWrdrElla$17968')
        sLn = sLn.replace(/idWrdrElla(\d*)ἡ/g, 'idWrdrElla$17969')
        sLn = sLn.replace(/idWrdrElla(\d*)ἢ/g, 'idWrdrElla$17970')
        sLn = sLn.replace(/idWrdrElla(\d*)ἣ/g, 'idWrdrElla$17971')
        sLn = sLn.replace(/idWrdrElla(\d*)ἤ/g, 'idWrdrElla$17972')
        sLn = sLn.replace(/idWrdrElla(\d*)ἥ/g, 'idWrdrElla$17973')
        sLn = sLn.replace(/idWrdrElla(\d*)ἦ/g, 'idWrdrElla$17974')
        sLn = sLn.replace(/idWrdrElla(\d*)ἧ/g, 'idWrdrElla$17975')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἠ/g, 'idWrdrElla$17976')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἡ/g, 'idWrdrElla$17977')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἢ/g, 'idWrdrElla$17978')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἣ/g, 'idWrdrElla$17979')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἤ/g, 'idWrdrElla$17980')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἥ/g, 'idWrdrElla$17981')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἦ/g, 'idWrdrElla$17982')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἧ/g, 'idWrdrElla$17983')
        sLn = sLn.replace(/idWrdrElla(\d*)ὴ/g, 'idWrdrElla$18052')
        sLn = sLn.replace(/idWrdrElla(\d*)ή/g, 'idWrdrElla$18053')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾐ/g, 'idWrdrElla$18080')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾑ/g, 'idWrdrElla$18081')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾒ/g, 'idWrdrElla$18082')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾓ/g, 'idWrdrElla$18083')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾔ/g, 'idWrdrElla$18084')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾕ/g, 'idWrdrElla$18085')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾖ/g, 'idWrdrElla$18086')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾗ/g, 'idWrdrElla$18087')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾘ/g, 'idWrdrElla$18088')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾙ/g, 'idWrdrElla$18089')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾚ/g, 'idWrdrElla$18090')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾛ/g, 'idWrdrElla$18091')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾜ/g, 'idWrdrElla$18092')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾝ/g, 'idWrdrElla$18093')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾞ/g, 'idWrdrElla$18094')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾟ/g, 'idWrdrElla$18095')
        sLn = sLn.replace(/idWrdrElla(\d*)ῂ/g, 'idWrdrElla$18130')
        sLn = sLn.replace(/idWrdrElla(\d*)ῃ/g, 'idWrdrElla$18131')
        sLn = sLn.replace(/idWrdrElla(\d*)ῄ/g, 'idWrdrElla$18132')
        sLn = sLn.replace(/idWrdrElla(\d*)ῆ/g, 'idWrdrElla$18134')
        sLn = sLn.replace(/idWrdrElla(\d*)ῇ/g, 'idWrdrElla$18135')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὴ/g, 'idWrdrElla$18138')
        sLn = sLn.replace(/idWrdrElla(\d*)Ή/g, 'idWrdrElla$18139')
        sLn = sLn.replace(/idWrdrElla(\d*)ῌ/g, 'idWrdrElla$18140')
        sLn = sLn.replace(/idWrdrElla(\d*)Θ/g, 'idWrdrElla$1920')
        sLn = sLn.replace(/idWrdrElla(\d*)θ/g, 'idWrdrElla$1952')
        sLn = sLn.replace(/idWrdrElla(\d*)Ί/g, 'idWrdrElla$1906')
        sLn = sLn.replace(/idWrdrElla(\d*)Ι/g, 'idWrdrElla$1921')
        sLn = sLn.replace(/idWrdrElla(\d*)ί/g, 'idWrdrElla$1943')
        sLn = sLn.replace(/idWrdrElla(\d*)ι/g, 'idWrdrElla$1953')
        sLn = sLn.replace(/idWrdrElla(\d*)ἰ/g, 'idWrdrElla$17984')
        sLn = sLn.replace(/idWrdrElla(\d*)ἱ/g, 'idWrdrElla$17985')
        sLn = sLn.replace(/idWrdrElla(\d*)ἲ/g, 'idWrdrElla$17986')
        sLn = sLn.replace(/idWrdrElla(\d*)ἳ/g, 'idWrdrElla$17987')
        sLn = sLn.replace(/idWrdrElla(\d*)ἴ/g, 'idWrdrElla$17988')
        sLn = sLn.replace(/idWrdrElla(\d*)ἵ/g, 'idWrdrElla$17989')
        sLn = sLn.replace(/idWrdrElla(\d*)ἶ/g, 'idWrdrElla$17990')
        sLn = sLn.replace(/idWrdrElla(\d*)ἷ/g, 'idWrdrElla$17991')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἰ/g, 'idWrdrElla$17992')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἱ/g, 'idWrdrElla$17993')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἲ/g, 'idWrdrElla$17994')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἳ/g, 'idWrdrElla$17995')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἴ/g, 'idWrdrElla$17996')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἵ/g, 'idWrdrElla$17997')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἶ/g, 'idWrdrElla$17998')
        sLn = sLn.replace(/idWrdrElla(\d*)Ἷ/g, 'idWrdrElla$17999')
        sLn = sLn.replace(/idWrdrElla(\d*)ὶ/g, 'idWrdrElla$18054')
        sLn = sLn.replace(/idWrdrElla(\d*)ί/g, 'idWrdrElla$18055')
        sLn = sLn.replace(/idWrdrElla(\d*)ῐ/g, 'idWrdrElla$18144')
        sLn = sLn.replace(/idWrdrElla(\d*)ῑ/g, 'idWrdrElla$18145')
        sLn = sLn.replace(/idWrdrElla(\d*)ῒ/g, 'idWrdrElla$18146')
        sLn = sLn.replace(/idWrdrElla(\d*)ΐ/g, 'idWrdrElla$18147')
        sLn = sLn.replace(/idWrdrElla(\d*)ῖ/g, 'idWrdrElla$18150')
        sLn = sLn.replace(/idWrdrElla(\d*)ῗ/g, 'idWrdrElla$18151')
        sLn = sLn.replace(/idWrdrElla(\d*)Ῐ/g, 'idWrdrElla$18152')
        sLn = sLn.replace(/idWrdrElla(\d*)Ῑ/g, 'idWrdrElla$18153')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὶ/g, 'idWrdrElla$18154')
        sLn = sLn.replace(/idWrdrElla(\d*)Ί/g, 'idWrdrElla$18155')
        sLn = sLn.replace(/idWrdrElla(\d*)Κ/g, 'idWrdrElla$1922')
        sLn = sLn.replace(/idWrdrElla(\d*)κ/g, 'idWrdrElla$1954')
        sLn = sLn.replace(/idWrdrElla(\d*)Λ/g, 'idWrdrElla$1923')
        sLn = sLn.replace(/idWrdrElla(\d*)λ/g, 'idWrdrElla$1955')
        sLn = sLn.replace(/idWrdrElla(\d*)Μ/g, 'idWrdrElla$1924')
        sLn = sLn.replace(/idWrdrElla(\d*)μ/g, 'idWrdrElla$1956')
        sLn = sLn.replace(/idWrdrElla(\d*)Ν/g, 'idWrdrElla$1925')
        sLn = sLn.replace(/idWrdrElla(\d*)ν/g, 'idWrdrElla$1957')
        sLn = sLn.replace(/idWrdrElla(\d*)Ξ/g, 'idWrdrElla$1926')
        sLn = sLn.replace(/idWrdrElla(\d*)ξ/g, 'idWrdrElla$1958')
        sLn = sLn.replace(/idWrdrElla(\d*)Ό/g, 'idWrdrElla$1908')
        sLn = sLn.replace(/idWrdrElla(\d*)Ο/g, 'idWrdrElla$1927')
        sLn = sLn.replace(/idWrdrElla(\d*)ο/g, 'idWrdrElla$1959')
        sLn = sLn.replace(/idWrdrElla(\d*)ό/g, 'idWrdrElla$1972')
        sLn = sLn.replace(/idWrdrElla(\d*)ὀ/g, 'idWrdrElla$18000')
        sLn = sLn.replace(/idWrdrElla(\d*)ὁ/g, 'idWrdrElla$18001')
        sLn = sLn.replace(/idWrdrElla(\d*)ὂ/g, 'idWrdrElla$18002')
        sLn = sLn.replace(/idWrdrElla(\d*)ὃ/g, 'idWrdrElla$18003')
        sLn = sLn.replace(/idWrdrElla(\d*)ὄ/g, 'idWrdrElla$18004')
        sLn = sLn.replace(/idWrdrElla(\d*)ὅ/g, 'idWrdrElla$18005')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὀ/g, 'idWrdrElla$18008')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὁ/g, 'idWrdrElla$18009')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὂ/g, 'idWrdrElla$18010')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὃ/g, 'idWrdrElla$18011')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὄ/g, 'idWrdrElla$18012')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὅ/g, 'idWrdrElla$18013')
        sLn = sLn.replace(/idWrdrElla(\d*)ὸ/g, 'idWrdrElla$18056')
        sLn = sLn.replace(/idWrdrElla(\d*)ό/g, 'idWrdrElla$18057')
        sLn = sLn.replace(/idWrdrElla(\d*)Π/g, 'idWrdrElla$1928')
        sLn = sLn.replace(/idWrdrElla(\d*)π/g, 'idWrdrElla$1960')
        sLn = sLn.replace(/idWrdrElla(\d*)Ρ/g, 'idWrdrElla$1929')
        sLn = sLn.replace(/idWrdrElla(\d*)ρ/g, 'idWrdrElla$1961')
        sLn = sLn.replace(/idWrdrElla(\d*)ῤ/g, 'idWrdrElla$18164')
        sLn = sLn.replace(/idWrdrElla(\d*)ῥ/g, 'idWrdrElla$18165')
        sLn = sLn.replace(/idWrdrElla(\d*)Ῥ/g, 'idWrdrElla$18172')
        sLn = sLn.replace(/idWrdrElla(\d*)Σ/g, 'idWrdrElla$1931')
        sLn = sLn.replace(/idWrdrElla(\d*)ς/g, 'idWrdrElla$1962')
        sLn = sLn.replace(/idWrdrElla(\d*)σ/g, 'idWrdrElla$1963')
        sLn = sLn.replace(/idWrdrElla(\d*)Τ/g, 'idWrdrElla$1932')
        sLn = sLn.replace(/idWrdrElla(\d*)τ/g, 'idWrdrElla$1964')
        sLn = sLn.replace(/idWrdrElla(\d*)Ύ/g, 'idWrdrElla$1910')
        sLn = sLn.replace(/idWrdrElla(\d*)Υ/g, 'idWrdrElla$1933')
        sLn = sLn.replace(/idWrdrElla(\d*)υ/g, 'idWrdrElla$1965')
        sLn = sLn.replace(/idWrdrElla(\d*)ύ/g, 'idWrdrElla$1973')
        sLn = sLn.replace(/idWrdrElla(\d*)ὐ/g, 'idWrdrElla$18016')
        sLn = sLn.replace(/idWrdrElla(\d*)ὑ/g, 'idWrdrElla$18017')
        sLn = sLn.replace(/idWrdrElla(\d*)ὒ/g, 'idWrdrElla$18018')
        sLn = sLn.replace(/idWrdrElla(\d*)ὓ/g, 'idWrdrElla$18019')
        sLn = sLn.replace(/idWrdrElla(\d*)ὔ/g, 'idWrdrElla$18020')
        sLn = sLn.replace(/idWrdrElla(\d*)ὕ/g, 'idWrdrElla$18021')
        sLn = sLn.replace(/idWrdrElla(\d*)ὖ/g, 'idWrdrElla$18022')
        sLn = sLn.replace(/idWrdrElla(\d*)ὗ/g, 'idWrdrElla$18023')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὑ/g, 'idWrdrElla$18025')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὓ/g, 'idWrdrElla$18027')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὕ/g, 'idWrdrElla$18029')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὗ/g, 'idWrdrElla$18031')
        sLn = sLn.replace(/idWrdrElla(\d*)ὺ/g, 'idWrdrElla$18058')
        sLn = sLn.replace(/idWrdrElla(\d*)ύ/g, 'idWrdrElla$18059')
        sLn = sLn.replace(/idWrdrElla(\d*)ῠ/g, 'idWrdrElla$18160')
        sLn = sLn.replace(/idWrdrElla(\d*)ῡ/g, 'idWrdrElla$18161')
        sLn = sLn.replace(/idWrdrElla(\d*)ῢ/g, 'idWrdrElla$18162')
        sLn = sLn.replace(/idWrdrElla(\d*)ΰ/g, 'idWrdrElla$18163')
        sLn = sLn.replace(/idWrdrElla(\d*)ῦ/g, 'idWrdrElla$18166')
        sLn = sLn.replace(/idWrdrElla(\d*)ῧ/g, 'idWrdrElla$18167')
        sLn = sLn.replace(/idWrdrElla(\d*)Ῠ/g, 'idWrdrElla$18168')
        sLn = sLn.replace(/idWrdrElla(\d*)Ῡ/g, 'idWrdrElla$18169')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὺ/g, 'idWrdrElla$18170')
        sLn = sLn.replace(/idWrdrElla(\d*)Ύ/g, 'idWrdrElla$18171')
        sLn = sLn.replace(/idWrdrElla(\d*)Φ/g, 'idWrdrElla$1934')
        sLn = sLn.replace(/idWrdrElla(\d*)φ/g, 'idWrdrElla$1966')
        sLn = sLn.replace(/idWrdrElla(\d*)Χ/g, 'idWrdrElla$1935')
        sLn = sLn.replace(/idWrdrElla(\d*)χ/g, 'idWrdrElla$1967')
        sLn = sLn.replace(/idWrdrElla(\d*)Ψ/g, 'idWrdrElla$1936')
        sLn = sLn.replace(/idWrdrElla(\d*)ψ/g, 'idWrdrElla$1968')
        sLn = sLn.replace(/idWrdrElla(\d*)Ώ/g, 'idWrdrElla$1911')
        sLn = sLn.replace(/idWrdrElla(\d*)Ω/g, 'idWrdrElla$1937')
        sLn = sLn.replace(/idWrdrElla(\d*)ω/g, 'idWrdrElla$1969')
        sLn = sLn.replace(/idWrdrElla(\d*)ώ/g, 'idWrdrElla$1974')
        sLn = sLn.replace(/idWrdrElla(\d*)ὠ/g, 'idWrdrElla$18032')
        sLn = sLn.replace(/idWrdrElla(\d*)ὡ/g, 'idWrdrElla$18033')
        sLn = sLn.replace(/idWrdrElla(\d*)ὢ/g, 'idWrdrElla$18034')
        sLn = sLn.replace(/idWrdrElla(\d*)ὣ/g, 'idWrdrElla$18035')
        sLn = sLn.replace(/idWrdrElla(\d*)ὤ/g, 'idWrdrElla$18036')
        sLn = sLn.replace(/idWrdrElla(\d*)ὥ/g, 'idWrdrElla$18037')
        sLn = sLn.replace(/idWrdrElla(\d*)ὦ/g, 'idWrdrElla$18038')
        sLn = sLn.replace(/idWrdrElla(\d*)ὧ/g, 'idWrdrElla$18039')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὠ/g, 'idWrdrElla$18040')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὡ/g, 'idWrdrElla$18041')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὢ/g, 'idWrdrElla$18042')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὣ/g, 'idWrdrElla$18043')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὤ/g, 'idWrdrElla$18044')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὥ/g, 'idWrdrElla$18045')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὦ/g, 'idWrdrElla$18046')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὧ/g, 'idWrdrElla$18047')
        sLn = sLn.replace(/idWrdrElla(\d*)ὼ/g, 'idWrdrElla$18060')
        sLn = sLn.replace(/idWrdrElla(\d*)ώ/g, 'idWrdrElla$18061')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾠ/g, 'idWrdrElla$18096')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾡ/g, 'idWrdrElla$18097')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾢ/g, 'idWrdrElla$18098')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾣ/g, 'idWrdrElla$18099')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾤ/g, 'idWrdrElla$18100')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾥ/g, 'idWrdrElla$18101')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾦ/g, 'idWrdrElla$18102')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾧ/g, 'idWrdrElla$18103')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾨ/g, 'idWrdrElla$18104')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾩ/g, 'idWrdrElla$18105')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾪ/g, 'idWrdrElla$18106')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾫ/g, 'idWrdrElla$18107')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾬ/g, 'idWrdrElla$18108')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾭ/g, 'idWrdrElla$18109')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾮ/g, 'idWrdrElla$18110')
        sLn = sLn.replace(/idWrdrElla(\d*)ᾯ/g, 'idWrdrElla$18111')
        sLn = sLn.replace(/idWrdrElla(\d*)ῲ/g, 'idWrdrElla$18178')
        sLn = sLn.replace(/idWrdrElla(\d*)ῳ/g, 'idWrdrElla$18179')
        sLn = sLn.replace(/idWrdrElla(\d*)ῴ/g, 'idWrdrElla$18180')
        sLn = sLn.replace(/idWrdrElla(\d*)ῶ/g, 'idWrdrElla$18182')
        sLn = sLn.replace(/idWrdrElla(\d*)ῷ/g, 'idWrdrElla$18183')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὸ/g, 'idWrdrElla$18184')
        sLn = sLn.replace(/idWrdrElla(\d*)Ό/g, 'idWrdrElla$18185')
        sLn = sLn.replace(/idWrdrElla(\d*)Ὼ/g, 'idWrdrElla$18186')
        sLn = sLn.replace(/idWrdrElla(\d*)Ώ/g, 'idWrdrElla$18187')
        sLn = sLn.replace(/idWrdrElla(\d*)ῼ/g, 'idWrdrElla$18188')
    }
    s = s + sLn + '\n'
  }

  moFs.writeFileSync(sFileOut, s)
}
fReplaceEllaId(sFileIn, sFileOut)

export {fReplaceEllaId}