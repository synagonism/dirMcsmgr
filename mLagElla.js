/*
 * mLagElla.js - module with misc GreekAncient functions.
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Kaseluris.Nikos.1959 (synagonism)
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
 */

const
  // contains the-versions of mLagElla.js
  aVersion = [
    'mLagElla.js.0-2-5.2026-07-31: ῖ',
    'mLagElla.js.0-2-4.2026-07-23: μμ',
    'mLagElla.js.0-2-3.2025-03-11: /i3/⭢/i8/',
    'mLagElla.js.0-2-2.2022-08-25: αύ',
    'mLagElla.js.0-2-1.2022-08-21: sOut',
    'mLagElla.js.0-2-0.2022-05-18: u-/i3/',
    'mLagElla.js.0-1-0.2022-04-23: creation'
  ]

/*
 * DOING: it finds the-phonemic-notation of a-GreekAncient-text-word.
 * INPUT: βῆ
 * OUTPUT: /béè/
 */
function fEllawordFindPhonema (sWordIn) {
  let
    nIndex,
    sOut = sWordIn

  //φωνήεντα
  sOut = sOut.replaceAll('αῖ', 'áì') //
  sOut = sOut.replaceAll('Αῖ', 'áì') //
  sOut = sOut.replaceAll('αἶ', 'áì') //
  sOut = sOut.replaceAll('Αἶ', 'áì') //
  sOut = sOut.replaceAll('αἷ', 'háì') //
  sOut = sOut.replaceAll('Αἷ', 'háì') //
  sOut = sOut.replaceAll('αἰ', 'ai') //
  sOut = sOut.replaceAll('Αἰ', 'ai') //
  sOut = sOut.replaceAll('αἱ', 'hai') //
  sOut = sOut.replaceAll('Αἱ', 'hai') //
  sOut = sOut.replaceAll('αἴ', 'aí') //
  sOut = sOut.replaceAll('Αἴ', 'aí') //
  sOut = sOut.replaceAll('αἵ', 'haí') //
  sOut = sOut.replaceAll('Αἵ', 'haí') //
  sOut = sOut.replaceAll('αί', 'aí') //
  sOut = sOut.replaceAll('Αί', 'aí') //
  sOut = sOut.replaceAll('αι', 'ai') //
  sOut = sOut.replaceAll('Αι', 'ai') //
  sOut = sOut.replaceAll('αυ', 'au') //
  sOut = sOut.replaceAll('αύ', 'aú') //
  sOut = sOut.replaceAll('Αυ', 'au') //
  sOut = sOut.replaceAll('εῖ', 'éì') //
  sOut = sOut.replaceAll('Εῖ', 'éì') //
  sOut = sOut.replaceAll('εἶ', 'éì') //
  sOut = sOut.replaceAll('Εἶ', 'éì') //
  sOut = sOut.replaceAll('εἷ', 'héì') //
  sOut = sOut.replaceAll('Εἷ', 'héì') //
  sOut = sOut.replaceAll('εἴ', 'eí') //
  sOut = sOut.replaceAll('Εἴ', 'eí') //
  sOut = sOut.replaceAll('εἵ', 'heí') //
  sOut = sOut.replaceAll('Εἵ', 'heí') //
  sOut = sOut.replaceAll('εί', 'eí') //
  sOut = sOut.replaceAll('Εί', 'eí') //
  sOut = sOut.replaceAll('ει', 'ei') //
  sOut = sOut.replaceAll('Ει', 'ei') //
  sOut = sOut.replaceAll('ευ', 'eu') //
  sOut = sOut.replaceAll('Ευ', 'eu') //
  sOut = sOut.replaceAll('οῖ', 'óì') //
  sOut = sOut.replaceAll('Οῖ', 'óì') //
  sOut = sOut.replaceAll('οἶ', 'óì') //
  sOut = sOut.replaceAll('Οἶ', 'óì') //
  sOut = sOut.replaceAll('οἷ', 'hóì') //
  sOut = sOut.replaceAll('Οἷ', 'hóì') //
  sOut = sOut.replaceAll('οἴ', 'oí') //
  sOut = sOut.replaceAll('Οἴ', 'oí') //
  sOut = sOut.replaceAll('οἵ', 'hoí') //
  sOut = sOut.replaceAll('Οἵ', 'hoí') //
  sOut = sOut.replaceAll('οί', 'oi') //
  sOut = sOut.replaceAll('Οί', 'oi') //
  sOut = sOut.replaceAll('οι', 'oi') //
  sOut = sOut.replaceAll('Οι', 'oi') //
  sOut = sOut.replaceAll('οὖ', 'oi') //
  sOut = sOut.replaceAll('Οὖ', 'oi') //
  sOut = sOut.replaceAll('οὗ', 'hóù') //
  sOut = sOut.replaceAll('Οὗ', 'hóù') //
  sOut = sOut.replaceAll('οὔ', 'oú') //
  sOut = sOut.replaceAll('Οὔ', 'oú') //
  sOut = sOut.replaceAll('οὕ', 'hoú') //
  sOut = sOut.replaceAll('Οὕ', 'hoú') //
  sOut = sOut.replaceAll('οῦ', 'óù') //
  //Ά|Α|ά|α|ἀ|ἁ|ἂ|ἃ|ἄ|ἅ|ἆ|ἇ|Ἀ|Ἁ|Ἂ|Ἃ|Ἄ|Ἅ|Ἆ|Ἇ|ὰ|ά|ᾀ|ᾁ|ᾂ|ᾃ|ᾄ|ᾅ|ᾆ|ᾇ|ᾈ|ᾉ|ᾊ|ᾋ|ᾌ|ᾍ|ᾎ|ᾏ|ᾰ|ᾱ|ᾲ|ᾳ|ᾴ|
  //ᾶ|ᾷ|Ᾰ|Ᾱ|Ὰ|Ά|ᾼ
  sOut = sOut.replaceAll('ᾆ', 'áì') //
  sOut = sOut.replaceAll('ᾎ', 'áì') //
  sOut = sOut.replaceAll('ᾇ', 'háì') //
  sOut = sOut.replaceAll('ᾏ', 'háì') //
  sOut = sOut.replaceAll('ἆ', 'áà') //
  sOut = sOut.replaceAll('Ἆ', 'áà') //
  sOut = sOut.replaceAll('ἇ', 'háà') //
  sOut = sOut.replaceAll('Ἇ', 'háà') //
  sOut = sOut.replaceAll('ᾷ', 'áì') //
  sOut = sOut.replaceAll('ᾶ', 'áà') //
  sOut = sOut.replaceAll('ᾄ', 'aí') //
  sOut = sOut.replaceAll('ᾌ', 'aí') //
  sOut = sOut.replaceAll('ᾅ', 'haí') //
  sOut = sOut.replaceAll('ᾍ', 'haí') //
  sOut = sOut.replaceAll('ᾂ', 'aì') //
  sOut = sOut.replaceAll('ᾊ', 'aì') //
  sOut = sOut.replaceAll('ᾃ', 'haì') //
  sOut = sOut.replaceAll('ᾋ', 'haì') //
  sOut = sOut.replaceAll('ἄ', 'á') //
  sOut = sOut.replaceAll('Ἄ', 'á') //
  sOut = sOut.replaceAll('ἅ', 'há') //
  sOut = sOut.replaceAll('Ἅ', 'há') //
  sOut = sOut.replaceAll('ἂ', 'à') //
  sOut = sOut.replaceAll('Ἂ', 'à') //
  sOut = sOut.replaceAll('ἃ', 'hà') //
  sOut = sOut.replaceAll('Ἃ', 'hà') //
  sOut = sOut.replaceAll('ά', 'á') //
  sOut = sOut.replaceAll('Ά', 'á') //
  sOut = sOut.replaceAll('ὰ', 'à') //
  sOut = sOut.replaceAll('Ὰ', 'à') //
  sOut = sOut.replaceAll('ᾀ', 'ai') //
  sOut = sOut.replaceAll('ᾈ', 'ai') //
  sOut = sOut.replaceAll('ᾁ', 'hai') //
  sOut = sOut.replaceAll('ᾉ', 'hai') //
  sOut = sOut.replaceAll('ἀ', 'a') //
  sOut = sOut.replaceAll('Ἀ', 'a') //
  sOut = sOut.replaceAll('ἁ', 'ha') //
  sOut = sOut.replaceAll('Ἁ', 'ha') //
  sOut = sOut.replaceAll('ᾰ', 'a') //
  sOut = sOut.replaceAll('ᾳ', 'ai') //
  sOut = sOut.replaceAll('ᾼ', 'ai') //
  sOut = sOut.replaceAll('Ᾰ', 'a') //
  sOut = sOut.replaceAll('ᾱ', 'aa') //
  sOut = sOut.replaceAll('Ᾱ', 'aa') //
  sOut = sOut.replaceAll('α', 'a') //
  sOut = sOut.replaceAll('Α', 'a') //
  //Έ|Ε|έ|ε|ἐ|ἑ|ἒ|ἓ|ἔ|ἕ|Ἐ|Ἑ|Ἒ|Ἓ|Ἔ|Ἕ|ὲ|έ|Ὲ|Έ
  sOut = sOut.replaceAll('ἔ', 'é') //
  sOut = sOut.replaceAll('Ἔ', 'é') //
  sOut = sOut.replaceAll('ἕ', 'hé') //
  sOut = sOut.replaceAll('Ἕ', 'hé') //
  sOut = sOut.replaceAll('ἒ', 'è') //
  sOut = sOut.replaceAll('Ἒ', 'è') //
  sOut = sOut.replaceAll('ἓ', 'hè') //
  sOut = sOut.replaceAll('Ἓ', 'hè') //
  sOut = sOut.replaceAll('έ', 'é') //
  sOut = sOut.replaceAll('έ', 'é') //
  sOut = sOut.replaceAll('Έ', 'é') //
  sOut = sOut.replaceAll('ὲ', 'è') //
  sOut = sOut.replaceAll('ἐ', 'e') //
  sOut = sOut.replaceAll('Ἐ', 'e') //
  sOut = sOut.replaceAll('ἑ', 'he') //
  sOut = sOut.replaceAll('Ἑ', 'he') //
  sOut = sOut.replaceAll('ε', 'e') //
  sOut = sOut.replaceAll('Ε', 'e') //
  // Ή|Η|ή|η|ἠ|ἡ|ἢ|ἣ|ἤ|ἥ|ἦ|ἧ|Ἠ|Ἡ|Ἢ|Ἣ|Ἤ|Ἥ|Ἦ|Ἧ|ὴ|ή|ᾐ|ᾑ|ᾒ|ᾓ|ᾔ|ᾕ|ᾖ|ᾗ|ᾘ|ᾙ|ᾚ|ᾛ|ᾜ|ᾝ|ᾞ|ᾟ|ῂ|ῃ|ῄ|ῆ|ῇ
  //|Ὴ|Ή|ῌ
  sOut = sOut.replaceAll('ᾖ', 'éì') //
  sOut = sOut.replaceAll('ᾞ', 'éì') //
  sOut = sOut.replaceAll('ᾗ', 'héì') //
  sOut = sOut.replaceAll('ᾟ', 'héì') //
  sOut = sOut.replaceAll('ἦ', 'éè') //
  sOut = sOut.replaceAll('Ἦ', 'éè') //
  sOut = sOut.replaceAll('ἧ', 'héè') //
  sOut = sOut.replaceAll('Ἧ', 'héè') //
  sOut = sOut.replaceAll('ῇ', 'éì') //
  sOut = sOut.replaceAll('ῆ', 'éè') //
  sOut = sOut.replaceAll('ᾔ', 'eí') //
  sOut = sOut.replaceAll('ᾜ', 'eí') //
  sOut = sOut.replaceAll('ᾕ', 'heí') //
  sOut = sOut.replaceAll('ᾝ', 'heí') //
  sOut = sOut.replaceAll('ἤ', 'eé') //
  sOut = sOut.replaceAll('Ἤ', 'eé') //
  sOut = sOut.replaceAll('ἥ', 'heé') //
  sOut = sOut.replaceAll('Ἥ', 'heé') //
  sOut = sOut.replaceAll('ᾒ', 'eì') //
  sOut = sOut.replaceAll('ᾚ', 'eì') //
  sOut = sOut.replaceAll('ᾓ', 'heì') //
  sOut = sOut.replaceAll('ᾛ', 'heì') //
  sOut = sOut.replaceAll('ἢ', 'eè') //
  sOut = sOut.replaceAll('Ἢ', 'eè') //
  sOut = sOut.replaceAll('ἣ', 'heè') //
  sOut = sOut.replaceAll('Ἣ', 'heè') //
  sOut = sOut.replaceAll('ῄ', 'eí') //
  sOut = sOut.replaceAll('ῂ', 'eì') //
  sOut = sOut.replaceAll('ή', 'eé') //
  sOut = sOut.replaceAll('Ή', 'eé') //
  sOut = sOut.replaceAll('ὴ', 'eè') //
  sOut = sOut.replaceAll('Ὴ', 'eè') //
  sOut = sOut.replaceAll('ᾐ', 'ei') //
  sOut = sOut.replaceAll('ᾘ', 'ei') //
  sOut = sOut.replaceAll('ᾑ', 'hei') //
  sOut = sOut.replaceAll('ᾙ', 'hei') //
  sOut = sOut.replaceAll('ἠ', 'ee') //
  sOut = sOut.replaceAll('Ἠ', 'ee') //
  sOut = sOut.replaceAll('ἡ', 'hee') //
  sOut = sOut.replaceAll('Ἡ', 'hee') //
  sOut = sOut.replaceAll('ῃ', 'ei') //
  sOut = sOut.replaceAll('ῌ', 'ei') //
  sOut = sOut.replaceAll('η', 'ee') //
  sOut = sOut.replaceAll('Η', 'ee') //
  //Ί|Ι|ί|ι|ἰ|ἱ|ἲ|ἳ|ἴ|ἵ|ἶ|ἷ|Ἰ|Ἱ|Ἲ|Ἳ|Ἴ|Ἵ|Ἶ|Ἷ|ὶ|ί|ῐ|ῑ|ῒ|ΐ|ῖ|ῗ|Ῐ|Ῑ|Ὶ|Ί
  sOut = sOut.replaceAll('ἶ', 'íì') //
  sOut = sOut.replaceAll('Ἶ', 'íì') //
  sOut = sOut.replaceAll('ἷ', 'híì') //
  sOut = sOut.replaceAll('Ἷ', 'híì') //
  sOut = sOut.replaceAll('ἴ', 'í') //
  sOut = sOut.replaceAll('Ἴ', 'í') //
  sOut = sOut.replaceAll('ἵ', 'hí') //
  sOut = sOut.replaceAll('Ἵ', 'hí') //
  sOut = sOut.replaceAll('ἲ', 'ì') //
  sOut = sOut.replaceAll('Ἲ', 'ì') //
  sOut = sOut.replaceAll('ἳ', 'hì') //
  sOut = sOut.replaceAll('Ἳ', 'hì') //
  sOut = sOut.replaceAll('ΐ', 'í') //
  sOut = sOut.replaceAll('ΐ', 'ì') //
  sOut = sOut.replaceAll('ί', 'í') //
  sOut = sOut.replaceAll('Ί', 'í') //
  sOut = sOut.replaceAll('ὶ', 'ì') //
  sOut = sOut.replaceAll('Ὶ', 'ì') //
  sOut = sOut.replaceAll('ἰ', 'i') //
  sOut = sOut.replaceAll('Ἰ', 'i') //
  sOut = sOut.replaceAll('ἱ', 'hi') //
  sOut = sOut.replaceAll('Ἱ', 'hi') //
  sOut = sOut.replaceAll('ῖ', 'íì') //
  sOut = sOut.replaceAll('ῐ', 'i') //
  sOut = sOut.replaceAll('Ῐ', 'i') //
  sOut = sOut.replaceAll('ῑ', 'ii') //
  sOut = sOut.replaceAll('Ῑ', 'ii') //
  sOut = sOut.replaceAll('ι', 'i') //
  sOut = sOut.replaceAll('Ι', 'i') //
  //Ό|Ο|ο|ό|ὀ|ὁ|ὂ|ὃ|ὄ|ὅ|Ὀ|Ὁ|Ὂ|Ὃ|Ὄ|Ὅ|ὸ|ό|Ὸ|Ό
  sOut = sOut.replaceAll('ὄ', 'ó') //
  sOut = sOut.replaceAll('Ὄ', 'ó') //
  sOut = sOut.replaceAll('ὅ', 'hò') //
  sOut = sOut.replaceAll('Ὅ', 'hò') //
  sOut = sOut.replaceAll('ὂ', 'ò') //
  sOut = sOut.replaceAll('Ὂ', 'ò') //
  sOut = sOut.replaceAll('ὃ', 'hò') //
  sOut = sOut.replaceAll('Ὃ', 'hò') //
  sOut = sOut.replaceAll('ό', 'ó') //
  sOut = sOut.replaceAll('Ό', 'ó') //
  sOut = sOut.replaceAll('ὸ', 'ò') //
  sOut = sOut.replaceAll('Ὸ', 'ò') //
  sOut = sOut.replaceAll('ὀ', 'o') //
  sOut = sOut.replaceAll('Ὀ', 'o') //
  sOut = sOut.replaceAll('ὁ', 'ho') //
  sOut = sOut.replaceAll('Ὁ', 'ho') //
  sOut = sOut.replaceAll('ο', 'o') //
  sOut = sOut.replaceAll('Ο', 'o') //
  //Ύ|Υ|υ|ύ|ὐ|ὑ|ὒ|ὓ|ὔ|ὕ|ὖ|ὗ|Ὑ|Ὓ|Ὕ|Ὗ|ὺ|ύ|ῠ|ῡ|ῢ|ΰ|ῦ|ῧ|Ῠ|Ῡ|Ὺ|Ύ
  sOut = sOut.replaceAll('ὖ', 'í8ì8') //
  sOut = sOut.replaceAll('ὗ', 'hí8ì8') //
  sOut = sOut.replaceAll('Ὗ', 'hí8ì8') //
  sOut = sOut.replaceAll('ῧ', 'í8ì8') //
  sOut = sOut.replaceAll('ῦ', 'í8ì8') //
  sOut = sOut.replaceAll('ὔ', 'í8') //
  sOut = sOut.replaceAll('ὕ', 'hí8') //
  sOut = sOut.replaceAll('Ὕ', 'hí8') //
  sOut = sOut.replaceAll('ὒ', 'ì8') //
  sOut = sOut.replaceAll('ὓ', 'hì8') //
  sOut = sOut.replaceAll('Ὓ', 'hì8') //
  sOut = sOut.replaceAll('ύ', 'í8') //
  sOut = sOut.replaceAll('Ύ', 'í8') //
  sOut = sOut.replaceAll('ὺ', 'ì8') //
  sOut = sOut.replaceAll('Ὺ', 'ì8') //
  sOut = sOut.replaceAll('ΰ', 'í8') //
  sOut = sOut.replaceAll('ῢ', 'ì8') //
  sOut = sOut.replaceAll('ὐ', 'i8') //
  sOut = sOut.replaceAll('ὑ', 'hi8') //
  sOut = sOut.replaceAll('Ὑ', 'hi8') //
  sOut = sOut.replaceAll('ῠ', 'i8') //
  sOut = sOut.replaceAll('Ῠ', 'i8') //
  sOut = sOut.replaceAll('ῡ', 'i8i8') //
  sOut = sOut.replaceAll('Ῡ', 'i8') //
  sOut = sOut.replaceAll('υ', 'i8') //
  // Ώ|Ω|ω|ώ|ὠ|ὡ|ὢ|ὣ|ὤ|ὥ|ὦ|ὧ|Ὠ|Ὡ|Ὢ|Ὣ|Ὤ|Ὥ|Ὦ|Ὧ|ὼ|ώ|ᾠ|ᾡ|ᾢ|ᾣ|ᾤ|ᾥ|ᾦ|ᾧ|
  // ᾨ|ᾩ|ᾪ|ᾫ|ᾬ|ᾭ|ᾮ|ᾯ|ῲ|ῳ|ῴ|ῶ|ῷ|Ὼ|Ώ|ῼ
  sOut = sOut.replaceAll('ῷ', 'óì') //
  sOut = sOut.replaceAll('ὦ', 'óò') //
  sOut = sOut.replaceAll('Ὦ', 'óò') //
  sOut = sOut.replaceAll('ὧ', 'hóò') //
  sOut = sOut.replaceAll('Ὧ', 'hóò') //
  sOut = sOut.replaceAll('ᾦ', 'óì') //
  sOut = sOut.replaceAll('ᾮ', 'óì') //
  sOut = sOut.replaceAll('ᾧ', 'hóì') //
  sOut = sOut.replaceAll('ᾯ', 'hóì') //
  sOut = sOut.replaceAll('ῶ', 'óò') //
  sOut = sOut.replaceAll('ὤ', 'oó') //
  sOut = sOut.replaceAll('Ὤ', 'oó') //
  sOut = sOut.replaceAll('ὥ', 'hoó') //
  sOut = sOut.replaceAll('Ὥ', 'hoó') //
  sOut = sOut.replaceAll('ᾤ', 'oí') //
  sOut = sOut.replaceAll('ᾬ', 'oí') //
  sOut = sOut.replaceAll('ᾥ', 'hoí') //
  sOut = sOut.replaceAll('ᾭ', 'hoí') //
  sOut = sOut.replaceAll('ὢ', 'oò') //
  sOut = sOut.replaceAll('Ὢ', 'oò') //
  sOut = sOut.replaceAll('ὣ', 'hoò') //
  sOut = sOut.replaceAll('Ὣ', 'hoò') //
  sOut = sOut.replaceAll('ᾢ', 'oì') //
  sOut = sOut.replaceAll('ᾪ', 'oì') //
  sOut = sOut.replaceAll('ᾣ', 'hoì') //
  sOut = sOut.replaceAll('ᾫ', 'hoì') //
  sOut = sOut.replaceAll('ᾠ', 'oi') //
  sOut = sOut.replaceAll('ᾨ', 'oi') //
  sOut = sOut.replaceAll('ᾡ', 'hoi') //
  sOut = sOut.replaceAll('ᾩ', 'hoi') //
  sOut = sOut.replaceAll('ὠ', 'oo') //
  sOut = sOut.replaceAll('Ὠ', 'oo') //
  sOut = sOut.replaceAll('ὡ', 'hoo') //
  sOut = sOut.replaceAll('Ὡ', 'hoo') //
  sOut = sOut.replaceAll('ώ', 'oó') //
  sOut = sOut.replaceAll('Ώ', 'oó') //
  sOut = sOut.replaceAll('ὼ', 'oò') //
  sOut = sOut.replaceAll('Ὼ', 'oò') //
  sOut = sOut.replaceAll('ω', 'oo') //
  sOut = sOut.replaceAll('Ω', 'oo') //

  //σύμφωνα
  sOut = sOut.replaceAll('κγ', 'g2') //
  sOut = sOut.replaceAll('ΚΓ', 'g2') // long
  sOut = sOut.replaceAll('γκ', 'g2') //
  sOut = sOut.replaceAll('γγ', 'ng') //
  sOut = sOut.replaceAll('ΓΓ', 'ng') //
  sOut = sOut.replaceAll('β', 'b') //
  sOut = sOut.replaceAll('Β', 'b') //
  sOut = sOut.replaceAll('γ', 'g') //
  sOut = sOut.replaceAll('Γ', 'g') //
  sOut = sOut.replaceAll('δ', 'd') //
  sOut = sOut.replaceAll('Δ', 'd') //
  sOut = sOut.replaceAll('ζ', 'zd') //
  sOut = sOut.replaceAll('Ζ', 'zd') //
  sOut = sOut.replaceAll('θ', 'tʰ') //
  sOut = sOut.replaceAll('Θ', 'tʰ') //
  sOut = sOut.replaceAll('κ', 'k') //
  sOut = sOut.replaceAll('Κ', 'k') //
  sOut = sOut.replaceAll('λλ', 'l2') // long l
  sOut = sOut.replaceAll('λ', 'l') //
  sOut = sOut.replaceAll('Λ', 'l') //
  sOut = sOut.replaceAll('μ', 'm') //
  sOut = sOut.replaceAll('Μ', 'm') //
  sOut = sOut.replaceAll('ν', 'n') //
  sOut = sOut.replaceAll('Ν', 'n') //
  sOut = sOut.replaceAll('ξ', 'ks') //
  sOut = sOut.replaceAll('Ξ', 'ks') //
  sOut = sOut.replaceAll('ππ', 'p2') //
  sOut = sOut.replaceAll('π', 'p') //
  sOut = sOut.replaceAll('ΠΠ', 'p2') //
  sOut = sOut.replaceAll('Π', 'p') //
  sOut = sOut.replaceAll('ῤ', 'r') //
  sOut = sOut.replaceAll('ῥ', 'r') //
  sOut = sOut.replaceAll('ρρ', 'r2') //
  sOut = sOut.replaceAll('ρ', 'r') //
  sOut = sOut.replaceAll('Ῥ', 'r') // with dasia
  sOut = sOut.replaceAll('Ρ', 'r') //
  sOut = sOut.replaceAll('ΡΡ', 'r2') //
  sOut = sOut.replaceAll('σσ', 's2') //
  sOut = sOut.replaceAll('σ', 's') //
  sOut = sOut.replaceAll('ς', 's') //
  sOut = sOut.replaceAll('ΣΣ', 's2') //
  sOut = sOut.replaceAll('Σ', 's') //
  sOut = sOut.replaceAll('ττ', 't2') //
  sOut = sOut.replaceAll('τ', 't') //
  sOut = sOut.replaceAll('Τ', 't') //
  sOut = sOut.replaceAll('φ', 'pʰ') //
  sOut = sOut.replaceAll('Φ', 'pʰ') //
  sOut = sOut.replaceAll('χχ', 'k2ʰ') //
  sOut = sOut.replaceAll('χ', 'kʰ') //
  sOut = sOut.replaceAll('ΧΧ', 'k2ʰ') //
  sOut = sOut.replaceAll('Χ', 'kʰ') //
  sOut = sOut.replaceAll('ψ', 'ps') //
  sOut = sOut.replaceAll('Ψ', 'ps') //

  return '/' + sOut + '/'
}

/*
 * DOING: it finds the-phonemic-notation of a-GreekAncient-text-word from GreekNew.
 * INPUT: βῆ
 * OUTPUT: /vi/
 */
function fEllawordFindPhonemaNew (sWordIn) {
  let
    nIndex,
    sOut = sWordIn

  //φωνήεντα
  sOut = sOut.replaceAll('αύα', 'áva') //ναύαρχος
  sOut = sOut.replaceAll('αυα', 'ava')
  sOut = sOut.replaceAll('αύγ', 'ávy') //αύγουστος
  sOut = sOut.replaceAll('Αύγ', 'ávy') //αύγουστος
  sOut = sOut.replaceAll('Αυγ', 'avy') //Αυγουστίνος
  sOut = sOut.replaceAll('αυγ', 'avy')
  sOut = sOut.replaceAll('αύδ', 'ávdh') //Κλαύδιος
  sOut = sOut.replaceAll('αυδ', 'avdh')
  sOut = sOut.replaceAll('αύε', 'áve') //αύε
  sOut = sOut.replaceAll('αυε', 'ave')
  sOut = sOut.replaceAll('αύλ', 'ávl') //ναύλος
  sOut = sOut.replaceAll('αυλ', 'avl')
  sOut = sOut.replaceAll('Αυλ', 'avl') //Αυλώνας
  sOut = sOut.replaceAll('αύμ', 'ávm') //θαύμα
  sOut = sOut.replaceAll('αυμ', 'avm')
  sOut = sOut.replaceAll('αύν', 'ávn') //αύν
  sOut = sOut.replaceAll('αυν', 'avn')
  sOut = sOut.replaceAll('αυπ', 'afp') //ναυπηγός
  sOut = sOut.replaceAll('αύρ', 'ávr') //Σταύρος
  sOut = sOut.replaceAll('αυρ', 'avr')
  sOut = sOut.replaceAll('αύθ', 'áfth') //αύθ
  sOut = sOut.replaceAll('αυθ', 'afth')
  sOut = sOut.replaceAll('αύκ', 'áfk') //καύκασος
  sOut = sOut.replaceAll('αυκ', 'afk')
  sOut = sOut.replaceAll('αύλ', 'ávl')
  sOut = sOut.replaceAll('αυλ', 'avl') //αυλή
  sOut = sOut.replaceAll('αύξ', 'áfks') //αύξ
  sOut = sOut.replaceAll('αυξ', 'afks')
  sOut = sOut.replaceAll('αύρ', 'ávr') //αύριο
  sOut = sOut.replaceAll('Αύρ', 'ávr') //Αύρα
  sOut = sOut.replaceAll('αυπ', 'afp') //ναυπηγός
  sOut = sOut.replaceAll('αύσ', 'áfs') //ναύσταθμος
  sOut = sOut.replaceAll('αυσ', 'afs') //καυστήρας
  sOut = sOut.replaceAll('Αυσ', 'afs') //Αυστραλός
  sOut = sOut.replaceAll('αύτ', 'áft') //ναύτης
  sOut = sOut.replaceAll('αυτ', 'aft')
  sOut = sOut.replaceAll('αυκ', 'afk') //καυκιά
  sOut = sOut.replaceAll('αύχ', 'áfh') //αύχ
  sOut = sOut.replaceAll('αυχ', 'afh')
  sOut = sOut.replaceAll('αἰ', 'e') //
  sOut = sOut.replaceAll('Αἰ', 'e') //
  sOut = sOut.replaceAll('αἱ', 'e') //
  sOut = sOut.replaceAll('Αἱ', 'e') //
  sOut = sOut.replaceAll('αῖ', 'é') //
  sOut = sOut.replaceAll('αἷ', 'é') //
  sOut = sOut.replaceAll('αἶ', 'é') //
  sOut = sOut.replaceAll('αἵ', 'é') //
  sOut = sOut.replaceAll('αἴ', 'é') //
  sOut = sOut.replaceAll('αί', 'é') //
  sOut = sOut.replaceAll('αι', 'e') //

  sOut = sOut.replaceAll('ευαι', 'eve') //ευαισθησία
  sOut = sOut.replaceAll('εύα', 'éva') //εύα
  sOut = sOut.replaceAll('ευα', 'eva')
  sOut = sOut.replaceAll('Εύα', 'éva') //Εύα
  sOut = sOut.replaceAll('Ευα', 'eva') //Ευαγγελισμός
  sOut = sOut.replaceAll('ευά', 'evá')
  sOut = sOut.replaceAll('Ευά', 'evá') //Ευάγγελος
  sOut = sOut.replaceAll('ευβ', 'ev') //ευβουλία
  sOut = sOut.replaceAll('Ευβ', 'ev') //ευβουλία
  sOut = sOut.replaceAll('εύγ', 'évy') //εύγ
  sOut = sOut.replaceAll('ευγ', 'evy')
  sOut = sOut.replaceAll('Ευγ', 'evy')
  sOut = sOut.replaceAll('εύδ', 'évdh') //εύδ
  sOut = sOut.replaceAll('ευδ', 'evdh')
  sOut = sOut.replaceAll('Ευδ', 'evdh')
  sOut = sOut.replaceAll('εύε', 'éve') //εύε
  sOut = sOut.replaceAll('ευέ', 'evé') //ευέλπιδες
  sOut = sOut.replaceAll('ευε', 'eve')
  sOut = sOut.replaceAll('εύζ', 'évz') //εύζωνας
  sOut = sOut.replaceAll('ευζ', 'evz')
  sOut = sOut.replaceAll('εύη', 'évi') //χλεύη
  sOut = sOut.replaceAll('ευή', 'eví') //ευήθεια
  sOut = sOut.replaceAll('ευη', 'evi') //ευηκοΐα
  sOut = sOut.replaceAll('εύθ', 'éfth') //εύθ
  sOut = sOut.replaceAll('ευθ', 'efth')
  sOut = sOut.replaceAll('Ευθ', 'efth')
  sOut = sOut.replaceAll('ευί', 'eví') //λευίτης
  sOut = sOut.replaceAll('εύκ', 'éfk') //εύκ
  sOut = sOut.replaceAll('ευκ', 'efk')
  sOut = sOut.replaceAll('ευk', 'efk')
  sOut = sOut.replaceAll('Ευκ', 'efk')
  sOut = sOut.replaceAll('εύλ', 'évl') //εύλ
  sOut = sOut.replaceAll('ευλ', 'evl')
  sOut = sOut.replaceAll('Ευλ', 'evl')
  sOut = sOut.replaceAll('εύμ', 'évm') //εύμ
  sOut = sOut.replaceAll('ευμ', 'evm')
  sOut = sOut.replaceAll('Ευμ', 'evm')
  sOut = sOut.replaceAll('εύν', 'évn') //εύν
  sOut = sOut.replaceAll('ευν', 'evn')
  sOut = sOut.replaceAll('εύξ', 'éfks') //εύξ
  sOut = sOut.replaceAll('ευξ', 'efks')
  sOut = sOut.replaceAll('εύου', 'évu') //καθαρεύουσα
  sOut = sOut.replaceAll('εύο', 'évo')
  sOut = sOut.replaceAll('ευό', 'evó') //προστατευόμενος
  sOut = sOut.replaceAll('ευού', 'evú') //παρασκευούλα
  sOut = sOut.replaceAll('ευου', 'evu') //καθαρευουσιάνος
  sOut = sOut.replaceAll('ευο', 'evo') //ευορκία
  sOut = sOut.replaceAll('ευπ', 'efp') //ευπατρίδης
  sOut = sOut.replaceAll('Ευπ', 'efp')
  sOut = sOut.replaceAll('εύρ', 'évr') //εύρ
  sOut = sOut.replaceAll('Εύρ', 'évr') //εύρ
  sOut = sOut.replaceAll('ευρ', 'evr')
  sOut = sOut.replaceAll('Ευρ', 'evr') //Ευριπίδης
  sOut = sOut.replaceAll('εύσ', 'éfs') //εύσ
  sOut = sOut.replaceAll('ευσ', 'efs') //ευσ
  sOut = sOut.replaceAll('Ευσ', 'efs') //ευσ
  sOut = sOut.replaceAll('εύτ', 'éft') //εύτ
  sOut = sOut.replaceAll('ευτ', 'eft') //ευτ
  sOut = sOut.replaceAll('Ευτ', 'eft') //ευτ
  sOut = sOut.replaceAll('ευφ', 'ef') //ευφημισμός
  sOut = sOut.replaceAll('Ευφ', 'ef') //Ευφημία
  sOut = sOut.replaceAll('Εύφ', 'éf')
  sOut = sOut.replaceAll('ευχ', 'efh') //ευχέτης
  sOut = sOut.replaceAll('ευψ', 'efps') //ευψυχία
  sOut = sOut.replaceAll('Ευω', 'evo')
  sOut = sOut.replaceAll('ευω', 'evo')
  sOut = sOut.replaceAll('εῖ', 'í') //
  sOut = sOut.replaceAll('εἷ', 'í') //
  sOut = sOut.replaceAll('εἶ', 'í') //
  sOut = sOut.replaceAll('εἵ', 'í') //
  sOut = sOut.replaceAll('εἴ', 'í') //
  sOut = sOut.replaceAll('εί', 'í') //
  sOut = sOut.replaceAll('ει', 'i') //
  sOut = sOut.replaceAll('οῖ', 'í') //
  sOut = sOut.replaceAll('οἷ', 'í') //
  sOut = sOut.replaceAll('οἶ', 'í') //
  sOut = sOut.replaceAll('οἵ', 'í') //
  sOut = sOut.replaceAll('οἴ', 'í') //
  sOut = sOut.replaceAll('οἰ', 'i') //
  sOut = sOut.replaceAll('οἱ', 'i') //
  sOut = sOut.replaceAll('οι', 'i') //
  sOut = sOut.replaceAll('οὗ', 'ú') //
  sOut = sOut.replaceAll('οὖ', 'ú') //
  sOut = sOut.replaceAll('οὕ', 'ú') //
  sOut = sOut.replaceAll('οὔ', 'ú') //
  sOut = sOut.replaceAll('ού', 'ú') //
  sOut = sOut.replaceAll('οῦ', 'ú') //
  sOut = sOut.replaceAll('ου', 'u') //
  //
  sOut = sOut.replaceAll('ᾆ', 'á') //
  sOut = sOut.replaceAll('ᾎ', 'á') //
  sOut = sOut.replaceAll('ᾇ', 'á') //
  sOut = sOut.replaceAll('ᾏ', 'á') //
  sOut = sOut.replaceAll('ἆ', 'á') //
  sOut = sOut.replaceAll('Ἆ', 'á') //
  sOut = sOut.replaceAll('ἇ', 'á') //
  sOut = sOut.replaceAll('Ἇ', 'á') //
  sOut = sOut.replaceAll('ᾷ', 'á') //
  sOut = sOut.replaceAll('ᾶ', 'á') //
  sOut = sOut.replaceAll('ᾄ', 'á') //
  sOut = sOut.replaceAll('ᾌ', 'á') //
  sOut = sOut.replaceAll('ᾅ', 'á') //
  sOut = sOut.replaceAll('ᾍ', 'á') //
  sOut = sOut.replaceAll('ᾂ', 'á') //
  sOut = sOut.replaceAll('ᾊ', 'á') //
  sOut = sOut.replaceAll('ᾃ', 'á') //
  sOut = sOut.replaceAll('ᾋ', 'á') //
  sOut = sOut.replaceAll('ἄ', 'á') //
  sOut = sOut.replaceAll('Ἄ', 'á') //
  sOut = sOut.replaceAll('ἅ', 'á') //
  sOut = sOut.replaceAll('Ἅ', 'á') //
  sOut = sOut.replaceAll('ἂ', 'á') //
  sOut = sOut.replaceAll('Ἂ', 'á') //
  sOut = sOut.replaceAll('ἃ', 'á') //
  sOut = sOut.replaceAll('Ἃ', 'á') //
  sOut = sOut.replaceAll('ά', 'á') //
  sOut = sOut.replaceAll('Ά', 'á') //
  sOut = sOut.replaceAll('ὰ', 'á') //
  sOut = sOut.replaceAll('Ὰ', 'á') //
  sOut = sOut.replaceAll('ᾀ', 'a') //
  sOut = sOut.replaceAll('ᾈ', 'a') //
  sOut = sOut.replaceAll('ᾁ', 'a') //
  sOut = sOut.replaceAll('ᾉ', 'a') //
  sOut = sOut.replaceAll('ἀ', 'a') //
  sOut = sOut.replaceAll('Ἀ', 'a') //
  sOut = sOut.replaceAll('ἁ', 'a') //
  sOut = sOut.replaceAll('Ἁ', 'a') //
  sOut = sOut.replaceAll('ᾰ', 'a') //
  sOut = sOut.replaceAll('ᾳ', 'a') //
  sOut = sOut.replaceAll('ᾼ', 'a') //
  sOut = sOut.replaceAll('Ᾰ', 'a') //
  sOut = sOut.replaceAll('ᾱ', 'a') //
  sOut = sOut.replaceAll('Ᾱ', 'a') //
  sOut = sOut.replaceAll('α', 'a') //
  sOut = sOut.replaceAll('Α', 'a') //
  //
  sOut = sOut.replaceAll('ἔ', 'é') //
  sOut = sOut.replaceAll('Ἔ', 'é') //
  sOut = sOut.replaceAll('ἕ', 'é') //
  sOut = sOut.replaceAll('Ἕ', 'é') //
  sOut = sOut.replaceAll('ἒ', 'é') //
  sOut = sOut.replaceAll('Ἒ', 'é') //
  sOut = sOut.replaceAll('ἓ', 'é') //
  sOut = sOut.replaceAll('Ἓ', 'é') //
  sOut = sOut.replaceAll('έ', 'é') //
  sOut = sOut.replaceAll('έ', 'é') //
  sOut = sOut.replaceAll('Έ', 'é') //
  sOut = sOut.replaceAll('ὲ', 'é') //
  sOut = sOut.replaceAll('ἐ', 'e') //
  sOut = sOut.replaceAll('Ἐ', 'e') //
  sOut = sOut.replaceAll('ἑ', 'e') //
  sOut = sOut.replaceAll('Ἑ', 'e') //
  sOut = sOut.replaceAll('ε', 'e') //
  sOut = sOut.replaceAll('Ε', 'e') //
  //
  sOut = sOut.replaceAll('ᾖ', 'í') //
  sOut = sOut.replaceAll('ᾞ', 'í') //
  sOut = sOut.replaceAll('ᾗ', 'í') //
  sOut = sOut.replaceAll('ᾟ', 'í') //
  sOut = sOut.replaceAll('ἦ', 'í') //
  sOut = sOut.replaceAll('Ἦ', 'í') //
  sOut = sOut.replaceAll('ἧ', 'í') //
  sOut = sOut.replaceAll('Ἧ', 'í') //
  sOut = sOut.replaceAll('ῇ', 'í') //
  sOut = sOut.replaceAll('ῆ', 'í') //
  sOut = sOut.replaceAll('ᾔ', 'í') //
  sOut = sOut.replaceAll('ᾜ', 'í') //
  sOut = sOut.replaceAll('ᾕ', 'í') //
  sOut = sOut.replaceAll('ᾝ', 'í') //
  sOut = sOut.replaceAll('ἤ', 'í') //
  sOut = sOut.replaceAll('Ἤ', 'í') //
  sOut = sOut.replaceAll('ἥ', 'í') //
  sOut = sOut.replaceAll('Ἥ', 'í') //
  sOut = sOut.replaceAll('ᾒ', 'í') //
  sOut = sOut.replaceAll('ᾚ', 'í') //
  sOut = sOut.replaceAll('ᾓ', 'í') //
  sOut = sOut.replaceAll('ᾛ', 'í') //
  sOut = sOut.replaceAll('ἢ', 'í') //
  sOut = sOut.replaceAll('Ἢ', 'í') //
  sOut = sOut.replaceAll('ἣ', 'í') //
  sOut = sOut.replaceAll('Ἣ', 'í') //
  sOut = sOut.replaceAll('ῄ', 'í') //
  sOut = sOut.replaceAll('ῂ', 'í') //
  sOut = sOut.replaceAll('ή', 'í') //
  sOut = sOut.replaceAll('Ή', 'í') //
  sOut = sOut.replaceAll('ὴ', 'í') //
  sOut = sOut.replaceAll('Ὴ', 'í') //
  sOut = sOut.replaceAll('ᾐ', 'i') //
  sOut = sOut.replaceAll('ᾘ', 'i') //
  sOut = sOut.replaceAll('ᾑ', 'i') //
  sOut = sOut.replaceAll('ᾙ', 'i') //
  sOut = sOut.replaceAll('ἠ', 'i') //
  sOut = sOut.replaceAll('Ἠ', 'i') //
  sOut = sOut.replaceAll('ἡ', 'i') //
  sOut = sOut.replaceAll('Ἡ', 'i') //
  sOut = sOut.replaceAll('ῃ', 'i') //
  sOut = sOut.replaceAll('ῌ', 'i') //
  sOut = sOut.replaceAll('η', 'i') //
  sOut = sOut.replaceAll('Η', 'i') //
  //
  sOut = sOut.replaceAll('ἶ', 'í') //
  sOut = sOut.replaceAll('Ἶ', 'í') //
  sOut = sOut.replaceAll('ἷ', 'í') //
  sOut = sOut.replaceAll('Ἷ', 'í') //
  sOut = sOut.replaceAll('ἴ', 'í') //
  sOut = sOut.replaceAll('Ἴ', 'í') //
  sOut = sOut.replaceAll('ἵ', 'í') //
  sOut = sOut.replaceAll('Ἵ', 'í') //
  sOut = sOut.replaceAll('ἲ', 'í') //
  sOut = sOut.replaceAll('Ἲ', 'í') //
  sOut = sOut.replaceAll('ἳ', 'í') //
  sOut = sOut.replaceAll('Ἳ', 'í') //
  sOut = sOut.replaceAll('ΐ', 'í') //
  sOut = sOut.replaceAll('ΐ', 'í') //
  sOut = sOut.replaceAll('ί', 'í') //
  sOut = sOut.replaceAll('Ί', 'í') //
  sOut = sOut.replaceAll('ὶ', 'í') //
  sOut = sOut.replaceAll('Ὶ', 'í') //
  sOut = sOut.replaceAll('ἰ', 'i') //
  sOut = sOut.replaceAll('Ἰ', 'i') //
  sOut = sOut.replaceAll('ἱ', 'i') //
  sOut = sOut.replaceAll('Ἱ', 'i') //
  sOut = sOut.replaceAll('ῖ', 'í') //
  sOut = sOut.replaceAll('ῐ', 'i') //
  sOut = sOut.replaceAll('Ῐ', 'i') //
  sOut = sOut.replaceAll('ῑ', 'i') //
  sOut = sOut.replaceAll('Ῑ', 'i') //
  sOut = sOut.replaceAll('ι', 'i') //
  sOut = sOut.replaceAll('Ι', 'i') //
  //
  sOut = sOut.replaceAll('ὄ', 'ó') //
  sOut = sOut.replaceAll('Ὄ', 'ó') //
  sOut = sOut.replaceAll('ὅ', 'ó') //
  sOut = sOut.replaceAll('Ὅ', 'ó') //
  sOut = sOut.replaceAll('ὂ', 'ó') //
  sOut = sOut.replaceAll('Ὂ', 'ó') //
  sOut = sOut.replaceAll('ὃ', 'ó') //
  sOut = sOut.replaceAll('Ὃ', 'ó') //
  sOut = sOut.replaceAll('ό', 'ó') //
  sOut = sOut.replaceAll('Ό', 'ó') //
  sOut = sOut.replaceAll('ὸ', 'ó') //
  sOut = sOut.replaceAll('Ὸ', 'ó') //
  sOut = sOut.replaceAll('ὀ', 'o') //
  sOut = sOut.replaceAll('Ὀ', 'o') //
  sOut = sOut.replaceAll('ὁ', 'o') //
  sOut = sOut.replaceAll('Ὁ', 'o') //
  sOut = sOut.replaceAll('ο', 'o') //
  sOut = sOut.replaceAll('Ο', 'o') //
  //
  sOut = sOut.replaceAll('ὖ', 'í') //
  sOut = sOut.replaceAll('ὗ', 'í') //
  sOut = sOut.replaceAll('Ὗ', 'í') //
  sOut = sOut.replaceAll('ῧ', 'í') //
  sOut = sOut.replaceAll('ῦ', 'í') //
  sOut = sOut.replaceAll('ὔ', 'í') //
  sOut = sOut.replaceAll('ὕ', 'í') //
  sOut = sOut.replaceAll('Ὕ', 'í') //
  sOut = sOut.replaceAll('ὒ', 'í') //
  sOut = sOut.replaceAll('ὓ', 'í') //
  sOut = sOut.replaceAll('Ὓ', 'í') //
  sOut = sOut.replaceAll('ύ', 'í') //
  sOut = sOut.replaceAll('Ύ', 'í') //
  sOut = sOut.replaceAll('ὺ', 'í') //
  sOut = sOut.replaceAll('Ὺ', 'í') //
  sOut = sOut.replaceAll('ΰ', 'í') //
  sOut = sOut.replaceAll('ῢ', 'í') //
  sOut = sOut.replaceAll('ὐ', 'i') //
  sOut = sOut.replaceAll('ὑ', 'i') //
  sOut = sOut.replaceAll('Ὑ', 'i') //
  sOut = sOut.replaceAll('ῠ', 'i') //
  sOut = sOut.replaceAll('Ῠ', 'i') //
  sOut = sOut.replaceAll('ῡ', 'i') //
  sOut = sOut.replaceAll('Ῡ', 'i') //
  sOut = sOut.replaceAll('υ', 'i') //
  //
  sOut = sOut.replaceAll('ῷ', 'ó') //
  sOut = sOut.replaceAll('ὦ', 'ó') //
  sOut = sOut.replaceAll('Ὦ', 'ó') //
  sOut = sOut.replaceAll('ὧ', 'ó') //
  sOut = sOut.replaceAll('Ὧ', 'ó') //
  sOut = sOut.replaceAll('ᾦ', 'ó') //
  sOut = sOut.replaceAll('ᾮ', 'ó') //
  sOut = sOut.replaceAll('ᾧ', 'ó') //
  sOut = sOut.replaceAll('ᾯ', 'ó') //
  sOut = sOut.replaceAll('ῶ', 'ó') //
  sOut = sOut.replaceAll('ὤ', 'ó') //
  sOut = sOut.replaceAll('Ὤ', 'ó') //
  sOut = sOut.replaceAll('ὥ', 'ó') //
  sOut = sOut.replaceAll('Ὥ', 'ó') //
  sOut = sOut.replaceAll('ᾤ', 'ó') //
  sOut = sOut.replaceAll('ᾬ', 'ó') //
  sOut = sOut.replaceAll('ᾥ', 'ó') //
  sOut = sOut.replaceAll('ᾭ', 'ó') //
  sOut = sOut.replaceAll('ὢ', 'ó') //
  sOut = sOut.replaceAll('Ὢ', 'ó') //
  sOut = sOut.replaceAll('ὣ', 'ó') //
  sOut = sOut.replaceAll('Ὣ', 'ó') //
  sOut = sOut.replaceAll('ᾢ', 'ó') //
  sOut = sOut.replaceAll('ᾪ', 'ó') //
  sOut = sOut.replaceAll('ᾣ', 'ó') //
  sOut = sOut.replaceAll('ᾫ', 'ó') //
  sOut = sOut.replaceAll('ᾠ', 'o') //
  sOut = sOut.replaceAll('ᾨ', 'o') //
  sOut = sOut.replaceAll('ᾡ', 'o') //
  sOut = sOut.replaceAll('ᾩ', 'o') //
  sOut = sOut.replaceAll('ὠ', 'o') //
  sOut = sOut.replaceAll('Ὠ', 'o') //
  sOut = sOut.replaceAll('ὡ', 'o') //
  sOut = sOut.replaceAll('Ὡ', 'o') //
  sOut = sOut.replaceAll('ώ', 'ó') //
  sOut = sOut.replaceAll('Ώ', 'ó') //
  sOut = sOut.replaceAll('ὼ', 'ó') //
  sOut = sOut.replaceAll('Ὼ', 'ó') //
  sOut = sOut.replaceAll('ω', 'o') //
  sOut = sOut.replaceAll('Ω', 'o') //

  //σύμφωνα
  sOut = sOut.replaceAll('β', 'v') //
  sOut = sOut.replaceAll('Β', 'v') //
  sOut = sOut.replaceAll('γ', 'y') //
  sOut = sOut.replaceAll('Γ', 'y') //
  sOut = sOut.replaceAll('γκ', 'g') //
  sOut = sOut.replaceAll('γγ', 'g') //
  sOut = sOut.replaceAll('δ', 'dh') //
  sOut = sOut.replaceAll('Δ', 'dh') //
  sOut = sOut.replaceAll('ζ', 'z') //
  sOut = sOut.replaceAll('Ζ', 'z') //
  sOut = sOut.replaceAll('θ', 'th') //
  sOut = sOut.replaceAll('Θ', 'th') //
  sOut = sOut.replaceAll('κ', 'k') //
  sOut = sOut.replaceAll('Κ', 'k') //
  sOut = sOut.replaceAll('λλ', 'l') //
  sOut = sOut.replaceAll('λ', 'l') //
  sOut = sOut.replaceAll('Λ', 'l') //
  sOut = sOut.replaceAll('μμ', 'm') //
  sOut = sOut.replaceAll('μ', 'm') //
  sOut = sOut.replaceAll('Μ', 'm') //
  sOut = sOut.replaceAll('ντ', 'd') //
  sOut = sOut.replaceAll('Ντ', 'd') //
  sOut = sOut.replaceAll('ν', 'n') //
  sOut = sOut.replaceAll('Ν', 'n') //
  sOut = sOut.replaceAll('ξ', 'ks') //
  sOut = sOut.replaceAll('Ξ', 'ks') //
  sOut = sOut.replaceAll('ππ', 'p') //
  sOut = sOut.replaceAll('π', 'p') //
  sOut = sOut.replaceAll('ΠΠ', 'p') //
  sOut = sOut.replaceAll('Π', 'p') //
  sOut = sOut.replaceAll('ρρ', 'r') //
  sOut = sOut.replaceAll('ρ', 'r') //
  sOut = sOut.replaceAll('ΡΡ', 'r') //
  sOut = sOut.replaceAll('Ρ', 'r') //
  sOut = sOut.replaceAll('σσ', 's') //
  sOut = sOut.replaceAll('σ', 's') //
  sOut = sOut.replaceAll('ς', 's') //
  sOut = sOut.replaceAll('ΣΣ', 's') //
  sOut = sOut.replaceAll('Σ', 's') //
  sOut = sOut.replaceAll('ττ', 't') //
  sOut = sOut.replaceAll('τ', 't') //
  sOut = sOut.replaceAll('Τ', 't') //
  sOut = sOut.replaceAll('φ', 'f') //
  sOut = sOut.replaceAll('Φ', 'f') //
  sOut = sOut.replaceAll('χ', 'h') //
  sOut = sOut.replaceAll('Χ', 'h') //
  sOut = sOut.replaceAll('ψ', 'ps') //
  sOut = sOut.replaceAll('Ψ', 'ps') //

  return '/' + sOut + '/'
}

/*
 * DOING: it finds the-phonemic-notation of a-GreekAncient-text-word
 *   with both GreekAncicent and GreekNew pronunciation.
 * INPUT: βῆ
 * OUTPUT: /béè|vi/
 */
function fEllawordFindPhonemaBoth (sWordIn) {
  let
    sAncient,
    sNew

  sAncient = fEllawordFindPhonema(sWordIn)
  sNew = fEllawordFindPhonemaNew(sWordIn)

  return sAncient.substring(0, sAncient.length-1) + '|'
    + sNew.substring(1)
}

export {
  fEllawordFindPhonema, fEllawordFindPhonemaNew, fEllawordFindPhonemaBoth
}