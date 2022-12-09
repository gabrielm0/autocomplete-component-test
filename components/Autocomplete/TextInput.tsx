import '@/components/Autocomplete/style.input.css'
import {useEffect, useRef} from 'react'

interface Props {
  label: string
  className: string
  minLen: number
  disabled: boolean
  inputref?: any
  autofocus?: boolean
  onKeyDown?: (event: any) => void
  onInput?: (event: any) => void
  onClick?: (event: any) => void
  onClear?: () => void
}

export const TextInput = ({
  label = 'Search',
  className = 'primary',
  minLen = 3,
  autofocus = true,
  disabled = false,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // mount
  useEffect(() => {
    if (inputRef) {
      const inputElement = inputRef.current
      if (inputElement) {
        // autofocus on input if loaded
        if (autofocus) inputElement.focus()

        //inputElement.addEventListener("keydown", props.onKeyDown as any);
        //inputElement.addEventListener("input", props.onInput as any);
        return () => {
          //inputElement.removeEventListener("keydown", props.onKeyDown as any);
          //inputElement.removeEventListener("input", props.onInput as any);
        }
      }
    }
  }, [])

  return (
    <div className={className + ' input-wrapper'}>
      {/** input text */}
      <input
        ref={inputRef}
        className="input"
        id="search"
        type="text"
        autoComplete="off"
        placeholder={`Input a minimum of ${minLen} characters to search...`}
        disabled={disabled}
        onKeyDown={props.onKeyDown}
        onInput={props.onInput}
        onClick={props.onClick}
      />
      <button
        disabled={disabled}
        className="cancel-input-button"
        onClick={() => {
          if (inputRef?.current) {
            inputRef.current.value = ''
            inputRef.current.focus()
            if (props.onClear) props.onClear()
          }
        }}
      >
        X
      </button>

      <fieldset aria-hidden="true" className="fieldset">
        <legend className="legend">
          <span>{label}</span>
        </legend>
      </fieldset>
    </div>
  )
}