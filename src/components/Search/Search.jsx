import { X as ClearInput, Search as SearchIcon } from 'lucide-react'
import { memo, useEffect, useRef, useState } from 'react'
import { RoundButton } from '../RoundButton/RoundButton'
import s from './Search.module.scss'

export const Search = memo(({ query, setQuery }) => {
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setIsFocused(false)
      }
    }
    document.body.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.body.classList.remove('activeModal')
      document.body.removeEventListener('mousedown', handleClickOutside)
      setIsFocused(false)
    }
  }, [])

  const clearQuery = () => {
    setQuery('')
  }
  return (
    <div
      ref={searchRef}
      className={`${s.wrap} ${isFocused ? s.active : ''}`}
      onClick={() => setIsFocused(true)}>
      <SearchIcon color={isFocused ? '#39c' : '#707579'} />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search"
      />
      {query && (
        <div className={s.clearBtnWrap}>
          <RoundButton onClick={clearQuery}>
            <ClearInput color={isFocused ? '#39c' : '#707579'} />
          </RoundButton>
        </div>
      )}
    </div>
  )
})
