import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import Toast from './Toast.jsx'
import Tooltip from './Tooltip.jsx'
import useToast from '../hooks/useToast.js'
import { downloadCanvasAsPng } from '../utils/download.js'
import { QR_TYPES, getType } from '../utils/qrTypes.js'

const inputBase =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500'

function Icon({ d, className = 'h-4 w-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  )
}

function Field({ field, value, onChange, onEnter }) {
  const id = `qr-field-${field.name}`
  const common = {
    id,
    value: value ?? '',
    onChange: (e) => onChange(field.name, e.target.value),
    placeholder: field.placeholder,
  }

  if (field.type === 'checkbox') {
    return (
      <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
        <input
          id={id}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(field.name, e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500/40 dark:border-slate-600 dark:bg-slate-800"
        />
        {field.label}
      </label>
    )
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {field.label}
        {field.required && <span className="ml-0.5 text-accent-500">*</span>}
      </label>
      {field.type === 'textarea' ? (
        <textarea {...common} rows={3} className={`${inputBase} resize-none`} />
      ) : field.type === 'select' ? (
        <select {...common} className={inputBase}>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={field.type}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onEnter?.()
            }
          }}
          className={inputBase}
        />
      )}
    </div>
  )
}

export default function QRGenerator() {
  const [typeKey, setTypeKey] = useState('url')
  const [valuesByType, setValuesByType] = useState({})
  const [size, setSize] = useState(256)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { toast, showToast } = useToast()
  const previewRef = useRef(null)
  const firstFieldRef = useRef(null)

  const type = getType(typeKey)
  const values = valuesByType[typeKey] ?? type.defaults ?? {}
  const payload = useMemo(() => type.build(values), [type, values])
  const hasValue = Boolean(payload)

  useEffect(() => {
    if (!hasValue) {
      setLoading(false)
      return
    }
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [payload, size, hasValue])

  const selectType = (key) => {
    setTypeKey(key)
    setError('')
    requestAnimationFrame(() => firstFieldRef.current?.querySelector('input, textarea, select')?.focus())
  }

  const setField = (name, val) => {
    setValuesByType((prev) => ({ ...prev, [typeKey]: { ...(prev[typeKey] ?? type.defaults ?? {}), [name]: val } }))
    if (error) setError('')
  }

  const validate = useCallback(() => {
    const missing = type.fields.some((f) => f.required && !String(values[f.name] ?? '').trim())
    if (missing || !payload) {
      setError('Please fill in the required field(s) first.')
      showToast('Some required fields are empty.', 'error')
      return false
    }
    return true
  }, [type, values, payload, showToast])

  const handleGenerate = () => {
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast('QR code generated!', 'success')
    }, 300)
  }

  const handleDownload = () => {
    if (!validate()) return
    const ok = downloadCanvasAsPng(previewRef.current, 'qrcode.png')
    showToast(ok ? 'Downloaded qrcode.png' : 'Unable to download QR code.', ok ? 'success' : 'error')
  }

  const handleCopy = async () => {
    if (!validate()) return
    try {
      await navigator.clipboard.writeText(payload)
      showToast('Copied to clipboard!', 'success')
    } catch {
      showToast('Clipboard not available.', 'error')
    }
  }

  return (
    <div className="relative w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/60 dark:backdrop-blur sm:p-8">
      {/* Type selector */}
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Type</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {QR_TYPES.map((t) => {
          const active = typeKey === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => selectType(t.key)}
              aria-pressed={active}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition active:scale-95 ${
                active
                  ? 'bg-brand-600 text-white shadow-glow ring-1 ring-inset ring-white/10'
                  : 'bg-slate-100 text-slate-600 ring-1 ring-transparent hover:bg-slate-200 hover:ring-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:ring-slate-600'
              }`}
            >
              <Icon d={t.icon} className="h-3.5 w-3.5" />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Dynamic fields */}
      <div ref={firstFieldRef} className="space-y-4">
        {type.fields.map((field) => (
          <Field key={field.name} field={field} value={values[field.name]} onChange={setField} onEnter={handleGenerate} />
        ))}
      </div>

      <div className="mt-4">
        <Tooltip label="Generate the QR code (Enter)" className="w-full sm:w-auto">
          <button type="button" onClick={handleGenerate} className="btn-primary w-full px-5 sm:w-auto">
            Generate
          </button>
        </Tooltip>
        {error && <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">{error}</p>}
      </div>

      {/* Size slider */}
      <div className="mt-6">
        <label htmlFor="qr-size" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
          Size
          <span className="rounded-md bg-brand-50 px-1.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
            {size}px
          </span>
        </label>
        <input
          id="qr-size"
          type="range"
          min={128}
          max={512}
          step={8}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="qr-range"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>128px</span>
          <span>512px</span>
        </div>
      </div>

      {/* Live preview */}
      <div className="mt-6 flex flex-col items-center">
        <div
          ref={previewRef}
          className="relative flex aspect-square w-full max-w-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-inner dark:border-slate-700"
        >
          {hasValue ? (
            <>
              <QRCodeCanvas
                value={payload}
                size={size}
                level="M"
                includeMargin
                className="h-auto w-full"
                style={{ maxWidth: '100%', maxHeight: '256px' }}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70">
                  <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 px-6 text-center">
              <Icon
                d="M3.75 4.5h6v6h-6v-6zm10.5 0h6v6h-6v-6zm-10.5 9h6v6h-6v-6zm10.5 3h3m-3 3h6m0-6v.01"
                className="h-10 w-10 text-slate-300 dark:text-slate-600"
              />
              <p className="text-sm text-slate-400">Your QR code will appear here.</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex w-full max-w-[300px] flex-col gap-2 sm:flex-row">
          <Tooltip label="Save as a PNG image" className="flex-1">
            <button type="button" onClick={handleDownload} disabled={!hasValue} className="btn-primary w-full">
              <Icon d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              Download PNG
            </button>
          </Tooltip>
          <Tooltip label="Copy the content to clipboard" className="flex-1">
            <button type="button" onClick={handleCopy} disabled={!hasValue} className="btn-ghost w-full">
              <Icon d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              Copy
            </button>
          </Tooltip>
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  )
}
