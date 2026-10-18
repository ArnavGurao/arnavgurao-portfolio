import { profile } from '../data/profile'

export function escapeVCard(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
}

// RFC 2426: CRLF line endings, with lines folded at 75 UTF-8 octets.
function foldLine(line: string): string {
  let output = '',
    size = 0
  for (const char of line) {
    const bytes = new TextEncoder().encode(char).length
    if (size + bytes > 75) {
      output += '\r\n '
      size = 1
    }
    output += char
    size += bytes
  }
  return output
}

export function createVCard(): string {
  return (
    [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${escapeVCard(profile.name)}`,
      'N:Gurao;Arnav;Ashish;;',
      `TEL;TYPE=CELL:${profile.phone}`,
      `EMAIL;TYPE=INTERNET:${profile.email}`,
      `URL:${profile.github}`,
      `URL:${profile.linkedin}`,
      `URL:${profile.instagram}`,
      `NOTE:${escapeVCard(`LinkedIn: ${profile.linkedin}\nInstagram: ${profile.instagram}\nGitHub: ${profile.github}`)}`,
      'END:VCARD',
    ]
      .map(foldLine)
      .join('\r\n') + '\r\n'
  )
}

export function downloadContact(): void {
  const url = URL.createObjectURL(new Blob([createVCard()], { type: 'text/vcard;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'Arnav_Gurao_Contact.vcf'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000)
}
