/*
 * mLagUtil.js - module with misc util language functions.
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
  // contains the-versions of mLagUtil.js
  aVersion = [
    'mLagUtil.js.0-7-2.2022-04-09: one-syllable',
    'mLagUtil.js.0-7-1.2022-03-16: phonema',
    'mLagUtil.js.0-7-0.2022-03-11: fGreekphonemaHasSyllableOne',
    'mLagUtil.js.0-6-0.2022-03-08: fGreekwordSinizisiAdd',
    'mLagUtil.js.0-5-2.2022-03-01: fGreekwordFindPhonema',
    'mLagUtil.js.0-5-0.2022-02-27: fGreektonosIncrease',
    'mLagUtil.js.0-5-0.2022-02-26: fGreekphonemaHasSinizisi',
    'mLagUtil.js.0-4-1.2022-02-24: fGreekwordFindPhonema',
    'mLagUtil.js.0-4-0.2022-02-23: fPhonemaRemoveTonos',
    'mLagUtil.js.0-3-0.2022-02-15: fGreekwordFindPhonema',
    'mLagUtil.js.0-2-0.2022-01-18: translated from java',
    'mLagUtil.js.0-1-0.2022-01-17: creation'
  ]

/*
 * DOING: it finds the-phonemic-notation of a-Greek-text-word.
 * INPUT: βῆ
 * OUTPUT: /béè/
 */
function fEllawordFindPhonema (sWordIn) {
  let
    nIndex,
    sOut = sWordIn

  //φωνήεντα
  sOut = sOut.replaceAll('αῖ', 'áì') //
  sOut = sOut.replaceAll('α', 'a') //
  sOut = sOut.replaceAll('ε', 'e') //
  sOut = sOut.replaceAll('ῆ', 'éè') //
  sOut = sOut.replaceAll('ή', 'eé') //
  sOut = sOut.replaceAll('η', 'ee') //
  sOut = sOut.replaceAll('ι', 'i') //
  sOut = sOut.replaceAll('ο', 'o') //
  sOut = sOut.replaceAll('υ', 'u') //
  sOut = sOut.replaceAll('ῶ', 'óò') //
  sOut = sOut.replaceAll('ώ', 'oó') //
  sOut = sOut.replaceAll('ω', 'oo') //

  //σύμφωνα
  sOut = sOut.replaceAll('Β', 'b') //
  sOut = sOut.replaceAll('β', 'b') //
  sOut = sOut.replaceAll('Γ', 'g') //
  sOut = sOut.replaceAll('γ', 'g') //
  sOut = sOut.replaceAll('Δ', 'd') //
  sOut = sOut.replaceAll('δ', 'd') //
  sOut = sOut.replaceAll('Ζ', 'zd') //
  sOut = sOut.replaceAll('ζ', 'zd') //
  sOut = sOut.replaceAll('Θ', 'tʰ') //
  sOut = sOut.replaceAll('θ', 'tʰ') //
  sOut = sOut.replaceAll('Κ', 'k') //
  sOut = sOut.replaceAll('κ', 'k') //
  sOut = sOut.replaceAll('Λ', 'l') //
  sOut = sOut.replaceAll('λ', 'l') //
  sOut = sOut.replaceAll('Μ', 'm') //
  sOut = sOut.replaceAll('μ', 'm') //
  sOut = sOut.replaceAll('Ν', 'n') //
  sOut = sOut.replaceAll('ν', 'n') //
  sOut = sOut.replaceAll('Ξ', 'ks') //
  sOut = sOut.replaceAll('ξ', 'ks') //
  sOut = sOut.replaceAll('Π', 'p') //
  sOut = sOut.replaceAll('π', 'p') //
  sOut = sOut.replaceAll('Ρ', 'r') //
  sOut = sOut.replaceAll('ρ', 'r') //
  sOut = sOut.replaceAll('Σ', 's') //
  sOut = sOut.replaceAll('σ', 's') //
  sOut = sOut.replaceAll('Τ', 't') //
  sOut = sOut.replaceAll('τ', 't') //
  sOut = sOut.replaceAll('Φ', 'pʰ') //
  sOut = sOut.replaceAll('φ', 'pʰ') //
  sOut = sOut.replaceAll('Χ', 'kʰ') //
  sOut = sOut.replaceAll('χ', 'kʰ') //
  sOut = sOut.replaceAll('Ψ', 'ps') //
  sOut = sOut.replaceAll('ψ', 'ps') //

  return sOut
}

/*
 * DOING: it removes the-tonos from a-phonema
 * INPUT: nífi
 * OUTPUT: nifi
 */
function fPhonemaTonosRemove (sPhonemaIn) {
  if (sPhonemaIn.indexOf('á') != -1)
    return sPhonemaIn.replace('á','a')
  else if (sPhonemaIn.indexOf('é') != -1)
    return sPhonemaIn.replace('é','e')
  else if (sPhonemaIn.indexOf('í') != -1)
    return sPhonemaIn.replace('í','i')
  else if (sPhonemaIn.indexOf('ó') != -1)
    return sPhonemaIn.replace('ó','ο')
  else if (sPhonemaIn.indexOf('ú') != -1)
    return sPhonemaIn.replace('ú','u')
  else if (sPhonemaIn.indexOf('à') != -1)
    return sPhonemaIn.replace('à','a')
  else if (sPhonemaIn.indexOf('è') != -1)
    return sPhonemaIn.replace('è','e')
  else if (sPhonemaIn.indexOf('ì') != -1)
    return sPhonemaIn.replace('ì','i')
  else if (sPhonemaIn.indexOf('ò') != -1)
    return sPhonemaIn.replace('ò','ο')
  else if (sPhonemaIn.indexOf('ù') != -1)
    return sPhonemaIn.replace('ù','u')
  else
    return sPhonemaIn
}
/*
 * DOING: it replaces the-tonos from a-phonema
 * INPUT: nífi
 * OUTPUT: ni9fi
 */
function fPhonemaTonosReplace (sPhonemaIn) {
  if (sPhonemaIn.indexOf('á') != -1)
    return sPhonemaIn.replace('á','a9')
  else if (sPhonemaIn.indexOf('é') != -1)
    return sPhonemaIn.replace('é','e9')
  else if (sPhonemaIn.indexOf('í') != -1)
    return sPhonemaIn.replace('í','i9')
  else if (sPhonemaIn.indexOf('ó') != -1)
    return sPhonemaIn.replace('ó','o9')
  else if (sPhonemaIn.indexOf('ú') != -1)
    return sPhonemaIn.replace('ú','u9')
  else if (sPhonemaIn.indexOf('à') != -1)
    return sPhonemaIn.replace('à','a8')
  else if (sPhonemaIn.indexOf('è') != -1)
    return sPhonemaIn.replace('è','e8')
  else if (sPhonemaIn.indexOf('ì') != -1)
    return sPhonemaIn.replace('ì','i8')
  else if (sPhonemaIn.indexOf('ò') != -1)
    return sPhonemaIn.replace('ò','o8')
  else if (sPhonemaIn.indexOf('ù') != -1)
    return sPhonemaIn.replace('ù','u8')
  else
    return sPhonemaIn
}

/*
 * DOING: it finds the-phonemic-notation of a-Chinese-pinyin-word.
 * INPUT: 
 * OUTPUT:
 */
function fChinesewordFindPhonema (sWordIn) {
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
  sOut = sOut.replaceAll('è', 'èe')
  
  sOut = sOut.replaceAll('ī', 'íí')
  sOut = sOut.replaceAll('í', 'ií')
  sOut = sOut.replaceAll('ǐ', 'ìí')
  sOut = sOut.replaceAll('ì', 'ìi')

  sOut = sOut.replaceAll('ō', 'óó')
  
  sOut = sOut.replaceAll('ū', 'úú')

  return '/' +sOut +'/'
}

/**
 * DOING: it returns the-chars of codepoints.
 * INPUT:
 *    sCpIn = a-string of codepoints separated with '-'.
 * OUTPUT:
 *    denoted chars.
 */
function fFindCharsIfCodepoints (sCpIn) {
  let
    aIn = sCpIn.split('-'),
    n,
    nIn,
    sOut = ''

  for (n = 0; n < aIn.length; n++) {
    nIn = Number(aIn[n])
    sOut = sOut + String.fromCodePoint(nIn)
  }
  return sOut
}

/**
 * DOING: it returns the-codepoints of chars
 * INPUT:
 *    sCharsIn = the-input chars.
 * OUTPUT:
 *    a-string of codepoints separated with '-'
 */
function fFindCodepointsIfChars (sCharsIn) {
  let
    sIn = sCharsIn,
    n,
    sOut = ''

  for (n = 0; n < sIn.length; n++) {
    if (sIn.charCodeAt(n) >= 55296 && sIn.charCodeAt(n) <= 56319) {
      //on high-surrogates do not count the low-surrogate
      sOut = sOut + sIn.codePointAt(n) + '-'
      n = n+1
    } else {
      sOut = sOut + sIn.codePointAt(n) + '-'
    }
  }
  return sOut.substring(0, sOut.length-1)
}

/**
 * DOING: it returns the-first letters of a-word.
 * INPUT:
 *    sWordIn = the-input word.
 *    nPrefixIn = the-number of first letters we want.
 */
function fFindLettersFirstIfPrefix (sWordIn, nPrefixIn) {
  return sWordIn.substring(0, nPrefixIn)
}

/**
 * DOING: it returns the-first letters of a-word, given suffix.
 * INPUT:
 *    sWordIn = the-input word.
 *    nSuffixIn = the-number of last letters given.
 */
function fFindLettersFirstIfSuffix (sWordIn, nSuffixIn) {
  return sWordIn.substring(0, sWordIn.length - nSuffixIn)
}

/**
 * DOING: it returns the-last letters of a-word.
 * INPUT:
 *    sWordIn = the-input word.
 *    nPrefixIn = the-number of first letters given.
 */
function fFindLettersLastIfPrefix (sWordIn, nPrefixIn) {
  return sWordIn.substring(nPrefixIn, sWordIn.length)
}

/**
 * DOING: it returns the-last letters of a-word.
 * INPUT:
 *    sWordIn = the-input word.
 *    nSuffixIn = the-number of last letters given.
 */
function fFindLettersLastIfSuffix (sWordIn, nSuffixIn) {
  return sWordIn.substring(sWordIn.length - nSuffixIn, sWordIn.length)
}

/**
 * DOING: it returns the-index of Greek-tonos.
 *    if a-phoneme has 2 letters, it returns the-index of FIRST.
 *    to express that consequitive-vowels constitute one syllable
 *    we use 'j': βjά-ζο-μαι, βι-ο-λο-γί-α
 *
 *          ** τα ΔΙΨΗΦΑ ΦΩΝΗΕΝΤΑ
 *            εί,οί,αί,ού θεωρούνται μία συλλαβή.
 *          ** Οι συνδυασμοί αύ,εύ, θεωρούνται μία συλλαβή.
 *          ** Οι παρακάτω Καταχρηστικοί-δίφθογγοι κάνουν μία συλλαβή:
 *            ια    πιά-νω  | πιές
 *            υα    γυα-λί
 *            εια   θειά-φι/βοή-θεια
 *            οια   ποιά    | ποιές | ποιοί | ποιούς
 *          ** Οι ΔΙΦΘΟΓΓΟΙ κάνουν μία συλλαβή:
 *            αι  νε-ράι-δα
 *            αη  αη-δό-νι
 *            οι  ρόι-δι
 *            οη  βόη-θα
 */
function fGreektonosFindIndex(sWordIn) {
  let
    nTonos = -1

  sWordIn = sWordIn.toLowerCase() 

  if (sWordIn.indexOf("ά") != -1) {
    if (sWordIn.indexOf("ά") != 0) {
      //δεν υπάρχει άλλος τρόπος να καταλάβει πότε ΠΡΟΦΕΡΕΤΑΙ μαζί. 2001-04-08
      //ΑΝ το άκουγε, ΤΟΤΕ θα το καταλάβαινε!!
      //ψηφιακό, δημόσια, ακρίβεια, σπάνια, τεράστια, τεράστιες,
      //για, έπιασα, χρόνια, μάτια, τεράστιες,
      if (sWordIn.charAt(sWordIn.indexOf("ά")-1) == 'j' ) //καταχρηστικός δίφθογγος.
        nTonos = sWordIn.indexOf("ά")-1
      else
        nTonos = sWordIn.indexOf("ά")
    }
    else
      nTonos = sWordIn.indexOf("ά")
  }
  else if (sWordIn.indexOf("έ") != -1) {
    if (sWordIn.indexOf("έ") != 0) {
      if (sWordIn.charAt(sWordIn.indexOf("έ")-1) == 'j' ) //καταχρηστικός δίφθογγος.
        nTonos = sWordIn.indexOf("έ")-1
      else
        nTonos = sWordIn.indexOf("έ")
    }
    else
      nTonos = sWordIn.indexOf("έ")
  }
  else if (sWordIn.indexOf("ή") != -1) {
    nTonos = sWordIn.indexOf("ή")
  }
  else if (sWordIn.indexOf("ί") != -1)  {
    if (sWordIn.indexOf("ί") != 0) {
      if (  sWordIn.charAt(sWordIn.indexOf("ί")-1) == 'ε'    //ει
          ||sWordIn.charAt(sWordIn.indexOf("ί")-1) == 'ο'    //οι
          ||sWordIn.charAt(sWordIn.indexOf("ί")-1) == 'α' )  //αι
        nTonos = sWordIn.indexOf("ί")-1
      else
        nTonos = sWordIn.indexOf("ί")
    }
    else
      nTonos = sWordIn.indexOf("ί")
  }
  else if (sWordIn.indexOf("ό") != -1) {
    nTonos = sWordIn.indexOf("ό")
  }
  else if (sWordIn.indexOf("ύ") != -1) {
    if (sWordIn.indexOf("ύ") != 0)
    {
      //if previous letter o, decrease tonos.
      if (  sWordIn.charAt(sWordIn.indexOf("ύ")-1) == 'ο'   //ού
          ||sWordIn.charAt(sWordIn.indexOf("ύ")-1) == 'α'   //αύ
          ||sWordIn.charAt(sWordIn.indexOf("ύ")-1) == 'ε' ) //εύ, απαγορεύεται
        nTonos = sWordIn.indexOf("ύ")-1
      else
        nTonos = sWordIn.indexOf("ύ")
    }
    else
      nTonos = sWordIn.indexOf("ύ")
  }
  else if (sWordIn.indexOf("ώ") != -1) {
    nTonos = sWordIn.indexOf("ώ")
  }
  else if (sWordIn.indexOf("ΰ") != -1) {
    nTonos = sWordIn.indexOf("ΰ")
  }
  else if (sWordIn.indexOf("ΐ") != -1) {
    nTonos = sWordIn.indexOf("ΐ")
  }
  return nTonos
}

/**
 * DOING: it returns the-index of Greek-tonos.
 *    if a-phoneme has 2 letters, it returns the-index of LAST-LETTER.
 */
function fGreektonosFindIndexLast(sWordIn) {
  let
    nTonos = -1

  sWordIn = sWordIn.toLowerCase() 

  if (sWordIn.indexOf("ά") != -1) {
    nTonos = sWordIn.indexOf("ά")
  }
  else if (sWordIn.indexOf("έ") != -1) {
    nTonos = sWordIn.indexOf("έ")
  }
  else if (sWordIn.indexOf("ή") != -1) {
    nTonos = sWordIn.indexOf("ή")
  }
  else if (sWordIn.indexOf("ί") != -1)  {
      nTonos = sWordIn.indexOf("ί")
  }
  else if (sWordIn.indexOf("ό") != -1) {
    nTonos = sWordIn.indexOf("ό")
  }
  else if (sWordIn.indexOf("ύ") != -1) {
    if (sWordIn.indexOf("ύ") != 0) {
      //if previous letter o, decrease tonos.
      if (  sWordIn.charAt(sWordIn.indexOf("ύ")-1) == 'α'   //αύ
          ||sWordIn.charAt(sWordIn.indexOf("ύ")-1) == 'ε' ) //εύ, απαγορεύεται
        nTonos = sWordIn.indexOf("ύ")-1
      else
        nTonos = sWordIn.indexOf("ύ")
    }
    else
      nTonos = sWordIn.indexOf("ύ")
  }
  else if (sWordIn.indexOf("ώ") != -1) {
    nTonos = sWordIn.indexOf("ώ")
  }
  else if (sWordIn.indexOf("ΰ") != -1) {
    nTonos = sWordIn.indexOf("ΰ")
  }
  else if (sWordIn.indexOf("ΐ") != -1) {
    nTonos = sWordIn.indexOf("ΐ")
  }
  return nTonos
}

/*
 * DOING: it removes the-tonos from a-word.
 */
function fGreektonosRemove (sWordIn) {
  let sOut = sWordIn
  sOut = sOut.replace('ά','α')
  sOut = sOut.replace('Ά','Α')
  sOut = sOut.replace('έ','ε')
  sOut = sOut.replace('Έ','Ε')
  sOut = sOut.replace('ή','η')
  sOut = sOut.replace('Ή','Η')
  sOut = sOut.replace('ί','ι')
  sOut = sOut.replace('Ί','Ι')
  sOut = sOut.replace('ό','ο')
  sOut = sOut.replace('Ό','Ο')
  sOut = sOut.replace('ύ','υ')
  sOut = sOut.replace('Ύ','Υ')
  sOut = sOut.replace('ώ','ω')
  sOut = sOut.replace('Ώ','Ω')
  sOut = sOut.replace('ΰ','ϋ')
  sOut = sOut.replace('ΐ','ϊ')

  return sOut
}

/*
 * DOING: it removes the-first tonos from a-word.
 *    we need this method in cases where we create a-word-member, and the-word
 *    has 2 tonos the-old (from stem) and the-new (from suffix).
 */
function fGreektonosRemoveFirst (sWordIn) {
  let
    nIndexFirst,
    nIndexOne=-1,
    nIndexTwo=-1,
    sChar

  sWordIn = sWordIn.toLowerCase()

  //find first tonos-index
  if (sWordIn.indexOf("ά") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ά")
    else nIndexTwo = sWordIn.indexOf("ά")
  else if (sWordIn.indexOf("έ") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("έ")
    else nIndexTwo = sWordIn.indexOf("έ")
  else if (sWordIn.indexOf("ή") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ή")
    else nIndexTwo = sWordIn.indexOf("ή")
  else if (sWordIn.indexOf("ί") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ί")
    else nIndexTwo = sWordIn.indexOf("ί")
  else if (sWordIn.indexOf("ό") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ό")
    else nIndexTwo = sWordIn.indexOf("ό")
  else if (sWordIn.indexOf("ύ") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ύ")
    else nIndexTwo = sWordIn.indexOf("ύ")
  else if (sWordIn.indexOf("ώ") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ώ")
    else nIndexTwo = sWordIn.indexOf("ώ")
  else if (sWordIn.indexOf("ΰ") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ΰ")
    else nIndexTwo = sWordIn.indexOf("ΰ")
  else if (sWordIn.indexOf("ΐ") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ΐ")
    else nIndexTwo = sWordIn.indexOf("ΐ")
  if (nIndexOne < nIndexTwo)
    nIndexFirst = nIndexOne
  else
    nIndexFirst = nIndexTwo

  //find the letter of first tonos.
  sChar = sWordIn.charAt(nIndexFirst)

  if (sChar == 'ά')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"α"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'έ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ε"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ή')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"η"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ί')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ι"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ό')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ο"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ύ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"υ"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ώ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ω"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ΰ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"υ"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ΐ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ι"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else
    return sWordIn
}

/*
 * DOING: it finds the-syllable of tonos and returns it.
 * INPUT: bSinizisi=true if the-word has sinizisi
 * OUTPUT: 
 *       1 for ligousa
 *       2 for paraligousa
 *       3 for proparaligousa
 *       -1 for a mistake
 */
function fGreektonosFindSyllable (sWordIn, bSinizisi) {
  sWordIn = sWordIn.toLowerCase()
  let
    nTonos = fGreektonosFindIndex(sWordIn),
    nLiyusa =-1,
    nParaliyusa =-1,
    nProparaliyusa =-1

  if (bSinizisi)
    sWordIn = fGreekwordSinizisiAdd(sWordIn)

  sWordIn = fGreektonosRemove(sWordIn)
  nLiyusa = fGreekvowelindexFindLast(sWordIn)
  if (nLiyusa != -1)
    nParaliyusa = fGreekvowelindexFindLast(sWordIn.substring(0, nLiyusa))
  if (nParaliyusa != -1)
    nProparaliyusa = fGreekvowelindexFindLast(sWordIn.substring(0, nParaliyusa))
  if (nTonos == nLiyusa || nTonos==-1) // no tonos = one syllable
    return 1
  else if (nTonos == nParaliyusa)
    return 2
  else if (nTonos == nProparaliyusa)
    return 3
  else
    return -1 //in case of a-mistake.
}

/*
 * DOING: it sets the-tonos on liyusa.
 * INPUT: the-word has no tonos.
 */
function fGreektonosSetOnLiyusa (sWordIn) {
  let
    nVowelLast

  //find the MAX index of vowels.
  nVowelLast = fGreekvowelindexFindLast(sWordIn)

  return fGreektonosSetOnIndex(sWordIn, nVowelLast)
}

/*
 * DOING: it set the-tonos on paraliyusa.
 * INPUT: the-word has no tonos.
 */
function fGreektonosSetOnParaliyusa (sWordIn) {
  let
    nVowelLast,
    sWord2

  nVowelLast = fGreekvowelindexFindLast(sWordIn)
  sWord2 = sWordIn.substring(0, nVowelLast)
  nVowelLast = fGreekvowelindexFindLast(sWord2)
  return fGreektonosSetOnIndex(sWordIn, nVowelLast)
}

/*
 * DOING: it set the-tonos on index.
 * INPUT: the-word has no tonos.
 */
function fGreektonosSetOnIndex (sWordIn, nVowelLast) {
  let
    sChar

  sChar = sWordIn.charAt(nVowelLast)

  if (sChar == 'α')
  {
    //if α is **NOT** the last-vowel
    if (nVowelLast != sWordIn.length-1)
    {
      if (sWordIn.charAt(nVowelLast+1) == 'ι')
        return sWordIn.substring(0, nVowelLast+1) +"ί" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else if (sWordIn.charAt(nVowelLast+1) == 'υ')
        return sWordIn.substring(0, nVowelLast+1) +"ύ" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else
        return sWordIn.substring(0, nVowelLast) +"ά" +sWordIn.substring(nVowelLast+1, sWordIn.length)
    }
    else
      return sWordIn.substring(0, nVowelLast) +"ά" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  }
  else if (sChar == 'ε')
  {
    //if ε is **NOT** the last-vowel
    if (nVowelLast != sWordIn.length-1)
    {
      if (sWordIn.charAt(nVowelLast+1) == 'ι')
        return sWordIn.substring(0, nVowelLast+1) +"ί" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else if (sWordIn.charAt(nVowelLast+1) == 'υ')
        return sWordIn.substring(0, nVowelLast+1) +"ύ" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else
        return sWordIn.substring(0, nVowelLast) +"έ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
    }
    else
      return sWordIn.substring(0, nVowelLast) +"έ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  }
  else if (sChar == 'ο')
  {
    //if ο is **NOT** the last-vowel
    if (nVowelLast != sWordIn.length-1)
    {
      if (sWordIn.charAt(nVowelLast+1) == 'ι')
        return sWordIn.substring(0, nVowelLast+1) +"ί" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else if (sWordIn.charAt(nVowelLast+1) == 'υ')
        return sWordIn.substring(0, nVowelLast+1) +"ύ" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else
        return sWordIn.substring(0, nVowelLast) +"ό" +sWordIn.substring(nVowelLast+1, sWordIn.length)
    }
    else
      return sWordIn.substring(0, nVowelLast) +"ό" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  }
  else if (sChar == 'η')
    return  sWordIn.substring(0, nVowelLast) +"ή" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else if (sChar == 'ι')
    return  sWordIn.substring(0, nVowelLast) +"ί" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else if (sChar == 'υ')
    return  sWordIn.substring(0, nVowelLast) +"ύ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else if (sChar == 'ω')
    return  sWordIn.substring(0, nVowelLast) +"ώ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else if (sChar == 'ϋ')
    return  sWordIn.substring(0, nVowelLast) +"ΰ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else if (sChar == 'ϊ')
    return  sWordIn.substring(0, nVowelLast) +"ΐ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else
    return sWordIn
}

/*
 * DOING: it decrease the-tonos: υποκόσμου = >  υπόκοσμου
 */
function fGreektonosDecrease (sWordIn, bSinizisi) {
  let
    nIndexTonos,
    nVowelLast,
    sWord2 = ''

  nIndexTonos = fGreektonosFindIndex(sWordIn)
  sWordIn = fGreektonosRemove(sWordIn)

  try {sWord2 = sWordIn.substring(0, nIndexTonos)}
  catch (error){console.error('fGreektonosDecrease')}
  if (bSinizisi) sWord2 = fGreekwordSinizisiAdd(sWord2)
  nVowelLast = fGreekvowelindexFindLast(sWord2)
  sWordIn = fGreektonosSetOnIndex(sWordIn, nVowelLast)

  return sWordIn
}

/*
 * DOING: it decrease the-tonos: υπόκοσμου => υποκόσμου
 */
function fGreektonosIncrease (sWordIn, bSinizisi) {
  let
    bFV = false, //εύ|αύ
    nIndexTonos,
    nVowelFirst,
    sWord1 = '',
    sWord2 = ''

  nIndexTonos = fGreektonosFindIndexLast(sWordIn)
  if (sWordIn.charAt(nIndexTonos+1) == 'ύ') bFV = true
  sWordIn = fGreektonosRemove(sWordIn)

  if(!bFV) sWord1 = sWordIn.substring(0, nIndexTonos+1)
  else sWord1 = sWordIn.substring(0, nIndexTonos+2)
  if(!bFV) sWord2 = sWordIn.substring(nIndexTonos+1)
  else sWord2 = sWordIn.substring(nIndexTonos+2)
  if (bSinizisi) sWord2 = fGreekwordSinizisiAdd(sWord2)
  nVowelFirst = fGreekvowelindexFindFirst(sWord2)
  sWord2 = sWord2.replaceAll('j', 'ι')
  sWord2 = fGreektonosSetOnIndex(sWord2, nVowelFirst)

  return sWord1 + sWord2
}

/*
 * DOING: it finds the-index of the-first vowel of a-word without tonos.
 *    IF ει,οι,αι,ου,αυ,ευ, returns the-index of the-first vowel.
 */
function fGreekvowelindexFindFirst (sWordIn) {
  let
    nVowelMin = 1000

  sWordIn = sWordIn.toLowerCase()
  sWordIn = fGreektonosRemove(sWordIn)
  if (sWordIn.indexOf("α") < nVowelMin && sWordIn.indexOf("α") != -1)
    nVowelMin = sWordIn.indexOf("α")
  if (sWordIn.indexOf("ε") < nVowelMin && sWordIn.indexOf("ε") != -1)
    nVowelMin = sWordIn.indexOf("ε")
  if (sWordIn.indexOf("ο") < nVowelMin && sWordIn.indexOf("ο") != -1)
    nVowelMin = sWordIn.indexOf("ο")
  if (sWordIn.indexOf("η") < nVowelMin && sWordIn.indexOf("η") != -1)
    nVowelMin = sWordIn.indexOf("η")
  if (sWordIn.indexOf("ω") < nVowelMin && sWordIn.indexOf("ω") != -1)
    nVowelMin = sWordIn.indexOf("ω")
  if (sWordIn.indexOf("ι") < nVowelMin && sWordIn.indexOf("ι") != -1) {
    if (sWordIn.indexOf("ι") != 0) {
      if (  sWordIn.charAt(sWordIn.indexOf("ι")-1) == 'ε'   //ει
          ||sWordIn.charAt(sWordIn.indexOf("ι")-1) == 'ο'   //οι
          ||sWordIn.charAt(sWordIn.indexOf("ι")-1) == 'α' ) //αι
        nVowelMin = sWordIn.indexOf("ι")-1
      else
        nVowelMin = sWordIn.indexOf("ι")
    }
    else
      nVowelMin = sWordIn.indexOf("ι")
  }
  if (sWordIn.indexOf("υ") < nVowelMin && sWordIn.indexOf("υ") != -1) {
    if (sWordIn.indexOf("υ") != 0) {
      if (  sWordIn.charAt(sWordIn.indexOf("υ")-1) == 'ο'   //ού
          ||sWordIn.charAt(sWordIn.indexOf("υ")-1) == 'α'   //αύ
          ||sWordIn.charAt(sWordIn.indexOf("υ")-1) == 'ε' ) //εύ, απαγορεύεται
        nVowelMin = sWordIn.indexOf("υ")-1
      else
        nVowelMin = sWordIn.indexOf("υ")
    }
    else
      nVowelMin = sWordIn.indexOf("υ")
  }
  if (sWordIn.indexOf("ϋ") < nVowelMin && sWordIn.indexOf("ϋ") != -1)
    nVowelMin = sWordIn.indexOf("ϋ")
  if (sWordIn.indexOf("ϊ") < nVowelMin && sWordIn.indexOf("ϊ") != -1)
    nVowelMin = sWordIn.indexOf("ϊ")

  return nVowelMin
}

/*
 * DOING: it finds the-index of the-LAST vowel of a-sWordIn without tonos.
 *    IF ει,οι,αι,ου,αυ,ευ, returns the-index of the-FIRST vowel.
 */
function fGreekvowelindexFindLast (sWordIn) {
  let
    nVowelLast = -1

  sWordIn = sWordIn.toLowerCase()
  sWordIn = fGreektonosRemove(sWordIn)

  if (sWordIn.lastIndexOf("α")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("α")
  if (sWordIn.lastIndexOf("ε")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ε")
  if (sWordIn.lastIndexOf("ο")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ο")
  if (sWordIn.lastIndexOf("η")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("η")
  if (sWordIn.lastIndexOf("ω")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ω")

  if (sWordIn.lastIndexOf("ι")  >  nVowelLast) {
    if (sWordIn.lastIndexOf("ι")  >  0) {
      if (  (sWordIn.charAt(sWordIn.lastIndexOf("ι")-1) == 'ε')   //ει
          ||(sWordIn.charAt(sWordIn.lastIndexOf("ι")-1) == 'ο')   //οι
          ||(sWordIn.charAt(sWordIn.lastIndexOf("ι")-1) == 'α') ) //αι
        nVowelLast = sWordIn.lastIndexOf("ι")-1
      else
        nVowelLast = sWordIn.lastIndexOf("ι")
    }
    else
      nVowelLast = sWordIn.lastIndexOf("ι")
  }

  if (sWordIn.lastIndexOf("υ")  >  nVowelLast) {
    if (sWordIn.lastIndexOf("υ") != 0) {
      if (  sWordIn.charAt(sWordIn.lastIndexOf("υ")-1) == 'ο'   //ού
          ||sWordIn.charAt(sWordIn.lastIndexOf("υ")-1) == 'α'   //αύ
          ||sWordIn.charAt(sWordIn.lastIndexOf("υ")-1) == 'ε' ) //εύ, απαγορεύεται
        nVowelLast = sWordIn.lastIndexOf("υ")-1
      else
        nVowelLast = sWordIn.lastIndexOf("υ")
    }
    else
      nVowelLast = sWordIn.lastIndexOf("υ")
  }

  if (sWordIn.lastIndexOf("ϋ")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ϋ")
  if (sWordIn.lastIndexOf("ϊ")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ϊ")

  return nVowelLast
}

/*
 * DOING: it finds the-number of vowels (αι,ει,οι,ου,αυ,ευ counts one)
 *    of a-word, ie its syllables.
 */
function fGreekvowelnumberFind (sWordIn) {
  let
    nSyllable = 0,
    nIndex = -1

  while (sWordIn.length > 0) {
    nIndex = fGreekvowelindexFindLast(sWordIn)
    if (nIndex != -1) {
      nSyllable++
      sWordIn = sWordIn.substring(0, nIndex)
    }
    else break
  }

  return nSyllable
}

/*
 * DOING: it finds the-phonemic-notation of a-Greek-text-word.
 * INPUT: αυταρχικός
 * OUTPUT: /aftarhikós/
 */
function fGreekwordFindPhonema (sWordIn, bSinizisi) {
  let
    nIndex,
    sOut = sWordIn

  //αια
  sOut = sOut.replaceAll('ιαία', 'iéa') //Ιστιαία
  sOut = sOut.replaceAll('αιά', 'eá') //Πειραιάς
  sOut = sOut.replaceAll('αια', 'ea') //Παιανιώτης
  sOut = sOut.replaceAll('αιου', 'eu') //ελαιουργός
  sOut = sOut.replaceAll('αιο', 'eo') //ελαιοπυρήνας
  sOut = sOut.replaceAll('αιό', 'eó') //αρχαιόφιλος
  sOut = sOut.replaceAll('αιώ', 'eó') //αιών

  //εια
  if (sOut.endsWith('δειά-η'))
    sOut = sOut.replace('δειά-η', 'dhyyá-i') //σοδειά
  if (sOut.endsWith('λειά-η'))
    sOut = sOut.replace('λειά-η', 'llá-i') //δουλειά
  if (sOut.endsWith('τειά-η'))
    sOut = sOut.replace('τειά-η', 'tyyá-i') //γητειά
  if (sOut.indexOf('βεια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('βεια', 'vyya') //ακρίβεια
  if (sOut.indexOf('γειά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('γειά', 'yyá') //υγειά
  if (sOut.indexOf('θειά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('θειά', 'thhhá') //θειάφισμα
  if (sOut.indexOf('θεια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('θεια', 'thhha') //βοήθεια
  if (sOut.indexOf('λειά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λειά', 'llá') //δουλειά
  if (sOut.indexOf('ρειά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ρειά', 'ryyá') //χηρειά
  sOut = sOut.replaceAll('εια', 'ia') //άδεια, 
  sOut = sOut.replaceAll('ειά', 'iá') //παντρειά,
  sOut = sOut.replaceAll('ιεία', 'iía') //αλιεία
  sOut = sOut.replaceAll('εία', 'ía') //παιδεία,

  //ειε
  if (sOut.indexOf('θειε') != -1 && bSinizisi)
    sOut = sOut.replaceAll('θειε', 'thhhe') //αλήθειες
  if (sOut.indexOf('θειέ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('θειέ', 'thhhé') // θειες
  sOut = sOut.replaceAll('ειε', 'ie') //αγγειεκτασία
  sOut = sOut.replaceAll('ειέ', 'ié')
  sOut = sOut.replaceAll('είε', 'íe') // αλιείες

  //ειου
  sOut = sOut.replaceAll('ειού', 'iú') //αδειούμπα
  sOut = sOut.replaceAll('ειου', 'iu')

  //ειο
  if (sOut.indexOf('βειό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('βειό', 'vyyó') //λιοτριβειό
  if (sOut.indexOf('γειο') != -1 && bSinizisi)
    sOut = sOut.replaceAll('γειο', 'yyo') //αγειορίτης
  if (sOut.indexOf('δειο') != -1 && bSinizisi)
    sOut = sOut.replaceAll('δειο', 'dhyyo') //άδειος
  if (sOut.indexOf('λειό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λειό', 'lló') //αργαλειός
  if (sOut.indexOf('πειό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('πειό', 'pyyó')
  if (sOut.indexOf('ρειό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ρειό', 'ryyó')
  if (sOut.indexOf('τειό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τειό', 'tyyó')
  if (sOut.indexOf('χειό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('χειό', 'hhó')
  sOut = sOut.replaceAll('ειο', 'io') //βόρειο,αγγειοχειρουργός
  sOut = sOut.replaceAll('ειό', 'ió')

  //ειω
  if (sOut.indexOf('θειώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('θειώ', 'thhhó')
  if (sOut.indexOf('λειώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λειώ', 'lló')
  if (sOut.indexOf('νειώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('νειώ', 'nnó')
  if (sOut.indexOf('φειώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('φειώ', 'fhhó')
  sOut = sOut.replaceAll('ειώ', 'ió') //αληθειών

  //οια
  if (sOut.indexOf('νοια') != -1 && bSinizisi) //έγνοια
    sOut = sOut.replaceAll('νοια', 'nna')
  if (sOut.indexOf('όια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('όια', 'óyya') // κομπολόια
  sOut = sOut.replaceAll('οια', 'ia') //έννοια, έγνοια
  sOut = sOut.replaceAll('οιά', 'iá') //χροιά,

  //οιεί
  sOut = sOut.replaceAll('οιεί', 'ií') // αρτοποιείο

  //οιου
  if (sOut.indexOf('οϊού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('οϊού', 'oyyú') // κομπολοϊού
  sOut = sOut.replaceAll('οιού', 'iú')
  sOut = sOut.replaceAll('οιου', 'iu')

  //οιο
  if (sOut.indexOf('τοιο') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τοιο', 'tyyo') //τέτοιος
  sOut = sOut.replaceAll('οιό', 'ió') //επιπλοποιός
  sOut = sOut.replaceAll('οιο', 'io')

  //οιω
  if (sOut.indexOf('οϊώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('οϊώ', 'oyyó') // κομπολοϊών
  if (sOut.indexOf('ροιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ροιώ', 'ryyó') // Βεροιώτης
  sOut = sOut.replaceAll('οιώ', 'ió') //Ευβοιώτισσα
  sOut = sOut.replaceAll('οιω', 'io')

  //ουα
  sOut = sOut.replaceAll('ουά', 'uá') //Μπουρζουάς
  sOut = sOut.replaceAll('ουα', 'ua')

  //ιαι
  sOut = sOut.replaceAll('ιαί', 'ié')
  sOut = sOut.replaceAll('ιαι', 'ie')

  //ια
  if (sOut.startsWith('ια'))
    sOut = sOut.replace('ια', 'ia') //ιατρός
  if (sOut.startsWith('Ια'))
    sOut = sOut.replace('Ια', 'ia') //Ιατρός
  if (sOut.endsWith('γγιά-η'))
    sOut = sOut.replace('γγιά-η', 'ggá-i') //αντιφεγγιά
  if (sOut.endsWith('γκιά-η'))
    sOut = sOut.replace('γκιά-η', 'ggá-i') //ματσαραγκιά
  if (sOut.endsWith('διά-η'))
    sOut = sOut.replace('διά-η', 'dhyyá-i') //αχλαδιά
  if (sOut.endsWith('τζιά-η'))
    sOut = sOut.replace('τζιά-η', 'jjá-i') //νεραντζιά
  if (sOut.endsWith('ζιά-η'))
    sOut = sOut.replace('ζιά-η', 'zzá-i') //γκαζιά
  if (sOut.endsWith('θιά-η'))
    sOut = sOut.replace('θιά-η', 'thhhá-i') //γροθιά
  if (sOut.endsWith('κιά-η'))
    sOut = sOut.replace('κιά-η', 'kká-i') //κακιά
  if (sOut.endsWith('λιά-η'))
    sOut = sOut.replace('λιά-η', 'llá-i') //αγκαλιά
  if (sOut.endsWith('μπιά-η'))
    sOut = sOut.replace('μπιά-η', 'byyá-i') //αγαρμπιά
  if (sOut.endsWith('μιά-η'))
    sOut = sOut.replace('μιά-η', 'mnná-i') //καλαμιά
  if (sOut.endsWith('ντιά-η'))
    sOut = sOut.replace('ντιά-η', 'dyyá-i') //σκουντιά
  if (sOut.endsWith('νιά-η'))
    sOut = sOut.replace('νιά-η', 'nná-i') //αγκωνιά
  if (sOut.endsWith('ξιά-η'))
    sOut = sOut.replace('ξιά-η', 'kssá-i') //μοναξιά
  if (sOut.endsWith('πιά-η'))
    sOut = sOut.replace('πιά-η', 'pyyá-i') //σκοπιά
  if (sOut.endsWith('ριά-η'))
    sOut = sOut.replace('ριά-η', 'ryyá-i') //μουριά εξ αλευριά
  if (sOut.endsWith('σσιά-η'))
    sOut = sOut.replace('σσιά-η', 'ssá-i') //ακροθαλασσιά
  if (sOut.endsWith('σιά-η'))
    sOut = sOut.replace('σιά-η', 'ssá-i') //δημοσιά
  if (sOut.endsWith('τιά-η'))
    sOut = sOut.replace('τιά-η', 'tyyá-i') //ρεματιά
  if (sOut.endsWith('τσιά-η'))
    sOut = sOut.replace('τσιά-η', 'ccá-i') //τσατσιά
  if (sOut.endsWith('φιά-η'))
    sOut = sOut.replace('φιά-η', 'fhhá-i') //συνεφιά
  if (sOut.endsWith('χιά-η'))
    sOut = sOut.replace('χιά-η', 'hhá-i') //αβροχιά
  if (sOut.endsWith('ψιά-η'))
    sOut = sOut.replace('ψιά-η', 'pssá-i') //ανεψιά
  if (sOut.indexOf('βιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('βιά', 'vyyá') //βιάζομαι
  sOut = sOut.replaceAll('βιά', 'vyyá') //βιάζομαι
  if (sOut.indexOf('βια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('βια', 'vyya') //βιασύνη
  sOut = sOut.replaceAll('άια', 'áyya') //αποφάια
  sOut = sOut.replaceAll('αυία', 'avía') //Νοτιοσλαυία
  sOut = sOut.replaceAll('βια', 'via') //βιaσμός
  sOut = sOut.replaceAll('γιά', 'yyá') //γιαγιά
  sOut = sOut.replaceAll('Γιά', 'yyá') //γιαγιά
  sOut = sOut.replaceAll('Για', 'yya') //Γιαννιώτης
  sOut = sOut.replaceAll('ιαύγ', 'iávy') //διαύγεια
  sOut = sOut.replaceAll('ιαυγ', 'iavy')
  sOut = sOut.replaceAll('ιαυλ', 'iavl')
  sOut = sOut.replaceAll('ιαυσ', 'iafs') //ενιαυσιότητα
  sOut = sOut.replaceAll('ιαυτ', 'iaft') //περιαυτολογία
  sOut = sOut.replaceAll('ώια', 'óyya') //ανώια
  if (sOut.indexOf('γκια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('γκια', 'gga')
  if (sOut.indexOf('για') != -1 && bSinizisi)
    sOut = sOut.replaceAll('για', 'yya') //γιαγιά, πλάγια
  if (sOut.indexOf('διά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('διά', 'dhyyá') //καρδιά
  if (sOut.indexOf('δια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('δια', 'dhyya') //άδιασμα
  if (sOut.indexOf('ζιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ζιά', 'zzá')
  if (sOut.indexOf('ντζια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ντζια', 'njja')
  if (sOut.indexOf('ζια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ζια', 'zza')
  if (sOut.indexOf('θιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('θιά', 'thhhá')
  if (sOut.indexOf('θια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('θια', 'thhha')
  if (sOut.indexOf('κιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('κιά', 'kká') //κακιά
  if (sOut.indexOf('κια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('κια', 'kka')
  if (sOut.indexOf('λιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λιά', 'llá')
  if (sOut.indexOf('λια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λια', 'lla')
  if (sOut.indexOf('μπια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μπια', 'byya')
  if (sOut.indexOf('μιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μιά', 'mnná')
  if (sOut.indexOf('μια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μια', 'mnna')
  if (sOut.indexOf('ντια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ντια', 'dyya')
  if (sOut.indexOf('νιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('νιά', 'nná')
  if (sOut.indexOf('νια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('νια', 'nna')
  if (sOut.indexOf('ξιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ξιά', 'kssá')
  if (sOut.indexOf('ξια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ξια', 'kssa')
  if (sOut.indexOf('πιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('πιά', 'pyyá')
  if (sOut.indexOf('πια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('πια', 'pyya')
  if (sOut.indexOf('ριά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ριά', 'ryyá')
  if (sOut.indexOf('ρια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ρια', 'ryya')
  if (sOut.indexOf('τσιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τσιά', 'ccá')
  if (sOut.indexOf('τσια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τσια', 'cca')
  if (sOut.indexOf('σσιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('σσιά', 'ssá')
  if (sOut.indexOf('σσια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('σσια', 'ssa')
  if (sOut.indexOf('σιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('σιά', 'ssá')
  if (sOut.indexOf('σια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('σια', 'ssa')
  if (sOut.indexOf('τζια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τζια', 'jja')
  if (sOut.indexOf('τια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τια', 'tyya') //καράτια
  if (sOut.indexOf('τιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τια', 'tyyá') //καράτια
  if (sOut.indexOf('φια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('φια', 'fhha')
  if (sOut.indexOf('χια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('χια', 'hha')
  if (sOut.indexOf('ψια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ψια', 'pssa')
  sOut = sOut.replaceAll('ια', 'ia') //Ολυμπιακός,
  sOut = sOut.replaceAll('ιά', 'iá') //γαβριάς,

  //ιοι
  if (sOut.indexOf('γιοι') != -1 && bSinizisi)
    sOut = sOut.replaceAll('γιοι', 'yi')
  if (sOut.indexOf('λιοι') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λιοι', 'lli') //Μήλιοι
  if (sOut.indexOf('νιοι') != -1 && bSinizisi)
    sOut = sOut.replaceAll('νιοι', 'nni')
  if (sOut.indexOf('Χιοί') != -1 && bSinizisi)
    sOut = sOut.replaceAll('Χιοί', 'hhí')
  sOut = sOut.replaceAll('ιοι', 'ii') // αντιοικονομία

  //ιει
  sOut = sOut.replaceAll('ιεί', 'ií') // ανεπιείκεια
  sOut = sOut.replaceAll('ιει', 'ii') // υγιεινιστής

  //ιε
  sOut = sOut.replaceAll('αυίε', 'avíe') //Νοτιοσλαυίες
  sOut = sOut.replaceAll('ιεύθ', 'iéfth') //διεύθυνση
  sOut = sOut.replaceAll('ιευθ', 'iefth') //διευθυνσιογράφος
  sOut = sOut.replaceAll('ιευκ', 'iefk')
  sOut = sOut.replaceAll('ιεύρ', 'iévr') //διεύρυνση
  sOut = sOut.replaceAll('ιευρ', 'ievr')
  sOut = sOut.replaceAll('ιεύτ', 'iéft') //αποταμιεύτρια
  sOut = sOut.replaceAll('ιευτ', 'ieft') //αποταμιευτήρας
  sOut = sOut.replaceAll('λιέ', 'llé')   //αγκαλιές
  if (sOut.startsWith('ιε'))
    sOut = sOut.replace('ιε', 'ie') //ιερέας
  if (sOut.indexOf('βιέ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('βιέ', 'vyé') //λεβιές
  if (sOut.indexOf('μιε') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μιε', 'mnne') //βαρυγκόμιες
  if (sOut.indexOf('νιέ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('νιέ', 'nné') //αγκωνιές
  if (sOut.indexOf('πιέ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('πιέ', 'pyé') //κουτουπιές
  if (sOut.indexOf('ριέ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ριέ', 'ryé') //ψησταριές
  if (sOut.indexOf('ριε') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ριε', 'rye') //καριερίστας
  if (sOut.indexOf('τιέ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τιέ', 'tyyé') //στρατιές
  if (sOut.indexOf('φιέ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('φιέ', 'fhhé') //χαφιές
  if (sOut.indexOf('Χιέ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('Χιέ', 'hhé') //Χιέ
  sOut = sOut.replaceAll('ζιέ', 'zé') //μπουλντοζιέρης
  sOut = sOut.replaceAll('ιευν', 'ievn') //αρχιευνούχος
  sOut = sOut.replaceAll('κιέ', 'ké') //περουκιέρης
  sOut = sOut.replaceAll('μπιέ', 'byé') //κουραμπιές
  sOut = sOut.replaceAll('τσιέ', 'cé') //σπετσιέρης
  sOut = sOut.replaceAll('ιε', 'ie') //Βιένη, πιεστής, ταμιευτήρας,

  //ιου
  if (sOut.startsWith('ιου'))
    sOut = sOut.replace('ιου', 'iu')
  sOut = sOut.replaceAll('βιού', 'vyyú') 
  sOut = sOut.replaceAll('βιου', 'vyyu') 
  sOut = sOut.replaceAll('γιού', 'yyú') //Γιούκος
  sOut = sOut.replaceAll('Γιού', 'yyú') //Γιούκος
  sOut = sOut.replaceAll('γκιού', 'ggú')
  sOut = sOut.replaceAll('Γκιού', 'ggú')
  sOut = sOut.replaceAll('Γκιου', 'ggu')
  sOut = sOut.replaceAll('ντζιού', 'njjú')
  sOut = sOut.replaceAll('ντζιου', 'njju')
  sOut = sOut.replaceAll('κιού', 'kkú') //κιούρτος
  sOut = sOut.replaceAll('ντιού', 'dyyú')
  sOut = sOut.replaceAll('ντιου', 'dyyu')
  sOut = sOut.replaceAll('νιού', 'nnú') //αγγονιού
  sOut = sOut.replaceAll('ξιού', 'kssú')
  sOut = sOut.replaceAll('τσιού', 'ccú')
  sOut = sOut.replaceAll('σσιού', 'ssú')
  sOut = sOut.replaceAll('σιού', 'ssú')
  sOut = sOut.replaceAll('τιού', 'tyyú') //καρατιού
  sOut = sOut.replaceAll('ωιού', 'oyyú') //ανωιού
  if (sOut.indexOf('γιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('γιου', 'yyu')
  if (sOut.indexOf('Γιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('Γιου', 'yyu') //Γιουγκοσλάβος
  if (sOut.indexOf('διού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('διού', 'dhyyú')
  if (sOut.indexOf('διου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('διου', 'dhyyu')
  if (sOut.indexOf('ζιού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ζιού', 'zzú')
  if (sOut.indexOf('ζιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ζιου', 'zzu')
  if (sOut.indexOf('θιού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('θιού', 'thhhú')
  if (sOut.indexOf('θιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('θιου', 'thhhu')
  if (sOut.indexOf('κιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('κιου', 'kku')
  if (sOut.indexOf('λιού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λιού', 'llú')
  if (sOut.indexOf('λιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λιου', 'llu')
  if (sOut.indexOf('μπιού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μπιού', 'byyú') //κομπιούτερ
  if (sOut.indexOf('μπιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μπιου', 'byyu') //κομπιουτεράκιας
  if (sOut.indexOf('μιού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μιού', 'mnnú') //αγριμιού
  if (sOut.indexOf('μιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μιου', 'mnnu')
  if (sOut.indexOf('νιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('νιου', 'nnu')
  if (sOut.indexOf('ξιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ξιου', 'kssu')
  if (sOut.indexOf('πιού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('πιού', 'pyyú')
  if (sOut.indexOf('πιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('πιου', 'pyyu')
  if (sOut.indexOf('ριού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ριού', 'ryyú')
  if (sOut.indexOf('ριου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ριου', 'ryyu')
  if (sOut.indexOf('φιού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('φιού', 'fhhú')
  if (sOut.indexOf('φιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('φιου', 'fhhu')
  if (sOut.indexOf('χιού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('χιού', 'hhú')
  if (sOut.indexOf('Χιού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('Χιού', 'hhú')
  if (sOut.indexOf('χιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('χιου', 'hhu')
  if (sOut.indexOf('Χιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('Χιου', 'hhu')
  if (sOut.indexOf('ψιού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ψιού', 'pssú')
  if (sOut.indexOf('ψιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('χιου', 'pssu')
  sOut = sOut.replaceAll('ιού', 'iú')
  sOut = sOut.replaceAll('ιου', 'iu')

  //ιο
  if (sOut.startsWith('ιο'))
    sOut = sOut.replace('ιο', 'io')
  sOut = sOut.replaceAll('Αιο', 'eo') //Αιολία
  sOut = sOut.replaceAll('γκιο', 'ggo') //καραγκιοζοπαίκτης
  sOut = sOut.replaceAll('Γιό', 'yyó')
  sOut = sOut.replaceAll('Γκιό', 'ggó')
  sOut = sOut.replaceAll('Γκιο', 'ggo')
  sOut = sOut.replaceAll('Γιο', 'yyo')
  sOut = sOut.replaceAll('Νιό', 'nnó')
  if (sOut.indexOf('βιό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('βιό', 'vyyó')
  if (sOut.indexOf('βιο') != -1 && bSinizisi)
    sOut = sOut.replaceAll('βιο', 'vyyo')
  if (sOut.indexOf('γυιό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('γυιό', 'yyó')
  if (sOut.indexOf('γιό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('γιό', 'yyó')
  if (sOut.indexOf('γιο') != -1 && bSinizisi)
    sOut = sOut.replaceAll('γιο', 'yyo')
  if (sOut.indexOf('διο') != -1 && bSinizisi)
    sOut = sOut.replaceAll('διο', 'dhyyo')
  if (sOut.indexOf('διό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('διό', 'dhyyó')
  if (sOut.indexOf('νιό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('νιό', 'nnó')
  if (sOut.indexOf('νιο') != -1 && bSinizisi)
    sOut = sOut.replaceAll('νιο', 'nno') //νιόνιος, Αντώνιος
  if (sOut.indexOf('λιο') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λιο', 'llo') //Μήλιο
  if (sOut.indexOf('λιό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λιό', 'lló') //βουρλιόγκας
  if (sOut.indexOf('ριό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ριό', 'ryyó') //καριόλα
  if (sOut.indexOf('τσιό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τσιό', 'ccó') //βυτσιόζος
  if (sOut.indexOf('Χιό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('Χιό', 'hhó') //Χιό
  sOut = sOut.replaceAll('υιό', 'ió') //αγυιόπαιδο
  sOut = sOut.replaceAll('υιο', 'io') //υιοθεσία
  sOut = sOut.replaceAll('ιό', 'ió') //πιόσιμο
  sOut = sOut.replaceAll('ιο', 'io') //άγριος, βιολογία

  //ιω
  if (sOut.startsWith('ιω'))
    sOut = sOut.replace('ιω', 'io')
  if (sOut.startsWith('Ιω'))
    sOut = sOut.replace('Ιω', 'io') //Ιωάννινα
  if (sOut.endsWith('γγιώ-η'))
    sOut = sOut.replace('γγιώ', 'ggó')
  if (sOut.endsWith('γιώ-η'))
    sOut = sOut.replace('γιώ', 'yyó')
  if (sOut.endsWith('λλιώ-η'))
    sOut = sOut.replace('λλιώ', 'lló')
  if (sOut.endsWith('λιώ-η'))
    sOut = sOut.replace('λιώ', 'lló')
  if (sOut.endsWith('μιώ-η'))
    sOut = sOut.replace('μιώ', 'mnnó')
  if (sOut.endsWith('νιώ-η'))
    sOut = sOut.replace('νιώ', 'nnó') //Ρηνιώ
  if (sOut.endsWith('ξιώ-η'))
    sOut = sOut.replace('ξιώ', 'kssó')
  if (sOut.endsWith('ριώ-η'))
    sOut = sOut.replace('ριώ', 'ryyó')
  if (sOut.endsWith('σιώ-η'))
    sOut = sOut.replace('σιώ', 'ssó')
  sOut = sOut.replaceAll('αυιώ', 'avió') //Νοτιοσλαυιών
  sOut = sOut.replaceAll('αιώ', 'eó') //αιώρα
  sOut = sOut.replaceAll('βιώ', 'vyyó')
  sOut = sOut.replaceAll('Γιώ', 'yyó')
  sOut = sOut.replaceAll('διώ', 'dhyyó')
  sOut = sOut.replaceAll('γκιώ', 'ggó') //
  sOut = sOut.replaceAll('κιώ', 'kkó') //Αμπελακιώτης
  sOut = sOut.replaceAll('λλιώ', 'lló') //Βρυξελλιώτης
  sOut = sOut.replaceAll('λιώ', 'lló') //αμυγδαλιώνας
  sOut = sOut.replaceAll('ννιώ', 'nnó') //Γιαννιώτης
  sOut = sOut.replaceAll('μπιώ', 'byyó') //καμπιώτισσα
  sOut = sOut.replaceAll('μπιω', 'byyo') //καμπιωτισσών
  sOut = sOut.replaceAll('ντιώ', 'dyyó') //Ρεντιώτισσα
  sOut = sOut.replaceAll('ντζιώ', 'njjó') //Καλεντζιώτης
  sOut = sOut.replaceAll('ζιώ', 'zzó')
  sOut = sOut.replaceAll('νιω', 'nno')
  sOut = sOut.replaceAll('πιώ', 'pyyó') //Αμπελοκιπιώτης
  sOut = sOut.replaceAll('σσιώ', 'ssó')
  sOut = sOut.replaceAll('σιώ', 'ssó')
  sOut = sOut.replaceAll('ωιώ', 'oyyó') //ανωιών
  if (sOut.indexOf('γιω') != -1 && bSinizisi)
    sOut = sOut.replaceAll('γιω', 'yyo')
  if (sOut.indexOf('Γιω') != -1 && bSinizisi)
    sOut = sOut.replaceAll('Γιω', 'yyo')
  if (sOut.indexOf('γιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('γιώ', 'yyó') // Αιγιώτισα
  if (sOut.indexOf('θιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('θιώ', 'thhhó')
  if (sOut.indexOf('νιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('νιώ', 'nnó') //λιμνιώνας, Πανιώνιος
  if (sOut.indexOf('ξιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ξιώ', 'kssó')
  if (sOut.indexOf('ξιω') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ξιω', 'ksso')
  if (sOut.indexOf('ριώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ριώ', 'ryyó') // Αλιβεριώτης
  if (sOut.indexOf('μιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μιώ', 'mnnó') //καλαμιώνας, ημιώροφος
  if (sOut.indexOf('τσιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τσιώ', 'ccó')
  if (sOut.indexOf('τιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τιώ', 'tyyó') // Αιγιπτιώτισα
  if (sOut.indexOf('φιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('φιώ', 'fhhó')
  if (sOut.indexOf('χιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('χιώ', 'hhó')
  if (sOut.indexOf('Χιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('Χιώ', 'hhó')
  if (sOut.indexOf('ψιώ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ψιώ', 'pssó')
  sOut = sOut.replaceAll('ιώ', 'ió') // 
  sOut = sOut.replaceAll('ιω', 'io') // 

  //υα
  sOut = sOut.replaceAll('γυά', 'yyá') //γυάλα
  sOut = sOut.replaceAll('γυα', 'yya') //γυαλιάς
  sOut = sOut.replaceAll('μυά', 'mnná') //ξεμυάλισμα
  sOut = sOut.replaceAll('μυα', 'mnna') //μυαλό

  //υο
  if (sOut.indexOf('δυό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('δυό', 'dhyyó') //δυόσμος

  //υι
  sOut = sOut.replaceAll('υια', 'ia') //άρπυια

  sOut = sOut.replaceAll('ού', 'ú')
  sOut = sOut.replaceAll('Ού', 'ú')
  sOut = sOut.replaceAll('αί', 'é')
  sOut = sOut.replaceAll('Αί', 'é')
  sOut = sOut.replaceAll('εί', 'í')
  sOut = sOut.replaceAll('Εί', 'í')
  sOut = sOut.replaceAll('οί', 'í')
  sOut = sOut.replaceAll('Οί', 'í')
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
  sOut = sOut.replaceAll('έ', 'é')
  sOut = sOut.replaceAll('Έ', 'é')
  sOut = sOut.replaceAll('ή', 'í')
  sOut = sOut.replaceAll('Ή', 'í')
  sOut = sOut.replaceAll('ί', 'í')
  sOut = sOut.replaceAll('ΐ', 'í')
  sOut = sOut.replaceAll('Ί', 'í')
  sOut = sOut.replaceAll('ύ', 'í')
  sOut = sOut.replaceAll('ΰ', 'í')
  sOut = sOut.replaceAll('Ύ', 'í')
  sOut = sOut.replaceAll('ό', 'ó')
  sOut = sOut.replaceAll('Ό', 'ó')
  sOut = sOut.replaceAll('ώ', 'ó')
  sOut = sOut.replaceAll('Ώ', 'ó')
  sOut = sOut.replaceAll('ά', 'á')
  sOut = sOut.replaceAll('Ά', 'á')

  sOut = sOut.replaceAll('ντζ', 'nj')
  sOut = sOut.replaceAll('ντσ', 'nc') //ίντσα
  sOut = sOut.replaceAll('μπ', 'b')
  sOut = sOut.replaceAll('Μπ', 'b')
  sOut = sOut.replaceAll('ντ', 'd')
  sOut = sOut.replaceAll('Ντ', 'd')
  sOut = sOut.replaceAll('γκ', 'g')
  sOut = sOut.replaceAll('Γκ', 'g')
  sOut = sOut.replaceAll('γγ', 'g')
  sOut = sOut.replaceAll('γχ', 'gh')
  sOut = sOut.replaceAll('σβ', 'zv')
  sOut = sOut.replaceAll('σμ', 'zm')
  sOut = sOut.replaceAll('τζ', 'j')
  sOut = sOut.replaceAll('Τζ', 'j')
  sOut = sOut.replaceAll('τσ', 'c')
  sOut = sOut.replaceAll('Τσ', 'c')
  sOut = sOut.replaceAll('ββ', 'v')
  sOut = sOut.replaceAll('β', 'v')
  sOut = sOut.replaceAll('Β', 'v')
  sOut = sOut.replaceAll('γ', 'y')
  sOut = sOut.replaceAll('Γ', 'y')
  sOut = sOut.replaceAll('δδ', 'dh')
  sOut = sOut.replaceAll('δ', 'dh')
  sOut = sOut.replaceAll('Δ', 'dh')
  sOut = sOut.replaceAll('ζ', 'z')
  sOut = sOut.replaceAll('Ζ', 'z')
  sOut = sOut.replaceAll('θ', 'th')
  sOut = sOut.replaceAll('Θ', 'th')
  sOut = sOut.replaceAll('κκ', 'k')
  sOut = sOut.replaceAll('κ', 'k')
  sOut = sOut.replaceAll('Κ', 'k')
  sOut = sOut.replaceAll('λλ', 'l')
  sOut = sOut.replaceAll('λ', 'l')
  sOut = sOut.replaceAll('Λ', 'l')
  sOut = sOut.replaceAll('μμ', 'm')
  sOut = sOut.replaceAll('μ', 'm')
  sOut = sOut.replaceAll('Μ', 'm')
  sOut = sOut.replaceAll('νν', 'n')
  sOut = sOut.replaceAll('ν', 'n')
  sOut = sOut.replaceAll('Ν', 'n')
  sOut = sOut.replaceAll('ξ', 'ks')
  sOut = sOut.replaceAll('Ξ', 'ks')
  sOut = sOut.replaceAll('ππ', 'p')
  sOut = sOut.replaceAll('π', 'p')
  sOut = sOut.replaceAll('Π', 'p')
  sOut = sOut.replaceAll('ρρ', 'r')
  sOut = sOut.replaceAll('ρ', 'r')
  sOut = sOut.replaceAll('Ρ', 'r')
  sOut = sOut.replaceAll('σσ', 's')
  sOut = sOut.replaceAll('σ', 's')
  sOut = sOut.replaceAll('Σ', 's')
  sOut = sOut.replaceAll('ς', 's')
  sOut = sOut.replaceAll('ττ', 't')
  sOut = sOut.replaceAll('τ', 't')
  sOut = sOut.replaceAll('Τ', 't')
  sOut = sOut.replaceAll('φφ', 'f')
  sOut = sOut.replaceAll('φ', 'f')
  sOut = sOut.replaceAll('Φ', 'f')
  sOut = sOut.replaceAll('χ', 'h')
  sOut = sOut.replaceAll('Χ', 'h')
  sOut = sOut.replaceAll('ψ', 'ps')
  sOut = sOut.replaceAll('Ψ', 'ps')

  sOut = sOut.replaceAll('ου', 'u')
  sOut = sOut.replaceAll('Ου', 'u')
  sOut = sOut.replaceAll('αι', 'e')
  sOut = sOut.replaceAll('Αι', 'e')
  sOut = sOut.replaceAll('ει', 'i')
  sOut = sOut.replaceAll('Ει', 'i')
  sOut = sOut.replaceAll('οι', 'i')
  sOut = sOut.replaceAll('Οι', 'i')
  sOut = sOut.replaceAll('ε', 'e')
  sOut = sOut.replaceAll('Ε', 'e')
  sOut = sOut.replaceAll('η', 'i')
  sOut = sOut.replaceAll('Η', 'i')
  sOut = sOut.replaceAll('ι', 'i')
  sOut = sOut.replaceAll('Ι', 'i')
  sOut = sOut.replaceAll('ϊ', 'i')
  sOut = sOut.replaceAll('υ', 'i')
  sOut = sOut.replaceAll('Υ', 'i')
  sOut = sOut.replaceAll('ϋ', 'i')
  sOut = sOut.replaceAll('ο', 'o')
  sOut = sOut.replaceAll('Ο', 'o')
  sOut = sOut.replaceAll('ω', 'o')
  sOut = sOut.replaceAll('Ω', 'o')
  sOut = sOut.replaceAll('α', 'a')
  sOut = sOut.replaceAll('Α', 'a')

  return '/' +sOut +'/'
}

/*
 * DOING: it finds if phonemic-notation has συνίζηση/sinizisi/
 * INPUT: /aftarhikós/
 * OUTPUT: boolean
 */
function fGreekphonemaHasSinizisi(sPhonemaIn) {
  if (sPhonemaIn.indexOf('yy')!=-1 ||
      sPhonemaIn.indexOf('gg')!=-1 || //γκια
      sPhonemaIn.indexOf('zz')!=-1 ||
      sPhonemaIn.indexOf('hh')!=-1 ||
      sPhonemaIn.indexOf('kk')!=-1 ||
      sPhonemaIn.indexOf('ll')!=-1 ||
      sPhonemaIn.indexOf('nn')!=-1 ||
      sPhonemaIn.indexOf('ss')!=-1 ||
      sPhonemaIn.indexOf('jj')!=-1 ||
      sPhonemaIn.indexOf('cc')!=-1
     ) return true
  else return false
}

/*
 * INPUT: καλόπιασμα, in-order-to increase|decrease tonos
 * OUTPUT: καλόπjασμα
 */
function fGreekwordSinizisiAdd(sWordIn) {
  let sOut = sWordIn

  sOut = sOut.replaceAll('ια', 'jα')
  sOut = sOut.replaceAll('ιά', 'jά')
  sOut = sOut.replaceAll('ιε', 'jε')
  sOut = sOut.replaceAll('ιέ', 'jέ')
  sOut = sOut.replaceAll('ιου', 'jου')
  sOut = sOut.replaceAll('ιού', 'jού')
  sOut = sOut.replaceAll('ιο', 'jο')
  sOut = sOut.replaceAll('ιό', 'jό')

  return sOut
}

/*
 * test if a-Greek-word has one syllable.
 * INPUT: 'νοια/nna/'
 */
function fGreekphonemaHasSyllableOne(sWordIn) {
  if ((sWordIn.match(/[aeiouáéíóú]/g)||[]).length == 1)
    return true
  else
    return false

  //if (fGreekvowelindexFindFirst(sWordIn) == fGreekvowelindexFindLast(sWordIn))
}

/*
 * DOING: it finids if a-character is English.
 * OUTPUT: boolean.
 */
function fIsLetterEnglish(sCharIn) {
  sCharIn = sCharIn.toLowerCase()

  if (sCharIn == 'a' ||
      sCharIn == 'b' ||
      sCharIn == 'c' ||
      sCharIn == 'd' ||
      sCharIn == 'e' ||
      sCharIn == 'f' ||
      sCharIn == 'g' ||
      sCharIn == 'h' ||
      sCharIn == 'i' ||
      sCharIn == 'j' ||
      sCharIn == 'k' ||
      sCharIn == 'l' ||
      sCharIn == 'm' ||
      sCharIn == 'n' ||
      sCharIn == 'o' ||
      sCharIn == 'p' ||
      sCharIn == 'q' ||
      sCharIn == 'r' ||
      sCharIn == 's' ||
      sCharIn == 't' ||
      sCharIn == 'u' ||
      sCharIn == 'v' ||
      sCharIn == 'w' ||
      sCharIn == 'x' ||
      sCharIn == 'y' ||
      sCharIn == 'z'
    )
    return true
  else
    return false
}

/*
 * DOING: it finids if a-character is English-consonant.
 * OUTPUT: boolean.
 */
function fIsLetterConsonantEnglish(sCharIn) {
  //what u/w/y?
  if (sCharIn == 'b' ||
      sCharIn == 'c' ||
      sCharIn == 'd' ||
      sCharIn == 'f' ||
      sCharIn == 'g' ||
      sCharIn == 'h' ||
      sCharIn == 'j' ||
      sCharIn == 'k' ||
      sCharIn == 'l' ||
      sCharIn == 'm' ||
      sCharIn == 'n' ||
      sCharIn == 'p' ||
      sCharIn == 'q' ||
      sCharIn == 'r' ||
      sCharIn == 's' ||
      sCharIn == 't' ||
      sCharIn == 'v' ||
      sCharIn == 'x' ||
      sCharIn == 'z' ||

      sCharIn == 'B' ||
      sCharIn == 'C' ||
      sCharIn == 'D' ||
      sCharIn == 'F' ||
      sCharIn == 'G' ||
      sCharIn == 'H' ||
      sCharIn == 'J' ||
      sCharIn == 'K' ||
      sCharIn == 'L' ||
      sCharIn == 'M' ||
      sCharIn == 'N' ||
      sCharIn == 'P' ||
      sCharIn == 'Q' ||
      sCharIn == 'R' ||
      sCharIn == 'S' ||
      sCharIn == 'T' ||
      sCharIn == 'V' ||
      sCharIn == 'X' ||
      sCharIn == 'Z'
    )
    return true
  else
    return false
}

/**
 * modified:
 * created: {2001-03-14}
 *
 */
function fIsLetterVowelEnglish(sCharIn) {
  //what about w/u/y?
  if (sCharIn == 'a' ||
      sCharIn == 'A' ||
      sCharIn == 'e' ||
      sCharIn == 'E' ||
      sCharIn == 'o' ||
      sCharIn == 'O' ||
      sCharIn == 'i' ||
      sCharIn == 'I'    )
    return true
  else
    return false
}

/**
 * modified:
 * created: 2001.03.15
 * @author nikkas
 *
 */
function fIsLetterVowelGreek(sCharIn) {
  if (sCharIn == 'α' ||
      sCharIn == 'ά' ||
      sCharIn == 'A' ||
      sCharIn == 'Ά' ||
      sCharIn == 'ε' ||
      sCharIn == 'έ' ||
      sCharIn == 'Ε' ||
      sCharIn == 'Έ' ||
      sCharIn == 'η' ||
      sCharIn == 'ή' ||
      sCharIn == 'Η' ||
      sCharIn == 'Ή' ||
      sCharIn == 'ι' ||
      sCharIn == 'ί' ||
      sCharIn == 'Ι' ||
      sCharIn == 'Ί' ||
      sCharIn == 'ϊ' ||
      sCharIn == 'Ϊ' ||
      sCharIn == 'ΐ' ||
      sCharIn == 'ο' ||
      sCharIn == 'ό' ||
      sCharIn == 'Ο' ||
      sCharIn == 'Ό' ||
      sCharIn == 'υ' ||
      sCharIn == 'ύ' ||
      sCharIn == 'Υ' ||
      sCharIn == 'Ύ' ||
      sCharIn == 'ϋ' ||
      sCharIn == 'ΰ' ||
      sCharIn == 'Ϋ' ||
      sCharIn == 'ω' ||
      sCharIn == 'ώ' ||
      sCharIn == 'Ω' ||
      sCharIn == 'Ώ'  )
    return true
  else
    return false
}

export {
  fEllawordFindPhonema,
  fPhonemaTonosRemove, fPhonemaTonosReplace,
  fFindCharsIfCodepoints, fFindCodepointsIfChars,
  fFindLettersFirstIfPrefix, fFindLettersFirstIfSuffix,
  fFindLettersLastIfPrefix, fFindLettersLastIfSuffix,
  fGreektonosFindIndex, fGreektonosFindIndexLast,
  fGreektonosFindSyllable, fGreektonosRemove,
  fGreektonosRemoveFirst, fGreektonosSetOnIndex, fGreektonosSetOnLiyusa,
  fGreektonosSetOnParaliyusa, 
  fGreektonosDecrease, fGreektonosIncrease,
  fGreekvowelindexFindFirst, fGreekvowelindexFindLast, fGreekvowelnumberFind,
  fGreekwordFindPhonema, fGreekphonemaHasSinizisi, fGreekwordSinizisiAdd,
  fGreekphonemaHasSyllableOne,
  fIsLetterConsonantEnglish, fIsLetterVowelEnglish, fIsLetterVowelGreek
}