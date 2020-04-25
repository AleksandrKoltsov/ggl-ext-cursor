const addStyle = (c) => {
    // вставляем стиль в <style></style>
    const style = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(style);
    style.innerHTML = `*{cursor:url("${c}"), auto !important;}`
    }
// обработчик получения ссылки на курсор из хранилища
const setCurrentCur = (data) => {
    addStyle(data.current[0])
    document.documentElement.style.cursor = `url("${data.current[0]}"), auto !important`;
}
// получаем ссылку из хранилища
chrome.storage.sync.get(['current'], setCurrentCur);
