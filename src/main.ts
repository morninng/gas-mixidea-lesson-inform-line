type OnEditEvent = GoogleAppsScript.Events.SheetsOnEdit;
import {History } from "./history"
import { Comment } from './comment'

function onEdit(e: OnEditEvent) {
    const history = new History()
    history.push(e)
}

function clickFinishComment(){
  const history = new History()
  const row = history.getLastEditedRow()

  const result = Browser.inputBox(`コメントを記入した行を入力してokをクリックしてください`,`${row}`, Browser.Buttons.OK_CANCEL);

  if(result === "cancel"){
    Logger.log("キャンセルされました")
  } 
  const result2 = Browser.inputBox(`行数 \n  ${ JSON.stringify(result)}`, Browser.Buttons.OK_CANCEL);


  var data = {
    "line_groupid": "C48962c8690c96681028900a2348c382e",
    "msg": "ccc \n aaa \\n bbb jjj",
  };

  var options: { [key: string]: string | boolean} = {
    contentType: "application/json",
    method: "post",
    payload: JSON.stringify(data),
  };

  const response = UrlFetchApp.fetch("https://us-central1-mixidea-temp-staging.cloudfunctions.net/sendlineGroupMessage", options);

  Browser.msgBox(`${JSON.stringify(response)}`, Browser.Buttons.OK_CANCEL);


}

function send(){
  const coomment = new Comment()
  coomment.send()
}
