/*------------------------------------------*/
// MENU
/*------------------------------------------*/
// スプレッドシートを開いた時に、メニューを追加する
function onOpen(){
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('チケット取得');
  menu.addItem('REDMINEから取得する', 'doRedPull');
  menu.addToUi();
}

/*------------------------------------------*/
/*シートを取得*/
/*------------------------------------------*/
function getRedmineSheet(){
  var sheetName = REDMINE_SHEET_NAME;
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  return sheet;
}

/*------------------------------------------*/
// REDMINE連携
/*------------------------------------------*/
function doRedPull(){
  getRedmineIsseus();
}
/*------------------------------------------*/
// チケット取得
/*------------------------------------------*/
/*sw:true,CW送信する*/
function getRedmineIsseus(){

  var url_params = '?key=' + REDMINE_API_KEY;
  var json_url = REDMINE_URL + EXTENSION + url_params;

  var contents = UrlFetchApp.fetch(json_url,FETCH_OPTIONS).getContentText();
  var jsonDataTotalContents = JSON.parse(contents);
  var total_count = jsonDataTotalContents.total_count;

  // データが取得できたら既存のデータを削除する
  if(total_count > 0){
    contentsClear(REDMINE_SHEET_NAME);
  }

  // APIは100件までしか表示できないので分割して取得する
  if(total_count < LIMIT){
    var pageCount = 1;
  }else{
    var pageCount = Math.ceil(total_count / LIMIT);
  }
  
  //シート指定
  var sheet = getRedmineSheet();

  var i = RED_START_ROWS; // 何行目から開始するのか？
  for(var page = 1; page <= pageCount; page++){
    var json_tmp_url = json_url + '&limit=' + LIMIT + '&page=' + page;
    // JSONの設定
    var json = UrlFetchApp.fetch(json_tmp_url,FETCH_OPTIONS).getContentText();
    var jsonData = JSON.parse(json);
    var issues = jsonData.issues;

    //逆順にする
    issues = issues.reverse();

    // JSONを書き込む
    for (var idx in issues) {

      if(i >= MAX_ROWS + RED_START_ROWS){break;}

      sheet.getRange(i, TICKET_COLUMNS['id']).setValue(issues[idx]['id']);
      sheet.getRange(i, TICKET_COLUMNS['subject']).setValue(issues[idx]['subject']);
      sheet.getRange(i, TICKET_COLUMNS['status']).setValue(issues[idx]['status']['name']);

      i++;

    }
  }
}

/*------------------------------------------*/
// 既存のデータを削除する
/*------------------------------------------*/
function doContentsClear(){
  contentsClear(REDMINE_SHEET_NAME);
}
function contentsClear(sheetName) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  for(var idx in TICKET_COLUMNS){
    if(TICKET_COLUMNS.hasOwnProperty(idx)){
//      設定したカラムを削除
      var redComentCols = TICKET_COLUMNS[idx];
      sheet.getRange(RED_START_ROWS,redComentCols,MAX_ROWS).clearContent();
    }
  }
  return;
}
