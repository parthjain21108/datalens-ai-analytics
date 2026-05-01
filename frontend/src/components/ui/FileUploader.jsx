import { useState, useRef } from 'react'
import {
  Upload,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

import api from '../../services/api'

export default function FileUploader({ onSuccess }) {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const inputRef = useRef()

  const handleFile = async file => {
    if (!file) return

    // Validate CSV
    if (
      file.type !== 'text/csv' &&
      !file.name.toLowerCase().endsWith('.csv')
    ) {
      setStatus('error')
      setMessage('Only CSV files are allowed.')
      return
    }

    // Validate size
    if (file.size > 10 * 1024 * 1024) {
      setStatus('error')
      setMessage('File size must be under 10 MB.')
      return
    }

    try {
      setStatus('uploading')
      setMessage('')

      const formData = new FormData()

      formData.append('file', file)
      formData.append(
        'name',
        file.name.replace('.csv', '')
      )

      const res = await api.post(
        '/datasets/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      const dataset = res.data.dataset

      setStatus('success')

      setMessage(
        `Uploaded "${dataset.name}" — ${dataset.rowCount} rows`
      )

      if (onSuccess) {
        onSuccess(dataset)
      }

    } catch (e) {
      console.error('UPLOAD ERROR:', e.response)
      console.error('UPLOAD DATA:', e.response?.data)
      console.error('UPLOAD MESSAGE:', e.response?.data?.message)

      setStatus('error')

      setMessage(
        e.response?.data?.message ||
        JSON.stringify(e.response?.data) ||
        'Upload failed. Please try again.'
      )
    }
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault()
          handleFile(e.dataTransfer.files[0])
        }}
        className="
          border-2 border-dashed border-gray-700
          hover:border-blue-500
          rounded-2xl
          p-12
          text-center
          cursor-pointer
          transition-all
          bg-gray-900/40
          hover:bg-gray-900/70
          group
        "
      >
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <Upload
              size={32}
              className="
                text-blue-400
                group-hover:scale-110
                transition-transform
              "
            />
          </div>
        </div>

        <h3 className="text-white font-semibold text-lg mb-2">
          Upload CSV Dataset
        </h3>

        <p className="text-gray-400 text-sm">
          Drag & drop your CSV file here
        </p>

        <p className="text-gray-500 text-xs mt-2">
          or click to browse
        </p>

        <p className="text-gray-600 text-xs mt-4">
          Max file size: 10 MB
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={e =>
            handleFile(e.target.files?.[0])
          }
        />
      </div>

      {/* Uploading */}
      {status === 'uploading' && (
        <div className="mt-4 flex items-center gap-3 text-blue-400 text-sm">
          <div className="
            w-4 h-4
            border-2 border-blue-400
            border-t-transparent
            rounded-full
            animate-spin
          " />

          <span>Uploading and parsing dataset...</span>
        </div>
      )}

      {/* Success */}
      {status === 'success' && (
        <div className="
          mt-4
          flex items-center gap-3
          text-green-400 text-sm
          bg-green-500/10
          border border-green-500/20
          rounded-xl
          p-4
        ">
          <CheckCircle size={18} />

          <span>{message}</span>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="
          mt-4
          flex items-start gap-3
          text-red-400 text-sm
          bg-red-500/10
          border border-red-500/20
          rounded-xl
          p-4
          break-words
        ">
          <AlertCircle size={18} className="mt-0.5" />

          <span>{message}</span>
        </div>
      )}
    </div>
  )
}