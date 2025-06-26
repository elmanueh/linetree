import { useRef } from 'react'

interface ImportTreeProps {
  callback: (fileData: string) => void
}

export default function ImportTree({ callback }: ImportTreeProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.ged')) {
      alert('Por favor, sube un archivo con extensión .ged')
    } else {
      const fileData = await file.text()
      callback(fileData)
    }

    fileInputRef.current!.value = ''
  }

  return (
    <>
      <div className="flex justify-center my-5">
        <div className="flex items-center w-full max-w-xl">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-5 text-gray-500 italic whitespace-nowrap">
            o impórtalo con GEDCOM
          </span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
      </div>

      <div className="flex justify-center">
        <label
          htmlFor="gedcom-upload"
          className="cursor-pointer px-4 py-3 bg-green-600 hover:bg-green-700 transition text-white font-medium rounded-md"
        >
          Seleccionar archivo
        </label>
        <input
          ref={fileInputRef}
          id="gedcom-upload"
          type="file"
          accept=".ged"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </>
  )
}
