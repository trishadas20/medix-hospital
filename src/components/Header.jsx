import { Bell, Menu, Search } from 'lucide-react'

export default function Header({ onMenu }) {
  return (
    <header className="topbar">
      <button className="icon-button menu-button" onClick={onMenu}><Menu size={22} /></button>
      <div className="search-box">
        <Search size={18} />
        <input placeholder="Search patient, doctor, invoice..." />
        <kbd>⌘ K</kbd>
      </div>
      <div className="header-actions">
        <button className="notification-button"><Bell size={19} /><span /></button>
        <div className="profile">
          <div className="avatar">TD</div>
          <div><strong>Trisha Das</strong><small>Administrator</small></div>
        </div>
      </div>
    </header>
  )
}
