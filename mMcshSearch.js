/*
 * mMcsh.js - module html5.id.toc.preview webpage-format code.
 * The MIT License (MIT)
 *
 * Copyright (c) 2010-2022 Kaseluris.Nikos.1959 (hmnSngo)
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
 */

const
  // contains the-versions of mMcsh.js 
  aVersion = [
    'mMcsh.js.19-2-0.2022-04-04: fSearchname',
    'mMcsh.js.19-1-0.2022-03-21: charRest-reference',
    'mMcsh.js.19-0-0.2022-03-20: Mcsh',
    'mHitp.js.18-10-0.2022-03-19: phoneme-events',
    'mHitp.js.18-9-1.2022-03-14: phonemes',
    'mHitp.js.18-9-0.2022-01-30: codepoints',
    'mHitp.js.18-8-1.2022-01-15: name-language',
    'mHitp.js.18-8-0.2022-01-07: lagElla',
    'mHitp.js.18-7-0.2021-12-31: lagEspo',
    'mHitp.js.18-6-0.2021-11-25: popup on content',
    'mHitp.js.18-5-1.2021-11-19: popup left',
    'mHitp.js.18-5-0.2021-11-19: create treeUl on preview',
    'mHitp.js.18-4-0.2021-11-17: Shift+1 codepoint',
    'mHitp.js.18-3-1.2021-11-16: supplementary-chars',
    'mHitp.js.18-3-0.2021-11-14: Chinese codepoints',
    'mHitp.js.18-2-1.2021-11-10: index without ;',
    'mHitp.js.18-2-0.2021-11-07: root-char sequence or not',
    'mHitp.js.18-1-1.2021-08-13: // total NAMES',
    'mHitp.js.18-1-0.2021-05-30: ctrl+F3',
    'mHitp.js.18-0-0.2021-05-25: module',
    'hitp.js.17-7-7.2021-04-28: dirMcsh',
    'hitp.js.17-7-6.2021-04-02: dirMcsh',
    'hitp.js.17-7-5.2021-04-02: lagLang',
    'hitp.js.17-7-4.2021-04-01: langoSinago-path',
    'hitp.js.17-7-3.2021-01-04: langoSinago',
    'hitp.js.17-7-2.2020-05-24: Greek search accents',
    'hitp.js.17-7-1.2020-05-05: F2, ctrl+F2',
    'hitp.js.17-6-2.2019-12-14: site-search',
    'hitp.js.17-6-1.2019-09-09: search-info',
    'hitp.js.17-6-0.2019-09-08: langoKomo-sensorial-concept',
    'hitp.js.17-5-0.2019-09-01: langoKamo',
    'hitp.js.17-4-0.2019-08-28: scrollTop',
    'hitp.js.17-3-0.2019-02-19.2019-03-05: main-name-searching',
    'hitp.js.17-2-1.2018-10-08: filMcs.last.html',
    'hitp.js.17-2-0.2018-09-21: name-notation',
    'hitp.js.17-1-0.2018-09-16: location.hash',
    'hitp.js.17-0-1.2018-09-15: home-icon',
    'hitp.js.17-0-0.2018-09-15: search-scalability',
    'hitp.js.16-5-2.2018-01-23',
    'hitp.js.16-5-1.2018-01-06: Đchain-network',
    'hitp.js.16-5-0.2017-11-10: arrow keys in search',
    'hitp.js.16-4-2.2017-10-17: no type-ahead in search',
    'hitp.js.16-4-1.2017-06-23: greek search',
    'hitp.js.16-3-5.2017-06-18: type after type-ahead, title-help, cnrInf-width',
    'hitp.js.16-2-0.2017-06-07: search-toc-show-easy',
    'hitp.js.16-1-2.2017-06-07: search-icon',
    'hitp.js.16.2017-06-05.search (15-6): hitp.16.2017-06-05.js',
    'hitp.js.15.2016-10-27.any-machine (14-9): hitp.15.2016-10-27.js',
    'hitp.js.14.2016-06-09.table-content-tree (13): hitp.14.2016-06-09.js',
    'hitp.js.13.2016-06-07.preview (12-11): hitp.13.2016-06-07.js',
    'hitp.js.12.2016-01-24.toc-icn-img (11.9): hitp.2016.01.24.12.js',
    'hitp.js.11.2015-10-26.preferences: hitp.2015.10.26.11.js',
    'hitp.js.10.2014-08-05.valuenames: hitp.2014.08.05.10.js',
    'hitp.js.9.2014-08-02.no-jQuery: hitp.2014.08.02.9.js',
    'hitp.js.8.2014-01-09.toc-on-hovering: hitp.2014.01.09.8.js',
    'hitp.js.7.2013-11-06.tabs: hitp.2013.11.06.7.js',
    'hitp.js.6.2013-08-21.site-structure: hitp.2013.08.21.6.js',
    'hitp.js.previous: hitp.2013.07.15.js (toc-ul-specific, hitp-obj)',
    'hitp.js.previous: /hitp/hitp.2013.06.29.js (hitp-dir)',
    'hitp.js.previous: toc.2013.05.30.js (section id)',
    'hitp.js.previous: toc.2013.04.19.js (JSLint ok)',
    'hitp.js.previous: toc.2013.04.14.js (preview links)',
    'hitp.js.previous: toc.2013.04.07.js (button expand|collapse)',
    'hitp.js.previous: toc.2013.04.05.js (toc scrolls to highlited)',
    'hitp.js.previous: toc.2013.04.04.js (goes click location)',
    'hitp.js.previous: toc.2013.04.01.js (toc on any browser)',
    'hitp.js.previous: 2010.12.06 (toc on chrome)'
  ],
  bEdge = navigator.userAgent.indexOf('Edg/') > -1,
  bFirefox = navigator.userAgent.indexOf('Firefox/') > -1

let
  aaNamidxfileRoot,
  // contains the-array of the-array of the-name-index-files of all languages of the-names
  // of senso-concepts [["lagEngl01ei","A|a"]]
  aSuggestions = [[]],
  
  nCfgPageinfoWidth = 30, 
  // % of window width of pageinfo-container

  oEltClicked =  document.body,
  // holds the-object of the-Html-element a-user clicks on
  oEltSitemenuUl,
  // holds the-site-structure
  oEltCnrPreviewDiv = document.createElement('div'),

  sCfgHomeLocal,
  // filSite-structure contains absolute urls, because we see it from many pages.
  // Then we must-know the-homepage of the-site and create different menus.
  sIdxfile,
  // the-index-file to search first
  sPathSite,
  sPathStmenu,
  sIdxFrom,
  // current search-index
  sIdxTo,
  // next search-index
  sQrslrAClk,
  sQrslrAClkLast
  // selector for a-elements with clsClickCnt

/**
 * Creates new containers and inserts them in the-body-element:
 * - Top-cnr for title and menus.
 * - Main-cnr for page-info and page-content.
 * - Width-cnr for managing the-width of page-info.
 * - Site-cnr for containing the-site-strucute.
 * - Preview-cnr to display link-previews.
 */
let fContainersInsert = function () {
  let
    fEvtLink,
    fEvtPreview,
    fEvtClickContent,
    fEvtMouseoverContent,
    oEltBody = document.body,
    // top-container with site, home, title, search and width subcontainers,
    oEltCnrTopDiv = document.createElement('div'),
    oEltCnrTopTitleP = document.createElement('p'),
    oEltCnrTopWidthIcnI = document.createElement('i'),
    oEltCnrTopHomeIcnI,
    oEltCnrTopSearchIcnI,
    oEltCnrTopSiteIcnI,
    // main-container with page-content and page-info sub-containers,
    oEltCnrMainDiv = document.createElement('div'),
    oEltCnrMainContentDiv = document.createElement('div'),
    oEltCnrMainInfoDiv = document.createElement('div'),
    // extra containers,
    oEltCnrWidthDiv = document.createElement('div'),
    // Page-info-cnr: PathP, TabHeadersUl, TabCntDiv,
    oEltPginfPathP = document.createElement('p'),
    oEltPginfTabHeadersUl = document.createElement('ul'),
    // Tab-content contains: TabCntToc, TabCntSrch,
    oEltPginfTabCntDiv = document.createElement('div'),
    oEltTabCntTocDiv = document.createElement('div'),
    oEltTabCntTocExpBtn = document.createElement('input'),
    oEltTabCntTocCpsBtn = document.createElement('input'),
    oEltTabCntTocPrfDiv = document.createElement('div'),
    oEltTabCntTocNotP = document.createElement('p'),
    oEltTabCntSrchDiv,
    oEltTabCntSrchLbl,
    oEltTabCntSrchSlt,
    oEltTabCntSrchP,
    oEltTabCntSrchLblChk,
    oEltTabCntSrchPPnm,
    oEltTabCntSrchIpt,
    oEltTabCntSrchOl,
    oEltCnrSiteDiv,
    sContentOriginal = oEltBody.innerHTML,
    sIdTabActive,
    sTabCntSrchOl = ''

  if (oEltSitemenuUl) {
    oEltCnrSiteDiv = document.createElement('div')
    oEltCnrTopHomeIcnI = document.createElement('i')
    oEltCnrTopSiteIcnI = document.createElement('i')
  }

  function fCnrSearchShow() {
    // Remove active-class from first-child-elt of PginfTabHeaders
    document.getElementById('idPginfTabHeadersUl')
      .firstElementChild.classList.remove('clsTabActive')
    // Add active-class on second-child-element of PginfTabHeaders
    document.getElementById('idPginfTabHeadersUl')
      .childNodes[1].classList.add('clsTabActive')
    // Hide tab-content from TabCntToc
    document.getElementById('idTabCntTocDiv').style.display = 'none'
    // Show tab-content on TabCntSrch
    document.getElementById('idTabCntSrchDiv').style.display = 'block'
    // on TabCntSrch focus input-element
    oEltTabCntSrchIpt.focus()
  }

  // localhost or online,
  sTabCntSrchOl =
    '<li>SEE ' +
      '<a class="clsPreview" href="' + sPathSite + 'dirMcsh/dirCor/McsCor000002.last.html#idMcsattNamcvn">name-notation--of-Mcs</a>.</li>' +
    '<li>TYPE a-name of ' +
      '<a class="clsPreview" href="' + sPathSite + 'dirMcsh/dirCor/McsCor000002.last.html#idOverview">a-senso-concept-Mcs</a> of ' +
      '<a class="clsPreview" href="' + sPathSite + 'dirMcsh/dirHmn/McsHmn000003.last.html#idOverview">Kaseluris.Nikos.1959-WORLDVIEW</a>.</li>' +
    '<li>some important concepts are: "<strong>char</strong>", ' +
      '"<strong>javascript</strong>", "<strong>human-language</strong>", ' +
      '"<strong>chain-net</strong>", ...</li>' +
    '<li>senso-concept-searching demonstrates THE-POWER of senso-concepts.' +
      '<br>· compare them with Google-WORD-search and Wikipedia-TEXT-entries.</li>' +
    '<li><a class="clsPreview" href="' + sPathSite + 'dirMcsh/dirHmn/McsHmn000003.last.html#idOverview">Kaseluris.Nikos.1959</a> works more than 30 years on senso-concepts. ' +
      '<br>· <a class="clsPreview" href="' + sPathSite + '#idSupport">support him</a> to continue publishing.</li>' +
    '<li>this site uses 3 types of searching:' +
      '<br>- word--site-search from site-Menu,' +
      '<br>- word--page-search by hitting Ctrl+F and' +
      '<br>- senso-concept--search here.</li>'

  oEltCnrTopSearchIcnI = document.createElement('i')
  oEltTabCntSrchDiv = document.createElement('div')
  oEltTabCntSrchLbl = document.createElement('label')
  oEltTabCntSrchSlt = document.createElement('select')
  oEltTabCntSrchP = document.createElement('p')
  oEltTabCntSrchLblChk = document.createElement('label')
  oEltTabCntSrchPPnm = document.createElement('p')
  oEltTabCntSrchIpt = document.createElement('input')
  oEltTabCntSrchOl = document.createElement('ol')
  sIdxfile = 'lagRoot' // the-index-file to search first
  sIdxFrom = '' // current search-index
  sIdxTo = '' // next search-index
  oEltCnrTopTitleP.setAttribute('title', 'clicking GREEN-BAR shows search-tab, clicking CONTENT shows Toc-tab')
  oEltCnrTopSearchIcnI.setAttribute('class', 'clsFa clsFaSearch clsTopIcn clsColorWhite clsFloatRight clsPosRight')
  oEltCnrTopSearchIcnI.addEventListener('click', function () {
    fCnrOntopRemove()
    fCnrSearchShow()
  })

  let
    sKeycode = '',
    nTimeCurrent,
    nTimeKeyLast = Date.now()

  // Shift+1 displays the-codepoint of selected char
  addEventListener('keyup', function (oEvtIn) {
    nTimeCurrent = Date.now()
    if (nTimeCurrent - nTimeKeyLast > 1000) {
      sKeycode = ''
    }
    sKeycode = sKeycode +'+' +oEvtIn.code
    nTimeKeyLast = nTimeCurrent
    if (sKeycode === '+Digit1+ShiftLeft') {
      let
        s = getSelection().toString(),
        sOut = '',
        n
      for (n = 0; n < s.length; n++) {
        if (s.charCodeAt(n) >= 55296 && s.charCodeAt(n) <= 56319) {
          //on high-surrogates do not count the low-surrogate
          sOut = sOut + s.codePointAt(n) + '-'
          n = n+1
        } else {
          sOut = sOut + s.codePointAt(n) + '-'
        }
      }
      oEltCnrPreviewDiv.innerHTML = '► chars: '+s +'<br>► codepoints: ' + sOut.substring(0, sOut.length-1)
      oEltCnrPreviewDiv.style.display = 'block'
      oEltCnrPreviewDiv.style.top = 59 + 'px'
      oEltCnrPreviewDiv.style.left = 59 + 'px' 
    }
  })

  addEventListener('keyup', function (oEvtIn) {
    if (oEvtIn.ctrlKey && oEvtIn.key === 'F2') {
      fCnrOntopRemove()
      fCnrSearchShow()
      //select Greek-lag, BUT needs to clear the-input-field to show stats
      oEltTabCntSrchSlt.options[4].selected = true
    }
  })

  addEventListener('keyup', function (oEvtIn) {
    if (oEvtIn.ctrlKey && oEvtIn.key === 'F3') {
      fCnrOntopRemove()
      fCnrSearchShow()
      //select Chinese
      oEltTabCntSrchSlt.options[2].selected = true
    }
  })

  addEventListener('keydown', function (oEvtIn) {
    if (oEvtIn.key === 'F2') {
      fCnrOntopRemove()
      fCnrSearchShow()
      // English
      oEltTabCntSrchSlt.options[0].selected = true
    }
  })

  addEventListener('keydown', function (oEvtIn) {
    if (oEvtIn.shiftKey && oEvtIn.key === 'F2') {
      fCnrOntopRemove()
      fCnrSearchShow()
      // Sinago
      oEltTabCntSrchSlt.options[1].selected = true
    }
  })

  addEventListener('keydown', function (oEvtIn) {
    if (oEvtIn.shiftKey && oEvtIn.key === 'F3') {
      fCnrOntopRemove()
      fCnrSearchShow()
      // Esperanto
      oEltTabCntSrchSlt.options[3].selected = true
    }
  })

  oEltCnrTopDiv.id = 'idCnrTopDiv'
  oEltCnrMainDiv.id = 'idCnrMainDiv'

  // top-title-text
  oEltCnrTopTitleP.innerHTML = document.getElementsByTagName('title')[0].innerHTML
  oEltCnrTopTitleP.id = 'idTopTitleP'
  // width-icon
  oEltCnrTopWidthIcnI.setAttribute('class', 'clsFa clsFaArrowsH clsTopIcn clsColorWhite clsFloatRight clsTtp clsPosRight')
  // to show a-tooltip on an-element:
  // - set clsTtp on element
  // - set tooltip (<span class="clsTtp">Width of Page-Info</span>) inside the-element
  // - on element click add clsClicked and clsTtpShow
  oEltCnrTopWidthIcnI.innerHTML = '<span class="clsTtp">width of page-info</span>'
  oEltCnrTopWidthIcnI.addEventListener('click', function () {
    if (oEltCnrTopWidthIcnI.className.indexOf('clsClicked') > -1) {
      oEltCnrWidthDiv.style.display = 'block'
      oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked')
    } else {
      oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked')
      oEltClicked = oEltCnrTopWidthIcnI
      oEltCnrTopWidthIcnI.classList.add('clsClicked', 'clsTtpShow')
    }
  })
  // width-content
  oEltCnrWidthDiv.id = 'idCnrWidthDiv'
  oEltCnrWidthDiv.innerHTML = '<p id="idWidthCntP" class="clsCenter">close <i class="clsFa clsFaClose clsFloatRight clsColorWhite clsTopIcn"></i></p>' +
    '<fieldset><legend>Page-Info-width:</legend>' +
    '<input type="radio" id="idRdbWidth0" name="nameRdbWidth">0 %<br>' +
    '<input type="radio" id="idRdbWidth10" name="nameRdbWidth">10 %<br>' +
    '<input type="radio" id="idRdbWidth20" name="nameRdbWidth">20 %<br>' +
    '<input type="radio" id="idRdbWidth25" name="nameRdbWidth">25 %<br>' +
    '<input type="radio" id="idRdbWidth30" name="nameRdbWidth">30 %<br>' +
    '<input type="radio" id="idRdbWidth40" name="nameRdbWidth">40 %<br>' +
    '<input type="radio" id="idRdbWidth50" name="nameRdbWidth">50 %<br>' +
    '<input type="radio" id="idRdbWidth100" name="nameRdbWidth">100 %<br>' +
    '</fieldset>'
  oEltCnrTopDiv.appendChild(oEltCnrTopTitleP)
  oEltCnrTopDiv.appendChild(oEltCnrTopWidthIcnI)
  oEltCnrTopDiv.appendChild(oEltCnrTopSearchIcnI)
  oEltCnrTopTitleP.addEventListener('click', function () {
    fCnrOntopRemove()
    fCnrSearchShow()
  })
  
  function fCnrOntopRemove() {
    oEltCnrPreviewDiv.style.display = 'none' // remove popup-cnr
    oEltCnrWidthDiv.style.display = 'none' // remove width-cnr
    if (oEltSitemenuUl) {
      oEltCnrSiteDiv.style.display = 'none' // remove site-cnr
    }
    oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked') // remove tooltip clicks
  }

  function fCnrTocShow() {
    // Remove active-class from second-child-elt of PginfTabHeaders
    document.getElementById('idPginfTabHeadersUl')
      .childNodes[1].classList.remove('clsTabActive')
    // Add active-class on second-child-element of PginfTabHeaders
    document.getElementById('idPginfTabHeadersUl')
      .childNodes[0].classList.add('clsTabActive')
    // Hide tab-content from TabCntSrch
    document.getElementById('idTabCntSrchDiv').style.display = 'none'
    // Show tab-content on TabCntToc
    document.getElementById('idTabCntTocDiv').style.display = 'block'
  }

  oEltBody.innerHTML = ''
  oEltBody.appendChild(oEltCnrTopDiv)
  oEltBody.appendChild(oEltCnrMainDiv)
  oEltBody.appendChild(oEltCnrWidthDiv)
  document.getElementById('idWidthCntP').addEventListener('click', function () {
    oEltCnrWidthDiv.style.display = 'none'
  })
  document.getElementById('idRdbWidth0').addEventListener('click', function () {
    fWidthPginf(0)
    nCfgPageinfoWidth = 0
  })
  document.getElementById('idRdbWidth10').addEventListener('click', function () {
    fWidthPginf(10)
    nCfgPageinfoWidth = 10
  })
  document.getElementById('idRdbWidth20').addEventListener('click', function () {
    fWidthPginf(20)
    nCfgPageinfoWidth = 20
  })
  document.getElementById('idRdbWidth25').addEventListener('click', function () {
    fWidthPginf(25)
    nCfgPageinfoWidth = 25
  })
  document.getElementById('idRdbWidth30').addEventListener('click', function () {
    fWidthPginf(30)
    nCfgPageinfoWidth = 30
  })
  document.getElementById('idRdbWidth40').addEventListener('click', function () {
    fWidthPginf(40)
    nCfgPageinfoWidth = 40
  })
  document.getElementById('idRdbWidth50').addEventListener('click', function () {
    fWidthPginf(50)
    nCfgPageinfoWidth = 50
  })
  document.getElementById('idRdbWidth100').addEventListener('click', function () {
    fWidthPginf(100)
    nCfgPageinfoWidth = 100
  })
  if (nCfgPageinfoWidth === 0) {
    document.getElementById('idRdbWidth0').checked = true
  } else if (nCfgPageinfoWidth === 10) {
    document.getElementById('idRdbWidth10').checked = true
  } else if (nCfgPageinfoWidth === 20) {
    document.getElementById('idRdbWidth20').checked = true
  } else if (nCfgPageinfoWidth === 25) {
    document.getElementById('idRdbWidth25').checked = true
  } else if (nCfgPageinfoWidth === 30) {
    document.getElementById('idRdbWidth30').checked = true
  } else if (nCfgPageinfoWidth === 40) {
    document.getElementById('idRdbWidth40').checked = true
  } else if (nCfgPageinfoWidth === 50) {
    document.getElementById('idRdbWidth50').checked = true
  } else if (nCfgPageinfoWidth === 100) {
    document.getElementById('idRdbWidth100').checked = true
  }

  // adds click event, other than default, on input link-elements
  fEvtLink = function (oEltIn) {
    oEltIn.addEventListener('click', function (oEvtIn) {
      oEvtIn.preventDefault()

      if (oEltIn.className.indexOf('clsClicked') > -1) {
        oEltIn.classList.remove('clsClicked')
        fCnrOntopRemove()
        location.href = oEltIn.href
      } else {
        oEltClicked.classList.remove('clsClicked',
          'clsTtpShow', 'clsTriClicked')
        oEltClicked = oEltIn
        oEltIn.classList.add('clsClicked')
        fEvtPreview(oEvtIn)
      }
    })
  }

  // site-structure menu
  if (oEltSitemenuUl) {
    oEltSitemenuUl.setAttribute('id', 'idSitemenuUl')

    // site-icn
    oEltCnrTopSiteIcnI.setAttribute('class', 'clsFa clsFaMenu clsTopIcn clsColorWhite clsFloatLeft clsTtp')
    oEltCnrTopSiteIcnI.innerHTML = '<span class="clsTtp">Site-structure</span>'
    oEltCnrTopSiteIcnI.addEventListener('click', function () {
      if (oEltCnrTopSiteIcnI.className.indexOf('clsClicked') > -1) {
        oEltCnrSiteDiv.style.display = 'block'
        oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked')
      } else {
        oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked')
        oEltClicked = oEltCnrTopSiteIcnI
        oEltCnrTopSiteIcnI.classList.add('clsClicked', 'clsTtpShow')
      }
    })
    // home-icn
    oEltCnrTopHomeIcnI.setAttribute('class', 'clsFa clsFaHome clsTopIcn clsColorWhite clsFloatLeft clsTtp')
    oEltCnrTopHomeIcnI.innerHTML = '<span class="clsTtp">Home-webpage</span>'
    oEltCnrTopHomeIcnI.addEventListener('click', function () {
      if (oEltCnrTopHomeIcnI.className.indexOf('clsClicked') > -1) {
        oEltCnrTopHomeIcnI.classList.remove('clsClicked')
        oEltClicked.classList.remove('clsTtpShow')
        location.href = sPathSite
      } else {
        oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked')
        oEltClicked = oEltCnrTopHomeIcnI
        oEltCnrTopHomeIcnI.classList.add('clsClicked', 'clsTtpShow')
      }
    })
    // site-content
    oEltCnrSiteDiv.id = 'idCnrSiteDiv'
    oEltCnrSiteDiv.innerHTML =
      '<p id="idSiteCntP1" class="clsCenter">close <i class="clsFa clsFaClose clsFloatRight clsColorWhite clsTopIcn"></i></p>' +
      '<p id="idSiteCntP2" class="clsCenter">Site-structure</p>'
    oEltCnrSiteDiv.appendChild(oEltSitemenuUl)
    oEltCnrTopDiv.insertBefore(oEltCnrTopHomeIcnI, oEltCnrTopDiv.firstChild)
    oEltCnrTopDiv.insertBefore(oEltCnrTopSiteIcnI, oEltCnrTopDiv.firstChild)
    oEltBody.appendChild(oEltCnrSiteDiv)
    document.getElementById('idSiteCntP1').addEventListener('click', function () {
      oEltCnrSiteDiv.style.display = 'none'
    })
    // oTreeUl.fTruCreate(oEltSitemenuUl);
    // on a-links, first highlight
    Array.prototype.slice.call(document.querySelectorAll('#idSitemenuUl a')).forEach(function (oEltIn) {
      fEvtLink(oEltIn)
    })
  }

  // set on page-content-cnr the original-body content
  oEltCnrMainContentDiv.id = 'idCnrMainPgcntDiv'
  oEltCnrMainContentDiv.innerHTML = sContentOriginal
  oEltCnrMainDiv.appendChild(oEltCnrMainContentDiv)

  // insert page-info-cnr
  oEltCnrMainInfoDiv.id = 'idCnrMainPginfDiv'
  // insert content on TabCntToc
  oEltTabCntTocDiv.id = 'idTabCntTocDiv'
  oEltTabCntTocDiv.setAttribute('class', 'clsTabCnt')
  oEltTabCntTocDiv.innerHTML = fTocTriCreate()
  // insert collaplse-button
  oEltTabCntTocCpsBtn.setAttribute('id', 'idBtnCollapse_All')
  oEltTabCntTocCpsBtn.setAttribute('type', 'button')
  oEltTabCntTocCpsBtn.setAttribute('value', 'collapse-all')
  oEltTabCntTocCpsBtn.setAttribute('class', 'clsBtn')
  oEltTabCntTocCpsBtn.addEventListener('click', function () {
    if (oEltTabCntTocCpsBtn.className.indexOf('clsClicked') > -1) {
      oTreeUl.fTruTocCollapseAll()
      oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked')
    } else {
      oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked')
      oEltClicked = oEltTabCntTocCpsBtn
      oEltTabCntTocCpsBtn.classList.add('clsClicked', 'clsTtpShow')
    }
  })
  oEltTabCntTocDiv.insertBefore(oEltTabCntTocCpsBtn, oEltTabCntTocDiv.firstChild)
  // insert expand-button
  oEltTabCntTocExpBtn.setAttribute('id', 'idBtnExp_All')
  oEltTabCntTocExpBtn.setAttribute('type', 'button')
  oEltTabCntTocExpBtn.setAttribute('value', 'expand-all')
  oEltTabCntTocExpBtn.setAttribute('class', 'clsBtn')
  oEltTabCntTocExpBtn.addEventListener('click', function () {
    if (oEltTabCntTocExpBtn.className.indexOf('clsClicked') > -1) {
      oTreeUl.fTruTocExpandAll()
      oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked')
    } else {
      oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked')
      oEltClicked = oEltTabCntTocExpBtn
      oEltTabCntTocExpBtn.classList.add('clsClicked', 'clsTtpShow')
    }
  })
  oEltTabCntTocDiv.insertBefore(oEltTabCntTocExpBtn, oEltTabCntTocDiv.firstChild)
  // TabCntToc: preferences
  oEltTabCntTocDiv.appendChild(document.createElement('p'))
  oEltTabCntTocPrfDiv.innerHTML = '<span class="clsColorGreen clsB">PREFERENCES</span>:<br>' +
    '<fieldset><legend><span class="clsColorGreen">fonts</span>:</legend>' +
    '<input type="radio" id="idRdbFontMono" name="nameRdbFont" checked/>Mono (default)<br>' +
    '<input type="radio" id="idRdbFontSerif" name="nameRdbFont"/>Serif<br>' +
    '<input type="radio" id="idRdbFontSSerif" name="nameRdbFont"/>Sans-serif' +
    '</fieldset>'
  oEltTabCntTocDiv.appendChild(oEltTabCntTocPrfDiv)
  // TabCntToc: end-note
  oEltTabCntTocNotP.innerHTML = '<span class="clsColorGreen clsB">notes</span>:<br>' +
    'a) clicking on CONTENT, shows its Toc position, the-links, the-address-link-icon <i class="clsFa clsFaLink clsImgLnkIcn"></i>, and removes ontop windows and highlights.<br>' +
    'b) clicking on TITLE or SEARCH-icon, shows SEARCH-tab.<br>' +
    'c) clicking on ADDRESS-LINK-ICON or on Toc, you see the-address of that text on address-bar.<br>' +
    'd) clicking <span class="clsColorBlue">a-BLUE-LINK</span> shows a-preview.<br>' +
    'e) SECOND-CLICK, usually, does the-events attached to components in-order-to work well on touch-screens.'
  oEltTabCntTocDiv.appendChild(oEltTabCntTocNotP)
  // insert TabCntToc in TabCnt
  oEltPginfTabCntDiv.id = 'idTabCntDiv'
  oEltPginfTabCntDiv.appendChild(oEltTabCntTocDiv)

  // insert tab-cnr IN page-info-cnr
  oEltCnrMainInfoDiv.appendChild(oEltPginfTabCntDiv)

  // insert TabHeaders IN page-info-cnr
  oEltPginfTabHeadersUl.id = 'idPginfTabHeadersUl'
  oEltPginfTabHeadersUl.innerHTML =
    '<li class="clsTabActive"><a href="#idTabCntTocDiv">page-Toc</a></li>' +
    '<li><a href="#idTabCntSrchDiv">site-search</a></li>'
  oEltCnrMainInfoDiv.insertBefore(oEltPginfTabHeadersUl, oEltCnrMainInfoDiv.firstChild)

  // insert page-path-elt IN page-info-cnr
  oEltPginfPathP.id = 'idPginfPathP'
  oEltPginfPathP.setAttribute('title', '© 2010-2022 Kaseluris.Nikos.1959') // nnn
  if (!document.getElementById('idMetaWebpage_path')) {
    oEltPginfPathP.innerHTML = 'Toc: ' + document.title
  } else {
    oEltPginfPathP.innerHTML = document.getElementById('idMetaWebpage_path').innerHTML
  }
  oEltCnrMainInfoDiv.insertBefore(oEltPginfPathP, oEltCnrMainInfoDiv.firstChild)

  // TabCntSrch
  oEltTabCntSrchDiv.id = 'idTabCntSrchDiv'
  oEltTabCntSrchDiv.setAttribute('class', 'clsTabCnt')
  oEltTabCntSrchLbl.innerHTML = 'name-lang:'
  oEltTabCntSrchLbl.for = 'idTabCntSrchSlt'
  oEltTabCntSrchSlt.id = 'idTabCntSrchSlt'
  //let oEltTabCntSrchOpn1 = document.createElement('option')
  //oEltTabCntSrchOpn1.value = 'lagALL'
  //oEltTabCntSrchOpn1.text = 'ALL'
  //oEltTabCntSrchSlt.add(oEltTabCntSrchOpn1)
  let oEltTabCntSrchOpn2 = document.createElement('option')
  oEltTabCntSrchOpn2.value = 'lagEngl'
  oEltTabCntSrchOpn2.text = 'English (Engl - F2)'
  oEltTabCntSrchSlt.add(oEltTabCntSrchOpn2)
  let oEltTabCntSrchOpn3 = document.createElement('option')
  oEltTabCntSrchOpn3.value = 'lagSngo'
  oEltTabCntSrchOpn3.text = 'Sinago (Sngo - Shift+F2)'
  oEltTabCntSrchSlt.add(oEltTabCntSrchOpn3)
  let oEltTabCntSrchOpn4 = document.createElement('option')
  oEltTabCntSrchOpn4.value = 'lagZhon'
  oEltTabCntSrchOpn4.text = 'Chinese (Zhon - Ctrl+F3)'
  oEltTabCntSrchSlt.add(oEltTabCntSrchOpn4)
  let oEltTabCntSrchOpn5 = document.createElement('option')
  oEltTabCntSrchOpn5.value = 'lagEspo'
  oEltTabCntSrchOpn5.text = 'Esperanto (Espo - Shift+F3)'
  oEltTabCntSrchSlt.add(oEltTabCntSrchOpn5)
  let oEltTabCntSrchOpn6 = document.createElement('option')
  oEltTabCntSrchOpn6.value = 'lagElln'
  oEltTabCntSrchOpn6.text = 'Greek (Elln - Ctrl+F2)'
  oEltTabCntSrchSlt.add(oEltTabCntSrchOpn6)
  let oEltTabCntSrchOpn7 = document.createElement('option')
  oEltTabCntSrchOpn7.value = 'lagElla'
  oEltTabCntSrchOpn7.text = 'GreekAncient (Ella)'
  oEltTabCntSrchSlt.add(oEltTabCntSrchOpn7)
  oEltTabCntSrchSlt.options[0].selected = true
  oEltTabCntSrchP.id = 'idTabCntSrchP'
  oEltTabCntSrchP.setAttribute('class', 'clsCenter')
  oEltTabCntSrchP.innerHTML = fTabCntSrchPSetText()
  oEltTabCntSrchLblChk.innerHTML =
    '<input type="checkbox" id="idTabCntSrchChk">show All, not 999 (slow)'
  oEltTabCntSrchPPnm.id = 'idTabCntSrchPPnm'
  oEltTabCntSrchPPnm.innerHTML =
    '<span id="idSrchpnm"> á </span><span id="idSrchpnm">à </span><span id="idSrchpnm">ā </span><span id="idSrchpnm">ǎ </span>' +
    '<span id="idSrchpnm">é </span><span id="idSrchpnm">è </span><span id="idSrchpnm">ē </span><span id="idSrchpnm">ě </span>' +
    '<span id="idSrchpnm">í </span><span id="idSrchpnm">ì </span><span id="idSrchpnm">ī </span><span id="idSrchpnm">ǐ </span>' +
    '<span id="idSrchpnm">ó </span><span id="idSrchpnm">ò </span><span id="idSrchpnm">ō </span><span id="idSrchpnm">ǒ </span>' +
    '<span id="idSrchpnm">ú </span><span id="idSrchpnm">ù </span><span id="idSrchpnm">ū </span><span id="idSrchpnm">ǔ </span>'
  oEltTabCntSrchLblChk.id = 'idTabCntSrchLblChk'
  oEltTabCntSrchIpt.id = 'idTabCntSrchIpt'

  oEltTabCntSrchSlt.addEventListener('change', function () {
    oEltTabCntSrchP.innerHTML = fTabCntSrchPSetText()
    oEltTabCntSrchOl.innerHTML = sTabCntSrchOl
    sIdxfile = 'lagRoot'
    fSearchSuggest()
  })
  /*
  oEltTabCntSrchIpt.addEventListener('input', function () {
    fSearchSuggest()
  })
  */
  // on enter, go to concept
  // on typing, suggest
  oEltTabCntSrchIpt.addEventListener('keyup', function (oEvtIn) {
    let
      n,
      aLi,
      // list of elements of suggestion,
      sLoc = ''
    if (oEvtIn.code === 'Enter' || oEvtIn.keyCode === 13) {
      // go to highlighted item
      aLi = oEltTabCntSrchOl.getElementsByClassName('clsClicked')
      if (aLi.length > 0) {
        // <a class="clsPreviw" href="...">concept-name</a>
        sLoc = aLi[0].href
        if (sLoc === undefined) {
          // li contains no a-element
          let
            sI = aLi[0].innerHTML,
            // char..chas : 126924 (lagEngl03si_2_0),
            sNif = sI.substring(sI.indexOf(' (lag') + 2, sI.lastIndexOf(')')),
            // lagEngl03si_2_0,
            a = sI.substring(0, sI.indexOf(' ')).split('..')
          oEltTabCntSrchIpt.value = a[0]
          fSearchSuggest(sNif)
        } else if (sLoc !== '') {
          let sTxt = aLi[0].text
          if (sTxt.indexOf('!⇒') > 0) {
            // found main-name, search for this
            oEltTabCntSrchIpt.value = sTxt.substring(sTxt.indexOf('!⇒') + 2)
            fSearchSuggest()
          } else {
            // go to name's address
            location.href = sLoc
          }
        }
      }
    } else if ((oEvtIn.code !== 'ArrowDown' && oEvtIn.code !== 'ArrowUp' &&
         oEvtIn.code !== 'ArrowLeft' && oEvtIn.code !== 'ArrowRight' &&
         oEvtIn.code !== 'PageDown' && oEvtIn.code !== 'PageUp' &&
         oEvtIn.code !== 'ShiftLeft' && oEvtIn.code !== 'ShiftRight' &&
         oEvtIn.code !== 'ControlLeft' && oEvtIn.code !== 'ControlRight') ||
       (oEvtIn.keyCode !== 40 && oEvtIn.keyCode !== 38 &&
        oEvtIn.keyCode !== 37 && oEvtIn.keyCode !== 39 &&
        oEvtIn.keyCode !== 34 && oEvtIn.keyCode !== 33 &&
        oEvtIn.keyCode !== 16 && oEvtIn.keyCode !== 17)) {
      fSearchSuggest()
    } else if (oEvtIn.code === 'ArrowDown' || oEvtIn.keyCode === 40) {
      aLi = oEltTabCntSrchOl.getElementsByTagName('li')
      for (n = 0; n < aLi.length; n++) {
        let oLi = aLi[n]
        if (oLi.innerHTML.indexOf(' (lag') > 0) {
          if (oLi.className.indexOf('clsClicked') >= 0 && n + 1 < aLi.length) {
            oLi.classList.remove('clsClicked')
            oEltClicked = aLi[n + 1]
            aLi[n + 1].classList.add('clsClicked')
            break
          }
        } else if (oLi.children[0].className.indexOf('clsClicked') >= 0 &&
            n + 1 < aLi.length) {
          oLi.children[0].classList.remove('clsClicked')
          oEltCnrPreviewDiv.style.display = 'none'
          oEltClicked = aLi[n + 1].children[0]
          aLi[n + 1].children[0].classList.add('clsClicked')
          break
        }
      }
    } else if (oEvtIn.code === 'ArrowUp' || oEvtIn.keyCode === 38) {
      aLi = oEltTabCntSrchOl.getElementsByTagName('li')
      for (n = 0; n < aLi.length; n++) {
        let oLi = aLi[n]
        if (oLi.innerHTML.indexOf(' (lag') > 0) {
          if (oLi.className.indexOf('clsClicked') >= 0 && n - 1 >= 0) {
            oLi.classList.remove('clsClicked')
            oEltClicked = aLi[n - 1]
            aLi[n - 1].classList.add('clsClicked')
            break
          }
        } else if (oLi.children[0].className.indexOf('clsClicked') > -1 &&
            n - 1 >= 0) {
          oLi.children[0].classList.remove('clsClicked')
          oEltCnrPreviewDiv.style.display = 'none'
          oEltClicked = aLi[n - 1].children[0]
          aLi[n - 1].children[0].classList.add('clsClicked')
          break
        }
      }
    }
  })

  /**
   * DOING: suggests names of senso-concepts,
   *   that BEGIN with input-search-string.
   * INPUT: nothing or string of index-file to search: lagEngl03si_2_0, lagRoot, ...
   */
  function fSearchSuggest(sIdxfilIn) {
    let
      nLag, // number of lag name in lagRoot-index-file,
      sLi,  // text of first suggestion,
      sLag = oEltTabCntSrchSlt.options[oEltTabCntSrchSlt.selectedIndex].value, // lagElln
      sIdxfileFull,
      sSearchInput = oEltTabCntSrchIpt.value,
      sSearchChar = sSearchInput.charAt(0),
      sSuggestions = ''

    sIdxfile = ''
    sIdxFrom = ''
    sIdxTo = ''

    if (sIdxfilIn) {
      fSSIdxfilDisplay(sIdxfilIn)
    }

    if (sSearchInput.length > 0) {
      //console.log('>>> start: ' + sSearchInput + ', ' + sLag)
      let bRest = true
      // display rest-chars if main-char will-not-find

      for (let n = 1; n < aaNamidxfileRoot.length; n++) {
        // display quantities, for the-lag
        if (aaNamidxfileRoot[n][0] === ';' + sLag) {
            nLag = n // index of lag in aaNamidxfileRoot [";lagEngl","English",143707],
        } else if (aaNamidxfileRoot[n][0].startsWith(sLag) && aaNamidxfileRoot[n][1] !== '') {
          // only selected language
          if (aaNamidxfileRoot[n][1].indexOf('..') < 0) {
            // root-char "Ά|Α|ά|α"
            if (aaNamidxfileRoot[n][1].indexOf(sSearchChar) >= 0) {
              // found search-char
              sIdxFrom = aaNamidxfileRoot[n][1]
              sIdxTo = ''
              if (aaNamidxfileRoot[n][0].endsWith('_0')) {
                // index-file is a-reference
                fSSIdxfileReferenceManage(aaNamidxfileRoot[n][0])
              } else {
                // index-file is a-referenceNo
                fSSIdxfilDisplay(aaNamidxfileRoot[n][0])
              }
              // found main-char 
              bRest = false
              break
            }
          } else {
            // root-char A..C a-sequence of chars
            let a = aaNamidxfileRoot[n][1].split('..')
            sIdxFrom = a[0]
            sIdxTo = a[1]
            // some Chinese are codepoints, then compare numbers
            let
              nIdxFrom = 0,
              nIdxTo = 0,
              nSearchChar = sSearchChar.codePointAt()
            //console.log(sSearchChar+', '+nSearchChar)
            // if srch-char is a-supplement with surrogates (high 55296–56319), find it
            if (nSearchChar >= 55296 && nSearchChar <= 56319) {
              let sSupplement = String.fromCodePoint(sSearchInput.charAt(0).charCodeAt(0),
                                                     sSearchInput.charAt(1).charCodeAt(0))
              nSearchChar = sSupplement.codePointAt()
            }
            if (!Number.isInteger(Number(sIdxFrom))) {
              // it is char
              nIdxFrom = sIdxFrom.codePointAt()
            } else {
              nIdxFrom = Number(sIdxFrom)
            }
            if (!Number.isInteger(Number(sIdxTo))) {
              // it is char
              nIdxTo = sIdxTo.codePointAt()
            } else {
              nIdxTo = Number(sIdxTo)
            }
            //console.log(sIdxFrom+', '+sIdxTo)
            if (nSearchChar >= nIdxFrom && nSearchChar < nIdxTo) {
              if (aaNamidxfileRoot[n][0].endsWith('_0')) {
                // index-file is a-reference
                fSSIdxfileReferenceManage(aaNamidxfileRoot[n][0])
              } else {
                // index-file is a-referenceNo
                fSSIdxfilDisplay(aaNamidxfileRoot[n][0])
              }
              // found main-char 
              bRest = false
              break
            }
          }
        }
      }
      if (bRest) {
        sIdxFrom = 'charRest'
        sIdxTo = ''          
        if (aaNamidxfileRoot[nLag + 1][0].endsWith('_0')) {
          // index-file is a-reference
          fSSIdxfileReferenceManage(aaNamidxfileRoot[nLag + 1][0])
        } else {
          // index-file is a-referenceNo
          fSSIdxfilDisplay(aaNamidxfileRoot[nLag + 1][0])
        }
      }
    } else {
      // sSearchInput.length < 0
      // no input value, display this:
      oEltTabCntSrchOl.innerHTML = sTabCntSrchOl
      oEltTabCntSrchP.innerHTML = fTabCntSrchPSetText()
      sIdxfile = 'lagRoot'
    }

    /**
     * DOING: decide what to do with a-reference-index-file
     * INPUT: lagEngl03si_0, lagEngl03si_2_0
     */
    function fSSIdxfileReferenceManage(sIdxfileReferenceIn) {
      //console.log('fRefManage'+sIdxfileReferenceIn)

      if (aSuggestions.length === 1 || aSuggestions[0][0] !== ';' + sIdxfileReferenceIn) {
        // read it
        sIdxfile = sIdxfileReferenceIn
        sIdxfileFull = fFindNamidxfileFull(sIdxfileReferenceIn)
        sSuggestions = ''
        fetch(sIdxfileFull)
        .then(response => response.json())
        .then(data => {
          aSuggestions = data
          if (aSuggestions[0][1].indexOf('..') > 0) {
            let a = aSuggestions[0][1].split('..')
            sIdxFrom = a[0]
            sIdxTo = a[1]
          } else {
            sIdxFrom = aSuggestions[0][1]
            sIdxTo = ''
          }

          if (sIdxFrom.toUpperCase() === sSearchInput.toUpperCase() ||
              (sIdxFrom === 'charRest' && sSearchInput.length === 1)) {
            // sIdxFrom.indexOf(sSearchInput) >= 0
            fSSIdxfileReferenceDisplay(sIdxfileReferenceIn)
          } else {
            fSSFindIdxinreference()
          }
        })
      } else if (aSuggestions[0][0] === ';' + sIdxfileReferenceIn) {
        if (aSuggestions[0][1].split('..')[0].toUpperCase() === sSearchInput.toUpperCase()) {
          fSSIdxfileReferenceDisplay(sIdxfileReferenceIn)
        } else {
          fSSFindIdxinreference()
        }
      }

      function fSSFindIdxinreference() {
        // we have the-suggestions, find the-index-file of input-search
        for (let n = 2; n < aSuggestions.length; n++) {
          // ["lagEngl03si_2_0","char..chas",126924],
          // IF sSearchInput < index, THEN previous is our index-file
          if (sSearchInput < aSuggestions[n][1].split('..')[0]) {
            sIdxfile = aSuggestions[n - 1][0]
            if (sIdxfile.endsWith('_0')) {
              fSSIdxfileReferenceManage(sIdxfile)
            } else {
              // found index-file, display it
              fSSIdxfilDisplay(sIdxfile)
            }
            break
          } else if (n + 1 === aSuggestions.length) {
            sIdxfile = aSuggestions[n][0]
            if (sIdxfile.endsWith('_0')) {
              fSSIdxfileReferenceManage(sIdxfile)
            } else {
              // found index-file, display it
              fSSIdxfilDisplay(sIdxfile)
            }
            break
          }
        }
      }
    }

    /**
     * DOING: display names of a-reference-index-file,
     *   make them clickable,
     *   highligts first.
     * INPUT: sIdxfileReferenceIn: lagEngl03si_0, ..
     */
    function fSSIdxfileReferenceDisplay(sIdxfileReferenceIn) {
      sIdxfile = sIdxfileReferenceIn
      if (aSuggestions[0][0] === ';' + sIdxfileReferenceIn) {
        fSSIdxfilRefDisplayRead()
      } else {
        sIdxfileFull = fFindNamidxfileFull(sIdxfileReferenceIn)
        sSuggestions = ''
        fetch(sIdxfileFull)
        .then(response => response.json())
        .then(data => {
          aSuggestions = data
          if (aSuggestions[0][1].indexOf('..') > 0) {
            let a = aSuggestions[0][1].split('..')
            sIdxFrom = a[0]
            sIdxTo = a[1]
          } else {
            sIdxFrom = aSuggestions[0][1]
            sIdxTo = ''
          }
          sSearchInput = fSSEscapeRs(sSearchInput)
          fSSIdxfilRefDisplayRead()
        })
      }

      function fSSIdxfilRefDisplayRead() {
        for (let i = 1; i < aSuggestions.length; i++) {
          sSuggestions = sSuggestions +
            '<li>' + aSuggestions[i][1] + ' : ' + aSuggestions[i][2] +
            '  (' + aSuggestions[i][0] + ')'
        }
        if (sIdxTo) {
          oEltTabCntSrchP.innerHTML = aSuggestions[0][2].toLocaleString() +
            ' ' + sIdxFrom + '..' + sIdxTo +
            ' // ' + fTabCntSrchPSetText()
        } else {
          oEltTabCntSrchP.innerHTML = aSuggestions[0][2].toLocaleString() +
            ' ' + sIdxFrom + ' // ' + fTabCntSrchPSetText()
        }
        oEltTabCntSrchOl.innerHTML = sSuggestions
        Array.prototype.slice.call(document.querySelectorAll('#idTabCntSrchOl li')).forEach(function (oEltIn) {
          oEltIn.style.cursor = 'pointer'
          oEltIn.addEventListener('click', function () {
            let
              sIn = oEltIn.innerHTML,
              // char..chas : 126924 (lagEngl03si_2_0),
              sNif = sIn.substring(sIn.indexOf('(') + 1, sIn.indexOf(')')),
              // lagEngl03si_2_0,
              sIx = sIn.substring(0, sIn.indexOf(' ')),
              // char..chas,
              a = sIx.split('..')
            oEltTabCntSrchIpt.value = a[0]
            fSSIdxfilDisplay(sNif)
          })
        })
        if (aSuggestions.length > 0) {
          let oLi = oEltTabCntSrchOl.getElementsByTagName('li')[0]
          oLi.classList.add('clsClicked')
          oEltClicked = oLi
        }
      }
    }

    /**
     * DOING: displays names of an-index-file
     * INPUT: sIdxfilIn: lagElln01alfa, lagEngl03si_0
     */
    function fSSIdxfilDisplay(sIdxfilIn) {
      sIdxfile = sIdxfilIn

      if (sIdxfilIn.endsWith('_0')) {
        // case: reference-index-file
        fSSIdxfileReferenceDisplay(sIdxfilIn)
      } else {
        //console.log(sIdxfilIn)
        // case: referenceNo-index-file
        // IF sIdxfilIn is different from last-read, get it

        if (!aSuggestions || (aSuggestions[0][0] !== ';' + sIdxfilIn)) {
          sIdxfileFull = fFindNamidxfileFull(sIdxfilIn)
          sSuggestions = ''
          fetch(sIdxfileFull)
          .then(response => response.json())
          .then(data => {
            aSuggestions = data
            //   [";lagEngl02bi",";B..C",2276,"2021-11-03"],
            if (aSuggestions[0][1].indexOf('..') > 0) {
              let a = aSuggestions[0][1].split('..')
              sIdxFrom = a[0]
              sIdxTo = a[1]
            } else {
              sIdxFrom = aSuggestions[0][1]
              sIdxTo = ''
            }
            fSSIdxfilDisplayRead()
          })
          .catch(error => console.warn(error))
        } else if (aSuggestions[0][0] === ';' + sIdxfilIn) {
          // we have-read the-index-file, display it
          fSSIdxfilDisplayRead()
        }
      } // referenceNo-index-file

      /**
       * DOING: reads from aSuggestions the-names that match the-search-name,
       *   formats them as preview-links,
       *   adds the-eventlistener 'link-preview' on them and
       *   highlights the-first.
       */
      function fSSIdxfilDisplayRead() {
        let n, i
        if (aSuggestions[0][1].indexOf('..') > 0) {
          let a = aSuggestions[0][1].split('..')
          sIdxFrom = a[0]
          sIdxTo = a[1]
        } else {
          sIdxFrom = aSuggestions[0][1]
          if (!sIdxFrom) sIdxFrom = 'charREST'
          sIdxTo = ''
        }
        if (sSearchInput.toUpperCase() === sIdxFrom.toUpperCase()) {
          // if sSearchInput === sIdxFrom, display all
          n = 0
          for (i = 1; i < aSuggestions.length; i++) {
            n = n + 1
            sSuggestions = sSuggestions +
              '<li><a class="clsPreview" href="' + sPathSite + 'dirMcsh/' +
              aSuggestions[i][1] + '">' +
              aSuggestions[i][0]
            if (!document.getElementById('idTabCntSrchChk').checked) {
              if (n > 998) {
                sSuggestions = sSuggestions + '<li>...'
                break
              }
            }
          }
          if (sIdxTo) {
            oEltTabCntSrchP.innerHTML =
              aSuggestions[0][2].toLocaleString() +
              ' ' + sIdxFrom + '..' + sIdxTo +
              ' // ' + fTabCntSrchPSetText()
          } else {
            oEltTabCntSrchP.innerHTML =
              aSuggestions[0][2].toLocaleString() +
              ' ' + sIdxFrom +
              ' // ' + fTabCntSrchPSetText()

          }
          oEltTabCntSrchOl.innerHTML = sSuggestions
          fSSEvtPreview()
          if (aSuggestions.length > 0) {
            sLi = oEltTabCntSrchOl.getElementsByTagName('li')[0]
            sLi.children[0].classList.add('clsClicked')
            oEltClicked = sLi.children[0]
          }
        } else if (sSearchInput.endsWith(' ')) {
          // display exactly sSearchInput
          n = 0
          for (i = 1; i < aSuggestions.length; i++) {
            // name
            // name'xxx
            // name.xxx
            // name!...
            let
              sSgn = aSuggestions[i][0],
              sInput = sSearchInput.substring(0, sSearchInput.length-1) 
            if (sInput === sSgn ||
                new RegExp("^"+sInput+"'.*").test(sSgn) ||
                new RegExp("^"+sInput+"\\..*").test(sSgn) ||
                new RegExp("^"+sInput+"!.*").test(sSgn) ) {
              n = n + 1
              sSuggestions = sSuggestions +
                '<li><a class="clsPreview" href="' + sPathSite + 'dirMcsh/' +
                aSuggestions[i][1] + '">' +
                aSuggestions[i][0]
            }
          }
          if (sIdxTo) {
            oEltTabCntSrchP.innerHTML = n.toLocaleString() +
              ' // ' + aSuggestions[0][2].toLocaleString() +
              ' ' + sIdxFrom + '..' + sIdxTo +
              ' // ' + fTabCntSrchPSetText()
          } else {
            oEltTabCntSrchP.innerHTML = n.toLocaleString() +
              ' // ' + aSuggestions[0][2].toLocaleString() +
              ' ' + sIdxFrom +
              ' // ' + fTabCntSrchPSetText()
          }
          oEltTabCntSrchOl.innerHTML = sSuggestions
          fSSEvtPreview()
          if (sSuggestions.length > 0) {
            sLi = oEltTabCntSrchOl.getElementsByTagName('li')[0]
            sLi.children[0].classList.add('clsClicked')
            oEltClicked = sLi.children[0]
          }
        } else {
          // else display part
          n = 0
          //console.log(new RegExp('^u\\+','i').test('U+0011')) // true
          sSearchInput = fSSEscapeRs(sSearchInput)
          for (i = 1; i < aSuggestions.length; i++) {
            if (new RegExp('^' + sSearchInput, 'i').test(aSuggestions[i][0])) {
              // IF n > 999 stop ?
              n = n + 1
              sSuggestions = sSuggestions +
                '<li><a class="clsPreview" href="' + sPathSite + 'dirMcsh/' +
                aSuggestions[i][1] + '">' +
                aSuggestions[i][0]
              if (!document.getElementById('idTabCntSrchChk').checked) {
                if (n > 998) {
                  sSuggestions = sSuggestions + '<li>...'
                  break
                }
              }
            }
          }
          if (!document.getElementById('idTabCntSrchChk').checked) {
            if (n > 998) {
              if (sIdxTo) {
                oEltTabCntSrchP.innerHTML = n.toLocaleString() +
                  'plus // ' + aSuggestions[0][2].toLocaleString() +
                  ' ' + sIdxFrom + '..' + sIdxTo +
                  ' // ' + fTabCntSrchPSetText()
              } else {
                oEltTabCntSrchP.innerHTML = n.toLocaleString() +
                  'plus // ' + aSuggestions[0][2].toLocaleString() +
                  ' ' + sIdxFrom +
                  ' // ' + fTabCntSrchPSetText()
              }
            } else {
              if (sIdxTo) {
                oEltTabCntSrchP.innerHTML = n.toLocaleString() +
                  ' // ' + aSuggestions[0][2].toLocaleString() +
                  ' ' + sIdxFrom + '..' + sIdxTo +
                  ' // ' + fTabCntSrchPSetText()
              } else {
                oEltTabCntSrchP.innerHTML = n.toLocaleString() +
                  ' // ' + aSuggestions[0][2].toLocaleString() +
                  ' ' + sIdxFrom +
                  ' // ' + fTabCntSrchPSetText()
              }
            }
          } else {
            if (sIdxTo) {
              oEltTabCntSrchP.innerHTML = n.toLocaleString() +
                ' // ' + aSuggestions[0][2].toLocaleString() +
                ' ' + sIdxFrom + '..' + sIdxTo +
                ' // ' + fTabCntSrchPSetText()
            } else {
              oEltTabCntSrchP.innerHTML = n.toLocaleString() +
                ' // ' + aSuggestions[0][2].toLocaleString() +
                ' ' + sIdxFrom +
                ' // ' + fTabCntSrchPSetText()
            }
          }
          oEltTabCntSrchOl.innerHTML = sSuggestions
          fSSEvtPreview()
          if (sSuggestions.length > 0) {
            sLi = oEltTabCntSrchOl.getElementsByTagName('li')[0]
            sLi.children[0].classList.add('clsClicked')
            oEltClicked = sLi.children[0]
          }
        }
      }
    }

    /**
     * DOING: adds preview-event on links in search-sugestions and
     *   adds its text on search-input
     */
    function fSSEvtPreview() {
      // clicking on TabCntSrchOl-links, first highlight
      Array.prototype.slice.call(document.querySelectorAll('#idTabCntSrchOl a')).forEach(function (oEltIn) {
        let sTxt = oEltIn.innerHTML
        if (sTxt.indexOf('!⇒') > 0) {
          // found main-name
          oEltIn.addEventListener('click', function (oEvtIn) {
            // don't link, set main-name as search-name, search for this.
            oEvtIn.preventDefault()
            oEltTabCntSrchIpt.value = sTxt.substring(sTxt.indexOf('!⇒') + 2)
            fSearchSuggest()
          })
        } else {
          fEvtLink(oEltIn)
          oEltIn.addEventListener('click', function () {
            oEltTabCntSrchIpt.value = sTxt
          })
        }
      })
    }

    /**
     * INPUT: a-search-name string
     * OUTPUT: the same string escaped (for '+' '.' '|' '(' '*')
     *   to use it as a-regexp without special chars.
     */
    function fSSEscapeRs(sIn) {
      if (sIn.indexOf('+') !== -1) {
        sIn = sIn.split('+').join('\\+')
      }
      if (sIn.indexOf('.') !== -1) {
        sIn = sIn.split('.').join('\\.')
      }
      if (sIn.indexOf('|') !== -1) {
        sIn = sIn.split('|').join('\\|')
      }
      if (sIn.indexOf('(') !== -1) {
        sIn = sIn.split('(').join('\\(')
      }
      if (sIn.indexOf('*') !== -1) {
        sIn = sIn.split('*').join('\\*')
      }
      return sIn
    }
    document.getElementById('idCnrMainPginfDiv').scrollTop = 0 //nnn
  }

  oEltTabCntSrchOl.addEventListener('keyup', function (oEvtIn) {
    let aLi, n, oLi
    if (oEvtIn.code === 'ArrowDown' || oEvtIn.keyCode === 40) {
      aLi = oEltTabCntSrchOl.getElementsByTagName('li')
      for (n = 0; n < aLi.length; n++) {
        oLi = aLi[n]
        if (oLi.children[0].className.indexOf('clsClicked') > -1 &&
            n + 1 < aLi.length) {
          oLi.children[0].classList.remove('clsClicked')
          oEltCnrPreviewDiv.style.display = 'none'
          oEltClicked = aLi[n + 1].children[0]
          aLi[n + 1].children[0].classList.add('clsClicked')
          break
        }
      }
    } else if (oEvtIn.code === 'ArrowUp' || oEvtIn.keyCode === 38) {
      aLi = oEltTabCntSrchOl.getElementsByTagName('li')
      for (n = 0; n < aLi.length; n++) {
        oLi = aLi[n]
        if (oLi.children[0].className.indexOf('clsClicked') > -1 &&
            n - 1 >= 0) {
          oLi.children[0].classList.remove('clsClicked')
          oEltCnrPreviewDiv.style.display = 'none'
          oEltClicked = aLi[n - 1].children[0]
          aLi[n - 1].children[0].classList.add('clsClicked')
          break
        }
      }
    }
  })
  oEltTabCntSrchOl.id = 'idTabCntSrchOl'
  oEltTabCntSrchOl.innerHTML = sTabCntSrchOl
  oEltTabCntSrchDiv.appendChild(oEltTabCntSrchLbl)
  oEltTabCntSrchDiv.appendChild(oEltTabCntSrchSlt)
  oEltTabCntSrchDiv.appendChild(oEltTabCntSrchP)
  oEltTabCntSrchDiv.appendChild(oEltTabCntSrchLblChk)
  oEltTabCntSrchDiv.appendChild(oEltTabCntSrchPPnm)
  oEltTabCntSrchDiv.appendChild(oEltTabCntSrchIpt)
  oEltTabCntSrchDiv.appendChild(oEltTabCntSrchOl)
  oEltPginfTabCntDiv.appendChild(oEltTabCntSrchDiv)

  /**
   * DOING: returns the-text with the-number of names found in search-tab
   */
  function fTabCntSrchPSetText() {
    let
      nLag,
      sLag = oEltTabCntSrchSlt.options[oEltTabCntSrchSlt.selectedIndex].value
    if (sLag === 'lagALL') {
      return aaNamidxfileRoot[0][2].toLocaleString() + ' total NAMES'
    } else {
      for (let n = 1; n < aaNamidxfileRoot.length; n++) {
        if (aaNamidxfileRoot[n][0] === ';'+sLag) {
          nLag = n
          break
        }
      }
      return aaNamidxfileRoot[nLag][2].toLocaleString() + ' ' + aaNamidxfileRoot[nLag][1] +
        ' // ' + aaNamidxfileRoot[0][2].toLocaleString() + ' total NAMES'
    }
  }

  // clicking on content-link first go to its location,
  // this way the backbutton goes where we clicked
  Array.prototype.slice.call(document.querySelectorAll('#idCnrMainPgcntDiv a')).forEach(function (oEltIn) {
    oEltIn.addEventListener('click', function (oEvtIn) {
      let
        oEltScn = oEltIn,
        sIdScn

      oEvtIn.preventDefault()

      function fGo_where_clicked() {
        // first, go to where you clicked
        while (!oEltScn.tagName.match(/^SECTION/i)) {
          sIdScn = oEltScn.id
          if (sIdScn) {
            break
          } else {
            oEltScn = oEltScn.parentNode
          }
        }
        sIdScn = '#' + sIdScn
        if (location.hash !== sIdScn) {
          location.href = sIdScn
        }
      }

      if (oEltIn.className.indexOf('clsClicked') > -1) {
        oEltIn.classList.remove('clsClicked')
        fGo_where_clicked()
        location.href = oEltIn.href
      } else {
        oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked')
        oEltClicked = oEltIn
        oEltIn.classList.add('clsClicked')
        if (oEltIn.className.indexOf('clsPreview') > -1) {
          fEvtClickContent(oEvtIn)
          fEvtPreview(oEvtIn, 'sContent')
        }
      }

    })
  })

  // insert MainPginf-cnr in Main-cnr */
  oEltCnrMainDiv.insertBefore(oEltCnrMainInfoDiv, oEltCnrMainDiv.firstChild)

  // Sets width of MainPginf-cnr
  function fWidthPginf(nPercentIn) {
    let
      nWidthPgcnt,
      nWidthPginf

    nWidthPginf = parseInt(window.outerWidth * (nPercentIn / 100))
    nWidthPgcnt = oEltCnrMainDiv.offsetWidth - nWidthPginf
    oEltCnrMainInfoDiv.style.width = nWidthPginf + 'px'
    oEltCnrMainContentDiv.style.width = nWidthPgcnt + 'px'
    oEltCnrMainContentDiv.style.left = nWidthPginf + 'px'
  }
  fWidthPginf(nCfgPageinfoWidth)
  // needed for proper zoom
  window.addEventListener('resize', function () {
    fWidthPginf(nCfgPageinfoWidth)
  })

  // on MainPgcnt-cnr get-id, highlight toc, highlight links, remove popup, remove clicked link 
  fEvtClickContent = function (oEvtIn) {
    let sIdScn = '',
      oEltScn = oEvtIn.target

    if (oEvtIn.target.nodeName !== 'A') {
      oEltClicked.classList.remove('clsClicked', 'clsTtpShow')
    }

    oEltCnrPreviewDiv.style.display = 'none' // remove popup
    if (oEltSitemenuUl) {
      oEltCnrSiteDiv.style.display = 'none' // remove site-content
    }
    oEltCnrWidthDiv.style.display = 'none' // remove width-content
    fCnrTocShow()

    /* find id of enclosing SECTION, this is-stored on toc */
    sIdScn = '#' + oEltScn.id
    while (oEltScn && !oEltScn.tagName.match(/^SECTION/i)) {
      oEltScn = oEltScn.parentNode
      if (!oEltScn.tagName) {
        break
      } else if (oEltScn.tagName.match(/^HEADER/i) ||
              oEltScn.tagName.match(/^FOOTER/i)) {
        break
      }
    }
    if (oEltScn.tagName) {
      if (oEltScn.tagName.match(/^HEADER/i)) {
        sIdScn = '#idHeader'
      } else if (oEltScn.tagName.match(/^FOOTER/i)) {
        sIdScn = '#idFooter'
      } else {
        sIdScn = '#' + oEltScn.id
      }
    }

    /* on toc highlight the-found-id */
    Array.prototype.slice.call(document.querySelectorAll('#idTocTri a')).forEach(function (oEltAIn) {
      if (oEltAIn.getAttribute('href') === sIdScn) {
        oTreeUl.fTruExpandParent(oEltAIn)
        fTocTriHighlightNode(oEltCnrMainInfoDiv, oEltAIn)
        if (oEltAIn.scrollIntoViewIfNeeded) {
          oEltAIn.scrollIntoViewIfNeeded(true)
        } else {
          oEltAIn.scrollIntoView(false)
        }
        document.getElementById('idCnrMainPginfDiv').scrollLeft = 0
      }
    })

    // on found-id on a-elt add clsClickCnt
    sQrslrAClkLast = sQrslrAClk
    let oElt = oEvtIn.target
    sQrslrAClk = '#' + oElt.id + ' a'
    while (sQrslrAClk === '# a') {
      oElt = oElt.parentNode
      sQrslrAClk = '#' + oElt.id + ' a'
    }
    if (sQrslrAClkLast !== sQrslrAClk) {
      Array.prototype.slice.call(document.querySelectorAll(sQrslrAClkLast)).forEach(function (oEltAIn) {
        oEltAIn.classList.remove('clsClickCnt')
      })
      Array.prototype.slice.call(document.querySelectorAll(sQrslrAClk)).forEach(function (oEltAIn) {
        oEltAIn.classList.add('clsClickCnt')
      })
    }
  }
  // on MainPgcnt-cnr get id on mouseover and highlight toc
  fEvtMouseoverContent = function (oEvtIn) {
    let sIdScn = '',
      oEltScn = oEvtIn.target

    // Find id of enclosing SECTION, this is-stored on toc
    sIdScn = '#' + oEltScn.id
    while (oEltScn && !oEltScn.tagName.match(/^SECTION/i)) {
      oEltScn = oEltScn.parentNode
      if (!oEltScn.tagName) {
        break
      } else if (oEltScn.tagName.match(/^HEADER/i) ||
                 oEltScn.tagName.match(/^FOOTER/i)) {
        break
      }
    }
    if (oEltScn.tagName) {
      if (oEltScn.tagName.match(/^HEADER/i)) {
        sIdScn = '#idHeader'
      } else if (oEltScn.tagName.match(/^FOOTER/i)) {
        sIdScn = '#idFooter'
      } else {
        sIdScn = '#' + oEltScn.id
      }
    }

    // on toc highlight the-found-id
    Array.prototype.slice.call(document.querySelectorAll('#idTocTri a')).forEach(function (oEltAIn) {
      if (oEltAIn.getAttribute('href') === sIdScn) {
        oTreeUl.fTruExpandParent(oEltAIn)
        fTocTriHighlightNode(oEltCnrMainInfoDiv, oEltAIn)
        if (oEltAIn.scrollIntoViewIfNeeded) {
          oEltAIn.scrollIntoViewIfNeeded(true)
        } else {
          oEltAIn.scrollIntoView(false)
        }
        document.getElementById('idCnrMainPginfDiv').scrollLeft = 0
      }
    })
  }
  // events click, mouseover on elements in page-content-container
  Array.prototype.slice.call(document.querySelectorAll('#idCnrMainPgcntDiv *[id]')).forEach(function (oEltIn) {
    oEltIn.addEventListener('click', fEvtClickContent)
    oEltIn.addEventListener('mouseover', fEvtMouseoverContent)
  })
  Array.prototype.slice.call(document.querySelectorAll('#idCnrMainPginfDiv *[id]')).forEach(function (oEltIn) {
    oEltIn.addEventListener('click', function () {
      oEltCnrPreviewDiv.style.display = 'none' // remove popup
      if (oEltSitemenuUl) {
        oEltCnrSiteDiv.style.display = 'none' // remove site-content
      }
      oEltCnrWidthDiv.style.display = 'none' // remove width-content
    })
  })

  // event click on TAB-Headers
  Array.prototype.slice.call(document.querySelectorAll('ul#idPginfTabHeadersUl li')).forEach(function (oEltIn) {
    oEltIn.addEventListener('click', function (oEvtIn) {
      oEvtIn.preventDefault()
      // Remove any 'active' class
      document.querySelector('.clsTabActive').classList.remove('clsTabActive')
      // Add 'active' class to selected tab
      oEltIn.classList.add('clsTabActive')
      // Hide all tab content
      Array.prototype.slice.call(document.getElementsByClassName('clsTabCnt')).forEach(function (oEltIn) {
        oEltIn.style.display = 'none'
      })
      // Show content of active tab
      sIdTabActive = document.querySelector('.clsTabActive a').getAttribute('href').substring(1)
      document.getElementById(sIdTabActive).style.display = 'block'
      if (sIdTabActive === 'idTabCntSrchDiv') {
        // on TabCntSrch focus input-element
        oEltTabCntSrchIpt.focus()
      }
      // return false;
    })
  })
  document.getElementById('idTabCntSrchDiv').style.display = 'none'

  // insert popup-container
  oEltCnrPreviewDiv.id = 'idCnrPreviewDiv'
  oEltBody.appendChild(oEltCnrPreviewDiv)

  // on clsPreview-links add this event-listener
  fEvtPreview = function (oEvtIn, sContent) {
    let sLoc, sId1, sId2,
      nPy, nPx, nWh, nWw,
      oDoc
    oEvtIn.preventDefault()
    oEvtIn.stopPropagation()
    nPx = oEvtIn.pageX
    nPy = oEvtIn.pageY
    nWh = window.innerHeight
    nWw = window.innerWidth
    if (oEvtIn.target.nodeName === 'IMG') {
      // links on img-elements
      sId1 = oEvtIn.target.parentNode.href
    } else {
      sId1 = oEvtIn.target.href
    }
    if (sId1.indexOf('#') > 0) {
      sId2 = sId1.substring(sId1.indexOf('#') + 1)
      sId1 = sId1.substring(0, sId1.indexOf('#'))
    }
    sLoc = location.href
    if (sLoc.indexOf('#') > 0) {
      sLoc = sLoc.substring(0, sLoc.indexOf('#'))
    }
    // internal-link
    if (sLoc === sId1) {
      oEltCnrPreviewDiv.innerHTML = '<section>' + document.getElementById(sId2).innerHTML + '</section>'
    } else {
      oEltCnrPreviewDiv.innerHTML = ''
      fetch(sId1)
      .then(response => response.text())
      .then(data => {
        if (sId2) {
          // IF #fragment url, display only this element.
          oDoc = (new DOMParser()).parseFromString(data, 'text/html')
          oEltCnrPreviewDiv.innerHTML = '<section>' + oDoc.getElementById(sId2).innerHTML + '</section>'
        } else {
          // IF link to a picture, display it, not its code.
          if (sId1.match(/(png|jpg|gif)$/)) {
            let oImg = new Image()
            let nIW, nIH, nPW, nPH
            nPW = nWw / 2.2
            nPH = nWh * 0.4
            oImg.src = sId1
            oImg.addEventListener('load', function () {
              nIW = oImg.width
              nIH = oImg.height
              if (nIH > nPH) {
                nIW = (nIW * nPH) / nIH
                nIH = nPH
              }
              oEltCnrPreviewDiv.innerHTML = '<p class="clsCenter"><img src="' + sId1 +
                '" width="' + nIW +
                '" height="' + nIH + '" /></p>'
            })
          } else {
            document.getElementById('idCnrPreviewDiv').innerHTML = data
          }
        }
      })
    }

    if (sContent) {
      oEltCnrPreviewDiv.style.top = (nWh / 2) - (nWh * 0.44 / 2) + 'px' // the height of popup is 44% of window
      if (nPx < nWw / 2) {
        oEltCnrPreviewDiv.style.left = (nWw / 2) + 9 + 'px'
      } else {
        oEltCnrPreviewDiv.style.left = 26 + 'px'
        oEltCnrPreviewDiv.style.width = (nWw / 2) + 'px'
      }
    } else {
      oEltCnrPreviewDiv.style.top = (nWh / 2) - (nWh * 0.74 / 2) + 'px' // the height of popup is 74% of window
      oEltCnrPreviewDiv.style.left = (nWw / 3) + 'px'
      oEltCnrPreviewDiv.style.width = 'auto'
    }
    oEltCnrPreviewDiv.style.display = 'block'
  }

  // change font
  document.getElementById('idRdbFontMono').addEventListener('click', function () {
    oEltBody.style.fontFamily = 'fntUbuntuMonoRgr, "Courier New", "Lucida Console"'
  })
  document.getElementById('idRdbFontSerif').addEventListener('click', function () {
    oEltBody.style.fontFamily = '"Times New Roman", Georgia'
  })
  document.getElementById('idRdbFontSSerif').addEventListener('click', function () {
    oEltBody.style.fontFamily = 'Arial, Verdana'
  })

  // event on clicking a link in toc
  Array.prototype.slice.call(document.querySelectorAll('#idTocTri li > a')).forEach(function (oEltIn) {
    oEltIn.addEventListener('click', function (oEvtIn) {
      oEvtIn.preventDefault()
      oEltClicked.classList.remove('clsTtpShow')
      if (oEltIn.className.indexOf('clsPreview') > -1) {
        if (oEltIn.className.indexOf('clsClicked') > -1) {
          oEltIn.classList.remove('clsClicked')
          oEltCnrPreviewDiv.style.display = 'none'
          location.href = '#' + oEvtIn.target.href.split('#')[1]
          fTocTriHighlightNode(oEltCnrMainInfoDiv, oEltIn)
        } else {
          oEltClicked.classList.remove('clsClicked')
          oEltClicked = oEltIn
          oEltIn.classList.add('clsClicked')
          fEvtPreview(oEvtIn)
        }
      } else {
        oEltCnrPreviewDiv.style.display = 'none'
        location.href = '#' + oEvtIn.target.href.split('#')[1]
        fTocTriHighlightNode(oEltCnrMainInfoDiv, oEltIn)
      }
    })
  })

  // event on clicking phonemes
  Array.prototype.slice.call(document.querySelectorAll('#idSrchpnm')).forEach(function (oEltIn) {
    let sPnm = oEltIn.innerHTML.trim()
    oEltIn.style.cursor = 'pointer'
    oEltIn.addEventListener('click', function (oEvtIn) {
      oEvtIn.preventDefault()
      let sSearchInput = oEltTabCntSrchIpt.value + sPnm
      oEltTabCntSrchIpt.value = sSearchInput
      fSearchSuggest()
    })
  })

  // clicking on PginfPathP-links and TabCntSrchOl-links, first highlight
  Array.prototype.slice.call(document.querySelectorAll('#idPginfPathP a, #idTabCntSrchOl a')).forEach(function (oEltIn) {
    fEvtLink(oEltIn)
  })

  window.onhashchange = function () {
    location.href = location.hash
  }

  // focus on right-div, Div can get the focus if it has tabindex attribute... on chrome
  document.getElementById('idCnrMainPgcntDiv').setAttribute('tabindex', -1)
  document.getElementById('idCnrMainPgcntDiv').focus()
}

/**
 * created: {2013-07-17}
 * Returns a string html-ul-element that holds
 * the-toc-tree with the-headings of the-page.
 * <ul id="idTocTri" class="clsTreeUl">
 *   <li><a class="clsPreview" href="#idHeader">SynAgonism</a>
 *     <ul>
 *       <li><a href="#heading">heading</a><li>
 *       <li><a href="#heading">heading</a><li>
 *     </ul>
 *   <li>
 * </ul>
 */
let fTocTriCreate = function () {
  let
    aElm = document.body.getElementsByTagName('*'),
    aHdng = [],
    nLvlThis, nLvlNext, nLvlPrev = 0, nLvlToc = 0, n, nJ,
    rHdng = /h\d/i,
    sUl = '', sHcnt, sHid, sHlvl,
    oElt

  for (n = 0; n < aElm.length; n += 1) {
    oElt = aElm[n]
    if (rHdng.test(oElt.nodeName)) {
      aHdng.push(oElt)
    }
    // and and the 'footer' element
    if (oElt.nodeName.match(/footer/i)) {
      aHdng.push(oElt)
    }
  }
  aElm = []

  // the first heading is the title of doc
  sHcnt = aHdng[0].innerHTML
  sHcnt = sHcnt.replace(/\n {4}<a class="clsHide" href=[^<]+<\/a>/, '')
  sHcnt = sHcnt.replace(/<br\/*>/g, ' ')
  sUl = '<ul id="idTocTri" class="clsTreeUl"><li><a class="clsPreview" href="#idHeader">' + sHcnt + '</a>'

  for (n = 1; n < aHdng.length; n += 1) {
    oElt = aHdng[n]
    // special footer case;
    if (oElt.nodeName.match(/footer/i)) {
      nLvlThis = 1
      nLvlToc = 1
      sUl += '<li><a class="clsPreview" href="#idFooter">footer</a></li>'
      nLvlPrev = 1
      continue
    }
    nLvlThis = oElt.nodeName.substr(1, 1)
    if (nLvlThis > nLvlPrev) {
      sUl += '<ul>' // new list
      nLvlToc = 1 + parseInt(nLvlToc, 10)
    }
    sHid = oElt.id
    sHlvl = sHid.charAt(sHid.length - 1)
    sHid = sHid.replace(/(\w*)H\d/, '$1')
    // removes from heading the 'clsHide' content
    sHcnt = oElt.innerHTML
    // jslint regexp: true
    sHcnt = sHcnt.replace(/\n {4}<a class="clsHide" href=[^<]+<\/a>/, '')
    sHcnt = sHcnt.replace(/<[^>]+>/g, '')
    // jslint regexp: false
    sHcnt = sHcnt.replace(/<br\/*>/g, ' ')
    if (sHid === 'idComment') {
      sUl += '<li><a href="#' + sHid + '">' + sHcnt + '</a>'
    } else {
      sUl += '<li><a class="clsPreview" href="#' + sHid + '">' + sHcnt + '</a>'
    }
    if (aHdng[n + 1]) {
      nLvlNext = aHdng[n + 1].nodeName.substr(1, 1)
      if (aHdng[n + 1].nodeName.match(/footer/i)) {
        nLvlNext = 1
      }
      if (nLvlThis > nLvlNext) {
        nLvlToc = nLvlToc - nLvlNext
        for (nJ = 0; nJ < nLvlToc; nJ += 1) {
          sUl += '</li></ul></li>'
        }
        nLvlToc = nLvlNext
      }
      if (nLvlThis === nLvlNext) {
        sUl += '</li>'
      }
    }
    nLvlPrev = nLvlThis
  }
  sUl += '</li></ul></li></ul>'
  return sUl
}

/**
 * Highlights ONE item in toc-list
 */
let fTocTriHighlightNode = function (oEltCnrMainInfoDiv, oElm) {
  // removes existing highlighting
  let
    aTocTriA = oEltCnrMainInfoDiv.getElementsByTagName('a'),
    n

  for (n = 0; n < aTocTriA.length; n += 1) {
    aTocTriA[n].classList.remove('clsTocTriHighlight')
  }
  oElm.classList.add('clsTocTriHighlight')
}

/**
 * Created: {2016-07-20}
 * Makes collapsible-trees, unordered-lists with clsTreeUl.
 */
let oTreeUl = (function () {
  let oTreeUl = {}

  /**
   * DOING: it creates one-clsTreeUl-list tree.
   * If no input, creates ALL lists of the-doc, trees.
   * PROBLEM: it does-not-work for one tree {2021-11-20}
   */
  oTreeUl.fTruCreate = function (oUlIn) {
    // find all clsTreeUl-lists
    let
      aLi,
      aUl,
      aUlSub,
      n, n2,
      oEltI

    if (oUlIn) {
      aUl = [oUlIn]
    } else {
      aUl = document.querySelectorAll('.clsTreeUl')
    }

    for (n = 0; n < aUl.length; n++) {
      //if (!aUl[n].getElementsByClassName('clsFa')) {
      // add the-clsTreeUl to the-sub-lists
      let aSubul = aUl[n].getElementsByTagName('ul')
      if (aSubul.length >0 && !aSubul[0].className) {
        for (n2 = 0; n2 < aSubul.length; n2++) {
          aSubul[n2].className = 'clsTreeUl'
        }

        // on first li:
        // add node-image
        // add event-listener
        aLi = aUl[n].getElementsByTagName('li')
        for (n2 = 0; n2 < aLi.length; n2++) {
          aUlSub = aLi[n2].getElementsByTagName('ul')

          oEltI = document.createElement('i')
          oEltI.setAttribute('class', 'clsFa clsFaCrcCol')
          if (aUlSub.length === 0) {
            oEltI.setAttribute('class', 'clsFa clsFaCrc')
          } else {
            oEltI.addEventListener('click', fTruListenerClickCreate(aLi[n2]))
          }
          aLi[n2].insertBefore(oEltI, aLi[n2].firstChild)

          // collapse the-lists within this listitem
          oTreeUl.fTruToggleLi(aLi[n2])

          // first-level expand
          if (aLi[n2].parentNode.parentNode.nodeName !== 'LI') {
            oTreeUl.fTruToggleLi(aLi[n2])
          }
        }
      }
    }
  }

  /**
   * Expands or Collapses an-input-listitem.
   *
   * @input {object} oEltLiIn The-listitem to toggle
   */
  oTreeUl.fTruToggleLi = function (oEltLiIn) {
    let
      aUl,
      // determine whether to expand or collaple,
      bCollapsed = oEltLiIn.firstChild.className.indexOf('clsFaCrcExp') > -1,
      n,
      oEltLi

    // find uls of input li
    aUl = oEltLiIn.getElementsByTagName('ul')
    for (n = 0; n < aUl.length; n++) {
      // toggle display of first-level ul
      oEltLi = aUl[n]
      while (oEltLi.nodeName !== 'LI') {
        oEltLi = oEltLi.parentNode
      }
      if (oEltLi === oEltLiIn) {
        aUl[n].style.display = bCollapsed ? 'block' : 'none'
      }
    }

    if (aUl.length > 0) {
      if (bCollapsed) {
        if (oEltLiIn.firstChild.tagName === 'I') {
          oEltLiIn.firstChild.classList.remove('clsFaCrcExp')
          oEltLiIn.firstChild.classList.add('clsFaCrcCol')
        }
      } else {
        if (oEltLiIn.firstChild.tagName === 'I') {
          oEltLiIn.firstChild.classList.remove('clsFaCrcCol')
          oEltLiIn.firstChild.classList.add('clsFaCrcExp')
        }
      }
    }
  }

  /** Makes the display-style: none. */
  oTreeUl.fTruTocCollapseAll = function () {
    let
      aSubnodes,
      aTocTriLI = document.getElementById('idTocTri').getElementsByTagName('li'),
      n

    for (n = 0; n < aTocTriLI.length; n += 1) {
      aSubnodes = aTocTriLI[n].getElementsByTagName('ul')
      if (aSubnodes.length > 0 && aSubnodes[0].style.display === 'block') {
        oTreeUl.fTruToggleLi(aTocTriLI[n])
      }
    }
  }

  /** Makes the display-style: block. */
  oTreeUl.fTruTocExpandAll = function () {
    let
      aSubnodes,
      aTocTriLI = document.getElementById('idTocTri').getElementsByTagName('li'),
      n

    for (n = 0; n < aTocTriLI.length; n += 1) {
      aSubnodes = aTocTriLI[n].getElementsByTagName('ul')
      if (aSubnodes.length > 0 && aSubnodes[0].style.display === 'none') {
        oTreeUl.fTruToggleLi(aTocTriLI[n])
      }
    }
  }

  /** Expands the first children. */
  oTreeUl.fTruTocExpandFirst = function () {
    let aTocTriLI, aSubnodes

    aTocTriLI = document.getElementById('idTocTri').getElementsByTagName('li')
    /* expand the first ul-element */
    aSubnodes = aTocTriLI[0].getElementsByTagName('ul')
    if (aSubnodes.length > 0 && aSubnodes[0].style.display === 'none') {
      oTreeUl.fTruToggleLi(aTocTriLI[0])
    }
  }

  /**
   * Expands all the parents ONLY, of an element with link to a heading.
   */
  oTreeUl.fTruExpandParent = function (oEltAIn) {
    let oEltI, oEltUl

    oTreeUl.fTruTocCollapseAll()
    // the parent of a-link-elm is li-elm with parent a ul-elm.
    oEltUl = oEltAIn.parentNode.parentNode
    while (oEltUl.tagName === 'UL') {
      oEltUl.style.display = 'block'
      // the parent is li-elm, its first-child is img
      oEltI = oEltUl.parentNode.firstChild
      if (oEltI.tagName === 'I' && oEltI.className.indexOf('clsFaCrcExp') > -1) {
        oEltI.classList.remove('clsFaCrcExp')
        oEltI.classList.add('clsFaCrcCol')
      }
      oEltUl = oEltUl.parentNode.parentNode
    }
  }

  /**
   * Returns a-click-listener that toggles the input listitem.
   *
   * @input {object} oEltLiIn The-listitem to toggle
   */
  function fTruListenerClickCreate (oEltLiIn) {
    return function (oEvtIn) {
      let
        oEltI = oEvtIn.target,
        oEltLi = (oEvtIn.target.parentNode),
        sIcls = oEltI.className

      if (sIcls.indexOf('clsTriClicked') > -1) {
        oEltClicked.classList.remove('clsTriClicked')
        oEltI.classList.remove('clsTriClicked')
        if (oEltLi === oEltLiIn) {
          oTreeUl.fTruToggleLi(oEltLiIn)
        }
        if (sIcls.indexOf('clsFaCrcExp') > -1) {
          oEltI.classList.remove('clsFaCrcExp')
          oEltI.classList.add('clsFaCrcCol')
        } else if (sIcls.indexOf('clsFaCrcCol') > -1) {
          oEltI.classList.remove('clsFaCrcCol')
          oEltI.classList.add('clsFaCrcExp')
        }
      } else {
        oEltClicked.classList.remove('clsClicked', 'clsTtpShow', 'clsTriClicked')
        oEltClicked = oEltI
        oEltI.classList.add('clsTriClicked')
      }
    }
  }

  return oTreeUl
})()

/**
 * DOING: reads the-config, site-menu, namidx.lagRoot files, if exist,
 * and creates the-containers of the-page.
 */
if (location.hostname !== '') {
  // no server, display only Toc
  sPathSite = location.origin + '/'
}

if (sPathSite) {
  // read configMcs
  await fetch(sPathSite + 'configMcs.json')
  .then(response => response.json())
  .then(oConfig => {
    if (oConfig.nCfgPageinfoWidth) {
      nCfgPageinfoWidth = oConfig.nCfgPageinfoWidth
    }
    if (oConfig.sCfgHomeLocal) {
      sCfgHomeLocal = oConfig.sCfgHomeLocal
      if (location.hostname === 'localhost') {
        sPathSite = location.origin + sCfgHomeLocal
        sPathStmenu = sPathSite + 'filSite-structureLocal.html'
      } else if (location.hostname.length > 1) {
        sPathSite = location.origin + '/'
        sPathStmenu = sPathSite + 'filSite-structure.html'
      }
    }
  })
  .catch(sPathSite="error")

  // read site-structure
  await fetch(sPathStmenu)
  .then(response => response.text())
  .then(sHtml => {
    oEltSitemenuUl = (new DOMParser()).parseFromString(sHtml, 'text/html')
    oEltSitemenuUl = oEltSitemenuUl.querySelector('ul')
  })

  // read lagRoot
  await fetch(sPathSite + 'dirMcsh/dirNamidx/namidx.lagRoot.json')
  .then(response => response.json())
  .then(data => aaNamidxfileRoot=data)
}

fContainersInsert()
oTreeUl.fTruCreate()
// IF on idMetaWebpage_path paragraph we have and the clsTocExpand
// then the toc expands-all
if (document.getElementById('idMetaWebpage_path')) {
  if (document.getElementById('idMetaWebpage_path').getAttribute('class') === 'clsTocExpand') {
    oTreeUl.fTruTocExpandAll()
  }
}
if (location.hash) {
  location.href = location.hash
}
document.getElementById('idCnrMainPgcntDiv').focus()

/**
 * DOING: creates object {file: index} from [[file,idx,quantity]]
 * INPUT: aIn = [['lagEngl01ei','A',1234]]
 * OUTPUT: {laEngl01ei:'A'}
 */
function fCreateOFile_Index(aIn) {
  let
    n,
    oOut = {}
  for (n = 0; n < aIn.length; n++) {
    if (!aIn[n][1].startsWith(';')) {
      // remove non index info
      oOut[aIn[n][0]] = aIn[n][1]
    }
  }
  return oOut
}

/**
 * INPUT: lagEngl01ei, lagElln01alfa
 * OUTPUT: site/dirMcsh/dirNamidx/dirLagEngl/namidx.lagEngl01ei.json
 */
function fFindNamidxfileFull(sIdxfilIn) {
  return sPathSite + 'dirMcsh/dirNamidx/dirL' + sIdxfilIn.substring(1, 7) +
         '/namidx.' + sIdxfilIn + '.json'
}

/**
 * DOING: it finds the-namidx-json-file to search a-name-link
 * INPUT:
 *  - sNameIn: 'νύφη'
 *  - sLagIn: 'lagElln'
 *  - aaNamidxIdxIn: [["lagEngl01ei","A|a"]]
 * OUTPUT: ["lagElln15omikron_0","Ό|Ο|ο|ό"]
 */
async function fFindNamidxfile(sNameIn, sLagIn, aaNamidxIdxIn) {
  let
    aNamidxfile_IdxOut, // the-output Namidxfile-index info
    oNamidxfile_Idx,
    bRest = true,
    // if first-char of nameIn NOT in an-index in the-lag, then it is a-charREST in this lag
    sCharName,    // the-first char of nameIn
    sIndex,       // the-chars-of-index in the-Namidx-file
    sIdxFrom,
    sIdxTo,
    sNamidx,      // name of Namidx-file on which to store the-word
    sNamidxOut,
    sNamidxRest,  // name of Namidx-file with rest words on input-lag
    nCharName,
    nIdxFrom,
    nIdxTo,
    sNamidxRefFull

  // FIND Namidx-file
  // choose root-char or rest
  sCharName = sNameIn[0].substring(0,1)
  oNamidxfile_Idx = fCreateOFile_Index(aaNamidxIdxIn)
  // {lagEngl01ei:'A|a'}

  for (sNamidx in oNamidxfile_Idx) {
    if (sNamidx.startsWith(sLagIn)) {
      sIndex = oNamidxfile_Idx[sNamidx]

      if (sIndex.indexOf('..') < 0) {
        // index is a-set of chars 'B|b|'
        if (sIndex.indexOf(sCharName) >= 0) {
          // found Namidx-file
          bRest = false 
          sNamidxOut = sNamidx
          aNamidxfile_IdxOut = [sNamidxOut, sIndex]
          break
        }
      } else {
        // index is a-sequence of chars 'C..D' or "26000..27000" or "αμ..β"
        // we are on a-reference or Chinese root reference
        let a = sIndex.split('..')
        sIdxFrom = a[0]
        sIdxTo = a[1]
        //IF indexes more than one, compare word, ELSE codepoints and first-word-char
        if (sIdxFrom.length > 1 || sIdxTo.length > 1) {
          if (sNameIn >= sIdxFrom && sNameIn < sIdxTo) {
            // found Namidx-file
            bRest = false 
            sNamidxOut = sNamidx
            aNamidxfile_IdxOut = [sNamidxOut, sIndex]
            break
          }
        } else {
          //compare codepoints
          nCharName = sCharName.codePointAt()
          // if srch-char is a-supplement with surrogates (high 55296–56319), find it
          if (nCharName >= 55296 && nCharName <= 56319) {
            let sSupplement = String.fromCodePoint(sNameIn[0].charAt(0).charCodeAt(0),
                                                   sNameIn[0].charAt(1).charCodeAt(0))
            nCharName = sSupplement.codePointAt()
          }
          if (!Number.isInteger(Number(sIdxFrom))) {
            // it is char
            nIdxFrom = sIdxFrom.codePointAt()
          } else {
            // it is number
            nIdxFrom = Number(sIdxFrom)
          }
          if (!Number.isInteger(Number(sIdxTo))) {
            nIdxTo = sIdxTo.codePointAt()
          } else {
            nIdxTo = Number(sIdxTo)
          }
          //console.log(nIdxFrom+', '+nIdxTo)
          if (nCharName >= nIdxFrom && nCharName < nIdxTo) {
            // found Namidx-file
            bRest = false 
            sNamidxOut = sNamidx
            aNamidxfile_IdxOut = [sNamidxOut, sIndex]
            break
          }
        }
      }
    }
    // in case where rest-file is reference ('_0')
    if (sNamidx.startsWith(sLagIn + '00'))
      sNamidxRest = sNamidx
  }
  if (bRest) {
    sNamidxOut = sNamidxRest
    aNamidxfile_IdxOut = [sNamidxOut, '']
  }

  if (!sNamidxOut.endsWith('_0')) {
    aNamidxfile_IdxOut = [sNamidxOut, sIndex]
    //console.log(aNamidxfile_IdxOut)
    return aNamidxfile_IdxOut 
  } else {
    sNamidxRefFull = fFindNamidxfileFull(sNamidxOut)
    const response = await fetch(sNamidxRefFull)
    const json = await response.json()
    return fFindNamidxfile(sNameIn, sLagIn, json)
  }
}

/**
 * DOING: it searches for a-name of a-language
 * INPUT: sNameIn, sLagIn=lagElln, aaNamidxIdxIn
 * OUTPUT: promise of array of name-link-array [[name, link]]
 */
async function fSearchname(sNameIn, sLagIn) {
  let
    sFile,
    aaOut = [],
    i

  sFile = await fFindNamidxfile(sNameIn, sLagIn, aaNamidxfileRoot)

  const response = await fetch(fFindNamidxfileFull(sFile[0]))
  const json = await response.json()
  for (i = 1; i < json.length; i++) {
    // it searches for names that begin win nameIn, case insensitive
    if (new RegExp('^' + sNameIn, 'i').test(json[i][0])){
      aaOut.push(json[i])
    }
  }
  return aaOut
}

// oEltClicked, sIdxfile, sIdxTo,  sIdxFrom, sQrslrAClk, sQrslrAClkLast
export {
  aaNamidxfileRoot, aSuggestions, aVersion,
  bEdge, bFirefox,
  nCfgPageinfoWidth,
  fContainersInsert, fTocTriCreate, fTocTriHighlightNode, fSearchname,
  oEltCnrPreviewDiv, oEltSitemenuUl, oTreeUl,
  sCfgHomeLocal, sPathSite, sPathStmenu
}
