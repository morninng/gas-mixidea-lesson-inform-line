type OnEditEvent = GoogleAppsScript.Events.SheetsOnEdit;

function onEdit(e: OnEditEvent) {
    // 入力を監視するセルの範囲を指定します。
    let sheetName = "シート1";
    let monitoredRange = "A1";

    // 反映先のセルを指定します。
    let targetSheetName = "シート1";
    let targetRange = "B1";
    let targetRange2 = "C1";

    let sheet = e.source.getSheetByName(sheetName);
    let targetSheet = e.source.getSheetByName(targetSheetName);

    // 編集されたセルが監視対象のセルかどうかを確認します。
    let editedRange = e.range.getA1Notation();
    if (sheetName === e.source.getSheetName() && editedRange === monitoredRange) {
        // 監視対象のセルが編集された場合、その値を反映先のセルにコピーします。
        const eventData = JSON.stringify(e)
        const userEmail = e.user.getEmail()
        const column = e.range.getColumn()
        const row = e.range.getRow()
        const editLocation = {column, row}

        // let value = sheet.getRange(monitoredRange).getValue();
        targetSheet?.getRange(targetRange).setValue(userEmail);
        targetSheet?.getRange(targetRange2).setValue(editLocation);

    }
}

function clickFinishComment(){
  const result = Browser.inputBox(`コメントを記入した行を入力してokをクリックしてください \n ss`, Browser.Buttons.OK_CANCEL);

  if(result === "cancel"){
    Logger.log("キャンセルされました")
  } 
  const result2 = Browser.inputBox(`行数 ${result}`, Browser.Buttons.OK_CANCEL);

}
