import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('loads example and updates preview', async () => {
    render(<App />)
    const textarea = screen.getByRole('textbox')

    fireEvent.change(textarea, { target: { value: '[b]hola[/b]' } })
    const preview = await screen.findByTestId('preview')
    expect(preview.innerHTML).toContain('<strong>hola</strong>')
  })

  it('inserts tags from chips at selection and clears', async () => {
    render(<App />)
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'texto' } })
    textarea.setSelectionRange(0, 5)
    await userEvent.click(screen.getByRole('button', { name: 'B' }))
    expect(textarea.value.startsWith('[b]')).toBe(true)
    await userEvent.click(screen.getByRole('button', { name: /Limpiar/i }))
    expect(textarea.value).toBe('')
  })

  it('loads sample via button', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /Cargar ejemplo/i }))
    const preview = await screen.findByTestId('preview')
    expect(preview.innerHTML).toContain('BBCode Preview')
  })

  it('switches language to EN', async () => {
    render(<App />)
    const enButton = screen.getByRole('button', { name: /EN/i })
    await userEvent.click(enButton)
    expect(await screen.findByText(/Write BBCode/i)).toBeInTheDocument()
  })

  it('toggles theme and updates body class', async () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /modo claro/i })
    await userEvent.click(toggle)
    expect(document.body.classList.contains('theme-light')).toBe(true)
    await userEvent.click(screen.getByRole('button', { name: /modo oscuro/i }))
    expect(document.body.classList.contains('theme-dark')).toBe(true)
  })
})
