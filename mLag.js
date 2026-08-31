/*
 * mLag.js - module language.
 * The MIT License (MIT)
 *
 * Copyright (c) 2010-2022 Kaseluris.Nikos.1959 (synagonism)
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

import './mLagEngl.js'
import {oEltCnrPreviewDiv, oTreeUl} from './mMcsh2.js'

const
  // contains the-versions of mLag.js
  aVersion = [
    'mLag.js.0-2-0.2021-11-23: worked',
    'mLag.js.0-1-0.2021-11-22: creation'
  ]


/**
 * DOING: it finds the-prerequisites we need to find the-terms.
 */
function fFindMembers () {
  let
    sLag = 'lagEngl',
    sPos = 'verbEnglA1',
    sBase = 'expect'

  Array.prototype.slice.call(document.querySelectorAll('#idBtnTerm')).forEach(function (oEltIn) {
    oEltIn.addEventListener('click', function(oEvtIn) {
      let
        oSpan = oEvtIn.target.parentNode,
        sName = oSpan.innerHTML

      sLag = 'lag' + sName.substring(3, 7)
      //McsEngl.dress!~verbEnglA4:dress--es-ed-ing-ed,
      if (sName.indexOf(':') > 0)
        sPos = sName.substring(sName.indexOf('~')+1, sName.indexOf(':'))
      else
        sPos = sName.substring(sName.indexOf('~')+1, sName.indexOf(','))
      sBase = sName.substring(sName.indexOf('.')+1, sName.indexOf('!'))

      let sTree = '<ul class="clsTreeUl" id="idTreePreview">    <li>verb-members:      <ul>      <li>present:        <ul>        <li>active:          <ul>          <li>perfectNo:            <ul>            <li>instant (present-simple):              <ul>              <table>              <tr>                <td>(I) write                <td>(I) do not write                <td>do (I) write?                <td>do (I) not write?              <tr>                <td>(you) write                <td>(you) do not write                <td>do (you) write?                <td>do (you) not write?              </table>              </ul>            <li>instantNo (present-progressive):              <ul>              <table>                <tr>                <td>I am writing                <td>I am not writing                <td>am I writing?                <td>am I not writing?              </table>              </ul>            </ul>          <li>perfect:          </ul>        <li>activeNo:        </ul>      <li>past:        <ul>        <li>active:        <li>activeNo:        </ul>      <li>future:        <ul>        <li>active:        <li>activeNo:        </ul>    </li>    </ul>'
      oEltCnrPreviewDiv.innerHTML = sTree
      setTimeout(() => oEltCnrPreviewDiv.style.display = 'block', 100)
      oEltCnrPreviewDiv.style.top = 59 + 'px'
      oEltCnrPreviewDiv.style.left = 26 + 'px'
      oEltCnrPreviewDiv.style.width = 'auto'
      oTreeUl.fTruCreate()
      let
        aSubnodes,
        aTocTriLI = document.getElementById('idTreePreview').getElementsByTagName('li'),
        n
      for (n = 0; n < 5; n++) {
        aSubnodes = aTocTriLI[n].getElementsByTagName('ul')
        if (aSubnodes.length > 0 && aSubnodes[0].style.display === 'none') {
          oTreeUl.fTruToggleLi(aTocTriLI[n])
        }
      }
    })
  })
}


fFindMembers()
export {fFindMembers}
