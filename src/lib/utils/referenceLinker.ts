/**
 * Utility functions for processing HTML content to make reference numbers clickable
 */

// Map superscript Unicode characters to their numeric values
const SUPERSCRIPT_MAP: Record<string, number> = {
  '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5,
  '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9,
  '¹⁰': 10, '¹¹': 11, '¹²': 12, '¹³': 13, '¹⁴': 14, '¹⁵': 15,
  '¹⁶': 16, '¹⁷': 17, '¹⁸': 18, '¹⁹': 19,
  '²⁰': 20, '²¹': 21, '²²': 22, '²³': 23, '²⁴': 24, '²⁵': 25,
}

/**
 * Converts a superscript Unicode character or sequence to a number
 */
function superscriptToNumber(superscript: string): number | null {
  return SUPERSCRIPT_MAP[superscript] || null
}

/**
 * Finds all superscript Unicode sequences in a string
 * Returns array of { text, number, index }
 */
function findSuperscriptReferences(text: string): Array<{ text: string; number: number; index: number }> {
  const matches: Array<{ text: string; number: number; index: number }> = []
  
  // Check for multi-digit superscripts first (10-25)
  for (const [sup, num] of Object.entries(SUPERSCRIPT_MAP).sort((a, b) => b[0].length - a[0].length)) {
    const regex = new RegExp(sup.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
    let match
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        text: sup,
        number: num,
        index: match.index
      })
    }
  }
  
  // Remove duplicates and sort by index (reverse order for replacement)
  return matches
    .filter((m, i, arr) => arr.findIndex(x => x.index === m.index) === i)
    .sort((a, b) => b.index - a.index)
}

/**
 * Finds all bracket references like [1], [9], [15] in a string
 * Returns array of { text, number, index }
 */
function findBracketReferences(text: string): Array<{ text: string; number: number; index: number }> {
  const matches: Array<{ text: string; number: number; index: number }> = []
  const regex = /\[(\d+)\]/g
  let match
  
  while ((match = regex.exec(text)) !== null) {
    const number = parseInt(match[1], 10)
    if (number >= 1 && number <= 99) {
      matches.push({
        text: match[0],
        number,
        index: match.index
      })
    }
  }
  
  // Sort by index (reverse order for replacement)
  return matches.sort((a, b) => b.index - a.index)
}

/**
 * Processes HTML content to make reference numbers clickable
 * Handles both superscript Unicode (¹, ², etc.) and bracket format ([1], [9])
 */
export function processReferenceLinks(html: string, targetId: string = 'home-references'): string {
  if (!html) return html
  
  // Create a temporary DOM element to parse HTML safely
  const temp = document.createElement('div')
  temp.innerHTML = html
  
  // Get all text nodes and process them
  const walker = document.createTreeWalker(
    temp,
    NodeFilter.SHOW_TEXT,
    null
  )
  
  const textNodes: { node: Text; parent: Node | null }[] = []
  let node: Node | null
  
  while ((node = walker.nextNode())) {
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push({ node: node as Text, parent: node.parentNode })
    }
  }
  
  // Process each text node
  textNodes.forEach(({ node: textNode, parent }) => {
    if (!parent) return
    
    let text = textNode.textContent || ''
    const fragments: Array<string | Node> = []
    let lastIndex = 0
    
    // Find all references (both superscript and bracket)
    const superscriptRefs = findSuperscriptReferences(text)
    const bracketRefs = findBracketReferences(text)
    const allRefs = [...superscriptRefs, ...bracketRefs]
      .sort((a, b) => b.index - a.index) // Sort by index descending for replacement
    
    // Remove overlapping references (keep the longest one)
    const nonOverlappingRefs = []
    for (const ref of allRefs) {
      const refEnd = ref.index + ref.text.length
      const overlaps = nonOverlappingRefs.some(existing => {
        const existingEnd = existing.index + existing.text.length
        return (ref.index >= existing.index && ref.index < existingEnd) ||
               (refEnd > existing.index && refEnd <= existingEnd) ||
               (ref.index <= existing.index && refEnd >= existingEnd)
      })
      if (!overlaps) {
        nonOverlappingRefs.push(ref)
      }
    }
    
    nonOverlappingRefs.forEach(ref => {
      // Add text before reference
      if (ref.index > lastIndex) {
        fragments.push(text.substring(lastIndex, ref.index))
      }
      
      // Create anchor element
      const anchor = document.createElement('a')
      anchor.href = `#${targetId}`
      anchor.className = 'reference-link cursor-pointer hover:underline text-inherit'
      anchor.setAttribute('data-reference', ref.number.toString())
      anchor.textContent = ref.text
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.getElementById(targetId)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
      
      fragments.push(anchor)
      lastIndex = ref.index + ref.text.length
    })
    
    // Add remaining text
    if (lastIndex < text.length) {
      fragments.push(text.substring(lastIndex))
    }
    
    // Replace the text node with fragments
    if (fragments.length > 0) {
      fragments.forEach(fragment => {
        if (typeof fragment === 'string') {
          parent.insertBefore(document.createTextNode(fragment), textNode)
        } else {
          parent.insertBefore(fragment, textNode)
        }
      })
      parent.removeChild(textNode)
    }
  })
  
  return temp.innerHTML
}

/**
 * Simplified version that uses regex replacement (better for server-side or when DOM is not available)
 */
export function processReferenceLinksSimple(html: string, targetId: string = 'home-references'): string {
  if (!html) return html
  
  // Helper to check if a match position is inside an existing anchor tag
  const isInsideAnchor = (str: string, index: number): boolean => {
    const before = str.substring(0, index)
    const after = str.substring(index)
    
    // Find the last <a tag before this position
    const lastAnchorStart = before.lastIndexOf('<a')
    if (lastAnchorStart === -1) return false
    
    // Check if there's a closing > after the <a
    const anchorTagEnd = before.indexOf('>', lastAnchorStart)
    if (anchorTagEnd === -1 || anchorTagEnd >= index) return false
    
    // Check if there's a closing </a> after this position but before the current match
    const closingAnchor = before.substring(anchorTagEnd + 1).indexOf('</a>')
    if (closingAnchor !== -1 && anchorTagEnd + 1 + closingAnchor < index) return false
    
    // Also check if </a> comes after our position
    const closingAnchorAfter = after.indexOf('</a>')
    return closingAnchorAfter !== -1
  }
  
  let processed = html
  
  // Process bracket references first [1], [9], etc.
  const bracketMatches: Array<{ match: string; start: number; end: number; number: number }> = []
  const bracketRegex = /\[(\d+)\]/g
  let bracketMatch
  
  while ((bracketMatch = bracketRegex.exec(processed)) !== null) {
    const number = parseInt(bracketMatch[1], 10)
    if (number >= 1 && number <= 99) {
      bracketMatches.push({
        match: bracketMatch[0],
        start: bracketMatch.index,
        end: bracketMatch.index + bracketMatch[0].length,
        number
      })
    }
  }
  
  // Process superscript Unicode references (multi-digit first, then single)
  // Sort by length descending to match longer sequences first
  const superscriptEntries = Object.entries(SUPERSCRIPT_MAP).sort((a, b) => b[0].length - a[0].length)
  const supMatches: Array<{ match: string; start: number; end: number; number: number }> = []
  
  superscriptEntries.forEach(([sup, num]) => {
    const escaped = sup.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escaped, 'g')
    let match
    
    while ((match = regex.exec(processed)) !== null) {
      // Skip if already inside an anchor tag
      if (isInsideAnchor(processed, match.index)) continue
      
      // Check if this overlaps with any existing match
      const overlaps = bracketMatches.some(bm => 
        (match.index >= bm.start && match.index < bm.end) ||
        (match.index + match[0].length > bm.start && match.index + match[0].length <= bm.end) ||
        (match.index <= bm.start && match.index + match[0].length >= bm.end)
      ) || supMatches.some(sm =>
        (match.index >= sm.start && match.index < sm.end) ||
        (match.index + match[0].length > sm.start && match.index + match[0].length <= sm.end) ||
        (match.index <= sm.start && match.index + match[0].length >= sm.end)
      )
      
      if (!overlaps) {
        supMatches.push({
          match: match[0],
          start: match.index,
          end: match.index + match[0].length,
          number: num
        })
      }
    }
  })
  
  // Combine all matches and sort by start position (descending for replacement)
  const allMatches = [...bracketMatches, ...supMatches].sort((a, b) => b.start - a.start)
  
  // Replace matches in reverse order to preserve indices
  allMatches.forEach(({ match, start, end, number }) => {
    const replacement = `<a href="#${targetId}" class="reference-link cursor-pointer hover:underline text-inherit" data-reference="${number}">${match}</a>`
    processed = processed.substring(0, start) + replacement + processed.substring(end)
  })
  
  return processed
}

