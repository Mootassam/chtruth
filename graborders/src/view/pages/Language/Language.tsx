import React from 'react'
import SubHeader from 'src/view/shared/Header/SubHeader'

function Language() {
  return (
  <div className='container'>


  <SubHeader title="Language"/>
  <div className="language-card">
    <div
      className="language-option selected"
      onclick="selectLanguage('english')"
    >
      <div className="language-content">
        <div className="language-flag">🇺🇸</div>
        <div className="language-name">English</div>
      </div>
      <div className="language-check">
        <i className="fas fa-check" />
      </div>
    </div>
    <div className="language-option" onclick="selectLanguage('french')">
      <div className="language-content">
        <div className="language-flag">🇫🇷</div>
        <div className="language-name">French</div>
      </div>
      <div className="language-check">
        <i className="fas fa-check" />
      </div>
    </div>
    <div className="language-option" onclick="selectLanguage('german')">
      <div className="language-content">
        <div className="language-flag">🇩🇪</div>
        <div className="language-name">Deutsch</div>
      </div>
      <div className="language-check">
        <i className="fas fa-check" />
      </div>
    </div>
    <div className="language-option" onclick="selectLanguage('russian')">
      <div className="language-content">
        <div className="language-flag">🇷🇺</div>
        <div className="language-name">Russian</div>
      </div>
      <div className="language-check">
        <i className="fas fa-check" />
      </div>
    </div>
    <div className="language-option" onclick="selectLanguage('spanish')">
      <div className="language-content">
        <div className="language-flag">🇪🇸</div>
        <div className="language-name">Spanish</div>
      </div>
      <div className="language-check">
        <i className="fas fa-check" />
      </div>
    </div>
    <div className="language-option" onclick="selectLanguage('chinese')">
      <div className="language-content">
        <div className="language-flag">🇨🇳</div>
        <div className="language-name">中文 (Chinese)</div>
      </div>
      <div className="language-check">
        <i className="fas fa-check" />
      </div>
    </div>
  </div>


</div>

  )
}

export default Language