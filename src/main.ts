type OnEditEvent = GoogleAppsScript.Events.SheetsOnEdit;
import {History } from "./history"

function onEdit(e: OnEditEvent) {
    const history = new History()
    history.push(e)
}

function clickFinishComment(){
  const history = new History()
  const row = history.getLastEditedRow()

  const result = Browser.inputBox(`コメントを記入した行を入力してokをクリックしてください \n 例 ${row}`, Browser.Buttons.OK_CANCEL);

  if(result === "cancel"){
    Logger.log("キャンセルされました")
  } 
  const result2 = Browser.inputBox(`行数 ${ JSON.stringify(result)}`, Browser.Buttons.OK_CANCEL);

}
