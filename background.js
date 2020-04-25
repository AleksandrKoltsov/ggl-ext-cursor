// насколько я понял declarativeContent используется для выполнения действий 
// не требуя разрешения на чтение содержимого страницы
// но сам до конца так и не понял как работает
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
   chrome.declarativeContent.onPageChanged.addRules([
   {
     conditions: [
     new chrome.declarativeContent.PageStateMatcher({
       pageUrl: {
         schemes: [ 'http', 'https']
       }
     })
     ], 
     actions: [
       new chrome.declarativeContent.ShowPageAction()
     ]
   }])
});