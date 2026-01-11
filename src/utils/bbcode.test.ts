import { describe, expect, it } from 'vitest'
import { parseBBCode } from './bbcode'

describe('parseBBCode', () => {
  it('renders basic tags', () => {
    const input = '[b]bold[/b] [i]italic[/i] [u]underline[/u] [s]strike[/s]'
    const html = parseBBCode(input)
    expect(html).toContain('<strong>bold</strong>')
    expect(html).toContain('<em>italic</em>')
    expect(html).toContain('<span class="underline decoration-sky-300">underline</span>')
    expect(html).toContain('<s>strike</s>')
  })

  it('renders color, size and alignment', () => {
    const input = '[color=#ff0000]red[/color][size=20]big[/size][center]middle[/center]'
    const html = parseBBCode(input)
    expect(html).toContain('style="color:#ff0000"')
    expect(html).toContain('style="font-size:20px"')
    expect(html).toContain('<div class="text-center">middle</div>')
  })

  it('renders quotes and lists', () => {
    const input = '[quote=Alex]hi[/quote][list][*]one[*]two[/list]'
    const html = parseBBCode(input)
    expect(html).toContain('Alex')
    expect(html).toContain('<ul class="list-disc list-inside space-y-1"><li class="leading-6">one</li>')
    expect(html).toContain('<li class="leading-6">two</li>')
  })

  it('renders urls with quotes and images when valid', () => {
    const input = "[url='https://example.com']link[/url][img]https://example.com/a.png[/img]"
    const html = parseBBCode(input)
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('alt="bbcode"')
  })

  it('escapes unsafe html and ignores invalid urls', () => {
    const input = '[url=javascript:alert(1)]x[/url][img]ftp://bad[/img]<script>'
    const html = parseBBCode(input)
    expect(html).not.toContain('javascript:alert(1)')
    expect(html).not.toContain('<img')
    expect(html).not.toContain('<script>')
    expect(html).toContain('x')
  })

  it('allows mailto links', () => {
    const input = '[url=mailto:test@example.com]mail[/url]'
    const html = parseBBCode(input)
    expect(html).toContain('mailto:test@example.com')
  })

  it('renders code block without parsing inner tags', () => {
    const input = '[code][b]x[/b][/code]'
    const html = parseBBCode(input)
    expect(html).toContain('<pre')
    expect(html).toContain('[b]x[/b]')
  })

  it('returns raw text when url has invalid scheme', () => {
    const input = '[url=ftp://bad]abc[/url]'
    const html = parseBBCode(input)
    expect(html).toContain('abc')
    expect(html).not.toContain('<a')
  })

  it('renders url without attribute', () => {
    const input = '[url]https://example.com[/url]'
    const html = parseBBCode(input)
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('https://example.com')
  })

  it('returns empty for list without items', () => {
    const input = '[list][/list]'
    const html = parseBBCode(input)
    expect(html.trim()).toBe('')
  })

  it('returns empty for empty input', () => {
    expect(parseBBCode('')).toBe('')
  })
})
