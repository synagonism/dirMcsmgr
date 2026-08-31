/*
 * mLagZhon.js - module with misc util language functions.
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
  // contains the-versions of mLagZhon.js
  aVersion = [
    'mLagZhon.js.0-1-0.2022-04-23: creation'
  ]

/*
 * DOING: it finds the-phonemic-notation of a-Chinese-pinyin-word.
 * INPUT: 
 * OUTPUT:
 */
function fZhonwordFindPhonema (sWordIn) {
  let
    sOut = sWordIn

  sOut = sOut.replaceAll('b', 'p')
  sOut = sOut.replaceAll('p', 'pʰ')

  sOut = sOut.replaceAll('d', 't')
  sOut = sOut.replaceAll('t', 'tʰ')

  sOut = sOut.replaceAll('g', 'k')
  sOut = sOut.replaceAll('k', 'kʰ')

  sOut = sOut.replaceAll('zh', 'C')
  sOut = sOut.replaceAll('ch', 'Cʰ')

  sOut = sOut.replaceAll('z', 'c')
  sOut = sOut.replaceAll('c', 'cʰ')

  sOut = sOut.replaceAll('j', 'cc')
  sOut = sOut.replaceAll('q', 'ccʰ')

  sOut = sOut.replaceAll('sh', 'S')
  sOut = sOut.replaceAll('x', 'SS')

  sOut = sOut.replaceAll('ng', 'n2')

  sOut = sOut.replaceAll('ào', 'ào')

  sOut = sOut.replaceAll('ē', 'éé')
  sOut = sOut.replaceAll('é', 'eé')
  sOut = sOut.replaceAll('ě', 'èé')
  sOut = sOut.replaceAll('è', 'eè')
  
  sOut = sOut.replaceAll('ī', 'íí')
  sOut = sOut.replaceAll('í', 'ií')
  sOut = sOut.replaceAll('ǐ', 'ìí')
  sOut = sOut.replaceAll('ì', 'iì')

  sOut = sOut.replaceAll('ō', 'óó')
  
  sOut = sOut.replaceAll('ū', 'úú')

  return '/' +sOut +'/'
}

export {
  fZhonwordFindPhonema
}