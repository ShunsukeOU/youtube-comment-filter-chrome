const DEFAULT_WORDS = ["ゴミ", "カス", "死ね", "クズ", "クソ", "バカ", "アホ", "低能", "無能", "キモい", "ウザい", "しね", "消えろ", "出てけ", "最低", "最悪", "ふざけんな", "ブス", "デブ","殺す", "滅べ", "腐れ", "役立たず", "ドン引き", "ありえない", "やめろ", "つまらん", "ダサい"];//デフォルトで除外するワード、必要に応じて追加可能

document.addEventListener('DOMContentLoaded', () => {
  const extToggle = document.getElementById('ext-toggle');
  const langToggle = document.getElementById('lang-toggle');
  
  const headerDefault = document.getElementById('header-default');
  const contentDefault = document.getElementById('content-default');
  const defaultList = document.getElementById('default-list');
  
  const headerCustom = document.getElementById('header-custom');
  const contentCustom = document.getElementById('content-custom');
  const customInput = document.getElementById('custom-input');
  const addBtn = document.getElementById('add-btn');
  const customList = document.getElementById('custom-list');

  headerDefault.addEventListener('click', () => contentDefault.classList.toggle('active'));
  headerCustom.addEventListener('click', () => contentCustom.classList.toggle('active'));

  chrome.storage.local.get({
    extensionEnabled: true,
    langFilterEnabled: true,
    disabledDefaultWords: [],
    customWords: []
  }, (state) => {
    extToggle.checked = state.extensionEnabled;
    langToggle.checked = state.langFilterEnabled;
    renderDefaultList(state.disabledDefaultWords);
    renderCustomList(state.customWords);
  });

  extToggle.addEventListener('change', (e) => {
    chrome.storage.local.set({ extensionEnabled: e.target.checked });
  });
  langToggle.addEventListener('change', (e) => {
    chrome.storage.local.set({ langFilterEnabled: e.target.checked });
  });

  addBtn.addEventListener('click', () => {
    const word = customInput.value.trim();
    if (!word) return;
    
    chrome.storage.local.get({ customWords: [] }, (res) => {
      if (!res.customWords.includes(word)) {
        const newWords = [...res.customWords, word];
        chrome.storage.local.set({ customWords: newWords }, () => {
          renderCustomList(newWords);
          customInput.value = ''; 
        });
      }
    });
  });


  function renderDefaultList(disabledWords) {
    defaultList.innerHTML = '';
    DEFAULT_WORDS.forEach(word => {
      const li = document.createElement('li');
      
      const span = document.createElement('span');
      span.textContent = word;
      
      const isFiltering = !disabledWords.includes(word);
      
      if (!isFiltering) {
        span.style.color = '#aaa';
        span.style.textDecoration = 'line-through';
      }
      
      const label = document.createElement('label');
      label.className = 'switch';
      
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = isFiltering;
      
      const slider = document.createElement('span');
      slider.className = 'slider';
      

      input.addEventListener('change', (e) => {
        chrome.storage.local.get({ disabledDefaultWords: [] }, (res) => {
          let newList = res.disabledDefaultWords;
          if (e.target.checked) {
            
            newList = newList.filter(w => w !== word);
          } else {
            
            if (!newList.includes(word)) {
              newList.push(word);
            }
          }
          
          chrome.storage.local.set({ disabledDefaultWords: newList }, () => {
            renderDefaultList(newList); 
          });
        });
      });
      
      label.appendChild(input);
      label.appendChild(slider);
      
      li.appendChild(span);
      li.appendChild(label);
      defaultList.appendChild(li);
    });
  }

  
  function renderCustomList(words) {
    customList.innerHTML = '';
    words.forEach(word => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = word;
      
      const btn = document.createElement('button');
      btn.textContent = '削除';
      btn.className = 'btn btn-remove';
      
      btn.addEventListener('click', () => {
        chrome.storage.local.get({ customWords: [] }, (res) => {
          const newWords = res.customWords.filter(w => w !== word);
          chrome.storage.local.set({ customWords: newWords }, () => {
            renderCustomList(newWords);
          });
        });
      });
      
      li.appendChild(span);
      li.appendChild(btn);
      customList.appendChild(li);
    });
  }
});