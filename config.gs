/*------------------------------------------*/
// CONFIG
/*------------------------------------------*/
var MAX_ROWS = 10;
var RED_START_ROWS = 2;
var RED_TICKET_COLS = 1;
// 列番号ぼ設定
var TICKET_COLUMNS = {
  'id' : 1,
  'subject' : 2,
  'status' : 3,
}
var REDMINE_URL = 'https://redmine.my_site.com/issues';
var REDMINE_API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
var EXTENSION = '.json';
var FETCH_OPTIONS = {
  // SSLエラー回避
  "validateHttpsCertificates" : false
}
var LIMIT = 100;
var REDMINE_COLMUNS = 6;
var REDMINE_SHEET_NAME = 'RED_TICKET';
var START_ROWS = 2;

var TICKET_COLS = 1;
