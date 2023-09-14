import { ThemeProvider } from '@/components/theme-provider'

import { Github, Wand2 } from 'lucide-react'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import { Slider } from './components/ui/slider'
import { ModeButton } from './components/mode-button'
import { VideoInputForm } from './components/video-input-form'
import { PromptSelect } from './components/prompt-select'
import { useState } from 'react'
import { useCompletion } from 'ai/react'

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  // function handlePromptSelected(template: string) {
  //   console.log(template)
  // }

  const { input, setInput, handleInputChange } = useCompletion({
    api: 'https://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
  })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <header className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">upload.ai</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <ModeButton />
          </div>
        </header>
        <main className="flex-1 p-6 flex gap-6">
          <aside className="w-80 space-y-12">
            <VideoInputForm onVideoUplodaded={setVideoId} />
            <form className="space-y-10">
              <div className="space-y-4">
                <Label className="text-md">Prompt</Label>
                <PromptSelect onPromptSelected={setInput} />
              </div>
              <div className="space-y-4">
                <Label className="text-md">Modelo</Label>
                <Select disabled defaultValue="gpt3.5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>
                <span className="block text-xs text-muted-foreground">
                  Você poderá customizar essa opção em breve
                </span>
              </div>
              <div className="space-y-6">
                <Label className="text-md">Temperatura</Label>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                />
                <span className="block text-xs text-muted-foreground">
                  Valores mais altos tendem a deixar o resultado mais criativo e
                  com possíveis erros.
                </span>
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Wand2 className="w-5 h-5 mr-3" /> Executar
              </Button>
            </form>
          </aside>
          <section className="flex flex-col flex-1 gap-4">
            <div className="grid grid-rows-2 gap-4 flex-1">
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="Inclua o prompt para a IA..."
                value={input}
                onChange={handleInputChange}
              />
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="Resultado gerado pela IA..."
                readOnly
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Lembre-se: você pode utilizar a variável{' '}
              <code className="text-teal-500">{'{transcription}'}</code> no seu
              prompt para adicionar o conteúdo da transcrição do vídeo
              selecionado.
            </p>
          </section>
        </main>
        <footer className="p-6">
          <p className="text-xs text-muted-foreground">
            Desenvolvido com 💜 no NLW IA da Rocketseat
          </p>
        </footer>
      </div>
    </ThemeProvider>
  )
}

// 1st word: INTELIGÊNCIA
// 2nd word: EVOLUÇÃO
