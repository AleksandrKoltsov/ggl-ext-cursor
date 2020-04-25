const container = document.querySelector('#cursors-container');
// обработчик клика на кнопку с иконкой курсора - берем ссылку из dataset и записіваем в хранилище как текущий курсор
const clickHandler = (ev)=>{
  let cursor = ev.target.dataset.cursor;
  chrome.storage.sync.set({'current':[cursor]});
  // вставка на страницу скрипта с вопросом о перезагрузке страницы
  chrome.tabs.query({
    active:true,
    currentWindow:true
  },
  tabs=>{
    chrome.tabs.executeScript(
      tabs[0].id,
      {//спрашиваем перезагрузить ли страницу - для внесения изменения в стиль - если ок перезагружаем
        code:`if(confirm('You have changed the cursor. Reload this page for the changes to take effect?')){window.location.reload();}`
      }
    );
  });
};
// делаем массив кнопок с иконками - курсорами и вставляем его в popup
  for(let i =1; i<=14;i++){
    let el = `images/cursors/${i}.cur`;
    // делаем ссылку на локальный файл - относительно расширения
    // все файлы должны быть в manifest.json - в массиве с ключом "web_accessible_resources" 
    // иначе ошибка. Для удобства - пронумеровал файлы подряд
    let url = chrome.runtime.getURL(el);
    let changeCursor = document.createElement('button');
    changeCursor.style.cursor = `url("${el}"),auto`;
    changeCursor.classList.add('cursor');
    changeCursor.addEventListener('click', clickHandler);
    // записываем ссылку в dataset
    changeCursor.dataset.cursor = url;
    changeCursor.style.backgroundImage = `url(${el})`;
    container.appendChild(changeCursor);
  };