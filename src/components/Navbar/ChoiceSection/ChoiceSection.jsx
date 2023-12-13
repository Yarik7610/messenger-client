import s from './ChoiceSection.module.scss'

export const ChoiceSection = ({ section, handleSection }) => {
  return (
    <ul className={s.choiceSection}>
      <li className={`${s.li} ${section === 0 ? s.active : ''}`} onClick={() => handleSection(0)}>
        Groups
      </li>
      <li className={`${s.li} ${section === 1 ? s.active : ''}`} onClick={() => handleSection(1)}>
        Contacts
      </li>
    </ul>
  )
}
